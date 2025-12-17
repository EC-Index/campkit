'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [annual, setAnnual] = useState(true)
  
  const prices = {
    pro: annual ? 7 : 9,
    team: annual ? 23 : 29,
    business: annual ? 63 : 79
  }

  return (
    <div className="min-h-screen bg-midnight-900 text-white">
      {/* Minimal Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-midnight-900/90 backdrop-blur-xl border-b border-midnight-800/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="CampKit"
              width={180} height={45} className="h-36 w-auto"
            />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-midnight-400 hover:text-white text-sm hidden sm:block">Login</Link>
            <Link 
              href="/signup" 
              className="px-5 py-2.5 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-all hover:scale-105"
            >
              Start Free →
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-camp-500/10 border border-camp-500/20 rounded-full mb-8">
            <span className="text-yellow-400">★★★★★</span>
            <span className="text-camp-400 text-sm font-medium">4.9/5 from 127 reviews</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Stop Spreadsheet Chaos.<br />
            <span className="text-camp-400">Track UTM Campaigns That Convert.</span>
          </h1>
          
          <p className="text-xl text-midnight-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Build UTM links in seconds, get branded short URLs, and see exactly which campaigns drive results. 
            <span className="text-white font-medium"> Save hours every week.</span>
          </p>

          <Link 
            href="/signup" 
            className="inline-flex px-8 py-4 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-bold text-lg rounded-xl transition-all hover:scale-105 shadow-lg shadow-camp-500/25 mb-4"
          >
            Start Free — No Credit Card
          </Link>
          
          <p className="text-midnight-500 text-sm">
            <a href="#how-it-works" className="text-midnight-400 hover:text-white underline underline-offset-4">See how it works</a> • Setup in 30 seconds
          </p>
        </div>
      </section>

      {/* Product Screenshot */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-midnight-700 shadow-2xl shadow-black/50">
            <Image
              src="/dashboard-screenshot.png"
              alt="CampKit Dashboard - Build UTM links, create short URLs, track clicks"
              width={1920}
              height={1080}
              className="w-full"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/20 to-transparent pointer-events-none" />
          </div>
          <p className="text-center text-midnight-500 text-sm mt-4">
            UTM Builder → Short Links → Real-Time Analytics — all in one place
          </p>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-12 px-6 bg-midnight-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-midnight-300 text-lg">
            Built for <span className="text-white font-semibold">small marketing teams</span> who need 
            fast UTM governance <span className="text-camp-400">without expensive enterprise tools</span>
          </p>
        </div>
      </section>

      {/* Pain → Outcome Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold mb-4">
              From messy spreadsheets to consistent tracking
            </h2>
            <p className="text-midnight-400 max-w-2xl mx-auto">
              Know exactly which campaigns move the needle. No more guessing, no more naming chaos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
              <h3 className="font-semibold text-red-400 mb-4 flex items-center gap-2">
                <span>😫</span> Without CampKit
              </h3>
              <ul className="space-y-3 text-sm text-midnight-300">
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span><span>Scattered UTM links across 10+ spreadsheets</span></li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span><span>Inconsistent naming: "facebook" vs "Facebook" vs "fb"</span></li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span><span>No idea which campaigns actually drive conversions</span></li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span><span>Hours wasted searching for old links</span></li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-camp-500/5 border border-camp-500/20">
              <h3 className="font-semibold text-camp-400 mb-4 flex items-center gap-2">
                <span>🎯</span> With CampKit
              </h3>
              <ul className="space-y-3 text-sm text-midnight-300">
                <li className="flex items-start gap-2"><span className="text-camp-400">✓</span><span>All UTM links in one organized dashboard</span></li>
                <li className="flex items-start gap-2"><span className="text-camp-400">✓</span><span>Templates enforce consistent naming conventions</span></li>
                <li className="flex items-start gap-2"><span className="text-camp-400">✓</span><span>Real-time analytics show what's working</span></li>
                <li className="flex items-start gap-2"><span className="text-camp-400">✓</span><span>Find any link in seconds with search</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-midnight-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            Get started in 30 seconds
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-camp-500 text-midnight-900 font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">1</div>
              <h3 className="font-semibold mb-2">Paste your URL</h3>
              <p className="text-midnight-400 text-sm">Enter any destination page you want to track</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-camp-500 text-midnight-900 font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">2</div>
              <h3 className="font-semibold mb-2">Add UTM parameters</h3>
              <p className="text-midnight-400 text-sm">Use templates or type source, medium, campaign</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-camp-500 text-midnight-900 font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">3</div>
              <h3 className="font-semibold mb-2">Copy & track</h3>
              <p className="text-midnight-400 text-sm">Get your short link, watch clicks roll in</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/signup" className="inline-flex px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-all hover:scale-105">
              Try It Free →
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-4">
            Everything you need. Nothing you don't.
          </h2>
          <p className="text-midnight-400 text-center mb-12 max-w-2xl mx-auto">
            No bloated enterprise features. Just the tools that actually help you track campaigns.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-midnight-800/30 border border-midnight-700/50">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔗</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">UTM Builder</h3>
              <p className="text-midnight-400 text-sm">Build consistent UTM links with reusable templates. No more typos or naming chaos.</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-midnight-800/30 border border-midnight-700/50">
              <div className="w-16 h-16 bg-camp-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Short Links</h3>
              <p className="text-midnight-400 text-sm">Auto-generate branded short links. Use your own custom domain for professional URLs.</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-midnight-800/30 border border-midnight-700/50">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Click Analytics</h3>
              <p className="text-midnight-400 text-sm">See who clicks, from where, and when. Device, location, and referrer data included.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-6 bg-midnight-800/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-2">Trusted by marketing teams</h2>
            <p className="text-midnight-400">Join 500+ marketers who ditched spreadsheet chaos</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-midnight-800/50 border border-midnight-700/50">
              <div className="flex items-center gap-1 mb-4"><span className="text-yellow-400 text-sm">★★★★★</span></div>
              <p className="text-midnight-300 mb-4 text-sm leading-relaxed">"Finally ditched our messy UTM spreadsheet. <span className="text-white">CampKit saved us 3 hours every week</span> — exactly what we needed."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">MS</div>
                <div><p className="font-medium text-sm">Maria Schmidt</p><p className="text-midnight-500 text-xs">Marketing Manager, SaaS Startup</p></div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-midnight-800/50 border border-midnight-700/50">
              <div className="flex items-center gap-1 mb-4"><span className="text-yellow-400 text-sm">★★★★★</span></div>
              <p className="text-midnight-300 mb-4 text-sm leading-relaxed">"We switched from UTM.io and <span className="text-white">saved over €200/month</span>. The analytics are great and the UI is so much cleaner."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">JK</div>
                <div><p className="font-medium text-sm">Jonas Krüger</p><p className="text-midnight-500 text-xs">Owner, Digital Agency</p></div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-midnight-800/50 border border-midnight-700/50">
              <div className="flex items-center gap-1 mb-4"><span className="text-yellow-400 text-sm">★★★★★</span></div>
              <p className="text-midnight-300 mb-4 text-sm leading-relaxed">"The team templates are a game-changer. <span className="text-white">No more 'facebook' vs 'Facebook' chaos</span> — everyone's consistent now."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-camp-500 rounded-full flex items-center justify-center text-midnight-900 font-semibold text-sm">LT</div>
                <div><p className="font-medium text-sm">Laura Torres</p><p className="text-midnight-500 text-xs">Growth Lead, E-Commerce</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION - IMPROVED */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Headline */}
          <div className="text-center mb-6">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Choose the right plan for your team
            </h2>
            <p className="text-midnight-400 max-w-2xl mx-auto">
              Start free, upgrade as you grow. All plans include UTM builder & short links. No hidden fees.
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mb-8 text-midnight-500 text-sm">
            <span className="flex items-center gap-1">🔒 Secure payments</span>
            <span className="flex items-center gap-1">↩️ Cancel anytime</span>
            <span className="flex items-center gap-1">💳 No credit card for free</span>
          </div>

          {/* Annual/Monthly Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm ${!annual ? 'text-white' : 'text-midnight-500'}`}>Monthly</span>
            <button 
              onClick={() => setAnnual(!annual)}
              className={`relative w-14 h-8 rounded-full transition-colors ${annual ? 'bg-camp-500' : 'bg-midnight-700'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${annual ? 'left-7' : 'left-1'}`} />
            </button>
            <span className={`text-sm ${annual ? 'text-white' : 'text-midnight-500'}`}>
              Annual <span className="text-camp-400 font-medium">(-20%)</span>
            </span>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            {/* FREE */}
            <div className="p-6 rounded-2xl bg-midnight-800/30 border border-midnight-700/50">
              <div className="mb-4">
                <span className="text-2xl">🆓</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-1">Free</h3>
              <p className="text-midnight-500 text-sm mb-4">Basic Link Shortening</p>
              <div className="mb-6">
                <span className="font-display text-4xl font-bold">€0</span>
                <span className="text-midnight-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> 50 UTM links</li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> Short links (getcampkit.com)</li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> Basic click analytics</li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> CSV export</li>
                <li className="flex items-center gap-2 text-midnight-600"><span>—</span> No custom domains</li>
              </ul>
              <Link href="/signup" className="block w-full py-3 text-center border border-midnight-600 rounded-lg hover:border-midnight-500 transition-colors font-medium">
                Start Free
              </Link>
            </div>

            {/* PRO - HIGHLIGHTED */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-camp-500/20 to-camp-500/5 border-2 border-camp-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-camp-500 text-midnight-900 text-xs font-bold rounded-full">
                MOST POPULAR
              </div>
              <div className="mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-1">Pro</h3>
              <p className="text-midnight-500 text-sm mb-4">Custom Domains + Analytics</p>
              <div className="mb-6">
                <span className="font-display text-4xl font-bold">€{prices.pro}</span>
                <span className="text-midnight-500">/month</span>
                {annual && <span className="block text-camp-400 text-xs mt-1">Billed €{prices.pro * 12}/year</span>}
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> <strong className="text-white">Unlimited</strong> links</li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> <strong className="text-white">Custom domains</strong></li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> <strong className="text-white">Advanced analytics</strong></li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> UTM templates</li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> Priority support</li>
              </ul>
              <Link href="/signup?plan=pro" className="block w-full py-3 text-center bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-colors">
                Get Pro →
              </Link>
              <p className="text-midnight-500 text-xs text-center mt-2">7-day free trial</p>
            </div>

            {/* TEAM */}
            <div className="p-6 rounded-2xl bg-midnight-800/30 border border-midnight-700/50">
              <div className="mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-1">Team</h3>
              <p className="text-midnight-500 text-sm mb-4">Collaboration + Templates</p>
              <div className="mb-6">
                <span className="font-display text-4xl font-bold">€{prices.team}</span>
                <span className="text-midnight-500">/month</span>
                {annual && <span className="block text-camp-400 text-xs mt-1">Billed €{prices.team * 12}/year</span>}
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> Everything in Pro</li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> <strong className="text-white">5 team members</strong></li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> <strong className="text-white">Shared templates</strong></li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> <strong className="text-white">Bulk link builder</strong></li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> API access</li>
              </ul>
              <Link href="/signup?plan=team" className="block w-full py-3 text-center border border-midnight-600 rounded-lg hover:border-camp-500 hover:text-camp-400 transition-colors font-medium">
                Get Team →
              </Link>
            </div>

            {/* BUSINESS */}
            <div className="p-6 rounded-2xl bg-midnight-800/30 border border-midnight-700/50">
              <div className="mb-4">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-1">Business</h3>
              <p className="text-midnight-500 text-sm mb-4">Unlimited Teams + API</p>
              <div className="mb-6">
                <span className="font-display text-4xl font-bold">€{prices.business}</span>
                <span className="text-midnight-500">/month</span>
                {annual && <span className="block text-camp-400 text-xs mt-1">Billed €{prices.business * 12}/year</span>}
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> Everything in Team</li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> <strong className="text-white">Unlimited members</strong></li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> <strong className="text-white">Unlimited teams</strong></li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> Advanced API</li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> Dedicated support</li>
              </ul>
              <Link href="/signup?plan=business" className="block w-full py-3 text-center border border-midnight-600 rounded-lg hover:border-camp-500 hover:text-camp-400 transition-colors font-medium">
                Get Business →
              </Link>
            </div>
          </div>

          {/* Compare link */}
          <p className="text-center text-midnight-500 text-sm mt-8">
            <Link href="/compare" className="text-camp-400 hover:underline">Compare with UTM.io & Bitly →</Link>
            <span className="mx-2">•</span>
            All prices excl. VAT
          </p>

          {/* Mini FAQ under Pricing */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h3 className="font-display text-xl font-semibold text-center mb-8">Quick questions about pricing</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-midnight-800/30 border border-midnight-700/50">
                <h4 className="font-medium text-sm mb-1">Can I switch plans later?</h4>
                <p className="text-midnight-500 text-xs">Yes! Upgrade or downgrade anytime. Changes apply immediately.</p>
              </div>
              <div className="p-4 rounded-xl bg-midnight-800/30 border border-midnight-700/50">
                <h4 className="font-medium text-sm mb-1">What happens when I hit the free limit?</h4>
                <p className="text-midnight-500 text-xs">Your existing links keep working. You just can't create new ones until you upgrade.</p>
              </div>
              <div className="p-4 rounded-xl bg-midnight-800/30 border border-midnight-700/50">
                <h4 className="font-medium text-sm mb-1">Do prices include VAT?</h4>
                <p className="text-midnight-500 text-xs">Prices shown are excl. VAT. VAT will be added for EU customers at checkout.</p>
              </div>
              <div className="p-4 rounded-xl bg-midnight-800/30 border border-midnight-700/50">
                <h4 className="font-medium text-sm mb-1">How does the free trial work?</h4>
                <p className="text-midnight-500 text-xs">Pro & Team include 7-day trial. Full access, cancel anytime, no charges if you cancel.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Expanded */}
      <section className="py-20 px-6 bg-midnight-800/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            Frequently asked questions
          </h2>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-midnight-800/50 border border-midnight-700/50">
              <h3 className="font-semibold mb-2">Why do I need CampKit instead of Google Sheets?</h3>
              <p className="text-midnight-400 text-sm">Spreadsheets work for a few links, but they quickly become chaos: inconsistent naming, no analytics, no short links, hard to share. CampKit gives you a dedicated tool with templates, click tracking, and team collaboration built-in.</p>
            </div>

            <div className="p-6 rounded-xl bg-midnight-800/50 border border-midnight-700/50">
              <h3 className="font-semibold mb-2">How does the analytics/tracking work?</h3>
              <p className="text-midnight-400 text-sm">When someone clicks your short link, we track: timestamp, device type, browser, operating system, country, city, and referrer. All data is shown in real-time in your dashboard. We don't collect personal data from visitors.</p>
            </div>

            <div className="p-6 rounded-xl bg-midnight-800/50 border border-midnight-700/50">
              <h3 className="font-semibold mb-2">How is CampKit different from UTM.io or Bitly?</h3>
              <p className="text-midnight-400 text-sm">UTM.io costs €50+/month and focuses on enterprise governance. Bitly is primarily a link shortener. CampKit gives you the best of both: UTM builder + short links + analytics at €9/month. <a href="/compare" className="text-camp-400 hover:underline">See full comparison →</a></p>
            </div>

            <div className="p-6 rounded-xl bg-midnight-800/50 border border-midnight-700/50">
              <h3 className="font-semibold mb-2">Can I use my own domain for short links?</h3>
              <p className="text-midnight-400 text-sm">Yes! On Pro and higher plans, you can connect your own domain (like go.yourcompany.com). We provide simple DNS setup instructions — most users set it up in under 5 minutes.</p>
            </div>

            <div className="p-6 rounded-xl bg-midnight-800/50 border border-midnight-700/50">
              <h3 className="font-semibold mb-2">Is my data secure? What about GDPR?</h3>
              <p className="text-midnight-400 text-sm">Your data is stored securely on EU servers. We're fully GDPR-compliant and don't sell data to third parties. Click tracking only collects anonymous data — no personal information from link visitors.</p>
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
            Join 500+ marketing teams who stopped spreadsheet chaos.
          </p>
          <Link 
            href="/signup" 
            className="inline-flex px-8 py-4 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-bold text-lg rounded-xl transition-all hover:scale-105 shadow-lg shadow-camp-500/25"
          >
            Start Free — No Credit Card
          </Link>
          <p className="text-midnight-500 text-sm mt-4">
            Free forever plan • Setup in 30 seconds
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-midnight-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/">
              <Image
  src="/logo.png"
  alt="CampKit"
  width={200}
  height={50}
  className="h-14 w-auto"
/>
            </Link>
            <div className="flex items-center gap-6 text-sm text-midnight-400">
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              <Link href="/compare" className="hover:text-white transition-colors">Compare</Link>
              <Link href="/login" className="hover:text-white transition-colors">Login</Link>
              <a href="mailto:support@getcampkit.com" className="hover:text-white transition-colors">Support</a>
            </div>
            <p className="text-midnight-500 text-sm">
              © 2024 CampKit. Made in Germany 🇩🇪
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}







