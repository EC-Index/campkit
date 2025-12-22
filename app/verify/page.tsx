'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

function VerifyContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('Invalid verification link')
      return
    }

    verifyEmail()
  }, [token])

  const verifyEmail = async () => {
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage('Your email has been verified!')
        // Redirect to login after 3 seconds
        setTimeout(() => router.push('/login'), 3000)
      } else if (data.error === 'Token expired') {
        setStatus('expired')
        setMessage('This verification link has expired')
      } else {
        setStatus('error')
        setMessage(data.error || 'Verification failed')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        {status === 'loading' && (
          <>
            <div className="w-16 h-16 rounded-full bg-camp-500/20 flex items-center justify-center mx-auto mb-6">
              <div className="w-8 h-8 border-2 border-camp-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h1 className="font-display text-2xl font-bold mb-4">Verifying your email...</h1>
            <p className="text-midnight-400">Please wait</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">✓</span>
            </div>
            <h1 className="font-display text-2xl font-bold mb-4 text-green-400">Email Verified!</h1>
            <p className="text-midnight-400 mb-6">{message}</p>
            <p className="text-midnight-500 text-sm mb-6">Redirecting to login...</p>
            <Link 
              href="/login" 
              className="px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg inline-block"
            >
              Login Now
            </Link>
          </>
        )}

        {status === 'expired' && (
          <>
            <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">⏰</span>
            </div>
            <h1 className="font-display text-2xl font-bold mb-4 text-yellow-400">Link Expired</h1>
            <p className="text-midnight-400 mb-6">{message}</p>
            <p className="text-midnight-500 text-sm mb-6">
              Please sign up again to receive a new verification link.
            </p>
            <Link 
              href="/signup" 
              className="px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg inline-block"
            >
              Sign Up Again
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">✕</span>
            </div>
            <h1 className="font-display text-2xl font-bold mb-4 text-red-400">Verification Failed</h1>
            <p className="text-midnight-400 mb-6">{message}</p>
            <div className="space-x-4">
              <Link 
                href="/signup" 
                className="px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg inline-block"
              >
                Sign Up
              </Link>
              <Link 
                href="/login" 
                className="px-6 py-3 bg-midnight-700 hover:bg-midnight-600 text-white font-semibold rounded-lg inline-block"
              >
                Login
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-camp-500 border-t-transparent rounded-full animate-spin"></div>
      </main>
    }>
      <VerifyContent />
    </Suspense>
  )
}
