'use client'
import { useState, useEffect } from 'react'

type AnalyticsData = {
  clicksOverTime: { date: string; count: number }[]
  devices: { device: string; count: number }[]
  browsers: { browser: string; count: number }[]
  countries: { country: string; count: number }[]
  cities: { city: string; count: number }[]
  referers: { source: string; count: number }[]
  topLinks: { id: number; title: string; short_code: string; clicks: number }[]
}

function MiniBarChart({ data, color = 'camp' }: { data: { name: string; value: number }[]; color?: string }) {
  const max = Math.max(...data.map(d => d.value), 1)
  const colors: Record<string, string> = {
    camp: 'bg-camp-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  }
  return (
    <div className="space-y-2">
      {data.slice(0, 5).map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-24 text-xs text-midnight-300 truncate">{item.name || 'Unknown'}</div>
          <div className="flex-1 h-5 bg-midnight-800 rounded-full overflow-hidden">
            <div 
              className={`h-full ${colors[color]} rounded-full transition-all duration-500`} 
              style={{ width: `${(item.value / max) * 100}%` }} 
            />
          </div>
          <div className="w-10 text-xs text-midnight-400 text-right font-medium">{item.value}</div>
        </div>
      ))}
    </div>
  )
}

function LineChart({ data }: { data: { date: string; count: number }[] }) {
  if (data.length === 0) return <p className="text-midnight-500 text-sm">No data yet</p>
  
  const max = Math.max(...data.map(d => d.count), 1)
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1 || 1)) * 100,
    y: 100 - (d.count / max) * 100,
    count: d.count,
    date: d.date
  }))
  
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaD = `${pathD} L 100 100 L 0 100 Z`
  
  return (
    <div className="relative h-32">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(74, 222, 128)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(74, 222, 128)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#areaGradient)" />
        <path d={pathD} fill="none" stroke="rgb(74, 222, 128)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="rgb(74, 222, 128)" className="hover:r-4 transition-all" />
        ))}
      </svg>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-midnight-500 mt-2">
        {data.filter((_, i) => i % Math.ceil(data.length / 5) === 0 || i === data.length - 1).map((d, i) => (
          <span key={i}>{new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        ))}
      </div>
    </div>
  )
}

export default function AdvancedAnalytics({ teamId }: { teamId: number | null }) {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d')
  const [expanded, setExpanded] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [teamId, period])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const url = teamId 
        ? `/api/analytics?teamId=${teamId}&period=${period}` 
        : `/api/analytics?period=${period}`
      const res = await fetch(url)
      const json = await res.json()
      setData(json)
    } catch (e) {
      console.error('Failed to fetch analytics', e)
    }
    setLoading(false)
  }

  const totalClicks = data?.clicksOverTime.reduce((sum, d) => sum + d.count, 0) || 0

  if (loading) {
    return (
      <div className="gradient-border p-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-camp-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-midnight-400">Loading analytics...</span>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="gradient-border p-6 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setExpanded(!expanded)} className="text-midnight-400 hover:text-white">
            {expanded ? '▼' : '▶'}
          </button>
          <h2 className="font-display font-semibold text-lg flex items-center gap-2">
            📊 Advanced Analytics
            <span className="px-2 py-0.5 bg-camp-500/20 text-camp-400 text-xs rounded-full">PRO</span>
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {(['7d', '30d', '90d'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                period === p 
                  ? 'bg-midnight-700 text-white' 
                  : 'text-midnight-400 hover:text-white'
              }`}
            >
              {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {expanded && (
        <>
          {/* Clicks Over Time */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-midnight-300 text-sm font-medium">Clicks Over Time</h3>
              <span className="text-camp-400 font-semibold">{totalClicks} total</span>
            </div>
            <LineChart data={data.clicksOverTime} />
          </div>

          {/* Grid of Charts */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Top Countries */}
            <div className="bg-midnight-800/30 rounded-xl p-4">
              <h3 className="text-midnight-300 text-sm font-medium mb-4 flex items-center gap-2">
                🌍 Top Countries
              </h3>
              {data.countries.length === 0 ? (
                <p className="text-midnight-500 text-xs">No data yet</p>
              ) : (
                <MiniBarChart 
                  data={data.countries.map(d => ({ name: d.country, value: Number(d.count) }))} 
                  color="blue"
                />
              )}
            </div>

            {/* Devices */}
            <div className="bg-midnight-800/30 rounded-xl p-4">
              <h3 className="text-midnight-300 text-sm font-medium mb-4 flex items-center gap-2">
                📱 Devices
              </h3>
              {data.devices.length === 0 ? (
                <p className="text-midnight-500 text-xs">No data yet</p>
              ) : (
                <MiniBarChart 
                  data={data.devices.map(d => ({ name: d.device, value: Number(d.count) }))} 
                  color="purple"
                />
              )}
            </div>

            {/* Browsers */}
            <div className="bg-midnight-800/30 rounded-xl p-4">
              <h3 className="text-midnight-300 text-sm font-medium mb-4 flex items-center gap-2">
                🌐 Browsers
              </h3>
              {data.browsers.length === 0 ? (
                <p className="text-midnight-500 text-xs">No data yet</p>
              ) : (
                <MiniBarChart 
                  data={data.browsers.map(d => ({ name: d.browser, value: Number(d.count) }))} 
                  color="orange"
                />
              )}
            </div>

            {/* Traffic Sources */}
            <div className="bg-midnight-800/30 rounded-xl p-4">
              <h3 className="text-midnight-300 text-sm font-medium mb-4 flex items-center gap-2">
                🔗 Traffic Sources
              </h3>
              {data.referers.length === 0 ? (
                <p className="text-midnight-500 text-xs">No data yet</p>
              ) : (
                <MiniBarChart 
                  data={data.referers.map(d => ({ name: d.source, value: Number(d.count) }))} 
                  color="camp"
                />
              )}
            </div>
          </div>

          {/* Top Performing Links */}
          {data.topLinks && data.topLinks.length > 0 && (
            <div className="mt-6 pt-6 border-t border-midnight-800">
              <h3 className="text-midnight-300 text-sm font-medium mb-4">🏆 Top Performing Links</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.topLinks.slice(0, 6).map((link, i) => (
                  <div key={link.id} className="flex items-center gap-3 p-3 bg-midnight-800/30 rounded-lg">
                    <span className="text-lg">{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '📊'}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{link.title || link.short_code}</p>
                      <p className="text-xs text-midnight-500">/{link.short_code}</p>
                    </div>
                    <span className="text-camp-400 font-semibold">{link.clicks}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
