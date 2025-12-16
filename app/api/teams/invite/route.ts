import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@/lib/db'
import { nanoid } from 'nanoid'

export const dynamic = 'force-dynamic'

const TEAM_MEMBER_LIMIT = 5 // Team plan limit
// Business plan = unlimited

// POST: Invite a user to a team
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const userId = (session.user as any).id
    const { teamId, email } = await request.json()
    
    if (!teamId || !email) {
      return NextResponse.json({ error: 'Team ID and email are required' }, { status: 400 })
    }
    
    // Check if user is admin of this team
    const membership = await sql`
      SELECT role FROM team_members 
      WHERE team_id = ${teamId} AND user_id = ${userId}
    `
    
    if (membership.length === 0 || membership[0].role !== 'admin') {
      return NextResponse.json({ error: 'Only admins can invite members' }, { status: 403 })
    }
    
    // Get team owner's plan
    const team = await sql`
      SELECT t.owner_id, u.plan 
      FROM teams t 
      JOIN users u ON t.owner_id = u.id 
      WHERE t.id = ${teamId}
    `
    
    if (team.length === 0) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 })
    }
    
    const ownerPlan = team[0].plan || 'team'
    
    // Check team member limit (5 for team plan, unlimited for business)
    if (ownerPlan !== 'business') {
      const memberCount = await sql`
        SELECT COUNT(*) as count FROM team_members WHERE team_id = ${teamId}
      `
      
      if (Number(memberCount[0].count) >= TEAM_MEMBER_LIMIT) {
        return NextResponse.json({ 
          error: `Team plan is limited to ${TEAM_MEMBER_LIMIT} members. Upgrade to Business for unlimited members.`,
          requiresUpgrade: true
        }, { status: 403 })
      }
    }
    
    // Check if already invited or member
    const existing = await sql`
      SELECT id FROM team_invitations 
      WHERE team_id = ${teamId} AND email = ${email} AND status = 'pending'
    `
    
    if (existing.length > 0) {
      return NextResponse.json({ error: 'User already invited' }, { status: 400 })
    }
    
    // Check if already a member
    const existingMember = await sql`
      SELECT tm.id FROM team_members tm
      JOIN users u ON tm.user_id = u.id
      WHERE tm.team_id = ${teamId} AND u.email = ${email}
    `
    
    if (existingMember.length > 0) {
      return NextResponse.json({ error: 'User is already a team member' }, { status: 400 })
    }
    
    // Create invitation
    const token = nanoid(32)
    const invitation = await sql`
      INSERT INTO team_invitations (team_id, email, invited_by, token, status, created_at, expires_at)
      VALUES (${teamId}, ${email}, ${userId}, ${token}, 'pending', NOW(), NOW() + INTERVAL '7 days')
      RETURNING *
    `
    
    return NextResponse.json({ 
      invitation: invitation[0],
      inviteLink: `https://getcampkit.com/invite/${token}`
    })
  } catch (error) {
    console.error('Invite error:', error)
    return NextResponse.json({ error: 'Failed to send invitation' }, { status: 500 })
  }
}

// GET: List pending invitations for a team
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const userId = (session.user as any).id
    const { searchParams } = new URL(request.url)
    const teamId = searchParams.get('teamId')
    
    if (!teamId) {
      return NextResponse.json({ error: 'Team ID is required' }, { status: 400 })
    }
    
    // Check if user is member of this team
    const membership = await sql`
      SELECT role FROM team_members 
      WHERE team_id = ${teamId} AND user_id = ${userId}
    `
    
    if (membership.length === 0) {
      return NextResponse.json({ error: 'Not a team member' }, { status: 403 })
    }
    
    const invitations = await sql`
      SELECT ti.*, u.email as invited_by_email
      FROM team_invitations ti
      JOIN users u ON ti.invited_by = u.id
      WHERE ti.team_id = ${teamId} AND ti.status = 'pending'
      ORDER BY ti.created_at DESC
    `
    
    return NextResponse.json({ invitations })
  } catch (error) {
    console.error('Get invitations error:', error)
    return NextResponse.json({ error: 'Failed to get invitations' }, { status: 500 })
  }
}
