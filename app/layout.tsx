import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { Providers } from './providers'
import Script from 'next/script'
import { headers } from 'next/headers'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'CampKit - UTM Link Builder & Campaign Tracking',
    template: '%s | CampKit',
  },
  description: 'Build UTM links, create branded short URLs, and track campaign performance. The Bitly alternative for marketing teams. Start free.',
  keywords: ['utm builder', 'link shortener', 'campaign tracking', 'utm tracking', 'bitly alternative', 'short links', 'marketing analytics'],
  authors: [{ name: 'CampKit' }],
  creator: 'CampKit',
  metadataBase: new URL('https://getcampkit.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://getcampkit.com',
    siteName: 'CampKit',
    title: 'CampKit - UTM Link Builder & Campaign Tracking',
    description: 'Build UTM links, create branded short URLs, and track campaign performance. Start free.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CampKit - UTM Link Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CampKit - UTM Link Builder & Campaign Tracking',
    description: 'Build UTM links, create branded short URLs, and track campaign performance. Start free.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get country from Vercel's geo headers
  const headersList = await headers()
  const country = headersList.get('x-vercel-ip-country') || ''

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17256836304"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17256836304');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased bg-midnight-900 text-white">
        <GoogleAnalytics />
        <Providers initialCountry={country}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
