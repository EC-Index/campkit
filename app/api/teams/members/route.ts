import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

// GET: List team members
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
    
    const members = await sql`
      SELECT tm.id, tm.role, tm.joined_at, u.id as user_id, u.email
      FROM team_members tm
      JOIN users u ON tm.user_id = u.id
      WHERE tm.team_id = ${teamId}
      ORDER BY tm.joined_at ASC
    `
    
    return NextResponse.json({ members })
  } catch (error) {
    console.error('Get members error:', error)
    return NextResponse.json({ error: 'Failed to get members' }, { status: 500 })
  }
}

// DELETE: Remove a member from team
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const userId = (session.user as any).id
    const { searchParams } = new URL(request.url)
    const teamId = searchParams.get('teamId')
    const memberId = searchParams.get('memberId')
    
    if (!teamId || !memberId) {
      return NextResponse.json({ error: 'Team ID and Member ID are required' }, { status: 400 })
    }
    
    // Check if user is admin of this team
    const membership = await sql`
      SELECT role FROM team_members 
      WHERE team_id = ${teamId} AND user_id = ${userId}
    `
    
    if (membership.length === 0 || membership[0].role !== 'admin') {
      return NextResponse.json({ error: 'Only admins can remove members' }, { status: 403 })
    }
    
    // Cannot remove the owner
    const team = await sql`SELECT owner_id FROM teams WHERE id = ${teamId}`
    if (team.length > 0 && team[0].owner_id === parseInt(memberId)) {
      return NextResponse.json({ error: 'Cannot remove team owner' }, { status: 403 })
    }
    
    await sql`
      DELETE FROM team_members 
      WHERE team_id = ${teamId} AND user_id = ${memberId}
    `
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Remove member error:', error)
    return NextResponse.json({ error: 'Failed to remove member' }, { status: 500 })
  }
}
