'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { Footer } from '@/components/Footer'
import { CheckoutButton } from '@/components/CheckoutButton'

export default function Home() {
  const { data: session } = useSession()
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-midnight-900/80 backdrop-blur-xl border-b border-midnight-700/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center"><span className="text-midnight-900 font-bold text-sm">C</span></div>
            <span className="font-display font-semibold text-lg">CampKit</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-midnight-300">
            <Link href="/#how-it-works" className="hover:text-white">How it works</Link>
            <Link href="/#pricing" className="hover:text-white">Pricing</Link>
            <Link href="/faq" className="hover:text-white">FAQ</Link>
            <Link href="/vs-utmio" className="hover:text-white">vs UTM.io</Link>
          </div>
          <div className="flex items-center gap-4">
            {session ? <Link href="/dashboard" className="btn-primary">Dashboard</Link> : (
              <><Link href="/login" className="text-midnight-300 hover:text-white">Login</Link><Link href="/signup" className="btn-primary">Get Started Free</Link></>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-camp-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-midnight-800 rounded-full border border-midnight-700 mb-8">
            <span className="text-camp-400">★★★★★</span><span className="text-sm text-midnight-300">Rated 4.9/5 by marketers</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
            The <span className="gradient-text">affordable UTM.io alternative</span> for marketing teams
          </h1>
          <p className="text-xl text-midnight-300 max-w-2xl mx-auto mb-10">
            CampKit is a UTM link manager that helps you create, organize, and track campaign links in one place. Save up to 50% compared to UTM.io.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="px-8 py-4 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-xl transition-all">Get Started Free →</Link>
            <Link href="/#how-it-works" className="px-8 py-4 border border-midnight-600 text-midnight-200 rounded-xl hover:border-midnight-500 transition-all">See how it works</Link>
          </div>
          <p className="mt-4 text-sm text-midnight-500">Free forever plan • No credit card required • Setup in 2 minutes</p>
        </div>
      </section>

      {/* Dashboard Screenshot */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="gradient-border p-2 rounded-2xl">
            <Image 
              src="/screenshots/dashboard.png" 
              alt="CampKit Dashboard - UTM Link Manager" 
              width={1200} 
              height={600}
              className="rounded-xl w-full"
              priority
            />
          </div>
        </div>
      </section>

      {/* What is CampKit - AI Summary */}
      <section className="py-16 px-6 bg-midnight-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold mb-4">What is CampKit?</h2>
          <p className="text-midnight-300 text-lg leading-relaxed">
            <strong className="text-white">CampKit is a UTM link management tool</strong> for marketing teams and agencies. 
            It helps you build UTM parameters, create short tracking links, and analyze campaign performance. 
            CampKit is designed as an <strong className="text-white">affordable alternative to UTM.io</strong>, with 
            a free tier and paid plans starting at <strong className="text-white">$9/month</strong> (compared to UTM.io's $19/month).
          </p>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 px-6 border-t border-midnight-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">How CampKit works</h2>
            <p className="text-midnight-400">From messy spreadsheets to organized campaigns in 3 steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-camp-500 text-midnight-900 font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">1</div>
              <h3 className="font-display font-semibold text-xl mb-3">Create UTM Links</h3>
              <p className="text-midnight-400 text-sm mb-4">Use our builder to add UTM parameters. Save templates for campaigns you run often.</p>
              <div className="gradient-border p-2 rounded-xl">
                <Image 
                  src="/screenshots/builder.png" 
                  alt="CampKit UTM Builder" 
                  width={400} 
                  height={250}
                  className="rounded-lg w-full"
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-camp-500 text-midnight-900 font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">2</div>
              <h3 className="font-display font-semibold text-xl mb-3">Share Short Links</h3>
              <p className="text-midnight-400 text-sm mb-4">Get clean, branded short links. Copy with one click and share anywhere.</p>
              <div className="gradient-border p-6 rounded-xl">
                <div className="bg-midnight-800 rounded-lg p-4 font-mono text-sm">
                  <span className="text-midnight-500">Long URL:</span><br/>
                  <span className="text-midnight-400 text-xs break-all">https://example.com?utm_source=google&utm_medium=cpc&utm_campaign=spring</span>
                  <div className="my-3 text-2xl">↓</div>
                  <span className="text-midnight-500">Short URL:</span><br/>
                  <span className="text-camp-400">getcampkit.com/r/xK9mL2</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-camp-500 text-midnight-900 font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">3</div>
              <h3 className="font-display font-semibold text-xl mb-3">Track Clicks</h3>
              <p className="text-midnight-400 text-sm mb-4">See real-time analytics. Know which campaigns drive traffic.</p>
              <div className="gradient-border p-2 rounded-xl">
                <Image 
                  src="/screenshots/analytics.png" 
                  alt="CampKit Analytics" 
                  width={400} 
                  height={250}
                  className="rounded-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-midnight-800/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12">Sound familiar?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {e:'📊', t:'Spreadsheet chaos', d:'Your UTM links live in a Google Sheet that nobody maintains. Half the links are broken or duplicated.'},
              {e:'💸', t:'Tools are too expensive', d:'UTM.io charges $19-159/month. That\'s a lot for link management when you\'re a small team.'},
              {e:'🔍', t:'No campaign visibility', d:'Which campaign drove that traffic spike? Good luck finding out in Google Analytics.'}
            ].map((i,x)=>(
              <div key={x} className="gradient-border p-6">
                <div className="text-4xl mb-4">{i.e}</div>
                <h3 className="font-display font-semibold text-lg mb-2">{i.t}</h3>
                <p className="text-midnight-400 text-sm">{i.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 border-t border-midnight-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Everything you need to manage UTM links</h2>
            <p className="text-midnight-400">No bloat. No complexity. Just the features marketers actually use.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {i:'⚡', t:'UTM Link Builder', d:'Create UTM links in seconds with autocomplete, templates, and saved presets for your campaigns.'},
              {i:'🔗', t:'Link Shortener', d:'Turn long UTM URLs into clean, branded short links. Use your own domain on Pro plans.'},
              {i:'📈', t:'Click Analytics', d:'Track clicks in real-time. See referrers, devices, and which campaigns perform best.'},
              {i:'👥', t:'Team Workspaces', d:'Collaborate with your team. Share link libraries and UTM templates across projects.'},
              {i:'📋', t:'Bulk Import & Export', d:'Moving from spreadsheets? Import existing links via CSV. Export anytime.'},
              {i:'🔌', t:'API Access', d:'Automate link creation and integrate CampKit with your existing marketing stack.'}
            ].map((f,x)=>(
              <div key={x} className="flex gap-4 p-6 rounded-2xl hover:bg-midnight-800/50 transition-colors">
                <div className="text-3xl">{f.i}</div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-1">{f.t}</h3>
                  <p className="text-midnight-400 text-sm">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 bg-midnight-800/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Who uses CampKit?</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {icon: '🎯', title: 'Marketing Teams', desc: 'Track campaign performance across channels'},
              {icon: '📱', title: 'Social Media Managers', desc: 'Organize links for different platforms'},
              {icon: '✉️', title: 'Email Marketers', desc: 'Track newsletter and email campaign clicks'},
              {icon: '🏢', title: 'Agencies', desc: 'Manage UTM links for multiple clients'}
            ].map((u, i) => (
              <div key={i} className="text-center p-6">
                <div className="text-4xl mb-3">{u.icon}</div>
                <h3 className="font-display font-semibold mb-1">{u.title}</h3>
                <p className="text-midnight-400 text-sm">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 px-6 border-t border-midnight-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">CampKit vs UTM.io</h2>
            <p className="text-midnight-400">Same features, better price</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-midnight-700">
                  <th className="py-4 px-4 text-left font-semibold">Feature</th>
                  <th className="py-4 px-4 text-center font-semibold text-camp-400">CampKit</th>
                  <th className="py-4 px-4 text-center font-semibold text-midnight-400">UTM.io</th>
                </tr>
              </thead>
              <tbody className="text-midnight-300">
                {[
                  ['UTM Builder', '✓', '✓'],
                  ['Link Shortener', '✓', '✓'],
                  ['Click Analytics', '✓', '✓'],
                  ['Team Workspaces', '✓', '✓'],
                  ['API Access', '✓', '✓'],
                  ['Free Tier', '50 links', 'Limited'],
                  ['Pro Plan', '$9/mo', '$19/mo'],
                  ['Team Plan', '$29/mo', '$69/mo'],
                ].map(([feature, campkit, utmio], i) => (
                  <tr key={i} className="border-b border-midnight-800">
                    <td className="py-3 px-4">{feature}</td>
                    <td className="py-3 px-4 text-center text-camp-400">{campkit}</td>
                    <td className="py-3 px-4 text-center">{utmio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <Link href="/vs-utmio" className="text-camp-400 hover:text-camp-300">
              See full comparison →
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-midnight-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-midnight-400">Start free. Upgrade when you need more.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {/* Free */}
            <div className="gradient-border p-6">
              <div className="text-midnight-400 text-sm font-medium mb-2">FREE</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-display text-4xl font-bold">$0</span>
              </div>
              <p className="text-midnight-500 text-sm mb-6">Forever free</p>
              <Link href="/signup" className="block text-center py-3 border border-midnight-600 rounded-lg text-midnight-300 hover:border-midnight-500 hover:text-white transition-colors mb-6">
                Get Started
              </Link>
              <ul className="space-y-3 text-sm">
                {['50 UTM links', 'Basic click analytics', 'Link shortener', 'CSV export'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2"><span className="text-camp-400">✓</span>{f}</li>
                ))}
              </ul>
            </div>

            {/* Pro */}
            <div className="gradient-border p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-camp-500 text-midnight-900 text-xs font-semibold rounded-full">MOST POPULAR</div>
              <div className="text-camp-400 text-sm font-medium mb-2">PRO</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-display text-4xl font-bold">$9</span>
                <span className="text-midnight-500">/mo</span>
              </div>
              <p className="text-midnight-500 text-sm mb-6">For professionals</p>
              <CheckoutButton 
                plan="pro"
                className="block w-full text-center py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-all mb-6"
              >
                Get Pro →
              </CheckoutButton>
              <ul className="space-y-3 text-sm">
                {['Unlimited links', 'Advanced analytics', 'Custom domains', 'UTM templates', 'Priority support'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2"><span className="text-camp-400">✓</span>{f}</li>
                ))}
              </ul>
            </div>

            {/* Team */}
            <div className="gradient-border p-6">
              <div className="text-blue-400 text-sm font-medium mb-2">TEAM</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-display text-4xl font-bold">$29</span>
                <span className="text-midnight-500">/mo</span>
              </div>
              <p className="text-midnight-500 text-sm mb-6">For small teams</p>
              <CheckoutButton 
                plan="team"
                className="block w-full text-center py-3 border border-midnight-600 rounded-lg text-midnight-300 hover:border-midnight-500 hover:text-white transition-colors mb-6"
              >
                Get Team
              </CheckoutButton>
              <ul className="space-y-3 text-sm">
                {['Up to 5 team members', 'Team workspaces', 'Role permissions', 'Shared templates', 'Bulk link builder', 'API access'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2"><span className="text-camp-400">✓</span>{f}</li>
                ))}
              </ul>
            </div>

            {/* Business */}
            <div className="gradient-border p-6">
              <div className="text-purple-400 text-sm font-medium mb-2">BUSINESS</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-display text-4xl font-bold">$79</span>
                <span className="text-midnight-500">/mo</span>
              </div>
              <p className="text-midnight-500 text-sm mb-6">For agencies</p>
              <CheckoutButton 
                plan="business"
                className="block w-full text-center py-3 border border-midnight-600 rounded-lg text-midnight-300 hover:border-midnight-500 hover:text-white transition-colors mb-6"
              >
                Get Business
              </CheckoutButton>
              <ul className="space-y-3 text-sm">
                {['Unlimited members', 'Multiple workspaces', 'SSO / SAML', 'Dedicated support', 'Custom integrations', 'SLA guarantee'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2"><span className="text-camp-400">✓</span>{f}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-center text-midnight-500 text-sm mt-8">
            <strong className="text-white">Compare:</strong> UTM.io charges $19-159/month. CampKit saves you up to 50%.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 border-t border-midnight-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to organize your campaign links?</h2>
          <p className="text-midnight-400 mb-8">Join marketers who switched from spreadsheets and expensive tools.</p>
          <Link href="/signup" className="inline-block px-8 py-4 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-xl transition-all">
            Get Started Free →
          </Link>
          <p className="mt-4 text-sm text-midnight-500">No credit card required</p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
