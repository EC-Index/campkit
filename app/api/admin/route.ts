import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'DATABASE_URL not set' }, { status: 500 })
  }

  try {
    const sql = neon(process.env.DATABASE_URL)

    // Get users with tracking data
    let users: any[] = []
    try {
      users = await sql`
        SELECT 
          id, 
          email, 
          plan, 
          created_at,
          utm_source,
          utm_medium,
          utm_campaign,
          referrer,
          gclid,
          country,
          city,
          device_type,
          signup_page
        FROM users 
        ORDER BY created_at DESC 
        LIMIT 100
      `
    } catch (e: any) {
      // Fallback if tracking columns don't exist yet
      try {
        users = await sql`SELECT id, email, plan, created_at FROM users ORDER BY created_at DESC LIMIT 100`
        users = users.map(u => ({ ...u, utm_source: null, utm_medium: null, utm_campaign: null, referrer: null, gclid: null, device_type: null }))
      } catch {
        return NextResponse.json({ error: 'Users query failed', detail: e.message }, { status: 500 })
      }
    }

    // Get links
    let links: any[] = []
    try {
      links = await sql`SELECT id, short_code, created_at, user_id, destination_url, utm_source, utm_medium, utm_campaign FROM links ORDER BY created_at DESC LIMIT 30`
    } catch (e: any) {
      links = []
    }

    // Get click counts from clicks table
    let clickCounts: any[] = []
    try {
      clickCounts = await sql`SELECT link_id, COUNT(*) as clicks FROM clicks GROUP BY link_id`
    } catch {
      clickCounts = []
    }

    // Map click counts to links
    const clickMap = new Map(clickCounts.map((c: any) => [c.link_id, Number(c.clicks)]))
    const linksWithClicks = links.map(link => ({
      ...link,
      clicks: clickMap.get(link.id) || 0
    }))

    // Count totals
    let totalUsers = 0
    let totalLinks = 0
    let totalClicks = 0
    let todayUsers = 0
    let todayLinks = 0
    let proUsers = 0

    try {
      const result = await sql`SELECT COUNT(*) as count FROM users`
      totalUsers = Number(result[0]?.count || 0)
    } catch {}
    
    try {
      const result = await sql`SELECT COUNT(*) as count FROM links`
      totalLinks = Number(result[0]?.count || 0)
    } catch {}

    try {
      const result = await sql`SELECT COUNT(*) as count FROM clicks`
      totalClicks = Number(result[0]?.count || 0)
    } catch {}

    try {
      const result = await sql`SELECT COUNT(*) as count FROM users WHERE created_at >= CURRENT_DATE`
      todayUsers = Number(result[0]?.count || 0)
    } catch {}
    
    try {
      const result = await sql`SELECT COUNT(*) as count FROM links WHERE created_at >= CURRENT_DATE`
      todayLinks = Number(result[0]?.count || 0)
    } catch {}

    try {
      const result = await sql`SELECT COUNT(*) as count FROM users WHERE plan IS NOT NULL AND plan != 'free'`
      proUsers = Number(result[0]?.count || 0)
    } catch {}

    // Traffic sources breakdown
    let trafficSources: any[] = []
    try {
      trafficSources = await sql`
        SELECT 
          COALESCE(utm_source, 'direct') as source,
          COUNT(*) as count
        FROM users
        GROUP BY utm_source
        ORDER BY count DESC
        LIMIT 10
      `
    } catch {
      trafficSources = []
    }

    // Signups by campaign
    let campaignSignups: any[] = []
    try {
      campaignSignups = await sql`
        SELECT 
          utm_campaign as campaign,
          COUNT(*) as count
        FROM users
        WHERE utm_campaign IS NOT NULL
        GROUP BY utm_campaign
        ORDER BY count DESC
        LIMIT 10
      `
    } catch {
      campaignSignups = []
    }

    // Google Ads signups (has gclid)
    let googleAdsSignups = 0
    try {
      const result = await sql`SELECT COUNT(*) as count FROM users WHERE gclid IS NOT NULL`
      googleAdsSignups = Number(result[0]?.count || 0)
    } catch {}

    // Add user email to links
    const userMap = new Map(users.map(u => [u.id, u.email]))
    const linksWithUser = linksWithClicks.map(link => ({
      ...link,
      user_email: userMap.get(link.user_id) || 'unknown'
    }))

    // Add link count to users
    const linkCountMap = new Map<number, number>()
    links.forEach(link => {
      const count = linkCountMap.get(link.user_id) || 0
      linkCountMap.set(link.user_id, count + 1)
    })
    
    const usersWithStats = users.map(user => ({
      ...user,
      link_count: linkCountMap.get(user.id) || 0,
      total_clicks: 0
    }))

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        totalLinks,
        totalClicks,
        todayUsers,
        todayLinks,
        todayClicks: 0,
        weekUsers: 0,
        proUsers,
        googleAdsSignups,
        conversionRate: totalUsers > 0 ? ((proUsers / totalUsers) * 100).toFixed(1) : '0',
        avgLinksPerUser: totalUsers > 0 ? (totalLinks / totalUsers).toFixed(1) : '0',
      },
      trafficSources,
      campaignSignups,
      recentUsers: usersWithStats.slice(0, 10),
      activeUsers: [...usersWithStats].sort((a, b) => b.link_count - a.link_count).slice(0, 10),
      recentLinks: linksWithUser,
      signupsPerDay: [],
      linksPerDay: [],
      allUsers: usersWithStats,
    })

  } catch (error: any) {
    return NextResponse.json({ error: 'General error', detail: error.message }, { status: 500 })
  }
}
