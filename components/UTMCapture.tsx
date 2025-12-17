'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

// This component captures UTM parameters and stores them in sessionStorage
// Include it in your layout.tsx to track on every page

export function UTMCapture() {
  const searchParams = useSearchParams()

  useEffect(() => {
    // Only capture if UTM params exist in URL
    const utm_source = searchParams.get('utm_source')
    const utm_medium = searchParams.get('utm_medium')
    const utm_campaign = searchParams.get('utm_campaign')
    const utm_term = searchParams.get('utm_term')
    const utm_content = searchParams.get('utm_content')
    const gclid = searchParams.get('gclid')
    const fbclid = searchParams.get('fbclid')

    // Store in sessionStorage (persists until browser closes)
    if (utm_source) sessionStorage.setItem('utm_source', utm_source)
    if (utm_medium) sessionStorage.setItem('utm_medium', utm_medium)
    if (utm_campaign) sessionStorage.setItem('utm_campaign', utm_campaign)
    if (utm_term) sessionStorage.setItem('utm_term', utm_term)
    if (utm_content) sessionStorage.setItem('utm_content', utm_content)
    if (gclid) sessionStorage.setItem('gclid', gclid)
    if (fbclid) sessionStorage.setItem('fbclid', fbclid)

    // Store referrer (only on first visit)
    if (!sessionStorage.getItem('referrer') && document.referrer) {
      sessionStorage.setItem('referrer', document.referrer)
    }

    // Store landing page (only on first visit)
    if (!sessionStorage.getItem('landing_page')) {
      sessionStorage.setItem('landing_page', window.location.pathname)
    }

  }, [searchParams])

  return null // This component doesn't render anything
}

// Helper function to get all tracking data (call this at signup)
export function getTrackingData() {
  if (typeof window === 'undefined') return {}
  
  return {
    utm_source: sessionStorage.getItem('utm_source') || null,
    utm_medium: sessionStorage.getItem('utm_medium') || null,
    utm_campaign: sessionStorage.getItem('utm_campaign') || null,
    utm_term: sessionStorage.getItem('utm_term') || null,
    utm_content: sessionStorage.getItem('utm_content') || null,
    gclid: sessionStorage.getItem('gclid') || null,
    fbclid: sessionStorage.getItem('fbclid') || null,
    referrer: sessionStorage.getItem('referrer') || null,
    landing_page: sessionStorage.getItem('landing_page') || null,
  }
}

// Clear tracking data after signup (optional)
export function clearTrackingData() {
  if (typeof window === 'undefined') return
  
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'referrer', 'landing_page']
  keys.forEach(key => sessionStorage.removeItem(key))
}
