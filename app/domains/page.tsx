'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Domain = {
  id: number
  domain: string
  verified: boolean
  verification_token: string
  link_count: number
  created_at: string
}

export default function DomainsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [domains, setDomains] = useState<Domain[]>([])
  const [loading, setLoading] = useState(true)
  const [plan, setPlan] = useState<string>('free')
  const [requiresUpgrade, setRequiresUpgrade] = useState(false)
  
  const [showAdd, setShowAdd] = useState(false)
  const [newDomain, setNewDomain] = useState('')
  const [adding, setAdding] = useState(false)
  const [verifying, setVerifying] = useState<number | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null)
  const [instructions, setInstructions] = useState<{ step1: string; step2: string; step3: string } | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  useEffect(() => {
    if (session) fetchDomains()
  }, [session])

  const fetchDomains = async () => {
    const res = await fetch('/api/domains')
    const data = await res.json()
    
    if (data.requiresUpgrade) {
      setRequiresUpgrade(true)
    } else {
      setDomains(data.domains || [])
      setPlan(data.plan || 'free')
    }
    setLoading(false)
  }

  const addDomain = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDomain.trim()) return
    
    setAdding(true)
    setMessage(null)
    setInstructions(null)
    
    const res = await fetch('/api/domains', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain: newDomain.trim() })
    })
    
    const data = await res.json()
    
    if (res.ok) {
      setDomains([data.domain, ...domains])
      setInstructions(data.instructions)
      setNewDomain('')
      setShowAdd(false)
      setMessage({ type: 'info', text: 'Domain added! Follow the DNS setup instructions below.' })
    } else {
      setMessage({ type: 'error', text: data.error })
    }
    setAdding(false)
  }

  const verifyDomain = async (domainId: number) => {
    setVerifying(domainId)
    setMessage(null)
    
    const res = await fetch('/api/domains', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domainId })
    })
    
    const data = await res.json()
    
    if (data.verified) {
      setDomains(domains.map(d => d.id === domainId ? { ...d, verified: true } : d))
      setMessage({ type: 'success', text: data.message })
      setInstructions(null)
    } else {
      setMessage({ type: 'error', text: data.message })
    }
    setVerifying(null)
  }

  const deleteDomain = async (id: number) => {
    if (!confirm('Delete this domain? Links using it will revert to getcampkit.com')) return
    
    await fetch(`/api/domains?id=${id}`, { method: 'DELETE' })
    setDomains(domains.filter(d => d.id !== id))
    setMessage({ type: 'success', text: 'Domain removed' })
  }

  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { 
    month: 'short', day: 'numeric', year: 'numeric' 
  })

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midnight-900">
        <div className="text-midnight-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-midnight-900">
      <header className="border-b border-midnight-800 bg-midnight-900/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center">
              <span className="text-midnight-900 font-bold">C</span>
            </div>
            <span className="font-display font-semibold text-lg">CampKit</span>
          </Link>
          <Link href="/dashboard" className="text-midnight-400 hover:text-white text-sm">
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold">Custom Domains</h1>
            <p className="text-midnight-400 text-sm mt-1">Use your own domain for short links</p>
          </div>
          {!requiresUpgrade && !showAdd && (
            <button
              onClick={() => setShowAdd(true)}
              className="px-4 py-2 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-medium rounded-lg transition-colors"
            >
              + Add Domain
            </button>
          )}
        </div>

        {/* Upgrade Banner */}
        {requiresUpgrade && (
          <div className="p-8 bg-gradient-to-br from-camp-500/10 to-orange-500/10 border border-camp-500/30 rounded-2xl text-center mb-8">
            <div className="text-5xl mb-4">🌐</div>
            <h2 className="font-display text-2xl font-bold mb-2">Custom Domains</h2>
            <p className="text-midnight-300 mb-6 max-w-md mx-auto">
              Use your own branded domain for short links like <code className="text-camp-400">go.yourcompany.com/promo</code>
            </p>
            <Link 
              href="/#pricing" 
              className="px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-colors inline-block"
            >
              Upgrade to Pro – $9/mo
            </Link>
          </div>
        )}

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl ${
            message.type === 'success' ? 'bg-camp-500/10 border border-camp-500/30 text-camp-400' : 
            message.type === 'error' ? 'bg-red-500/10 border border-red-500/30 text-red-400' :
            'bg-blue-500/10 border border-blue-500/30 text-blue-400'
          }`}>
            {message.text}
          </div>
        )}

        {/* DNS Instructions */}
        {instructions && (
          <div className="mb-8 p-6 gradient-border">
            <h3 className="font-display font-semibold text-lg mb-4">📋 DNS Setup Instructions</h3>
            <div className="space-y-4">
              <div className="p-4 bg-midnight-800 rounded-lg">
                <p className="text-midnight-400 text-sm mb-2">Step 1: Add CNAME Record</p>
                <code className="text-camp-400 text-sm break-all">{instructions.step1}</code>
              </div>
              <div className="p-4 bg-midnight-800 rounded-lg">
                <p className="text-midnight-400 text-sm mb-2">Step 2: Add TXT Record for Verification</p>
                <code className="text-camp-400 text-sm break-all">{instructions.step2}</code>
              </div>
              <div className="p-4 bg-midnight-800 rounded-lg">
                <p className="text-midnight-400 text-sm mb-2">Step 3: Verify</p>
                <code className="text-camp-400 text-sm">{instructions.step3}</code>
              </div>
            </div>
            <button onClick={() => setInstructions(null)} className="mt-4 text-midnight-400 hover:text-white text-sm">
              Dismiss instructions
            </button>
          </div>
        )}

        {!requiresUpgrade && (
          <>
            {/* Add Domain Form */}
            {showAdd && (
              <div className="gradient-border p-6 mb-8">
                <h2 className="font-display font-semibold text-lg mb-4">Add Custom Domain</h2>
                <form onSubmit={addDomain} className="flex gap-3">
                  <input
                    type="text"
                    value={newDomain}
                    onChange={e => setNewDomain(e.target.value)}
                    placeholder="go.yourcompany.com"
                    className="flex-1 px-4 py-3 bg-midnight-800 border border-midnight-700 rounded-lg text-white placeholder:text-midnight-500 focus:border-camp-500 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    disabled={adding}
                    className="px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-colors disabled:opacity-50"
                  >
                    {adding ? 'Adding...' : 'Add'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowAdd(false); setNewDomain('') }}
                    className="px-4 py-3 text-midnight-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </form>
                <p className="text-midnight-500 text-sm mt-3">
                  Use a subdomain like <code className="text-midnight-400">go.yourcompany.com</code> or <code className="text-midnight-400">links.yourcompany.com</code>
                </p>
              </div>
            )}

            {/* Domains List */}
            {domains.length === 0 ? (
              <div className="text-center py-16 gradient-border">
                <div className="text-5xl mb-4">🌐</div>
                <h2 className="font-display text-xl font-semibold mb-2">No custom domains yet</h2>
                <p className="text-midnight-400 mb-6">
                  Add your own domain for branded short links
                </p>
                <button 
                  onClick={() => setShowAdd(true)}
                  className="px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-colors"
                >
                  + Add Domain
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {domains.map(domain => (
                  <div key={domain.id} className="gradient-border p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-display font-semibold text-lg">{domain.domain}</span>
                          {domain.verified ? (
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                              ✓ Verified
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                              Pending verification
                            </span>
                          )}
                        </div>
                        <div className="text-midnight-500 text-sm mt-1">
                          {domain.link_count} link{domain.link_count !== 1 ? 's' : ''} • Added {formatDate(domain.created_at)}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {!domain.verified && (
                          <button
                            onClick={() => verifyDomain(domain.id)}
                            disabled={verifying === domain.id}
                            className="px-4 py-2 bg-camp-500/20 text-camp-400 font-medium rounded-lg hover:bg-camp-500/30 transition-colors disabled:opacity-50"
                          >
                            {verifying === domain.id ? 'Checking...' : 'Verify'}
                          </button>
                        )}
                        <button
                          onClick={() => deleteDomain(domain.id)}
                          className="px-3 py-2 text-red-400 hover:text-red-300"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    
                    {!domain.verified && (
                      <div className="mt-4 p-4 bg-midnight-800/50 rounded-lg">
                        <p className="text-midnight-400 text-sm mb-2">TXT Record Value:</p>
                        <code className="text-camp-400 text-xs break-all">{domain.verification_token}</code>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Help Section */}
            <div className="mt-8 gradient-border p-6">
              <h3 className="font-display font-semibold mb-4">How Custom Domains Work</h3>
              <div className="space-y-3 text-sm text-midnight-300">
                <p>1. <strong>Add your domain</strong> - Enter your subdomain (e.g., go.yourcompany.com)</p>
                <p>2. <strong>Configure DNS</strong> - Add CNAME and TXT records at your domain registrar</p>
                <p>3. <strong>Verify ownership</strong> - Click verify once DNS propagates (up to 48 hours)</p>
                <p>4. <strong>Create links</strong> - Select your domain when creating new short links</p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
