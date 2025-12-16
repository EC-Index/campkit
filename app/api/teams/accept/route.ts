import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

// GET: Get invitation details
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    
    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 })
    }
    
    const invitations = await sql`
      SELECT ti.*, t.name as team_name
      FROM team_invitations ti
      JOIN teams t ON ti.team_id = t.id
      WHERE ti.token = ${token} AND ti.status = 'pending' AND ti.expires_at > NOW()
    `
    
    if (invitations.length === 0) {
      return NextResponse.json({ error: 'Invitation not found or expired' }, { status: 404 })
    }
    
    return NextResponse.json({ invitation: invitations[0] })
  } catch (error) {
    console.error('Get invitation error:', error)
    return NextResponse.json({ error: 'Failed to get invitation' }, { status: 500 })
  }
}

// POST: Accept an invitation
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Please log in first' }, { status: 401 })
    
    const userId = (session.user as any).id
    const userEmail = session.user.email
    const { token } = await request.json()
    
    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 })
    }
    
    // Get invitation
    const invitations = await sql`
      SELECT ti.*, t.name as team_name
      FROM team_invitations ti
      JOIN teams t ON ti.team_id = t.id
      WHERE ti.token = ${token} AND ti.status = 'pending' AND ti.expires_at > NOW()
    `
    
    if (invitations.length === 0) {
      return NextResponse.json({ error: 'Invitation not found or expired' }, { status: 404 })
    }
    
    const invitation = invitations[0]
    
    // Check if invitation email matches user email
    if (invitation.email.toLowerCase() !== userEmail?.toLowerCase()) {
      return NextResponse.json({ 
        error: `This invitation was sent to ${invitation.email}. Please log in with that email.` 
      }, { status: 403 })
    }
    
    // Check if already a member
    const existingMember = await sql`
      SELECT id FROM team_members WHERE team_id = ${invitation.team_id} AND user_id = ${userId}
    `
    
    if (existingMember.length > 0) {
      return NextResponse.json({ error: 'You are already a member of this team' }, { status: 400 })
    }
    
    // Check team member limit
    const memberCount = await sql`
      SELECT COUNT(*) as count FROM team_members WHERE team_id = ${invitation.team_id}
    `
    
    if (Number(memberCount[0].count) >= 5) {
      return NextResponse.json({ error: 'Team has reached member limit' }, { status: 403 })
    }
    
    // Add user to team
    await sql`
      INSERT INTO team_members (team_id, user_id, role, joined_at)
      VALUES (${invitation.team_id}, ${userId}, 'member', NOW())
    `
    
    // Update invitation status
    await sql`
      UPDATE team_invitations SET status = 'accepted' WHERE id = ${invitation.id}
    `
    
    return NextResponse.json({ 
      success: true,
      teamId: invitation.team_id,
      teamName: invitation.team_name
    })
  } catch (error) {
    console.error('Accept invitation error:', error)
    return NextResponse.json({ error: 'Failed to accept invitation' }, { status: 500 })
  }
}
