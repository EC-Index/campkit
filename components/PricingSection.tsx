'use client'

import Link from 'next/link'
import { useCurrency } from './CurrencyContext'
import { CurrencyToggle } from './Price'

export function PricingSection() {
  const { symbol } = useCurrency()

  return (
    <section id="pricing" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-center mb-4">
          Simple, transparent pricing
        </h2>
        <p className="text-midnight-400 text-center mb-6">
          Start free, upgrade when you need more. Cancel anytime.
        </p>
        
        {/* Currency Toggle */}
        <div className="flex justify-center mb-12">
          <CurrencyToggle />
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Free */}
          <div className="p-8 rounded-2xl bg-midnight-800/30 border border-midnight-700/50">
            <h3 className="font-display text-xl font-semibold mb-1">Free</h3>
            <p className="text-midnight-500 text-sm mb-4">For individuals getting started</p>
            <div className="mb-6">
              <span className="font-display text-4xl font-bold">{symbol}0</span>
              <span className="text-midnight-500">/month</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> 50 UTM links</li>
              <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> Short links included</li>
              <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> Basic click analytics</li>
              <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> CSV export</li>
            </ul>
            <Link href="/signup" className="block w-full py-3 text-center border border-midnight-600 rounded-lg hover:border-midnight-500 transition-colors">
              Get Started Free
            </Link>
          </div>

          {/* Pro */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-camp-500/10 to-transparent border-2 border-camp-500/50 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-camp-500 text-midnight-900 text-xs font-bold rounded-full">
              MOST POPULAR
            </div>
            <h3 className="font-display text-xl font-semibold mb-1">Pro</h3>
            <p className="text-midnight-500 text-sm mb-4">For marketers & freelancers</p>
            <div className="mb-6">
              <span className="font-display text-4xl font-bold">{symbol}9</span>
              <span className="text-midnight-500">/month</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> <strong className="text-white">Unlimited</strong> links</li>
              <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> <strong className="text-white">Custom domains</strong></li>
              <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> <strong className="text-white">Advanced analytics</strong></li>
              <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> UTM templates</li>
            </ul>
            <Link href="/signup" className="block w-full py-3 text-center bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-colors">
              Start Free Trial
            </Link>
          </div>

          {/* Team */}
          <div className="p-8 rounded-2xl bg-midnight-800/30 border border-midnight-700/50">
            <h3 className="font-display text-xl font-semibold mb-1">Team</h3>
            <p className="text-midnight-500 text-sm mb-4">For growing teams</p>
            <div className="mb-6">
              <span className="font-display text-4xl font-bold">{symbol}29</span>
              <span className="text-midnight-500">/month</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> Everything in Pro</li>
              <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> <strong className="text-white">Team workspaces</strong></li>
              <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> <strong className="text-white">Shared templates</strong></li>
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
  )
}
