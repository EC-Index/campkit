'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function NoMoreSpreadsheetsDE() {
  return (
    <div className="min-h-screen bg-midnight-900 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-midnight-900/90 backdrop-blur-xl border-b border-midnight-800/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/de">
            <Image
              src="/logo.png"
              alt="CampKit"
              width={180} height={45} className="h-36 w-auto"
            />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-midnight-400 hover:text-white text-sm hidden sm:block">Anmelden</Link>
            <Link 
              href="/signup" 
              className="px-5 py-2.5 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-all hover:scale-105"
            >
              Kostenlos testen →
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
            <span className="text-red-400 text-sm font-medium">📊 Spreadsheet-Chaos beenden</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Dein UTM-Spreadsheet<br />
            <span className="text-camp-400">ist außer Kontrolle?</span>
          </h1>
          
          <p className="text-xl text-midnight-300 mb-8 max-w-2xl mx-auto">
            30 Tabs, 15 Versionen, niemand findet den richtigen Link. 
            <span className="text-white font-medium"> CampKit ersetzt dein Spreadsheet-Chaos durch ein echtes UTM-Tool.</span>
          </p>

          <Link 
            href="/signup" 
            className="inline-flex px-8 py-4 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-bold text-lg rounded-xl transition-all hover:scale-105 shadow-lg shadow-camp-500/25"
          >
            Kostenlos testen — Keine Kreditkarte
          </Link>
        </div>
      </section>

      {/* Spreadsheet Mockup - Pain */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-center mb-8">Kommt dir das bekannt vor?</h2>
          
          <div className="p-6 rounded-2xl bg-midnight-800/50 border border-red-500/30 font-mono text-sm overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-midnight-400 border-b border-midnight-700">
                <tr>
                  <th className="py-2 px-3">Kampagne</th>
                  <th className="py-2 px-3">Source</th>
                  <th className="py-2 px-3">Medium</th>
                  <th className="py-2 px-3">Link</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-midnight-300">
                <tr className="border-b border-midnight-800">
                  <td className="py-2 px-3">summer_sale</td>
                  <td className="py-2 px-3 text-red-400">Facebook</td>
                  <td className="py-2 px-3">paid</td>
                  <td className="py-2 px-3 text-midnight-500">bit.ly/abc123</td>
                  <td className="py-2 px-3">✓</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-2 px-3">summer-sale</td>
                  <td className="py-2 px-3 text-red-400">facebook</td>
                  <td className="py-2 px-3">cpc</td>
                  <td className="py-2 px-3 text-midnight-500">???</td>
                  <td className="py-2 px-3 text-yellow-400">🔍</td>
                </tr>
                <tr className="border-b border-midnight-800">
                  <td className="py-2 px-3">SummerSale2024</td>
                  <td className="py-2 px-3 text-red-400">FB</td>
                  <td className="py-2 px-3">social</td>
                  <td className="py-2 px-3 text-midnight-500">gekürzt?</td>
                  <td className="py-2 px-3 text-red-400">✗</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">sommer_aktion</td>
                  <td className="py-2 px-3 text-red-400">fb-ads</td>
                  <td className="py-2 px-3">bezahlt</td>
                  <td className="py-2 px-3 text-midnight-500">siehe Tab "Juli"</td>
                  <td className="py-2 px-3 text-yellow-400">?</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-red-400 text-sm">4 Versionen der gleichen Kampagne. 4 verschiedene Schreibweisen. 0 Konsistenz.</p>
          </div>
        </div>
      </section>

      {/* Problems List */}
      <section className="py-16 px-6 bg-midnight-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-center mb-12">Typische Spreadsheet-Probleme</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-4">
              <span className="text-red-400 text-xl">❌</span>
              <div>
                <h3 className="font-semibold mb-1">"Wer hat Version 3.2 final_FINAL?"</h3>
                <p className="text-midnight-400 text-sm">10 Leute, 10 Versionen, niemand weiß welche aktuell ist.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4">
              <span className="text-red-400 text-xl">❌</span>
              <div>
                <h3 className="font-semibold mb-1">"facebook" vs "Facebook" vs "fb"</h3>
                <p className="text-midnight-400 text-sm">GA4 zeigt 3 verschiedene Sources — eigentlich ist es dieselbe.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4">
              <span className="text-red-400 text-xl">❌</span>
              <div>
                <h3 className="font-semibold mb-1">"Wo ist der Link von letzter Woche?"</h3>
                <p className="text-midnight-400 text-sm">30 Minuten Suche in 5 Tabs für einen Link, der schon existiert.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4">
              <span className="text-red-400 text-xl">❌</span>
              <div>
                <h3 className="font-semibold mb-1">"Hat jemand die Klicks notiert?"</h3>
                <p className="text-midnight-400 text-sm">Spreadsheets tracken keine Klicks. Du musst manuell aus Bitly kopieren.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Comparison */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-center mb-12">Alter Workflow vs. CampKit</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
              <h3 className="font-semibold text-red-400 mb-4">❌ Mit Spreadsheet (5+ Minuten)</h3>
              <ol className="space-y-3 text-sm text-midnight-300">
                <li className="flex items-start gap-2"><span className="text-red-400 font-mono">1.</span> Spreadsheet öffnen, richtige Version finden</li>
                <li className="flex items-start gap-2"><span className="text-red-400 font-mono">2.</span> Prüfen ob Kampagne schon existiert</li>
                <li className="flex items-start gap-2"><span className="text-red-400 font-mono">3.</span> UTM-Parameter manuell zusammenbauen</li>
                <li className="flex items-start gap-2"><span className="text-red-400 font-mono">4.</span> In Bitly öffnen, Link kürzen</li>
                <li className="flex items-start gap-2"><span className="text-red-400 font-mono">5.</span> Kurz-Link zurück ins Spreadsheet kopieren</li>
                <li className="flex items-start gap-2"><span className="text-red-400 font-mono">6.</span> Hoffen dass Kollegen die Datei nicht überschreiben</li>
              </ol>
            </div>

            <div className="p-6 rounded-2xl bg-camp-500/5 border border-camp-500/20">
              <h3 className="font-semibold text-camp-400 mb-4">✅ Mit CampKit (30 Sekunden)</h3>
              <ol className="space-y-3 text-sm text-midnight-300">
                <li className="flex items-start gap-2"><span className="text-camp-400 font-mono">1.</span> URL eingeben</li>
                <li className="flex items-start gap-2"><span className="text-camp-400 font-mono">2.</span> Template auswählen (oder UTMs tippen)</li>
                <li className="flex items-start gap-2"><span className="text-camp-400 font-mono">3.</span> Short-Link kopieren</li>
                <li className="flex items-start gap-2"><span className="text-camp-400 font-mono">4.</span> Fertig — Klicks werden automatisch getrackt</li>
              </ol>
              <div className="mt-6 p-4 bg-camp-500/10 rounded-lg">
                <p className="text-camp-400 font-semibold text-sm">⏱ Zeitersparnis: 4+ Minuten pro Link</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Time Savings Calculator */}
      <section className="py-16 px-6 bg-midnight-800/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold mb-6">Rechne selbst: Deine Zeitersparnis</h2>
          
          <div className="p-8 rounded-2xl bg-midnight-800/50 border border-midnight-700/50">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-midnight-400 text-sm mb-2">Links pro Woche</p>
                <p className="text-3xl font-bold">20</p>
              </div>
              <div>
                <p className="text-midnight-400 text-sm mb-2">Minuten gespart/Link</p>
                <p className="text-3xl font-bold">4</p>
              </div>
              <div>
                <p className="text-midnight-400 text-sm mb-2">Stunden/Monat gespart</p>
                <p className="text-3xl font-bold text-camp-400">5+</p>
              </div>
            </div>
            <p className="text-midnight-400 text-sm">
              Bei 20 Links/Woche und 4 Min. Ersparnis = <span className="text-white">80 Minuten/Woche</span> = <span className="text-camp-400 font-semibold">5+ Stunden/Monat</span>
            </p>
          </div>
        </div>
      </section>

      {/* Migration */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold mb-6">Migration in 5 Minuten</h2>
          <p className="text-midnight-400 mb-8">
            Du musst nicht bei Null anfangen. Importiere deine bestehenden Links per CSV — 
            CampKit übernimmt alles.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-midnight-800/30">
              <p className="text-2xl mb-2">📤</p>
              <p className="font-semibold text-sm">Spreadsheet exportieren</p>
              <p className="text-midnight-500 text-xs">Als CSV speichern</p>
            </div>
            <div className="p-4 rounded-xl bg-midnight-800/30">
              <p className="text-2xl mb-2">📥</p>
              <p className="font-semibold text-sm">In CampKit importieren</p>
              <p className="text-midnight-500 text-xs">Drag & Drop</p>
            </div>
            <div className="p-4 rounded-xl bg-midnight-800/30">
              <p className="text-2xl mb-2">✅</p>
              <p className="font-semibold text-sm">Fertig!</p>
              <p className="text-midnight-500 text-xs">Alle Links übernommen</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-6 bg-midnight-800/30">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-1 mb-4">
            <span className="text-yellow-400">★★★★★</span>
          </div>
          <p className="text-xl text-midnight-300 mb-6 leading-relaxed">
            "Unser UTM-Spreadsheet hatte 47 Tabs und 3 'finale' Versionen. 
            <span className="text-white"> Nach dem Wechsel zu CampKit hat jeder im Team den gleichen Stand</span> — 
            und wir sparen 3 Stunden pro Woche."
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">MS</div>
            <div className="text-left">
              <p className="font-medium">Maria Schmidt</p>
              <p className="text-midnight-500 text-sm">Marketing Managerin, SaaS Startup</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Bereit, dein Spreadsheet loszuwerden?
          </h2>
          <p className="text-midnight-400 text-lg mb-8">
            Starte kostenlos. Importiere deine Links. Spare Stunden.
          </p>
          <Link 
            href="/signup" 
            className="inline-flex px-8 py-4 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-bold text-lg rounded-xl transition-all hover:scale-105 shadow-lg shadow-camp-500/25"
          >
            Kostenlos testen — Keine Kreditkarte
          </Link>
          <p className="text-midnight-500 text-sm mt-4">
            50 Links kostenlos • Upgrade jederzeit
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-midnight-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/de">
            <Image src="/logo.png" alt="CampKit" width={180} height={45} className="h-36 w-auto" />
          </Link>
          <p className="text-midnight-500 text-sm">© 2024 CampKit. Made in Germany 🇩🇪</p>
        </div>
      </footer>
    </div>
  )
}
