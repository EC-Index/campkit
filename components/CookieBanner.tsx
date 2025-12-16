'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export function CookieBanner() {
  const [show, setShow] = useState(false)
  useEffect(() => { if (!localStorage.getItem('cookie-consent')) setShow(true) }, [])
  if (!show) return null
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-midnight-800 border-t border-midnight-700">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-midnight-300">We use essential cookies only. <Link href="/privacy" className="text-camp-400 underline">Privacy Policy</Link></p>
        <button onClick={() => { localStorage.setItem('cookie-consent', 'true'); setShow(false) }} className="px-6 py-2 bg-camp-500 text-midnight-900 font-medium rounded-lg">Got it</button>
      </div>
    </div>
  )
}
