import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { BetaAnalyticsDataClient } from '@google-analytics/data'
export const dynamic = 'force-dynamic'

// Initialize the Analytics Data client
const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
})

const PROPERTY_ID = process.env.GA_PROPERTY_ID || '516656871'

// Admin emails that can access this endpoint
const ADMIN_EMAILS = ['th.kiene@gmail.com', 'th.kiene@googlemail.com', 'service@getcampkit.com']

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const period = searchParams.get('period') || '7' // days

    const startDate = `${period}daysAgo`
    const endDate = 'today'

    // Fetch multiple reports in parallel
    const [
      overviewReport,
      channelsReport,
      pagesReport,
      countriesReport,
      devicesReport,
      dailyReport,
    ] = await Promise.all([
      // Overview metrics
      analyticsDataClient.runReport({
        property: `properties/${PROPERTY_ID}`,
        dateRanges: [{ startDate, endDate }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'sessions' },
          { name: 'screenPageViews' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' },
          { name: 'newUsers' },
        ],
      }),

      // Traffic channels
      analyticsDataClient.runReport({
        property: `properties/${PROPERTY_ID}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 10,
      }),

      // Top pages
      analyticsDataClient.runReport({
        property: `properties/${PROPERTY_ID}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }, { name: 'averageSessionDuration' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 10,
      }),

      // Countries
      analyticsDataClient.runReport({
        property: `properties/${PROPERTY_ID}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'country' }],
        metrics: [{ name: 'activeUsers' }],
        orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
        limit: 10,
      }),

      // Devices
      analyticsDataClient.runReport({
        property: `properties/${PROPERTY_ID}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'activeUsers' }, { name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      }),

      // Daily breakdown
      analyticsDataClient.runReport({
        property: `properties/${PROPERTY_ID}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'date' }],
        metrics: [{ name: 'activeUsers' }, { name: 'sessions' }],
        orderBys: [{ dimension: { dimensionName: 'date' }, desc: false }],
      }),
    ])

    // Parse overview metrics
    const overviewRow = overviewReport[0]?.rows?.[0]
    const overview = {
      activeUsers: parseInt(overviewRow?.metricValues?.[0]?.value || '0'),
      sessions: parseInt(overviewRow?.metricValues?.[1]?.value || '0'),
      pageViews: parseInt(overviewRow?.metricValues?.[2]?.value || '0'),
      avgSessionDuration: parseFloat(overviewRow?.metricValues?.[3]?.value || '0'),
      bounceRate: parseFloat(overviewRow?.metricValues?.[4]?.value || '0') * 100,
      newUsers: parseInt(overviewRow?.metricValues?.[5]?.value || '0'),
    }

    // Parse channels
    const channels = channelsReport[0]?.rows?.map(row => ({
      channel: row.dimensionValues?.[0]?.value || 'Unknown',
      sessions: parseInt(row.metricValues?.[0]?.value || '0'),
      users: parseInt(row.metricValues?.[1]?.value || '0'),
    })) || []

    // Parse top pages
    const pages = pagesReport[0]?.rows?.map(row => ({
      path: row.dimensionValues?.[0]?.value || '/',
      views: parseInt(row.metricValues?.[0]?.value || '0'),
      avgDuration: parseFloat(row.metricValues?.[1]?.value || '0'),
    })) || []

    // Parse countries
    const countries = countriesReport[0]?.rows?.map(row => ({
      country: row.dimensionValues?.[0]?.value || 'Unknown',
      users: parseInt(row.metricValues?.[0]?.value || '0'),
    })) || []

    // Parse devices
    const devices = devicesReport[0]?.rows?.map(row => ({
      device: row.dimensionValues?.[0]?.value || 'Unknown',
      users: parseInt(row.metricValues?.[0]?.value || '0'),
      sessions: parseInt(row.metricValues?.[1]?.value || '0'),
    })) || []

    // Parse daily data
    const daily = dailyReport[0]?.rows?.map(row => ({
      date: row.dimensionValues?.[0]?.value || '',
      users: parseInt(row.metricValues?.[0]?.value || '0'),
      sessions: parseInt(row.metricValues?.[1]?.value || '0'),
    })) || []

    return NextResponse.json({
      overview,
      channels,
      pages,
      countries,
      devices,
      daily,
      period: parseInt(period),
    })

  } catch (error) {
    console.error('GA4 API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics data', details: String(error) },
      { status: 500 }
    )
  }
}
