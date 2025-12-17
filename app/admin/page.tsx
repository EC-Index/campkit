'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Stats = {
  totalUsers: number
  todayUsers: number
  weekUsers: number
  proUsers: number
  totalLinks: number
  todayLinks: number
  totalClicks: number
  todayClicks: number
  conversionRate: string
  avgLinksPerUser: string
}

type User = {
  id: number
  email: string
  plan: string | null
  created_at: string
  link_count: number
  total_clicks?: number
}

type LinkItem = {
  id: number
  title: string | null
  short_code: string | null
  utm_source: string | null
  utm_campaign: string | null
  clicks: number
  created_at: string
  user_email: string
}

type DayData = {
  date: string
  count: number
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentUsers, setRecentUsers] = useState<User[]>([])
  const [activeUsers, setActiveUsers] = useState<User[]>([])
  const [recentLinks, setRecentLinks] = useState<LinkItem[]>([])
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [signupsPerDay, setSignupsPerDay] = useState<DayData[]>([])
  const [linksPerDay, setLinksPerDay] = useState<DayData[]>([])
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'links' | 'activity'>('overview')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchAdminData()
    }
  }, [session])

  const fetchAdminData = async () => {
    try {
      const res = await fetch('/api/admin')
      const data = await res.json()
      
      if (!res.ok) {
        if (res.status === 401) {
          setError(`Unauthorized - Email: ${data.debug?.userEmail || 'unknown'} | Session: ${data.debug?.sessionExists ? 'yes' : 'no'}`)
          return
        }
        throw new Error('Failed to fetch')
      }
      
      setStats(data.stats)
      setRecentUsers(data.recentUsers || [])
      setActiveUsers(data.activeUsers || [])
      setRecentLinks(data.recentLinks || [])
      setAllUsers(data.allUsers || [])
      setSignupsPerDay(data.signupsPerDay || [])
      setLinksPerDay(data.linksPerDay || [])
    } catch (err) {
      setError('Failed to load admin data')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (d: string) => new Date(d).toLocaleDateString('de-DE', { 
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' 
  })

  const formatShortDate = (d: string) => new Date(d).toLocaleDateString('de-DE', { 
    day: '2-digit', month: '2-digit'
  })

  const getPlanBadge = (plan: string | null) => {
    switch (plan) {
      case 'pro': return <span className="px-2 py-0.5 bg-camp-500/20 text-camp-400 text-xs rounded-full">PRO</span>
      case 'team': return <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full">TEAM</span>
      case 'business': return <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded-full">BIZ</span>
      default: return <span className="px-2 py-0.5 bg-midnight-700 text-midnight-400 text-xs rounded-full">FREE</span>
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midnight-900">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-camp-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-midnight-400">Loading admin panel...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midnight-900">
        <div className="text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h1 className="text-xl font-bold text-red-400 mb-2">{error}</h1>
          <Link href="/dashboard" className="text-camp-400 hover:underline">← Back to Dashboard</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-midnight-900 text-white">
      {/* Header */}
      <header className="border-b border-midnight-800 bg-midnight-900/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center">
                <span className="text-midnight-900 font-bold">C</span>
              </div>
              <span className="font-display font-semibold text-lg">CampKit</span>
            </Link>
            <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded-full">ADMIN</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={fetchAdminData} className="px-3 py-1.5 bg-midnight-800 hover:bg-midnight-700 rounded-lg text-sm">
              🔄 Refresh
            </button>
            <Link href="/dashboard" className="text-midnight-400 hover:text-white text-sm">
              ← Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-gradient-to-br from-camp-500/20 to-camp-500/5 border border-camp-500/30">
            <p className="text-midnight-400 text-xs mb-1">Total Users</p>
            <p className="font-display text-3xl font-bold text-camp-400">{stats?.totalUsers || 0}</p>
            <p className="text-camp-400/60 text-xs mt-1">+{stats?.todayUsers || 0} today</p>
          </div>
          <div className="p-4 rounded-xl bg-midnight-800/50 border border-midnight-700">
            <p className="text-midnight-400 text-xs mb-1">Pro Users</p>
            <p className="font-display text-3xl font-bold">{stats?.proUsers || 0}</p>
            <p className="text-midnight-500 text-xs mt-1">{stats?.conversionRate}% conversion</p>
          </div>
          <div className="p-4 rounded-xl bg-midnight-800/50 border border-midnight-700">
            <p className="text-midnight-400 text-xs mb-1">Total Links</p>
            <p className="font-display text-3xl font-bold">{stats?.totalLinks || 0}</p>
            <p className="text-midnight-500 text-xs mt-1">+{stats?.todayLinks || 0} today</p>
          </div>
          <div className="p-4 rounded-xl bg-midnight-800/50 border border-midnight-700">
            <p className="text-midnight-400 text-xs mb-1">Total Clicks</p>
            <p className="font-display text-3xl font-bold">{stats?.totalClicks || 0}</p>
            <p className="text-midnight-500 text-xs mt-1">+{stats?.todayClicks || 0} today</p>
          </div>
          <div className="p-4 rounded-xl bg-midnight-800/50 border border-midnight-700">
            <p className="text-midnight-400 text-xs mb-1">Avg Links/User</p>
            <p className="font-display text-3xl font-bold">{stats?.avgLinksPerUser || 0}</p>
            <p className="text-midnight-500 text-xs mt-1">engagement</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-midnight-800 pb-4">
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-camp-500 text-midnight-900' : 'text-midnight-400 hover:text-white hover:bg-midnight-800'}`}
          >
            📊 Overview
          </button>
          <button 
            onClick={() => setActiveTab('users')} 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'users' ? 'bg-camp-500 text-midnight-900' : 'text-midnight-400 hover:text-white hover:bg-midnight-800'}`}
          >
            👥 All Users ({allUsers.length})
          </button>
          <button 
            onClick={() => setActiveTab('links')} 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'links' ? 'bg-camp-500 text-midnight-900' : 'text-midnight-400 hover:text-white hover:bg-midnight-800'}`}
          >
            🔗 Recent Links
          </button>
          <button 
            onClick={() => setActiveTab('activity')} 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'activity' ? 'bg-camp-500 text-midnight-900' : 'text-midnight-400 hover:text-white hover:bg-midnight-800'}`}
          >
            📈 Activity
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Signups */}
            <div className="p-6 rounded-xl bg-midnight-800/30 border border-midnight-700">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <span>🆕</span> Recent Signups
              </h3>
              <div className="space-y-3">
                {recentUsers.length === 0 ? (
                  <p className="text-midnight-500 text-sm">No users yet</p>
                ) : (
                  recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-midnight-800/50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{user.email}</p>
                        <p className="text-midnight-500 text-xs">{formatDate(user.created_at)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-midnight-400 text-xs">{user.link_count} links</span>
                        {getPlanBadge(user.plan)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Most Active Users */}
            <div className="p-6 rounded-xl bg-midnight-800/30 border border-midnight-700">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <span>🏆</span> Most Active Users
              </h3>
              <div className="space-y-3">
                {activeUsers.length === 0 ? (
                  <p className="text-midnight-500 text-sm">No activity yet</p>
                ) : (
                  activeUsers.map((user, i) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-midnight-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '▪️'}</span>
                        <div>
                          <p className="text-sm font-medium">{user.email}</p>
                          <p className="text-midnight-500 text-xs">{user.total_clicks || 0} total clicks</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-camp-400 font-bold">{user.link_count} links</span>
                        {getPlanBadge(user.plan)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Links */}
            <div className="p-6 rounded-xl bg-midnight-800/30 border border-midnight-700 lg:col-span-2">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <span>🔗</span> Latest Links Created
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-midnight-400 border-b border-midnight-700">
                      <th className="pb-3">User</th>
                      <th className="pb-3">Title/Campaign</th>
                      <th className="pb-3">Source</th>
                      <th className="pb-3">Short Code</th>
                      <th className="pb-3">Clicks</th>
                      <th className="pb-3">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLinks.map((link) => (
                      <tr key={link.id} className="border-b border-midnight-800">
                        <td className="py-3 text-midnight-300">{link.user_email}</td>
                        <td className="py-3">{link.title || link.utm_campaign || '-'}</td>
                        <td className="py-3 text-midnight-400">{link.utm_source || '-'}</td>
                        <td className="py-3 font-mono text-xs text-camp-400">{link.short_code || '-'}</td>
                        <td className="py-3 font-bold">{link.clicks}</td>
                        <td className="py-3 text-midnight-500 text-xs">{formatDate(link.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* All Users Tab */}
        {activeTab === 'users' && (
          <div className="p-6 rounded-xl bg-midnight-800/30 border border-midnight-700">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-midnight-400 border-b border-midnight-700">
                    <th className="pb-3">Email</th>
                    <th className="pb-3">Plan</th>
                    <th className="pb-3">Links</th>
                    <th className="pb-3">Clicks</th>
                    <th className="pb-3">Registered</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((user) => (
                    <tr key={user.id} className="border-b border-midnight-800 hover:bg-midnight-800/50">
                      <td className="py-3 font-medium">{user.email}</td>
                      <td className="py-3">{getPlanBadge(user.plan)}</td>
                      <td className="py-3 font-bold text-camp-400">{user.link_count}</td>
                      <td className="py-3">{user.total_clicks || 0}</td>
                      <td className="py-3 text-midnight-500 text-xs">{formatDate(user.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recent Links Tab */}
        {activeTab === 'links' && (
          <div className="p-6 rounded-xl bg-midnight-800/30 border border-midnight-700">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-midnight-400 border-b border-midnight-700">
                    <th className="pb-3">User</th>
                    <th className="pb-3">Title</th>
                    <th className="pb-3">Campaign</th>
                    <th className="pb-3">Source</th>
                    <th className="pb-3">Short Code</th>
                    <th className="pb-3">Clicks</th>
                    <th className="pb-3">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLinks.map((link) => (
                    <tr key={link.id} className="border-b border-midnight-800 hover:bg-midnight-800/50">
                      <td className="py-3 text-midnight-300">{link.user_email}</td>
                      <td className="py-3">{link.title || '-'}</td>
                      <td className="py-3">{link.utm_campaign || '-'}</td>
                      <td className="py-3 text-midnight-400">{link.utm_source || '-'}</td>
                      <td className="py-3 font-mono text-xs text-camp-400">{link.short_code || '-'}</td>
                      <td className="py-3 font-bold">{link.clicks}</td>
                      <td className="py-3 text-midnight-500 text-xs">{formatDate(link.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Signups Chart */}
            <div className="p-6 rounded-xl bg-midnight-800/30 border border-midnight-700">
              <h3 className="font-semibold mb-4">📈 Signups (Last 14 Days)</h3>
              <div className="flex items-end gap-1 h-40">
                {signupsPerDay.length === 0 ? (
                  <p className="text-midnight-500 text-sm">No data</p>
                ) : (
                  signupsPerDay.map((day, i) => {
                    const max = Math.max(...signupsPerDay.map(d => Number(d.count)), 1)
                    const height = (Number(day.count) / max) * 100
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-camp-500/50 rounded-t min-h-[2px]" 
                          style={{ height: `${height}%` }}
                          title={`${day.count} signups`}
                        />
                        <span className="text-[10px] text-midnight-500 mt-1">{formatShortDate(day.date)}</span>
                      </div>
                    )
                  })
                )}
              </div>
            </div>

            {/* Links Chart */}
            <div className="p-6 rounded-xl bg-midnight-800/30 border border-midnight-700">
              <h3 className="font-semibold mb-4">🔗 Links Created (Last 14 Days)</h3>
              <div className="flex items-end gap-1 h-40">
                {linksPerDay.length === 0 ? (
                  <p className="text-midnight-500 text-sm">No data</p>
                ) : (
                  linksPerDay.map((day, i) => {
                    const max = Math.max(...linksPerDay.map(d => Number(d.count)), 1)
                    const height = (Number(day.count) / max) * 100
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-blue-500/50 rounded-t min-h-[2px]" 
                          style={{ height: `${height}%` }}
                          title={`${day.count} links`}
                        />
                        <span className="text-[10px] text-midnight-500 mt-1">{formatShortDate(day.date)}</span>
                      </div>
                    )
                  })
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="p-6 rounded-xl bg-midnight-800/30 border border-midnight-700 lg:col-span-2">
              <h3 className="font-semibold mb-4">📊 Quick Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-midnight-800/50 rounded-lg text-center">
                  <p className="text-3xl font-bold text-camp-400">{stats?.weekUsers || 0}</p>
                  <p className="text-midnight-500 text-xs">Signups this week</p>
                </div>
                <div className="p-4 bg-midnight-800/50 rounded-lg text-center">
                  <p className="text-3xl font-bold">{stats?.todayLinks || 0}</p>
                  <p className="text-midnight-500 text-xs">Links today</p>
                </div>
                <div className="p-4 bg-midnight-800/50 rounded-lg text-center">
                  <p className="text-3xl font-bold">{stats?.todayClicks || 0}</p>
                  <p className="text-midnight-500 text-xs">Clicks today</p>
                </div>
                <div className="p-4 bg-midnight-800/50 rounded-lg text-center">
                  <p className="text-3xl font-bold text-green-400">{stats?.conversionRate}%</p>
                  <p className="text-midnight-500 text-xs">Free → Pro Rate</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
