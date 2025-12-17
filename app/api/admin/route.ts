import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET() {
  // Step 1: Check if DATABASE_URL exists
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ 
      step: 1, 
      error: 'DATABASE_URL not set' 
    }, { status: 500 })
  }

  try {
    const sql = neon(process.env.DATABASE_URL)

    // Step 2: Test basic query
    let users: any[] = []
    try {
      users = await sql`SELECT id, email, plan, created_at FROM users ORDER BY created_at DESC LIMIT 20`
    } catch (e: any) {
      return NextResponse.json({ 
        step: 2, 
        error: 'Users query failed', 
        detail: e.message 
      }, { status: 500 })
    }

    // Step 3: Test links query
    let links: any[] = []
    try {
      links = await sql`SELECT id, short_code, clicks, created_at, user_id FROM links ORDER BY created_at DESC LIMIT 20`
    } catch (e: any) {
      return NextResponse.json({ 
        step: 3, 
        error: 'Links query failed', 
        detail: e.message 
      }, { status: 500 })
    }

    // Step 4: Count queries
    let totalUsers = 0
    let totalLinks = 0
    try {
      const userCount = await sql`SELECT COUNT(*) as count FROM users`
      totalUsers = Number(userCount[0]?.count || 0)
      const linkCount = await sql`SELECT COUNT(*) as count FROM links`
      totalLinks = Number(linkCount[0]?.count || 0)
    } catch (e: any) {
      return NextResponse.json({ 
        step: 4, 
        error: 'Count query failed', 
        detail: e.message 
      }, { status: 500 })
    }

    // Success!
    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        totalLinks,
        todayUsers: 0,
        weekUsers: 0,
        proUsers: 0,
        todayLinks: 0,
        totalClicks: 0,
        todayClicks: 0,
        conversionRate: '0',
        avgLinksPerUser: totalUsers > 0 ? (totalLinks / totalUsers).toFixed(1) : '0',
      },
      recentUsers: users,
      activeUsers: users.slice(0, 10),
      recentLinks: links,
      signupsPerDay: [],
      linksPerDay: [],
      allUsers: users,
    })

  } catch (error: any) {
    return NextResponse.json({ 
      step: 0, 
      error: 'General error', 
      detail: error.message 
    }, { status: 500 })
  }
}
