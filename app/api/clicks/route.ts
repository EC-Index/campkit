import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const userId = (session.user as any).id
    const { searchParams } = new URL(request.url)
    const linkId = searchParams.get('linkId')
    
    if (!linkId) return NextResponse.json({ error: 'Link ID required' }, { status: 400 })

    // Verify user owns this link
    const link = await sql`SELECT id FROM links WHERE id = ${linkId} AND user_id = ${userId}`
    if (link.length === 0) return NextResponse.json({ error: 'Link not found' }, { status: 404 })

    // Get click details
    const clicks = await sql`
      SELECT id, clicked_at, ip_address, user_agent, referer 
      FROM clicks 
      WHERE link_id = ${linkId} 
      ORDER BY clicked_at DESC 
      LIMIT 50
    `

    return NextResponse.json({ clicks })
  } catch (error) {
    console.error('Get clicks error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
