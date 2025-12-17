import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'UTM-Tracking für GA4: Komplette Anleitung 2025 | CampKit',
  description: 'Lerne wie du UTM-Parameter in Google Analytics 4 richtig einrichtest und trackst. Schritt-für-Schritt Anleitung mit Best Practices für GA4.',
  keywords: 'UTM tracking GA4, Google Analytics 4 UTM, UTM Parameter GA4, GA4 Kampagnen tracking',
  openGraph: {
    title: 'UTM-Tracking für GA4: Komplette Anleitung 2025',
    description: 'Lerne wie du UTM-Parameter in Google Analytics 4 richtig einrichtest und trackst.',
    type: 'article',
    publishedTime: '2025-01-15',
    authors: ['CampKit Team'],
  },
  alternates: {
    canonical: 'https://getcampkit.com/blog/utm-tracking-ga4',
  },
}

export default function UTMTrackingGA4() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'UTM-Tracking für GA4: Komplette Anleitung 2025',
    description: 'Lerne wie du UTM-Parameter in Google Analytics 4 richtig einrichtest und trackst.',
    author: { '@type': 'Organization', name: 'CampKit' },
    publisher: { '@type': 'Organization', name: 'CampKit', logo: { '@type': 'ImageObject', url: 'https://getcampkit.com/logo.png' } },
    datePublished: '2025-01-15',
    dateModified: '2025-01-15',
  }

  return (
    <div className="min-h-screen bg-midnight-900 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* Header */}
      <header className="border-b border-midnight-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-camp-400">CampKit</Link>
          <Link href="/blog" className="text-midnight-400 hover:text-white">← Blog</Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-6 py-4">
        <ol className="flex items-center gap-2 text-sm text-midnight-400">
          <li><Link href="/" className="hover:text-white">Home</Link></li>
          <li>/</li>
          <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
          <li>/</li>
          <li className="text-white">UTM-Tracking für GA4</li>
        </ol>
      </nav>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-8">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-camp-500/10 text-camp-400 text-sm rounded-full">Google Analytics</span>
            <span className="text-midnight-500 text-sm">15. Januar 2025 · 10 Min. Lesezeit</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            UTM-Tracking für GA4: Komplette Anleitung 2025
          </h1>
          <p className="text-xl text-midnight-300 leading-relaxed">
            Google Analytics 4 verarbeitet UTM-Parameter anders als Universal Analytics. In dieser Anleitung zeigen wir dir genau, wie du UTM-Tracking für GA4 richtig einrichtest.
          </p>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          
          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Was hat sich mit GA4 geändert?</h2>
          <p className="text-midnight-300 mb-4">
            Mit dem Wechsel von Universal Analytics zu Google Analytics 4 hat sich einiges verändert. GA4 verwendet ein event-basiertes Datenmodell statt Sessions. Das bedeutet, dass UTM-Parameter jetzt anders verarbeitet und angezeigt werden.
          </p>
          <p className="text-midnight-300 mb-6">
            Die gute Nachricht: <strong className="text-white">UTM-Parameter funktionieren weiterhin</strong>. Du musst nur wissen, wo du die Daten findest und wie du sie richtig interpretierst.
          </p>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Die 5 UTM-Parameter in GA4</h2>
          <p className="text-midnight-300 mb-4">GA4 unterstützt die gleichen UTM-Parameter wie vorher:</p>
          
          <div className="bg-midnight-800/50 rounded-xl p-6 mb-6">
            <ul className="space-y-3 text-midnight-300">
              <li><strong className="text-camp-400">utm_source</strong> — Woher kommt der Traffic? (z.B. google, facebook, newsletter)</li>
              <li><strong className="text-camp-400">utm_medium</strong> — Welcher Kanal? (z.B. cpc, email, social)</li>
              <li><strong className="text-camp-400">utm_campaign</strong> — Welche Kampagne? (z.B. summer_sale_2025)</li>
              <li><strong className="text-camp-400">utm_term</strong> — Welches Keyword? (optional, für Paid Search)</li>
              <li><strong className="text-camp-400">utm_content</strong> — Welche Variante? (optional, für A/B Tests)</li>
            </ul>
          </div>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Wo findest du UTM-Daten in GA4?</h2>
          <p className="text-midnight-300 mb-4">
            In GA4 findest du deine UTM-Daten unter <strong className="text-white">Berichte → Akquisition → Traffic-Akquisition</strong>. Hier kannst du nach verschiedenen Dimensionen filtern:
          </p>
          
          <div className="bg-midnight-800/50 rounded-xl p-6 mb-6">
            <ul className="space-y-2 text-midnight-300">
              <li>• <strong className="text-white">Sitzung – Quelle</strong> entspricht utm_source</li>
              <li>• <strong className="text-white">Sitzung – Medium</strong> entspricht utm_medium</li>
              <li>• <strong className="text-white">Sitzung – Kampagne</strong> entspricht utm_campaign</li>
              <li>• <strong className="text-white">Sitzung – manuelle Anzeigeninhalte</strong> entspricht utm_content</li>
              <li>• <strong className="text-white">Sitzung – manuelles Keyword</strong> entspricht utm_term</li>
            </ul>
          </div>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Best Practices für UTM-Tracking in GA4</h2>
          
          <h3 className="font-display text-xl font-semibold mt-8 mb-3">1. Konsistente Kleinschreibung verwenden</h3>
          <p className="text-midnight-300 mb-4">
            GA4 unterscheidet zwischen Groß- und Kleinschreibung. "Facebook" und "facebook" werden als zwei verschiedene Quellen gezählt. Verwende immer Kleinschreibung für alle UTM-Parameter.
          </p>

          <h3 className="font-display text-xl font-semibold mt-8 mb-3">2. Keine Leerzeichen oder Sonderzeichen</h3>
          <p className="text-midnight-300 mb-4">
            Verwende Unterstriche (_) oder Bindestriche (-) statt Leerzeichen. Vermeide Sonderzeichen wie &amp;, %, oder #.
          </p>

          <h3 className="font-display text-xl font-semibold mt-8 mb-3">3. Einheitliche Namenskonventionen</h3>
          <p className="text-midnight-300 mb-4">
            Definiere eine klare <Link href="/blog/utm-namenskonventionen" className="text-camp-400 hover:underline">UTM-Namenskonvention</Link> für dein Team. Ohne einheitliche Standards wird deine GA4-Analyse schnell unübersichtlich.
          </p>

          <h3 className="font-display text-xl font-semibold mt-8 mb-3">4. UTM-Links zentral verwalten</h3>
          <p className="text-midnight-300 mb-6">
            Statt UTM-Links in Spreadsheets zu sammeln, nutze ein dediziertes Tool wie <Link href="/" className="text-camp-400 hover:underline">CampKit</Link>. So stellst du sicher, dass alle im Team die gleichen Konventionen verwenden.
          </p>

          {/* CTA Box */}
          <div className="bg-gradient-to-r from-camp-500/10 to-camp-600/10 border border-camp-500/20 rounded-2xl p-8 my-12">
            <h3 className="font-display text-xl font-bold mb-3">UTM-Tracking ohne Chaos</h3>
            <p className="text-midnight-300 mb-4">
              Mit CampKit erstellst du konsistente UTM-Links mit Templates, bekommst automatische Kurzlinks und siehst Klick-Analytics in Echtzeit.
            </p>
            <Link 
              href="/signup" 
              className="inline-flex px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-all"
            >
              Kostenlos starten →
            </Link>
          </div>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">GA4 Attribution: First Click vs. Last Click</h2>
          <p className="text-midnight-300 mb-4">
            Ein wichtiger Unterschied zu Universal Analytics: GA4 verwendet standardmäßig datengetriebene Attribution. Das bedeutet, dass nicht nur der letzte Klick vor einer Conversion gezählt wird, sondern der gesamte Customer Journey berücksichtigt wird.
          </p>
          <p className="text-midnight-300 mb-6">
            Du kannst das Attributionsmodell unter <strong className="text-white">Verwaltung → Attribution-Einstellungen</strong> anpassen.
          </p>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Häufige Fehler vermeiden</h2>
          <p className="text-midnight-300 mb-4">
            Bei der Arbeit mit UTM-Tracking in GA4 gibt es einige typische Fallstricke:
          </p>
          <ul className="space-y-2 text-midnight-300 mb-6">
            <li>❌ UTM-Parameter auf internen Links verwenden (verfälscht die Daten)</li>
            <li>❌ Unterschiedliche Schreibweisen für die gleiche Quelle</li>
            <li>❌ Zu lange oder komplizierte Kampagnennamen</li>
            <li>❌ UTM-Parameter vergessen bei bezahlten Kampagnen</li>
          </ul>
          <p className="text-midnight-300 mb-6">
            Mehr dazu findest du in unserem Artikel über <Link href="/blog/utm-fehler-kampagnen-sabotieren" className="text-camp-400 hover:underline">UTM-Fehler, die deine Kampagnen sabotieren</Link>.
          </p>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Fazit</h2>
          <p className="text-midnight-300 mb-4">
            UTM-Tracking in GA4 funktioniert im Kern genauso wie vorher. Die wichtigsten Unterschiede liegen in der Benutzeroberfläche und dem Attributionsmodell. Mit konsistenten Namenskonventionen und einem zentralen Tool zur Link-Verwaltung holst du das Maximum aus deinen UTM-Daten heraus.
          </p>

        </div>

        {/* Author */}
        <div className="mt-16 pt-8 border-t border-midnight-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-camp-500 rounded-full flex items-center justify-center text-midnight-900 font-bold">CK</div>
            <div>
              <p className="font-semibold">CampKit Team</p>
              <p className="text-midnight-500 text-sm">Marketing & Analytics Experten</p>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16">
          <h3 className="font-display text-xl font-bold mb-6">Weiterlesen</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/blog/utm-namenskonventionen" className="p-6 bg-midnight-800/50 rounded-xl hover:bg-midnight-800 transition-colors">
              <h4 className="font-semibold mb-2">UTM-Namenskonventionen</h4>
              <p className="text-midnight-400 text-sm">Best Practices für konsistente UTM-Parameter im Team.</p>
            </Link>
            <Link href="/blog/utm-vs-auto-tagging" className="p-6 bg-midnight-800/50 rounded-xl hover:bg-midnight-800 transition-colors">
              <h4 className="font-semibold mb-2">UTM vs. Auto-Tagging</h4>
              <p className="text-midnight-400 text-sm">Wann du UTM-Parameter nutzt und wann Auto-Tagging besser ist.</p>
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-midnight-800 mt-20 py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-midnight-500 text-sm">© 2025 CampKit. Made in Germany 🇩🇪</p>
          <div className="flex items-center gap-6 text-sm text-midnight-400">
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <Link href="/imprint" className="hover:text-white">Impressum</Link>
            <Link href="/privacy" className="hover:text-white">Datenschutz</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
