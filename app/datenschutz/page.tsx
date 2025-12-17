import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Datenschutzerklärung | CampKit',
  description: 'Datenschutzerklärung von CampKit - Informationen zur Verarbeitung Ihrer Daten',
}

export default function Datenschutz() {
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
          <h1 className="font-display text-4xl font-bold mb-8">Datenschutzerklärung</h1>
          
          <div className="prose prose-invert prose-midnight max-w-none space-y-8 text-midnight-300">
            
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Datenschutz auf einen Blick</h2>
              
              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Allgemeine Hinweise</h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Datenerfassung auf dieser Website</h3>
              <p><strong className="text-white">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong></p>
              <p>
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber:<br /><br />
                Thomas Kiene<br />
                Im Roggesch 10c<br />
                49635 Badbergen<br />
                E-Mail: service@getcampkit.com
              </p>

              <p className="mt-4"><strong className="text-white">Wie erfassen wir Ihre Daten?</strong></p>
              <p>
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben oder bei der Registrierung angeben.
              </p>
              <p className="mt-2">
                Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
              </p>

              <p className="mt-4"><strong className="text-white">Wofür nutzen wir Ihre Daten?</strong></p>
              <p>
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
              </p>

              <p className="mt-4"><strong className="text-white">Welche Rechte haben Sie bezüglich Ihrer Daten?</strong></p>
              <p>
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Hosting</h2>
              <p>
                Wir hosten die Inhalte unserer Website bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
              </p>
              <p className="mt-2">
                Vercel ist Empfänger Ihrer personenbezogenen Daten und als Auftragsverarbeiter für uns tätig. Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an einer effizienten und sicheren Bereitstellung unserer Website gem. Art. 6 Abs. 1 lit. f DSGVO.
              </p>
              <p className="mt-2">
                Details entnehmen Sie der Datenschutzerklärung von Vercel: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-camp-400 hover:underline">https://vercel.com/legal/privacy-policy</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
              
              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Datenschutz</h3>
              <p>
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Hinweis zur verantwortlichen Stelle</h3>
              <p>
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
                Thomas Kiene<br />
                Im Roggesch 10c<br />
                49635 Badbergen<br />
                E-Mail: service@getcampkit.com
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Speicherdauer</h3>
              <p>
                Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
              <p>
                Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Recht auf Datenübertragbarkeit</h3>
              <p>
                Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Auskunft, Löschung und Berichtigung</h3>
              <p>
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Recht auf Einschränkung der Verarbeitung</h3>
              <p>
                Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Datenerfassung auf dieser Website</h2>
              
              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Cookies</h3>
              <p>
                Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
              </p>
              <p className="mt-2">
                Wir verwenden technisch notwendige Cookies für die Authentifizierung und Session-Verwaltung.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Server-Log-Dateien</h3>
              <p>
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p className="mt-2">
                Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Registrierung auf dieser Website</h3>
              <p>
                Sie können sich auf dieser Website registrieren, um zusätzliche Funktionen auf der Seite zu nutzen. Die dazu eingegebenen Daten verwenden wir nur zum Zwecke der Nutzung des jeweiligen Angebotes oder Dienstes, für den Sie sich registriert haben. Die bei der Registrierung abgefragten Pflichtangaben müssen vollständig angegeben werden.
              </p>
              <p className="mt-2">
                Wir speichern: E-Mail-Adresse, Name (optional), Passwort (verschlüsselt).
              </p>
              <p className="mt-2">
                Die Registrierungsdaten werden so lange gespeichert, wie Ihr Account aktiv ist. Nach Löschung des Accounts werden die Daten gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Analyse-Tools</h2>
              
              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Google Analytics</h3>
              <p>
                Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
              </p>
              <p className="mt-2">
                Google Analytics ermöglicht es dem Websitebetreiber, das Verhalten der Websitebesucher zu analysieren. Die Nutzung erfolgt auf Grundlage Ihrer Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO.
              </p>
              <p className="mt-2">
                Wir haben IP-Anonymisierung aktiviert. Ihre IP-Adresse wird von Google innerhalb von Mitgliedstaaten der EU gekürzt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Zahlungsanbieter</h2>
              
              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Stripe</h3>
              <p>
                Wir nutzen Stripe für die Zahlungsabwicklung. Anbieter ist Stripe Payments Europe, Ltd., 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Irland.
              </p>
              <p className="mt-2">
                Bei Zahlungen mit Kreditkarte oder anderen Zahlungsmitteln werden die von Ihnen eingegebenen Zahlungsdaten an Stripe übermittelt. Die Übermittlung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
              </p>
              <p className="mt-2">
                Details entnehmen Sie der Datenschutzerklärung von Stripe: <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer" className="text-camp-400 hover:underline">https://stripe.com/de/privacy</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Klick-Tracking für Short-Links</h2>
              <p>
                Wenn Sie einen mit CampKit erstellten Short-Link anklicken, erfassen wir folgende anonyme Daten:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Zeitstempel des Klicks</li>
                <li>Ungefährer Standort (Land, Stadt) basierend auf IP</li>
                <li>Gerätetyp (Desktop, Mobile, Tablet)</li>
                <li>Browser und Betriebssystem</li>
                <li>Referrer (woher der Klick kam)</li>
              </ul>
              <p className="mt-2">
                Die IP-Adresse wird nicht gespeichert. Diese Daten werden ausschließlich für statistische Zwecke verwendet und können nicht auf einzelne Personen zurückgeführt werden.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Kontakt</h2>
              <p>
                Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten, bei Auskünften, Berichtigung, Sperrung oder Löschung von Daten wenden Sie sich an:
              </p>
              <p className="mt-2">
                Thomas Kiene<br />
                E-Mail: <a href="mailto:service@getcampkit.com" className="text-camp-400 hover:underline">service@getcampkit.com</a>
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
