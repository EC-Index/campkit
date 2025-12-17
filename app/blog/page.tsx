import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Blog | CampKit – UTM Tracking & Marketing Analytics',
  description: 'Tipps und Guides zu UTM-Tracking, Marketing-Attribution und Kampagnen-Analytics. Lerne, wie du deine Marketing-Links richtig trackst.',
  openGraph: {
    title: 'Blog | CampKit',
    description: 'Tipps und Guides zu UTM-Tracking, Marketing-Attribution und Kampagnen-Analytics.',
  },
}

const posts = [
  {
    slug: 'utm-tracking-richtig-einrichten-2026',
    title: 'Wie man UTM-Tracking in 2026 richtig einrichtet',
    excerpt: 'UTM-Tracking gehört zu den Grundlagen im Online-Marketing. So vermeidest du typische Fehler und richtest sauberes Tracking ein.',
    date: '17. Dezember 2024',
    readTime: '8 Min.',
  },
  {
    slug: 'utm-fehler-kampagnen-sabotieren',
    title: 'UTM-Fehler, die deine Kampagnen sabotieren',
    excerpt: 'Wenn Kampagnen schlecht performen, liegt das Problem oft im Tracking selbst. Die häufigsten UTM-Fehler und wie du sie vermeidest.',
    date: '17. Dezember 2024',
    readTime: '7 Min.',
  },
]

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-midnight-900 text-white">
      {/* Header */}
      <header className="border-b border-midnight-800 bg-midnight-900/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="CampKit" width={120} height={30} className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-white text-sm font-medium">Blog</Link>
            <Link href="/login" className="text-midnight-400 hover:text-white text-sm hidden sm:block">Login</Link>
            <Link href="/signup" className="px-4 py-2 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg text-sm">
              Kostenlos starten
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold mb-4">Blog</h1>
          <p className="text-midnight-400 text-lg">
            Tipps und Guides zu UTM-Tracking, Marketing-Attribution und Kampagnen-Analytics.
          </p>
        </div>

        {/* Posts */}
        <div className="space-y-8">
          {posts.map((post) => (
            <Link 
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-6 bg-midnight-800/30 border border-midnight-700/50 rounded-xl hover:border-camp-500/50 hover:bg-midnight-800/50 transition-all"
            >
              <div className="flex items-center gap-4 mb-3 text-sm text-midnight-500">
                <time>{post.date}</time>
                <span>•</span>
                <span>{post.readTime} Lesezeit</span>
              </div>
              <h2 className="font-display text-xl font-semibold mb-2 group-hover:text-camp-400">
                {post.title}
              </h2>
              <p className="text-midnight-400">
                {post.excerpt}
              </p>
              <span className="inline-block mt-4 text-camp-400 text-sm font-medium">
                Weiterlesen →
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-camp-500/10 to-camp-400/10 border border-camp-500/30 rounded-2xl text-center">
          <h3 className="font-display text-2xl font-bold mb-3">Bereit für besseres Tracking?</h3>
          <p className="text-midnight-400 mb-6">
            Mit CampKit erstellst du UTM-Links in Sekunden – inklusive Templates und Klick-Analytics.
          </p>
          <Link href="/signup" className="inline-block px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg">
            Jetzt kostenlos starten →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-midnight-800">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/"><Image src="/logo.png" alt="CampKit" width={120} height={30} className="h-8 w-auto" /></Link>
          <div className="flex items-center gap-6 text-sm text-midnight-400">
            <Link href="/impressum" className="hover:text-white">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-white">Datenschutz</Link>
            <Link href="/agb" className="hover:text-white">AGB</Link>
          </div>
          <p className="text-midnight-500 text-sm">© 2024 CampKit</p>
        </div>
      </footer>
    </div>
  )
}
