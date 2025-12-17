import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'UTM-Tracking richtig einrichten (2026 Guide) | CampKit',
  description: 'Lerne, wie du UTM-Parameter in 2026 richtig einsetzt. Standardisierung, einheitliche Schreibweise und Vorlagen für fehlerfreies Kampagnen-Tracking.',
  keywords: 'UTM Tracking, UTM Parameter, Kampagnen Tracking, Google Analytics UTM, Marketing Attribution, UTM Best Practices',
  openGraph: {
    title: 'UTM-Tracking richtig einrichten (2026 Guide)',
    description: 'So setzt du UTM-Parameter richtig ein: Standardisierung, einheitliche Schreibweise und Vorlagen für fehlerfreies Tracking.',
    type: 'article',
    publishedTime: '2024-12-17T00:00:00.000Z',
    authors: ['CampKit'],
    url: 'https://getcampkit.com/blog/utm-tracking-richtig-einrichten-2026',
  },
  alternates: {
    canonical: 'https://getcampkit.com/blog/utm-tracking-richtig-einrichten-2026',
  },
}

export default function BlogPost() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Wie man UTM-Tracking in 2026 richtig einrichtet',
    description: 'UTM-Tracking gehört zu den Grundlagen im Online-Marketing. So vermeidest du typische Fehler und richtest sauberes Tracking ein.',
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
      '@id': 'https://getcampkit.com/blog/utm-tracking-richtig-einrichten-2026',
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
          <span className="text-midnight-300">UTM-Tracking einrichten</span>
        </nav>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-6 text-sm text-midnight-400">
          <time dateTime="2024-12-17">17. Dezember 2024</time>
          <span>•</span>
          <span>8 Min. Lesezeit</span>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          Wie man UTM-Tracking in 2026 richtig einrichtet
        </h1>

        {/* Intro */}
        <p className="text-xl text-midnight-300 mb-12 leading-relaxed">
          UTM-Tracking gehört zu den Grundlagen im Online-Marketing. Trotzdem sind die Daten in vielen Analytics-Konten auch 2026 noch unbrauchbar. Nicht, weil UTM-Parameter kompliziert wären – sondern weil sie falsch, uneinheitlich oder gar nicht genutzt werden.
        </p>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <p>
            Das Grundproblem ist einfach: UTM-Parameter sind frei definierbar. Jeder kann sie anders benennen. Genau das führt in wachsenden Teams schnell zu Chaos. Ein Kanal wird plötzlich mehrfach gezählt, Kampagnen lassen sich nicht mehr vergleichen und wichtige Entscheidungen basieren auf falschen Zahlen.
          </p>

          <p>
            Dabei ist sauberes UTM-Tracking heute wichtiger denn je. Marketing läuft über immer mehr Kanäle gleichzeitig: Suchmaschinen, Social Ads, Newsletter, Partnerlinks, QR-Codes oder Influencer. Ohne klare Struktur verlieren diese Touchpoints ihre Aussagekraft.
          </p>

          {/* CTA Box */}
          <div className="not-prose my-10 p-6 bg-camp-500/10 border border-camp-500/30 rounded-xl">
            <p className="font-semibold text-white mb-2">💡 Tipp: UTM-Links automatisch erstellen</p>
            <p className="text-midnight-300 text-sm mb-4">
              Mit CampKit erstellst du UTM-Links in Sekunden – inklusive Templates, Kurzlinks und Klick-Analytics.
            </p>
            <Link href="/signup" className="inline-block px-4 py-2 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg text-sm">
              Jetzt kostenlos testen →
            </Link>
          </div>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">Regel #1: Standardisierung vor Kreativität</h2>
          
          <p>
            Die wichtigste Regel für UTM-Tracking in 2026 lautet: <strong>Standardisierung vor Kreativität</strong>. Kampagnennamen müssen nicht originell sein, sondern verständlich und vergleichbar. Ein Name wie „spring_sale_2026" ist für Analytics wertvoller als jede kreative Wortspielerei.
          </p>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">Regel #2: Einheitliche Schreibweise</h2>

          <p>
            Ebenso entscheidend ist eine einheitliche Schreibweise. Groß- und Kleinschreibung, Leerzeichen oder Sonderzeichen sorgen dafür, dass Analytics dieselbe Quelle mehrfach auswertet. „Google", „google" und „google_ads" sind für das System drei unterschiedliche Quellen – für dein Marketing aber ein und derselbe Kanal.
          </p>

          <p>
            Moderne Teams definieren deshalb feste Regeln:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Quellen heißen immer gleich (z.B. <code className="bg-midnight-800 px-2 py-1 rounded text-sm">google</code>, <code className="bg-midnight-800 px-2 py-1 rounded text-sm">facebook</code>, <code className="bg-midnight-800 px-2 py-1 rounded text-sm">newsletter</code>)</li>
            <li>Medien werden sauber getrennt (<code className="bg-midnight-800 px-2 py-1 rounded text-sm">cpc</code>, <code className="bg-midnight-800 px-2 py-1 rounded text-sm">email</code>, <code className="bg-midnight-800 px-2 py-1 rounded text-sm">social</code>)</li>
            <li>Kampagnen folgen einem klaren Muster: <code className="bg-midnight-800 px-2 py-1 rounded text-sm">zeitraum_ziel_produkt</code></li>
            <li>Alles wird konsequent in Kleinbuchstaben geschrieben</li>
          </ul>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">Regel #3: Keine manuellen UTM-Links</h2>

          <p>
            Ein weiterer Fehler, der 2026 besonders teuer wird: manuelles Bauen von UTM-Links. Je mehr Kampagnen laufen, desto höher ist die Fehlerquote. Ein kleiner Tippfehler reicht aus, und die Daten sind verloren.
          </p>

          <p>
            Genau deshalb setzen immer mehr Teams auf zentrale UTM-Vorlagen statt auf spontane Einzelentscheidungen. Tools wie <Link href="/" className="text-camp-400 hover:underline">CampKit</Link> ermöglichen es, Templates zu erstellen und konsistent zu nutzen.
          </p>

          <h2 className="text-2xl font-display font-bold mt-12 mb-4">Warum sauberes Tracking 2026 unverzichtbar ist</h2>

          <p>
            Sauberes UTM-Tracking ist heute keine technische Spielerei mehr, sondern eine Voraussetzung für verlässliche Auswertungen – besonders dann, wenn Reports automatisiert oder KI-gestützt ausgewertet werden. Schlechte Daten bleiben schlechte Daten, egal wie intelligent das Analyse-Tool ist.
          </p>

          <p>
            Wer seine UTM-Struktur sauber aufsetzt, gewinnt Klarheit:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Welche Kampagnen funktionieren wirklich?</li>
            <li>Wo wird Budget verbrannt?</li>
            <li>Welche Kanäle liefern konstant Ergebnisse?</li>
          </ul>

          <p>
            Genau diese Fragen entscheidet sauberes Tracking – nicht Bauchgefühl.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-camp-500/10 to-camp-400/10 border border-camp-500/30 rounded-2xl text-center">
          <h3 className="font-display text-2xl font-bold mb-3">Bereit für sauberes UTM-Tracking?</h3>
          <p className="text-midnight-400 mb-6">
            Mit CampKit erstellst du UTM-Links mit Templates, bekommst automatische Kurzlinks und siehst alle Klicks in Echtzeit.
          </p>
          <Link href="/signup" className="inline-block px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg">
            Jetzt kostenlos starten →
          </Link>
        </div>

        {/* Related */}
        <div className="mt-16 pt-8 border-t border-midnight-800">
          <h4 className="font-display font-semibold mb-4">Weiterlesen:</h4>
          <div className="space-y-3">
            <Link href="/blog/utm-fehler-kampagnen-sabotieren" className="block p-4 bg-midnight-800/50 rounded-lg hover:bg-midnight-800 transition-colors">
              <span className="text-camp-400">→</span> UTM-Fehler, die deine Kampagnen sabotieren
            </Link>
            <Link href="/compare" className="block p-4 bg-midnight-800/50 rounded-lg hover:bg-midnight-800 transition-colors">
              <span className="text-camp-400">→</span> CampKit vs. Bitly vs. UTM.io – Der Vergleich
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
