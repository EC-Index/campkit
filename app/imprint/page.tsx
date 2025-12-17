import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Imprint | CampKit',
  description: 'Legal notice and provider identification for CampKit',
}

export default function Imprint() {
  return (
    <div className="min-h-screen bg-midnight-900 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-midnight-900/90 backdrop-blur-xl border-b border-midnight-800/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="CampKit" width={180} height={45} className="h-36 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-midnight-400 hover:text-white text-sm hidden sm:block">Login</Link>
            <Link href="/signup" className="px-5 py-2.5 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-all hover:scale-105">
              Start Free →
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl font-bold mb-8">Imprint</h1>
          
          <div className="prose prose-invert prose-midnight max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Information according to § 5 TMG (German Telemedia Act)</h2>
              <p className="text-midnight-300">
                Thomas Kiene<br />
                Im Roggesch 10c<br />
                49635 Badbergen<br />
                Germany
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Contact</h2>
              <p className="text-midnight-300">
                Email: <a href="mailto:service@getcampkit.com" className="text-camp-400 hover:underline">service@getcampkit.com</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">VAT ID</h2>
              <p className="text-midnight-300">
                VAT identification number according to § 27 a of the German VAT Act:<br />
                Not applicable (small business regulation)
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">EU Dispute Resolution</h2>
              <p className="text-midnight-300">
                The European Commission provides a platform for online dispute resolution (ODR): 
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-camp-400 hover:underline"> https://ec.europa.eu/consumers/odr/</a>
              </p>
              <p className="text-midnight-300 mt-2">
                You can find our email address in the imprint above.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Consumer Dispute Resolution</h2>
              <p className="text-midnight-300">
                We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Liability for Content</h2>
              <p className="text-midnight-300">
                As a service provider, we are responsible for our own content on these pages in accordance with general laws pursuant to Section 7 (1) of the German Telemedia Act (TMG). However, according to Sections 8 to 10 TMG, we are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.
              </p>
              <p className="text-midnight-300 mt-2">
                Obligations to remove or block the use of information under general law remain unaffected. However, liability in this regard is only possible from the time of knowledge of a specific infringement. Upon becoming aware of such violations, we will remove this content immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Liability for Links</h2>
              <p className="text-midnight-300">
                Our website contains links to external third-party websites over whose content we have no control. Therefore, we cannot accept any liability for this external content. The respective provider or operator of the linked pages is always responsible for the content of the linked pages.
              </p>
              <p className="text-midnight-300 mt-2">
                The linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognizable at the time of linking. However, permanent monitoring of the content of the linked pages is not reasonable without concrete evidence of a violation. If we become aware of any legal violations, we will remove such links immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Copyright</h2>
              <p className="text-midnight-300">
                The content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution, and any kind of exploitation outside the limits of copyright law require the written consent of the respective author or creator.
              </p>
              <p className="text-midnight-300 mt-2">
                Downloads and copies of this site are only permitted for private, non-commercial use. Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected. Should you nevertheless become aware of a copyright infringement, please inform us accordingly. If we become aware of any infringements, we will remove such content immediately.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-midnight-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/">
            <Image src="/logo.png" alt="CampKit" width={180} height={45} className="h-36 w-auto" />
          </Link>
          <div className="flex items-center gap-6 text-sm text-midnight-400 flex-wrap justify-center">
            <Link href="/imprint" className="hover:text-white transition-colors">Imprint</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <a href="mailto:service@getcampkit.com" className="hover:text-white transition-colors">Support</a>
          </div>
          <p className="text-midnight-500 text-sm">© 2024 CampKit. Made in Germany 🇩🇪</p>
        </div>
      </footer>
    </div>
  )
}
