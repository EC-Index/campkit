import type { Metadata } from 'next'
import { Providers } from './providers'
import { CookieBanner } from '@/components/CookieBanner'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://getcampkit.com'),
  title: { default: 'CampKit – UTM Link Manager | Affordable UTM.io Alternative', template: '%s | CampKit' },
  description: 'Create, organize, and track UTM links in one place. CampKit is the affordable UTM.io alternative starting at $0/month.',
  keywords: ['UTM builder', 'UTM manager', 'UTM.io alternative', 'campaign tracking', 'link shortener'],
  openGraph: { type: 'website', locale: 'en_US', url: 'https://getcampkit.com', siteName: 'CampKit', title: 'CampKit – The Affordable UTM Link Manager', description: 'Stop losing track of campaign links. Free tier available.' },
  robots: { index: true, follow: true },
  verification: { google: 'wJJG44oJlsQGuYDw_Kp9DYWzgUBDMzoXfNSL5V96ZoQ' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'CampKit',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'UTM Link Manager for Marketing Teams',
    url: 'https://getcampkit.com',
    offers: [
      { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Pro', price: '9', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Team', price: '29', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Business', price: '79', priceCurrency: 'USD' }
    ]
  }
  return (
    <html lang="en">
      <head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></head>
      <body><Providers>{children}<CookieBanner /></Providers></body>
    </html>
  )
}
