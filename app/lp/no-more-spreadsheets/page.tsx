import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stop Using Spreadsheets for UTM Tracking | CampKit',
  description: 'Ditch your UTM spreadsheet. CampKit gives you a proper UTM builder with templates, short links, and analytics. Start free.',
  robots: 'noindex', // Landing page, don't index
}

export default function NoMoreSpreadsheetsPage() {
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

      {/* Hero */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
            <span className="text-red-400 text-sm font-medium">📊 Using a UTM spreadsheet?</span>
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Your UTM Spreadsheet<br/>
            <span className="text-camp-400">Deserves to Retire</span>
          </h1>
          
          <p className="text-xl text-midnight-300 mb-10 max-w-2xl mx-auto">
            You know the one. 47 tabs, 3 versions, and someone just typed "FaceBook" as a source again. 
            <strong className="text-white"> There's a better way.</strong>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="/signup" className="px-8 py-4 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-bold text-lg rounded-xl transition-all hover:scale-105 shadow-lg shadow-camp-500/25">
              Replace Your Spreadsheet — Free
            </Link>
          </div>
          <p className="text-midnight-500 text-sm">No credit card • 50 links free • Setup in 2 minutes</p>
        </div>
      </section>

      {/* The Spreadsheet Problem */}
      <section className="py-16 px-6 bg-midnight-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-4">
            The UTM Spreadsheet Problem
          </h2>
          <p className="text-midnight-400 text-center mb-12">
            Every marketing team creates one. Every marketing team eventually hates it.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Spreadsheet Mockup */}
            <div className="p-4 bg-midnight-800 rounded-xl border border-midnight-700">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-midnight-700">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-midnight-500 text-xs ml-2">UTM_Master_Sheet_FINAL_v3.xlsx</span>
              </div>
              <div className="font-mono text-xs space-y-2 text-midnight-400">
                <div className="flex gap-4 pb-2 border-b border-midnight-800 text-midnight-500">
                  <span className="w-24">Source</span>
                  <span className="w-24">Medium</span>
                  <span className="w-32">Campaign</span>
                </div>
                <div className="flex gap-4"><span className="w-24">google</span><span className="w-24">cpc</span><span className="w-32">spring_sale</span></div>
                <div className="flex gap-4"><span className="w-24 text-red-400">Google</span><span className="w-24">cpc</span><span className="w-32">spring-sale</span></div>
                <div className="flex gap-4"><span className="w-24 text-red-400">GOOGLE</span><span className="w-24 text-red-400">ppc</span><span className="w-32">SpringSale</span></div>
                <div className="flex gap-4"><span className="w-24">facebook</span><span className="w-24">social</span><span className="w-32">spring_sale</span></div>
                <div className="flex gap-4"><span className="w-24 text-red-400">Facebook</span><span className="w-24 text-red-400">paid_social</span><span className="w-32">spring_sale</span></div>
                <div className="flex gap-4"><span className="w-24 text-red-400">fb</span><span className="w-24">social</span><span className="w-32 text-red-400">spring sale</span></div>
              </div>
              <p className="text-red-400 text-xs mt-4 pt-3 border-t border-midnight-800">⚠️ 6 variations of essentially the same campaign</p>
            </div>

            {/* Problems List */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                <p className="font-medium text-red-400 mb-1">Version control chaos</p>
                <p className="text-midnight-400 text-sm">Is this the latest version? Did marketing update it? Why are there 3 copies?</p>
              </div>
              <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                <p className="font-medium text-red-400 mb-1">Inconsistent naming</p>
                <p className="text-midnight-400 text-sm">"google" vs "Google" vs "GOOGLE" — your analytics are fragmented.</p>
              </div>
              <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                <p className="font-medium text-red-400 mb-1">No connection to performance</p>
                <p className="text-midnight-400 text-sm">Links live in the sheet, clicks live in Bitly. Good luck matching them.</p>
              </div>
              <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                <p className="font-medium text-red-400 mb-1">Manual copy-paste errors</p>
                <p className="text-midnight-400 text-sm">One typo = broken campaign attribution. And you won't notice for weeks.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-4">
            CampKit: Your Spreadsheet's Replacement
          </h2>
          <p className="text-midnight-400 text-center mb-12 max-w-2xl mx-auto">
            A proper tool for UTM management. Templates, short links, and analytics in one place.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 rounded-xl bg-midnight-800/30 border border-midnight-700">
              <div className="w-12 h-12 bg-camp-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="font-semibold mb-2">Templates</h3>
              <p className="text-midnight-400 text-sm">"Google Ads" = source:google, medium:cpc. Always. No variations possible.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-midnight-800/30 border border-midnight-700">
              <div className="w-12 h-12 bg-camp-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="font-semibold mb-2">Auto Short Links</h3>
              <p className="text-midnight-400 text-sm">Every UTM link gets a short URL automatically. No Bitly needed.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-midnight-800/30 border border-midnight-700">
              <div className="w-12 h-12 bg-camp-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold mb-2">Built-in Analytics</h3>
              <p className="text-midnight-400 text-sm">Clicks, devices, locations — all in the same dashboard. No exports.</p>
            </div>
          </div>

          {/* Workflow Comparison */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20">
              <h3 className="font-semibold text-red-400 mb-4">❌ Old Workflow (Spreadsheet)</h3>
              <ol className="space-y-3 text-sm text-midnight-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">1.</span>
                  <span>Open spreadsheet, find correct tab</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">2.</span>
                  <span>Look up naming conventions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">3.</span>
                  <span>Type UTM parameters manually</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">4.</span>
                  <span>Copy to Bitly for short link</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">5.</span>
                  <span>Paste short link back to spreadsheet</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">6.</span>
                  <span>Hope nobody messes it up</span>
                </li>
              </ol>
              <p className="text-midnight-500 text-xs mt-4">⏱️ ~5 minutes per link</p>
            </div>
            
            <div className="p-6 rounded-xl bg-camp-500/5 border border-camp-500/20">
              <h3 className="font-semibold text-camp-400 mb-4">✓ New Workflow (CampKit)</h3>
              <ol className="space-y-3 text-sm text-midnight-300">
                <li className="flex items-start gap-2">
                  <span className="text-camp-400">1.</span>
                  <span>Paste destination URL</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-camp-400">2.</span>
                  <span>Select template (e.g., "Google Ads")</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-camp-400">3.</span>
                  <span>Add campaign name</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-camp-400">4.</span>
                  <span>Click "Create" — done!</span>
                </li>
              </ol>
              <p className="text-camp-400 text-xs mt-4">⏱️ ~30 seconds per link</p>
            </div>
          </div>
        </div>
      </section>

      {/* Time Savings Calculator */}
      <section className="py-16 px-6 bg-midnight-800/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold mb-8">
            Time You'll Save
          </h2>
          
          <div className="p-8 rounded-2xl bg-midnight-800/50 border border-midnight-700">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="font-display text-4xl font-bold text-camp-400">4.5 min</p>
                <p className="text-midnight-500 text-sm">saved per link</p>
              </div>
              <div>
                <p className="font-display text-4xl font-bold text-camp-400">3+ hours</p>
                <p className="text-midnight-500 text-sm">saved per month*</p>
              </div>
              <div>
                <p className="font-display text-4xl font-bold text-camp-400">€0</p>
                <p className="text-midnight-500 text-sm">errors from typos</p>
              </div>
            </div>
            <p className="text-midnight-600 text-xs mt-6">*Based on 50 links/month. Most teams create more.</p>
          </div>
        </div>
      </section>

      {/* Migration Path */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-4">
            Easy Migration
          </h2>
          <p className="text-midnight-400 text-center mb-12">
            You don't have to migrate everything at once. Here's a simple path:
          </p>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 p-6 rounded-xl bg-midnight-800/30 border border-midnight-700">
              <div className="w-10 h-10 bg-camp-500 text-midnight-900 rounded-full flex items-center justify-center font-bold mb-4">1</div>
              <h3 className="font-semibold mb-2">Week 1: Create Templates</h3>
              <p className="text-midnight-400 text-sm">Set up 5-10 templates for your most common link types (Google Ads, Facebook, Newsletter, etc.)</p>
            </div>
            <div className="flex-1 p-6 rounded-xl bg-midnight-800/30 border border-midnight-700">
              <div className="w-10 h-10 bg-camp-500 text-midnight-900 rounded-full flex items-center justify-center font-bold mb-4">2</div>
              <h3 className="font-semibold mb-2">Week 2: New Links Only</h3>
              <p className="text-midnight-400 text-sm">Create all new links in CampKit. Keep the spreadsheet as read-only reference.</p>
            </div>
            <div className="flex-1 p-6 rounded-xl bg-midnight-800/30 border border-midnight-700">
              <div className="w-10 h-10 bg-camp-500 text-midnight-900 rounded-full flex items-center justify-center font-bold mb-4">3</div>
              <h3 className="font-semibold mb-2">Week 3+: Archive Sheet</h3>
              <p className="text-midnight-400 text-sm">Once confident, archive the spreadsheet. You won't miss it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-6 bg-midnight-800/30">
        <div className="max-w-3xl mx-auto">
          <div className="p-8 rounded-2xl bg-midnight-800/50 border border-midnight-700 text-center">
            <div className="flex justify-center gap-1 mb-4">
              <span className="text-yellow-400">★★★★★</span>
            </div>
            <p className="text-xl text-midnight-300 mb-6 leading-relaxed">
              "Finally ditched our messy UTM spreadsheet. <span className="text-white font-medium">CampKit saved us 3 hours every week</span> — 
              and our analytics are finally consistent."
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">MS</div>
              <div className="text-left">
                <p className="font-medium text-sm">Maria Schmidt</p>
                <p className="text-midnight-500 text-xs">Marketing Manager, SaaS Startup</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Cheaper than your team's time
          </h2>
          <p className="text-midnight-400 mb-8">
            If your team spends 3 hours/month on UTM spreadsheets, that's €150+ in wasted salary. CampKit costs €9.
          </p>
          
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-b from-camp-500/10 to-transparent border border-camp-500/30">
            <p className="text-camp-400 text-sm font-medium mb-2">CampKit Pro</p>
            <p className="font-display text-5xl font-bold mb-2">€9<span className="text-xl text-midnight-400">/month</span></p>
            <ul className="text-sm text-midnight-300 space-y-2 mb-6">
              <li>✓ Unlimited UTM links</li>
              <li>✓ Templates for consistency</li>
              <li>✓ Custom domains</li>
              <li>✓ Full click analytics</li>
            </ul>
            <Link href="/signup" className="inline-block w-full px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-all">
              Start Free →
            </Link>
            <p className="text-midnight-500 text-xs mt-3">Free plan: 50 links forever</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-midnight-800/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Your spreadsheet can finally rest
          </h2>
          <p className="text-midnight-400 text-lg mb-8">
            Start free. Create your first template in 2 minutes. Never copy-paste UTMs again.
          </p>
          <Link href="/signup" className="inline-flex px-8 py-4 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-bold text-lg rounded-xl transition-all hover:scale-105 shadow-lg shadow-camp-500/25">
            Replace Your Spreadsheet — Free
          </Link>
        </div>
      </section>

      {/* Footer */}
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
