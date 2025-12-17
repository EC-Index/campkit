import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

// Admin emails that can access this panel
const ADMIN_EMAILS = [
  't.kiene@gmail.com',
  'th.kiene@gmail.com',
  'th.kiene@googlemail.com',
  't.kiene@googlemail.com'
]

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    const userEmail = session?.user?.email?.toLowerCase() || ''
    const isAdmin = ADMIN_EMAILS.some(email => email.toLowerCase() === userEmail)
    
    console.log('Admin check:', { userEmail, isAdmin, sessionExists: !!session })
    
    if (!session || !isAdmin) {
      return NextResponse.json({ 
        error: 'Unauthorized', 
        debug: { userEmail, sessionExists: !!session }
      }, { status: 401 })
    }

    // Get total users
    const totalUsersResult = await sql`SELECT COUNT(*) as count FROM users`
    const totalUsers = Number(totalUsersResult[0]?.count || 0)

    // Get users registered today
    const todayUsersResult = await sql`
      SELECT COUNT(*) as count FROM users 
      WHERE created_at >= CURRENT_DATE
    `
    const todayUsers = Number(todayUsersResult[0]?.count || 0)

    // Get users registered this week
    const weekUsersResult = await sql`
      SELECT COUNT(*) as count FROM users 
      WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
    `
    const weekUsers = Number(weekUsersResult[0]?.count || 0)

    // Get total links
    const totalLinksResult = await sql`SELECT COUNT(*) as count FROM links`
    const totalLinks = Number(totalLinksResult[0]?.count || 0)

    // Get links created today
    const todayLinksResult = await sql`
      SELECT COUNT(*) as count FROM links 
      WHERE created_at >= CURRENT_DATE
    `
    const todayLinks = Number(todayLinksResult[0]?.count || 0)

    // Get total clicks
    const totalClicksResult = await sql`SELECT COUNT(*) as count FROM clicks`
    const totalClicks = Number(totalClicksResult[0]?.count || 0)

    // Get clicks today
    const todayClicksResult = await sql`
      SELECT COUNT(*) as count FROM clicks 
      WHERE clicked_at >= CURRENT_DATE
    `
    const todayClicks = Number(todayClicksResult[0]?.count || 0)

    // Get pro users count
    const proUsersResult = await sql`
      SELECT COUNT(*) as count FROM users 
      WHERE plan != 'free' AND plan IS NOT NULL
    `
    const proUsers = Number(proUsersResult[0]?.count || 0)

    // Get recent signups (last 10)
    const recentUsers = await sql`
      SELECT id, email, plan, created_at,
        (SELECT COUNT(*) FROM links WHERE links.user_id = users.id) as link_count
      FROM users 
      ORDER BY created_at DESC 
      LIMIT 10
    `

    // Get most active users (by link count)
    const activeUsers = await sql`
      SELECT 
        u.id, 
        u.email, 
        u.plan, 
        u.created_at,
        COUNT(l.id) as link_count,
        COALESCE(SUM(l.clicks), 0) as total_clicks
      FROM users u
      LEFT JOIN links l ON l.user_id = u.id
      GROUP BY u.id, u.email, u.plan, u.created_at
      ORDER BY link_count DESC
      LIMIT 10
    `

    // Get recent links with user info
    const recentLinks = await sql`
      SELECT 
        l.id,
        l.title,
        l.short_code,
        l.utm_source,
        l.utm_campaign,
        l.clicks,
        l.created_at,
        u.email as user_email
      FROM links l
      JOIN users u ON l.user_id = u.id
      ORDER BY l.created_at DESC
      LIMIT 15
    `

    // Get signups per day (last 14 days)
    const signupsPerDay = await sql`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as count
      FROM users
      WHERE created_at >= CURRENT_DATE - INTERVAL '14 days'
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `

    // Get links per day (last 14 days)
    const linksPerDay = await sql`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as count
      FROM links
      WHERE created_at >= CURRENT_DATE - INTERVAL '14 days'
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `

    // Get all users with stats
    const allUsers = await sql`
      SELECT 
        u.id, 
        u.email, 
        u.plan, 
        u.created_at,
        COUNT(l.id) as link_count,
        COALESCE(SUM(l.clicks), 0) as total_clicks
      FROM users u
      LEFT JOIN links l ON l.user_id = u.id
      GROUP BY u.id, u.email, u.plan, u.created_at
      ORDER BY u.created_at DESC
    `

    return NextResponse.json({
      stats: {
        totalUsers,
        todayUsers,
        weekUsers,
        proUsers,
        totalLinks,
        todayLinks,
        totalClicks,
        todayClicks,
        conversionRate: totalUsers > 0 ? ((proUsers / totalUsers) * 100).toFixed(1) : 0,
        avgLinksPerUser: totalUsers > 0 ? (totalLinks / totalUsers).toFixed(1) : 0,
      },
      recentUsers,
      activeUsers,
      recentLinks,
      signupsPerDay,
      linksPerDay,
      allUsers,
    })
  } catch (error) {
    console.error('Admin API error:', error)
    return NextResponse.json({ error: 'Failed to fetch admin data' }, { status: 500 })
  }
}
