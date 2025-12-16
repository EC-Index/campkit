import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Why Marketers Outgrow Bitly (And What to Use Instead)',
  description: 'Bitly is great for shortening links, but marketing teams need more: UTM tracking, campaign analytics, and team collaboration. Here\'s why marketers switch.',
  keywords: 'bitly alternative, bitly for marketing, utm tracking, link shortener for marketers, campaign tracking',
  openGraph: {
    title: 'Why Marketers Outgrow Bitly (And What to Use Instead)',
    description: 'Bitly is great for shortening links, but marketing teams need more: UTM tracking, campaign analytics, and team collaboration.',
    type: 'article',
    publishedTime: '2024-01-15',
  },
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-midnight-900 text-white">
      {/* Header */}
      <header className="border-b border-midnight-800 bg-midnight-900/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center">
              <span className="text-midnight-900 font-bold text-lg">C</span>
            </div>
            <span className="font-display font-semibold text-lg">CampKit</span>
          </Link>
          <Link href="/signup" className="px-5 py-2.5 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-all">
            Try Free →
          </Link>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-midnight-500 mb-8">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-white">Blog</Link>
          <span>/</span>
          <span className="text-midnight-400">Why Marketers Outgrow Bitly</span>
        </div>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full">Marketing</span>
            <span className="text-midnight-500 text-sm">8 min read</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Why Marketers Outgrow Bitly (And What to Use Instead)
          </h1>
          <p className="text-xl text-midnight-400 leading-relaxed">
            Bitly is the world's most popular link shortener. But for marketing teams running multi-channel campaigns, it's often not enough. Here's what happens when you need more than just short links.
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <h2 className="font-display text-2xl font-bold mt-12 mb-4">The Bitly Problem</h2>
          <p className="text-midnight-300 mb-6">
            Let's be clear: Bitly is excellent at what it does. If you need to shorten a link and share it on social media, Bitly works perfectly. Millions of people use it every day.
          </p>
          <p className="text-midnight-300 mb-6">
            But here's what happens when marketing teams start scaling their campaigns:
          </p>
          <ul className="space-y-3 mb-8 text-midnight-300">
            <li className="flex items-start gap-3">
              <span className="text-red-400 mt-1">✗</span>
              <span><strong className="text-white">UTM parameters get messy.</strong> You're adding ?utm_source=facebook&utm_medium=social manually, hoping everyone on the team uses the same naming convention.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 mt-1">✗</span>
              <span><strong className="text-white">Spreadsheets multiply.</strong> Someone creates a "UTM Master Sheet" that quickly becomes outdated. Nobody knows which version is current.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 mt-1">✗</span>
              <span><strong className="text-white">Analytics are link-level, not campaign-level.</strong> Bitly tells you clicks per link, but not "how did my Q4 campaign perform across all channels?"</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 mt-1">✗</span>
              <span><strong className="text-white">No team governance.</strong> When 5 people create links independently, you get "facebook", "Facebook", "fb", and "FB" as sources.</span>
            </li>
          </ul>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">When Link Shortening Isn't Enough</h2>
          <p className="text-midnight-300 mb-6">
            The moment you're running campaigns across multiple channels — Google Ads, Meta, LinkedIn, email newsletters, influencer partnerships — you need more than a link shortener. You need a <strong className="text-white">campaign tracking system</strong>.
          </p>
          <p className="text-midnight-300 mb-6">
            The difference matters:
          </p>
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="p-6 bg-midnight-800/50 rounded-xl border border-midnight-700">
              <h3 className="font-semibold text-lg mb-3">Link Shortener (Bitly)</h3>
              <ul className="space-y-2 text-sm text-midnight-400">
                <li>• Shortens URLs</li>
                <li>• Tracks clicks per link</li>
                <li>• Shows basic location data</li>
                <li>• Custom domains (paid)</li>
              </ul>
            </div>
            <div className="p-6 bg-camp-500/10 rounded-xl border border-camp-500/30">
              <h3 className="font-semibold text-lg mb-3 text-camp-400">Campaign Tracker</h3>
              <ul className="space-y-2 text-sm text-midnight-300">
                <li>• <strong>Built-in UTM builder</strong></li>
                <li>• <strong>Campaign-level analytics</strong></li>
                <li>• Templates for consistency</li>
                <li>• Team collaboration</li>
                <li>• Device, browser, geo data</li>
              </ul>
            </div>
          </div>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">The Real Cost of "Free" Tools</h2>
          <p className="text-midnight-300 mb-6">
            Many teams stick with Bitly's free tier plus a spreadsheet because it's "free." But consider the hidden costs:
          </p>
          <ul className="space-y-3 mb-8 text-midnight-300">
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 mt-1">⏱</span>
              <span><strong className="text-white">Time spent on manual UTM creation.</strong> 2-3 minutes per link × 50 links per month = 2+ hours of tedious work.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 mt-1">📊</span>
              <span><strong className="text-white">Bad data from inconsistent naming.</strong> When "google" and "Google" are different sources in your analytics, your reports are wrong.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 mt-1">🔍</span>
              <span><strong className="text-white">No quick answers.</strong> "Which campaign drove the most clicks last month?" shouldn't require 30 minutes of spreadsheet work.</span>
            </li>
          </ul>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">What Marketing Teams Actually Need</h2>
          <p className="text-midnight-300 mb-6">
            After talking to dozens of marketing teams, the requirements are pretty consistent:
          </p>
          <ol className="space-y-4 mb-8 text-midnight-300 list-decimal list-inside">
            <li><strong className="text-white">UTM parameters built into the link creation flow.</strong> Not a separate step, not a spreadsheet lookup.</li>
            <li><strong className="text-white">Templates that enforce consistency.</strong> "Google Ads" is always "google" as source, "cpc" as medium. No variations.</li>
            <li><strong className="text-white">Campaign-level analytics.</strong> See all links for "spring_sale_2024" in one view with aggregated stats.</li>
            <li><strong className="text-white">Team access with shared resources.</strong> New team member? They use the same templates as everyone else.</li>
            <li><strong className="text-white">Short links that don't break.</strong> Yes, short links are still useful. They should just come with tracking built-in.</li>
          </ol>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">The Alternative: Purpose-Built Campaign Tracking</h2>
          <p className="text-midnight-300 mb-6">
            This is exactly why we built <Link href="/" className="text-camp-400 hover:underline">CampKit</Link>. It's not trying to replace Bitly for casual link shortening. It's built specifically for marketing teams who need:
          </p>
          <ul className="space-y-3 mb-8 text-midnight-300">
            <li className="flex items-start gap-3">
              <span className="text-camp-400 mt-1">✓</span>
              <span>UTM builder + short links in one workflow</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-camp-400 mt-1">✓</span>
              <span>Reusable templates for consistent naming</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-camp-400 mt-1">✓</span>
              <span>Click analytics with device, location, and referrer data</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-camp-400 mt-1">✓</span>
              <span>Team workspaces with shared templates</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-camp-400 mt-1">✓</span>
              <span>Custom domains for branded links</span>
            </li>
          </ul>
          <p className="text-midnight-300 mb-6">
            And it starts at €9/month — less than what most teams spend on coffee in a week.
          </p>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">When to Stay with Bitly</h2>
          <p className="text-midnight-300 mb-6">
            To be fair, Bitly is still the right choice if:
          </p>
          <ul className="space-y-2 mb-8 text-midnight-300">
            <li>• You only need to shorten links occasionally</li>
            <li>• You don't use UTM parameters</li>
            <li>• You're a solo creator, not a marketing team</li>
            <li>• QR codes are your primary use case</li>
          </ul>
          <p className="text-midnight-300 mb-6">
            But if you're nodding along to the problems described above, it might be time to upgrade your workflow.
          </p>

          {/* CTA */}
          <div className="my-12 p-8 bg-gradient-to-r from-camp-500/10 to-camp-400/10 rounded-2xl border border-camp-500/30 text-center">
            <h3 className="font-display text-2xl font-bold mb-3">Ready to upgrade from Bitly?</h3>
            <p className="text-midnight-400 mb-6">Try CampKit free — no credit card required. Import your existing links and see the difference.</p>
            <Link href="/signup" className="inline-block px-8 py-4 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-bold rounded-xl transition-all">
              Start Free →
            </Link>
          </div>
        </div>

        {/* Author */}
        <footer className="mt-16 pt-8 border-t border-midnight-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-camp-500 rounded-full flex items-center justify-center text-midnight-900 font-bold">CK</div>
            <div>
              <p className="font-medium">CampKit Team</p>
              <p className="text-midnight-500 text-sm">Building better tools for marketing teams</p>
            </div>
          </div>
        </footer>
      </article>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-midnight-800">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center">
              <span className="text-midnight-900 font-bold">C</span>
            </div>
            <span className="font-display font-semibold">CampKit</span>
          </Link>
          <p className="text-midnight-500 text-sm">© 2024 CampKit</p>
        </div>
      </footer>
    </div>
  )
}
