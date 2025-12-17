import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const userId = (session.user as any).id
    const { searchParams } = new URL(request.url)
    const teamId = searchParams.get('teamId')
    const period = searchParams.get('period') || '30d'

    // Check if user has paid plan
    const user = await sql`SELECT plan FROM users WHERE id = ${userId}`
    const userPlan = user[0]?.plan || 'free'
    
    if (userPlan === 'free' && !teamId) {
      return NextResponse.json({ error: 'Upgrade to Pro for Advanced Analytics' }, { status: 403 })
    }

    // Calculate date range
    const days = period === '7d' ? 7 : period === '90d' ? 90 : 30
    
    let linkIds: number[] = []

    if (teamId) {
      // Verify team membership
      const membership = await sql`
        SELECT id FROM team_members WHERE team_id = ${teamId} AND user_id = ${userId}
      `
      if (membership.length === 0) {
        return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
      }
      
      const links = await sql`SELECT id FROM links WHERE team_id = ${teamId}`
      linkIds = links.map(l => l.id)
    } else {
      const links = await sql`SELECT id FROM links WHERE user_id = ${userId} AND team_id IS NULL`
      linkIds = links.map(l => l.id)
    }

    if (linkIds.length === 0) {
      return NextResponse.json({
        clicksOverTime: [],
        devices: [],
        browsers: [],
        countries: [],
        cities: [],
        referers: [],
        topLinks: []
      })
    }

    // Clicks over time
    const clicksOverTime = await sql`
      SELECT DATE(clicked_at) as date, COUNT(*) as count
      FROM clicks
      WHERE link_id = ANY(${linkIds}::int[])
        AND clicked_at > NOW() - INTERVAL '1 day' * ${days}
      GROUP BY DATE(clicked_at)
      ORDER BY date ASC
    `

    // Device stats
    const devices = await sql`
      SELECT device, COUNT(*) as count
      FROM clicks
      WHERE link_id = ANY(${linkIds}::int[])
        AND clicked_at > NOW() - INTERVAL '1 day' * ${days}
        AND device IS NOT NULL
      GROUP BY device
      ORDER BY count DESC
      LIMIT 5
    `

    // Browser stats
    const browsers = await sql`
      SELECT browser, COUNT(*) as count
      FROM clicks
      WHERE link_id = ANY(${linkIds}::int[])
        AND clicked_at > NOW() - INTERVAL '1 day' * ${days}
        AND browser IS NOT NULL
      GROUP BY browser
      ORDER BY count DESC
      LIMIT 5
    `

    // Country stats
    const countries = await sql`
      SELECT country, COUNT(*) as count
      FROM clicks
      WHERE link_id = ANY(${linkIds}::int[])
        AND clicked_at > NOW() - INTERVAL '1 day' * ${days}
        AND country IS NOT NULL
      GROUP BY country
      ORDER BY count DESC
      LIMIT 5
    `

    // City stats
    const cities = await sql`
      SELECT city, COUNT(*) as count
      FROM clicks
      WHERE link_id = ANY(${linkIds}::int[])
        AND clicked_at > NOW() - INTERVAL '1 day' * ${days}
        AND city IS NOT NULL
      GROUP BY city
      ORDER BY count DESC
      LIMIT 5
    `

    // Referrer stats
    const referers = await sql`
      SELECT
        CASE
          WHEN referer = '' OR referer IS NULL THEN 'Direct'
          WHEN referer LIKE '%google%' THEN 'Google'
          WHEN referer LIKE '%facebook%' OR referer LIKE '%fb.%' THEN 'Facebook'
          WHEN referer LIKE '%twitter%' OR referer LIKE '%t.co%' THEN 'Twitter/X'
          WHEN referer LIKE '%linkedin%' THEN 'LinkedIn'
          WHEN referer LIKE '%instagram%' THEN 'Instagram'
          WHEN referer LIKE '%youtube%' THEN 'YouTube'
          WHEN referer LIKE '%tiktok%' THEN 'TikTok'
          WHEN referer LIKE '%reddit%' THEN 'Reddit'
          ELSE 'Other'
        END as source,
        COUNT(*) as count
      FROM clicks
      WHERE link_id = ANY(${linkIds}::int[])
        AND clicked_at > NOW() - INTERVAL '1 day' * ${days}
      GROUP BY source
      ORDER BY count DESC
      LIMIT 5
    `

    // Top performing links
    const topLinks = await sql`
      SELECT l.id, l.title, l.short_code, COUNT(c.id) as clicks
      FROM links l
      LEFT JOIN clicks c ON c.link_id = l.id 
        AND c.clicked_at > NOW() - INTERVAL '1 day' * ${days}
      WHERE l.id = ANY(${linkIds}::int[])
      GROUP BY l.id, l.title, l.short_code
      ORDER BY clicks DESC
      LIMIT 6
    `

    return NextResponse.json({
      clicksOverTime: clicksOverTime.map(r => ({ date: r.date, count: Number(r.count) })),
      devices: devices.map(r => ({ device: r.device, count: Number(r.count) })),
      browsers: browsers.map(r => ({ browser: r.browser, count: Number(r.count) })),
      countries: countries.map(r => ({ country: r.country, count: Number(r.count) })),
      cities: cities.map(r => ({ city: r.city, count: Number(r.count) })),
      referers: referers.map(r => ({ source: r.source, count: Number(r.count) })),
      topLinks: topLinks.map(r => ({ 
        id: r.id, 
        title: r.title, 
        short_code: r.short_code, 
        clicks: Number(r.clicks) 
      }))
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}
