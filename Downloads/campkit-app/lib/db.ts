import { neon } from '@neondatabase/serverless'

export const sql = neon(process.env.DATABASE_URL!)

export type User = {
  id: number
  email: string
  name: string | null
  created_at: Date
}

export type Link = {
  id: number
  user_id: number
  destination_url: string
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_term: string | null
  utm_content: string | null
  short_code: string | null
  title: string | null
  clicks: number
  created_at: Date
}
