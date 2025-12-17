import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'UTM vs. Auto-Tagging: Wann nutzt du was? | CampKit',
  description: 'UTM-Parameter oder Google Auto-Tagging? Lerne die Unterschiede und wann du welche Methode für dein Kampagnen-Tracking einsetzen solltest.',
  keywords: 'UTM vs Auto-Tagging, gclid, Google Ads Tracking, UTM Parameter Google Ads',
  openGraph: {
    title: 'UTM vs. Auto-Tagging: Wann nutzt du was?',
    description: 'UTM-Parameter oder Google Auto-Tagging? Lerne die Unterschiede.',
    type: 'article',
    publishedTime: '2025-01-15',
    authors: ['CampKit Team'],
  },
  alternates: {
    canonical: 'https://getcampkit.com/blog/utm-vs-auto-tagging',
  },
}

export default function UTMVsAutoTagging() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'UTM vs. Auto-Tagging: Wann nutzt du was?',
    description: 'UTM-Parameter oder Google Auto-Tagging? Lerne die Unterschiede.',
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
          <li className="text-white">UTM vs. Auto-Tagging</li>
        </ol>
      </nav>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-8">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-camp-500/10 text-camp-400 text-sm rounded-full">Google Ads</span>
            <span className="text-midnight-500 text-sm">15. Januar 2025 · 7 Min. Lesezeit</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            UTM vs. Auto-Tagging: Wann nutzt du was?
          </h1>
          <p className="text-xl text-midnight-300 leading-relaxed">
            Google Ads bietet Auto-Tagging mit gclid. Brauchst du trotzdem UTM-Parameter? Die kurze Antwort: Ja, aber nicht für alles. Hier ist der komplette Vergleich.
          </p>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          
          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Was ist Auto-Tagging?</h2>
          <p className="text-midnight-300 mb-4">
            Auto-Tagging ist eine Google Ads Funktion, die automatisch einen <code className="text-camp-400">gclid</code> (Google Click Identifier) Parameter an deine Anzeigen-URLs anhängt. Dieser Parameter ermöglicht es Google Analytics, detaillierte Informationen über Klicks aus Google Ads zu erfassen.
          </p>
          <div className="bg-midnight-800/50 rounded-xl p-4 mb-6 font-mono text-sm break-all">
            <p className="text-midnight-500 mb-2">Beispiel Auto-Tagging URL:</p>
            <p className="text-midnight-300">https://example.com/landingpage<span className="text-camp-400">?gclid=Cj0KCQiA...</span></p>
          </div>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Was sind UTM-Parameter?</h2>
          <p className="text-midnight-300 mb-4">
            UTM-Parameter sind manuelle Tags, die du selbst an URLs anhängst. Sie funktionieren mit jedem Analytics-Tool und für jede Traffic-Quelle – nicht nur Google Ads.
          </p>
          <div className="bg-midnight-800/50 rounded-xl p-4 mb-6 font-mono text-sm break-all">
            <p className="text-midnight-500 mb-2">Beispiel UTM URL:</p>
            <p className="text-midnight-300">https://example.com/landingpage<span className="text-camp-400">?utm_source=google&utm_medium=cpc&utm_campaign=spring_sale</span></p>
          </div>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Der direkte Vergleich</h2>
          
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-midnight-700">
                  <th className="text-left py-3 px-4 font-semibold">Eigenschaft</th>
                  <th className="text-left py-3 px-4 font-semibold text-camp-400">Auto-Tagging (gclid)</th>
                  <th className="text-left py-3 px-4 font-semibold text-blue-400">UTM-Parameter</th>
                </tr>
              </thead>
              <tbody className="text-midnight-300">
                <tr className="border-b border-midnight-800">
                  <td className="py-3 px-4">Funktioniert mit</td>
                  <td className="py-3 px-4">Nur Google Ads</td>
                  <td className="py-3 px-4">Alle Plattformen</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-3 px-4">Analytics-Kompatibilität</td>
                  <td className="py-3 px-4">Google Analytics</td>
                  <td className="py-3 px-4">Alle Analytics-Tools</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-3 px-4">Setup</td>
                  <td className="py-3 px-4">Automatisch</td>
                  <td className="py-3 px-4">Manuell</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-3 px-4">Detailgrad</td>
                  <td className="py-3 px-4">Sehr detailliert (Keyword, Ad, etc.)</td>
                  <td className="py-3 px-4">Flexibel definierbar</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-3 px-4">Lesbarkeit</td>
                  <td className="py-3 px-4">Kryptischer Code</td>
                  <td className="py-3 px-4">Menschenlesbar</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Cross-Platform Reporting</td>
                  <td className="py-3 px-4">Nein</td>
                  <td className="py-3 px-4">Ja</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Wann nur Auto-Tagging reicht</h2>
          <p className="text-midnight-300 mb-4">
            Auto-Tagging ist ausreichend, wenn:
          </p>
          <ul className="space-y-2 text-midnight-300 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-camp-400">✓</span>
              <span>Du <strong className="text-white">nur Google Ads</strong> als bezahlten Kanal nutzt</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-camp-400">✓</span>
              <span>Du <strong className="text-white">nur Google Analytics</strong> für Reporting verwendest</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-camp-400">✓</span>
              <span>Du die <strong className="text-white">Google Ads Berichte</strong> in GA4 nutzen willst</span>
            </li>
          </ul>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Wann du UTM-Parameter brauchst</h2>
          <p className="text-midnight-300 mb-4">
            UTM-Parameter sind notwendig für:
          </p>
          <ul className="space-y-2 text-midnight-300 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">→</span>
              <span><strong className="text-white">Facebook, LinkedIn, TikTok Ads</strong> — Kein Auto-Tagging verfügbar</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">→</span>
              <span><strong className="text-white">E-Mail-Marketing</strong> — Newsletter, Automations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">→</span>
              <span><strong className="text-white">Organische Social Posts</strong> — Instagram, LinkedIn, Twitter</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">→</span>
              <span><strong className="text-white">Affiliate & Partner Links</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">→</span>
              <span><strong className="text-white">QR-Codes</strong> für Print-Materialien</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">→</span>
              <span><strong className="text-white">Cross-Platform Vergleiche</strong> — Alle Kanäle in einem Report</span>
            </li>
          </ul>

          {/* CTA Box */}
          <div className="bg-gradient-to-r from-camp-500/10 to-camp-600/10 border border-camp-500/20 rounded-2xl p-8 my-12">
            <h3 className="font-display text-xl font-bold mb-3">UTM-Links schnell erstellen</h3>
            <p className="text-midnight-300 mb-4">
              Mit CampKit erstellst du konsistente UTM-Links für alle Kanäle in Sekunden. Mit Templates, Kurzlinks und Klick-Analytics.
            </p>
            <Link 
              href="/signup" 
              className="inline-flex px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-all"
            >
              Kostenlos starten →
            </Link>
          </div>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Beide zusammen nutzen?</h2>
          <p className="text-midnight-300 mb-4">
            Ja, du kannst Auto-Tagging und UTM-Parameter gleichzeitig verwenden. Google empfiehlt diese Einstellung:
          </p>
          <div className="bg-midnight-800/50 rounded-xl p-6 mb-6">
            <p className="font-semibold text-white mb-3">In Google Analytics 4:</p>
            <ol className="space-y-2 text-midnight-300 text-sm">
              <li>1. Gehe zu Verwaltung → Datenstreams</li>
              <li>2. Wähle deinen Web-Stream</li>
              <li>3. Klicke auf "Google Ads-Verknüpfungen"</li>
              <li>4. Aktiviere "Manuelle Tagging-Werte zulassen (UTM)"</li>
            </ol>
          </div>
          <p className="text-midnight-300 mb-6">
            So bekommst du die detaillierten Google Ads Daten UND kannst UTM-Parameter für einheitliches Cross-Channel Reporting nutzen.
          </p>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Best Practice: Hybride Strategie</h2>
          <p className="text-midnight-300 mb-4">
            Die beste Lösung für die meisten Marketing-Teams:
          </p>
          <div className="bg-midnight-800 rounded-xl p-6 mb-8 border border-midnight-700">
            <ul className="space-y-4 text-midnight-300">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-camp-500 text-midnight-900 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                <div>
                  <p className="font-semibold text-white">Auto-Tagging aktiv lassen</p>
                  <p className="text-sm">Für maximale Google Ads Details in GA4</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-camp-500 text-midnight-900 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                <div>
                  <p className="font-semibold text-white">UTM für Google Ads hinzufügen</p>
                  <p className="text-sm">Für Cross-Channel Vergleiche und andere Tools</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-camp-500 text-midnight-900 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                <div>
                  <p className="font-semibold text-white">UTM für alle anderen Kanäle</p>
                  <p className="text-sm">Facebook, LinkedIn, E-Mail, Social, etc.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-camp-500 text-midnight-900 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                <div>
                  <p className="font-semibold text-white">Einheitliche <Link href="/blog/utm-namenskonventionen" className="text-camp-400 hover:underline">Namenskonventionen</Link></p>
                  <p className="text-sm">Gleiche Werte über alle Plattformen</p>
                </div>
              </li>
            </ul>
          </div>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Häufige Fehler</h2>
          <ul className="space-y-3 text-midnight-300 mb-6">
            <li>❌ <strong className="text-white">Nur auf Auto-Tagging verlassen</strong> — Du verlierst alle Nicht-Google Kanäle</li>
            <li>❌ <strong className="text-white">Auto-Tagging deaktivieren</strong> — Du verlierst wertvolle Google Ads Details</li>
            <li>❌ <strong className="text-white">Verschiedene utm_source für Google Ads</strong> — "google" vs "adwords" vs "google_ads"</li>
            <li>❌ <strong className="text-white">UTM auf Landing Pages vergessen</strong> — Speziell bei Display Kampagnen</li>
          </ul>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Fazit</h2>
          <p className="text-midnight-300 mb-4">
            Auto-Tagging und UTM-Parameter sind keine Konkurrenten – sie ergänzen sich. Nutze Auto-Tagging für detaillierte Google Ads Insights und UTM-Parameter für einheitliches Cross-Channel Tracking.
          </p>
          <p className="text-midnight-300">
            Mit einem Tool wie <Link href="/" className="text-camp-400 hover:underline">CampKit</Link> kannst du UTM-Links für alle Kanäle zentral verwalten und sicherstellen, dass deine Namenskonventionen konsistent bleiben.
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
            <Link href="/blog/utm-tracking-ga4" className="p-6 bg-midnight-800/50 rounded-xl hover:bg-midnight-800 transition-colors">
              <h4 className="font-semibold mb-2">UTM-Tracking für GA4</h4>
              <p className="text-midnight-400 text-sm">Komplette Anleitung für UTM-Parameter in Google Analytics 4.</p>
            </Link>
            <Link href="/blog/utm-namenskonventionen" className="p-6 bg-midnight-800/50 rounded-xl hover:bg-midnight-800 transition-colors">
              <h4 className="font-semibold mb-2">UTM-Namenskonventionen</h4>
              <p className="text-midnight-400 text-sm">Best Practices für konsistente UTM-Parameter im Team.</p>
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
