import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: '7 UTM Mistakes That Are Killing Your Campaign Data | CampKit',
  description: 'Discover the most common UTM tracking mistakes that ruin your marketing data. Learn how to fix inconsistent naming, manual errors, and missing attribution.',
  keywords: 'UTM mistakes, UTM tracking errors, campaign tracking problems, marketing attribution errors, UTM best practices, fix UTM tracking',
  openGraph: {
    title: '7 UTM Mistakes That Are Killing Your Campaign Data',
    description: 'The most common UTM tracking mistakes that ruin your marketing data—and how to fix them.',
    type: 'article',
    publishedTime: '2024-12-17T00:00:00.000Z',
    url: 'https://getcampkit.com/blog/utm-mistakes-killing-campaigns',
  },
  alternates: { canonical: 'https://getcampkit.com/blog/utm-mistakes-killing-campaigns' },
}

export default function BlogPost() {
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: '7 UTM Mistakes That Are Killing Your Campaign Data',
    description: 'The most common UTM tracking mistakes and how to fix them.',
    author: { '@type': 'Organization', name: 'CampKit' },
    publisher: { '@type': 'Organization', name: 'CampKit', logo: { '@type': 'ImageObject', url: 'https://getcampkit.com/logo.png' } },
    datePublished: '2024-12-17', dateModified: '2024-12-17',
  }

  return (
    <div className="min-h-screen bg-midnight-900 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <header className="border-b border-midnight-800 bg-midnight-900/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/"><Image src="/logo.png" alt="CampKit" width={120} height={30} className="h-8 w-auto" /></Link>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-midnight-400 hover:text-white text-sm">Blog</Link>
            <Link href="/signup" className="px-4 py-2 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg text-sm">Start Free</Link>
          </div>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-16">
        <nav className="mb-8 text-sm text-midnight-500">
          <Link href="/" className="hover:text-white">Home</Link><span className="mx-2">›</span>
          <Link href="/blog" className="hover:text-white">Blog</Link><span className="mx-2">›</span>
          <span className="text-midnight-300">UTM Mistakes</span>
        </nav>

        <div className="flex items-center gap-4 mb-6 text-sm text-midnight-400">
          <time dateTime="2024-12-17">December 17, 2024</time><span>•</span><span>8 min read</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          7 UTM Mistakes That Are Killing Your Campaign Data
        </h1>

        <p className="text-xl text-midnight-300 mb-12 leading-relaxed">
          When campaigns underperform, most teams blame the creative, the budget, or the channel. But often the real problem is simpler: broken tracking. These UTM mistakes silently destroy your data—and the decisions you make from it.
        </p>

        <div className="prose prose-invert prose-lg max-w-none">
          <h2 className="text-2xl font-display font-bold mt-12 mb-4">Mistake #1: Inconsistent Capitalization</h2>
          
          <p>
            This is the most common UTM mistake, and it's devastating. UTM parameters are case-sensitive. Different capitalizations create duplicate entries in Analytics, fragmenting your data.
          </p>

          <div className="not-prose my-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <p className="font-semibold text-red-400 mb-2">❌ What goes wrong:</p>
            <p className="font-mono text-sm">
              utm_source=Facebook → 847 sessions<br/>
              utm_source=facebook → 1,203 sessions<br/>
              utm_source=FACEBOOK → 156 sessions
            </p>
            <p className="text-midnight-400 text-sm mt-3">→ Same channel, split into 3 sources. Your reports show Facebook as weaker than it really is.</p>
          </div>

          <p><strong>Fix:</strong> Always use lowercase. Document it. Enforce it with templates.</p>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">Mistake #2: Creative Campaign Names</h2>

          <p>
            Campaign names like <code className="bg-midnight-800 px-2 py-1 rounded text-sm">awesome_summer_vibes_2024</code> or <code className="bg-midnight-800 px-2 py-1 rounded text-sm">johns_test_campaign</code> seem harmless. But three months later, no one knows what they mean.
          </p>

          <p>
            Good campaign names are boring but useful: <code className="bg-midnight-800 px-2 py-1 rounded text-sm">2024_q3_summer_sale_shoes</code>. They tell you the timeframe, initiative, and product at a glance.
          </p>

          <div className="not-prose my-10 p-6 bg-camp-500/10 border border-camp-500/30 rounded-xl">
            <p className="font-semibold text-white mb-2">💡 Use UTM Templates</p>
            <p className="text-midnight-300 text-sm mb-4">
              CampKit lets you save UTM templates and share them with your team. Same naming conventions, every time.
            </p>
            <Link href="/signup" className="inline-block px-4 py-2 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg text-sm">
              Try Templates Free →
            </Link>
          </div>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">Mistake #3: Building Links Manually</h2>

          <p>
            Every manual keystroke is a chance for error. One typo in <code className="bg-midnight-800 px-2 py-1 rounded text-sm">utm_campain</code> instead of <code className="bg-midnight-800 px-2 py-1 rounded text-sm">utm_campaign</code>, and that traffic disappears into the void.
          </p>

          <p>
            The more campaigns you run, the worse this gets. At scale, manual UTM building is unsustainable. Use a UTM builder tool that validates parameters and prevents typos.
          </p>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">Mistake #4: Mixing Up Source and Medium</h2>

          <p>
            This confusion is everywhere. Is "facebook" a source or a medium? What about "cpc"?
          </p>

          <p>Here's the correct model:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Source</strong> = The specific platform (facebook, google, mailchimp, partner_xyz)</li>
            <li><strong>Medium</strong> = The channel category (cpc, email, social, referral, display)</li>
          </ul>

          <div className="not-prose my-6 p-4 bg-camp-500/10 border border-camp-500/20 rounded-xl">
            <p className="font-semibold text-camp-400 mb-2">✓ Correct example:</p>
            <p className="font-mono text-sm">
              utm_source=facebook<br/>
              utm_medium=cpc<br/>
              utm_campaign=2024_q4_retargeting
            </p>
          </div>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">Mistake #5: Forgetting "Small" Links</h2>

          <p>
            Newsletter links, PDF downloads, QR codes, email signatures—these often go untracked. That traffic lands in "Direct" and becomes impossible to attribute.
          </p>

          <p>
            <strong>Rule:</strong> Every link you control should have UTM parameters. No exceptions. The 30 seconds it takes to add UTMs saves hours of guessing later.
          </p>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">Mistake #6: No Documentation</h2>

          <p>
            Most teams have UTM conventions stored in someone's head—or nowhere at all. New team members guess. Old conventions drift. Chaos follows.
          </p>

          <p>
            Create a simple UTM documentation page. List your standard sources, mediums, and campaign naming format. Share it with everyone who creates links.
          </p>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">Mistake #7: Never Auditing Your Data</h2>

          <p>
            UTM errors accumulate silently. A misspelling here, a capitalization issue there. Without regular audits, your data quality degrades over time.
          </p>

          <p>
            <strong>Monthly habit:</strong> Check your Analytics source/medium report. Look for duplicates, typos, and unexpected values. Fix the root cause, not just the symptoms.
          </p>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">The Real Cost of UTM Mistakes</h2>

          <p>Bad UTM tracking doesn't just create messy reports. It leads to:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Wrong budget allocation (investing in channels that look good but aren't)</li>
            <li>Missed opportunities (killing campaigns that were actually working)</li>
            <li>Lost trust in data (teams stop using Analytics altogether)</li>
            <li>Wasted time (endless debates about what the numbers "really" mean)</li>
          </ul>

          <p>
            Clean tracking isn't a nice-to-have. It's the foundation of data-driven marketing.
          </p>
        </div>

        <div className="mt-12 p-6 bg-midnight-800/50 border border-midnight-700 rounded-xl">
          <h3 className="font-display font-semibold mb-4">✅ UTM Quality Checklist</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><span className="text-camp-400">□</span> All lowercase parameters</li>
            <li className="flex items-start gap-2"><span className="text-camp-400">□</span> Documented naming conventions</li>
            <li className="flex items-start gap-2"><span className="text-camp-400">□</span> Templates for common campaigns</li>
            <li className="flex items-start gap-2"><span className="text-camp-400">□</span> All links tracked (including email/QR)</li>
            <li className="flex items-start gap-2"><span className="text-camp-400">□</span> Monthly data quality audits</li>
            <li className="flex items-start gap-2"><span className="text-camp-400">□</span> Team training on UTM standards</li>
          </ul>
        </div>

        <div className="mt-16 p-8 bg-gradient-to-r from-camp-500/10 to-camp-400/10 border border-camp-500/30 rounded-2xl text-center">
          <h3 className="font-display text-2xl font-bold mb-3">Fix Your UTM Tracking Today</h3>
          <p className="text-midnight-400 mb-6">
            CampKit helps you build consistent UTM links with templates, automatic short URLs, and real-time click tracking.
          </p>
          <Link href="/signup" className="inline-block px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg">
            Start Free — No Credit Card →
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-midnight-800">
          <h4 className="font-display font-semibold mb-4">Related Articles:</h4>
          <div className="space-y-3">
            <Link href="/blog/utm-tracking-guide-2025" className="block p-4 bg-midnight-800/50 rounded-lg hover:bg-midnight-800 transition-colors">
              <span className="text-camp-400">→</span> UTM Tracking Guide 2025: How to Set Up UTM Parameters Correctly
            </Link>
            <Link href="/blog/google-analytics-utm-setup" className="block p-4 bg-midnight-800/50 rounded-lg hover:bg-midnight-800 transition-colors">
              <span className="text-camp-400">→</span> How to Set Up UTM Tracking in Google Analytics 4
            </Link>
          </div>
        </div>
      </article>

      <footer className="py-12 px-6 border-t border-midnight-800">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/"><Image src="/logo.png" alt="CampKit" width={120} height={30} className="h-8 w-auto" /></Link>
          <div className="flex items-center gap-6 text-sm text-midnight-400">
            <Link href="/imprint" className="hover:text-white">Imprint</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
          <p className="text-midnight-500 text-sm">© 2024 CampKit</p>
        </div>
      </footer>
    </div>
  )
}
