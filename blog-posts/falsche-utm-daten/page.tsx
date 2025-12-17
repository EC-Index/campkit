import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Falsche UTM-Daten? 7 Gründe und wie du sie behebst | CampKit',
  description: 'Deine UTM-Daten in Google Analytics stimmen nicht? Hier sind die 7 häufigsten Ursachen für fehlerhafte UTM-Tracking-Daten und wie du sie löst.',
  keywords: 'falsche UTM Daten, UTM tracking Fehler, UTM Probleme Analytics, UTM funktioniert nicht',
  openGraph: {
    title: 'Falsche UTM-Daten? 7 Gründe und wie du sie behebst',
    description: 'Deine UTM-Daten in Google Analytics stimmen nicht? Hier sind die häufigsten Ursachen.',
    type: 'article',
    publishedTime: '2025-01-15',
    authors: ['CampKit Team'],
  },
  alternates: {
    canonical: 'https://getcampkit.com/blog/falsche-utm-daten',
  },
}

export default function FalscheUTMDaten() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Falsche UTM-Daten? 7 Gründe und wie du sie behebst',
    description: 'Deine UTM-Daten in Google Analytics stimmen nicht? Hier sind die häufigsten Ursachen.',
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
          <li className="text-white">Falsche UTM-Daten</li>
        </ol>
      </nav>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-8">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-red-500/10 text-red-400 text-sm rounded-full">Troubleshooting</span>
            <span className="text-midnight-500 text-sm">15. Januar 2025 · 9 Min. Lesezeit</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            Falsche UTM-Daten? 7 Gründe und wie du sie behebst
          </h1>
          <p className="text-xl text-midnight-300 leading-relaxed">
            Du siehst seltsame Werte in deinen UTM-Reports? Traffic wird falsch zugeordnet? Hier sind die 7 häufigsten Ursachen für fehlerhafte UTM-Daten – und wie du sie löst.
          </p>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          
          <h2 className="font-display text-2xl font-bold mt-12 mb-4">1. Inkonsistente Groß-/Kleinschreibung</h2>
          <p className="text-midnight-300 mb-4">
            <strong className="text-white">Das häufigste Problem.</strong> Google Analytics unterscheidet zwischen Groß- und Kleinschreibung. "Facebook", "facebook" und "FACEBOOK" erscheinen als drei verschiedene Quellen.
          </p>
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-6">
            <p className="font-semibold text-red-400 mb-2">❌ Problem:</p>
            <div className="font-mono text-sm text-midnight-300 space-y-1">
              <p>utm_source=Facebook → 1.200 Sitzungen</p>
              <p>utm_source=facebook → 800 Sitzungen</p>
              <p>utm_source=fb → 400 Sitzungen</p>
            </div>
            <p className="text-midnight-400 text-sm mt-3">→ Eigentlich 2.400 Sitzungen von einer Quelle, aber auf 3 verteilt</p>
          </div>
          <div className="bg-camp-500/10 border border-camp-500/20 rounded-xl p-6 mb-6">
            <p className="font-semibold text-camp-400 mb-2">✓ Lösung:</p>
            <p className="text-midnight-300">Definiere eine klare <Link href="/blog/utm-namenskonventionen" className="text-camp-400 hover:underline">Namenskonvention</Link> und verwende immer Kleinschreibung. Nutze ein Tool wie CampKit mit Templates, um Konsistenz zu erzwingen.</p>
          </div>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">2. UTM-Parameter auf internen Links</h2>
          <p className="text-midnight-300 mb-4">
            Ein klassischer Fehler: UTM-Parameter auf Links innerhalb deiner eigenen Website. Das überschreibt die ursprüngliche Traffic-Quelle und verfälscht deine Daten komplett.
          </p>
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-6">
            <p className="font-semibold text-red-400 mb-2">❌ Problem:</p>
            <p className="text-midnight-300 text-sm">User kommt über Google Ads → Klickt auf internen Banner mit UTM → Wird plötzlich als "banner_promo" gezählt statt "google/cpc"</p>
          </div>
          <div className="bg-camp-500/10 border border-camp-500/20 rounded-xl p-6 mb-6">
            <p className="font-semibold text-camp-400 mb-2">✓ Lösung:</p>
            <p className="text-midnight-300">Verwende UTM-Parameter <strong className="text-white">niemals</strong> auf internen Links. Für internes Tracking nutze stattdessen Event-Tracking oder Content-Groups in GA4.</p>
          </div>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">3. Redirects entfernen UTM-Parameter</h2>
          <p className="text-midnight-300 mb-4">
            Manche URL-Weiterleitungen (301/302 Redirects) entfernen Query-Parameter – inklusive deiner UTM-Tags. Das passiert oft bei:
          </p>
          <ul className="space-y-2 text-midnight-300 mb-6">
            <li>• HTTP → HTTPS Redirects</li>
            <li>• www → non-www Redirects</li>
            <li>• Trailing-Slash Redirects (/page → /page/)</li>
            <li>• Alte URL → Neue URL Redirects</li>
          </ul>
          <div className="bg-camp-500/10 border border-camp-500/20 rounded-xl p-6 mb-6">
            <p className="font-semibold text-camp-400 mb-2">✓ Lösung:</p>
            <p className="text-midnight-300">Teste deine Links mit UTM-Parametern. Stelle sicher, dass alle Redirects Query-Parameter beibehalten. Verwende die finale URL direkt in deinen Kampagnen.</p>
          </div>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">4. Link-Verkürzer streifen Parameter</h2>
          <p className="text-midnight-300 mb-4">
            Einige Link-Shortener (besonders ältere oder kostenlose) entfernen UTM-Parameter beim Redirect. Andere fügen ihre eigenen Parameter hinzu.
          </p>
          <div className="bg-camp-500/10 border border-camp-500/20 rounded-xl p-6 mb-6">
            <p className="font-semibold text-camp-400 mb-2">✓ Lösung:</p>
            <p className="text-midnight-300">Teste deinen Link-Shortener mit UTM-Parametern. Oder nutze einen integrierten Shortener wie in <Link href="/" className="text-camp-400 hover:underline">CampKit</Link>, der UTM-Parameter garantiert beibehält.</p>
          </div>

          {/* CTA Box */}
          <div className="bg-gradient-to-r from-camp-500/10 to-camp-600/10 border border-camp-500/20 rounded-2xl p-8 my-12">
            <h3 className="font-display text-xl font-bold mb-3">UTM-Links die funktionieren</h3>
            <p className="text-midnight-300 mb-4">
              CampKit erstellt UTM-Links mit integrierten Kurzlinks – garantiert ohne Parameter-Verlust. Plus Templates für konsistente Benennung.
            </p>
            <Link 
              href="/signup" 
              className="inline-flex px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-all"
            >
              Kostenlos starten →
            </Link>
          </div>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">5. Social Media Plattformen modifizieren URLs</h2>
          <p className="text-midnight-300 mb-4">
            Facebook, LinkedIn und andere Plattformen fügen oft eigene Tracking-Parameter hinzu oder kürzen URLs automatisch. Das kann zu Konflikten führen.
          </p>
          <div className="bg-midnight-800/50 rounded-xl p-6 mb-6">
            <p className="text-midnight-500 mb-2">Beispiel Facebook:</p>
            <p className="font-mono text-sm text-midnight-300 break-all">
              Original: ?utm_source=facebook&utm_medium=social<br/>
              Facebook fügt hinzu: &fbclid=IwAR3...
            </p>
          </div>
          <div className="bg-camp-500/10 border border-camp-500/20 rounded-xl p-6 mb-6">
            <p className="font-semibold text-camp-400 mb-2">✓ Lösung:</p>
            <p className="text-midnight-300">Das ist meist kein Problem – die Parameter existieren nebeneinander. Stelle aber sicher, dass deine Ziel-URL mit mehreren Parametern umgehen kann.</p>
          </div>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">6. Doppelte Fragezeichen in der URL</h2>
          <p className="text-midnight-300 mb-4">
            Wenn deine Ziel-URL bereits Query-Parameter hat und du UTM-Parameter mit einem weiteren "?" anhängst, bricht der Link.
          </p>
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-6">
            <p className="font-semibold text-red-400 mb-2">❌ Falsch:</p>
            <p className="font-mono text-sm text-midnight-300 break-all">
              example.com/shop<span className="text-red-400">?category=shoes?</span>utm_source=google
            </p>
          </div>
          <div className="bg-camp-500/10 border border-camp-500/20 rounded-xl p-6 mb-6">
            <p className="font-semibold text-camp-400 mb-2">✓ Richtig:</p>
            <p className="font-mono text-sm text-midnight-300 break-all">
              example.com/shop?category=shoes<span className="text-camp-400">&</span>utm_source=google
            </p>
            <p className="text-midnight-400 text-sm mt-2">→ Verwende "&" für zusätzliche Parameter, nicht "?"</p>
          </div>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">7. GA4 Filter oder Referral Exclusions</h2>
          <p className="text-midnight-300 mb-4">
            Manchmal liegt das Problem nicht bei den UTM-Links, sondern bei der GA4-Konfiguration:
          </p>
          <ul className="space-y-3 text-midnight-300 mb-6">
            <li>• <strong className="text-white">Referral Exclusion:</strong> Wenn du Payment-Provider oder Auth-Domains ausschließt, können Sessions falsch zugeordnet werden</li>
            <li>• <strong className="text-white">Datenfilter:</strong> Interne Traffic-Filter können echte Kampagnen-Daten ausschließen</li>
            <li>• <strong className="text-white">Attribution-Settings:</strong> Das Attributionsmodell beeinflusst, wie Conversions zugeordnet werden</li>
          </ul>
          <div className="bg-camp-500/10 border border-camp-500/20 rounded-xl p-6 mb-6">
            <p className="font-semibold text-camp-400 mb-2">✓ Lösung:</p>
            <p className="text-midnight-300">Überprüfe deine GA4-Einstellungen unter Verwaltung → Datenstreams → Weitere Tagging-Einstellungen. Stelle sicher, dass nur wirklich notwendige Domains ausgeschlossen sind.</p>
          </div>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Schnell-Check: Funktionieren deine UTMs?</h2>
          <p className="text-midnight-300 mb-4">
            Hier ist ein einfacher Test für deine UTM-Links:
          </p>
          <div className="bg-midnight-800 rounded-xl p-6 mb-8 border border-midnight-700">
            <ol className="space-y-4 text-midnight-300">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-camp-500 text-midnight-900 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                <div>
                  <p className="font-semibold text-white">Öffne den Link in einem Inkognito-Fenster</p>
                  <p className="text-sm">Verhindert Caching und bestehende Sessions</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-camp-500 text-midnight-900 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                <div>
                  <p className="font-semibold text-white">Prüfe die URL in der Adressleiste</p>
                  <p className="text-sm">Sind alle UTM-Parameter noch vorhanden?</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-camp-500 text-midnight-900 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                <div>
                  <p className="font-semibold text-white">Checke GA4 Realtime</p>
                  <p className="text-sm">Berichte → Echtzeit → Scroll zu "Nutzer nach erstem Nutzermedium"</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-camp-500 text-midnight-900 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                <div>
                  <p className="font-semibold text-white">Verifiziere die Zuordnung</p>
                  <p className="text-sm">Dein Test-Besuch sollte mit den richtigen UTM-Werten erscheinen</p>
                </div>
              </li>
            </ol>
          </div>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Bestehende Daten bereinigen</h2>
          <p className="text-midnight-300 mb-4">
            Du kannst historische Daten in GA4 nicht ändern, aber du kannst für bessere zukünftige Daten sorgen:
          </p>
          <ul className="space-y-2 text-midnight-300 mb-6">
            <li>✓ Dokumentiere eine klare <Link href="/blog/utm-namenskonventionen" className="text-camp-400 hover:underline">Namenskonvention</Link></li>
            <li>✓ Nutze Templates in CampKit für einheitliche Links</li>
            <li>✓ Aktualisiere alle aktiven Kampagnen mit korrekten UTMs</li>
            <li>✓ Erstelle ein Custom Report das ähnliche Quellen gruppiert</li>
          </ul>

          <h2 className="font-display text-2xl font-bold mt-12 mb-4">Fazit</h2>
          <p className="text-midnight-300 mb-4">
            Falsche UTM-Daten haben meist eine einfache Ursache: Inkonsistente Benennung, kaputte Redirects oder falsche Konfiguration. Mit klaren Standards und einem zentralen Tool zur Link-Verwaltung lassen sich die meisten Probleme vermeiden.
          </p>
          <p className="text-midnight-300">
            <Link href="/" className="text-camp-400 hover:underline">CampKit</Link> hilft dir dabei mit Templates, automatischen Kurzlinks und Klick-Analytics – damit du immer weißt, dass deine UTM-Links funktionieren.
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
            <Link href="/blog/utm-tracking-ga4" className="p-6 bg-midnight-800/50 rounded-xl hover:bg-midnight-800 transition-colors">
              <h4 className="font-semibold mb-2">UTM-Tracking für GA4</h4>
              <p className="text-midnight-400 text-sm">Komplette Anleitung für UTM-Parameter in Google Analytics 4.</p>
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
