import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bitly Alternative for Marketing Teams | CampKit',
  description: 'Looking for a Bitly alternative with UTM tracking? CampKit combines short links, UTM builder, and campaign analytics. Start free.',
  robots: 'noindex', // Landing page, don't index
}

export default function BitlyAlternativePage() {
  return (
    <div className="min-h-screen bg-midnight-900 text-white">
      {/* Minimal Header */}
      <header className="py-6 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center">
              <span className="text-midnight-900 font-bold text-lg">C</span>
            </div>
            <span className="font-display font-semibold text-lg">CampKit</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-midnight-400 hover:text-white text-sm">Login</Link>
            <Link href="/signup" className="px-5 py-2.5 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-all text-sm">
              Start Free →
            </Link>
          </div>
        </div>
      </header>

      {/* Hero - Problem Focused */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <span className="text-blue-400 text-sm font-medium">🔄 Switching from Bitly?</span>
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Bitly shortens links.<br/>
            <span className="text-camp-400">CampKit tracks campaigns.</span>
          </h1>
          
          <p className="text-xl text-midnight-300 mb-10 max-w-2xl mx-auto">
            If you're a marketer using Bitly + spreadsheets for UTM tracking, you're working too hard. 
            CampKit gives you short links <strong className="text-white">with UTM parameters and analytics built-in</strong>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="/signup" className="px-8 py-4 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-bold text-lg rounded-xl transition-all hover:scale-105 shadow-lg shadow-camp-500/25">
              Start Free — No Credit Card
            </Link>
          </div>
          <p className="text-midnight-500 text-sm">50 links free forever • Setup in 30 seconds</p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-6 bg-midnight-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            CampKit vs Bitly — Side by Side
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-midnight-700">
                  <th className="text-left py-4 px-4 text-midnight-400 font-medium">Feature</th>
                  <th className="text-center py-4 px-4 text-midnight-400 font-medium">Bitly Free</th>
                  <th className="text-center py-4 px-4 text-midnight-400 font-medium">Bitly Paid</th>
                  <th className="text-center py-4 px-4 text-camp-400 font-semibold">CampKit Pro</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4">Short Links</td>
                  <td className="py-4 px-4 text-center text-green-400">✓</td>
                  <td className="py-4 px-4 text-center text-green-400">✓</td>
                  <td className="py-4 px-4 text-center text-green-400">✓</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4">Click Analytics</td>
                  <td className="py-4 px-4 text-center text-yellow-400">Basic</td>
                  <td className="py-4 px-4 text-center text-green-400">✓</td>
                  <td className="py-4 px-4 text-center text-green-400">✓</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4 font-medium text-white">Built-in UTM Builder</td>
                  <td className="py-4 px-4 text-center text-red-400">✗</td>
                  <td className="py-4 px-4 text-center text-red-400">✗</td>
                  <td className="py-4 px-4 text-center text-green-400 font-medium">✓</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4 font-medium text-white">UTM Templates</td>
                  <td className="py-4 px-4 text-center text-red-400">✗</td>
                  <td className="py-4 px-4 text-center text-red-400">✗</td>
                  <td className="py-4 px-4 text-center text-green-400 font-medium">✓</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4 font-medium text-white">Campaign-Level Analytics</td>
                  <td className="py-4 px-4 text-center text-red-400">✗</td>
                  <td className="py-4 px-4 text-center text-red-400">✗</td>
                  <td className="py-4 px-4 text-center text-green-400 font-medium">✓</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4">Custom Domains</td>
                  <td className="py-4 px-4 text-center text-red-400">✗</td>
                  <td className="py-4 px-4 text-center text-green-400">✓</td>
                  <td className="py-4 px-4 text-center text-green-400">✓</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4">Device/Geo Analytics</td>
                  <td className="py-4 px-4 text-center text-red-400">✗</td>
                  <td className="py-4 px-4 text-center text-green-400">✓</td>
                  <td className="py-4 px-4 text-center text-green-400">✓</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4">Team Collaboration</td>
                  <td className="py-4 px-4 text-center text-red-400">✗</td>
                  <td className="py-4 px-4 text-center text-yellow-400">Add-on</td>
                  <td className="py-4 px-4 text-center text-green-400">✓</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Price</td>
                  <td className="py-4 px-4 text-center">€0</td>
                  <td className="py-4 px-4 text-center">€35+/mo</td>
                  <td className="py-4 px-4 text-center text-camp-400 font-bold">€9/mo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-4">
            Sound familiar?
          </h2>
          <p className="text-midnight-400 text-center mb-12 max-w-2xl mx-auto">
            If you're using Bitly for marketing, you've probably experienced these:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20">
              <p className="text-red-400 font-medium mb-2">😤 "I have to add UTMs manually every time"</p>
              <p className="text-midnight-400 text-sm">Bitly doesn't build UTM parameters. You're copy-pasting from a spreadsheet or typing them by hand.</p>
            </div>
            <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20">
              <p className="text-red-400 font-medium mb-2">📊 "I can't see campaign performance"</p>
              <p className="text-midnight-400 text-sm">Bitly shows clicks per link, but not "how did my Q4 campaign perform across all channels?"</p>
            </div>
            <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20">
              <p className="text-red-400 font-medium mb-2">👥 "My team uses different naming"</p>
              <p className="text-midnight-400 text-sm">"facebook" vs "Facebook" vs "fb" — your analytics are fragmented because there's no enforcement.</p>
            </div>
            <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20">
              <p className="text-red-400 font-medium mb-2">💰 "Enterprise pricing for basic features"</p>
              <p className="text-midnight-400 text-sm">Bitly's paid plans start at $35/month and go up fast. Custom domains? Extra. Teams? Extra.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 px-6 bg-midnight-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-4">
            CampKit solves all of this
          </h2>
          <p className="text-midnight-400 text-center mb-12 max-w-2xl mx-auto">
            One tool. UTM builder + short links + analytics. No spreadsheets.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-midnight-800/50 border border-midnight-700 text-center">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="font-semibold mb-2">UTM + Short Link in One Step</h3>
              <p className="text-midnight-400 text-sm">Add UTM parameters, get a short link automatically. No separate tools needed.</p>
            </div>
            <div className="p-6 rounded-xl bg-midnight-800/50 border border-midnight-700 text-center">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="font-semibold mb-2">Templates for Consistency</h3>
              <p className="text-midnight-400 text-sm">"Google Ads" template = source:google, medium:cpc. Every time. No variations.</p>
            </div>
            <div className="p-6 rounded-xl bg-midnight-800/50 border border-midnight-700 text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-semibold mb-2">Campaign Analytics</h3>
              <p className="text-midnight-400 text-sm">See all links for "spring_sale" together. Device, location, referrer data included.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Save €300+/year switching from Bitly
          </h2>
          <p className="text-midnight-400 mb-8">
            Bitly Core costs €35/month. CampKit Pro costs €9/month. Same features, better UTM workflow.
          </p>
          
          <div className="inline-flex items-center gap-8 p-6 bg-midnight-800/50 rounded-2xl border border-midnight-700">
            <div className="text-center">
              <p className="text-midnight-500 text-sm mb-1">Bitly Core</p>
              <p className="font-display text-2xl font-bold line-through text-midnight-500">€420/year</p>
            </div>
            <div className="text-4xl">→</div>
            <div className="text-center">
              <p className="text-camp-400 text-sm mb-1">CampKit Pro</p>
              <p className="font-display text-2xl font-bold text-camp-400">€108/year</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-6 bg-midnight-800/30">
        <div className="max-w-3xl mx-auto">
          <div className="p-8 rounded-2xl bg-midnight-800/50 border border-midnight-700 text-center">
            <div className="flex justify-center gap-1 mb-4">
              <span className="text-yellow-400">★★★★★</span>
            </div>
            <p className="text-xl text-midnight-300 mb-6 leading-relaxed">
              "We switched from Bitly and <span className="text-white font-medium">saved over €200/month</span>. 
              The UTM templates alone are worth it — no more 'facebook' vs 'Facebook' chaos in our analytics."
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">JK</div>
              <div className="text-left">
                <p className="font-medium text-sm">Jonas Krüger</p>
                <p className="text-midnight-500 text-xs">Digital Agency Owner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Ready to upgrade from Bitly?
          </h2>
          <p className="text-midnight-400 text-lg mb-8">
            Start free with 50 links. No credit card required. Import takes 2 minutes.
          </p>
          <Link href="/signup" className="inline-flex px-8 py-4 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-bold text-lg rounded-xl transition-all hover:scale-105 shadow-lg shadow-camp-500/25">
            Start Free — Switch Today
          </Link>
          <p className="text-midnight-500 text-sm mt-4">
            Free plan forever • Pro starts at €9/month
          </p>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 px-6 border-t border-midnight-800">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center">
              <span className="text-midnight-900 font-bold">C</span>
            </div>
            <span className="font-display font-semibold">CampKit</span>
          </div>
          <p className="text-midnight-500 text-sm">© 2024 CampKit</p>
        </div>
      </footer>
    </div>
  )
}
