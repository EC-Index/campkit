import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { sql } from '@/lib/db'
import { headers } from 'next/headers'

// Simple in-memory rate limiting (resets on redeploy)
// For production, use Redis or similar
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT_MAX = 5 // Max signups per IP
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in ms

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

// Clean up old entries every 100 requests
let requestCount = 0
function cleanupRateLimitMap() {
  requestCount++
  if (requestCount % 100 === 0) {
    const now = Date.now()
    for (const [ip, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) {
        rateLimitMap.delete(ip)
      }
    }
  }
}

// Disposable email domains to block
const DISPOSABLE_DOMAINS = [
  'tempmail.com', 'throwaway.com', 'mailinator.com', 'guerrillamail.com',
  'temp-mail.org', '10minutemail.com', 'fakeinbox.com', 'trashmail.com',
  'yopmail.com', 'sharklasers.com', 'guerrillamail.info', 'grr.la',
  'spam4.me', 'dispostable.com', 'mailnesia.com', 'tempr.email'
]

export async function POST(request: NextRequest) {
  try {
    cleanupRateLimitMap()
    
    // Get IP for rate limiting
    const headersList = await headers()
    const forwardedFor = headersList.get('x-forwarded-for')
    const ip = forwardedFor?.split(',')[0]?.trim() || 
               headersList.get('x-real-ip') || 
               'unknown'
    
    // Rate limit check
    const rateLimit = getRateLimit(ip)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many signups. Try again later.' }, 
        { status: 429 }
      )
    }
    
    const { email, password, name, _hp, _ts } = await request.json()
    
    // Honeypot check - if filled, reject silently with fake success
    if (_hp) {
      console.log(`[Bot detected] Honeypot filled from IP: ${ip}`)
      // Return fake success to confuse bots
      return NextResponse.json({ success: true, user: { id: 0, email, name } })
    }
    
    // Time-based check - if form submitted too fast (< 2 seconds), likely bot
    if (_ts && Date.now() - _ts < 2000) {
      console.log(`[Bot detected] Form submitted too fast from IP: ${ip}`)
      return NextResponse.json({ error: 'Please try again' }, { status: 400 })
    }
    
    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }
    
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be 6+ chars' }, { status: 400 })
    }
    
    // Email validation
    const emailLower = email.toLowerCase().trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailLower)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }
    
    // Check for disposable email
    const emailDomain = emailLower.split('@')[1]
    if (DISPOSABLE_DOMAINS.includes(emailDomain)) {
      return NextResponse.json({ error: 'Please use a real email address' }, { status: 400 })
    }
    
    // Check for suspicious patterns in email
    // Many bots use patterns like random numbers + letters
    const localPart = emailLower.split('@')[0]
    const suspiciousPattern = /^[a-z]+\d{4,}[a-z]*@/i // e.g., sheraz59141bc@
    if (suspiciousPattern.test(emailLower) && localPart.length > 12) {
      console.log(`[Suspicious email] ${emailLower} from IP: ${ip}`)
      // Don't block, but log for review
    }
    
    // Check if email exists
    const existing = await sql`SELECT id FROM users WHERE email = ${emailLower}`
    if (existing.length > 0) {
      return NextResponse.json({ error: 'Email exists' }, { status: 400 })
    }
    
    // Create user
    const password_hash = await hash(password, 12)
    const result = await sql`
      INSERT INTO users (email, password_hash, name, created_at) 
      VALUES (${emailLower}, ${password_hash}, ${name || null}, NOW()) 
      RETURNING id, email, name
    `
    
    console.log(`[Signup] New user: ${emailLower} from IP: ${ip}`)
    
    return NextResponse.json({ success: true, user: result[0] })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
