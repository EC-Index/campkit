import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Terms of Service | CampKit',
  description: 'Terms of Service for CampKit - Terms and conditions for using our service',
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
              Start Free →
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
              <h2 className="text-xl font-semibold text-white mb-4">§ 1 Scope</h2>
              <p>
                (1) These Terms of Service (hereinafter "Terms") apply to all contracts between Thomas Kiene, Im Roggesch 10c, 49635 Badbergen, Germany (hereinafter "Provider") and the customer (hereinafter "Customer") regarding the use of the software-as-a-service solution "CampKit" (hereinafter "Service").
              </p>
              <p className="mt-2">
                (2) Deviating, conflicting, or supplementary general terms and conditions of the Customer shall not become part of the contract unless their validity is expressly agreed to in writing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">§ 2 Subject Matter</h2>
              <p>
                (1) The Provider provides the Customer with a web-based software for creating and managing UTM links as well as for creating short links via the Internet.
              </p>
              <p className="mt-2">
                (2) The Service includes different features depending on the selected plan. The exact scope of services is shown in the current pricing overview on the website.
              </p>
              <p className="mt-2">
                (3) The Provider is entitled to expand, modify, and adapt the Service at any time, provided this is reasonable for the Customer.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">§ 3 Contract Formation and Registration</h2>
              <p>
                (1) The presentation of the Service on the website does not constitute a legally binding offer but an invitation to place an order.
              </p>
              <p className="mt-2">
                (2) By registering, the Customer makes a binding offer to enter into a usage contract. The contract is concluded when the Provider confirms the registration by activating the customer account.
              </p>
              <p className="mt-2">
                (3) The Customer warrants that all data provided during registration is truthful and complete.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">§ 4 Plans and Pricing</h2>
              <p>
                (1) The Service is offered in various plans: Free, Pro, Team, and Business. The current scope of services and prices are shown in the pricing overview on the website.
              </p>
              <p className="mt-2">
                (2) All prices are net prices plus applicable value-added tax.
              </p>
              <p className="mt-2">
                (3) The Provider reserves the right to change prices with a notice period of 30 days. Price increases only apply to new billing periods.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">§ 5 Payment Terms</h2>
              <p>
                (1) Payment is made monthly or annually in advance, at the Customer's choice.
              </p>
              <p className="mt-2">
                (2) Billing is processed through the payment service provider Stripe. Stripe's terms of use also apply.
              </p>
              <p className="mt-2">
                (3) In the event of default in payment, the Provider is entitled to block access to the Service until the outstanding amounts have been paid.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">§ 6 Customer Obligations</h2>
              <p>
                (1) The Customer undertakes to keep their access data secret and to protect it from access by third parties.
              </p>
              <p className="mt-2">
                (2) The Customer undertakes not to misuse the Service, in particular not to use it:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>for illegal purposes</li>
                <li>to distribute spam</li>
                <li>to distribute malware or phishing links</li>
                <li>to infringe the rights of third parties</li>
                <li>to overload the server infrastructure</li>
              </ul>
              <p className="mt-2">
                (3) The Customer is solely responsible for all content and links they create through the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">§ 7 Availability</h2>
              <p>
                (1) The Provider strives for an availability of the Service of 99% on an annual average.
              </p>
              <p className="mt-2">
                (2) Times when the Service is not accessible due to technical or other problems beyond the Provider's control are not included in the calculation.
              </p>
              <p className="mt-2">
                (3) Planned maintenance work will be announced in advance and will take place outside normal business hours whenever possible.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">§ 8 Liability</h2>
              <p>
                (1) The Provider shall be liable without limitation for damages resulting from injury to life, body, or health, as well as for intent and gross negligence.
              </p>
              <p className="mt-2">
                (2) In the case of slight negligence, the Provider shall only be liable for breach of a material contractual obligation. In this case, liability is limited to the foreseeable, typically occurring damage.
              </p>
              <p className="mt-2">
                (3) The Provider shall not be liable for lost profits, data loss, or other indirect damages.
              </p>
              <p className="mt-2">
                (4) The Provider shall not be liable for content created or distributed by the Customer or third parties through the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">§ 9 Contract Duration and Termination</h2>
              <p>
                (1) The free plan (Free) can be terminated at any time without giving reasons.
              </p>
              <p className="mt-2">
                (2) Paid plans can be terminated at the end of the respective billing month for monthly payments, or at the end of the billing year for annual payments.
              </p>
              <p className="mt-2">
                (3) The right to extraordinary termination for good cause remains unaffected.
              </p>
              <p className="mt-2">
                (4) After termination of the contract, the Customer's data will be deleted after a period of 30 days, unless legal retention obligations exist.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">§ 10 Data Protection</h2>
              <p>
                The processing of personal data is carried out in accordance with our Privacy Policy, which is available at <Link href="/privacy" className="text-camp-400 hover:underline">/privacy</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">§ 11 Changes to the Terms</h2>
              <p>
                (1) The Provider reserves the right to change these Terms, provided this is reasonable for the Customer.
              </p>
              <p className="mt-2">
                (2) Changes will be communicated to the Customer by email at least 30 days before they take effect. If the Customer does not object within 30 days of receipt of the change notification, the changes shall be deemed approved.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">§ 12 Final Provisions</h2>
              <p>
                (1) The law of the Federal Republic of Germany shall apply, excluding the UN Convention on Contracts for the International Sale of Goods.
              </p>
              <p className="mt-2">
                (2) The place of jurisdiction for all disputes shall be the Provider's place of business, to the extent permitted by law.
              </p>
              <p className="mt-2">
                (3) Should individual provisions of these Terms be or become invalid, the validity of the remaining provisions shall remain unaffected.
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
          </div>
          <p className="text-midnight-500 text-sm">© 2024 CampKit. Made in Germany 🇩🇪</p>
        </div>
      </footer>
    </div>
  )
}
