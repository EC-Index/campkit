'use client'
import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  // Honeypot field - bots will fill this
  const [website, setWebsite] = useState('')
  
  // Time-based protection
  const [formLoadTime] = useState(Date.now())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Honeypot check - if filled, silently reject
    if (website) {
      // Pretend success to confuse bots
      setLoading(true)
      await new Promise(r => setTimeout(r, 2000))
      router.push('/dashboard')
      return
    }
    
    // Time check - form filled too fast (< 3 seconds)
    const timeTaken = Date.now() - formLoadTime
    if (timeTaken < 3000) {
      setError('Please slow down')
      return
    }
    
    setLoading(true)
    try {
      const res = await fetch('/api/signup', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ 
          name, 
          email, 
          password,
          _hp: website, // Send honeypot for server-side check
          _ts: formLoadTime // Send timestamp for server-side check
        }) 
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Failed'); setLoading(false); return }
      const result = await signIn('credentials', { email, password, redirect: false })
      if (result?.error) setError('Created but login failed')
      else router.push('/dashboard')
    } catch { setError('Something went wrong') }
    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center"><span className="text-midnight-900 font-bold">C</span></div>
            <span className="font-display font-semibold text-xl">CampKit</span>
          </Link>
          <h1 className="font-display text-3xl font-bold mb-2">Create account</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="block text-sm font-medium mb-2">Name</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="input" /></div>
          <div><label className="block text-sm font-medium mb-2">Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input" required /></div>
          <div><label className="block text-sm font-medium mb-2">Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input" minLength={6} required /></div>
          
          {/* Honeypot field - hidden from humans, visible to bots */}
          <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
            <label htmlFor="website">Website (leave empty)</label>
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
          
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-3 bg-camp-500 text-midnight-900 font-semibold rounded-lg disabled:opacity-50">{loading ? 'Creating...' : 'Create Account'}</button>
        </form>
        <p className="text-center mt-6 text-midnight-400">Have an account? <Link href="/login" className="text-camp-400">Login</Link></p>
      </div>
    </main>
  )
}
