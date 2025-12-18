import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@/lib/db'
import { nanoid } from 'nanoid'

export const dynamic = 'force-dynamic'

const FREE_LINK_LIMIT = 50

// Blocked URL patterns - scam, phishing, malware domains
const BLOCKED_DOMAINS = [
  // Known scam patterns
  'fundingfashioned.com',
  'bit-ly.co',
  'bitly-login.com',
  // Common phishing patterns
  'login-verify',
  'account-secure',
  'wallet-connect',
  'metamask-',
  'coinbase-',
  'binance-verify',
  'paypal-secure',
  'amazon-verify',
  'apple-id-',
  'microsoft-verify',
  'google-secure',
  // URL shortener abuse patterns
  'free-money',
  'get-rich',
  'crypto-giveaway',
  'double-your',
  'claim-reward',
  'prize-winner',
  // Adult/illegal content patterns
  'xxx',
  'porn',
  'casino-bonus',
  'online-gambling',
]

// Suspicious TLDs often used for scams
const SUSPICIOUS_TLDS = [
  '.xyz',
  '.top',
  '.club',
  '.work',
  '.click',
  '.link',
  '.gq',
  '.ml',
  '.cf',
  '.tk',
  '.ga',
]

function isBlockedUrl(url: string): { blocked: boolean; reason?: string } {
  try {
    const urlObj = new URL(url.toLowerCase())
    const hostname = urlObj.hostname
    const fullUrl = url.toLowerCase()

    // Check against blocked domains/patterns
    for (const pattern of BLOCKED_DOMAINS) {
      if (hostname.includes(pattern) || fullUrl.includes(pattern)) {
        return { blocked: true, reason: 'This URL contains blocked content' }
      }
    }

    // Check for suspicious TLDs (warn but don't block for now)
    // for (const tld of SUSPICIOUS_TLDS) {
    //   if (hostname.endsWith(tld)) {
    //     return { blocked: true, reason: 'This domain extension is not allowed' }
    //   }
    // }

    // Check for IP-based URLs (often used for phishing)
    const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/
    if (ipPattern.test(hostname)) {
      return { blocked: true, reason: 'IP-based URLs are not allowed' }
    }

    // Check for data: or javascript: URLs
    if (url.startsWith('data:') || url.startsWith('javascript:')) {
      return { blocked: true, reason: 'This URL type is not allowed' }
    }

    return { blocked: false }
  } catch {
    return { blocked: true, reason: 'Invalid URL format' }
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const userId = (session.user as any).id
    const { searchParams } = new URL(request.url)
    const teamId = searchParams.get('teamId')

    // Get user plan
    const users = await sql`SELECT plan FROM users WHERE id = ${userId}`
    const plan = users[0]?.plan || 'free'

    // Get user's teams
    const teams = await sql`
      SELECT t.id, t.name, tm.role
      FROM teams t
      JOIN team_members tm ON t.id = tm.team_id
      WHERE tm.user_id = ${userId}
    `

    // Get custom domains
    const domains = await sql`
      SELECT id, domain, verified FROM custom_domains
      WHERE user_id = ${userId} AND verified = TRUE
    `

    let links
    let linkCount = 0

    if (teamId) {
      // Verify team membership
      const membership = await sql`
        SELECT role FROM team_members WHERE team_id = ${teamId} AND user_id = ${userId}
      `
      if (membership.length === 0) {
        return NextResponse.json({ error: 'Not a team member' }, { status: 403 })
      }

      links = await sql`
        SELECT l.*, cd.domain as custom_domain,
          (SELECT COUNT(*) FROM clicks WHERE link_id = l.id) as clicks
        FROM links l
        LEFT JOIN custom_domains cd ON l.domain_id = cd.id
        WHERE l.team_id = ${teamId}
        ORDER BY l.created_at DESC
      `
    } else {
      // Personal links
      links = await sql`
        SELECT l.*, cd.domain as custom_domain,
          (SELECT COUNT(*) FROM clicks WHERE link_id = l.id) as clicks
        FROM links l
        LEFT JOIN custom_domains cd ON l.domain_id = cd.id
        WHERE l.user_id = ${userId} AND l.team_id IS NULL
        ORDER BY l.created_at DESC
      `

      const countResult = await sql`
        SELECT COUNT(*) as count FROM links WHERE user_id = ${userId} AND team_id IS NULL
      `
      linkCount = Number(countResult[0].count)
    }

    return NextResponse.json({
      links,
      teams,
      domains,
      plan,
      linkCount,
      linkLimit: plan === 'free' ? FREE_LINK_LIMIT : null
    })
  } catch (error) {
    console.error('Get links error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const userId = (session.user as any).id
    const { destination_url, utm_source, utm_medium, utm_campaign, utm_term, utm_content, title, create_short_link, teamId, domainId } = await request.json()

    if (!destination_url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Validate URL format
    try {
      new URL(destination_url)
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
    }

    // Check against blocklist
    const blockCheck = isBlockedUrl(destination_url)
    if (blockCheck.blocked) {
      console.log(`[Blocked URL] User ${userId} tried to create link to: ${destination_url}`)
      return NextResponse.json({ 
        error: blockCheck.reason || 'This URL is not allowed',
        blocked: true 
      }, { status: 403 })
    }

    // Get user plan
    const users = await sql`SELECT plan FROM users WHERE id = ${userId}`
    const plan = users[0]?.plan || 'free'

    // Check team membership if teamId provided
    if (teamId) {
      const membership = await sql`
        SELECT role FROM team_members WHERE team_id = ${teamId} AND user_id = ${userId}
      `
      if (membership.length === 0) {
        return NextResponse.json({ error: 'Not a team member' }, { status: 403 })
      }
    } else {
      // Check free tier limits for personal links
      if (plan === 'free') {
        const countResult = await sql`
          SELECT COUNT(*) as count FROM links WHERE user_id = ${userId} AND team_id IS NULL
        `
        if (Number(countResult[0].count) >= FREE_LINK_LIMIT) {
          return NextResponse.json({
            error: `Free plan is limited to ${FREE_LINK_LIMIT} links. Upgrade to Pro for unlimited links.`,
            limitReached: true
          }, { status: 403 })
        }
      }
    }

    // Validate custom domain ownership
    let validDomainId = null
    if (domainId) {
      const domain = await sql`
        SELECT id FROM custom_domains WHERE id = ${domainId} AND user_id = ${userId} AND verified = TRUE
      `
      if (domain.length > 0) {
        validDomainId = domainId
      }
    }

    const short_code = create_short_link !== false ? nanoid(8) : null

    const result = await sql`
      INSERT INTO links (user_id, team_id, domain_id, destination_url, utm_source, utm_medium, utm_campaign, utm_term, utm_content, short_code, title, created_at)
      VALUES (${userId}, ${teamId || null}, ${validDomainId}, ${destination_url}, ${utm_source || null}, ${utm_medium || null}, ${utm_campaign || null}, ${utm_term || null}, ${utm_content || null}, ${short_code}, ${title || null}, NOW())
      RETURNING *
    `

    // Get custom domain if used
    let customDomain = null
    if (validDomainId) {
      const domainResult = await sql`SELECT domain FROM custom_domains WHERE id = ${validDomainId}`
      customDomain = domainResult[0]?.domain
    }

    return NextResponse.json({
      link: { ...result[0], custom_domain: customDomain }
    })
  } catch (error) {
    console.error('Create link error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const userId = (session.user as any).id
    const { searchParams } = new URL(request.url)
    const linkId = searchParams.get('id')

    if (!linkId) return NextResponse.json({ error: 'ID required' }, { status: 400 })

    // Check ownership or team membership
    const link = await sql`SELECT user_id, team_id FROM links WHERE id = ${linkId}`
    if (link.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    if (link[0].team_id) {
      const membership = await sql`
        SELECT role FROM team_members WHERE team_id = ${link[0].team_id} AND user_id = ${userId}
      `
      if (membership.length === 0) {
        return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
      }
    } else if (link[0].user_id !== userId) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
    }

    await sql`DELETE FROM clicks WHERE link_id = ${linkId}`
    await sql`DELETE FROM links WHERE id = ${linkId}`

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete link error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
