'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function BitlyAlternativeDE() {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full mb-6">
            <span className="text-orange-400 text-sm font-medium">🔄 Bitly Alternative</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Mehr als nur Link-Kürzung.<br />
            <span className="text-camp-400">UTM + Short Links + Analytics.</span>
          </h1>
          
          <p className="text-xl text-midnight-300 mb-8 max-w-2xl mx-auto">
            Bitly ist super für kurze Links. Aber für Marketing-Teams fehlt der UTM-Builder, 
            Kampagnen-Governance und echte Analytics. <span className="text-white font-medium">CampKit hat alles.</span>
          </p>

          <Link 
            href="/signup" 
            className="inline-flex px-8 py-4 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-bold text-lg rounded-xl transition-all hover:scale-105 shadow-lg shadow-camp-500/25"
          >
            Kostenlos testen — Keine Kreditkarte
          </Link>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-center mb-8">CampKit vs. Bitly im Vergleich</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-midnight-700">
                  <th className="text-left py-4 px-4 font-medium text-midnight-400">Feature</th>
                  <th className="text-center py-4 px-4 font-medium text-midnight-400">Bitly Free</th>
                  <th className="text-center py-4 px-4 font-medium text-midnight-400">Bitly Paid<br/><span className="text-xs">ab €35/Mo</span></th>
                  <th className="text-center py-4 px-4 font-medium text-camp-400 bg-camp-500/10">CampKit Pro<br/><span className="text-xs">€9/Mo</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-midnight-800">
                <tr>
                  <td className="py-4 px-4">Short Links</td>
                  <td className="text-center py-4 px-4">10/Monat</td>
                  <td className="text-center py-4 px-4">3.000/Monat</td>
                  <td className="text-center py-4 px-4 bg-camp-500/5 text-camp-400 font-medium">Unbegrenzt ✓</td>
                </tr>
                <tr>
                  <td className="py-4 px-4">UTM Builder integriert</td>
                  <td className="text-center py-4 px-4 text-red-400">✗</td>
                  <td className="text-center py-4 px-4 text-red-400">✗</td>
                  <td className="text-center py-4 px-4 bg-camp-500/5 text-camp-400 font-medium">✓</td>
                </tr>
                <tr>
                  <td className="py-4 px-4">UTM Templates</td>
                  <td className="text-center py-4 px-4 text-red-400">✗</td>
                  <td className="text-center py-4 px-4 text-red-400">✗</td>
                  <td className="text-center py-4 px-4 bg-camp-500/5 text-camp-400 font-medium">✓</td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Custom Domain</td>
                  <td className="text-center py-4 px-4 text-red-400">✗</td>
                  <td className="text-center py-4 px-4 text-camp-400">✓</td>
                  <td className="text-center py-4 px-4 bg-camp-500/5 text-camp-400 font-medium">✓</td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Klick-Analytics</td>
                  <td className="text-center py-4 px-4">Basis</td>
                  <td className="text-center py-4 px-4">Erweitert</td>
                  <td className="text-center py-4 px-4 bg-camp-500/5 text-camp-400 font-medium">Erweitert ✓</td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Team Features</td>
                  <td className="text-center py-4 px-4 text-red-400">✗</td>
                  <td className="text-center py-4 px-4">Ab €300/Mo</td>
                  <td className="text-center py-4 px-4 bg-camp-500/5 text-camp-400 font-medium">Ab €29/Mo ✓</td>
                </tr>
                <tr className="bg-midnight-800/30">
                  <td className="py-4 px-4 font-semibold">Preis/Jahr</td>
                  <td className="text-center py-4 px-4">€0</td>
                  <td className="text-center py-4 px-4">€420+</td>
                  <td className="text-center py-4 px-4 bg-camp-500/10 text-camp-400 font-bold">€108</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 px-6 bg-midnight-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-center mb-12">Warum Marketing-Teams von Bitly wechseln</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-midnight-800/50 border border-midnight-700/50">
              <h3 className="font-semibold text-red-400 mb-3">😤 Bitly-Problem</h3>
              <p className="text-midnight-300 text-sm">"Ich muss UTM-Parameter manuell an jeden Link anfügen, dann Bitly öffnen, kürzen, und alles in ein Spreadsheet kopieren."</p>
            </div>
            <div className="p-6 rounded-xl bg-midnight-800/50 border border-camp-500/30">
              <h3 className="font-semibold text-camp-400 mb-3">✅ CampKit-Lösung</h3>
              <p className="text-midnight-300 text-sm">UTM-Builder und Link-Kürzung in einem Schritt. Keine Spreadsheets nötig — alles wird automatisch gespeichert und getrackt.</p>
            </div>
            
            <div className="p-6 rounded-xl bg-midnight-800/50 border border-midnight-700/50">
              <h3 className="font-semibold text-red-400 mb-3">😤 Bitly-Problem</h3>
              <p className="text-midnight-300 text-sm">"Bitly zeigt mir Klicks, aber ich sehe nicht welche UTM-Kampagnen performen. Dafür muss ich in GA4 schauen."</p>
            </div>
            <div className="p-6 rounded-xl bg-midnight-800/50 border border-camp-500/30">
              <h3 className="font-semibold text-camp-400 mb-3">✅ CampKit-Lösung</h3>
              <p className="text-midnight-300 text-sm">Alle Analytics an einem Ort. Sieh Klicks pro Kampagne, Source, Medium — direkt in CampKit. Keine Tool-Wechsel.</p>
            </div>

            <div className="p-6 rounded-xl bg-midnight-800/50 border border-midnight-700/50">
              <h3 className="font-semibold text-red-400 mb-3">😤 Bitly-Problem</h3>
              <p className="text-midnight-300 text-sm">"Mein Team nutzt unterschiedliche Schreibweisen: Facebook, facebook, FB. Bitly kümmert sich nicht um Konsistenz."</p>
            </div>
            <div className="p-6 rounded-xl bg-midnight-800/50 border border-camp-500/30">
              <h3 className="font-semibold text-camp-400 mb-3">✅ CampKit-Lösung</h3>
              <p className="text-midnight-300 text-sm">Templates erzwingen einheitliche Benennung. Jeder im Team nutzt die gleichen UTM-Werte — automatisch.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Savings */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold mb-6">Spare €312/Jahr vs. Bitly Paid</h2>
          <p className="text-midnight-400 mb-8">
            Bitly Core kostet €35/Monat = €420/Jahr.<br />
            CampKit Pro kostet €9/Monat = €108/Jahr.<br />
            <span className="text-camp-400 font-semibold">Du sparst €312 pro Jahr</span> — und bekommst mehr Features.
          </p>
          
          <div className="inline-flex items-center gap-4 p-6 rounded-2xl bg-camp-500/10 border border-camp-500/30">
            <div className="text-left">
              <p className="text-3xl font-bold text-camp-400">€312</p>
              <p className="text-midnight-400 text-sm">Ersparnis pro Jahr</p>
            </div>
            <Link 
              href="/signup" 
              className="px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-all hover:scale-105"
            >
              Jetzt wechseln →
            </Link>
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
            "Wir haben Bitly 2 Jahre genutzt und UTMs manuell gebaut. 
            <span className="text-white"> CampKit hat unseren Workflow revolutioniert</span> — 
            jetzt dauert alles 30 Sekunden statt 5 Minuten."
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">JK</div>
            <div className="text-left">
              <p className="font-medium">Jonas Krüger</p>
              <p className="text-midnight-500 text-sm">Inhaber, Digitalagentur</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Bereit für die bessere Bitly-Alternative?
          </h2>
          <p className="text-midnight-400 text-lg mb-8">
            UTM-Builder + Short Links + Analytics in einem Tool.
          </p>
          <Link 
            href="/signup" 
            className="inline-flex px-8 py-4 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-bold text-lg rounded-xl transition-all hover:scale-105 shadow-lg shadow-camp-500/25"
          >
            Kostenlos testen — Keine Kreditkarte
          </Link>
          <p className="text-midnight-500 text-sm mt-4">
            Migration in 5 Minuten • Alle Links importierbar
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-midnight-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/de">
            <Image src="/logo.png" alt="CampKit" width={180} height={45} className="h-36 w-auto" />
          </Link>
          <div className="flex items-center gap-6 text-sm text-midnight-400 flex-wrap justify-center">
            <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
            <Link href="/agb" className="hover:text-white transition-colors">AGB</Link>
            <a href="mailto:service@getcampkit.com" className="hover:text-white transition-colors">Support</a>
          </div>
          <p className="text-midnight-500 text-sm">© 2024 CampKit. Made in Germany 🇩🇪</p>
        </div>
      </footer>
    </div>
  )
}
