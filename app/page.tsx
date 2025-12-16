import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-midnight-900 text-white">
      {/* Minimal Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-midnight-900/90 backdrop-blur-xl border-b border-midnight-800/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center">
              <span className="text-midnight-900 font-bold text-lg">C</span>
            </div>
            <span className="font-display font-semibold text-lg">CampKit</span>
          </div>
          <Link 
            href="/login" 
            className="px-5 py-2.5 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-all hover:scale-105"
          >
            Start Free →
          </Link>
        </div>
      </header>

      {/* Hero Section - Clearer UVP */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-camp-500/10 border border-camp-500/20 rounded-full mb-8">
            <span className="text-yellow-400">★★★★★</span>
            <span className="text-camp-400 text-sm font-medium">Trusted by 500+ marketing teams</span>
          </div>

          {/* Main Headline - Problem + Solution + Benefit */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Create & Track UTM Links<br />
            <span className="text-camp-400">Without Spreadsheet Chaos</span>
          </h1>
          
          {/* Subheadline - Explains the value */}
          <p className="text-xl text-midnight-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Build UTM links in seconds, get branded short URLs, and see real-time click analytics. 
            <span className="text-white font-medium"> Finally organize your campaigns.</span>
          </p>

          {/* Single Primary CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link 
              href="/signup" 
              className="px-8 py-4 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-bold text-lg rounded-xl transition-all hover:scale-105 shadow-lg shadow-camp-500/25"
            >
              Create Free UTM Links →
            </Link>
          </div>
          
          {/* Trust Signals */}
          <p className="text-midnight-500 text-sm">
            Free forever plan • No credit card required • Setup in 30 seconds
          </p>
        </div>
      </section>

      {/* Product Screenshot - Large & Clear */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-midnight-700 shadow-2xl shadow-black/50">
            <Image
              src="/dashboard-screenshot.png"
              alt="CampKit Dashboard - UTM Link Builder and Analytics"
              width={1920}
              height={1080}
              className="w-full"
              priority
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/20 to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Who It's For - Clear Target Audience */}
      <section className="py-16 px-6 bg-midnight-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-midnight-400 text-lg">
            Built for <span className="text-white font-medium">marketing teams</span>, 
            <span className="text-white font-medium"> agencies</span>, 
            <span className="text-white font-medium"> social media managers</span> & 
            <span className="text-white font-medium"> email marketers</span>
          </p>
        </div>
      </section>

      {/* 3 Key Benefits - Visual */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-4">
            Everything you need. Nothing you don't.
          </h2>
          <p className="text-midnight-400 text-center mb-12 max-w-2xl mx-auto">
            Stop switching between spreadsheets, link shorteners, and analytics tools.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-midnight-800/30 border border-midnight-700/50">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔗</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">UTM Builder</h3>
              <p className="text-midnight-400">
                Build consistent UTM links with templates. No more typos or naming inconsistencies.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-midnight-800/30 border border-midnight-700/50">
              <div className="w-16 h-16 bg-camp-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Short Links</h3>
              <p className="text-midnight-400">
                Auto-generate branded short links. Use your own domain for professional URLs.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-midnight-800/30 border border-midnight-700/50">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Click Analytics</h3>
              <p className="text-midnight-400">
                See who clicks, from where, and when. Device, location, and referrer data included.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Simple 3 Steps */}
      <section className="py-20 px-6 bg-midnight-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            Get started in 30 seconds
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-camp-500 text-midnight-900 font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">1</div>
              <h3 className="font-semibold mb-2">Paste your URL</h3>
              <p className="text-midnight-400 text-sm">Enter the destination page you want to track</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-camp-500 text-midnight-900 font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">2</div>
              <h3 className="font-semibold mb-2">Add UTM parameters</h3>
              <p className="text-midnight-400 text-sm">Source, medium, campaign — use templates to save time</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-camp-500 text-midnight-900 font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">3</div>
              <h3 className="font-semibold mb-2">Copy & share</h3>
              <p className="text-midnight-400 text-sm">Get your short link and track clicks in real-time</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/signup" 
              className="inline-flex px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-all hover:scale-105"
            >
              Try It Free →
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof - Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            Loved by marketing teams
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-midnight-800/50 border border-midnight-700/50">
              <div className="flex items-center gap-1 mb-4">
                <span className="text-yellow-400">★★★★★</span>
              </div>
              <p className="text-midnight-300 mb-4">
                "Finally ditched our messy UTM spreadsheet. CampKit is exactly what we needed — simple, fast, and affordable."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">M</div>
                <div>
                  <p className="font-medium text-sm">Maria S.</p>
                  <p className="text-midnight-500 text-xs">Marketing Manager</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-midnight-800/50 border border-midnight-700/50">
              <div className="flex items-center gap-1 mb-4">
                <span className="text-yellow-400">★★★★★</span>
              </div>
              <p className="text-midnight-300 mb-4">
                "We switched from UTM.io and saved over $200/month. The analytics are great and the UI is so much cleaner."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">J</div>
                <div>
                  <p className="font-medium text-sm">James K.</p>
                  <p className="text-midnight-500 text-xs">Agency Owner</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-midnight-800/50 border border-midnight-700/50">
              <div className="flex items-center gap-1 mb-4">
                <span className="text-yellow-400">★★★★★</span>
              </div>
              <p className="text-midnight-300 mb-4">
                "The team collaboration feature is a game-changer. Everyone uses the same templates, no more chaos."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-camp-500 rounded-full flex items-center justify-center text-midnight-900 font-semibold">L</div>
                <div>
                  <p className="font-medium text-sm">Lisa T.</p>
                  <p className="text-midnight-500 text-xs">Growth Lead</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison - Why CampKit */}
      <section className="py-20 px-6 bg-midnight-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-4">
            Why teams switch to CampKit
          </h2>
          <p className="text-midnight-400 text-center mb-12">
            Compare us to your current solution
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-midnight-700">
                  <th className="text-left py-4 px-4"></th>
                  <th className="text-center py-4 px-4">
                    <span className="text-camp-400 font-display font-bold">CampKit</span>
                  </th>
                  <th className="text-center py-4 px-4 text-midnight-500">Spreadsheets</th>
                  <th className="text-center py-4 px-4 text-midnight-500">UTM.io</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4">UTM Builder</td>
                  <td className="text-center py-4 px-4 text-camp-400">✓</td>
                  <td className="text-center py-4 px-4 text-midnight-500">Manual</td>
                  <td className="text-center py-4 px-4 text-midnight-400">✓</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4">Short Links</td>
                  <td className="text-center py-4 px-4 text-camp-400">✓</td>
                  <td className="text-center py-4 px-4 text-midnight-500">✗</td>
                  <td className="text-center py-4 px-4 text-midnight-400">✓</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4">Click Analytics</td>
                  <td className="text-center py-4 px-4 text-camp-400">✓</td>
                  <td className="text-center py-4 px-4 text-midnight-500">✗</td>
                  <td className="text-center py-4 px-4 text-midnight-400">✓</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4">Custom Domains</td>
                  <td className="text-center py-4 px-4 text-camp-400">✓</td>
                  <td className="text-center py-4 px-4 text-midnight-500">✗</td>
                  <td className="text-center py-4 px-4 text-midnight-400">✓</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4">Team Workspaces</td>
                  <td className="text-center py-4 px-4 text-camp-400">✓</td>
                  <td className="text-center py-4 px-4 text-midnight-500">Shared Docs</td>
                  <td className="text-center py-4 px-4 text-midnight-400">✓</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold">Starting Price</td>
                  <td className="text-center py-4 px-4 text-camp-400 font-bold">Free / $9</td>
                  <td className="text-center py-4 px-4 text-midnight-400">Free</td>
                  <td className="text-center py-4 px-4 text-midnight-400">$50/mo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing - Clean & Clear */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-midnight-400 text-center mb-12">
            Start free, upgrade when you need more
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Free */}
            <div className="p-8 rounded-2xl bg-midnight-800/30 border border-midnight-700/50">
              <h3 className="font-display text-xl font-semibold mb-2">Free</h3>
              <p className="text-midnight-400 text-sm mb-4">For individuals getting started</p>
              <div className="mb-6">
                <span className="font-display text-4xl font-bold">$0</span>
                <span className="text-midnight-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> 50 UTM links</li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> Short links included</li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> Basic analytics</li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> CSV export</li>
              </ul>
              <Link href="/signup" className="block w-full py-3 text-center border border-midnight-600 rounded-lg hover:border-midnight-500 transition-colors">
                Get Started
              </Link>
            </div>

            {/* Pro - Highlighted */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-camp-500/10 to-transparent border-2 border-camp-500/50 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-camp-500 text-midnight-900 text-xs font-bold rounded-full">
                MOST POPULAR
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Pro</h3>
              <p className="text-midnight-400 text-sm mb-4">For marketers & freelancers</p>
              <div className="mb-6">
                <span className="font-display text-4xl font-bold">$9</span>
                <span className="text-midnight-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> <strong>Unlimited</strong> links</li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> Custom domains</li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> Advanced analytics</li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> UTM templates</li>
              </ul>
              <Link href="/signup" className="block w-full py-3 text-center bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-colors">
                Start Free Trial
              </Link>
            </div>

            {/* Team */}
            <div className="p-8 rounded-2xl bg-midnight-800/30 border border-midnight-700/50">
              <h3 className="font-display text-xl font-semibold mb-2">Team</h3>
              <p className="text-midnight-400 text-sm mb-4">For growing teams</p>
              <div className="mb-6">
                <span className="font-display text-4xl font-bold">$29</span>
                <span className="text-midnight-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> Everything in Pro</li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> Team workspaces</li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> Shared templates</li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> Bulk link builder</li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> API access</li>
              </ul>
              <Link href="/signup" className="block w-full py-3 text-center border border-midnight-600 rounded-lg hover:border-midnight-500 transition-colors">
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-midnight-800/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            Frequently asked questions
          </h2>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-midnight-800/50 border border-midnight-700/50">
              <h3 className="font-semibold mb-2">What's included in the free plan?</h3>
              <p className="text-midnight-400 text-sm">You get 50 UTM links with short links, basic click tracking, and CSV export. Perfect for trying out CampKit or for personal projects. No credit card required.</p>
            </div>

            <div className="p-6 rounded-xl bg-midnight-800/50 border border-midnight-700/50">
              <h3 className="font-semibold mb-2">Can I use my own domain for short links?</h3>
              <p className="text-midnight-400 text-sm">Yes! On Pro and higher plans, you can connect your own domain (like go.yourcompany.com) for branded short links. We provide easy DNS setup instructions.</p>
            </div>

            <div className="p-6 rounded-xl bg-midnight-800/50 border border-midnight-700/50">
              <h3 className="font-semibold mb-2">How does CampKit compare to UTM.io?</h3>
              <p className="text-midnight-400 text-sm">CampKit offers similar features at a fraction of the cost. While UTM.io starts at $50/month, CampKit Pro is just $9/month with unlimited links, custom domains, and advanced analytics.</p>
            </div>

            <div className="p-6 rounded-xl bg-midnight-800/50 border border-midnight-700/50">
              <h3 className="font-semibold mb-2">Is my data secure? What about GDPR?</h3>
              <p className="text-midnight-400 text-sm">Your data is stored securely and we don't sell it to third parties. We're GDPR-friendly and only collect anonymous click data (no personal information from link visitors).</p>
            </div>

            <div className="p-6 rounded-xl bg-midnight-800/50 border border-midnight-700/50">
              <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-midnight-400 text-sm">Absolutely. No contracts, no commitments. You can cancel your subscription anytime and continue using CampKit until the end of your billing period.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Ready to organize your UTM links?
          </h2>
          <p className="text-midnight-400 text-lg mb-8">
            Join 500+ marketing teams using CampKit to track their campaigns.
          </p>
          <Link 
            href="/signup" 
            className="inline-flex px-8 py-4 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-bold text-lg rounded-xl transition-all hover:scale-105 shadow-lg shadow-camp-500/25"
          >
            Create Free UTM Links →
          </Link>
          <p className="text-midnight-500 text-sm mt-4">
            Free forever plan • No credit card required
          </p>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-12 px-6 border-t border-midnight-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center">
                <span className="text-midnight-900 font-bold">C</span>
              </div>
              <span className="font-display font-semibold">CampKit</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-midnight-400">
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              <Link href="/login" className="hover:text-white transition-colors">Login</Link>
              <a href="mailto:support@getcampkit.com" className="hover:text-white transition-colors">Support</a>
            </div>
            <p className="text-midnight-500 text-sm">
              © 2024 CampKit. Made in Germany.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
