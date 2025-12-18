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
  googleAdsSignups?: number
}

type User = {
  id: number
  email: string
  plan: string | null
  created_at: string
  link_count: number
  total_clicks?: number
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  referrer?: string | null
  gclid?: string | null
  device_type?: string | null
  signup_page?: string | null
}

type TrafficSource = {
  source: string
  count: number
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

type AnalyticsData = {
  overview: {
    activeUsers: number
    sessions: number
    pageViews: number
    avgSessionDuration: number
    bounceRate: number
    newUsers: number
  }
  channels: { channel: string; sessions: number; users: number }[]
  pages: { path: string; views: number; avgDuration: number }[]
  countries: { country: string; users: number }[]
  devices: { device: string; users: number; sessions: number }[]
  daily: { date: string; users: number; sessions: number }[]
  period: number
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
  const [trafficSources, setTrafficSources] = useState<TrafficSource[]>([])
  const [signupsPerDay, setSignupsPerDay] = useState<DayData[]>([])
  const [linksPerDay, setLinksPerDay] = useState<DayData[]>([])
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'links' | 'sources' | 'website'>('overview')
  const [error, setError] = useState<string | null>(null)
  
  // Analytics state
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [analyticsLoading, setAnalyticsLoading] = useState(false)
  const [analyticsPeriod, setAnalyticsPeriod] = useState(7)

  useEffect(() => {
    fetchAdminData()
  }, [])

  useEffect(() => {
    if (activeTab === 'website') {
      fetchAnalytics()
    }
  }, [activeTab, analyticsPeriod])

  const fetchAdminData = async () => {
    try {
      const res = await fetch('/api/admin')
      const data = await res.json()

      if (!res.ok) {
        if (res.status === 401) {
          setError(`Unauthorized`)
          return
        }
        throw new Error(data.error || 'Failed to fetch')
      }

      setStats(data.stats)
      setRecentUsers(data.recentUsers || [])
      setActiveUsers(data.activeUsers || [])
      setRecentLinks(data.recentLinks || [])
      setAllUsers(data.allUsers || [])
      setTrafficSources(data.trafficSources || [])
      setSignupsPerDay(data.signupsPerDay || [])
      setLinksPerDay(data.linksPerDay || [])
    } catch (err) {
      setError('Failed to load admin data')
    } finally {
      setLoading(false)
    }
  }

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true)
    try {
      const res = await fetch(`/api/admin/analytics?period=${analyticsPeriod}`)
      const data = await res.json()
      
      if (res.ok) {
        setAnalytics(data)
      } else {
        console.error('Analytics error:', data.error)
      }
    } catch (err) {
      console.error('Failed to fetch analytics:', err)
    } finally {
      setAnalyticsLoading(false)
    }
  }

  const formatDate = (d: string) => new Date(d).toLocaleDateString('de-DE', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatAnalyticsDate = (dateStr: string) => {
    if (!dateStr || dateStr.length !== 8) return dateStr
    const year = dateStr.slice(0, 4)
    const month = dateStr.slice(4, 6)
    const day = dateStr.slice(6, 8)
    return `${day}.${month}`
  }

  const getPlanBadge = (plan: string | null) => {
    switch (plan) {
      case 'pro': return <span className="px-2 py-0.5 bg-camp-500/20 text-camp-400 text-xs rounded-full">PRO</span>
      case 'team': return <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full">TEAM</span>
      case 'business': return <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded-full">BIZ</span>
      default: return <span className="px-2 py-0.5 bg-midnight-700 text-midnight-400 text-xs rounded-full">FREE</span>
    }
  }

  const getSourceBadge = (source: string | null | undefined) => {
    if (!source) return <span className="text-midnight-500 text-xs">direct</span>

    const colors: Record<string, string> = {
      'google': 'bg-blue-500/20 text-blue-400',
      'facebook': 'bg-indigo-500/20 text-indigo-400',
      'linkedin': 'bg-sky-500/20 text-sky-400',
      'twitter': 'bg-cyan-500/20 text-cyan-400',
    }
    const colorClass = colors[source.toLowerCase()] || 'bg-midnight-700 text-midnight-300'
    return <span className={`px-2 py-0.5 ${colorClass} text-xs rounded-full`}>{source}</span>
  }

  const getDeviceBadge = (device: string | null | undefined) => {
    if (!device) return null
    const icons: Record<string, string> = {
      'mobile': '📱',
      'tablet': '📱',
      'desktop': '💻',
    }
    return <span className="text-xs">{icons[device] || '🖥️'} {device}</span>
  }

  const getChannelColor = (channel: string) => {
    const colors: Record<string, string> = {
      'Organic Search': 'bg-green-500',
      'Direct': 'bg-blue-500',
      'Paid Search': 'bg-yellow-500',
      'Organic Social': 'bg-pink-500',
      'Paid Social': 'bg-purple-500',
      'Referral': 'bg-orange-500',
      'Email': 'bg-cyan-500',
    }
    return colors[channel] || 'bg-midnight-500'
  }

  const getCountryFlag = (country: string) => {
    const flags: Record<string, string> = {
      'Germany': '🇩🇪',
      'United States': '🇺🇸',
      'Austria': '🇦🇹',
      'Switzerland': '🇨🇭',
      'United Kingdom': '🇬🇧',
      'France': '🇫🇷',
      'Netherlands': '🇳🇱',
      'Canada': '🇨🇦',
      'Australia': '🇦🇺',
      'India': '🇮🇳',
    }
    return flags[country] || '🌍'
  }

  if (loading) {
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-gradient-to-br from-camp-500/20 to-camp-500/5 border border-camp-500/30">
            <p className="text-midnight-400 text-xs mb-1">Total Users</p>
            <p className="font-display text-3xl font-bold text-camp-400">{stats?.totalUsers || 0}</p>
            <p className="text-camp-400/60 text-xs mt-1">+{stats?.todayUsers || 0} today</p>
          </div>
          <div className="p-4 rounded-xl bg-midnight-800/50 border border-midnight-700">
            <p className="text-midnight-400 text-xs mb-1">Pro Users</p>
            <p className="font-display text-3xl font-bold">{stats?.proUsers || 0}</p>
            <p className="text-midnight-500 text-xs mt-1">{stats?.conversionRate}% conv.</p>
          </div>
          <div className="p-4 rounded-xl bg-midnight-800/50 border border-midnight-700">
            <p className="text-midnight-400 text-xs mb-1">Total Links</p>
            <p className="font-display text-3xl font-bold">{stats?.totalLinks || 0}</p>
            <p className="text-midnight-500 text-xs mt-1">+{stats?.todayLinks || 0} today</p>
          </div>
          <div className="p-4 rounded-xl bg-midnight-800/50 border border-midnight-700">
            <p className="text-midnight-400 text-xs mb-1">Total Clicks</p>
            <p className="font-display text-3xl font-bold">{stats?.totalClicks || 0}</p>
          </div>
          <div className="p-4 rounded-xl bg-midnight-800/50 border border-midnight-700">
            <p className="text-midnight-400 text-xs mb-1">Avg Links/User</p>
            <p className="font-display text-3xl font-bold">{stats?.avgLinksPerUser || 0}</p>
          </div>
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
            <p className="text-blue-400 text-xs mb-1">Google Ads</p>
            <p className="font-display text-3xl font-bold text-blue-400">{stats?.googleAdsSignups || 0}</p>
            <p className="text-blue-400/60 text-xs mt-1">signups</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-midnight-800 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'overview' ? 'bg-camp-500 text-midnight-900' : 'text-midnight-400 hover:text-white hover:bg-midnight-800'}`}
          >
            📊 Overview
          </button>
          <button
            onClick={() => setActiveTab('website')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'website' ? 'bg-camp-500 text-midnight-900' : 'text-midnight-400 hover:text-white hover:bg-midnight-800'}`}
          >
            🌐 Website Traffic
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'users' ? 'bg-camp-500 text-midnight-900' : 'text-midnight-400 hover:text-white hover:bg-midnight-800'}`}
          >
            👥 All Users ({allUsers.length})
          </button>
          <button
            onClick={() => setActiveTab('sources')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'sources' ? 'bg-camp-500 text-midnight-900' : 'text-midnight-400 hover:text-white hover:bg-midnight-800'}`}
          >
            📈 Traffic Sources
          </button>
          <button
            onClick={() => setActiveTab('links')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'links' ? 'bg-camp-500 text-midnight-900' : 'text-midnight-400 hover:text-white hover:bg-midnight-800'}`}
          >
            🔗 Recent Links
          </button>
        </div>

        {/* Website Traffic Tab */}
        {activeTab === 'website' && (
          <div>
            {/* Period Selector */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-midnight-400 text-sm">Period:</span>
              {[7, 14, 30, 90].map(days => (
                <button
                  key={days}
                  onClick={() => setAnalyticsPeriod(days)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    analyticsPeriod === days 
                      ? 'bg-camp-500 text-midnight-900 font-medium' 
                      : 'bg-midnight-800 text-midnight-400 hover:text-white'
                  }`}
                >
                  {days}d
                </button>
              ))}
              {analyticsLoading && (
                <div className="w-4 h-4 border-2 border-camp-500 border-t-transparent rounded-full animate-spin ml-2"></div>
              )}
            </div>

            {analytics ? (
              <>
                {/* Overview KPIs */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
                    <p className="text-midnight-400 text-xs mb-1">Active Users</p>
                    <p className="font-display text-3xl font-bold text-green-400">{analytics.overview.activeUsers}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-midnight-800/50 border border-midnight-700">
                    <p className="text-midnight-400 text-xs mb-1">Sessions</p>
                    <p className="font-display text-3xl font-bold">{analytics.overview.sessions}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-midnight-800/50 border border-midnight-700">
                    <p className="text-midnight-400 text-xs mb-1">Page Views</p>
                    <p className="font-display text-3xl font-bold">{analytics.overview.pageViews}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-midnight-800/50 border border-midnight-700">
                    <p className="text-midnight-400 text-xs mb-1">Avg. Duration</p>
                    <p className="font-display text-3xl font-bold">{formatDuration(analytics.overview.avgSessionDuration)}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-midnight-800/50 border border-midnight-700">
                    <p className="text-midnight-400 text-xs mb-1">Bounce Rate</p>
                    <p className="font-display text-3xl font-bold">{analytics.overview.bounceRate.toFixed(1)}%</p>
                  </div>
                  <div className="p-4 rounded-xl bg-midnight-800/50 border border-midnight-700">
                    <p className="text-midnight-400 text-xs mb-1">New Users</p>
                    <p className="font-display text-3xl font-bold">{analytics.overview.newUsers}</p>
                  </div>
                </div>

                {/* Charts Row */}
                <div className="grid lg:grid-cols-2 gap-6 mb-6">
                  {/* Daily Users Chart */}
                  <div className="p-6 rounded-xl bg-midnight-800/30 border border-midnight-700">
                    <h3 className="font-semibold mb-4">📈 Daily Users & Sessions</h3>
                    <div className="h-48 flex items-end gap-1">
                      {analytics.daily.map((day, i) => {
                        const maxUsers = Math.max(...analytics.daily.map(d => d.users))
                        const height = maxUsers > 0 ? (day.users / maxUsers) * 100 : 0
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div 
                              className="w-full bg-camp-500/50 rounded-t hover:bg-camp-500/70 transition-colors"
                              style={{ height: `${height}%`, minHeight: day.users > 0 ? '4px' : '0' }}
                              title={`${day.users} users`}
                            />
                            <span className="text-[10px] text-midnight-500">{formatAnalyticsDate(day.date)}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Traffic Channels */}
                  <div className="p-6 rounded-xl bg-midnight-800/30 border border-midnight-700">
                    <h3 className="font-semibold mb-4">🚦 Traffic Channels</h3>
                    <div className="space-y-3">
                      {analytics.channels.slice(0, 6).map((channel, i) => {
                        const max = Math.max(...analytics.channels.map(c => c.sessions))
                        const width = max > 0 ? (channel.sessions / max) * 100 : 0
                        return (
                          <div key={i}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">{channel.channel}</span>
                              <span className="text-sm font-bold">{channel.sessions}</span>
                            </div>
                            <div className="bg-midnight-800 rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${getChannelColor(channel.channel)}`}
                                style={{ width: `${width}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Top Pages */}
                  <div className="p-6 rounded-xl bg-midnight-800/30 border border-midnight-700">
                    <h3 className="font-semibold mb-4">📄 Top Pages</h3>
                    <div className="space-y-2">
                      {analytics.pages.slice(0, 8).map((page, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-midnight-800 last:border-0">
                          <span className="text-sm text-midnight-300 truncate max-w-[180px]" title={page.path}>
                            {page.path}
                          </span>
                          <span className="text-sm font-bold text-camp-400">{page.views}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Countries */}
                  <div className="p-6 rounded-xl bg-midnight-800/30 border border-midnight-700">
                    <h3 className="font-semibold mb-4">🌍 Countries</h3>
                    <div className="space-y-2">
                      {analytics.countries.slice(0, 8).map((country, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-midnight-800 last:border-0">
                          <span className="text-sm">
                            {getCountryFlag(country.country)} {country.country}
                          </span>
                          <span className="text-sm font-bold">{country.users}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Devices */}
                  <div className="p-6 rounded-xl bg-midnight-800/30 border border-midnight-700">
                    <h3 className="font-semibold mb-4">📱 Devices</h3>
                    <div className="space-y-4">
                      {analytics.devices.map((device, i) => {
                        const total = analytics.devices.reduce((sum, d) => sum + d.users, 0)
                        const percentage = total > 0 ? (device.users / total) * 100 : 0
                        const icon = device.device === 'desktop' ? '💻' : device.device === 'mobile' ? '📱' : '📱'
                        return (
                          <div key={i}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">{icon} {device.device}</span>
                              <span className="text-sm">{percentage.toFixed(1)}%</span>
                            </div>
                            <div className="bg-midnight-800 rounded-full h-3 overflow-hidden">
                              <div
                                className="h-full bg-camp-500 rounded-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-12 rounded-xl bg-midnight-800/30 border border-midnight-700 text-center">
                {analyticsLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-2 border-camp-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-midnight-400">Loading analytics...</span>
                  </div>
                ) : (
                  <>
                    <p className="text-midnight-400 mb-2">Failed to load analytics data</p>
                    <button onClick={fetchAnalytics} className="text-camp-400 hover:underline text-sm">
                      Try again
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Signups with Source */}
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
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-midnight-500 text-xs">{formatDate(user.created_at)}</span>
                          {user.gclid && <span className="text-blue-400 text-xs">📢 Google Ads</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getSourceBadge(user.utm_source)}
                        <span className="text-midnight-400 text-xs">{user.link_count} links</span>
                        {getPlanBadge(user.plan)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Traffic Sources */}
            <div className="p-6 rounded-xl bg-midnight-800/30 border border-midnight-700">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <span>📈</span> Traffic Sources
              </h3>
              {trafficSources.length === 0 ? (
                <p className="text-midnight-500 text-sm">No tracking data yet. Run the SQL migration to enable tracking.</p>
              ) : (
                <div className="space-y-3">
                  {trafficSources.map((source, i) => {
                    const max = Math.max(...trafficSources.map(s => Number(s.count)))
                    const width = (Number(source.count) / max) * 100
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-24 text-sm truncate">{source.source}</div>
                        <div className="flex-1 bg-midnight-800 rounded-full h-4 overflow-hidden">
                          <div
                            className="h-full bg-camp-500/50 rounded-full"
                            style={{ width: `${width}%` }}
                          />
                        </div>
                        <div className="w-8 text-right text-sm font-bold">{source.count}</div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Most Active Users */}
            <div className="p-6 rounded-xl bg-midnight-800/30 border border-midnight-700 lg:col-span-2">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <span>🏆</span> Most Active Users
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {activeUsers.length === 0 ? (
                  <p className="text-midnight-500 text-sm">No activity yet</p>
                ) : (
                  activeUsers.slice(0, 6).map((user, i) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-midnight-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '▪️'}</span>
                        <div>
                          <p className="text-sm font-medium">{user.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {getSourceBadge(user.utm_source)}
                            {getDeviceBadge(user.device_type)}
                          </div>
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
          </div>
        )}

        {/* All Users Tab with Tracking Info */}
        {activeTab === 'users' && (
          <div className="p-6 rounded-xl bg-midnight-800/30 border border-midnight-700">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-midnight-400 border-b border-midnight-700">
                    <th className="pb-3">Email</th>
                    <th className="pb-3">Source</th>
                    <th className="pb-3">Medium</th>
                    <th className="pb-3">Campaign</th>
                    <th className="pb-3">Device</th>
                    <th className="pb-3">Links</th>
                    <th className="pb-3">Plan</th>
                    <th className="pb-3">Registered</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((user) => (
                    <tr key={user.id} className="border-b border-midnight-800 hover:bg-midnight-800/50">
                      <td className="py-3 font-medium">
                        {user.email}
                        {user.gclid && <span className="ml-2 text-blue-400 text-xs">📢</span>}
                      </td>
                      <td className="py-3">{getSourceBadge(user.utm_source)}</td>
                      <td className="py-3 text-midnight-400 text-xs">{user.utm_medium || '-'}</td>
                      <td className="py-3 text-midnight-400 text-xs">{user.utm_campaign || '-'}</td>
                      <td className="py-3 text-midnight-400">{getDeviceBadge(user.device_type)}</td>
                      <td className="py-3 font-bold text-camp-400">{user.link_count}</td>
                      <td className="py-3">{getPlanBadge(user.plan)}</td>
                      <td className="py-3 text-midnight-500 text-xs">{formatDate(user.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Traffic Sources Tab */}
        {activeTab === 'sources' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-midnight-800/30 border border-midnight-700">
              <h3 className="font-semibold mb-4">📊 Signups by Source</h3>
              {trafficSources.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-midnight-400 mb-4">No tracking data yet.</p>
                  <div className="text-left p-4 bg-midnight-800 rounded-lg text-sm">
                    <p className="text-midnight-300 mb-2">Run this SQL in Neon to enable:</p>
                    <code className="text-camp-400 text-xs">
                      ALTER TABLE users ADD COLUMN utm_source VARCHAR(255);
                    </code>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {trafficSources.map((source, i) => {
                    const max = Math.max(...trafficSources.map(s => Number(s.count)))
                    const width = (Number(source.count) / max) * 100
                    return (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{source.source}</span>
                          <span className="text-sm font-bold text-camp-400">{source.count}</span>
                        </div>
                        <div className="bg-midnight-800 rounded-full h-3 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-camp-500 to-camp-400 rounded-full transition-all"
                            style={{ width: `${width}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="p-6 rounded-xl bg-midnight-800/30 border border-midnight-700">
              <h3 className="font-semibold mb-4">📢 Google Ads Performance</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-500/10 rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-400">{stats?.googleAdsSignups || 0}</p>
                  <p className="text-blue-400/60 text-xs">Total Signups</p>
                </div>
                <div className="p-4 bg-midnight-800/50 rounded-lg text-center">
                  <p className="text-3xl font-bold">{stats?.totalUsers ? (((stats?.googleAdsSignups || 0) / stats.totalUsers) * 100).toFixed(0) : 0}%</p>
                  <p className="text-midnight-500 text-xs">of all signups</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-midnight-800 rounded-lg">
                <p className="text-midnight-400 text-sm mb-2">Users with GCLID:</p>
                <div className="space-y-2">
                  {allUsers.filter(u => u.gclid).slice(0, 5).map(user => (
                    <div key={user.id} className="flex items-center justify-between text-sm">
                      <span>{user.email}</span>
                      <span className="text-midnight-500">{formatDate(user.created_at)}</span>
                    </div>
                  ))}
                  {allUsers.filter(u => u.gclid).length === 0 && (
                    <p className="text-midnight-500 text-sm">No Google Ads signups yet</p>
                  )}
                </div>
              </div>
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
      </main>
    </div>
  )
}
