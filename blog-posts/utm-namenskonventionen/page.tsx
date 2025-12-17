import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'UTM-Namenskonventionen: Best Practices für Teams | CampKit',
  description: 'Lerne wie du einheitliche UTM-Namenskonventionen für dein Marketing-Team erstellst. Mit Vorlagen und Beispielen für konsistentes Kampagnen-Tracking.',
  keywords: 'UTM Namenskonvention, UTM naming convention, UTM best practices, UTM Template',
  openGraph: {
    title: 'UTM-Namenskonventionen: Best Practices für Teams',
    description: 'Lerne wie du einheitliche UTM-Namenskonventionen für dein Marketing-Team erstellst.',
    type: 'article',
    publishedTime: '2025-01-15',
    authors: ['CampKit Team'],
  },
  alternates: {
    canonical: 'https://getcampkit.com/blog/utm-namenskonventionen',
  },
}

export default function UTMNamingConventions() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'UTM-Namenskonventionen: Best Practices für Teams',
    description: 'Lerne wie du einheitliche UTM-Namenskonventionen für dein Marketing-Team erstellst.',
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
          <li className="text-white">UTM-Namenskonventionen</li>
        </ol>
      </nav>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-8">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-camp-500/10 text-camp-400 text-sm rounded-full">Best Practices</span>
            <span className="text-midnight-500 text-sm">15. Januar 2025 · 8 Min. Lesezeit</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            UTM-Namenskonventionen: Best Practices für Teams
          </h1>
          <p className="text-xl text-midnight-300 leading-relaxed">
            Ohne einheitliche UTM-Namenskonventionen wird deine Marketing-Analyse zum Chaos. In diesem Guide zeigen wir dir, wie du Standards für dein Team definierst.
          </p>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          
          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Warum sind UTM-Konventionen wichtig?</h2>
          <p className="text-midnight-300 mb-4">
            Stell dir vor: Drei Teammitglieder erstellen Links für die gleiche Facebook-Kampagne. Einer verwendet "facebook", ein anderer "Facebook", der dritte "fb". In Google Analytics hast du jetzt drei verschiedene Quellen – obwohl es eigentlich eine ist.
          </p>
          <p className="text-midnight-300 mb-6">
            Das Ergebnis: <strong className="text-white">Unbrauchbare Daten</strong>. Du kannst nicht mehr erkennen, welche Kanäle wirklich performen.
          </p>

          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-red-400 mb-3">❌ Beispiel ohne Konvention</h3>
            <div className="font-mono text-sm text-midnight-300 space-y-1">
              <p>utm_source=Facebook</p>
              <p>utm_source=facebook</p>
              <p>utm_source=fb</p>
              <p>utm_source=FB_Ads</p>
            </div>
            <p className="text-midnight-400 text-sm mt-3">→ 4 verschiedene Einträge in GA für dieselbe Quelle</p>
          </div>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Die goldenen Regeln für UTM-Naming</h2>

          <h3 className="font-display text-xl font-semibold mt-8 mb-3">1. Immer Kleinschreibung</h3>
          <p className="text-midnight-300 mb-4">
            Google Analytics unterscheidet zwischen Groß- und Kleinschreibung. "Email" und "email" sind zwei verschiedene Medien. Verwende konsequent Kleinbuchstaben.
          </p>
          <div className="bg-midnight-800/50 rounded-xl p-4 mb-6 font-mono text-sm">
            <p className="text-red-400">❌ utm_medium=Email</p>
            <p className="text-camp-400">✓ utm_medium=email</p>
          </div>

          <h3 className="font-display text-xl font-semibold mt-8 mb-3">2. Unterstriche statt Leerzeichen</h3>
          <p className="text-midnight-300 mb-4">
            Leerzeichen werden in URLs zu "%20" kodiert und machen Links unlesbar. Verwende Unterstriche (_) oder Bindestriche (-) als Trennzeichen.
          </p>
          <div className="bg-midnight-800/50 rounded-xl p-4 mb-6 font-mono text-sm">
            <p className="text-red-400">❌ utm_campaign=Summer Sale 2025</p>
            <p className="text-camp-400">✓ utm_campaign=summer_sale_2025</p>
          </div>

          <h3 className="font-display text-xl font-semibold mt-8 mb-3">3. Keine Sonderzeichen</h3>
          <p className="text-midnight-300 mb-4">
            Vermeide Zeichen wie &amp;, %, #, oder ?. Sie können URLs brechen oder falsch interpretiert werden.
          </p>

          <h3 className="font-display text-xl font-semibold mt-8 mb-3">4. Kurz aber aussagekräftig</h3>
          <p className="text-midnight-300 mb-6">
            UTM-Parameter sollten lesbar bleiben. "q1_promo" ist besser als "first_quarter_promotional_campaign_january_to_march".
          </p>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Empfohlene UTM-Werte</h2>

          <h3 className="font-display text-xl font-semibold mt-8 mb-3">utm_source — Traffic-Quelle</h3>
          <p className="text-midnight-300 mb-4">Definiere feste Werte für jede Plattform:</p>
          <div className="bg-midnight-800/50 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-midnight-500 mb-2">Social Media</p>
                <ul className="space-y-1 text-midnight-300">
                  <li><code className="text-camp-400">facebook</code></li>
                  <li><code className="text-camp-400">instagram</code></li>
                  <li><code className="text-camp-400">linkedin</code></li>
                  <li><code className="text-camp-400">twitter</code></li>
                  <li><code className="text-camp-400">tiktok</code></li>
                </ul>
              </div>
              <div>
                <p className="text-midnight-500 mb-2">Andere</p>
                <ul className="space-y-1 text-midnight-300">
                  <li><code className="text-camp-400">google</code></li>
                  <li><code className="text-camp-400">newsletter</code></li>
                  <li><code className="text-camp-400">partner_xyz</code></li>
                  <li><code className="text-camp-400">affiliate</code></li>
                  <li><code className="text-camp-400">podcast</code></li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="font-display text-xl font-semibold mt-8 mb-3">utm_medium — Marketing-Kanal</h3>
          <p className="text-midnight-300 mb-4">Halte dich an Google's Standard-Medien für bessere Reports:</p>
          <div className="bg-midnight-800/50 rounded-xl p-6 mb-6">
            <ul className="space-y-2 text-midnight-300 text-sm">
              <li><code className="text-camp-400">cpc</code> — Bezahlte Klicks (Google Ads, Facebook Ads)</li>
              <li><code className="text-camp-400">email</code> — E-Mail-Marketing</li>
              <li><code className="text-camp-400">social</code> — Organische Social Media Posts</li>
              <li><code className="text-camp-400">referral</code> — Partner-Links</li>
              <li><code className="text-camp-400">display</code> — Banner-Werbung</li>
              <li><code className="text-camp-400">video</code> — Video-Ads</li>
              <li><code className="text-camp-400">affiliate</code> — Affiliate-Marketing</li>
            </ul>
          </div>

          <h3 className="font-display text-xl font-semibold mt-8 mb-3">utm_campaign — Kampagnenname</h3>
          <p className="text-midnight-300 mb-4">Verwende ein einheitliches Format mit relevanten Infos:</p>
          <div className="bg-midnight-800/50 rounded-xl p-6 mb-6">
            <p className="text-midnight-500 mb-3">Empfohlenes Format:</p>
            <p className="font-mono text-camp-400 mb-4">[zeitraum]_[kampagnentyp]_[beschreibung]</p>
            <p className="text-midnight-500 mb-2">Beispiele:</p>
            <ul className="space-y-1 font-mono text-sm text-midnight-300">
              <li>q1_2025_spring_sale</li>
              <li>2025-01_product_launch_xyz</li>
              <li>always-on_retargeting_cart</li>
              <li>bf2025_black_friday</li>
            </ul>
          </div>

          {/* CTA Box */}
          <div className="bg-gradient-to-r from-camp-500/10 to-camp-600/10 border border-camp-500/20 rounded-2xl p-8 my-12">
            <h3 className="font-display text-xl font-bold mb-3">UTM-Templates für dein Team</h3>
            <p className="text-midnight-300 mb-4">
              Mit CampKit erstellst du wiederverwendbare Templates mit vordefinierten Werten. So kann niemand mehr "Facebook" statt "facebook" schreiben.
            </p>
            <Link 
              href="/signup" 
              className="inline-flex px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-all"
            >
              Kostenlos starten →
            </Link>
          </div>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Template: UTM-Konvention Dokument</h2>
          <p className="text-midnight-300 mb-4">
            Hier ist ein Beispiel für ein Konventions-Dokument, das du mit deinem Team teilen kannst:
          </p>

          <div className="bg-midnight-800 rounded-xl p-6 mb-8 border border-midnight-700">
            <h4 className="font-bold mb-4 text-lg">📋 [Firmenname] UTM-Konventionen</h4>
            <div className="space-y-4 text-sm text-midnight-300">
              <div>
                <p className="font-semibold text-white mb-1">Allgemeine Regeln:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Immer Kleinschreibung</li>
                  <li>Unterstriche als Trennzeichen</li>
                  <li>Keine Sonderzeichen</li>
                  <li>Alle Links über CampKit erstellen</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Erlaubte utm_source Werte:</p>
                <p>facebook, instagram, linkedin, google, newsletter, partner_[name]</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Erlaubte utm_medium Werte:</p>
                <p>cpc, email, social, referral, display</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">utm_campaign Format:</p>
                <p className="font-mono">[quartal]_[jahr]_[kampagnenname]</p>
              </div>
            </div>
          </div>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Häufige Fehler bei UTM-Naming</h2>
          <ul className="space-y-3 text-midnight-300 mb-6">
            <li>❌ <strong className="text-white">Inkonsistente Schreibweisen</strong> — "Email" vs "email" vs "e-mail"</li>
            <li>❌ <strong className="text-white">Zu viele Varianten</strong> — "fb", "facebook", "Facebook", "fb_ads"</li>
            <li>❌ <strong className="text-white">Fehlende Dokumentation</strong> — Niemand weiß, was "camp_q1_v2" bedeutet</li>
            <li>❌ <strong className="text-white">Kein zentrales Tool</strong> — Jeder erstellt Links anders</li>
          </ul>
          <p className="text-midnight-300 mb-6">
            Mehr dazu: <Link href="/blog/utm-fehler-kampagnen-sabotieren" className="text-camp-400 hover:underline">UTM-Fehler, die deine Kampagnen sabotieren</Link>
          </p>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Fazit</h2>
          <p className="text-midnight-300 mb-4">
            Einheitliche UTM-Namenskonventionen sind der Schlüssel zu sauberen Marketing-Daten. Definiere klare Regeln, dokumentiere sie, und verwende ein Tool wie <Link href="/" className="text-camp-400 hover:underline">CampKit</Link>, das diese Regeln automatisch durchsetzt.
          </p>
          <p className="text-midnight-300">
            So sparst du nicht nur Zeit bei der Analyse, sondern triffst auch bessere Marketing-Entscheidungen.
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
            <Link href="/blog/falsche-utm-daten" className="p-6 bg-midnight-800/50 rounded-xl hover:bg-midnight-800 transition-colors">
              <h4 className="font-semibold mb-2">Warum sehe ich falsche UTM-Daten?</h4>
              <p className="text-midnight-400 text-sm">Die häufigsten Gründe für fehlerhafte UTM-Tracking-Daten.</p>
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
