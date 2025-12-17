'use client'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import AdvancedAnalytics from '@/app/components/AdvancedAnalytics'

type LinkItem = { id: number; destination_url: string; utm_source: string|null; utm_medium: string|null; utm_campaign: string|null; utm_term: string|null; utm_content: string|null; short_code: string|null; title: string|null; clicks: number; created_at: string; team_id: number|null; custom_domain: string|null }
type ClickItem = { id: number; clicked_at: string; ip_address: string; user_agent: string; referer: string; device?: string; browser?: string; os?: string; country?: string; city?: string }
type Team = { id: number; name: string; role: string }
type Template = { id: number; name: string; utm_source: string|null; utm_medium: string|null; utm_campaign: string|null; utm_term: string|null; utm_content: string|null; created_by?: string }
type BulkLink = { destination_url: string; utm_source: string; utm_medium: string; utm_campaign: string; title: string }
type CustomDomain = { id: number; domain: string; verified: boolean }
type Analytics = { devices: { device: string; count: number }[]; browsers: { browser: string; count: number }[]; os: { os: string; count: number }[]; countries: { country: string; count: number }[]; cities: { city: string; country: string; count: number }[]; clicksOverTime: { date: string; count: number }[]; referers: { source: string; count: number }[] }

function BarChart({ data, label }: { data: { name: string; count: number }[]; label: string }) {
  const max = Math.max(...data.map(d => Number(d.count)), 1)
  return (
    <div className="space-y-2">
      <h4 className="text-midnight-400 text-sm font-medium">{label}</h4>
      {data.length === 0 ? <p className="text-midnight-500 text-xs">No data yet</p> : data.slice(0, 5).map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-20 text-xs text-midnight-300 truncate">{item.name || 'Unknown'}</div>
          <div className="flex-1 h-6 bg-midnight-800 rounded overflow-hidden"><div className="h-full bg-camp-500/50 rounded" style={{ width: `${(Number(item.count) / max) * 100}%` }} /></div>
          <div className="w-8 text-xs text-midnight-400 text-right">{item.count}</div>
        </div>
      ))}
    </div>
  )
}

function Tooltip({ children, text }: { children: React.ReactNode; text: string }) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute left-0 top-full mt-2 w-64 p-3 bg-midnight-800 border border-midnight-700 rounded-lg text-xs text-midnight-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-xl">
        {text}
      </div>
    </div>
  )
}

function DashboardContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [links, setLinks] = useState<LinkItem[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [domains, setDomains] = useState<CustomDomain[]>([])
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [showBuilder, setShowBuilder] = useState(false)
  const [copied, setCopied] = useState<string|null>(null)
  const [search, setSearch] = useState('')
  const [selectedLink, setSelectedLink] = useState<LinkItem|null>(null)
  const [clickDetails, setClickDetails] = useState<ClickItem[]>([])
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loadingClicks, setLoadingClicks] = useState(false)
  const [analyticsTab, setAnalyticsTab] = useState<'clicks'|'devices'|'geo'|'sources'>('clicks')
  const [activeTab, setActiveTab] = useState<'links'|'templates'|'bulk'>('links')
  const [plan, setPlan] = useState<string>('free')
  const [linkCount, setLinkCount] = useState(0)
  const [linkLimit, setLinkLimit] = useState<number|null>(50)
  const [error, setError] = useState<string|null>(null)
  const [showUSPBanner, setShowUSPBanner] = useState(true)
  
  const [templates, setTemplates] = useState<Template[]>([])
  const [showSaveTemplate, setShowSaveTemplate] = useState(false)
  const [templateName, setTemplateName] = useState('')
  const [savingTemplate, setSavingTemplate] = useState(false)
  
  const [bulkLinks, setBulkLinks] = useState<BulkLink[]>([{ destination_url: '', utm_source: '', utm_medium: '', utm_campaign: '', title: '' }])
  const [bulkCreating, setBulkCreating] = useState(false)
  const [bulkResult, setBulkResult] = useState<{ count: number } | null>(null)
  
  const [form, setForm] = useState({ destination_url: '', utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '', title: '', create_short_link: true, domainId: '' })
  const [creating, setCreating] = useState(false)

  useEffect(() => { if (status === 'unauthenticated') router.push('/login') }, [status, router])
  useEffect(() => { const t = searchParams.get('team'); if (t) setSelectedTeamId(parseInt(t)) }, [searchParams])
  useEffect(() => { if (session) { fetchLinks(); fetchTemplates() } }, [session, selectedTeamId])

  const fetchLinks = async () => {
    setLoading(true)
    const url = selectedTeamId ? `/api/links?teamId=${selectedTeamId}` : '/api/links'
    const res = await fetch(url)
    const data = await res.json()
    setLinks(data.links || [])
    setPlan(data.plan || 'free')
    setLinkCount(data.linkCount || 0)
    setLinkLimit(data.linkLimit)
    setTeams(data.teams || [])
    setDomains(data.domains || [])
    setLoading(false)
  }

  const fetchTemplates = async () => {
    const url = selectedTeamId ? `/api/templates?teamId=${selectedTeamId}` : '/api/templates'
    const res = await fetch(url)
    const data = await res.json()
    setTemplates(data.templates || [])
  }

  const switchTeam = (teamId: number | null) => { setSelectedTeamId(teamId); router.push(teamId ? `/dashboard?team=${teamId}` : '/dashboard') }
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

  const getShortUrl = (l: LinkItem) => {
    if (!l.short_code) return null
    const domain = l.custom_domain || 'getcampkit.com'
    return `https://${domain}/r/${l.short_code}`
  }

  const copy = async (text: string, id: string) => { await navigator.clipboard.writeText(text); setCopied(id); setTimeout(() => setCopied(null), 2000) }
  const del = async (id: number) => { if (!confirm('Delete this link?')) return; await fetch(`/api/links?id=${id}`, { method: 'DELETE' }); setLinks(links.filter(l => l.id !== id)); setLinkCount(prev => prev - 1); if (selectedLink?.id === id) setSelectedLink(null) }

  const submit = async (e: React.FormEvent) => { 
    e.preventDefault(); setError(null); setCreating(true)
    const res = await fetch('/api/links', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, domainId: form.domainId || null, teamId: selectedTeamId }) })
    const data = await res.json()
    if (res.ok) { setLinks([{ ...data.link, clicks: 0 }, ...links]); setLinkCount(prev => prev + 1); setForm({ destination_url: '', utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '', title: '', create_short_link: true, domainId: '' }); setShowBuilder(false) }
    else { setError(data.error || 'Failed to create link') }
    setCreating(false)
  }

  const applyTemplate = (t: Template) => { setForm({ ...form, utm_source: t.utm_source || '', utm_medium: t.utm_medium || '', utm_campaign: t.utm_campaign || '', utm_term: t.utm_term || '', utm_content: t.utm_content || '' }); setShowBuilder(true); setActiveTab('links') }
  const saveAsTemplate = async () => { if (!templateName.trim()) return; setSavingTemplate(true); const res = await fetch('/api/templates', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: templateName, utm_source: form.utm_source, utm_medium: form.utm_medium, utm_campaign: form.utm_campaign, utm_term: form.utm_term, utm_content: form.utm_content, teamId: selectedTeamId }) }); if (res.ok) { const data = await res.json(); setTemplates([data.template, ...templates]); setShowSaveTemplate(false); setTemplateName('') } setSavingTemplate(false) }
  const deleteTemplate = async (id: number) => { if (!confirm('Delete this template?')) return; await fetch(`/api/templates?id=${id}`, { method: 'DELETE' }); setTemplates(templates.filter(t => t.id !== id)) }

  const addBulkRow = () => setBulkLinks([...bulkLinks, { destination_url: '', utm_source: '', utm_medium: '', utm_campaign: '', title: '' }])
  const removeBulkRow = (i: number) => { if (bulkLinks.length > 1) setBulkLinks(bulkLinks.filter((_, idx) => idx !== i)) }
  const updateBulkRow = (i: number, f: keyof BulkLink, v: string) => { const u = [...bulkLinks]; u[i][f] = v; setBulkLinks(u) }
  const submitBulk = async () => { setError(null); setBulkResult(null); setBulkCreating(true); const valid = bulkLinks.filter(l => l.destination_url.trim()); if (!valid.length) { setError('Add at least one URL'); setBulkCreating(false); return } const res = await fetch('/api/links/bulk', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ links: valid, teamId: selectedTeamId }) }); const data = await res.json(); if (res.ok) { setLinks([...data.links, ...links]); setLinkCount(prev => prev + data.count); setBulkResult({ count: data.count }); setBulkLinks([{ destination_url: '', utm_source: '', utm_medium: '', utm_campaign: '', title: '' }]) } else { setError(data.error) } setBulkCreating(false) }

  const viewClicks = async (link: LinkItem) => { setSelectedLink(link); setAnalyticsTab('clicks'); setLoadingClicks(true); try { const res = await fetch(`/api/clicks?linkId=${link.id}`); const data = await res.json(); setClickDetails(data.clicks || []); setAnalytics(data.analytics || null) } catch { setClickDetails([]); setAnalytics(null) } setLoadingClicks(false) }
  const exportCSV = () => { const h = ['Title', 'URL', 'Short Code', 'Domain', 'Source', 'Medium', 'Campaign', 'Clicks', 'Created']; const r = links.map(l => [l.title || '', l.destination_url, l.short_code || '', l.custom_domain || 'getcampkit.com', l.utm_source || '', l.utm_medium || '', l.utm_campaign || '', l.clicks.toString(), new Date(l.created_at).toLocaleDateString()]); const csv = [h, ...r].map(x => x.map(c => `"${c}"`).join(',')).join('\n'); const b = new Blob([csv], { type: 'text/csv' }); const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = 'campkit-links.csv'; a.click() }

  const filteredLinks = links.filter(l => (l.title?.toLowerCase() || '').includes(search.toLowerCase()) || (l.utm_campaign?.toLowerCase() || '').includes(search.toLowerCase()) || (l.utm_source?.toLowerCase() || '').includes(search.toLowerCase()) || l.destination_url.toLowerCase().includes(search.toLowerCase()))
  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const formatTime = (d: string) => new Date(d).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  
  const getPlanBadge = () => { 
    if (selectedTeamId) return <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full font-medium">TEAM</span>
    switch(plan) { 
      case 'pro': return <span className="px-2 py-1 bg-camp-500/20 text-camp-400 text-xs rounded-full font-medium">PRO</span>
      case 'team': return <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full font-medium">TEAM</span>
      case 'business': return <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full font-medium">BUSINESS</span>
      default: return <span className="px-2 py-1 bg-midnight-700 text-midnight-400 text-xs rounded-full font-medium">FREE</span> 
    } 
  }
  
  const canUseBulk = plan === 'team' || plan === 'business'
  const selectedTeam = teams.find(t => t.id === selectedTeamId)
  const isNewUser = linkCount === 0
  const hasClicks = totalClicks > 0

  if (status === 'loading' || loading) return <div className="min-h-screen flex items-center justify-center bg-midnight-900"><div className="flex items-center gap-3"><div className="w-6 h-6 border-2 border-camp-500 border-t-transparent rounded-full animate-spin"></div><span className="text-midnight-400">Loading...</span></div></div>

  return (
    <div className="min-h-screen bg-midnight-900">
      {/* Header */}
      <header className="border-b border-midnight-800 bg-midnight-900/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center">
                <span className="text-midnight-900 font-bold">C</span>
              </div>
              <span className="font-display font-semibold text-lg">CampKit</span>
            </Link>
            {teams.length > 0 && (
              <select 
                value={selectedTeamId || ''} 
                onChange={e => switchTeam(e.target.value ? parseInt(e.target.value) : null)} 
                className="ml-4 px-3 py-1.5 bg-midnight-800 border border-midnight-700 rounded-lg text-sm text-white focus:border-camp-500 focus:outline-none"
              >
                <option value="">Personal</option>
                {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            )}
          </div>
          <div className="flex items-center gap-4">
            {getPlanBadge()}
            {plan !== 'free' && <Link href="/domains" className="text-midnight-400 hover:text-white text-sm">🌐 Domains</Link>}
            {(plan === 'team' || plan === 'business') && <Link href="/settings" className="text-midnight-400 hover:text-white text-sm">🔑 API</Link>}
            {teams.length > 0 && <Link href="/team" className="text-midnight-400 hover:text-white text-sm">⚙️ Teams</Link>}
            <span className="text-midnight-400 text-sm hidden sm:block">{session?.user?.email}</span>
            <button onClick={() => signOut({ callbackUrl: '/' })} className="text-midnight-400 hover:text-white text-sm transition-colors">Logout</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* ========== USP Banner - Why CampKit vs Bitly ========== */}
        {showUSPBanner && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-camp-500/10 border border-blue-500/20 rounded-xl relative">
            <button onClick={() => setShowUSPBanner(false)} className="absolute top-3 right-3 text-midnight-500 hover:text-white text-lg leading-none">×</button>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <p className="font-semibold text-white mb-1">💡 CampKit tracks marketing campaigns, not just clicks.</p>
                <p className="text-midnight-400 text-sm">Every link includes UTMs, campaign analytics, and team collaboration — things Bitly doesn't do well.</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-midnight-800 rounded text-midnight-300">✓ UTMs built-in</span>
                <span className="px-2 py-1 bg-midnight-800 rounded text-midnight-300">✓ Campaign analytics</span>
                <span className="px-2 py-1 bg-midnight-800 rounded text-midnight-300">✓ No spreadsheets</span>
              </div>
            </div>
          </div>
        )}

        {/* Team Context Banner */}
        {selectedTeam && (
          <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center justify-between">
            <div>
              <p className="font-medium text-blue-400">👥 {selectedTeam.name}</p>
              <p className="text-midnight-400 text-sm">Team workspace • Shared with all members</p>
            </div>
            <Link href="/team" className="px-4 py-2 bg-blue-500/20 text-blue-400 font-medium rounded-lg hover:bg-blue-500/30 transition-colors text-sm">Manage Team</Link>
          </div>
        )}

        {/* ========== Contextual Upgrade Banner ========== */}
        {!selectedTeamId && plan === 'free' && (
          <div className="mb-6 p-4 bg-gradient-to-r from-camp-500/10 to-camp-400/10 border border-camp-500/30 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold flex items-center gap-2">
                🔓 {hasClicks ? 'See which campaigns convert best' : 'Unlock unlimited links + campaign analytics'}
              </p>
              <p className="text-midnight-400 text-sm">
                {linkLimit && `${linkCount}/${linkLimit} links used. `}
                Custom domains, geo data, device breakdowns & more.
              </p>
            </div>
            <Link href="/#pricing" className="px-5 py-2.5 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-colors whitespace-nowrap">
              Upgrade to Pro
            </Link>
          </div>
        )}

        {/* ========== KPI Cards with Context ========== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="gradient-border p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-midnight-400 text-sm">Total Links</span>
              <span className="text-2xl">🔗</span>
            </div>
            <div className="font-display text-3xl font-bold">
              {linkCount}
              {!selectedTeamId && linkLimit && <span className="text-lg text-midnight-500">/{linkLimit}</span>}
            </div>
            <p className="text-midnight-500 text-sm mt-1">
              {isNewUser 
                ? 'Create links for ads, emails & social campaigns' 
                : (selectedTeamId 
                    ? 'Team links' 
                    : (plan === 'free' ? `${linkLimit! - linkCount} remaining` : 'Unlimited')
                  )
              }
            </p>
          </div>
          
          <div className="gradient-border p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-midnight-400 text-sm">Total Clicks</span>
              <span className="text-2xl">📈</span>
            </div>
            <div className="font-display text-3xl font-bold text-camp-400">{totalClicks}</div>
            <p className="text-midnight-500 text-sm mt-1">
              {totalClicks === 0 
                ? 'Clicks are tracked automatically — no GA setup needed' 
                : 'Across all links'
              }
            </p>
          </div>
          
          <div className="gradient-border p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-midnight-400 text-sm">Top Performer</span>
              <span className="text-2xl">🏆</span>
            </div>
            <div className="font-display text-xl font-bold truncate">
              {topCampaign?.title || topCampaign?.utm_campaign || (isNewUser ? '—' : 'No data yet')}
            </div>
            <p className="text-midnight-500 text-sm mt-1">
              {topCampaign 
                ? `${topCampaign.clicks} clicks` 
                : 'Your best campaign will appear here'
              }
            </p>
          </div>
        </div>

        {/* ========== Advanced Analytics (Pro/Team/Business only) ========== */}
        {plan !== 'free' && (
          <AdvancedAnalytics teamId={selectedTeamId} />
        )}

        {/* ========== Tabs with Tooltips ========== */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab('links')} 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'links' ? 'bg-midnight-800 text-white' : 'text-midnight-400 hover:text-white'}`}
            >
              My Links
            </button>
            
            <Tooltip text="Templates help teams keep UTM naming consistent across campaigns. Save time, avoid typos.">
              <button 
                onClick={() => setActiveTab('templates')} 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'templates' ? 'bg-midnight-800 text-white' : 'text-midnight-400 hover:text-white'}`}
              >
                Templates
              </button>
            </Tooltip>
            
            <Tooltip text="Create dozens of tracking links at once — perfect for ad campaigns, newsletters & multi-channel launches.">
              <button 
                onClick={() => setActiveTab('bulk')} 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'bulk' ? 'bg-midnight-800 text-white' : 'text-midnight-400 hover:text-white'}`}
              >
                Bulk Builder {!canUseBulk && <span className="text-midnight-600 ml-1">🔒</span>}
              </button>
            </Tooltip>
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
            {activeTab !== 'bulk' && (
              <button 
                onClick={() => { setShowBuilder(!showBuilder); setActiveTab('links'); setError(null) }} 
                className="px-4 py-2 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-medium rounded-lg transition-colors whitespace-nowrap"
              >
                {showBuilder ? '✕ Cancel' : '+ New Link'}
              </button>
            )}
          </div>
        </div>

        {/* Error & Success Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <p className="text-red-400">{error}</p>
            {error.includes('Upgrade') && <Link href="/#pricing" className="inline-block mt-2 text-camp-400 hover:text-camp-300 text-sm">View pricing →</Link>}
          </div>
        )}
        {bulkResult && (
          <div className="mb-6 p-4 bg-camp-500/10 border border-camp-500/30 rounded-xl">
            <p className="text-camp-400">✓ Created {bulkResult.count} links successfully!</p>
          </div>
        )}

        {/* ========== Link Builder Form ========== */}
        {showBuilder && activeTab === 'links' && (
          <div className="gradient-border p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-lg">
                Create UTM Link
                {selectedTeam && <span className="text-blue-400 text-sm font-normal ml-2">for {selectedTeam.name}</span>}
              </h2>
              {(form.utm_source || form.utm_medium || form.utm_campaign) && (
                <button onClick={() => setShowSaveTemplate(true)} className="px-3 py-1 text-sm text-camp-400 hover:text-camp-300">
                  💾 Save as Template
                </button>
              )}
            </div>
            
            {showSaveTemplate && (
              <div className="mb-4 p-4 bg-midnight-800 rounded-lg flex gap-3">
                <input 
                  type="text" 
                  value={templateName} 
                  onChange={e => setTemplateName(e.target.value)} 
                  placeholder="Template name..." 
                  className="flex-1 px-3 py-2 bg-midnight-700 border border-midnight-600 rounded-lg text-sm text-white placeholder:text-midnight-500 focus:border-camp-500 focus:outline-none" 
                />
                <button onClick={saveAsTemplate} disabled={savingTemplate || !templateName.trim()} className="px-4 py-2 bg-camp-500 hover:bg-camp-400 text-midnight-900 text-sm font-medium rounded-lg disabled:opacity-50">
                  {savingTemplate ? '...' : 'Save'}
                </button>
                <button onClick={() => { setShowSaveTemplate(false); setTemplateName('') }} className="px-3 py-2 text-midnight-400 hover:text-white text-sm">Cancel</button>
              </div>
            )}
            
            <form onSubmit={submit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-midnight-300">Destination URL *</label>
                  <input type="url" value={form.destination_url} onChange={e => setForm({...form, destination_url: e.target.value})} className="w-full px-4 py-3 bg-midnight-800 border border-midnight-700 rounded-lg text-white placeholder:text-midnight-500 focus:border-camp-500 focus:outline-none" placeholder="https://example.com/page" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-midnight-300">Campaign Source</label>
                  <input value={form.utm_source} onChange={e => setForm({...form, utm_source: e.target.value})} className="w-full px-4 py-3 bg-midnight-800 border border-midnight-700 rounded-lg text-white placeholder:text-midnight-500 focus:border-camp-500 focus:outline-none" placeholder="google, facebook, newsletter" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-midnight-300">Campaign Medium</label>
                  <input value={form.utm_medium} onChange={e => setForm({...form, utm_medium: e.target.value})} className="w-full px-4 py-3 bg-midnight-800 border border-midnight-700 rounded-lg text-white placeholder:text-midnight-500 focus:border-camp-500 focus:outline-none" placeholder="cpc, email, social" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-midnight-300">Campaign Name</label>
                  <input value={form.utm_campaign} onChange={e => setForm({...form, utm_campaign: e.target.value})} className="w-full px-4 py-3 bg-midnight-800 border border-midnight-700 rounded-lg text-white placeholder:text-midnight-500 focus:border-camp-500 focus:outline-none" placeholder="spring_sale, product_launch" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-midnight-300">Link Title</label>
                  <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-3 bg-midnight-800 border border-midnight-700 rounded-lg text-white placeholder:text-midnight-500 focus:border-camp-500 focus:outline-none" placeholder="My Campaign Link" />
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-sm text-midnight-300 cursor-pointer">
                  <input type="checkbox" checked={form.create_short_link} onChange={e => setForm({...form, create_short_link: e.target.checked})} className="w-4 h-4 rounded border-midnight-600 bg-midnight-800 text-camp-500 focus:ring-camp-500" />
                  Create short link
                </label>
                {domains.length > 0 && form.create_short_link && (
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-midnight-300">Domain:</label>
                    <select value={form.domainId} onChange={e => setForm({...form, domainId: e.target.value})} className="px-3 py-1.5 bg-midnight-800 border border-midnight-700 rounded-lg text-sm text-white focus:border-camp-500 focus:outline-none">
                      <option value="">getcampkit.com</option>
                      {domains.map(d => <option key={d.id} value={d.id}>{d.domain}</option>)}
                    </select>
                  </div>
                )}
                {plan !== 'free' && domains.length === 0 && form.create_short_link && (
                  <Link href="/domains" className="text-camp-400 hover:text-camp-300 text-sm">+ Add custom domain</Link>
                )}
              </div>
              
              <div className="flex gap-3 pt-2">
                <button 
                  type="submit" 
                  disabled={creating || (!selectedTeamId && plan === 'free' && linkCount >= (linkLimit || 50))} 
                  className="px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {creating ? 'Creating...' : 'Create Link'}
                </button>
                <button type="button" onClick={() => { setShowBuilder(false); setError(null) }} className="px-6 py-3 border border-midnight-700 text-midnight-300 rounded-lg hover:border-midnight-600 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========== Templates Tab ========== */}
        {activeTab === 'templates' && (
          templates.length === 0 ? (
            <div className="text-center py-16 gradient-border">
              <div className="text-5xl mb-4">📋</div>
              <h2 className="font-display text-xl font-semibold mb-2">Save time with templates</h2>
              <p className="text-midnight-400 mb-4 max-w-md mx-auto">
                Templates help teams keep UTM naming consistent. Save your source/medium/campaign once, reuse forever.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6 text-xs">
                <span className="px-3 py-1.5 bg-midnight-800 text-midnight-400 rounded-lg">Google Ads</span>
                <span className="px-3 py-1.5 bg-midnight-800 text-midnight-400 rounded-lg">Meta Ads</span>
                <span className="px-3 py-1.5 bg-midnight-800 text-midnight-400 rounded-lg">Newsletter</span>
                <span className="px-3 py-1.5 bg-midnight-800 text-midnight-400 rounded-lg">Influencer</span>
              </div>
              <button onClick={() => { setShowBuilder(true); setActiveTab('links') }} className="px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-colors">
                + Create Link & Save Template
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((t) => (
                <div key={t.id} className="gradient-border p-5 hover:bg-midnight-800/50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display font-semibold">{t.name}</h3>
                    <div className="flex items-center gap-2">
                      <button onClick={() => applyTemplate(t)} className="px-3 py-1 bg-camp-500/20 text-camp-400 text-sm rounded-lg hover:bg-camp-500/30 transition-colors">Use</button>
                      <button onClick={() => deleteTemplate(t.id)} className="px-2 py-1 text-red-400 hover:text-red-300 text-sm">🗑️</button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {t.utm_source && <span className="px-2 py-1 bg-midnight-800 text-xs rounded text-midnight-300">source: {t.utm_source}</span>}
                    {t.utm_medium && <span className="px-2 py-1 bg-midnight-800 text-xs rounded text-midnight-300">medium: {t.utm_medium}</span>}
                    {t.utm_campaign && <span className="px-2 py-1 bg-midnight-800 text-xs rounded text-midnight-300">campaign: {t.utm_campaign}</span>}
                  </div>
                  {t.created_by && <p className="text-midnight-500 text-xs mt-2">by {t.created_by}</p>}
                </div>
              ))}
            </div>
          )
        )}

        {/* ========== Bulk Builder Tab ========== */}
        {activeTab === 'bulk' && (
          !canUseBulk ? (
            <div className="text-center py-16 gradient-border">
              <div className="text-5xl mb-4">📦</div>
              <h2 className="font-display text-xl font-semibold mb-2">Bulk Link Builder</h2>
              <p className="text-midnight-400 mb-4 max-w-md mx-auto">
                Create up to 100 UTM links at once. Perfect for ad campaigns, newsletters & multi-channel launches.
              </p>
              <p className="text-midnight-500 text-sm mb-6">No more copy-pasting in spreadsheets.</p>
              <Link href="/#pricing" className="px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-colors inline-block">
                Upgrade to Team – €29/mo
              </Link>
            </div>
          ) : (
            <div className="gradient-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold text-lg">Bulk Link Builder</h2>
                <span className="text-midnight-400 text-sm">{bulkLinks.length} link{bulkLinks.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-midnight-400">
                      <th className="pb-3 pr-2">URL *</th>
                      <th className="pb-3 pr-2">Source</th>
                      <th className="pb-3 pr-2">Medium</th>
                      <th className="pb-3 pr-2">Campaign</th>
                      <th className="pb-3 pr-2">Title</th>
                      <th className="pb-3 w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {bulkLinks.map((l, i) => (
                      <tr key={i} className="border-t border-midnight-800">
                        <td className="py-2 pr-2"><input type="url" value={l.destination_url} onChange={e => updateBulkRow(i, 'destination_url', e.target.value)} placeholder="https://..." className="w-full px-3 py-2 bg-midnight-800 border border-midnight-700 rounded text-white placeholder:text-midnight-600 focus:border-camp-500 focus:outline-none text-sm" /></td>
                        <td className="py-2 pr-2"><input value={l.utm_source} onChange={e => updateBulkRow(i, 'utm_source', e.target.value)} placeholder="google" className="w-full px-3 py-2 bg-midnight-800 border border-midnight-700 rounded text-white placeholder:text-midnight-600 focus:border-camp-500 focus:outline-none text-sm" /></td>
                        <td className="py-2 pr-2"><input value={l.utm_medium} onChange={e => updateBulkRow(i, 'utm_medium', e.target.value)} placeholder="cpc" className="w-full px-3 py-2 bg-midnight-800 border border-midnight-700 rounded text-white placeholder:text-midnight-600 focus:border-camp-500 focus:outline-none text-sm" /></td>
                        <td className="py-2 pr-2"><input value={l.utm_campaign} onChange={e => updateBulkRow(i, 'utm_campaign', e.target.value)} placeholder="spring" className="w-full px-3 py-2 bg-midnight-800 border border-midnight-700 rounded text-white placeholder:text-midnight-600 focus:border-camp-500 focus:outline-none text-sm" /></td>
                        <td className="py-2 pr-2"><input value={l.title} onChange={e => updateBulkRow(i, 'title', e.target.value)} placeholder="Link name" className="w-full px-3 py-2 bg-midnight-800 border border-midnight-700 rounded text-white placeholder:text-midnight-600 focus:border-camp-500 focus:outline-none text-sm" /></td>
                        <td className="py-2"><button onClick={() => removeBulkRow(i)} disabled={bulkLinks.length === 1} className="text-red-400 hover:text-red-300 disabled:opacity-30 disabled:cursor-not-allowed">✕</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-midnight-800">
                <button onClick={addBulkRow} className="px-4 py-2 text-camp-400 hover:text-camp-300 text-sm">+ Add Row</button>
                <button onClick={submitBulk} disabled={bulkCreating} className="px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-colors disabled:opacity-50">
                  {bulkCreating ? 'Creating...' : `Create ${bulkLinks.filter(l => l.destination_url).length} Links`}
                </button>
              </div>
            </div>
          )
        )}

        {/* ========== Empty State - Marketing Focused ========== */}
        {activeTab === 'links' && filteredLinks.length === 0 && !showBuilder && (
          <div className="text-center py-16 gradient-border">
            <div className="text-6xl mb-6">🚀</div>
            <h2 className="font-display text-2xl font-bold mb-3">
              Track your marketing links — not just shorten them
            </h2>
            <p className="text-midnight-400 mb-8 max-w-lg mx-auto text-lg">
              Create a short link with built-in UTM tracking and see exactly which campaigns drive clicks. No spreadsheets, no Google Analytics setup.
            </p>
            
            <p className="text-midnight-500 text-sm mb-4">Typical use cases:</p>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <span className="px-4 py-2 bg-midnight-800 text-midnight-300 rounded-lg">Google Ads</span>
              <span className="px-4 py-2 bg-midnight-800 text-midnight-300 rounded-lg">Meta / LinkedIn Ads</span>
              <span className="px-4 py-2 bg-midnight-800 text-midnight-300 rounded-lg">Newsletter campaigns</span>
              <span className="px-4 py-2 bg-midnight-800 text-midnight-300 rounded-lg">Influencer tracking</span>
            </div>
            
            <button 
              onClick={() => setShowBuilder(true)} 
              className="px-8 py-4 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-bold text-lg rounded-xl transition-all hover:scale-105"
            >
              ➕ Create your first tracking link
            </button>
            <p className="text-midnight-500 text-sm mt-4">Takes 30 seconds</p>
          </div>
        )}

        {/* ========== Links List ========== */}
        {activeTab === 'links' && filteredLinks.length > 0 && (
          <div className="space-y-4">
            {filteredLinks.map(l => (
              <div key={l.id} className="gradient-border p-5 hover:bg-midnight-800/30 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      {l.title && <span className="font-display font-semibold text-lg">{l.title}</span>}
                      {l.short_code && (
                        <span className="px-2 py-1 bg-camp-500/20 text-camp-400 text-xs rounded-full font-medium">
                          {l.custom_domain || 'getcampkit.com'}/{l.short_code}
                        </span>
                      )}
                      <span className="text-midnight-500 text-xs">{formatDate(l.created_at)}</span>
                    </div>
                    <p className="text-midnight-400 text-sm truncate mb-3 font-mono">{buildUrl(l)}</p>
                    <div className="flex flex-wrap gap-2">
                      {l.utm_source && <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-lg">📍 {l.utm_source}</span>}
                      {l.utm_medium && <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-xs rounded-lg">📢 {l.utm_medium}</span>}
                      {l.utm_campaign && <span className="px-2 py-1 bg-orange-500/10 text-orange-400 text-xs rounded-lg">🎯 {l.utm_campaign}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <button onClick={() => viewClicks(l)} className="text-center hover:bg-midnight-800 px-4 py-2 rounded-lg transition-colors cursor-pointer">
                      <div className="font-display font-bold text-2xl text-camp-400">{l.clicks}</div>
                      <div className="text-midnight-500 text-xs">clicks</div>
                    </button>
                    <div className="flex gap-2">
                      {l.short_code && (
                        <button onClick={() => copy(getShortUrl(l)!, `short-${l.id}`)} className="px-4 py-2 bg-camp-500 hover:bg-camp-400 text-midnight-900 text-sm font-medium rounded-lg transition-colors">
                          {copied === `short-${l.id}` ? '✓ Copied!' : '📋 Short'}
                        </button>
                      )}
                      <button onClick={() => copy(buildUrl(l), `full-${l.id}`)} className="px-4 py-2 border border-midnight-700 text-sm rounded-lg hover:border-midnight-600 transition-colors">
                        {copied === `full-${l.id}` ? '✓ Copied!' : 'Full URL'}
                      </button>
                      <button onClick={() => del(l.id)} className="px-3 py-2 text-red-400 hover:bg-red-500/10 text-sm rounded-lg transition-colors">🗑️</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ========== Analytics Modal ========== */}
      {selectedLink && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedLink(null)}>
          <div className="bg-midnight-900 border border-midnight-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-midnight-800">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display font-semibold text-xl">{selectedLink.title || 'Link Analytics'}</h2>
                  <p className="text-midnight-400 text-sm mt-1">{selectedLink.clicks} total clicks</p>
                </div>
                <button onClick={() => setSelectedLink(null)} className="text-midnight-400 hover:text-white text-2xl leading-none">×</button>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => setAnalyticsTab('clicks')} className={`px-3 py-1.5 rounded-lg text-sm ${analyticsTab === 'clicks' ? 'bg-midnight-800 text-white' : 'text-midnight-400 hover:text-white'}`}>Recent Clicks</button>
                <button onClick={() => setAnalyticsTab('devices')} className={`px-3 py-1.5 rounded-lg text-sm ${analyticsTab === 'devices' ? 'bg-midnight-800 text-white' : 'text-midnight-400 hover:text-white'}`}>Devices</button>
                <button onClick={() => setAnalyticsTab('geo')} className={`px-3 py-1.5 rounded-lg text-sm ${analyticsTab === 'geo' ? 'bg-midnight-800 text-white' : 'text-midnight-400 hover:text-white'}`}>Geography</button>
                <button onClick={() => setAnalyticsTab('sources')} className={`px-3 py-1.5 rounded-lg text-sm ${analyticsTab === 'sources' ? 'bg-midnight-800 text-white' : 'text-midnight-400 hover:text-white'}`}>Sources</button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[65vh]">
              {loadingClicks ? (
                <div className="text-center py-8 text-midnight-400">Loading analytics...</div>
              ) : (
                <>
                  {analyticsTab === 'clicks' && (
                    clickDetails.length === 0 ? (
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
                              <span className="text-xl">{c.device === 'Mobile' ? '📱' : c.device === 'Tablet' ? '📲' : '💻'}</span>
                              <div>
                                <div className="text-sm font-medium">{formatTime(c.clicked_at)}</div>
                                <div className="text-midnight-500 text-xs flex gap-2">
                                  {c.browser && <span>{c.browser}</span>}
                                  {c.os && <span>• {c.os}</span>}
                                  {c.country && <span>• {c.city ? `${c.city}, ` : ''}{c.country}</span>}
                                </div>
                              </div>
                            </div>
                            <div className="text-midnight-500 text-xs">{c.referer ? new URL(c.referer).hostname : 'Direct'}</div>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                  {analyticsTab === 'devices' && analytics && (
                    <div className="grid md:grid-cols-3 gap-6">
                      <BarChart data={analytics.devices.map(d => ({ name: d.device, count: Number(d.count) }))} label="Devices" />
                      <BarChart data={analytics.browsers.map(d => ({ name: d.browser, count: Number(d.count) }))} label="Browsers" />
                      <BarChart data={analytics.os.map(d => ({ name: d.os, count: Number(d.count) }))} label="Operating Systems" />
                    </div>
                  )}
                  {analyticsTab === 'geo' && analytics && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <BarChart data={analytics.countries.map(d => ({ name: d.country, count: Number(d.count) }))} label="Countries" />
                      <BarChart data={analytics.cities.map(d => ({ name: d.city, count: Number(d.count) }))} label="Cities" />
                    </div>
                  )}
                  {analyticsTab === 'sources' && analytics && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <BarChart data={analytics.referers.map(d => ({ name: d.source, count: Number(d.count) }))} label="Traffic Sources" />
                      <div>
                        <h4 className="text-midnight-400 text-sm font-medium mb-4">Clicks Over Time (7 days)</h4>
                        {analytics.clicksOverTime.length === 0 ? (
                          <p className="text-midnight-500 text-xs">No data yet</p>
                        ) : (
                          <div className="flex items-end gap-1 h-32">
                            {analytics.clicksOverTime.map((d, i) => {
                              const max = Math.max(...analytics.clicksOverTime.map(x => Number(x.count)), 1)
                              const h = (Number(d.count) / max) * 100
                              return (
                                <div key={i} className="flex-1 flex flex-col items-center">
                                  <div className="w-full bg-camp-500/50 rounded-t" style={{ height: `${h}%`, minHeight: d.count > 0 ? '4px' : '0' }} />
                                  <div className="text-[10px] text-midnight-500 mt-1">{new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-midnight-900"><div className="text-midnight-400">Loading...</div></div>}>
      <DashboardContent />
    </Suspense>
  )
}
