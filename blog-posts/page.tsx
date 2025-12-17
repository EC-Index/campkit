import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog - UTM Tracking & Marketing Analytics Tipps | CampKit',
  description: 'Lerne alles über UTM-Parameter, Kampagnen-Tracking und Marketing-Analytics. Guides, Best Practices und Tipps für bessere Marketing-Daten.',
  keywords: 'UTM tracking blog, marketing analytics, kampagnen tracking, UTM parameter guide',
  openGraph: {
    title: 'Blog - UTM Tracking & Marketing Analytics Tipps',
    description: 'Guides, Best Practices und Tipps für bessere Marketing-Daten.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://getcampkit.com/blog',
  },
}

const posts = [
  // NEW German Posts
  {
    slug: 'utm-tracking-ga4',
    title: 'UTM-Tracking für GA4: Komplette Anleitung 2025',
    description: 'Lerne wie du UTM-Parameter in Google Analytics 4 richtig einrichtest und trackst.',
    category: 'Google Analytics',
    date: '15. Januar 2025',
    readTime: '10 Min.',
    featured: true,
    lang: 'de',
  },
  {
    slug: 'utm-namenskonventionen',
    title: 'UTM-Namenskonventionen: Best Practices für Teams',
    description: 'Definiere einheitliche UTM-Standards für dein Marketing-Team.',
    category: 'Best Practices',
    date: '15. Januar 2025',
    readTime: '8 Min.',
    featured: true,
    lang: 'de',
  },
  {
    slug: 'utm-vs-auto-tagging',
    title: 'UTM vs. Auto-Tagging: Wann nutzt du was?',
    description: 'Google Auto-Tagging oder UTM-Parameter? Der komplette Vergleich.',
    category: 'Google Ads',
    date: '15. Januar 2025',
    readTime: '7 Min.',
    featured: false,
    lang: 'de',
  },
  {
    slug: 'falsche-utm-daten',
    title: 'Falsche UTM-Daten? 7 Gründe und Lösungen',
    description: 'Die häufigsten Ursachen für fehlerhafte UTM-Tracking-Daten.',
    category: 'Troubleshooting',
    date: '15. Januar 2025',
    readTime: '9 Min.',
    featured: false,
    lang: 'de',
  },
  // Existing English Posts
  {
    slug: 'utm-tracking-guide-2025',
    title: 'The Complete UTM Tracking Guide for 2025',
    description: 'Everything you need to know about UTM parameters, from basics to advanced strategies.',
    category: 'Guide',
    date: 'January 10, 2025',
    readTime: '12 min',
    featured: true,
    lang: 'en',
  },
  {
    slug: 'utm-mistakes-killing-campaigns',
    title: '7 UTM Mistakes That Are Killing Your Campaign Data',
    description: 'Common UTM tracking errors and how to fix them for accurate analytics.',
    category: 'Best Practices',
    date: 'January 8, 2025',
    readTime: '8 min',
    featured: false,
    lang: 'en',
  },
  {
    slug: 'google-analytics-utm-setup',
    title: 'How to Set Up UTM Tracking in Google Analytics 4',
    description: 'Step-by-step guide to configure UTM parameters for GA4.',
    category: 'Tutorial',
    date: 'January 5, 2025',
    readTime: '10 min',
    featured: false,
    lang: 'en',
  },
  {
    slug: 'bitly-alternative-marketing-teams',
    title: 'Best Bitly Alternatives for Marketing Teams in 2025',
    description: 'Compare link management tools with UTM tracking built-in.',
    category: 'Comparison',
    date: 'January 3, 2025',
    readTime: '9 min',
    featured: false,
    lang: 'en',
  },
  // Existing German Posts
  {
    slug: 'utm-tracking-richtig-einrichten-2026',
    title: 'UTM-Tracking richtig einrichten: Der komplette Guide',
    description: 'Alles was du über UTM-Parameter wissen musst.',
    category: 'Guide',
    date: '12. Januar 2025',
    readTime: '12 Min.',
    featured: false,
    lang: 'de',
  },
  {
    slug: 'utm-fehler-kampagnen-sabotieren',
    title: '7 UTM-Fehler, die deine Kampagnen sabotieren',
    description: 'Häufige Tracking-Fehler und wie du sie vermeidest.',
    category: 'Best Practices',
    date: '10. Januar 2025',
    readTime: '8 Min.',
    featured: false,
    lang: 'de',
  },
]

export default function BlogIndex() {
  const featuredPosts = posts.filter(p => p.featured)
  const allPosts = posts

  return (
    <div className="min-h-screen bg-midnight-900 text-white">
      {/* Header */}
      <header className="border-b border-midnight-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-camp-400">CampKit</Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-midnight-400 hover:text-white text-sm">Home</Link>
            <Link href="/signup" className="px-4 py-2 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg text-sm">
              Start Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-6 border-b border-midnight-800">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            UTM Tracking & Analytics Blog
          </h1>
          <p className="text-xl text-midnight-300 max-w-2xl mx-auto">
            Guides, Best Practices und Tipps für besseres Kampagnen-Tracking. 
            Lerne wie du deine Marketing-Daten optimierst.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-8">Featured</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group p-6 bg-gradient-to-b from-midnight-800/50 to-midnight-800/30 rounded-2xl border border-midnight-700/50 hover:border-camp-500/50 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-camp-500/10 text-camp-400 text-xs rounded-full">{post.category}</span>
                  <span className="text-midnight-500 text-xs">{post.lang.toUpperCase()}</span>
                </div>
                <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-camp-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-midnight-400 text-sm mb-4 line-clamp-2">
                  {post.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-midnight-500">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-12 px-6 bg-midnight-800/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-8">Alle Artikel</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {allPosts.map((post) => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex gap-4 p-4 bg-midnight-800/30 rounded-xl hover:bg-midnight-800/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-midnight-700 text-midnight-300 text-xs rounded">{post.category}</span>
                    <span className="text-midnight-600 text-xs">{post.lang.toUpperCase()}</span>
                  </div>
                  <h3 className="font-semibold mb-1 group-hover:text-camp-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-midnight-400 text-sm line-clamp-1">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-midnight-500 mt-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold mb-4">
            Bereit für besseres UTM-Tracking?
          </h2>
          <p className="text-midnight-400 mb-6">
            Erstelle konsistente UTM-Links, bekomme automatische Kurzlinks und sieh Klick-Analytics in Echtzeit.
          </p>
          <Link 
            href="/signup" 
            className="inline-flex px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-all"
          >
            Kostenlos starten →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-midnight-800 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-midnight-500 text-sm">© 2025 CampKit. Made in Germany 🇩🇪</p>
          <div className="flex items-center gap-6 text-sm text-midnight-400">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/imprint" className="hover:text-white">Impressum</Link>
            <Link href="/privacy" className="hover:text-white">Datenschutz</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
