import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'UTM-Fehler, die deine Kampagnen sabotieren | CampKit',
  description: 'Die häufigsten UTM-Tracking-Fehler und wie du sie vermeidest: uneinheitliche Schreibweise, kreative Namen, manuelles Erstellen und mehr.',
  keywords: 'UTM Fehler, UTM Tracking Probleme, Kampagnen Tracking Fehler, Google Analytics UTM, Marketing Attribution Fehler',
  openGraph: {
    title: 'UTM-Fehler, die deine Kampagnen sabotieren',
    description: 'Die häufigsten UTM-Tracking-Fehler und wie du sie vermeidest.',
    type: 'article',
    publishedTime: '2024-12-17T00:00:00.000Z',
    authors: ['CampKit'],
    url: 'https://getcampkit.com/blog/utm-fehler-kampagnen-sabotieren',
  },
  alternates: {
    canonical: 'https://getcampkit.com/blog/utm-fehler-kampagnen-sabotieren',
  },
}

export default function BlogPost() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'UTM-Fehler, die deine Kampagnen sabotieren',
    description: 'Wenn Kampagnen schlecht performen, liegt das Problem oft im Tracking selbst. Die häufigsten UTM-Fehler und wie du sie vermeidest.',
    author: {
      '@type': 'Organization',
      name: 'CampKit',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CampKit',
      logo: {
        '@type': 'ImageObject',
        url: 'https://getcampkit.com/logo.png',
      },
    },
    datePublished: '2024-12-17',
    dateModified: '2024-12-17',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://getcampkit.com/blog/utm-fehler-kampagnen-sabotieren',
    },
  }

  return (
    <div className="min-h-screen bg-midnight-900 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Header */}
      <header className="border-b border-midnight-800 bg-midnight-900/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="CampKit" width={120} height={30} className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-midnight-400 hover:text-white text-sm">Blog</Link>
            <Link href="/login" className="text-midnight-400 hover:text-white text-sm hidden sm:block">Login</Link>
            <Link href="/signup" className="px-4 py-2 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg text-sm">
              Kostenlos starten
            </Link>
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-midnight-500">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/blog" className="hover:text-white">Blog</Link>
          <span className="mx-2">›</span>
          <span className="text-midnight-300">UTM-Fehler vermeiden</span>
        </nav>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-6 text-sm text-midnight-400">
          <time dateTime="2024-12-17">17. Dezember 2024</time>
          <span>•</span>
          <span>7 Min. Lesezeit</span>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          UTM-Fehler, die deine Kampagnen sabotieren
        </h1>

        {/* Intro */}
        <p className="text-xl text-midnight-300 mb-12 leading-relaxed">
          Wenn Kampagnen schlecht performen, wird oft zuerst am Creative, am Budget oder am Kanal gezweifelt. Dabei liegt das Problem in vielen Fällen ganz woanders: im Tracking selbst. Fehlerhafte UTM-Parameter können selbst gute Kampagnen wertlos machen, weil sie falsch oder gar nicht gemessen werden.
        </p>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          
          <h2 className="text-2xl font-display font-bold mt-12 mb-4">Fehler #1: Uneinheitliche Schreibweise</h2>
          
          <p>
            Einer der häufigsten Fehler ist uneinheitliche Schreibweise. Unterschiedliche Bezeichnungen für dieselbe Quelle sorgen dafür, dass Analytics die Daten aufsplittert. Was eigentlich ein starker Kanal ist, sieht plötzlich schwach aus, weil die Klicks auf mehrere Einträge verteilt werden.
          </p>

          <div className="not-prose my-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <p className="font-semibold text-red-400 mb-2">❌ Typisches Problem:</p>
            <p className="text-midnight-300 text-sm font-mono">
              utm_source=Google<br/>
              utm_source=google<br/>
              utm_source=google_ads<br/>
              utm_source=GoogleAds
            </p>
            <p className="text-midnight-400 text-sm mt-3">→ Analytics zählt das als 4 verschiedene Quellen</p>
          </div>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">Fehler #2: Kreative Kampagnennamen</h2>

          <p>
            Ein weiterer Klassiker sind kreative Kampagnennamen. Was im Team lustig klingt, ist in Reports oft unbrauchbar. Wenn Kampagnen nicht logisch benannt sind, lassen sie sich weder vergleichen noch langfristig auswerten.
          </p>

          <p>
            Spätestens nach ein paar Monaten weiß niemand mehr, wofür ein bestimmter Name eigentlich stand. Statt <code className="bg-midnight-800 px-2 py-1 rounded text-sm">super_duper_sale_yolo</code> lieber: <code className="bg-midnight-800 px-2 py-1 rounded text-sm">2024_q4_blackfriday_shoes</code>.
          </p>

          {/* CTA Box */}
          <div className="not-prose my-10 p-6 bg-camp-500/10 border border-camp-500/30 rounded-xl">
            <p className="font-semibold text-white mb-2">💡 Lösung: UTM-Templates nutzen</p>
            <p className="text-midnight-300 text-sm mb-4">
              Mit CampKit speicherst du UTM-Vorlagen und nutzt sie im Team. Keine Tippfehler, keine Inkonsistenzen.
            </p>
            <Link href="/signup" className="inline-block px-4 py-2 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg text-sm">
              Templates kostenlos testen →
            </Link>
          </div>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">Fehler #3: Manuelles Erstellen von UTM-Links</h2>

          <p>
            Auch das manuelle Erstellen von UTM-Links ist ein unterschätztes Risiko. Jeder zusätzliche Handgriff erhöht die Wahrscheinlichkeit für Tippfehler. Ein falsch geschriebener Parameter reicht aus, und die Kampagne taucht nicht dort auf, wo sie sollte.
          </p>

          <p>
            Das Budget ist dann zwar ausgegeben, aber die Daten fehlen. Im schlimmsten Fall werden Entscheidungen auf Basis unvollständiger Zahlen getroffen.
          </p>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">Fehler #4: Quelle und Medium vermischen</h2>

          <p>
            Viele Teams vermischen außerdem Quelle und Medium. Facebook, Instagram oder LinkedIn werden mal als Quelle, mal als Kanal definiert. Dadurch verlieren Auswertungen ihre Aussagekraft.
          </p>

          <p>
            <strong>Sauberes Tracking trennt klar:</strong>
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li><strong>utm_source</strong> = Woher kommt der Traffic? (z.B. <code className="bg-midnight-800 px-2 py-1 rounded text-sm">facebook</code>, <code className="bg-midnight-800 px-2 py-1 rounded text-sm">newsletter</code>)</li>
            <li><strong>utm_medium</strong> = Über welchen Kanal? (z.B. <code className="bg-midnight-800 px-2 py-1 rounded text-sm">cpc</code>, <code className="bg-midnight-800 px-2 py-1 rounded text-sm">email</code>, <code className="bg-midnight-800 px-2 py-1 rounded text-sm">social</code>)</li>
            <li><strong>utm_campaign</strong> = Welche Kampagne? (z.B. <code className="bg-midnight-800 px-2 py-1 rounded text-sm">blackfriday_2024</code>)</li>
          </ul>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">Fehler #5: Fehlendes Tracking bei „kleinen" Kampagnen</h2>

          <p>
            Besonders problematisch ist auch fehlendes Tracking bei internen oder „kleinen" Kampagnen. Newsletter-Links, PDFs oder QR-Codes werden oft ohne UTM-Parameter verteilt.
          </p>

          <p>
            Die Klicks landen dann im <strong>Direct Traffic</strong> und sind im Nachhinein nicht mehr zuzuordnen. Gerade diese „kleinen" Touchpoints summieren sich aber oft zu signifikanten Zahlen.
          </p>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">Fehler #6: Keine regelmäßige Kontrolle</h2>

          <p>
            Ein strukturelles Problem ist fehlende Verantwortung. UTMs werden einmal festgelegt und dann nie wieder überprüft. Fehler schleichen sich ein und bleiben monatelang unentdeckt.
          </p>

          <p>
            Wer Tracking ernst nimmt, kontrolliert regelmäßig die eigenen Daten. Ein monatlicher Check der Analytics-Quellen zeigt schnell, ob sich Inkonsistenzen eingeschlichen haben.
          </p>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">Das wahre Problem</h2>

          <p>
            Am Ende scheitert UTM-Tracking selten an der Technik. Es scheitert an fehlenden Regeln, fehlender Konsequenz und daran, dass Tracking als Nebensache betrachtet wird.
          </p>

          <p>
            Dabei entscheidet genau diese Struktur darüber, ob Marketingdaten Vertrauen verdienen oder nicht. Ohne sauberes Tracking gibt es keine sauberen Entscheidungen.
          </p>
        </div>

        {/* Checklist */}
        <div className="mt-12 p-6 bg-midnight-800/50 border border-midnight-700 rounded-xl">
          <h3 className="font-display font-semibold mb-4">✅ UTM-Fehler Checkliste</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><span className="text-camp-400">□</span> Einheitliche Kleinschreibung für alle Parameter</li>
            <li className="flex items-start gap-2"><span className="text-camp-400">□</span> Feste Begriffe für Quellen und Medien</li>
            <li className="flex items-start gap-2"><span className="text-camp-400">□</span> Logisches Namensschema für Kampagnen</li>
            <li className="flex items-start gap-2"><span className="text-camp-400">□</span> UTM-Templates statt manueller Eingabe</li>
            <li className="flex items-start gap-2"><span className="text-camp-400">□</span> Alle Links tracken – auch Newsletter & QR-Codes</li>
            <li className="flex items-start gap-2"><span className="text-camp-400">□</span> Monatliche Kontrolle der Analytics-Quellen</li>
          </ul>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-camp-500/10 to-camp-400/10 border border-camp-500/30 rounded-2xl text-center">
          <h3 className="font-display text-2xl font-bold mb-3">Schluss mit UTM-Chaos</h3>
          <p className="text-midnight-400 mb-6">
            CampKit hilft dir, UTM-Links konsistent zu erstellen. Mit Templates, automatischen Kurzlinks und Klick-Analytics.
          </p>
          <Link href="/signup" className="inline-block px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg">
            Jetzt kostenlos starten →
          </Link>
        </div>

        {/* Related */}
        <div className="mt-16 pt-8 border-t border-midnight-800">
          <h4 className="font-display font-semibold mb-4">Weiterlesen:</h4>
          <div className="space-y-3">
            <Link href="/blog/utm-tracking-richtig-einrichten-2026" className="block p-4 bg-midnight-800/50 rounded-lg hover:bg-midnight-800 transition-colors">
              <span className="text-camp-400">→</span> Wie man UTM-Tracking in 2026 richtig einrichtet
            </Link>
            <Link href="/de/lp/bitly-alternative" className="block p-4 bg-midnight-800/50 rounded-lg hover:bg-midnight-800 transition-colors">
              <span className="text-camp-400">→</span> CampKit: Die beste Bitly-Alternative für Marketing-Teams
            </Link>
          </div>
        </div>
      </article>

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
