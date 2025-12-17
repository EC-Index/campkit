import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'UTM Tracking Guide 2025: How to Set Up UTM Parameters Correctly | CampKit',
  description: 'Learn how to set up UTM tracking the right way in 2025. Best practices for UTM parameters, naming conventions, and campaign tracking that actually works.',
  keywords: 'UTM tracking, UTM parameters, campaign tracking, Google Analytics UTM, marketing attribution, UTM best practices, UTM builder, link tracking',
  openGraph: {
    title: 'UTM Tracking Guide 2025: How to Set Up UTM Parameters Correctly',
    description: 'Learn how to set up UTM tracking the right way. Best practices for naming conventions and campaign tracking.',
    type: 'article',
    publishedTime: '2024-12-17T00:00:00.000Z',
    authors: ['CampKit'],
    url: 'https://getcampkit.com/blog/utm-tracking-guide-2025',
  },
  alternates: {
    canonical: 'https://getcampkit.com/blog/utm-tracking-guide-2025',
  },
}

export default function BlogPost() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'UTM Tracking Guide 2025: How to Set Up UTM Parameters Correctly',
    description: 'Learn how to set up UTM tracking the right way in 2025. Best practices for UTM parameters and campaign tracking.',
    author: { '@type': 'Organization', name: 'CampKit' },
    publisher: { '@type': 'Organization', name: 'CampKit', logo: { '@type': 'ImageObject', url: 'https://getcampkit.com/logo.png' } },
    datePublished: '2024-12-17',
    dateModified: '2024-12-17',
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://getcampkit.com/blog/utm-tracking-guide-2025' },
  }

  return (
    <div className="min-h-screen bg-midnight-900 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <header className="border-b border-midnight-800 bg-midnight-900/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/"><Image src="/logo.png" alt="CampKit" width={120} height={30} className="h-8 w-auto" /></Link>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-midnight-400 hover:text-white text-sm">Blog</Link>
            <Link href="/login" className="text-midnight-400 hover:text-white text-sm hidden sm:block">Login</Link>
            <Link href="/signup" className="px-4 py-2 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg text-sm">Start Free</Link>
          </div>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-16">
        <nav className="mb-8 text-sm text-midnight-500">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/blog" className="hover:text-white">Blog</Link>
          <span className="mx-2">›</span>
          <span className="text-midnight-300">UTM Tracking Guide</span>
        </nav>

        <div className="flex items-center gap-4 mb-6 text-sm text-midnight-400">
          <time dateTime="2024-12-17">December 17, 2024</time>
          <span>•</span>
          <span>10 min read</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          UTM Tracking Guide 2025: How to Set Up UTM Parameters Correctly
        </h1>

        <p className="text-xl text-midnight-300 mb-12 leading-relaxed">
          UTM tracking is the foundation of marketing attribution. Yet most Analytics accounts are filled with messy, inconsistent data. Not because UTM parameters are complicated—but because teams use them incorrectly. Here's how to fix that.
        </p>

        <div className="prose prose-invert prose-lg max-w-none">
          <h2 className="text-2xl font-display font-bold mt-12 mb-4">What Are UTM Parameters?</h2>
          
          <p>
            UTM (Urchin Tracking Module) parameters are tags you add to URLs to track where your traffic comes from. When someone clicks a link with UTM parameters, Google Analytics records the source, medium, campaign, and other details.
          </p>

          <p>The five UTM parameters are:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li><strong>utm_source</strong> – Where the traffic comes from (google, facebook, newsletter)</li>
            <li><strong>utm_medium</strong> – The marketing channel (cpc, email, social, referral)</li>
            <li><strong>utm_campaign</strong> – The specific campaign name (black_friday_2024)</li>
            <li><strong>utm_term</strong> – Paid search keywords (optional)</li>
            <li><strong>utm_content</strong> – Differentiate similar content or links (optional)</li>
          </ul>

          <div className="not-prose my-10 p-6 bg-camp-500/10 border border-camp-500/30 rounded-xl">
            <p className="font-semibold text-white mb-2">💡 Build UTM Links Automatically</p>
            <p className="text-midnight-300 text-sm mb-4">
              CampKit lets you create UTM links in seconds—with templates, short links, and click analytics built in.
            </p>
            <Link href="/signup" className="inline-block px-4 py-2 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg text-sm">
              Try Free UTM Builder →
            </Link>
          </div>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">The #1 Rule: Standardization Over Creativity</h2>
          
          <p>
            The biggest problem with UTM tracking isn't technical—it's organizational. UTM parameters are free-form text fields. Anyone can name them anything. This leads to chaos.
          </p>

          <p>
            The most important rule: <strong>standardization over creativity</strong>. Campaign names don't need to be clever. They need to be consistent and comparable. A name like <code className="bg-midnight-800 px-2 py-1 rounded text-sm">q4_2024_black_friday_shoes</code> is more valuable than any creative wordplay.
          </p>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">UTM Naming Conventions That Work</h2>

          <p>Here's a battle-tested naming convention used by high-performing marketing teams:</p>

          <div className="not-prose my-8 p-4 bg-midnight-800/50 border border-midnight-700 rounded-xl font-mono text-sm">
            <p className="text-midnight-400 mb-2"># Source (where traffic comes from)</p>
            <p className="text-camp-400 mb-4">google, facebook, linkedin, newsletter, partner</p>
            
            <p className="text-midnight-400 mb-2"># Medium (marketing channel type)</p>
            <p className="text-camp-400 mb-4">cpc, email, social, referral, display, affiliate</p>
            
            <p className="text-midnight-400 mb-2"># Campaign (naming pattern)</p>
            <p className="text-camp-400">[year]_[quarter]_[campaign]_[product]</p>
            <p className="text-midnight-500 mt-1">Example: 2024_q4_blackfriday_shoes</p>
          </div>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">Case Sensitivity Matters</h2>

          <p>
            This trips up most teams: UTM parameters are <strong>case-sensitive</strong>. To Google Analytics, these are three different sources:
          </p>

          <div className="not-prose my-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <p className="font-mono text-sm">
              utm_source=<span className="text-red-400">Google</span><br/>
              utm_source=<span className="text-red-400">google</span><br/>
              utm_source=<span className="text-red-400">GOOGLE</span>
            </p>
            <p className="text-midnight-400 text-sm mt-3">→ Analytics counts these as 3 separate sources</p>
          </div>

          <p>
            <strong>Solution:</strong> Always use lowercase. No exceptions. Train your team. Use templates. Automate where possible.
          </p>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">Stop Building UTM Links Manually</h2>

          <p>
            Manual link building is the fastest way to introduce errors. Every extra keystroke increases the chance of typos. One misspelled parameter, and your data is lost forever.
          </p>

          <p>
            Modern teams use <strong>UTM templates</strong> and <strong>link management tools</strong> instead of spreadsheets. Tools like <Link href="/" className="text-camp-400 hover:underline">CampKit</Link> let you save templates, enforce naming conventions, and generate short links automatically.
          </p>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">Why Clean UTM Tracking Matters in 2025</h2>

          <p>
            Clean UTM tracking isn't a nice-to-have anymore. It's essential for:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Accurate attribution</strong> – Know which campaigns actually drive conversions</li>
            <li><strong>Budget optimization</strong> – Stop wasting money on channels that don't work</li>
            <li><strong>AI-powered analytics</strong> – Garbage in, garbage out. AI tools need clean data</li>
            <li><strong>Cross-team alignment</strong> – Everyone speaks the same tracking language</li>
          </ul>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">UTM Tracking Checklist</h2>

          <div className="not-prose my-8 p-6 bg-midnight-800/50 border border-midnight-700 rounded-xl">
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><span className="text-camp-400">✓</span> Use lowercase for all parameters</li>
              <li className="flex items-start gap-2"><span className="text-camp-400">✓</span> Define standard source/medium values</li>
              <li className="flex items-start gap-2"><span className="text-camp-400">✓</span> Create a campaign naming convention</li>
              <li className="flex items-start gap-2"><span className="text-camp-400">✓</span> Use UTM templates instead of manual entry</li>
              <li className="flex items-start gap-2"><span className="text-camp-400">✓</span> Track ALL links (newsletters, QR codes, PDFs)</li>
              <li className="flex items-start gap-2"><span className="text-camp-400">✓</span> Audit your Analytics sources monthly</li>
              <li className="flex items-start gap-2"><span className="text-camp-400">✓</span> Document your conventions for the team</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 p-8 bg-gradient-to-r from-camp-500/10 to-camp-400/10 border border-camp-500/30 rounded-2xl text-center">
          <h3 className="font-display text-2xl font-bold mb-3">Ready for Better UTM Tracking?</h3>
          <p className="text-midnight-400 mb-6">
            CampKit helps you build UTM links with templates, get automatic short links, and track every click in real-time.
          </p>
          <Link href="/signup" className="inline-block px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg">
            Start Free — No Credit Card →
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-midnight-800">
          <h4 className="font-display font-semibold mb-4">Related Articles:</h4>
          <div className="space-y-3">
            <Link href="/blog/utm-mistakes-killing-campaigns" className="block p-4 bg-midnight-800/50 rounded-lg hover:bg-midnight-800 transition-colors">
              <span className="text-camp-400">→</span> 7 UTM Mistakes That Are Killing Your Campaign Data
            </Link>
            <Link href="/blog/bitly-vs-utm-tracking" className="block p-4 bg-midnight-800/50 rounded-lg hover:bg-midnight-800 transition-colors">
              <span className="text-camp-400">→</span> Bitly vs UTM Tracking: Which Do You Actually Need?
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
