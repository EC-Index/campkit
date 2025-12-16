import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CampKit vs UTM.io vs Bitly - UTM Link Tool Comparison 2024',
  description: 'Compare CampKit, UTM.io, and Bitly for UTM link management. See pricing, features, and find the best tool for your marketing team.',
  keywords: 'utm.io alternative, bitly alternative, utm link builder, campaign tracking, short links',
}

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-midnight-900 text-white">
      {/* Header */}
      <header className="border-b border-midnight-800 bg-midnight-900/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center">
              <span className="text-midnight-900 font-bold text-lg">C</span>
            </div>
            <span className="font-display font-semibold text-lg">CampKit</span>
          </Link>
          <Link 
            href="/signup" 
            className="px-5 py-2.5 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-all hover:scale-105"
          >
            Start Free →
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <span className="text-blue-400 text-sm font-medium">📊 Tool Comparison 2024</span>
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-6">
            CampKit vs UTM.io vs Bitly
          </h1>
          
          <p className="text-xl text-midnight-300 max-w-2xl mx-auto">
            Which UTM link management tool is right for you? We compare features, pricing, and use cases to help you decide.
          </p>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* CampKit */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-camp-500/10 to-transparent border-2 border-camp-500/50 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-camp-500 text-midnight-900 text-xs font-bold rounded-full">
                BEST VALUE
              </div>
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-camp-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-midnight-900 font-bold text-xl">C</span>
                </div>
                <h3 className="font-display text-xl font-bold">CampKit</h3>
              </div>
              <p className="text-midnight-400 text-sm text-center mb-4">
                All-in-one UTM builder with short links and analytics at an affordable price.
              </p>
              <div className="text-center">
                <span className="text-camp-400 font-display text-2xl font-bold">$9</span>
                <span className="text-midnight-500">/month</span>
              </div>
              <p className="text-midnight-500 text-xs text-center mt-1">Free plan available</p>
            </div>

            {/* UTM.io */}
            <div className="p-6 rounded-2xl bg-midnight-800/30 border border-midnight-700/50">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-xl">U</span>
                </div>
                <h3 className="font-display text-xl font-bold">UTM.io</h3>
              </div>
              <p className="text-midnight-400 text-sm text-center mb-4">
                Enterprise UTM management with governance features for large teams.
              </p>
              <div className="text-center">
                <span className="text-white font-display text-2xl font-bold">$50</span>
                <span className="text-midnight-500">/month</span>
              </div>
              <p className="text-midnight-500 text-xs text-center mt-1">No free plan</p>
            </div>

            {/* Bitly */}
            <div className="p-6 rounded-2xl bg-midnight-800/30 border border-midnight-700/50">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <h3 className="font-display text-xl font-bold">Bitly</h3>
              </div>
              <p className="text-midnight-400 text-sm text-center mb-4">
                Popular link shortener with basic UTM builder add-on.
              </p>
              <div className="text-center">
                <span className="text-white font-display text-2xl font-bold">$35</span>
                <span className="text-midnight-500">/month</span>
              </div>
              <p className="text-midnight-500 text-xs text-center mt-1">Limited free plan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section className="py-16 px-6 bg-midnight-800/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            Feature Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-midnight-700">
                  <th className="text-left py-4 px-4 font-medium">Feature</th>
                  <th className="text-center py-4 px-4">
                    <span className="text-camp-400 font-display font-bold">CampKit</span>
                  </th>
                  <th className="text-center py-4 px-4 text-midnight-400">UTM.io</th>
                  <th className="text-center py-4 px-4 text-midnight-400">Bitly</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4 font-medium">UTM Link Builder</td>
                  <td className="text-center py-4 px-4 text-camp-400">✓</td>
                  <td className="text-center py-4 px-4 text-green-400">✓</td>
                  <td className="text-center py-4 px-4 text-green-400">✓</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4 font-medium">Short Links</td>
                  <td className="text-center py-4 px-4 text-camp-400">✓ Included</td>
                  <td className="text-center py-4 px-4 text-yellow-400">Add-on</td>
                  <td className="text-center py-4 px-4 text-green-400">✓ Core feature</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4 font-medium">Click Analytics</td>
                  <td className="text-center py-4 px-4 text-camp-400">✓ Advanced</td>
                  <td className="text-center py-4 px-4 text-green-400">✓ Basic</td>
                  <td className="text-center py-4 px-4 text-green-400">✓ Advanced</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4 font-medium">Geo & Device Data</td>
                  <td className="text-center py-4 px-4 text-camp-400">✓</td>
                  <td className="text-center py-4 px-4 text-red-400">✗</td>
                  <td className="text-center py-4 px-4 text-green-400">✓</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4 font-medium">Custom Domains</td>
                  <td className="text-center py-4 px-4 text-camp-400">✓ From $9</td>
                  <td className="text-center py-4 px-4 text-green-400">✓ Enterprise</td>
                  <td className="text-center py-4 px-4 text-green-400">✓ From $35</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4 font-medium">UTM Templates</td>
                  <td className="text-center py-4 px-4 text-camp-400">✓</td>
                  <td className="text-center py-4 px-4 text-green-400">✓</td>
                  <td className="text-center py-4 px-4 text-red-400">✗</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4 font-medium">Team Workspaces</td>
                  <td className="text-center py-4 px-4 text-camp-400">✓ From $29</td>
                  <td className="text-center py-4 px-4 text-green-400">✓</td>
                  <td className="text-center py-4 px-4 text-green-400">✓ From $199</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4 font-medium">Bulk Link Builder</td>
                  <td className="text-center py-4 px-4 text-camp-400">✓ 100 at once</td>
                  <td className="text-center py-4 px-4 text-green-400">✓</td>
                  <td className="text-center py-4 px-4 text-green-400">✓</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4 font-medium">API Access</td>
                  <td className="text-center py-4 px-4 text-camp-400">✓ From $29</td>
                  <td className="text-center py-4 px-4 text-green-400">✓ Enterprise</td>
                  <td className="text-center py-4 px-4 text-green-400">✓ From $199</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4 font-medium">QR Codes</td>
                  <td className="text-center py-4 px-4 text-yellow-400">Coming soon</td>
                  <td className="text-center py-4 px-4 text-red-400">✗</td>
                  <td className="text-center py-4 px-4 text-green-400">✓</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4 font-medium">UTM Governance</td>
                  <td className="text-center py-4 px-4 text-yellow-400">Templates</td>
                  <td className="text-center py-4 px-4 text-green-400">✓ Advanced</td>
                  <td className="text-center py-4 px-4 text-red-400">✗</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4 font-medium">Free Plan</td>
                  <td className="text-center py-4 px-4 text-camp-400">✓ 50 links</td>
                  <td className="text-center py-4 px-4 text-red-400">✗</td>
                  <td className="text-center py-4 px-4 text-yellow-400">10 links/mo</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold">Starting Price</td>
                  <td className="text-center py-4 px-4 text-camp-400 font-bold text-lg">$9/mo</td>
                  <td className="text-center py-4 px-4 text-midnight-300 font-bold text-lg">$50/mo</td>
                  <td className="text-center py-4 px-4 text-midnight-300 font-bold text-lg">$35/mo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            Which tool is right for you?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* CampKit */}
            <div className="p-6 rounded-2xl bg-camp-500/5 border border-camp-500/20">
              <h3 className="font-display text-xl font-bold text-camp-400 mb-4">Choose CampKit if you...</h3>
              <ul className="space-y-3 text-sm text-midnight-300">
                <li className="flex items-start gap-2">
                  <span className="text-camp-400 mt-0.5">✓</span>
                  <span>Want an affordable all-in-one solution</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-camp-400 mt-0.5">✓</span>
                  <span>Need UTM links + short links + analytics together</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-camp-400 mt-0.5">✓</span>
                  <span>Are a small to medium marketing team</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-camp-400 mt-0.5">✓</span>
                  <span>Want custom domains without enterprise pricing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-camp-400 mt-0.5">✓</span>
                  <span>Prefer a clean, modern interface</span>
                </li>
              </ul>
              <Link 
                href="/signup" 
                className="block w-full mt-6 py-3 text-center bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-colors"
              >
                Try CampKit Free →
              </Link>
            </div>

            {/* UTM.io */}
            <div className="p-6 rounded-2xl bg-midnight-800/30 border border-midnight-700/50">
              <h3 className="font-display text-xl font-bold text-purple-400 mb-4">Choose UTM.io if you...</h3>
              <ul className="space-y-3 text-sm text-midnight-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-0.5">✓</span>
                  <span>Need advanced UTM governance & rules</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-0.5">✓</span>
                  <span>Are an enterprise with strict naming conventions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-0.5">✓</span>
                  <span>Have budget for premium tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-0.5">✓</span>
                  <span>Don't need built-in link shortening</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-0.5">✓</span>
                  <span>Need Adobe/Salesforce integrations</span>
                </li>
              </ul>
              <a 
                href="https://utm.io" 
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mt-6 py-3 text-center border border-midnight-600 hover:border-midnight-500 rounded-lg transition-colors text-midnight-300"
              >
                Visit UTM.io →
              </a>
            </div>

            {/* Bitly */}
            <div className="p-6 rounded-2xl bg-midnight-800/30 border border-midnight-700/50">
              <h3 className="font-display text-xl font-bold text-orange-400 mb-4">Choose Bitly if you...</h3>
              <ul className="space-y-3 text-sm text-midnight-300">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-0.5">✓</span>
                  <span>Primarily need link shortening</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-0.5">✓</span>
                  <span>Want QR codes for marketing materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-0.5">✓</span>
                  <span>UTM tracking is secondary to short links</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-0.5">✓</span>
                  <span>Need the brand recognition of bit.ly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-0.5">✓</span>
                  <span>Have budget for premium features</span>
                </li>
              </ul>
              <a 
                href="https://bitly.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mt-6 py-3 text-center border border-midnight-600 hover:border-midnight-500 rounded-lg transition-colors text-midnight-300"
              >
                Visit Bitly →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-16 px-6 bg-midnight-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-4">
            Pricing Comparison
          </h2>
          <p className="text-midnight-400 text-center mb-12">
            Annual cost for a 5-person marketing team
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-midnight-700">
                  <th className="text-left py-4 px-4">Plan Type</th>
                  <th className="text-center py-4 px-4 text-camp-400">CampKit</th>
                  <th className="text-center py-4 px-4 text-midnight-400">UTM.io</th>
                  <th className="text-center py-4 px-4 text-midnight-400">Bitly</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4">Individual/Freelancer</td>
                  <td className="text-center py-4 px-4 text-camp-400 font-semibold">$108/yr</td>
                  <td className="text-center py-4 px-4">$600/yr</td>
                  <td className="text-center py-4 px-4">$420/yr</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-4 px-4">Small Team (5 users)</td>
                  <td className="text-center py-4 px-4 text-camp-400 font-semibold">$348/yr</td>
                  <td className="text-center py-4 px-4">$1,800/yr</td>
                  <td className="text-center py-4 px-4">$2,388/yr</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold">You Save with CampKit</td>
                  <td className="text-center py-4 px-4 text-camp-400">—</td>
                  <td className="text-center py-4 px-4 text-camp-400 font-bold">$1,452/yr</td>
                  <td className="text-center py-4 px-4 text-camp-400 font-bold">$2,040/yr</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-midnight-500 text-sm text-center mt-6">
            * Prices based on published rates as of 2024. Team plans compared at equivalent feature levels.
          </p>
        </div>
      </section>

      {/* Migration CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Switching is easy
          </h2>
          <p className="text-midnight-400 mb-8">
            Export your links from your current tool and import them into CampKit. 
            Most teams are up and running in under 10 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/signup" 
              className="px-8 py-4 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-camp-500/25"
            >
              Start Free — No Credit Card →
            </Link>
          </div>
          <p className="text-midnight-500 text-sm mt-4">
            Free forever plan includes 50 UTM links
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-midnight-800/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-midnight-800/50 border border-midnight-700/50">
              <h3 className="font-semibold mb-2">Can I import my links from UTM.io or Bitly?</h3>
              <p className="text-midnight-400 text-sm">Yes! Export your links as CSV from your current tool, and you can import them into CampKit. Your UTM parameters and data will be preserved.</p>
            </div>

            <div className="p-6 rounded-xl bg-midnight-800/50 border border-midnight-700/50">
              <h3 className="font-semibold mb-2">Does CampKit have the same features as UTM.io?</h3>
              <p className="text-midnight-400 text-sm">CampKit covers the core features most teams need: UTM building, templates, short links, and analytics. UTM.io has more enterprise governance features, but at 5x the price. Most small-to-medium teams find CampKit has everything they need.</p>
            </div>

            <div className="p-6 rounded-xl bg-midnight-800/50 border border-midnight-700/50">
              <h3 className="font-semibold mb-2">Why is CampKit so much cheaper?</h3>
              <p className="text-midnight-400 text-sm">We're a lean team focused on building exactly what marketers need, without enterprise bloat. No VC pressure to maximize revenue, just fair pricing for a useful tool.</p>
            </div>

            <div className="p-6 rounded-xl bg-midnight-800/50 border border-midnight-700/50">
              <h3 className="font-semibold mb-2">Is there really a free plan?</h3>
              <p className="text-midnight-400 text-sm">Yes! Our free plan includes 50 UTM links with short links and basic analytics. No credit card required, no time limit. Perfect for trying CampKit or for personal projects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Ready to save money on UTM management?
          </h2>
          <p className="text-midnight-400 text-lg mb-8">
            Join 500+ marketing teams who switched to CampKit.
          </p>
          <Link 
            href="/signup" 
            className="inline-flex px-8 py-4 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-bold text-lg rounded-xl transition-all hover:scale-105 shadow-lg shadow-camp-500/25"
          >
            Try CampKit Free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-midnight-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center">
                <span className="text-midnight-900 font-bold">C</span>
              </div>
              <span className="font-display font-semibold">CampKit</span>
            </Link>
            <div className="flex items-center gap-6 text-sm text-midnight-400">
              <Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/login" className="hover:text-white transition-colors">Login</Link>
              <a href="mailto:support@getcampkit.com" className="hover:text-white transition-colors">Support</a>
            </div>
            <p className="text-midnight-500 text-sm">
              © 2024 CampKit
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
