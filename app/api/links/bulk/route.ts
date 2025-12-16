import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@/lib/db'
import { nanoid } from 'nanoid'

export const dynamic = 'force-dynamic'

// POST: Create multiple links at once
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const userId = (session.user as any).id
    const { links, teamId } = await request.json()
    
    if (!links || !Array.isArray(links) || links.length === 0) {
      return NextResponse.json({ error: 'Links array required' }, { status: 400 })
    }
    
    if (links.length > 100) {
      return NextResponse.json({ error: 'Maximum 100 links per batch' }, { status: 400 })
    }
    
    // Check plan - bulk is for Team/Business only
    const users = await sql`SELECT plan FROM users WHERE id = ${userId}`
    const plan = users[0]?.plan || 'free'
    
    if (plan !== 'team' && plan !== 'business') {
      return NextResponse.json({ 
        error: 'Bulk link builder requires Team or Business plan',
        requiresUpgrade: true
      }, { status: 403 })
    }
    
    // If teamId, verify membership
    if (teamId) {
      const membership = await sql`
        SELECT role FROM team_members WHERE team_id = ${teamId} AND user_id = ${userId}
      `
      if (membership.length === 0) {
        return NextResponse.json({ error: 'Not a team member' }, { status: 403 })
      }
    }
    
    // Create all links
    const createdLinks = []
    
    for (const link of links) {
      if (!link.destination_url) continue
      
      const short_code = link.create_short_link !== false ? nanoid(8) : null
      
      const result = await sql`
        INSERT INTO links (user_id, team_id, destination_url, utm_source, utm_medium, utm_campaign, utm_term, utm_content, short_code, title, created_at)
        VALUES (${userId}, ${teamId || null}, ${link.destination_url}, ${link.utm_source || null}, ${link.utm_medium || null}, ${link.utm_campaign || null}, ${link.utm_term || null}, ${link.utm_content || null}, ${short_code}, ${link.title || null}, NOW())
        RETURNING *
      `
      
      createdLinks.push({ ...result[0], clicks: 0 })
    }
    
    return NextResponse.json({ 
      links: createdLinks,
      count: createdLinks.length
    })
  } catch (error) {
    console.error('Bulk create error:', error)
    return NextResponse.json({ error: 'Failed to create links' }, { status: 500 })
  }
}
