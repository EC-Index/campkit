import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Allgemeine Geschäftsbedingungen | CampKit',
  description: 'AGB von CampKit - Allgemeine Geschäftsbedingungen für die Nutzung unseres Services',
}

export default function AGB() {
  return (
    <div className="min-h-screen bg-midnight-900 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-midnight-900/90 backdrop-blur-xl border-b border-midnight-800/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/de">
            <Image src="/logo.png" alt="CampKit" width={180} height={45} className="h-36 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-midnight-400 hover:text-white text-sm hidden sm:block">Anmelden</Link>
            <Link href="/signup" className="px-5 py-2.5 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-all hover:scale-105">
              Kostenlos starten →
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl font-bold mb-8">Allgemeine Geschäftsbedingungen</h1>
          
          <div className="prose prose-invert prose-midnight max-w-none space-y-8 text-midnight-300">
            
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">§ 1 Geltungsbereich</h2>
              <p>
                (1) Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB") gelten für alle Verträge zwischen Thomas Kiene, Im Roggesch 10c, 49635 Badbergen (nachfolgend „Anbieter") und dem Kunden (nachfolgend „Kunde") über die Nutzung der Software-as-a-Service-Lösung „CampKit" (nachfolgend „Service").
              </p>
              <p className="mt-2">
                (2) Abweichende, entgegenstehende oder ergänzende Allgemeine Geschäftsbedingungen des Kunden werden nicht Vertragsbestandteil, es sei denn, ihrer Geltung wird ausdrücklich schriftlich zugestimmt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">§ 2 Vertragsgegenstand</h2>
              <p>
                (1) Der Anbieter stellt dem Kunden über das Internet eine webbasierte Software zur Erstellung und Verwaltung von UTM-Links sowie zur Erstellung von Kurzlinks zur Verfügung.
              </p>
              <p className="mt-2">
                (2) Der Service umfasst je nach gewähltem Tarif unterschiedliche Funktionen. Der genaue Leistungsumfang ergibt sich aus der aktuellen Tarifübersicht auf der Website.
              </p>
              <p className="mt-2">
                (3) Der Anbieter ist berechtigt, den Service jederzeit zu erweitern, zu ändern und anzupassen, soweit dies für den Kunden zumutbar ist.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">§ 3 Vertragsschluss und Registrierung</h2>
              <p>
                (1) Die Darstellung des Services auf der Website stellt kein rechtlich bindendes Angebot, sondern eine Aufforderung zur Abgabe einer Bestellung dar.
              </p>
              <p className="mt-2">
                (2) Durch die Registrierung gibt der Kunde ein verbindliches Angebot zum Abschluss eines Nutzungsvertrags ab. Der Vertrag kommt zustande, wenn der Anbieter die Registrierung durch Freischaltung des Kundenkontos bestätigt.
              </p>
              <p className="mt-2">
                (3) Der Kunde versichert, dass alle bei der Registrierung angegebenen Daten wahrheitsgemäß und vollständig sind.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">§ 4 Tarife und Preise</h2>
              <p>
                (1) Der Service wird in verschiedenen Tarifen angeboten: Free, Pro, Team und Business. Der aktuelle Leistungsumfang und die Preise ergeben sich aus der Preisübersicht auf der Website.
              </p>
              <p className="mt-2">
                (2) Alle Preise verstehen sich netto zuzüglich der gesetzlichen Mehrwertsteuer.
              </p>
              <p className="mt-2">
                (3) Der Anbieter behält sich vor, die Preise mit einer Ankündigungsfrist von 30 Tagen zu ändern. Preiserhöhungen gelten nur für neue Abrechnungszeiträume.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">§ 5 Zahlungsbedingungen</h2>
              <p>
                (1) Die Zahlung erfolgt wahlweise monatlich oder jährlich im Voraus.
              </p>
              <p className="mt-2">
                (2) Die Abrechnung erfolgt über den Zahlungsdienstleister Stripe. Es gelten zusätzlich die Nutzungsbedingungen von Stripe.
              </p>
              <p className="mt-2">
                (3) Bei Zahlungsverzug ist der Anbieter berechtigt, den Zugang zum Service zu sperren, bis die ausstehenden Beträge beglichen sind.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">§ 6 Pflichten des Kunden</h2>
              <p>
                (1) Der Kunde verpflichtet sich, seine Zugangsdaten geheim zu halten und vor dem Zugriff Dritter zu schützen.
              </p>
              <p className="mt-2">
                (2) Der Kunde verpflichtet sich, den Service nicht missbräuchlich zu nutzen, insbesondere nicht:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>für rechtswidrige Zwecke</li>
                <li>zur Verbreitung von Spam</li>
                <li>zur Verbreitung von Malware oder Phishing-Links</li>
                <li>zur Verletzung von Rechten Dritter</li>
                <li>zur Überlastung der Serverinfrastruktur</li>
              </ul>
              <p className="mt-2">
                (3) Der Kunde ist für alle Inhalte und Links, die er über den Service erstellt, selbst verantwortlich.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">§ 7 Verfügbarkeit</h2>
              <p>
                (1) Der Anbieter bemüht sich um eine Verfügbarkeit des Services von 99% im Jahresmittel.
              </p>
              <p className="mt-2">
                (2) Nicht in die Berechnung einbezogen werden Zeiten, in denen der Service aufgrund von technischen oder sonstigen Problemen, die nicht im Einflussbereich des Anbieters liegen, nicht erreichbar ist.
              </p>
              <p className="mt-2">
                (3) Geplante Wartungsarbeiten werden rechtzeitig angekündigt und finden nach Möglichkeit außerhalb der üblichen Geschäftszeiten statt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">§ 8 Haftung</h2>
              <p>
                (1) Der Anbieter haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie für Vorsatz und grobe Fahrlässigkeit.
              </p>
              <p className="mt-2">
                (2) Bei leichter Fahrlässigkeit haftet der Anbieter nur bei Verletzung einer wesentlichen Vertragspflicht. Die Haftung ist in diesem Fall auf den vorhersehbaren, typischerweise eintretenden Schaden begrenzt.
              </p>
              <p className="mt-2">
                (3) Der Anbieter haftet nicht für entgangenen Gewinn, Datenverlust oder sonstige mittelbare Schäden.
              </p>
              <p className="mt-2">
                (4) Der Anbieter haftet nicht für Inhalte, die vom Kunden oder Dritten über den Service erstellt oder verbreitet werden.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">§ 9 Vertragslaufzeit und Kündigung</h2>
              <p>
                (1) Der kostenlose Tarif (Free) kann jederzeit ohne Angabe von Gründen gekündigt werden.
              </p>
              <p className="mt-2">
                (2) Kostenpflichtige Tarife können bei monatlicher Zahlung zum Ende des jeweiligen Abrechnungsmonats, bei jährlicher Zahlung zum Ende des Abrechnungsjahres gekündigt werden.
              </p>
              <p className="mt-2">
                (3) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.
              </p>
              <p className="mt-2">
                (4) Nach Beendigung des Vertrags werden die Daten des Kunden nach einer Frist von 30 Tagen gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">§ 10 Datenschutz</h2>
              <p>
                Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer Datenschutzerklärung, die unter <Link href="/datenschutz" className="text-camp-400 hover:underline">/datenschutz</Link> abrufbar ist.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">§ 11 Änderung der AGB</h2>
              <p>
                (1) Der Anbieter behält sich vor, diese AGB zu ändern, soweit dies für den Kunden zumutbar ist.
              </p>
              <p className="mt-2">
                (2) Änderungen werden dem Kunden mindestens 30 Tage vor Inkrafttreten per E-Mail mitgeteilt. Widerspricht der Kunde nicht innerhalb von 30 Tagen nach Zugang der Änderungsmitteilung, gelten die Änderungen als genehmigt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">§ 12 Schlussbestimmungen</h2>
              <p>
                (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
              </p>
              <p className="mt-2">
                (2) Gerichtsstand für alle Streitigkeiten ist, soweit gesetzlich zulässig, der Geschäftssitz des Anbieters.
              </p>
              <p className="mt-2">
                (3) Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
              </p>
            </section>

            <p className="text-midnight-500 text-sm mt-12">Stand: Dezember 2024</p>
          </div>
        </div>
      </main>

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
