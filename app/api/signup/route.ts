import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { sql } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()
    if (!email || !password) return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    if (password.length < 6) return NextResponse.json({ error: 'Password must be 6+ chars' }, { status: 400 })
    const existing = await sql`SELECT id FROM users WHERE email = ${email}`
    if (existing.length > 0) return NextResponse.json({ error: 'Email exists' }, { status: 400 })
    const password_hash = await hash(password, 12)
    const result = await sql`INSERT INTO users (email, password_hash, name, created_at) VALUES (${email}, ${password_hash}, ${name || null}, NOW()) RETURNING id, email, name`
    return NextResponse.json({ success: true, user: result[0] })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
