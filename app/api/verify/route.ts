import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: 'Token required' }, { status: 400 })
    }

    // Find user with this token
    const users = await sql`
      SELECT id, email, verification_expires 
      FROM users 
      WHERE verification_token = ${token}
    `

    if (users.length === 0) {
      return NextResponse.json({ error: 'Invalid verification link' }, { status: 400 })
    }

    const user = users[0]

    // Check if token expired
    if (new Date() > new Date(user.verification_expires)) {
      return NextResponse.json({ error: 'Token expired' }, { status: 400 })
    }

    // Mark email as verified
    await sql`
      UPDATE users 
      SET email_verified = true, 
          verification_token = NULL, 
          verification_expires = NULL
      WHERE id = ${user.id}
    `

    console.log(`[Email Verified] User: ${user.email}`)

    return NextResponse.json({ 
      success: true, 
      message: 'Email verified successfully',
      email: user.email
    })

  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
