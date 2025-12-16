'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type LinkItem = {
  id: number
  destination_url: string
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_term: string | null
  utm_content: string | null
  short_code: string | null
  title: string | null
  clicks: number
  created_at: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [links, setLinks] = useState<LinkItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showBuilder, setShowBuilder] = useState(false)
  const [copied, setCopied] = useState<number | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    destination_url: '',
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
    title: '',
    create_short_link: true,
  })
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchLinks()
    }
  }, [session])

  const fetchLinks = async () => {
    try {
      const res = await fetch('/api/links')
      const data = await res.json()
      setLinks(data.links || [])
    } catch (err) {
      console.error('Failed to fetch links')
    }
    setLoading(false)
  }

  const buildFullUrl = (link: LinkItem) => {
    const url = new URL(link.destination_url)
    if (link.utm_source) url.searchParams.set('utm_source', link.utm_source)
    if (link.utm_medium) url.searchParams.set('utm_medium', link.utm_medium)
    if (link.utm_campaign) url.searchParams.set('utm_campaign', link.utm_campaign)
    if (link.utm_term) url.searchParams.set('utm_term', link.utm_term)
    if (link.utm_content) url.searchParams.set('utm_content', link.utm_content)
    return url.toString()
  }

  const copyToClipboard = async (link: LinkItem, useShort: boolean) => {
    const url = useShort && link.short_code 
      ? `${window.location.origin}/r/${link.short_code}`
      : buildFullUrl(link)
    
    await navigator.clipboard.writeText(url)
    setCopied(link.id)
    setTimeout(() => setCopied(null), 2000)
  }

  const deleteLink = async (id: number) => {
    if (!confirm('Delete this link?')) return
    
    await fetch(`/api/links?id=${id}`, { method: 'DELETE' })
    setLinks(links.filter(l => l.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)

    try {
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      const data = await res.json()
      
      if (res.ok) {
        setLinks([{ ...data.link, clicks: 0 }, ...links])
        setFormData({
          destination_url: '',
          utm_source: '',
          utm_medium: '',
          utm_campaign: '',
          utm_term: '',
          utm_content: '',
          title: '',
          create_short_link: true,
        })
        setShowBuilder(false)
      }
    } catch (err) {
      console.error('Failed to create link')
    }
    
    setCreating(false)
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-midnight-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-midnight-900">
      {/* Header */}
      <header className="border-b border-midnight-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center">
              <span className="text-midnight-900 font-bold text-sm">C</span>
            </div>
            <span className="font-display font-semibold text-lg">CampKit</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-midnight-400 text-sm">{session?.user?.email}</span>
            <button 
              onClick={() => signOut({ callbackUrl: '/' })}
              className="text-midnight-400 hover:text-white text-sm transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Title + Action */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold">Your Links</h1>
            <p className="text-midnight-400 text-sm">{links.length} link{links.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={() => setShowBuilder(!showBuilder)}
            className="btn-primary flex items-center gap-2"
          >
            {showBuilder ? '✕ Cancel' : '+ New Link'}
          </button>
        </div>

        {/* UTM Builder */}
        {showBuilder && (
          <div className="gradient-border p-6 mb-8">
            <h2 className="font-display font-semibold text-lg mb-4">Create UTM Link</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Destination URL *</label>
                  <input
                    type="url"
                    value={formData.destination_url}
                    onChange={(e) => setFormData({ ...formData, destination_url: e.target.value })}
                    className="input"
                    placeholder="https://yoursite.com/page"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Campaign Source</label>
                  <input
                    type="text"
                    value={formData.utm_source}
                    onChange={(e) => setFormData({ ...formData, utm_source: e.target.value })}
                    className="input"
                    placeholder="google, newsletter, twitter"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Campaign Medium</label>
                  <input
                    type="text"
                    value={formData.utm_medium}
                    onChange={(e) => setFormData({ ...formData, utm_medium: e.target.value })}
                    className="input"
                    placeholder="cpc, email, social"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Campaign Name</label>
                  <input
                    type="text"
                    value={formData.utm_campaign}
                    onChange={(e) => setFormData({ ...formData, utm_campaign: e.target.value })}
                    className="input"
                    placeholder="spring_sale, product_launch"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Campaign Term</label>
                  <input
                    type="text"
                    value={formData.utm_term}
                    onChange={(e) => setFormData({ ...formData, utm_term: e.target.value })}
                    className="input"
                    placeholder="running+shoes (optional)"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Campaign Content</label>
                  <input
                    type="text"
                    value={formData.utm_content}
                    onChange={(e) => setFormData({ ...formData, utm_content: e.target.value })}
                    className="input"
                    placeholder="banner_ad, text_link (optional)"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Link Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="input"
                    placeholder="My Campaign Link (optional)"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="shortlink"
                  checked={formData.create_short_link}
                  onChange={(e) => setFormData({ ...formData, create_short_link: e.target.checked })}
                  className="w-4 h-4 rounded border-midnight-600 bg-midnight-800 text-camp-500 focus:ring-camp-500"
                />
                <label htmlFor="shortlink" className="text-sm text-midnight-300">
                  Create short link
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={creating}
                  className="btn-primary disabled:opacity-50"
                >
                  {creating ? 'Creating...' : 'Create Link'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowBuilder(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Links List */}
        {links.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🔗</div>
            <h2 className="font-display text-xl font-semibold mb-2">No links yet</h2>
            <p className="text-midnight-400 mb-6">Create your first UTM link to get started</p>
            <button onClick={() => setShowBuilder(true)} className="btn-primary">
              + Create Link
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {links.map((link) => (
              <div key={link.id} className="gradient-border p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {link.title && (
                        <span className="font-medium">{link.title}</span>
                      )}
                      {link.short_code && (
                        <span className="px-2 py-0.5 bg-camp-500/20 text-camp-400 text-xs rounded-full">
                          /{link.short_code}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-midnight-400 text-sm truncate mb-2">
                      {buildFullUrl(link)}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {link.utm_source && (
                        <span className="px-2 py-1 bg-midnight-800 text-xs rounded">
                          source: {link.utm_source}
                        </span>
                      )}
                      {link.utm_medium && (
                        <span className="px-2 py-1 bg-midnight-800 text-xs rounded">
                          medium: {link.utm_medium}
                        </span>
                      )}
                      {link.utm_campaign && (
                        <span className="px-2 py-1 bg-midnight-800 text-xs rounded">
                          campaign: {link.utm_campaign}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="font-display font-bold text-xl">{link.clicks}</div>
                      <div className="text-midnight-500 text-xs">clicks</div>
                    </div>
                    
                    <div className="flex gap-2">
                      {link.short_code && (
                        <button
                          onClick={() => copyToClipboard(link, true)}
                          className="px-3 py-2 bg-camp-500 hover:bg-camp-400 text-midnight-900 text-sm font-medium rounded-lg transition-colors"
                        >
                          {copied === link.id ? '✓ Copied!' : 'Short'}
                        </button>
                      )}
                      <button
                        onClick={() => copyToClipboard(link, false)}
                        className="px-3 py-2 border border-midnight-600 hover:border-midnight-500 text-sm rounded-lg transition-colors"
                      >
                        {copied === link.id && !link.short_code ? '✓ Copied!' : 'Full URL'}
                      </button>
                      <button
                        onClick={() => deleteLink(link.id)}
                        className="px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 text-sm rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
