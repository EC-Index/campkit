import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@/lib/db'
import { randomBytes, createHash } from 'crypto'

export const dynamic = 'force-dynamic'

// GET: List user's API keys
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const userId = (session.user as any).id
    
    // Check plan
    const users = await sql`SELECT plan FROM users WHERE id = ${userId}`
    const plan = users[0]?.plan || 'free'
    
    if (plan !== 'team' && plan !== 'business') {
      return NextResponse.json({ 
        error: 'API access requires Team or Business plan',
        requiresUpgrade: true,
        keys: []
      }, { status: 403 })
    }
    
    const keys = await sql`
      SELECT id, name, key_prefix, last_used_at, created_at
      FROM api_keys
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `
    
    return NextResponse.json({ keys, plan })
  } catch (error) {
    console.error('Get API keys error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

// POST: Create a new API key
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const userId = (session.user as any).id
    
    // Check plan
    const users = await sql`SELECT plan FROM users WHERE id = ${userId}`
    const plan = users[0]?.plan || 'free'
    
    if (plan !== 'team' && plan !== 'business') {
      return NextResponse.json({ 
        error: 'API access requires Team or Business plan',
        requiresUpgrade: true
      }, { status: 403 })
    }
    
    const { name, teamId } = await request.json()
    
    if (!name) {
      return NextResponse.json({ error: 'Name required' }, { status: 400 })
    }
    
    // Generate API key: ck_live_xxxxxxxxxxxx
    const rawKey = randomBytes(24).toString('hex')
    const apiKey = `ck_live_${rawKey}`
    const keyPrefix = apiKey.slice(0, 12) + '...'
    const keyHash = createHash('sha256').update(apiKey).digest('hex')
    
    await sql`
      INSERT INTO api_keys (user_id, team_id, name, key_hash, key_prefix, created_at)
      VALUES (${userId}, ${teamId || null}, ${name}, ${keyHash}, ${keyPrefix}, NOW())
    `
    
    // Return the full key only once
    return NextResponse.json({ 
      apiKey,
      message: 'Save this key now. You won\'t be able to see it again.'
    })
  } catch (error) {
    console.error('Create API key error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

// DELETE: Revoke an API key
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const userId = (session.user as any).id
    const { searchParams } = new URL(request.url)
    const keyId = searchParams.get('id')
    
    if (!keyId) return NextResponse.json({ error: 'ID required' }, { status: 400 })
    
    await sql`DELETE FROM api_keys WHERE id = ${keyId} AND user_id = ${userId}`
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete API key error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
