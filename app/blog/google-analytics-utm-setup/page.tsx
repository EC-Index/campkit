import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'How to Set Up UTM Tracking in Google Analytics 4 (GA4) | CampKit',
  description: 'Step-by-step guide to setting up UTM tracking in Google Analytics 4. Learn how to create UTM links, view campaign reports, and fix common GA4 tracking issues.',
  keywords: 'Google Analytics UTM, GA4 UTM tracking, UTM parameters GA4, campaign tracking Google Analytics, GA4 campaign reports, UTM setup guide',
  openGraph: {
    title: 'How to Set Up UTM Tracking in Google Analytics 4 (GA4)',
    description: 'Step-by-step guide to UTM tracking in GA4.',
    type: 'article',
    url: 'https://getcampkit.com/blog/google-analytics-utm-setup',
  },
  alternates: { canonical: 'https://getcampkit.com/blog/google-analytics-utm-setup' },
}

export default function BlogPost() {
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: 'How to Set Up UTM Tracking in Google Analytics 4 (GA4)',
    author: { '@type': 'Organization', name: 'CampKit' },
    publisher: { '@type': 'Organization', name: 'CampKit' },
    datePublished: '2024-12-17',
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
          <span className="text-midnight-300">GA4 UTM Setup</span>
        </nav>

        <div className="flex items-center gap-4 mb-6 text-sm text-midnight-400">
          <time dateTime="2024-12-17">December 17, 2024</time><span>•</span><span>9 min read</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          How to Set Up UTM Tracking in Google Analytics 4 (GA4)
        </h1>

        <p className="text-xl text-midnight-300 mb-12 leading-relaxed">
          UTM parameters work automatically with Google Analytics 4—no extra setup required. But knowing how to create proper UTM links and find your data in GA4 is where most marketers struggle. This guide covers everything.
        </p>

        <div className="prose prose-invert prose-lg max-w-none">
          <h2 className="text-2xl font-display font-bold mt-12 mb-4">How UTM Tracking Works in GA4</h2>
          
          <p>
            When someone clicks a link with UTM parameters, Google Analytics 4 automatically captures that data. There's no code to add, no settings to configure. GA4 reads the URL parameters and attributes the session accordingly.
          </p>

          <p>The magic happens through these URL parameters:</p>

          <div className="not-prose my-6 p-4 bg-midnight-800/50 border border-midnight-700 rounded-xl font-mono text-sm overflow-x-auto">
            <p className="text-midnight-400 mb-2">Example URL with UTM parameters:</p>
            <p className="text-camp-400 break-all">
              https://yoursite.com/landing-page<br/>
              ?<span className="text-blue-400">utm_source</span>=google<br/>
              &<span className="text-purple-400">utm_medium</span>=cpc<br/>
              &<span className="text-orange-400">utm_campaign</span>=spring_sale_2024
            </p>
          </div>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">Step 1: Create UTM Links</h2>

          <p>You have three options for creating UTM links:</p>

          <h3 className="text-xl font-display font-semibold mt-8 mb-3">Option A: Google's Campaign URL Builder</h3>
          <p>
            Google offers a free <a href="https://ga-dev-tools.google/campaign-url-builder/" target="_blank" rel="noopener" className="text-camp-400 hover:underline">Campaign URL Builder</a>. It works, but it's basic—no templates, no link shortening, no team features.
          </p>

          <h3 className="text-xl font-display font-semibold mt-8 mb-3">Option B: Manual URL Building</h3>
          <p>
            You can add parameters to any URL manually. Just append <code className="bg-midnight-800 px-2 py-1 rounded text-sm">?utm_source=xxx&utm_medium=xxx&utm_campaign=xxx</code> to your URL. Error-prone and tedious at scale.
          </p>

          <h3 className="text-xl font-display font-semibold mt-8 mb-3">Option C: UTM Management Tool (Recommended)</h3>
          <p>
            Tools like CampKit let you create UTM links with templates, generate short URLs, and track clicks—all in one place. Much faster and less error-prone than manual methods.
          </p>

          <div className="not-prose my-10 p-6 bg-camp-500/10 border border-camp-500/30 rounded-xl">
            <p className="font-semibold text-white mb-2">🔗 Create UTM Links in Seconds</p>
            <p className="text-midnight-300 text-sm mb-4">
              CampKit includes a UTM builder, short links, and click analytics. Works seamlessly with GA4.
            </p>
            <Link href="/signup" className="inline-block px-4 py-2 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg text-sm">
              Try Free UTM Builder →
            </Link>
          </div>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">Step 2: Find UTM Data in Google Analytics 4</h2>

          <p>GA4's interface is different from Universal Analytics. Here's where to find your campaign data:</p>

          <h3 className="text-xl font-display font-semibold mt-8 mb-3">Traffic Acquisition Report</h3>
          <p>
            Go to <strong>Reports → Acquisition → Traffic acquisition</strong>. This shows sessions grouped by source/medium. You'll see entries like "google / cpc" or "newsletter / email".
          </p>

          <h3 className="text-xl font-display font-semibold mt-8 mb-3">User Acquisition Report</h3>
          <p>
            <strong>Reports → Acquisition → User acquisition</strong> shows how new users first discovered your site. Useful for understanding which channels bring new customers.
          </p>

          <h3 className="text-xl font-display font-semibold mt-8 mb-3">Adding Campaign as a Dimension</h3>
          <p>
            In any report, click the <strong>+</strong> button to add a secondary dimension. Search for "Session campaign" to see your utm_campaign values alongside other metrics.
          </p>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">Step 3: Create a Custom Campaign Report</h2>

          <p>For dedicated campaign analysis, create a custom exploration:</p>

          <ol className="list-decimal pl-6 space-y-2">
            <li>Go to <strong>Explore</strong> in the left sidebar</li>
            <li>Click <strong>Blank</strong> to start fresh</li>
            <li>Add dimensions: Session source, Session medium, Session campaign</li>
            <li>Add metrics: Sessions, Conversions, Revenue</li>
            <li>Drag dimensions to Rows, metrics to Values</li>
          </ol>

          <p>
            Save this exploration for quick access to campaign performance data.
          </p>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">Common GA4 UTM Issues (and Fixes)</h2>

          <h3 className="text-xl font-display font-semibold mt-8 mb-3">Issue: Traffic showing as "Direct"</h3>
          <p>
            If UTM-tagged traffic appears as Direct, the parameters aren't reaching GA4. Check that links aren't being stripped by redirects, and ensure HTTPS consistency.
          </p>

          <h3 className="text-xl font-display font-semibold mt-8 mb-3">Issue: Duplicate sources (Google vs google)</h3>
          <p>
            GA4 is case-sensitive. "Google" and "google" are different sources. Always use lowercase and establish team conventions.
          </p>

          <h3 className="text-xl font-display font-semibold mt-8 mb-3">Issue: Campaign data delayed</h3>
          <p>
            GA4 has processing delays—standard reports can take 24-48 hours. For real-time campaign tracking, use the Realtime report or a dedicated tool like CampKit.
          </p>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">UTM Best Practices for GA4</h2>

          <div className="not-prose my-8 p-6 bg-midnight-800/50 border border-midnight-700 rounded-xl">
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><span className="text-camp-400">✓</span> Always use lowercase for all parameters</li>
              <li className="flex items-start gap-2"><span className="text-camp-400">✓</span> Use underscores instead of spaces (spring_sale not spring sale)</li>
              <li className="flex items-start gap-2"><span className="text-camp-400">✓</span> Keep source names consistent (google, not Google or GOOGLE)</li>
              <li className="flex items-start gap-2"><span className="text-camp-400">✓</span> Use standard medium values (cpc, email, social, referral)</li>
              <li className="flex items-start gap-2"><span className="text-camp-400">✓</span> Include date or quarter in campaign names for easy filtering</li>
              <li className="flex items-start gap-2"><span className="text-camp-400">✓</span> Document your conventions for the team</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 p-8 bg-gradient-to-r from-camp-500/10 to-camp-400/10 border border-camp-500/30 rounded-2xl text-center">
          <h3 className="font-display text-2xl font-bold mb-3">Make UTM Tracking Easy</h3>
          <p className="text-midnight-400 mb-6">
            CampKit helps you create consistent UTM links with templates, automatic short URLs, and real-time click tracking that complements GA4.
          </p>
          <Link href="/signup" className="inline-block px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg">
            Start Free — Works with GA4 →
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-midnight-800">
          <h4 className="font-display font-semibold mb-4">Related Articles:</h4>
          <div className="space-y-3">
            <Link href="/blog/utm-tracking-guide-2025" className="block p-4 bg-midnight-800/50 rounded-lg hover:bg-midnight-800 transition-colors">
              <span className="text-camp-400">→</span> UTM Tracking Guide 2025
            </Link>
            <Link href="/blog/utm-mistakes-killing-campaigns" className="block p-4 bg-midnight-800/50 rounded-lg hover:bg-midnight-800 transition-colors">
              <span className="text-camp-400">→</span> 7 UTM Mistakes That Are Killing Your Campaign Data
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
