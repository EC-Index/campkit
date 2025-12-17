'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function HomeDE() {
  const [annual, setAnnual] = useState(true)
  
  const prices = {
    pro: annual ? 7 : 9,
    team: annual ? 23 : 29,
    business: annual ? 63 : 79
  }

  return (
    <div className="min-h-screen bg-midnight-900 text-white">
      {/* Minimal Sticky Header */}
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
            <Link href="/" className="text-midnight-400 hover:text-white text-sm hidden sm:block">EN</Link>
            <Link href="/login" className="text-midnight-400 hover:text-white text-sm hidden sm:block">Anmelden</Link>
            <Link 
              href="/signup" 
              className="px-5 py-2.5 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-all hover:scale-105"
            >
              Kostenlos starten →
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-camp-500/10 border border-camp-500/20 rounded-full mb-8">
            <span className="text-yellow-400">★★★★★</span>
            <span className="text-camp-400 text-sm font-medium">4.9/5 von 127 Bewertungen</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Schluss mit Spreadsheet-Chaos.<br />
            <span className="text-camp-400">UTM-Kampagnen, die konvertieren.</span>
          </h1>
          
          <p className="text-xl text-midnight-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Erstelle UTM-Links in Sekunden, nutze gebrandete Short-URLs und sieh genau, welche Kampagnen Ergebnisse liefern. 
            <span className="text-white font-medium"> Spare Stunden jede Woche.</span>
          </p>

          <Link 
            href="/signup" 
            className="inline-flex px-8 py-4 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-bold text-lg rounded-xl transition-all hover:scale-105 shadow-lg shadow-camp-500/25 mb-4"
          >
            Kostenlos starten — Keine Kreditkarte
          </Link>
          
          <p className="text-midnight-500 text-sm">
            <a href="#so-funktionierts" className="text-midnight-400 hover:text-white underline underline-offset-4">So funktioniert's</a> • Einrichtung in 30 Sekunden
          </p>
        </div>
      </section>

      {/* Product Screenshot */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-midnight-700 shadow-2xl shadow-black/50">
            <Image
              src="/dashboard-screenshot.png"
              alt="CampKit Dashboard - UTM-Links erstellen, Short-URLs generieren, Klicks tracken"
              width={1920}
              height={1080}
              className="w-full"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/20 to-transparent pointer-events-none" />
          </div>
          <p className="text-center text-midnight-500 text-sm mt-4">
            UTM Builder → Short Links → Echtzeit-Analytics — alles an einem Ort
          </p>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-12 px-6 bg-midnight-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-midnight-300 text-lg">
            Entwickelt für <span className="text-white font-semibold">kleine Marketing-Teams</span>, die 
            schnelle UTM-Governance brauchen — <span className="text-camp-400">ohne teure Enterprise-Tools</span>
          </p>
        </div>
      </section>

      {/* Pain → Outcome Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold mb-4">
              Von chaotischen Spreadsheets zu konsistentem Tracking
            </h2>
            <p className="text-midnight-400 max-w-2xl mx-auto">
              Wisse genau, welche Kampagnen performen. Kein Raten mehr, kein Naming-Chaos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
              <h3 className="font-semibold text-red-400 mb-4 flex items-center gap-2">
                <span>😫</span> Ohne CampKit
              </h3>
              <ul className="space-y-3 text-sm text-midnight-300">
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span><span>UTM-Links verstreut über 10+ Spreadsheets</span></li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span><span>Inkonsistente Benennung: "facebook" vs "Facebook" vs "fb"</span></li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span><span>Keine Ahnung, welche Kampagnen wirklich konvertieren</span></li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span><span>Stunden verschwendet beim Suchen alter Links</span></li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-camp-500/5 border border-camp-500/20">
              <h3 className="font-semibold text-camp-400 mb-4 flex items-center gap-2">
                <span>🎯</span> Mit CampKit
              </h3>
              <ul className="space-y-3 text-sm text-midnight-300">
                <li className="flex items-start gap-2"><span className="text-camp-400">✓</span><span>Alle UTM-Links in einem organisierten Dashboard</span></li>
                <li className="flex items-start gap-2"><span className="text-camp-400">✓</span><span>Templates erzwingen konsistente Namenskonventionen</span></li>
                <li className="flex items-start gap-2"><span className="text-camp-400">✓</span><span>Echtzeit-Analytics zeigen, was funktioniert</span></li>
                <li className="flex items-start gap-2"><span className="text-camp-400">✓</span><span>Finde jeden Link in Sekunden mit der Suche</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="so-funktionierts" className="py-20 px-6 bg-midnight-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            In 30 Sekunden loslegen
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-camp-500 text-midnight-900 font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">1</div>
              <h3 className="font-semibold mb-2">URL einfügen</h3>
              <p className="text-midnight-400 text-sm">Gib eine beliebige Zielseite ein, die du tracken willst</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-camp-500 text-midnight-900 font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">2</div>
              <h3 className="font-semibold mb-2">UTM-Parameter hinzufügen</h3>
              <p className="text-midnight-400 text-sm">Nutze Templates oder tippe Source, Medium, Campaign</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-camp-500 text-midnight-900 font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">3</div>
              <h3 className="font-semibold mb-2">Kopieren & tracken</h3>
              <p className="text-midnight-400 text-sm">Hol dir deinen Short-Link, beobachte die Klicks</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/signup" className="inline-flex px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-all hover:scale-105">
              Jetzt kostenlos testen →
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-4">
            Alles was du brauchst. Nichts, was du nicht brauchst.
          </h2>
          <p className="text-midnight-400 text-center mb-12 max-w-2xl mx-auto">
            Keine aufgeblähten Enterprise-Features. Nur die Tools, die wirklich beim Kampagnen-Tracking helfen.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-midnight-800/30 border border-midnight-700/50">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔗</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">UTM Builder</h3>
              <p className="text-midnight-400 text-sm">Erstelle konsistente UTM-Links mit wiederverwendbaren Templates. Keine Tippfehler mehr.</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-midnight-800/30 border border-midnight-700/50">
              <div className="w-16 h-16 bg-camp-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Short Links</h3>
              <p className="text-midnight-400 text-sm">Generiere automatisch gebrandete Kurzlinks. Nutze deine eigene Domain für professionelle URLs.</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-midnight-800/30 border border-midnight-700/50">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Klick-Analytics</h3>
              <p className="text-midnight-400 text-sm">Sieh wer klickt, woher und wann. Geräte-, Standort- und Referrer-Daten inklusive.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-6 bg-midnight-800/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-2">Von Marketing-Teams geschätzt</h2>
            <p className="text-midnight-400">Schließe dich 500+ Marketern an, die das Spreadsheet-Chaos beendet haben</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-midnight-800/50 border border-midnight-700/50">
              <div className="flex items-center gap-1 mb-4"><span className="text-yellow-400 text-sm">★★★★★</span></div>
              <p className="text-midnight-300 mb-4 text-sm leading-relaxed">"Endlich unser chaotisches UTM-Spreadsheet losgeworden. <span className="text-white">CampKit spart uns 3 Stunden pro Woche</span> — genau das, was wir brauchten."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">MS</div>
                <div><p className="font-medium text-sm">Maria Schmidt</p><p className="text-midnight-500 text-xs">Marketing Managerin, SaaS Startup</p></div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-midnight-800/50 border border-midnight-700/50">
              <div className="flex items-center gap-1 mb-4"><span className="text-yellow-400 text-sm">★★★★★</span></div>
              <p className="text-midnight-300 mb-4 text-sm leading-relaxed">"Wir sind von UTM.io gewechselt und <span className="text-white">sparen über €200/Monat</span>. Die Analytics sind super und die UI viel cleaner."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">JK</div>
                <div><p className="font-medium text-sm">Jonas Krüger</p><p className="text-midnight-500 text-xs">Inhaber, Digitalagentur</p></div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-midnight-800/50 border border-midnight-700/50">
              <div className="flex items-center gap-1 mb-4"><span className="text-yellow-400 text-sm">★★★★★</span></div>
              <p className="text-midnight-300 mb-4 text-sm leading-relaxed">"Die Team-Templates sind ein Gamechanger. <span className="text-white">Kein 'facebook' vs 'Facebook' Chaos mehr</span> — alle sind jetzt konsistent."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-camp-500 rounded-full flex items-center justify-center text-midnight-900 font-semibold text-sm">LT</div>
                <div><p className="font-medium text-sm">Laura Torres</p><p className="text-midnight-500 text-xs">Growth Lead, E-Commerce</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="preise" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Headline */}
          <div className="text-center mb-6">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Wähle den richtigen Plan für dein Team
            </h2>
            <p className="text-midnight-400 max-w-2xl mx-auto">
              Starte kostenlos, upgrade wenn du wächst. Alle Pläne beinhalten UTM Builder & Short Links. Keine versteckten Kosten.
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mb-8 text-midnight-500 text-sm">
            <span className="flex items-center gap-1">🔒 Sichere Zahlung</span>
            <span className="flex items-center gap-1">↩️ Jederzeit kündbar</span>
            <span className="flex items-center gap-1">💳 Keine Kreditkarte für Free</span>
          </div>

          {/* Annual/Monthly Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm ${!annual ? 'text-white' : 'text-midnight-500'}`}>Monatlich</span>
            <button 
              onClick={() => setAnnual(!annual)}
              className={`relative w-14 h-8 rounded-full transition-colors ${annual ? 'bg-camp-500' : 'bg-midnight-700'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${annual ? 'left-7' : 'left-1'}`} />
            </button>
            <span className={`text-sm ${annual ? 'text-white' : 'text-midnight-500'}`}>
              Jährlich <span className="text-camp-400 font-medium">(-20%)</span>
            </span>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            {/* FREE */}
            <div className="p-6 rounded-2xl bg-midnight-800/30 border border-midnight-700/50">
              <div className="mb-4">
                <span className="text-2xl">🆓</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-1">Free</h3>
              <p className="text-midnight-500 text-sm mb-4">Basis Link-Kürzung</p>
              <div className="mb-6">
                <span className="font-display text-4xl font-bold">€0</span>
                <span className="text-midnight-500">/Monat</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> 50 UTM-Links</li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> Short Links (getcampkit.com)</li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> Basis Klick-Analytics</li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> CSV-Export</li>
                <li className="flex items-center gap-2 text-midnight-600"><span>—</span> Keine Custom Domains</li>
              </ul>
              <Link href="/signup" className="block w-full py-3 text-center border border-midnight-600 rounded-lg hover:border-midnight-500 transition-colors font-medium">
                Kostenlos starten
              </Link>
            </div>

            {/* PRO - HIGHLIGHTED */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-camp-500/20 to-camp-500/5 border-2 border-camp-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-camp-500 text-midnight-900 text-xs font-bold rounded-full">
                AM BELIEBTESTEN
              </div>
              <div className="mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-1">Pro</h3>
              <p className="text-midnight-500 text-sm mb-4">Custom Domains + Analytics</p>
              <div className="mb-6">
                <span className="font-display text-4xl font-bold">€{prices.pro}</span>
                <span className="text-midnight-500">/Monat</span>
                {annual && <span className="block text-camp-400 text-xs mt-1">Jährlich €{prices.pro * 12}</span>}
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> <strong className="text-white">Unbegrenzte</strong> Links</li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> <strong className="text-white">Custom Domains</strong></li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> <strong className="text-white">Erweiterte Analytics</strong></li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> UTM Templates</li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> Prioritäts-Support</li>
              </ul>
              <Link href="/signup?plan=pro" className="block w-full py-3 text-center bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-colors">
                Pro holen →
              </Link>
              <p className="text-midnight-500 text-xs text-center mt-2">7 Tage kostenlos testen</p>
            </div>

            {/* TEAM */}
            <div className="p-6 rounded-2xl bg-midnight-800/30 border border-midnight-700/50">
              <div className="mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-1">Team</h3>
              <p className="text-midnight-500 text-sm mb-4">Zusammenarbeit + Templates</p>
              <div className="mb-6">
                <span className="font-display text-4xl font-bold">€{prices.team}</span>
                <span className="text-midnight-500">/Monat</span>
                {annual && <span className="block text-camp-400 text-xs mt-1">Jährlich €{prices.team * 12}</span>}
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> Alles aus Pro</li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> <strong className="text-white">5 Teammitglieder</strong></li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> <strong className="text-white">Geteilte Templates</strong></li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> <strong className="text-white">Bulk Link Builder</strong></li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> API-Zugang</li>
              </ul>
              <Link href="/signup?plan=team" className="block w-full py-3 text-center border border-midnight-600 rounded-lg hover:border-camp-500 hover:text-camp-400 transition-colors font-medium">
                Team holen →
              </Link>
            </div>

            {/* BUSINESS */}
            <div className="p-6 rounded-2xl bg-midnight-800/30 border border-midnight-700/50">
              <div className="mb-4">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-1">Business</h3>
              <p className="text-midnight-500 text-sm mb-4">Unbegrenzte Teams + API</p>
              <div className="mb-6">
                <span className="font-display text-4xl font-bold">€{prices.business}</span>
                <span className="text-midnight-500">/Monat</span>
                {annual && <span className="block text-camp-400 text-xs mt-1">Jährlich €{prices.business * 12}</span>}
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> Alles aus Team</li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> <strong className="text-white">Unbegrenzte Mitglieder</strong></li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> <strong className="text-white">Unbegrenzte Teams</strong></li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> Erweiterte API</li>
                <li className="flex items-center gap-2"><span className="text-camp-400">✓</span> Dedizierter Support</li>
              </ul>
              <Link href="/signup?plan=business" className="block w-full py-3 text-center border border-midnight-600 rounded-lg hover:border-camp-500 hover:text-camp-400 transition-colors font-medium">
                Business holen →
              </Link>
            </div>
          </div>

          {/* Compare link */}
          <p className="text-center text-midnight-500 text-sm mt-8">
            <Link href="/compare" className="text-camp-400 hover:underline">Vergleich mit UTM.io & Bitly →</Link>
            <span className="mx-2">•</span>
            Alle Preise zzgl. MwSt.
          </p>

          {/* Mini FAQ under Pricing */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h3 className="font-display text-xl font-semibold text-center mb-8">Häufige Fragen zu den Preisen</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-midnight-800/30 border border-midnight-700/50">
                <h4 className="font-medium text-sm mb-1">Kann ich später wechseln?</h4>
                <p className="text-midnight-500 text-xs">Ja! Upgrade oder Downgrade jederzeit. Änderungen gelten sofort.</p>
              </div>
              <div className="p-4 rounded-xl bg-midnight-800/30 border border-midnight-700/50">
                <h4 className="font-medium text-sm mb-1">Was passiert beim Free-Limit?</h4>
                <p className="text-midnight-500 text-xs">Deine bestehenden Links funktionieren weiter. Du kannst nur keine neuen erstellen bis zum Upgrade.</p>
              </div>
              <div className="p-4 rounded-xl bg-midnight-800/30 border border-midnight-700/50">
                <h4 className="font-medium text-sm mb-1">Ist MwSt. enthalten?</h4>
                <p className="text-midnight-500 text-xs">Preise sind netto. MwSt. wird für EU-Kunden bei Checkout hinzugefügt.</p>
              </div>
              <div className="p-4 rounded-xl bg-midnight-800/30 border border-midnight-700/50">
                <h4 className="font-medium text-sm mb-1">Wie funktioniert die Testphase?</h4>
                <p className="text-midnight-500 text-xs">Pro & Team haben 7 Tage Test. Voller Zugang, jederzeit kündbar, keine Kosten bei Kündigung.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Expanded */}
      <section className="py-20 px-6 bg-midnight-800/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            Häufig gestellte Fragen
          </h2>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-midnight-800/50 border border-midnight-700/50">
              <h3 className="font-semibold mb-2">Warum brauche ich CampKit statt Google Sheets?</h3>
              <p className="text-midnight-400 text-sm">Spreadsheets funktionieren für wenige Links, aber werden schnell chaotisch: inkonsistente Benennung, keine Analytics, keine Short Links, schwer zu teilen. CampKit gibt dir ein dediziertes Tool mit Templates, Klick-Tracking und Team-Zusammenarbeit.</p>
            </div>

            <div className="p-6 rounded-xl bg-midnight-800/50 border border-midnight-700/50">
              <h3 className="font-semibold mb-2">Wie funktioniert das Analytics/Tracking?</h3>
              <p className="text-midnight-400 text-sm">Wenn jemand auf deinen Short Link klickt, tracken wir: Zeitstempel, Gerätetyp, Browser, Betriebssystem, Land, Stadt und Referrer. Alle Daten werden in Echtzeit in deinem Dashboard angezeigt. Wir sammeln keine persönlichen Daten von Besuchern.</p>
            </div>

            <div className="p-6 rounded-xl bg-midnight-800/50 border border-midnight-700/50">
              <h3 className="font-semibold mb-2">Wie unterscheidet sich CampKit von UTM.io oder Bitly?</h3>
              <p className="text-midnight-400 text-sm">UTM.io kostet €50+/Monat und fokussiert auf Enterprise-Governance. Bitly ist primär ein Link-Shortener. CampKit gibt dir das Beste aus beiden: UTM Builder + Short Links + Analytics für €9/Monat. <a href="/compare" className="text-camp-400 hover:underline">Vollständiger Vergleich →</a></p>
            </div>

            <div className="p-6 rounded-xl bg-midnight-800/50 border border-midnight-700/50">
              <h3 className="font-semibold mb-2">Kann ich meine eigene Domain für Short Links nutzen?</h3>
              <p className="text-midnight-400 text-sm">Ja! Mit Pro und höheren Plänen kannst du deine eigene Domain verbinden (wie go.deinefirma.de). Wir bieten eine einfache DNS-Setup-Anleitung — die meisten User richten es in unter 5 Minuten ein.</p>
            </div>

            <div className="p-6 rounded-xl bg-midnight-800/50 border border-midnight-700/50">
              <h3 className="font-semibold mb-2">Sind meine Daten sicher? Was ist mit DSGVO?</h3>
              <p className="text-midnight-400 text-sm">Deine Daten werden sicher auf EU-Servern gespeichert. Wir sind vollständig DSGVO-konform und verkaufen keine Daten an Dritte. Klick-Tracking sammelt nur anonyme Daten — keine persönlichen Informationen von Link-Besuchern.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Bereit, deine UTM-Links zu organisieren?
          </h2>
          <p className="text-midnight-400 text-lg mb-8">
            Schließe dich 500+ Marketing-Teams an, die das Spreadsheet-Chaos beendet haben.
          </p>
          <Link 
            href="/signup" 
            className="inline-flex px-8 py-4 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-bold text-lg rounded-xl transition-all hover:scale-105 shadow-lg shadow-camp-500/25"
          >
            Kostenlos starten — Keine Kreditkarte
          </Link>
          <p className="text-midnight-500 text-sm mt-4">
            Für immer kostenloser Plan • Einrichtung in 30 Sekunden
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-midnight-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/de">
              <Image
                src="/logo.png"
                alt="CampKit"
                width={180}
                height={45}
                className="h-36 w-auto"
              />
            </Link>
            <div className="flex items-center gap-6 text-sm text-midnight-400 flex-wrap justify-center">
              <a href="#preise" className="hover:text-white transition-colors">Preise</a>
              <Link href="/compare" className="hover:text-white transition-colors">Vergleich</Link>
              <Link href="/login" className="hover:text-white transition-colors">Anmelden</Link>
              <Link href="/" className="hover:text-white transition-colors">English</Link>
              <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
              <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
              <Link href="/agb" className="hover:text-white transition-colors">AGB</Link>
              <a href="mailto:service@getcampkit.com" className="hover:text-white transition-colors">Support</a>
            </div>
            <p className="text-midnight-500 text-sm">
              © 2024 CampKit. Made in Germany 🇩🇪
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
