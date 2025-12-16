import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

// GET: List user's teams
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const userId = (session.user as any).id
    
    // Get user plan
    const users = await sql`SELECT plan FROM users WHERE id = ${userId}`
    const plan = users[0]?.plan || 'free'
    
    const teams = await sql`
      SELECT t.*, tm.role,
        (SELECT COUNT(*) FROM team_members WHERE team_id = t.id) as member_count
      FROM teams t
      JOIN team_members tm ON t.id = tm.team_id
      WHERE tm.user_id = ${userId}
      ORDER BY t.created_at DESC
    `
    
    return NextResponse.json({ teams, plan })
  } catch (error) {
    console.error('Get teams error:', error)
    return NextResponse.json({ error: 'Failed to get teams' }, { status: 500 })
  }
}

// POST: Create a new team
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const userId = (session.user as any).id
    
    // Check if user has team or business plan
    const users = await sql`SELECT plan FROM users WHERE id = ${userId}`
    const plan = users[0]?.plan || 'free'
    
    if (plan !== 'team' && plan !== 'business') {
      return NextResponse.json({ 
        error: 'Team workspaces require a Team or Business plan. Please upgrade to create teams.',
        requiresUpgrade: true
      }, { status: 403 })
    }
    
    const { name } = await request.json()
    
    if (!name || name.trim().length === 0) {
      return NextResponse.json({ error: 'Team name is required' }, { status: 400 })
    }
    
    // Check team limit (1 for team plan, unlimited for business)
    if (plan === 'team') {
      const existingTeams = await sql`
        SELECT COUNT(*) as count FROM teams WHERE owner_id = ${userId}
      `
      if (Number(existingTeams[0].count) >= 1) {
        return NextResponse.json({ 
          error: 'Team plan allows 1 team. Upgrade to Business for unlimited teams.',
          requiresUpgrade: true
        }, { status: 403 })
      }
    }
    
    // Create team
    const result = await sql`
      INSERT INTO teams (name, owner_id, plan, created_at)
      VALUES (${name.trim()}, ${userId}, ${plan}, NOW())
      RETURNING *
    `
    
    const team = result[0]
    
    // Add owner as admin member
    await sql`
      INSERT INTO team_members (team_id, user_id, role, joined_at)
      VALUES (${team.id}, ${userId}, 'admin', NOW())
    `
    
    return NextResponse.json({ team })
  } catch (error) {
    console.error('Create team error:', error)
    return NextResponse.json({ error: 'Failed to create team' }, { status: 500 })
  }
}
