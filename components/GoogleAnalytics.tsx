'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'

// ============================================
// CONFIGURATION - Replace with your IDs
// ============================================
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'        // Google Analytics 4
const AW_CONVERSION_ID = 'AW-XXXXXXXXXX'        // Google Ads Account
const AW_SIGNUP_LABEL = 'YYYYYYYYYYY'           // Signup conversion label
const AW_UPGRADE_LABEL = 'ZZZZZZZZZZZ'          // Pro upgrade conversion label
// ============================================

// Extend window type for gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

// Track page views
function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname && window.gtag) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      
      // GA4 Page View
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      })
      
      // Google Ads remarketing
      window.gtag('config', AW_CONVERSION_ID, {
        page_path: url,
      })
    }
  }, [pathname, searchParams])

  return null
}

// Main tracking component
export function GoogleAnalytics() {
  return (
    <>
      {/* Google Tag Manager / gtag.js */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      
      {/* Initialize gtag */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          // GA4 Configuration
          gtag('config', '${GA_MEASUREMENT_ID}', {
            send_page_view: false
          });
          
          // Google Ads Configuration (for conversions + remarketing)
          gtag('config', '${AW_CONVERSION_ID}');
        `}
      </Script>
      
      {/* Track page views on route change */}
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  )
}

// ============================================
// CONVERSION TRACKING FUNCTIONS
// Call these from your app when events happen
// ============================================

/**
 * Track successful signup (free account creation)
 * Call this after user successfully creates an account
 */
export function trackSignup(userId?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    // Google Ads Conversion
    window.gtag('event', 'conversion', {
      send_to: `${AW_CONVERSION_ID}/${AW_SIGNUP_LABEL}`,
      value: 1.0,
      currency: 'EUR',
    })
    
    // GA4 Event
    window.gtag('event', 'sign_up', {
      method: 'email',
      user_id: userId,
    })
    
    console.log('[Analytics] Signup conversion tracked')
  }
}

/**
 * Track Pro upgrade (paid conversion)
 * Call this after successful Stripe payment
 */
export function trackProUpgrade(value: number = 9, plan: string = 'pro') {
  if (typeof window !== 'undefined' && window.gtag) {
    // Google Ads Conversion
    window.gtag('event', 'conversion', {
      send_to: `${AW_CONVERSION_ID}/${AW_UPGRADE_LABEL}`,
      value: value,
      currency: 'EUR',
      transaction_id: Date.now().toString(),
    })
    
    // GA4 Event
    window.gtag('event', 'purchase', {
      value: value,
      currency: 'EUR',
      items: [{
        item_name: `CampKit ${plan.charAt(0).toUpperCase() + plan.slice(1)}`,
        price: value,
      }],
    })
    
    console.log('[Analytics] Upgrade conversion tracked:', plan, value)
  }
}

/**
 * Track link creation
 * Useful for understanding engagement
 */
export function trackLinkCreated(hasUtm: boolean = true, hasShortLink: boolean = true) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'link_created', {
      has_utm: hasUtm,
      has_short_link: hasShortLink,
    })
  }
}

/**
 * Track template usage
 */
export function trackTemplateUsed(templateName: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'template_used', {
      template_name: templateName,
    })
  }
}

/**
 * Track CTA button clicks
 * Useful for A/B testing landing pages
 */
export function trackCTAClick(ctaName: string, location: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', {
      cta_name: ctaName,
      location: location,
    })
  }
}
