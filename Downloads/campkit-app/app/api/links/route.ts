import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@/lib/db'
import { nanoid } from 'nanoid'

// GET - Fetch all links for user
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id

    const links = await sql`
      SELECT 
        l.*,
        (SELECT COUNT(*) FROM clicks WHERE link_id = l.id) as clicks
      FROM links l
      WHERE l.user_id = ${userId}
      ORDER BY l.created_at DESC
    `

    return NextResponse.json({ links })
  } catch (error) {
    console.error('Get links error:', error)
    return NextResponse.json({ error: 'Failed to fetch links' }, { status: 500 })
  }
}

// POST - Create new link
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const body = await request.json()

    const {
      destination_url,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      title,
      create_short_link
    } = body

    if (!destination_url) {
      return NextResponse.json({ error: 'URL required' }, { status: 400 })
    }

    // Generate short code if requested
    const short_code = create_short_link ? nanoid(8) : null

    const result = await sql`
      INSERT INTO links (
        user_id, destination_url, utm_source, utm_medium, 
        utm_campaign, utm_term, utm_content, short_code, title, created_at
      )
      VALUES (
        ${userId}, ${destination_url}, ${utm_source || null}, ${utm_medium || null},
        ${utm_campaign || null}, ${utm_term || null}, ${utm_content || null}, 
        ${short_code}, ${title || null}, NOW()
      )
      RETURNING *
    `

    return NextResponse.json({ link: result[0] })
  } catch (error) {
    console.error('Create link error:', error)
    return NextResponse.json({ error: 'Failed to create link' }, { status: 500 })
  }
}

// DELETE - Delete a link
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const { searchParams } = new URL(request.url)
    const linkId = searchParams.get('id')

    if (!linkId) {
      return NextResponse.json({ error: 'Link ID required' }, { status: 400 })
    }

    await sql`
      DELETE FROM links 
      WHERE id = ${linkId} AND user_id = ${userId}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete link error:', error)
    return NextResponse.json({ error: 'Failed to delete link' }, { status: 500 })
  }
}
