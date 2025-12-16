'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  if (!sessionId) {
    return (
      <div className="text-center">
        <div className="text-5xl mb-4">❌</div>
        <h1 className="font-display text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="text-midnight-400 mb-6">We couldn't verify your payment.</p>
        <Link href="/" className="px-6 py-3 bg-camp-500 text-midnight-900 font-semibold rounded-lg">Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="text-center max-w-md">
      <div className="w-20 h-20 bg-camp-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-5xl text-camp-400">✓</span>
      </div>
      <h1 className="font-display text-3xl font-bold mb-4">Welcome to CampKit Pro!</h1>
      <p className="text-midnight-300 mb-8">Your payment was successful. You now have access to all premium features.</p>
      <Link href="/dashboard" className="block w-full px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-colors">
        Go to Dashboard →
      </Link>
      <p className="mt-4 text-midnight-500 text-sm">A receipt has been sent to your email.</p>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-midnight-900 px-6">
      <Suspense fallback={<div className="text-midnight-400">Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  )
}
