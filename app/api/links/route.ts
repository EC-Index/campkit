import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@/lib/db'
import { nanoid } from 'nanoid'

export const dynamic = 'force-dynamic'

const FREE_LINK_LIMIT = 50

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
    
    let links
    let linkCount
    
    if (teamId) {
      // Check if user is member of this team
      const membership = await sql`
        SELECT role FROM team_members WHERE team_id = ${teamId} AND user_id = ${userId}
      `
      if (membership.length === 0) {
        return NextResponse.json({ error: 'Not a team member' }, { status: 403 })
      }
      
      // Get team links
      links = await sql`
        SELECT l.*, (SELECT COUNT(*) FROM clicks WHERE link_id = l.id) as clicks 
        FROM links l 
        WHERE l.team_id = ${teamId} 
        ORDER BY l.created_at DESC
      `
      const countResult = await sql`SELECT COUNT(*) as count FROM links WHERE team_id = ${teamId}`
      linkCount = Number(countResult[0].count)
    } else {
      // Get personal links (no team)
      links = await sql`
        SELECT l.*, (SELECT COUNT(*) FROM clicks WHERE link_id = l.id) as clicks 
        FROM links l 
        WHERE l.user_id = ${userId} AND l.team_id IS NULL 
        ORDER BY l.created_at DESC
      `
      const countResult = await sql`SELECT COUNT(*) as count FROM links WHERE user_id = ${userId} AND team_id IS NULL`
      linkCount = Number(countResult[0].count)
    }
    
    // Get user's teams
    const teams = await sql`
      SELECT t.id, t.name, tm.role
      FROM teams t
      JOIN team_members tm ON t.id = tm.team_id
      WHERE tm.user_id = ${userId}
      ORDER BY t.name
    `
    
    return NextResponse.json({ 
      links, 
      plan,
      linkCount,
      linkLimit: plan === 'free' ? FREE_LINK_LIMIT : null,
      teams
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
    
    const { destination_url, utm_source, utm_medium, utm_campaign, utm_term, utm_content, title, create_short_link, teamId } = await request.json()
    if (!destination_url) return NextResponse.json({ error: 'URL required' }, { status: 400 })
    
    // If teamId provided, verify membership
    if (teamId) {
      const membership = await sql`
        SELECT role FROM team_members WHERE team_id = ${teamId} AND user_id = ${userId}
      `
      if (membership.length === 0) {
        return NextResponse.json({ error: 'Not a team member' }, { status: 403 })
      }
    } else {
      // Personal link - check plan and limit
      const users = await sql`SELECT plan FROM users WHERE id = ${userId}`
      const plan = users[0]?.plan || 'free'
      
      if (plan === 'free') {
        const countResult = await sql`SELECT COUNT(*) as count FROM links WHERE user_id = ${userId} AND team_id IS NULL`
        const linkCount = Number(countResult[0].count)
        
        if (linkCount >= FREE_LINK_LIMIT) {
          return NextResponse.json({ 
            error: `Free plan is limited to ${FREE_LINK_LIMIT} links. Upgrade to Pro for unlimited links.`,
            limitReached: true
          }, { status: 403 })
        }
      }
    }
    
    const short_code = create_short_link ? nanoid(8) : null
    const result = await sql`
      INSERT INTO links (user_id, team_id, destination_url, utm_source, utm_medium, utm_campaign, utm_term, utm_content, short_code, title, created_at) 
      VALUES (${userId}, ${teamId || null}, ${destination_url}, ${utm_source||null}, ${utm_medium||null}, ${utm_campaign||null}, ${utm_term||null}, ${utm_content||null}, ${short_code}, ${title||null}, NOW()) 
      RETURNING *
    `
    return NextResponse.json({ link: result[0] })
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
    
    // Check if user owns link or is team member
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
    
    await sql`DELETE FROM links WHERE id = ${linkId}`
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
