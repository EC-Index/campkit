import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { headers } from 'next/headers'

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params

    // Find the link
    const links = await sql`
      SELECT * FROM links WHERE short_code = ${code}
    `

    if (links.length === 0) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    const link = links[0]

    // Build full URL with UTM parameters
    const url = new URL(link.destination_url)
    if (link.utm_source) url.searchParams.set('utm_source', link.utm_source)
    if (link.utm_medium) url.searchParams.set('utm_medium', link.utm_medium)
    if (link.utm_campaign) url.searchParams.set('utm_campaign', link.utm_campaign)
    if (link.utm_term) url.searchParams.set('utm_term', link.utm_term)
    if (link.utm_content) url.searchParams.set('utm_content', link.utm_content)

    // Track the click
    const headersList = headers()
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    const userAgent = headersList.get('user-agent') || ''
    const referer = headersList.get('referer') || ''

    await sql`
      INSERT INTO clicks (link_id, ip_address, user_agent, referer, clicked_at)
      VALUES (${link.id}, ${ip}, ${userAgent}, ${referer}, NOW())
    `

    return NextResponse.redirect(url.toString())
  } catch (error) {
    console.error('Redirect error:', error)
    return NextResponse.redirect(new URL('/', request.url))
  }
}
