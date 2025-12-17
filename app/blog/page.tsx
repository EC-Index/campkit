import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Blog | CampKit – UTM Tracking & Marketing Analytics',
  description: 'Tips, guides, and best practices for UTM tracking, marketing attribution, and campaign analytics. Learn how to track your marketing links the right way.',
  openGraph: {
    title: 'Blog | CampKit',
    description: 'Tips and guides for UTM tracking, marketing attribution, and campaign analytics.',
  },
  alternates: { canonical: 'https://getcampkit.com/blog' },
}

const posts = [
  {
    slug: 'utm-tracking-guide-2025',
    title: 'UTM Tracking Guide 2025: How to Set Up UTM Parameters Correctly',
    excerpt: 'Learn how to set up UTM tracking the right way. Best practices for naming conventions, case sensitivity, and campaign tracking that actually works.',
    date: 'December 17, 2024',
    readTime: '10 min',
    category: 'Guide',
  },
  {
    slug: 'utm-mistakes-killing-campaigns',
    title: '7 UTM Mistakes That Are Killing Your Campaign Data',
    excerpt: 'The most common UTM tracking mistakes that silently destroy your data—and the decisions you make from it. Here\'s how to fix them.',
    date: 'December 17, 2024',
    readTime: '8 min',
    category: 'Best Practices',
  },
  {
    slug: 'google-analytics-utm-setup',
    title: 'How to Set Up UTM Tracking in Google Analytics 4 (GA4)',
    excerpt: 'Step-by-step guide to creating UTM links, viewing campaign reports in GA4, and fixing common tracking issues.',
    date: 'December 17, 2024',
    readTime: '9 min',
    category: 'Tutorial',
  },
  {
    slug: 'bitly-alternative-marketing-teams',
    title: 'Best Bitly Alternative for Marketing Teams (2025)',
    excerpt: 'Looking for a Bitly alternative with UTM tracking built in? Compare features, pricing, and see why teams are switching.',
    date: 'December 17, 2024',
    readTime: '7 min',
    category: 'Comparison',
  },
]

export default function BlogIndex() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'CampKit Blog',
    description: 'Tips and guides for UTM tracking and marketing analytics',
    url: 'https://getcampkit.com/blog',
    publisher: { '@type': 'Organization', name: 'CampKit' },
  }

  return (
    <div className="min-h-screen bg-midnight-900 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="border-b border-midnight-800 bg-midnight-900/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/"><Image src="/logo.png" alt="CampKit" width={120} height={30} className="h-8 w-auto" /></Link>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-white text-sm font-medium">Blog</Link>
            <Link href="/login" className="text-midnight-400 hover:text-white text-sm hidden sm:block">Login</Link>
            <Link href="/signup" className="px-4 py-2 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg text-sm">Start Free</Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold mb-4">Blog</h1>
          <p className="text-midnight-400 text-lg max-w-2xl">
            Tips, guides, and best practices for UTM tracking, marketing attribution, and campaign analytics. 
            Learn how to track your marketing links the right way.
          </p>
        </div>

        {/* Featured Post */}
        <Link 
          href={`/blog/${posts[0].slug}`}
          className="block mb-12 p-8 bg-gradient-to-r from-camp-500/10 to-camp-400/5 border border-camp-500/30 rounded-2xl hover:border-camp-500/50 transition-all"
        >
          <span className="inline-block px-3 py-1 bg-camp-500/20 text-camp-400 text-xs font-medium rounded-full mb-4">
            Featured
          </span>
          <h2 className="font-display text-2xl font-bold mb-3">{posts[0].title}</h2>
          <p className="text-midnight-400 mb-4">{posts[0].excerpt}</p>
          <div className="flex items-center gap-4 text-sm text-midnight-500">
            <span>{posts[0].date}</span>
            <span>•</span>
            <span>{posts[0].readTime} read</span>
          </div>
        </Link>

        {/* All Posts Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {posts.slice(1).map((post) => (
            <Link 
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-6 bg-midnight-800/30 border border-midnight-700/50 rounded-xl hover:border-camp-500/50 hover:bg-midnight-800/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2 py-1 bg-midnight-700 text-midnight-300 text-xs rounded">
                  {post.category}
                </span>
                <span className="text-midnight-500 text-xs">{post.readTime}</span>
              </div>
              <h2 className="font-display text-lg font-semibold mb-2">{post.title}</h2>
              <p className="text-midnight-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
              <span className="text-camp-400 text-sm font-medium">Read more →</span>
            </Link>
          ))}
        </div>

        {/* Topics */}
        <div className="mt-16">
          <h3 className="font-display font-semibold mb-4">Popular Topics</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/blog?topic=utm-tracking" className="px-4 py-2 bg-midnight-800 hover:bg-midnight-700 rounded-lg text-sm transition-colors">
              UTM Tracking
            </Link>
            <Link href="/blog?topic=ga4" className="px-4 py-2 bg-midnight-800 hover:bg-midnight-700 rounded-lg text-sm transition-colors">
              Google Analytics 4
            </Link>
            <Link href="/blog?topic=attribution" className="px-4 py-2 bg-midnight-800 hover:bg-midnight-700 rounded-lg text-sm transition-colors">
              Marketing Attribution
            </Link>
            <Link href="/blog?topic=link-shortener" className="px-4 py-2 bg-midnight-800 hover:bg-midnight-700 rounded-lg text-sm transition-colors">
              Link Shorteners
            </Link>
            <Link href="/blog?topic=best-practices" className="px-4 py-2 bg-midnight-800 hover:bg-midnight-700 rounded-lg text-sm transition-colors">
              Best Practices
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-camp-500/10 to-camp-400/10 border border-camp-500/30 rounded-2xl text-center">
          <h3 className="font-display text-2xl font-bold mb-3">Ready for Better Campaign Tracking?</h3>
          <p className="text-midnight-400 mb-6 max-w-lg mx-auto">
            CampKit helps you build UTM links with templates, get automatic short URLs, and track every click in real-time.
          </p>
          <Link href="/signup" className="inline-block px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg">
            Start Free — No Credit Card →
          </Link>
        </div>

        {/* Newsletter */}
        <div className="mt-12 p-6 bg-midnight-800/30 border border-midnight-700/50 rounded-xl text-center">
          <h4 className="font-semibold mb-2">📬 Marketing Analytics Tips</h4>
          <p className="text-midnight-400 text-sm mb-4">
            Get occasional tips on UTM tracking, analytics, and marketing attribution. No spam.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="your@email.com" 
              className="flex-1 px-4 py-2 bg-midnight-800 border border-midnight-700 rounded-lg text-sm placeholder:text-midnight-500 focus:border-camp-500 focus:outline-none"
            />
            <button className="px-4 py-2 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-medium rounded-lg text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </main>

      <footer className="py-12 px-6 border-t border-midnight-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/"><Image src="/logo.png" alt="CampKit" width={120} height={30} className="h-8 w-auto" /></Link>
          <div className="flex items-center gap-6 text-sm text-midnight-400">
            <Link href="/imprint" className="hover:text-white">Imprint</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <a href="mailto:service@getcampkit.com" className="hover:text-white">Support</a>
          </div>
          <p className="text-midnight-500 text-sm">© 2024 CampKit. Made in Germany 🇩🇪</p>
        </div>
      </footer>
    </div>
  )
}
