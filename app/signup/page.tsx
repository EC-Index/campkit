'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'

declare global {
  interface Window {
    grecaptcha: any
  }
}

const RECAPTCHA_SITE_KEY = '6LfZVjMsAAAAAOYBJEMAM3mDW4j72wDpQnUrStYP'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [recaptchaReady, setRecaptchaReady] = useState(false)

  // Honeypot field
  const [website, setWebsite] = useState('')
  
  // Time-based check
  const [formLoadTime] = useState(Date.now())

  useEffect(() => {
    // Check if reCAPTCHA is ready
    const checkRecaptcha = setInterval(() => {
      if (window.grecaptcha && window.grecaptcha.ready) {
        window.grecaptcha.ready(() => {
          setRecaptchaReady(true)
        })
        clearInterval(checkRecaptcha)
      }
    }, 100)

    return () => clearInterval(checkRecaptcha)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Honeypot check
    if (website) {
      // Bot detected - fake success
      setSuccess(true)
      setLoading(false)
      return
    }

    // Time check - too fast = bot
    const timeSpent = Date.now() - formLoadTime
    if (timeSpent < 3000) {
      setError('Please take your time filling out the form')
      setLoading(false)
      return
    }

    try {
      // Get reCAPTCHA token
      let recaptchaToken = ''
      if (recaptchaReady && window.grecaptcha) {
        try {
          recaptchaToken = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'signup' })
        } catch (recaptchaError) {
          console.error('reCAPTCHA error:', recaptchaError)
        }
      }

      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: email.toLowerCase().trim(),
          password,
          recaptchaToken,
          formLoadTime
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to create account')
        setLoading(false)
        return
      }

      // Show success message for email verification
      setSuccess(true)

    } catch {
      setError('Something went wrong')
    }
    setLoading(false)
  }

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">✉️</span>
          </div>
          <h1 className="font-display text-3xl font-bold mb-4">Check your email!</h1>
          <p className="text-midnight-400 mb-6">
            We've sent a verification link to <strong className="text-white">{email}</strong>. 
            Click the link to activate your account.
          </p>
          <p className="text-midnight-500 text-sm">
            Didn't receive it? Check your spam folder or{' '}
            <button 
              onClick={() => setSuccess(false)} 
              className="text-camp-400 hover:underline"
            >
              try again
            </button>
          </p>
        </div>
      </main>
    )
  }

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center">
                <span className="text-midnight-900 font-bold">C</span>
              </div>
              <span className="font-display font-semibold text-xl">CampKit</span>
            </Link>
            <h1 className="font-display text-3xl font-bold mb-2">Create account</h1>
            <p className="text-midnight-400">Start tracking your campaigns for free</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot field - hidden from humans */}
            <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                value={website}
                onChange={e => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 bg-midnight-800 border border-midnight-700 rounded-lg text-white placeholder:text-midnight-500 focus:border-camp-500 focus:outline-none"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-midnight-800 border border-midnight-700 rounded-lg text-white placeholder:text-midnight-500 focus:border-camp-500 focus:outline-none"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-midnight-800 border border-midnight-700 rounded-lg text-white placeholder:text-midnight-500 focus:border-camp-500 focus:outline-none"
                placeholder="Min. 6 characters"
                minLength={6}
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

            <p className="text-xs text-midnight-500 text-center">
              By signing up, you agree to our{' '}
              <Link href="/terms" className="text-camp-400 hover:underline">Terms</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-camp-400 hover:underline">Privacy Policy</Link>
            </p>
          </form>

          <p className="text-center mt-6 text-midnight-400">
            Already have an account?{' '}
            <Link href="/login" className="text-camp-400 hover:underline">Login</Link>
          </p>

          <p className="text-xs text-midnight-600 text-center mt-8">
            Protected by reCAPTCHA
          </p>
        </div>
      </main>
    </>
  )
}
