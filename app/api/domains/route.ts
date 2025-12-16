import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@/lib/db'
import { randomBytes } from 'crypto'

export const dynamic = 'force-dynamic'

// GET: List user's custom domains
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const userId = (session.user as any).id
    
    // Check plan - custom domains for Pro and above
    const users = await sql`SELECT plan FROM users WHERE id = ${userId}`
    const plan = users[0]?.plan || 'free'
    
    if (plan === 'free') {
      return NextResponse.json({ 
        error: 'Custom domains require a Pro plan or higher',
        requiresUpgrade: true,
        domains: []
      })
    }
    
    const domains = await sql`
      SELECT cd.*, 
        (SELECT COUNT(*) FROM links WHERE domain_id = cd.id) as link_count
      FROM custom_domains cd
      WHERE cd.user_id = ${userId}
      ORDER BY cd.created_at DESC
    `
    
    return NextResponse.json({ domains, plan })
  } catch (error) {
    console.error('Get domains error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

// POST: Add a new custom domain
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const userId = (session.user as any).id
    
    // Check plan
    const users = await sql`SELECT plan FROM users WHERE id = ${userId}`
    const plan = users[0]?.plan || 'free'
    
    if (plan === 'free') {
      return NextResponse.json({ 
        error: 'Custom domains require a Pro plan or higher',
        requiresUpgrade: true
      }, { status: 403 })
    }
    
    const { domain, teamId } = await request.json()
    
    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 })
    }
    
    // Clean domain (remove protocol, trailing slash)
    const cleanDomain = domain.toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/\/+$/, '')
      .trim()
    
    // Validate domain format
    const domainRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/
    if (!domainRegex.test(cleanDomain)) {
      return NextResponse.json({ error: 'Invalid domain format' }, { status: 400 })
    }
    
    // Check if domain already exists
    const existing = await sql`SELECT id FROM custom_domains WHERE domain = ${cleanDomain}`
    if (existing.length > 0) {
      return NextResponse.json({ error: 'Domain already registered' }, { status: 400 })
    }
    
    // Generate verification token
    const verificationToken = `campkit-verify-${randomBytes(16).toString('hex')}`
    
    const result = await sql`
      INSERT INTO custom_domains (user_id, team_id, domain, verified, verification_token, created_at)
      VALUES (${userId}, ${teamId || null}, ${cleanDomain}, FALSE, ${verificationToken}, NOW())
      RETURNING *
    `
    
    return NextResponse.json({ 
      domain: result[0],
      instructions: {
        step1: `Add a CNAME record pointing "${cleanDomain}" to "cname.vercel-dns.com"`,
        step2: `Add a TXT record for "${cleanDomain}" with value "${verificationToken}"`,
        step3: 'Click "Verify" once DNS records are configured (may take up to 48 hours to propagate)'
      }
    })
  } catch (error) {
    console.error('Add domain error:', error)
    return NextResponse.json({ error: 'Failed to add domain' }, { status: 500 })
  }
}

// PUT: Verify a domain
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const userId = (session.user as any).id
    const { domainId } = await request.json()
    
    if (!domainId) {
      return NextResponse.json({ error: 'Domain ID required' }, { status: 400 })
    }
    
    // Get domain
    const domains = await sql`
      SELECT * FROM custom_domains WHERE id = ${domainId} AND user_id = ${userId}
    `
    
    if (domains.length === 0) {
      return NextResponse.json({ error: 'Domain not found' }, { status: 404 })
    }
    
    const domain = domains[0]
    
    if (domain.verified) {
      return NextResponse.json({ message: 'Domain already verified', verified: true })
    }
    
    // Verify DNS TXT record
    try {
      const dns = await import('dns').then(m => m.promises)
      const records = await dns.resolveTxt(domain.domain)
      const flatRecords = records.flat()
      
      const verified = flatRecords.some(record => record === domain.verification_token)
      
      if (verified) {
        await sql`UPDATE custom_domains SET verified = TRUE WHERE id = ${domainId}`
        return NextResponse.json({ verified: true, message: 'Domain verified successfully!' })
      } else {
        return NextResponse.json({ 
          verified: false, 
          message: 'TXT record not found. Make sure you added the verification token and wait for DNS propagation.',
          expected: domain.verification_token
        })
      }
    } catch (dnsError: any) {
      if (dnsError.code === 'ENODATA' || dnsError.code === 'ENOTFOUND') {
        return NextResponse.json({ 
          verified: false, 
          message: 'No TXT records found. Please add the verification TXT record and try again.'
        })
      }
      throw dnsError
    }
  } catch (error) {
    console.error('Verify domain error:', error)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}

// DELETE: Remove a custom domain
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const userId = (session.user as any).id
    const { searchParams } = new URL(request.url)
    const domainId = searchParams.get('id')
    
    if (!domainId) return NextResponse.json({ error: 'ID required' }, { status: 400 })
    
    // Reset links using this domain
    await sql`UPDATE links SET domain_id = NULL WHERE domain_id = ${domainId}`
    
    // Delete domain
    await sql`DELETE FROM custom_domains WHERE id = ${domainId} AND user_id = ${userId}`
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete domain error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
