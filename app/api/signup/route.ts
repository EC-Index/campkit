import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { sql } from '@/lib/db'
import { headers } from 'next/headers'
import { Resend } from 'resend'
import crypto from 'crypto'

const resend = new Resend(process.env.RESEND_API_KEY)

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour

// Disposable email domains to block
const DISPOSABLE_EMAIL_DOMAINS = [
  'tempmail.com', 'throwaway.com', 'mailinator.com', 'guerrillamail.com',
  '10minutemail.com', 'fakeinbox.com', 'trashmail.com', 'tempinbox.com',
  'sharklasers.com', 'guerrillamail.info', 'grr.la', 'spam4.me',
  'byom.de', 'dispostable.com', 'mailnesia.com', 'tempr.email'
]

function getRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 }
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count }
}

async function verifyRecaptcha(token: string): Promise<{ success: boolean; score: number }> {
  if (!RECAPTCHA_SECRET_KEY || !token) {
    return { success: true, score: 1 } // Skip if not configured
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`
    })

    const data = await response.json()
    return { success: data.success, score: data.score || 0 }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return { success: false, score: 0 }
  }
}

function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

async function sendVerificationEmail(email: string, token: string, name?: string) {
  const verificationUrl = `https://www.getcampkit.com/verify?token=${token}`
  
  try {
    await resend.emails.send({
      from: 'CampKit <noreply@getcampkit.com>',
      to: email,
      subject: 'Verify your CampKit account',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0f; color: #ffffff; padding: 40px 20px; margin: 0;">
          <div style="max-width: 500px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 32px;">
              <div style="display: inline-block; width: 48px; height: 48px; background: linear-gradient(135deg, #f0b429, #de9b00); border-radius: 12px; line-height: 48px; font-weight: bold; color: #0a0a0f; font-size: 24px;">C</div>
              <h1 style="margin: 16px 0 0 0; font-size: 24px;">CampKit</h1>
            </div>
            
            <div style="background: #12121a; border-radius: 16px; padding: 32px; border: 1px solid #1e1e2e;">
              <h2 style="margin: 0 0 16px 0; font-size: 20px;">Welcome${name ? `, ${name}` : ''}! 👋</h2>
              <p style="color: #9ca3af; margin: 0 0 24px 0; line-height: 1.6;">
                Thanks for signing up for CampKit! Please verify your email address to activate your account.
              </p>
              
              <a href="${verificationUrl}" style="display: block; background: #f0b429; color: #0a0a0f; text-decoration: none; padding: 14px 24px; border-radius: 8px; font-weight: 600; text-align: center; margin-bottom: 24px;">
                Verify Email Address
              </a>
              
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                Or copy this link: <br>
                <span style="color: #9ca3af; word-break: break-all;">${verificationUrl}</span>
              </p>
            </div>
            
            <p style="color: #6b7280; font-size: 12px; text-align: center; margin-top: 32px;">
              This link expires in 24 hours. If you didn't create an account, you can ignore this email.
            </p>
          </div>
        </body>
        </html>
      `
    })
    return true
  } catch (error) {
    console.error('Failed to send verification email:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const headersList = headers()
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] || 
               headersList.get('x-real-ip') || 
               'unknown'

    // Rate limiting
    const rateLimit = getRateLimit(ip)
    if (!rateLimit.allowed) {
      console.log(`[Rate limit] IP ${ip} exceeded signup limit`)
      return NextResponse.json(
        { error: 'Too many signup attempts. Please try again later.' },
        { status: 429 }
      )
    }

    const { email, password, name, recaptchaToken, formLoadTime, website } = await request.json()

    // Honeypot check
    if (website) {
      console.log(`[Bot detected] Honeypot filled from IP: ${ip}`)
      return NextResponse.json({ success: true, message: 'Please check your email' })
    }

    // Time-based check (server-side)
    if (formLoadTime && Date.now() - formLoadTime < 2000) {
      console.log(`[Bot detected] Form submitted too fast from IP: ${ip}`)
      return NextResponse.json(
        { error: 'Please take your time filling out the form' },
        { status: 400 }
      )
    }

    // Validate email
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Check disposable email domains
    const emailDomain = normalizedEmail.split('@')[1]
    if (DISPOSABLE_EMAIL_DOMAINS.includes(emailDomain)) {
      console.log(`[Blocked] Disposable email attempt: ${normalizedEmail} from IP: ${ip}`)
      return NextResponse.json({ error: 'Please use a permanent email address' }, { status: 400 })
    }

    // Password validation
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
    }

    // reCAPTCHA verification
    if (recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(recaptchaToken)
      
      if (!recaptchaResult.success) {
        console.log(`[reCAPTCHA failed] IP: ${ip}, Email: ${normalizedEmail}`)
        return NextResponse.json({ error: 'Security verification failed. Please try again.' }, { status: 400 })
      }

      // Score below 0.5 is likely a bot
      if (recaptchaResult.score < 0.5) {
        console.log(`[reCAPTCHA low score] IP: ${ip}, Email: ${normalizedEmail}, Score: ${recaptchaResult.score}`)
        return NextResponse.json({ error: 'Security verification failed. Please try again.' }, { status: 400 })
      }

      console.log(`[reCAPTCHA] IP: ${ip}, Email: ${normalizedEmail}, Score: ${recaptchaResult.score}`)
    }

    // Check if email already exists
    const existing = await sql`SELECT id, email_verified FROM users WHERE email = ${normalizedEmail}`
    if (existing.length > 0) {
      if (!existing[0].email_verified) {
        // Resend verification email
        const token = generateVerificationToken()
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
        
        await sql`
          UPDATE users 
          SET verification_token = ${token}, verification_expires = ${expiresAt}
          WHERE email = ${normalizedEmail}
        `
        
        await sendVerificationEmail(normalizedEmail, token, name)
        return NextResponse.json({ success: true, message: 'Verification email resent' })
      }
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
    }

    // Hash password
    const password_hash = await hash(password, 12)

    // Generate verification token
    const verificationToken = generateVerificationToken()
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Create user (unverified)
    const result = await sql`
      INSERT INTO users (
        email, 
        password_hash, 
        name, 
        email_verified,
        verification_token,
        verification_expires,
        created_at
      ) VALUES (
        ${normalizedEmail}, 
        ${password_hash}, 
        ${name || null}, 
        false,
        ${verificationToken},
        ${verificationExpires},
        NOW()
      ) RETURNING id, email, name
    `

    // Send verification email
    const emailSent = await sendVerificationEmail(normalizedEmail, verificationToken, name)
    
    if (!emailSent) {
      console.error(`Failed to send verification email to ${normalizedEmail}`)
    }

    console.log(`[Signup] New user: ${normalizedEmail} from IP: ${ip}`)

    return NextResponse.json({ 
      success: true, 
      message: 'Please check your email to verify your account',
      user: { id: result[0].id, email: result[0].email }
    })

  } catch (error: any) {
    console.error('Signup error:', error)
    
    // Handle unique constraint violation (duplicate email)
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
    }
    
    return NextResponse.json({ error: 'Failed to create account' }, { status: 500 })
  }
}
