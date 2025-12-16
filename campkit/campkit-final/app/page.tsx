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
              Get Started Free →
            </Link>
            <Link href="#pricing" className="px-8 py-4 border border-midnight-600 hover:border-midnight-500 text-midnight-200 rounded-xl transition-colors">
              View Pricing
            </Link>
          </div>
          
          <p className="mt-4 text-sm text-midnight-500">
            No credit card required. Free forever plan available.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 border-t border-midnight-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Sound familiar?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: '📊',
                title: 'Spreadsheet chaos',
                description: 'Your UTM links live in a Google Sheet that nobody maintains. Half the links are broken.',
              },
              {
                emoji: '💸',
                title: 'Tools are expensive',
                description: 'UTM.io wants $19-159/month. For link building. Seriously.',
              },
              {
                emoji: '🔍',
                title: 'No visibility',
                description: 'Which campaign drove that traffic spike? Good luck finding out.',
              },
            ].map((item, i) => (
              <div 
                key={i} 
                className="gradient-border p-6"
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-midnight-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
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
              { icon: '⚡', title: 'Quick UTM Builder', description: 'Create UTM links in seconds with templates and autocomplete. Save your most-used parameters.' },
              { icon: '📈', title: 'Click Analytics', description: 'See which links get clicked. Understand your campaigns without leaving CampKit.' },
              { icon: '🔗', title: 'Short Links', description: 'Turn ugly UTM URLs into clean, branded short links. Track them all in one place.' },
              { icon: '👥', title: 'Team Workspaces', description: 'Share link libraries with your team. Everyone uses the same conventions.' },
              { icon: '📋', title: 'Bulk Import/Export', description: 'Moving from spreadsheets? Import your existing links. Export anytime.' },
              { icon: '🔌', title: 'API Access', description: 'Integrate with your existing tools. Automate link creation from anywhere.' },
            ].map((feature, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-2xl hover:bg-midnight-800/50 transition-colors">
                <div className="text-3xl">{feature.icon}</div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-1">{feature.title}</h3>
                  <p className="text-midnight-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 border-t border-midnight-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Simple, fair pricing
            </h2>
            <p className="text-midnight-400">
              Start free. Upgrade as you grow. Cancel anytime.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {/* Free Tier */}
            <div className="gradient-border p-6">
              <div className="text-midnight-400 text-sm font-medium mb-2">FREE</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-display text-4xl font-bold">$0</span>
              </div>
              <p className="text-midnight-500 text-sm mb-6">Forever free</p>
              
              <Link 
                href="/signup"
                className="block text-center py-3 border border-midnight-600 rounded-lg text-midnight-300 hover:border-midnight-500 hover:text-white transition-colors mb-6"
              >
                Get Started
              </Link>
              
              <div className="text-sm text-midnight-400 mb-4">Includes:</div>
              <ul className="space-y-3">
                {[
                  '50 UTM links',
                  'Basic click analytics',
                  'Link shortener',
                  'CSV export',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-camp-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Pro Tier */}
            <div className="gradient-border p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-camp-500 text-midnight-900 text-xs font-semibold rounded-full whitespace-nowrap">
                MOST POPULAR
              </div>
              <div className="text-camp-400 text-sm font-medium mb-2">PRO</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-display text-4xl font-bold">$9</span>
                <span className="text-midnight-500">/mo</span>
              </div>
              <p className="text-midnight-500 text-sm mb-6">For professionals</p>
              
              <Link 
                href="/signup"
                className="block text-center py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-all mb-6"
              >
                Get Started
              </Link>
              
              <div className="text-sm text-midnight-400 mb-4">Everything in Free, plus:</div>
              <ul className="space-y-3">
                {[
                  'Unlimited links',
                  'Advanced analytics',
                  'Custom short domains',
                  'UTM templates',
                  'Priority support',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-camp-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Team Tier */}
            <div className="gradient-border p-6">
              <div className="text-blue-400 text-sm font-medium mb-2">TEAM</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-display text-4xl font-bold">$29</span>
                <span className="text-midnight-500">/mo</span>
              </div>
              <p className="text-midnight-500 text-sm mb-6">For small teams</p>
              
              <Link 
                href="/signup"
                className="block text-center py-3 border border-midnight-600 rounded-lg text-midnight-300 hover:border-midnight-500 hover:text-white transition-colors mb-6"
              >
                Get Started
              </Link>
              
              <div className="text-sm text-midnight-400 mb-4">Everything in Pro, plus:</div>
              <ul className="space-y-3">
                {[
                  'Up to 5 team members',
                  'Team workspaces',
                  'Role permissions',
                  'Shared templates',
                  'Bulk link builder',
                  'API access',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-camp-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Business Tier */}
            <div className="gradient-border p-6">
              <div className="text-purple-400 text-sm font-medium mb-2">BUSINESS</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-display text-4xl font-bold">$79</span>
                <span className="text-midnight-500">/mo</span>
              </div>
              <p className="text-midnight-500 text-sm mb-6">For agencies</p>
              
              <Link 
                href="/signup"
                className="block text-center py-3 border border-midnight-600 rounded-lg text-midnight-300 hover:border-midnight-500 hover:text-white transition-colors mb-6"
              >
                Contact Sales
              </Link>
              
              <div className="text-sm text-midnight-400 mb-4">Everything in Team, plus:</div>
              <ul className="space-y-3">
                {[
                  'Unlimited members',
                  'Multiple workspaces',
                  'SSO / SAML',
                  'Dedicated support',
                  'Custom integrations',
                  'SLA guarantee',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-camp-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <p className="text-center text-midnight-500 text-sm mt-8">
            Compare: UTM.io charges $19-159/month. You save up to 50% with CampKit.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-midnight-800/50 to-transparent">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to fix your campaign tracking?
          </h2>
          <p className="text-midnight-400 mb-8">
            Join hundreds of marketers who switched from spreadsheets.
          </p>
          
          <Link 
            href="/signup"
            className="inline-block px-8 py-4 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-camp-500/25"
          >
            Get Started Free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-midnight-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center">
              <span className="text-midnight-900 font-bold text-xs">C</span>
            </div>
            <span className="font-display font-medium">CampKit</span>
          </div>
          <div className="flex gap-6 text-sm text-midnight-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="mailto:support@getcampkit.com" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-midnight-500 text-sm">
            © {new Date().getFullYear()} CampKit
          </p>
        </div>
      </footer>
    </main>
  )
}
