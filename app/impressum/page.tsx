import Link from 'next/link'

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-midnight-900 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl font-bold mb-8">Impressum</h1>
        <div className="space-y-8 text-midnight-300">
          <section><h2 className="text-xl font-semibold text-white mb-3">Angaben gemäß § 5 TMG</h2><p>Thomas Kiene<br/>Im Roggesch 10C<br/>49635 Badbergen<br/>Deutschland</p></section>
          <section><h2 className="text-xl font-semibold text-white mb-3">Kontakt</h2><p>E-Mail: <a href="mailto:t.kiene@montitech.de" className="text-camp-400">t.kiene@montitech.de</a></p></section>
          <section><h2 className="text-xl font-semibold text-white mb-3">Verantwortlich für den Inhalt</h2><p>Thomas Kiene<br/>Im Roggesch 10C<br/>49635 Badbergen</p></section>
          <section><h2 className="text-xl font-semibold text-white mb-3">EU-Streitschlichtung</h2><p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit: <a href="https://ec.europa.eu/consumers/odr/" className="text-camp-400" target="_blank">https://ec.europa.eu/consumers/odr/</a></p></section>
          <section><h2 className="text-xl font-semibold text-white mb-3">Verbraucherstreitbeilegung</h2><p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p></section>
        </div>
        <div className="mt-12 pt-8 border-t border-midnight-800"><Link href="/" className="text-camp-400">← Zurück</Link></div>
      </div>
    </main>
  )
}
