'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type ApiKey = {
  id: number
  name: string
  key_prefix: string
  last_used_at: string | null
  created_at: string
}

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [keys, setKeys] = useState<ApiKey[]>([])
  const [loading, setLoading] = useState(true)
  const [plan, setPlan] = useState<string>('free')
  const [requiresUpgrade, setRequiresUpgrade] = useState(false)
  
  const [showCreate, setShowCreate] = useState(false)
  const [keyName, setKeyName] = useState('')
  const [creating, setCreating] = useState(false)
  const [newKey, setNewKey] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  useEffect(() => {
    if (session) fetchKeys()
  }, [session])

  const fetchKeys = async () => {
    const res = await fetch('/api/keys')
    const data = await res.json()
    
    if (data.requiresUpgrade) {
      setRequiresUpgrade(true)
    } else {
      setKeys(data.keys || [])
      setPlan(data.plan || 'free')
    }
    setLoading(false)
  }

  const createKey = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!keyName.trim()) return
    
    setCreating(true)
    const res = await fetch('/api/keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: keyName.trim() })
    })
    
    const data = await res.json()
    
    if (res.ok) {
      setNewKey(data.apiKey)
      setKeyName('')
      setShowCreate(false)
      fetchKeys()
    }
    setCreating(false)
  }

  const deleteKey = async (id: number) => {
    if (!confirm('Revoke this API key? This cannot be undone.')) return
    
    await fetch(`/api/keys?id=${id}`, { method: 'DELETE' })
    setKeys(keys.filter(k => k.id !== id))
  }

  const copyKey = () => {
    if (newKey) {
      navigator.clipboard.writeText(newKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
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
        <h1 className="font-display text-2xl font-bold mb-8">API Settings</h1>

        {/* Upgrade Banner */}
        {requiresUpgrade && (
          <div className="p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl text-center mb-8">
            <div className="text-5xl mb-4">🔑</div>
            <h2 className="font-display text-2xl font-bold mb-2">API Access</h2>
            <p className="text-midnight-300 mb-6 max-w-md mx-auto">
              Programmatically create and manage UTM links with our REST API.
              Available on Team and Business plans.
            </p>
            <Link 
              href="/#pricing" 
              className="px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-colors inline-block"
            >
              Upgrade to Team – $29/mo
            </Link>
          </div>
        )}

        {/* New Key Created */}
        {newKey && (
          <div className="mb-8 p-6 bg-camp-500/10 border border-camp-500/30 rounded-xl">
            <h3 className="font-semibold text-camp-400 mb-2">🎉 API Key Created!</h3>
            <p className="text-midnight-300 text-sm mb-4">
              Copy this key now. You won't be able to see it again.
            </p>
            <div className="flex gap-3">
              <code className="flex-1 px-4 py-3 bg-midnight-800 rounded-lg font-mono text-sm text-white overflow-x-auto">
                {newKey}
              </code>
              <button
                onClick={copyKey}
                className="px-4 py-2 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-medium rounded-lg transition-colors"
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
            <button 
              onClick={() => setNewKey(null)}
              className="mt-4 text-midnight-400 hover:text-white text-sm"
            >
              I've saved my key
            </button>
          </div>
        )}

        {!requiresUpgrade && (
          <>
            {/* Create Key */}
            <div className="gradient-border p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold text-lg">API Keys</h2>
                {!showCreate && (
                  <button
                    onClick={() => setShowCreate(true)}
                    className="px-4 py-2 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-medium rounded-lg transition-colors text-sm"
                  >
                    + Create Key
                  </button>
                )}
              </div>

              {showCreate && (
                <form onSubmit={createKey} className="flex gap-3 mb-6">
                  <input
                    type="text"
                    value={keyName}
                    onChange={e => setKeyName(e.target.value)}
                    placeholder="Key name (e.g. Production, CI/CD)"
                    className="flex-1 px-4 py-3 bg-midnight-800 border border-midnight-700 rounded-lg text-white placeholder:text-midnight-500 focus:border-camp-500 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    disabled={creating}
                    className="px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-colors disabled:opacity-50"
                  >
                    {creating ? '...' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowCreate(false); setKeyName('') }}
                    className="px-4 py-3 text-midnight-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </form>
              )}

              {keys.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">🔑</div>
                  <p className="text-midnight-400">No API keys yet</p>
                  <p className="text-midnight-500 text-sm mt-1">Create a key to start using the API</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {keys.map(key => (
                    <div key={key.id} className="flex items-center justify-between p-4 bg-midnight-800/50 rounded-lg">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{key.name}</span>
                          <code className="px-2 py-1 bg-midnight-700 rounded text-xs text-midnight-300 font-mono">
                            {key.key_prefix}
                          </code>
                        </div>
                        <div className="text-midnight-500 text-xs mt-1">
                          Created {formatDate(key.created_at)}
                          {key.last_used_at && ` • Last used ${formatDate(key.last_used_at)}`}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteKey(key.id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Revoke
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* API Documentation */}
            <div className="gradient-border p-6">
              <h2 className="font-display font-semibold text-lg mb-4">Quick Start</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-midnight-300 font-medium mb-2">Base URL</h3>
                  <code className="block px-4 py-3 bg-midnight-800 rounded-lg font-mono text-sm text-camp-400">
                    https://getcampkit.com/api/v1
                  </code>
                </div>

                <div>
                  <h3 className="text-midnight-300 font-medium mb-2">Authentication</h3>
                  <p className="text-midnight-400 text-sm mb-2">Include your API key in the Authorization header:</p>
                  <code className="block px-4 py-3 bg-midnight-800 rounded-lg font-mono text-sm text-white">
                    Authorization: Bearer ck_live_xxxxx
                  </code>
                </div>

                <div>
                  <h3 className="text-midnight-300 font-medium mb-2">Create a Link</h3>
                  <pre className="px-4 py-3 bg-midnight-800 rounded-lg font-mono text-sm text-white overflow-x-auto">
{`curl -X POST https://getcampkit.com/api/v1/links \\
  -H "Authorization: Bearer ck_live_xxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "destination_url": "https://example.com",
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "spring_sale",
    "title": "Spring Sale Campaign"
  }'`}
                  </pre>
                </div>

                <div>
                  <h3 className="text-midnight-300 font-medium mb-2">List Links</h3>
                  <pre className="px-4 py-3 bg-midnight-800 rounded-lg font-mono text-sm text-white overflow-x-auto">
{`curl https://getcampkit.com/api/v1/links \\
  -H "Authorization: Bearer ck_live_xxxxx"`}
                  </pre>
                </div>

                <div>
                  <h3 className="text-midnight-300 font-medium mb-2">Delete a Link</h3>
                  <pre className="px-4 py-3 bg-midnight-800 rounded-lg font-mono text-sm text-white overflow-x-auto">
{`curl -X DELETE "https://getcampkit.com/api/v1/links?id=123" \\
  -H "Authorization: Bearer ck_live_xxxxx"`}
                  </pre>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
