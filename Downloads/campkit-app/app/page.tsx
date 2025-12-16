'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Home() {
  const { data: session } = useSession()

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-midnight-900/80 backdrop-blur-xl border-b border-midnight-700/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center">
              <span className="text-midnight-900 font-bold text-sm">C</span>
            </div>
            <span className="font-display font-semibold text-lg">CampKit</span>
          </div>
          <div className="flex items-center gap-4">
            {session ? (
              <Link href="/dashboard" className="btn-primary">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-midnight-300 hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-camp-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
            Stop losing track of your{' '}
            <span className="gradient-text">campaign links</span>
          </h1>
          
          <p className="text-xl text-midnight-300 max-w-2xl mx-auto mb-10">
            CampKit helps marketing teams create, organize, and track UTM links in one place. 
            No more spreadsheets. No more broken links.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="px-8 py-4 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-camp-500/25">
              Start Free →
            </Link>
            <Link href="/login" className="px-8 py-4 border border-midnight-600 hover:border-midnight-500 text-midnight-200 rounded-xl transition-colors">
              Login
            </Link>
          </div>
          
          <p className="mt-4 text-sm text-midnight-500">
            Free tier available. No credit card required.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-midnight-800/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Everything you need.{' '}
              <span className="text-midnight-400">Nothing you don't.</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: '⚡', title: 'Quick UTM Builder', description: 'Create UTM links in seconds with templates and autocomplete.' },
              { icon: '📈', title: 'Click Analytics', description: 'See which links get clicked. Understand your campaigns.' },
              { icon: '🔗', title: 'Short Links', description: 'Turn ugly UTM URLs into clean, trackable short links.' },
              { icon: '📋', title: 'Copy & Export', description: 'One-click copy. Export your links anytime.' },
            ].map((feature, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-2xl hover:bg-midnight-800/50 transition-colors">
                <div className="text-3xl">{feature.icon}</div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-1">{feature.title}</h3>
                  <p className="text-midnight-400 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Simple pricing</h2>
          <p className="text-midnight-400 mb-12">Start free. Upgrade when you need more.</p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="gradient-border p-8 text-left">
              <div className="text-midnight-400 text-sm font-medium mb-2">FREE</div>
              <div className="text-4xl font-display font-bold mb-4">$0</div>
              <ul className="space-y-2 text-sm text-midnight-300">
                <li>✓ 50 UTM links</li>
                <li>✓ Basic analytics</li>
                <li>✓ Link shortener</li>
              </ul>
            </div>
            <div className="gradient-border p-8 text-left relative">
              <div className="absolute -top-3 left-4 px-3 py-1 bg-camp-500 text-midnight-900 text-xs font-semibold rounded-full">PRO</div>
              <div className="text-camp-400 text-sm font-medium mb-2">PRO</div>
              <div className="text-4xl font-display font-bold mb-4">$9<span className="text-lg text-midnight-500">/mo</span></div>
              <ul className="space-y-2 text-sm text-midnight-300">
                <li>✓ Unlimited links</li>
                <li>✓ Advanced analytics</li>
                <li>✓ Custom domains</li>
                <li>✓ API access</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-midnight-800">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-camp-500 to-camp-400" />
            <span className="font-display font-medium">CampKit</span>
          </div>
          <p className="text-midnight-500 text-sm">© 2024 CampKit</p>
        </div>
      </footer>
    </main>
  )
}
