'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    if (sessionId) {
      // Payment was successful
      setStatus('success')
    } else {
      setStatus('error')
    }
  }, [sessionId])

  if (status === 'loading') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-midnight-900">
        <div className="text-midnight-400">Loading...</div>
      </main>
    )
  }

  if (status === 'error') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-midnight-900 px-6">
        <div className="text-center">
          <div className="text-5xl mb-4">❌</div>
          <h1 className="font-display text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-midnight-400 mb-6">We couldn't verify your payment.</p>
          <Link href="/" className="px-6 py-3 bg-camp-500 text-midnight-900 font-semibold rounded-lg">
            Back to Home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-midnight-900 px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-camp-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">✓</span>
        </div>
        <h1 className="font-display text-3xl font-bold mb-4">Welcome to CampKit Pro!</h1>
        <p className="text-midnight-300 mb-8">
          Your payment was successful. You now have access to all premium features.
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/dashboard" 
            className="block w-full px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-colors"
          >
            Go to Dashboard →
          </Link>
          
          <p className="text-midnight-500 text-sm">
            A receipt has been sent to your email.
          </p>
        </div>

        <div className="mt-12 p-6 bg-midnight-800/50 rounded-xl text-left">
          <h2 className="font-semibold mb-3">What's included:</h2>
          <ul className="space-y-2 text-sm text-midnight-300">
            <li className="flex items-center gap-2">
              <span className="text-camp-400">✓</span>
              Unlimited UTM links
            </li>
            <li className="flex items-center gap-2">
              <span className="text-camp-400">✓</span>
              Advanced click analytics
            </li>
            <li className="flex items-center gap-2">
              <span className="text-camp-400">✓</span>
              Custom short domains
            </li>
            <li className="flex items-center gap-2">
              <span className="text-camp-400">✓</span>
              UTM templates
            </li>
            <li className="flex items-center gap-2">
              <span className="text-camp-400">✓</span>
              Priority support
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
