'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (result?.error) setError('Invalid email or password')
    else router.push('/dashboard')
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center"><span className="text-midnight-900 font-bold">C</span></div>
            <span className="font-display font-semibold text-xl">CampKit</span>
          </Link>
          <h1 className="font-display text-3xl font-bold mb-2">Welcome back</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="block text-sm font-medium mb-2">Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input" required /></div>
          <div><label className="block text-sm font-medium mb-2">Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input" required /></div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-3 bg-camp-500 text-midnight-900 font-semibold rounded-lg disabled:opacity-50">{loading ? 'Loading...' : 'Login'}</button>
        </form>
        <p className="text-center mt-6 text-midnight-400">No account? <Link href="/signup" className="text-camp-400">Sign up</Link></p>
      </div>
    </main>
  )
}
