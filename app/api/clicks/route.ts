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
    const linkId = searchParams.get('linkId')
    
    if (!linkId) {
      return NextResponse.json({ error: 'Link ID required' }, { status: 400 })
    }
    
    // Verify ownership
    const link = await sql`
      SELECT l.user_id, l.team_id FROM links l WHERE l.id = ${linkId}
    `
    
    if (link.length === 0) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 })
    }
    
    // Check access
    if (link[0].team_id) {
      const membership = await sql`
        SELECT id FROM team_members WHERE team_id = ${link[0].team_id} AND user_id = ${userId}
      `
      if (membership.length === 0) {
        return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
      }
    } else if (link[0].user_id !== userId) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
    }
    
    // Get recent clicks
    const clicks = await sql`
      SELECT id, clicked_at, ip_address, user_agent, referer, device, browser, os, country, city
      FROM clicks 
      WHERE link_id = ${linkId} 
      ORDER BY clicked_at DESC 
      LIMIT 50
    `
    
    // Get aggregated stats
    const deviceStats = await sql`
      SELECT device, COUNT(*) as count 
      FROM clicks 
      WHERE link_id = ${linkId} AND device IS NOT NULL
      GROUP BY device 
      ORDER BY count DESC
    `
    
    const browserStats = await sql`
      SELECT browser, COUNT(*) as count 
      FROM clicks 
      WHERE link_id = ${linkId} AND browser IS NOT NULL
      GROUP BY browser 
      ORDER BY count DESC
    `
    
    const osStats = await sql`
      SELECT os, COUNT(*) as count 
      FROM clicks 
      WHERE link_id = ${linkId} AND os IS NOT NULL
      GROUP BY os 
      ORDER BY count DESC
    `
    
    const countryStats = await sql`
      SELECT country, COUNT(*) as count 
      FROM clicks 
      WHERE link_id = ${linkId} AND country IS NOT NULL
      GROUP BY country 
      ORDER BY count DESC 
      LIMIT 10
    `
    
    const cityStats = await sql`
      SELECT city, country, COUNT(*) as count 
      FROM clicks 
      WHERE link_id = ${linkId} AND city IS NOT NULL
      GROUP BY city, country 
      ORDER BY count DESC 
      LIMIT 10
    `
    
    // Get clicks over time (last 7 days)
    const clicksOverTime = await sql`
      SELECT DATE(clicked_at) as date, COUNT(*) as count
      FROM clicks
      WHERE link_id = ${linkId} AND clicked_at > NOW() - INTERVAL '7 days'
      GROUP BY DATE(clicked_at)
      ORDER BY date ASC
    `
    
    // Get referrer stats
    const refererStats = await sql`
      SELECT 
        CASE 
          WHEN referer = '' OR referer IS NULL THEN 'Direct'
          WHEN referer LIKE '%google%' THEN 'Google'
          WHEN referer LIKE '%facebook%' OR referer LIKE '%fb.%' THEN 'Facebook'
          WHEN referer LIKE '%twitter%' OR referer LIKE '%t.co%' THEN 'Twitter'
          WHEN referer LIKE '%linkedin%' THEN 'LinkedIn'
          WHEN referer LIKE '%instagram%' THEN 'Instagram'
          ELSE 'Other'
        END as source,
        COUNT(*) as count
      FROM clicks
      WHERE link_id = ${linkId}
      GROUP BY source
      ORDER BY count DESC
    `
    
    return NextResponse.json({ 
      clicks,
      analytics: {
        devices: deviceStats,
        browsers: browserStats,
        os: osStats,
        countries: countryStats,
        cities: cityStats,
        clicksOverTime,
        referers: refererStats
      }
    })
  } catch (error) {
    console.error('Get clicks error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
