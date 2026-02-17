import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'CampKit – UTM Link Manager',
  description: 'Create, organize, and track UTM links in one place. The affordable alternative to UTM.io.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
