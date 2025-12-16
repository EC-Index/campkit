import Link from 'next/link'

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-midnight-900 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl font-bold mb-8">Datenschutzerklärung</h1>
        <div className="space-y-8 text-midnight-300">
          <section><h2 className="text-xl font-semibold text-white mb-3">1. Verantwortliche Stelle</h2><p>Thomas Kiene, Im Roggesch 10C, 49635 Badbergen. E-Mail: t.kiene@montitech.de</p></section>
          <section><h2 className="text-xl font-semibold text-white mb-3">2. Erhobene Daten</h2><p>Bei Registrierung: E-Mail, Name, Passwort (verschlüsselt). Bei Nutzung: IP-Adresse, Browser, besuchte Seiten.</p></section>
          <section><h2 className="text-xl font-semibold text-white mb-3">3. Cookies</h2><p>Wir verwenden nur technisch notwendige Cookies für die Anmeldung.</p></section>
          <section><h2 className="text-xl font-semibold text-white mb-3">4. Ihre Rechte</h2><p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung und Widerspruch. Kontakt: t.kiene@montitech.de</p></section>
          <section><h2 className="text-xl font-semibold text-white mb-3">5. Hosting</h2><p>Vercel Inc. (USA) und Neon Inc. Details: vercel.com/privacy, neon.tech/privacy</p></section>
          <section><h2 className="text-xl font-semibold text-white mb-3">6. Zahlungsabwicklung</h2><p>Stripe Payments Europe Ltd. Details: stripe.com/de/privacy</p></section>
        </div>
        <div className="mt-12 pt-8 border-t border-midnight-800"><Link href="/" className="text-camp-400">← Zurück</Link></div>
      </div>
    </main>
  )
}
