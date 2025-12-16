import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - CampKit | UTM Tracking & Campaign Analytics Tips',
  description: 'Learn how to track marketing campaigns effectively. Tips on UTM management, link analytics, and campaign attribution.',
}

const posts = [
  {
    slug: 'why-marketers-outgrow-bitly',
    title: 'Why Marketers Outgrow Bitly (And What to Use Instead)',
    description: 'Bitly is great for shortening links, but marketing teams need more: UTM tracking, campaign analytics, and team collaboration.',
    category: 'Marketing',
    categoryColor: 'blue',
    readTime: '8 min',
    date: 'Jan 15, 2024',
  },
  {
    slug: 'utm-tracking-without-spreadsheets',
    title: 'UTM Tracking Without Spreadsheets: A Better Way',
    description: 'Every marketing team eventually creates "the UTM spreadsheet." And every marketing team eventually hates it. Here\'s how to break free.',
    category: 'Tutorial',
    categoryColor: 'purple',
    readTime: '6 min',
    date: 'Jan 20, 2024',
  },
  {
    slug: 'track-campaigns-without-google-analytics',
    title: 'How to Track Marketing Campaigns Without Google Analytics',
    description: 'GA4 is powerful but complex. Learn simpler ways to track campaign performance with link-level analytics.',
    category: 'Strategy',
    categoryColor: 'orange',
    readTime: '7 min',
    date: 'Jan 25, 2024',
  },
]

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-midnight-900 text-white">
      {/* Header */}
      <header className="border-b border-midnight-800 bg-midnight-900/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center">
              <span className="text-midnight-900 font-bold text-lg">C</span>
            </div>
            <span className="font-display font-semibold text-lg">CampKit</span>
          </Link>
          <Link href="/signup" className="px-5 py-2.5 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-all">
            Try Free →
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-6 border-b border-midnight-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-4xl font-bold mb-4">Blog</h1>
          <p className="text-midnight-400 text-lg">
            Tips and strategies for tracking marketing campaigns effectively.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {posts.map((post) => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-6 rounded-2xl bg-midnight-800/30 border border-midnight-700/50 hover:border-midnight-600 transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 bg-${post.categoryColor}-500/20 text-${post.categoryColor}-400 text-xs font-medium rounded-full`}>
                    {post.category}
                  </span>
                  <span className="text-midnight-500 text-sm">{post.readTime}</span>
                  <span className="text-midnight-600">•</span>
                  <span className="text-midnight-500 text-sm">{post.date}</span>
                </div>
                <h2 className="font-display text-xl font-semibold mb-2 group-hover:text-camp-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-midnight-400 text-sm leading-relaxed">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 border-t border-midnight-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold mb-4">Ready to simplify your campaign tracking?</h2>
          <p className="text-midnight-400 mb-6">Try CampKit free — UTM builder, short links, and analytics in one place.</p>
          <Link href="/signup" className="inline-block px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-all">
            Start Free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-midnight-800">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center">
              <span className="text-midnight-900 font-bold">C</span>
            </div>
            <span className="font-display font-semibold">CampKit</span>
          </Link>
          <p className="text-midnight-500 text-sm">© 2024 CampKit</p>
        </div>
      </footer>
    </div>
  )
}
