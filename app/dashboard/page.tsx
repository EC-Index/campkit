'use client'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type LinkItem = { id: number; destination_url: string; utm_source: string|null; utm_medium: string|null; utm_campaign: string|null; utm_term: string|null; utm_content: string|null; short_code: string|null; title: string|null; clicks: number; created_at: string }
type ClickItem = { id: number; clicked_at: string; ip_address: string; user_agent: string; referer: string }

const templates = [
  { name: 'Google Ads', utm_source: 'google', utm_medium: 'cpc', utm_campaign: '' },
  { name: 'Facebook Ads', utm_source: 'facebook', utm_medium: 'paid_social', utm_campaign: '' },
  { name: 'Newsletter', utm_source: 'newsletter', utm_medium: 'email', utm_campaign: '' },
  { name: 'Twitter Post', utm_source: 'twitter', utm_medium: 'social', utm_campaign: '' },
  { name: 'LinkedIn Post', utm_source: 'linkedin', utm_medium: 'social', utm_campaign: '' },
]

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [links, setLinks] = useState<LinkItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showBuilder, setShowBuilder] = useState(false)
  const [copied, setCopied] = useState<string|null>(null)
  const [search, setSearch] = useState('')
  const [selectedLink, setSelectedLink] = useState<LinkItem|null>(null)
  const [clickDetails, setClickDetails] = useState<ClickItem[]>([])
  const [loadingClicks, setLoadingClicks] = useState(false)
  const [activeTab, setActiveTab] = useState<'links'|'templates'>('links')
  
  const [form, setForm] = useState({ 
    destination_url: '', 
    utm_source: '', 
    utm_medium: '', 
    utm_campaign: '', 
    utm_term: '', 
    utm_content: '', 
    title: '', 
    create_short_link: true 
  })
  const [creating, setCreating] = useState(false)

  useEffect(() => { if (status === 'unauthenticated') router.push('/login') }, [status, router])
  useEffect(() => { 
    if (session) {
      fetch('/api/links').then(r => r.json()).then(d => { 
        setLinks(d.links || []); 
        setLoading(false) 
      })
    }
  }, [session])

  const totalClicks = links.reduce((sum, l) => sum + Number(l.clicks), 0)
  const topCampaign = links.reduce((top, l) => Number(l.clicks) > (top?.clicks || 0) ? l : top, null as LinkItem|null)

  const buildUrl = (l: LinkItem) => { 
    const u = new URL(l.destination_url)
    if(l.utm_source) u.searchParams.set('utm_source', l.utm_source)
    if(l.utm_medium) u.searchParams.set('utm_medium', l.utm_medium)
    if(l.utm_campaign) u.searchParams.set('utm_campaign', l.utm_campaign)
    if(l.utm_term) u.searchParams.set('utm_term', l.utm_term)
    if(l.utm_content) u.searchParams.set('utm_content', l.utm_content)
    return u.toString()
  }

  const copy = async (text: string, id: string) => { 
    await navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const del = async (id: number) => { 
    if (!confirm('Delete this link?')) return
    await fetch(`/api/links?id=${id}`, { method: 'DELETE' })
    setLinks(links.filter(l => l.id !== id))
    if (selectedLink?.id === id) setSelectedLink(null)
  }

  const submit = async (e: React.FormEvent) => { 
    e.preventDefault()
    setCreating(true)
    const res = await fetch('/api/links', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(form) 
    })
    const data = await res.json()
    if (res.ok) { 
      setLinks([{ ...data.link, clicks: 0 }, ...links])
      setForm({ destination_url: '', utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '', title: '', create_short_link: true })
      setShowBuilder(false)
    }
    setCreating(false)
  }

  const applyTemplate = (template: typeof templates[0]) => {
    setForm({ ...form, utm_source: template.utm_source, utm_medium: template.utm_medium })
    setShowBuilder(true)
    setActiveTab('links')
  }

  const viewClicks = async (link: LinkItem) => {
    setSelectedLink(link)
    setLoadingClicks(true)
    try {
      const res = await fetch(`/api/clicks?linkId=${link.id}`)
      const data = await res.json()
      setClickDetails(data.clicks || [])
    } catch {
      setClickDetails([])
    }
    setLoadingClicks(false)
  }

  const exportCSV = () => {
    const headers = ['Title', 'URL', 'Short Code', 'Source', 'Medium', 'Campaign', 'Clicks', 'Created']
    const rows = links.map(l => [
      l.title || '', 
      l.destination_url, 
      l.short_code || '', 
      l.utm_source || '', 
      l.utm_medium || '', 
      l.utm_campaign || '', 
      l.clicks.toString(),
      new Date(l.created_at).toLocaleDateString()
    ])
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'campkit-links.csv'
    a.click()
  }

  const filteredLinks = links.filter(l => 
    (l.title?.toLowerCase() || '').includes(search.toLowerCase()) ||
    (l.utm_campaign?.toLowerCase() || '').includes(search.toLowerCase()) ||
    (l.utm_source?.toLowerCase() || '').includes(search.toLowerCase()) ||
    l.destination_url.toLowerCase().includes(search.toLowerCase())
  )

  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const formatTime = (date: string) => new Date(date).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  const parseUA = (ua: string) => {
    if (ua.includes('Mobile')) return '📱 Mobile'
    if (ua.includes('Chrome')) return '💻 Chrome'
    if (ua.includes('Firefox')) return '💻 Firefox'
    if (ua.includes('Safari')) return '💻 Safari'
    return '💻 Desktop'
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midnight-900">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-camp-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-midnight-400">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-midnight-900">
      {/* Header */}
      <header className="border-b border-midnight-800 bg-midnight-900/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center">
              <span className="text-midnight-900 font-bold">C</span>
            </div>
            <span className="font-display font-semibold text-lg">CampKit</span>
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-midnight-400 text-sm hidden sm:block">{session?.user?.email}</span>
            <button onClick={() => signOut({ callbackUrl: '/' })} className="text-midnight-400 hover:text-white text-sm transition-colors">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="gradient-border p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-midnight-400 text-sm">Total Links</span>
              <span className="text-2xl">🔗</span>
            </div>
            <div className="font-display text-3xl font-bold">{links.length}</div>
            <div className="text-midnight-500 text-sm mt-1">All time</div>
          </div>
          
          <div className="gradient-border p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-midnight-400 text-sm">Total Clicks</span>
              <span className="text-2xl">📈</span>
            </div>
            <div className="font-display text-3xl font-bold text-camp-400">{totalClicks}</div>
            <div className="text-midnight-500 text-sm mt-1">Across all links</div>
          </div>
          
          <div className="gradient-border p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-midnight-400 text-sm">Top Performer</span>
              <span className="text-2xl">🏆</span>
            </div>
            <div className="font-display text-xl font-bold truncate">
              {topCampaign?.title || topCampaign?.utm_campaign || 'No data yet'}
            </div>
            <div className="text-midnight-500 text-sm mt-1">
              {topCampaign ? `${topCampaign.clicks} clicks` : 'Create your first link'}
            </div>
          </div>
        </div>

        {/* Tabs & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('links')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'links' ? 'bg-midnight-800 text-white' : 'text-midnight-400 hover:text-white'}`}
            >
              My Links
            </button>
            <button 
              onClick={() => setActiveTab('templates')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'templates' ? 'bg-midnight-800 text-white' : 'text-midnight-400 hover:text-white'}`}
            >
              Templates
            </button>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {activeTab === 'links' && (
              <>
                <div className="relative flex-1 sm:flex-initial">
                  <input 
                    type="text"
                    placeholder="Search links..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full sm:w-64 px-4 py-2 pl-10 bg-midnight-800 border border-midnight-700 rounded-lg text-sm text-white placeholder:text-midnight-500 focus:border-camp-500 focus:outline-none"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-midnight-500">🔍</span>
                </div>
                <button onClick={exportCSV} className="px-4 py-2 border border-midnight-700 rounded-lg text-sm text-midnight-300 hover:text-white hover:border-midnight-600 transition-colors whitespace-nowrap">
                  📥 Export
                </button>
              </>
            )}
            <button 
              onClick={() => { setShowBuilder(!showBuilder); setActiveTab('links') }}
              className="px-4 py-2 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-medium rounded-lg transition-colors whitespace-nowrap"
            >
              {showBuilder ? '✕ Cancel' : '+ New Link'}
            </button>
          </div>
        </div>

        {/* Link Builder */}
        {showBuilder && (
          <div className="gradient-border p-6 mb-8">
            <h2 className="font-display font-semibold text-lg mb-4">Create UTM Link</h2>
            <form onSubmit={submit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-midnight-300">Destination URL *</label>
                  <input 
                    type="url" 
                    value={form.destination_url} 
                    onChange={e => setForm({...form, destination_url: e.target.value})} 
                    className="w-full px-4 py-3 bg-midnight-800 border border-midnight-700 rounded-lg text-white placeholder:text-midnight-500 focus:border-camp-500 focus:outline-none" 
                    placeholder="https://example.com/page"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-midnight-300">Campaign Source</label>
                  <input 
                    value={form.utm_source} 
                    onChange={e => setForm({...form, utm_source: e.target.value})} 
                    className="w-full px-4 py-3 bg-midnight-800 border border-midnight-700 rounded-lg text-white placeholder:text-midnight-500 focus:border-camp-500 focus:outline-none" 
                    placeholder="google, facebook, newsletter" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-midnight-300">Campaign Medium</label>
                  <input 
                    value={form.utm_medium} 
                    onChange={e => setForm({...form, utm_medium: e.target.value})} 
                    className="w-full px-4 py-3 bg-midnight-800 border border-midnight-700 rounded-lg text-white placeholder:text-midnight-500 focus:border-camp-500 focus:outline-none" 
                    placeholder="cpc, email, social" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-midnight-300">Campaign Name</label>
                  <input 
                    value={form.utm_campaign} 
                    onChange={e => setForm({...form, utm_campaign: e.target.value})} 
                    className="w-full px-4 py-3 bg-midnight-800 border border-midnight-700 rounded-lg text-white placeholder:text-midnight-500 focus:border-camp-500 focus:outline-none" 
                    placeholder="spring_sale, product_launch" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-midnight-300">Link Title</label>
                  <input 
                    value={form.title} 
                    onChange={e => setForm({...form, title: e.target.value})} 
                    className="w-full px-4 py-3 bg-midnight-800 border border-midnight-700 rounded-lg text-white placeholder:text-midnight-500 focus:border-camp-500 focus:outline-none" 
                    placeholder="My Campaign Link" 
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 text-sm text-midnight-300 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={form.create_short_link} 
                    onChange={e => setForm({...form, create_short_link: e.target.checked})} 
                    className="w-4 h-4 rounded border-midnight-600 bg-midnight-800 text-camp-500 focus:ring-camp-500"
                  />
                  Create short link
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="submit" 
                  disabled={creating} 
                  className="px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-colors disabled:opacity-50"
                >
                  {creating ? 'Creating...' : 'Create Link'}
                </button>
                <button 
                  type="button"
                  onClick={() => setShowBuilder(false)}
                  className="px-6 py-3 border border-midnight-700 text-midnight-300 rounded-lg hover:border-midnight-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {templates.map((t, i) => (
              <div key={i} className="gradient-border p-5 hover:bg-midnight-800/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-semibold">{t.name}</h3>
                  <button 
                    onClick={() => applyTemplate(t)}
                    className="px-3 py-1 bg-camp-500/20 text-camp-400 text-sm rounded-lg hover:bg-camp-500/30 transition-colors"
                  >
                    Use
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-midnight-800 text-xs rounded text-midnight-300">source: {t.utm_source}</span>
                  <span className="px-2 py-1 bg-midnight-800 text-xs rounded text-midnight-300">medium: {t.utm_medium}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Links List */}
        {activeTab === 'links' && (
          <>
            {filteredLinks.length === 0 ? (
              <div className="text-center py-16 gradient-border">
                <div className="text-5xl mb-4">🔗</div>
                <h2 className="font-display text-xl font-semibold mb-2">
                  {search ? 'No links found' : 'No links yet'}
                </h2>
                <p className="text-midnight-400 mb-6">
                  {search ? 'Try a different search term' : 'Create your first UTM link to get started'}
                </p>
                {!search && (
                  <button onClick={() => setShowBuilder(true)} className="px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-colors">
                    + Create Link
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLinks.map(l => (
                  <div key={l.id} className="gradient-border p-5 hover:bg-midnight-800/30 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          {l.title && <span className="font-display font-semibold text-lg">{l.title}</span>}
                          {l.short_code && (
                            <span className="px-2 py-1 bg-camp-500/20 text-camp-400 text-xs rounded-full font-medium">
                              /{l.short_code}
                            </span>
                          )}
                          <span className="text-midnight-500 text-xs">{formatDate(l.created_at)}</span>
                        </div>
                        
                        <p className="text-midnight-400 text-sm truncate mb-3 font-mono">{buildUrl(l)}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {l.utm_source && (
                            <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-lg">
                              📍 {l.utm_source}
                            </span>
                          )}
                          {l.utm_medium && (
                            <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-xs rounded-lg">
                              📢 {l.utm_medium}
                            </span>
                          )}
                          {l.utm_campaign && (
                            <span className="px-2 py-1 bg-orange-500/10 text-orange-400 text-xs rounded-lg">
                              🎯 {l.utm_campaign}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <button 
                          onClick={() => viewClicks(l)}
                          className="text-center hover:bg-midnight-800 px-4 py-2 rounded-lg transition-colors cursor-pointer"
                        >
                          <div className="font-display font-bold text-2xl text-camp-400">{l.clicks}</div>
                          <div className="text-midnight-500 text-xs">clicks</div>
                        </button>
                        
                        <div className="flex gap-2">
                          {l.short_code && (
                            <button 
                              onClick={() => copy(`${window.location.origin}/r/${l.short_code}`, `short-${l.id}`)}
                              className="px-4 py-2 bg-camp-500 hover:bg-camp-400 text-midnight-900 text-sm font-medium rounded-lg transition-colors"
                            >
                              {copied === `short-${l.id}` ? '✓ Copied!' : '📋 Short'}
                            </button>
                          )}
                          <button 
                            onClick={() => copy(buildUrl(l), `full-${l.id}`)}
                            className="px-4 py-2 border border-midnight-700 text-sm rounded-lg hover:border-midnight-600 transition-colors"
                          >
                            {copied === `full-${l.id}` ? '✓ Copied!' : 'Full URL'}
                          </button>
                          <button 
                            onClick={() => del(l.id)}
                            className="px-3 py-2 text-red-400 hover:bg-red-500/10 text-sm rounded-lg transition-colors"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Click Details Modal */}
      {selectedLink && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedLink(null)}>
          <div className="bg-midnight-900 border border-midnight-700 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-midnight-800">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display font-semibold text-xl">{selectedLink.title || 'Link Analytics'}</h2>
                  <p className="text-midnight-400 text-sm mt-1">{selectedLink.clicks} total clicks</p>
                </div>
                <button onClick={() => setSelectedLink(null)} className="text-midnight-400 hover:text-white text-2xl">×</button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {loadingClicks ? (
                <div className="text-center py-8 text-midnight-400">Loading click data...</div>
              ) : clickDetails.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">📊</div>
                  <p className="text-midnight-400">No clicks yet</p>
                  <p className="text-midnight-500 text-sm mt-1">Share your link to start tracking</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {clickDetails.map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-midnight-800/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <span className="text-xl">{parseUA(c.user_agent)}</span>
                        <div>
                          <div className="text-sm font-medium">{formatTime(c.clicked_at)}</div>
                          <div className="text-midnight-500 text-xs truncate max-w-[200px]">
                            {c.referer || 'Direct visit'}
                          </div>
                        </div>
                      </div>
                      <div className="text-midnight-500 text-xs font-mono">{c.ip_address?.slice(0, 12)}...</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
