'use client'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type LinkItem = { id: number; destination_url: string; utm_source: string|null; utm_medium: string|null; utm_campaign: string|null; utm_term: string|null; utm_content: string|null; short_code: string|null; title: string|null; clicks: number; created_at: string }

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [links, setLinks] = useState<LinkItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showBuilder, setShowBuilder] = useState(false)
  const [copied, setCopied] = useState<number|null>(null)
  const [form, setForm] = useState({ destination_url: '', utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '', title: '', create_short_link: true })
  const [creating, setCreating] = useState(false)

  useEffect(() => { if (status === 'unauthenticated') router.push('/login') }, [status, router])
  useEffect(() => { if (session) fetch('/api/links').then(r => r.json()).then(d => { setLinks(d.links || []); setLoading(false) }) }, [session])

  const buildUrl = (l: LinkItem) => { const u = new URL(l.destination_url); if(l.utm_source)u.searchParams.set('utm_source',l.utm_source); if(l.utm_medium)u.searchParams.set('utm_medium',l.utm_medium); if(l.utm_campaign)u.searchParams.set('utm_campaign',l.utm_campaign); if(l.utm_term)u.searchParams.set('utm_term',l.utm_term); if(l.utm_content)u.searchParams.set('utm_content',l.utm_content); return u.toString() }
  const copy = async (l: LinkItem, short: boolean) => { await navigator.clipboard.writeText(short && l.short_code ? `${window.location.origin}/r/${l.short_code}` : buildUrl(l)); setCopied(l.id); setTimeout(() => setCopied(null), 2000) }
  const del = async (id: number) => { if (!confirm('Delete?')) return; await fetch(`/api/links?id=${id}`, { method: 'DELETE' }); setLinks(links.filter(l => l.id !== id)) }
  const submit = async (e: React.FormEvent) => { e.preventDefault(); setCreating(true); const res = await fetch('/api/links', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }); const data = await res.json(); if (res.ok) { setLinks([{ ...data.link, clicks: 0 }, ...links]); setForm({ destination_url: '', utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '', title: '', create_short_link: true }); setShowBuilder(false) } setCreating(false) }

  if (status === 'loading' || loading) return <div className="min-h-screen flex items-center justify-center text-midnight-400">Loading...</div>

  return (
    <div className="min-h-screen bg-midnight-900">
      <header className="border-b border-midnight-800"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center"><span className="text-midnight-900 font-bold text-sm">C</span></div><span className="font-display font-semibold">CampKit</span></Link>
        <div className="flex items-center gap-4"><span className="text-midnight-400 text-sm">{session?.user?.email}</span><button onClick={() => signOut({ callbackUrl: '/' })} className="text-midnight-400 hover:text-white text-sm">Logout</button></div>
      </div></header>
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8"><div><h1 className="font-display text-2xl font-bold">Your Links</h1><p className="text-midnight-400 text-sm">{links.length} links</p></div><button onClick={() => setShowBuilder(!showBuilder)} className="btn-primary">{showBuilder ? '✕ Cancel' : '+ New Link'}</button></div>
        {showBuilder && <div className="gradient-border p-6 mb-8"><h2 className="font-display font-semibold text-lg mb-4">Create UTM Link</h2><form onSubmit={submit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2"><label className="block text-sm mb-2">URL *</label><input type="url" value={form.destination_url} onChange={e => setForm({...form, destination_url: e.target.value})} className="input" required /></div>
            <div><label className="block text-sm mb-2">Source</label><input value={form.utm_source} onChange={e => setForm({...form, utm_source: e.target.value})} className="input" placeholder="google, newsletter" /></div>
            <div><label className="block text-sm mb-2">Medium</label><input value={form.utm_medium} onChange={e => setForm({...form, utm_medium: e.target.value})} className="input" placeholder="cpc, email" /></div>
            <div><label className="block text-sm mb-2">Campaign</label><input value={form.utm_campaign} onChange={e => setForm({...form, utm_campaign: e.target.value})} className="input" placeholder="spring_sale" /></div>
            <div><label className="block text-sm mb-2">Title</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="input" placeholder="My Link" /></div>
          </div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.create_short_link} onChange={e => setForm({...form, create_short_link: e.target.checked})} /> Create short link</label>
          <button type="submit" disabled={creating} className="btn-primary disabled:opacity-50">{creating ? 'Creating...' : 'Create'}</button>
        </form></div>}
        {links.length === 0 ? <div className="text-center py-16"><p className="text-4xl mb-4">🔗</p><h2 className="font-display text-xl font-semibold mb-2">No links yet</h2><button onClick={() => setShowBuilder(true)} className="btn-primary mt-4">+ Create Link</button></div> : 
          <div className="space-y-4">{links.map(l => <div key={l.id} className="gradient-border p-5 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">{l.title && <span className="font-medium">{l.title}</span>}{l.short_code && <span className="px-2 py-0.5 bg-camp-500/20 text-camp-400 text-xs rounded-full">/{l.short_code}</span>}</div>
              <p className="text-midnight-400 text-sm truncate">{buildUrl(l)}</p>
              <div className="flex gap-2 mt-2">{l.utm_source && <span className="px-2 py-1 bg-midnight-800 text-xs rounded">{l.utm_source}</span>}{l.utm_medium && <span className="px-2 py-1 bg-midnight-800 text-xs rounded">{l.utm_medium}</span>}{l.utm_campaign && <span className="px-2 py-1 bg-midnight-800 text-xs rounded">{l.utm_campaign}</span>}</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center"><div className="font-display font-bold text-xl">{l.clicks}</div><div className="text-midnight-500 text-xs">clicks</div></div>
              <div className="flex gap-2">
                {l.short_code && <button onClick={() => copy(l, true)} className="px-3 py-2 bg-camp-500 text-midnight-900 text-sm font-medium rounded-lg">{copied === l.id ? '✓' : 'Short'}</button>}
                <button onClick={() => copy(l, false)} className="px-3 py-2 border border-midnight-600 text-sm rounded-lg">{copied === l.id ? '✓' : 'Full'}</button>
                <button onClick={() => del(l.id)} className="px-3 py-2 text-red-400 text-sm rounded-lg">Delete</button>
              </div>
            </div>
          </div>)}</div>}
      </main>
    </div>
  )
}
