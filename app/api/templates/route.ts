import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

// GET: List templates (personal or team)
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const userId = (session.user as any).id
    const { searchParams } = new URL(request.url)
    const teamId = searchParams.get('teamId')
    
    let templates
    
    if (teamId) {
      // Check if user is member of this team
      const membership = await sql`
        SELECT role FROM team_members WHERE team_id = ${teamId} AND user_id = ${userId}
      `
      if (membership.length === 0) {
        return NextResponse.json({ error: 'Not a team member' }, { status: 403 })
      }
      
      templates = await sql`
        SELECT t.*, u.email as created_by
        FROM templates t
        JOIN users u ON t.user_id = u.id
        WHERE t.team_id = ${teamId}
        ORDER BY t.created_at DESC
      `
    } else {
      // Personal templates (no team)
      templates = await sql`
        SELECT * FROM templates 
        WHERE user_id = ${userId} AND team_id IS NULL
        ORDER BY created_at DESC
      `
    }
    
    return NextResponse.json({ templates })
  } catch (error) {
    console.error('Get templates error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

// POST: Create a template
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const userId = (session.user as any).id
    const { name, utm_source, utm_medium, utm_campaign, utm_term, utm_content, teamId } = await request.json()
    
    if (!name) return NextResponse.json({ error: 'Name required' }, { status: 400 })
    
    if (teamId) {
      // Check if user is member of this team
      const membership = await sql`
        SELECT role FROM team_members WHERE team_id = ${teamId} AND user_id = ${userId}
      `
      if (membership.length === 0) {
        return NextResponse.json({ error: 'Not a team member' }, { status: 403 })
      }
    }
    
    const result = await sql`
      INSERT INTO templates (team_id, user_id, name, utm_source, utm_medium, utm_campaign, utm_term, utm_content, created_at)
      VALUES (${teamId || null}, ${userId}, ${name}, ${utm_source || null}, ${utm_medium || null}, ${utm_campaign || null}, ${utm_term || null}, ${utm_content || null}, NOW())
      RETURNING *
    `
    
    return NextResponse.json({ template: result[0] })
  } catch (error) {
    console.error('Create template error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

// DELETE: Delete a template
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const userId = (session.user as any).id
    const { searchParams } = new URL(request.url)
    const templateId = searchParams.get('id')
    
    if (!templateId) return NextResponse.json({ error: 'ID required' }, { status: 400 })
    
    // Check ownership or team membership
    const template = await sql`SELECT user_id, team_id FROM templates WHERE id = ${templateId}`
    if (template.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    
    if (template[0].team_id) {
      const membership = await sql`
        SELECT role FROM team_members WHERE team_id = ${template[0].team_id} AND user_id = ${userId}
      `
      if (membership.length === 0) {
        return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
      }
    } else if (template[0].user_id !== userId) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
    }
    
    await sql`DELETE FROM templates WHERE id = ${templateId}`
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete template error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
