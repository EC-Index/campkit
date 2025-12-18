import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { neon } from '@neondatabase/serverless'

export const dynamic = 'force-dynamic'

const ADMIN_EMAILS = ['th.kiene@gmail.com', 'th.kiene@googlemail.com', 'service@getcampkit.com']

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'DATABASE_URL not set' }, { status: 500 })
    }

    const sql = neon(process.env.DATABASE_URL)
    const { action, userId, email, linkId, shortCode, ip, reason } = await request.json()

    switch (action) {
      case 'delete_user': {
        if (!userId && !email) {
          return NextResponse.json({ error: 'userId or email required' }, { status: 400 })
        }

        // Get user info first
        let user
        if (userId) {
          const result = await sql`SELECT id, email FROM users WHERE id = ${userId}`
          user = result[0]
        } else {
          const result = await sql`SELECT id, email FROM users WHERE email = ${email}`
          user = result[0]
        }

        if (!user) {
          return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        // Delete user's clicks first (foreign key)
        await sql`DELETE FROM clicks WHERE link_id IN (SELECT id FROM links WHERE user_id = ${user.id})`
        
        // Delete user's links
        await sql`DELETE FROM links WHERE user_id = ${user.id}`
        
        // Delete user
        await sql`DELETE FROM users WHERE id = ${user.id}`

        console.log(`[Admin] Deleted user: ${user.email} (ID: ${user.id}) - Reason: ${reason || 'Not specified'}`)

        return NextResponse.json({ 
          success: true, 
          message: `User ${user.email} and all their data deleted`,
          deleted: { userId: user.id, email: user.email }
        })
      }

      case 'delete_link': {
        if (!linkId && !shortCode) {
          return NextResponse.json({ error: 'linkId or shortCode required' }, { status: 400 })
        }

        let link
        if (linkId) {
          const result = await sql`SELECT id, short_code, user_id FROM links WHERE id = ${linkId}`
          link = result[0]
        } else {
          const result = await sql`SELECT id, short_code, user_id FROM links WHERE short_code = ${shortCode}`
          link = result[0]
        }

        if (!link) {
          return NextResponse.json({ error: 'Link not found' }, { status: 404 })
        }

        // Delete clicks for this link
        await sql`DELETE FROM clicks WHERE link_id = ${link.id}`
        
        // Delete the link
        await sql`DELETE FROM links WHERE id = ${link.id}`

        console.log(`[Admin] Deleted link: ${link.short_code} (ID: ${link.id}) - Reason: ${reason || 'Not specified'}`)

        return NextResponse.json({ 
          success: true, 
          message: `Link ${link.short_code} and all clicks deleted`,
          deleted: { linkId: link.id, shortCode: link.short_code }
        })
      }

      case 'block_ip': {
        if (!ip) {
          return NextResponse.json({ error: 'ip required' }, { status: 400 })
        }

        // Check if blocked_ips table exists, create if not
        try {
          await sql`
            CREATE TABLE IF NOT EXISTS blocked_ips (
              id SERIAL PRIMARY KEY,
              ip_address VARCHAR(45) UNIQUE NOT NULL,
              reason TEXT,
              blocked_at TIMESTAMP DEFAULT NOW(),
              blocked_by VARCHAR(255)
            )
          `
        } catch (e) {
          // Table might already exist
        }

        // Insert blocked IP
        await sql`
          INSERT INTO blocked_ips (ip_address, reason, blocked_by)
          VALUES (${ip}, ${reason || 'Suspicious activity'}, ${session.user.email})
          ON CONFLICT (ip_address) DO UPDATE SET
            reason = EXCLUDED.reason,
            blocked_at = NOW(),
            blocked_by = EXCLUDED.blocked_by
        `

        console.log(`[Admin] Blocked IP: ${ip} - Reason: ${reason || 'Suspicious activity'}`)

        return NextResponse.json({ 
          success: true, 
          message: `IP ${ip} blocked`,
          blocked: { ip, reason }
        })
      }

      case 'delete_clicks_by_ip': {
        if (!ip) {
          return NextResponse.json({ error: 'ip required' }, { status: 400 })
        }

        const result = await sql`DELETE FROM clicks WHERE ip_address = ${ip} RETURNING id`
        const deletedCount = result.length

        console.log(`[Admin] Deleted ${deletedCount} clicks from IP: ${ip}`)

        return NextResponse.json({ 
          success: true, 
          message: `Deleted ${deletedCount} clicks from IP ${ip}`,
          deleted: { ip, count: deletedCount }
        })
      }

      case 'get_blocked_ips': {
        try {
          const blockedIps = await sql`
            SELECT ip_address, reason, blocked_at, blocked_by 
            FROM blocked_ips 
            ORDER BY blocked_at DESC
          `
          return NextResponse.json({ success: true, blockedIps })
        } catch {
          return NextResponse.json({ success: true, blockedIps: [] })
        }
      }

      case 'unblock_ip': {
        if (!ip) {
          return NextResponse.json({ error: 'ip required' }, { status: 400 })
        }

        await sql`DELETE FROM blocked_ips WHERE ip_address = ${ip}`

        console.log(`[Admin] Unblocked IP: ${ip}`)

        return NextResponse.json({ 
          success: true, 
          message: `IP ${ip} unblocked`
        })
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

  } catch (error) {
    console.error('Admin moderation error:', error)
    return NextResponse.json({ error: 'Failed to execute action' }, { status: 500 })
  }
}
