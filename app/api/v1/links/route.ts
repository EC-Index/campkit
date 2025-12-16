import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { createHash } from 'crypto'
import { nanoid } from 'nanoid'

export const dynamic = 'force-dynamic'

// Verify API key and return user info
async function verifyApiKey(request: Request) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  
  const apiKey = authHeader.replace('Bearer ', '')
  const keyHash = createHash('sha256').update(apiKey).digest('hex')
  
  const keys = await sql`
    SELECT ak.user_id, ak.team_id, ak.id as key_id
    FROM api_keys ak
    WHERE ak.key_hash = ${keyHash}
  `
  
  if (keys.length === 0) return null
  
  // Update last used
  await sql`UPDATE api_keys SET last_used_at = NOW() WHERE id = ${keys[0].key_id}`
  
  return {
    userId: keys[0].user_id,
    teamId: keys[0].team_id
  }
}

// GET: List links
export async function GET(request: Request) {
  try {
    const auth = await verifyApiKey(request)
    if (!auth) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
    }
    
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100)
    const offset = parseInt(searchParams.get('offset') || '0')
    
    let links
    if (auth.teamId) {
      links = await sql`
        SELECT id, destination_url, utm_source, utm_medium, utm_campaign, utm_term, utm_content, short_code, title, created_at,
          (SELECT COUNT(*) FROM clicks WHERE link_id = links.id) as clicks
        FROM links
        WHERE team_id = ${auth.teamId}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    } else {
      links = await sql`
        SELECT id, destination_url, utm_source, utm_medium, utm_campaign, utm_term, utm_content, short_code, title, created_at,
          (SELECT COUNT(*) FROM clicks WHERE link_id = links.id) as clicks
        FROM links
        WHERE user_id = ${auth.userId} AND team_id IS NULL
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    }
    
    return NextResponse.json({ 
      links,
      count: links.length
    })
  } catch (error) {
    console.error('API GET links error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST: Create a link
export async function POST(request: Request) {
  try {
    const auth = await verifyApiKey(request)
    if (!auth) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
    }
    
    const body = await request.json()
    const { destination_url, utm_source, utm_medium, utm_campaign, utm_term, utm_content, title, create_short_link = true } = body
    
    if (!destination_url) {
      return NextResponse.json({ error: 'destination_url is required' }, { status: 400 })
    }
    
    // Validate URL
    try {
      new URL(destination_url)
    } catch {
      return NextResponse.json({ error: 'Invalid destination_url' }, { status: 400 })
    }
    
    const short_code = create_short_link ? nanoid(8) : null
    
    const result = await sql`
      INSERT INTO links (user_id, team_id, destination_url, utm_source, utm_medium, utm_campaign, utm_term, utm_content, short_code, title, created_at)
      VALUES (${auth.userId}, ${auth.teamId || null}, ${destination_url}, ${utm_source || null}, ${utm_medium || null}, ${utm_campaign || null}, ${utm_term || null}, ${utm_content || null}, ${short_code}, ${title || null}, NOW())
      RETURNING id, destination_url, utm_source, utm_medium, utm_campaign, utm_term, utm_content, short_code, title, created_at
    `
    
    const link = result[0]
    
    // Build full UTM URL
    const fullUrl = new URL(destination_url)
    if (utm_source) fullUrl.searchParams.set('utm_source', utm_source)
    if (utm_medium) fullUrl.searchParams.set('utm_medium', utm_medium)
    if (utm_campaign) fullUrl.searchParams.set('utm_campaign', utm_campaign)
    if (utm_term) fullUrl.searchParams.set('utm_term', utm_term)
    if (utm_content) fullUrl.searchParams.set('utm_content', utm_content)
    
    return NextResponse.json({ 
      link: {
        ...link,
        full_url: fullUrl.toString(),
        short_url: short_code ? `https://getcampkit.com/r/${short_code}` : null
      }
    }, { status: 201 })
  } catch (error) {
    console.error('API POST link error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE: Delete a link
export async function DELETE(request: Request) {
  try {
    const auth = await verifyApiKey(request)
    if (!auth) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
    }
    
    const { searchParams } = new URL(request.url)
    const linkId = searchParams.get('id')
    
    if (!linkId) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }
    
    // Verify ownership
    const link = await sql`SELECT user_id, team_id FROM links WHERE id = ${linkId}`
    if (link.length === 0) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 })
    }
    
    if (auth.teamId) {
      if (link[0].team_id !== auth.teamId) {
        return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
      }
    } else {
      if (link[0].user_id !== auth.userId || link[0].team_id !== null) {
        return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
      }
    }
    
    await sql`DELETE FROM links WHERE id = ${linkId}`
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API DELETE link error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
