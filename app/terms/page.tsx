import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Terms of Service | CampKit',
  description: 'Terms of Service for CampKit - UTM Link Builder & Campaign Tracking',
}

export default function Terms() {
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
              Get Started Free →
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl font-bold mb-8">Terms of Service</h1>

          <div className="prose prose-invert prose-midnight max-w-none space-y-8 text-midnight-300">

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using CampKit ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use the Service.
              </p>
              <p className="mt-2">
                CampKit is operated by Thomas Kiene, Im Roggesch 10c, 49635 Badbergen, Germany ("Provider").
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Description of Service</h2>
              <p>
                CampKit provides a web-based platform for creating and managing UTM-tagged marketing links and short URLs. The specific features available depend on your subscription plan.
              </p>
              <p className="mt-2">
                The Provider reserves the right to modify, expand, or discontinue any part of the Service at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. Account Registration</h2>
              <p>
                (1) You must provide accurate and complete information when creating an account.
              </p>
              <p className="mt-2">
                (2) You are responsible for maintaining the security of your account credentials.
              </p>
              <p className="mt-2">
                (3) You are responsible for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Pricing and Payment</h2>
              <p>
                (1) The Service is offered in various plans: Free, Pro, Team, and Business. Current pricing is available on our website.
              </p>
              <p className="mt-2">
                (2) Payments are processed through Stripe. By subscribing, you also agree to Stripe's terms of service.
              </p>
              <p className="mt-2">
                (3) Prices may change with 30 days notice. Price changes apply only to new billing periods.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Prohibited Uses and Abuse Policy</h2>
              <p>
                You agree not to use the Service for any unlawful purpose. <strong className="text-red-400">The following uses are strictly prohibited:</strong>
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li><strong>Fraud and Scams:</strong> Creating links to fraudulent websites, fake giveaways, Ponzi schemes, or any other deceptive practices</li>
                <li><strong>Phishing:</strong> Creating links to pages that steal personal data, passwords, credit card information, or cryptocurrency</li>
                <li><strong>Malware:</strong> Distributing viruses, trojans, ransomware, or other malicious software</li>
                <li><strong>Spam:</strong> Sending unsolicited bulk messages or advertisements</li>
                <li><strong>Illegal Content:</strong> Links to illegal downloads, child abuse material, terrorism, or violence</li>
                <li><strong>Copyright Infringement:</strong> Links to pirated content</li>
                <li><strong>Identity Theft:</strong> Impersonating other individuals or brands</li>
                <li><strong>Infrastructure Abuse:</strong> Bot traffic, automated mass-clicking, or DDoS-like activities</li>
              </ul>
              <p className="mt-4">
                <strong className="text-white">The Provider reserves the right to delete links and accounts that violate these terms without prior notice and without refund.</strong> Serious violations may be reported to law enforcement authorities.
              </p>
              <p className="mt-2">
                Suspicious activities are automatically detected and logged. IP addresses and usage data are stored in cases of abuse and may be shared with law enforcement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Abuse Reporting</h2>
              <p>
                (1) Reports of abusive links can be sent to <a href="mailto:abuse@getcampkit.com" className="text-camp-400 hover:underline">abuse@getcampkit.com</a>.
              </p>
              <p className="mt-2">
                (2) The Provider will review reported links within 24 hours and remove any content that violates these Terms.
              </p>
              <p className="mt-2">
                (3) The Provider cooperates fully with law enforcement in investigating fraud and phishing cases.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Limitation of Liability</h2>
              <p>
                (1) The Provider is not liable for any content created by users through the Service.
              </p>
              <p className="mt-2">
                (2) You agree to indemnify and hold the Provider harmless from any claims arising from your use of the Service.
              </p>
              <p className="mt-2">
                (3) The Provider's liability is limited to the amount paid by you for the Service in the 12 months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Termination</h2>
              <p>
                (1) Free accounts may be terminated at any time.
              </p>
              <p className="mt-2">
                (2) Paid subscriptions may be cancelled at the end of the current billing period.
              </p>
              <p className="mt-2">
                (3) The Provider may terminate accounts that violate these Terms immediately without refund.
              </p>
              <p className="mt-2">
                (4) Upon termination, your data will be deleted after 30 days unless required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">9. Privacy</h2>
              <p>
                Your use of the Service is also governed by our <Link href="/privacy" className="text-camp-400 hover:underline">Privacy Policy</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">10. Changes to Terms</h2>
              <p>
                We may modify these Terms at any time. Changes will be communicated via email at least 30 days before taking effect.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">11. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the Federal Republic of Germany. The place of jurisdiction is the Provider's registered office.
              </p>
            </section>

            <p className="text-midnight-500 text-sm mt-12">Last updated: December 2024</p>
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
            <a href="mailto:abuse@getcampkit.com" className="text-red-400 hover:text-red-300 transition-colors">Report Abuse</a>
          </div>
          <p className="text-midnight-500 text-sm">© 2024 CampKit. Made in Germany 🇩🇪</p>
        </div>
      </footer>
    </div>
  )
}
