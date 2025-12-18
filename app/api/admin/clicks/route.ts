import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { neon } from '@neondatabase/serverless'

export const dynamic = 'force-dynamic'

const ADMIN_EMAILS = ['th.kiene@gmail.com', 'th.kiene@googlemail.com', 'service@getcampkit.com']

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'DATABASE_URL not set' }, { status: 500 })
    }

    const sql = neon(process.env.DATABASE_URL)
    const { searchParams } = new URL(request.url)
    const shortCode = searchParams.get('shortCode')
    const linkId = searchParams.get('linkId')

    if (!shortCode && !linkId) {
      return NextResponse.json({ error: 'shortCode or linkId required' }, { status: 400 })
    }

    // Get link info
    let link: any = null
    if (shortCode) {
      const linkResult = await sql`
        SELECT l.*, u.email as user_email 
        FROM links l 
        LEFT JOIN users u ON l.user_id = u.id 
        WHERE l.short_code = ${shortCode}
      `
      link = linkResult[0]
    } else if (linkId) {
      const linkResult = await sql`
        SELECT l.*, u.email as user_email 
        FROM links l 
        LEFT JOIN users u ON l.user_id = u.id 
        WHERE l.id = ${parseInt(linkId)}
      `
      link = linkResult[0]
    }

    if (!link) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 })
    }

    // Get recent clicks with all details
    const clicks = await sql`
      SELECT 
        id, 
        clicked_at, 
        ip_address, 
        user_agent, 
        referer, 
        device, 
        browser, 
        os, 
        country, 
        city
      FROM clicks
      WHERE link_id = ${link.id}
      ORDER BY clicked_at DESC
      LIMIT 100
    `

    // Get click stats by country
    const countryStats = await sql`
      SELECT country, COUNT(*) as count
      FROM clicks
      WHERE link_id = ${link.id} AND country IS NOT NULL
      GROUP BY country
      ORDER BY count DESC
      LIMIT 20
    `

    // Get click stats by IP (to detect bot patterns)
    const ipStats = await sql`
      SELECT ip_address, COUNT(*) as count
      FROM clicks
      WHERE link_id = ${link.id}
      GROUP BY ip_address
      ORDER BY count DESC
      LIMIT 20
    `

    // Get click stats by referer
    const refererStats = await sql`
      SELECT 
        CASE 
          WHEN referer IS NULL OR referer = '' THEN 'Direct'
          ELSE referer 
        END as referer, 
        COUNT(*) as count
      FROM clicks
      WHERE link_id = ${link.id}
      GROUP BY referer
      ORDER BY count DESC
      LIMIT 20
    `

    // Get click stats by device
    const deviceStats = await sql`
      SELECT device, COUNT(*) as count
      FROM clicks
      WHERE link_id = ${link.id} AND device IS NOT NULL
      GROUP BY device
      ORDER BY count DESC
    `

    // Get clicks over time (hourly for last 24h)
    const clicksHourly = await sql`
      SELECT 
        DATE_TRUNC('hour', clicked_at) as hour,
        COUNT(*) as count
      FROM clicks
      WHERE link_id = ${link.id} AND clicked_at > NOW() - INTERVAL '24 hours'
      GROUP BY DATE_TRUNC('hour', clicked_at)
      ORDER BY hour ASC
    `

    // Get clicks over time (daily for last 7 days)
    const clicksDaily = await sql`
      SELECT 
        DATE(clicked_at) as date,
        COUNT(*) as count
      FROM clicks
      WHERE link_id = ${link.id} AND clicked_at > NOW() - INTERVAL '7 days'
      GROUP BY DATE(clicked_at)
      ORDER BY date ASC
    `

    // Detect suspicious patterns
    const suspiciousIPs = ipStats.filter((ip: any) => Number(ip.count) > 20)
    const totalClicks = clicks.length
    const uniqueIPs = ipStats.length
    const clicksPerIP = uniqueIPs > 0 ? (totalClicks / uniqueIPs).toFixed(1) : '0'

    // Check for bot patterns
    const botIndicators = {
      highClicksPerIP: Number(clicksPerIP) > 10,
      sameIPHeavyUsage: suspiciousIPs.length > 0,
      noReferer: refererStats.find((r: any) => r.referer === 'Direct')?.count > totalClicks * 0.9,
      suspiciousUserAgents: clicks.filter((c: any) => 
        c.user_agent?.includes('bot') || 
        c.user_agent?.includes('crawler') ||
        c.user_agent?.includes('spider') ||
        !c.user_agent
      ).length
    }

    const isSuspicious = botIndicators.highClicksPerIP || 
                         botIndicators.sameIPHeavyUsage || 
                         botIndicators.suspiciousUserAgents > totalClicks * 0.3

    return NextResponse.json({
      link,
      totalClicks: totalClicks,
      uniqueIPs,
      clicksPerIP,
      clicks,
      stats: {
        countries: countryStats,
        ips: ipStats,
        referers: refererStats,
        devices: deviceStats,
        hourly: clicksHourly,
        daily: clicksDaily
      },
      botAnalysis: {
        isSuspicious,
        indicators: botIndicators,
        suspiciousIPs
      }
    })

  } catch (error) {
    console.error('Admin clicks error:', error)
    return NextResponse.json({ error: 'Failed to fetch click details' }, { status: 500 })
  }
}
