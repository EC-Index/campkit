import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'DATABASE_URL not set' }, { status: 500 })
  }

  try {
    const sql = neon(process.env.DATABASE_URL)

    // Get users
    let users: any[] = []
    try {
      users = await sql`SELECT id, email, plan, created_at FROM users ORDER BY created_at DESC LIMIT 50`
    } catch (e: any) {
      return NextResponse.json({ error: 'Users query failed', detail: e.message }, { status: 500 })
    }

    // Get links (without clicks column)
    let links: any[] = []
    try {
      links = await sql`SELECT id, short_code, created_at, user_id, destination_url, utm_source, utm_medium, utm_campaign FROM links ORDER BY created_at DESC LIMIT 30`
    } catch (e: any) {
      return NextResponse.json({ error: 'Links query failed', detail: e.message }, { status: 500 })
    }

    // Get click counts from clicks table
    let clickCounts: any[] = []
    try {
      clickCounts = await sql`SELECT link_id, COUNT(*) as clicks FROM clicks GROUP BY link_id`
    } catch (e: any) {
      // clicks table might not exist or have different structure
      clickCounts = []
    }

    // Map click counts to links
    const clickMap = new Map(clickCounts.map((c: any) => [c.link_id, Number(c.clicks)]))
    const linksWithClicks = links.map(link => ({
      ...link,
      clicks: clickMap.get(link.id) || 0
    }))

    // Count totals
    const totalUsers = users.length
    const totalLinks = links.length
    
    let totalClicks = 0
    try {
      const result = await sql`SELECT COUNT(*) as count FROM clicks`
      totalClicks = Number(result[0]?.count || 0)
    } catch {
      totalClicks = 0
    }

    // Get today's counts
    let todayUsers = 0
    let todayLinks = 0
    try {
      const result = await sql`SELECT COUNT(*) as count FROM users WHERE created_at >= CURRENT_DATE`
      todayUsers = Number(result[0]?.count || 0)
    } catch {}
    
    try {
      const result = await sql`SELECT COUNT(*) as count FROM links WHERE created_at >= CURRENT_DATE`
      todayLinks = Number(result[0]?.count || 0)
    } catch {}

    // Count pro users
    let proUsers = 0
    try {
      const result = await sql`SELECT COUNT(*) as count FROM users WHERE plan IS NOT NULL AND plan != 'free'`
      proUsers = Number(result[0]?.count || 0)
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
        conversionRate: totalUsers > 0 ? ((proUsers / totalUsers) * 100).toFixed(1) : '0',
        avgLinksPerUser: totalUsers > 0 ? (totalLinks / totalUsers).toFixed(1) : '0',
      },
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
