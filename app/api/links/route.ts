import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@/lib/db'
import { nanoid } from 'nanoid'

const FREE_LINK_LIMIT = 50

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const userId = (session.user as any).id
    
    // Get user plan
    const users = await sql`SELECT plan FROM users WHERE id = ${userId}`
    const plan = users[0]?.plan || 'free'
    
    const links = await sql`SELECT l.*, (SELECT COUNT(*) FROM clicks WHERE link_id = l.id) as clicks FROM links l WHERE l.user_id = ${userId} ORDER BY l.created_at DESC`
    
    // Get link count for limit display
    const countResult = await sql`SELECT COUNT(*) as count FROM links WHERE user_id = ${userId}`
    const linkCount = Number(countResult[0].count)
    
    return NextResponse.json({ 
      links, 
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
    
    // Check user plan and link count
    const users = await sql`SELECT plan FROM users WHERE id = ${userId}`
    const plan = users[0]?.plan || 'free'
    
    if (plan === 'free') {
      const countResult = await sql`SELECT COUNT(*) as count FROM links WHERE user_id = ${userId}`
      const linkCount = Number(countResult[0].count)
      
      if (linkCount >= FREE_LINK_LIMIT) {
        return NextResponse.json({ 
          error: `Free plan is limited to ${FREE_LINK_LIMIT} links. Upgrade to Pro for unlimited links.`,
          limitReached: true
        }, { status: 403 })
      }
    }
    
    const { destination_url, utm_source, utm_medium, utm_campaign, utm_term, utm_content, title, create_short_link } = await request.json()
    if (!destination_url) return NextResponse.json({ error: 'URL required' }, { status: 400 })
    const short_code = create_short_link ? nanoid(8) : null
    const result = await sql`INSERT INTO links (user_id, destination_url, utm_source, utm_medium, utm_campaign, utm_term, utm_content, short_code, title, created_at) VALUES (${userId}, ${destination_url}, ${utm_source||null}, ${utm_medium||null}, ${utm_campaign||null}, ${utm_term||null}, ${utm_content||null}, ${short_code}, ${title||null}, NOW()) RETURNING *`
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
    await sql`DELETE FROM links WHERE id = ${linkId} AND user_id = ${userId}`
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
