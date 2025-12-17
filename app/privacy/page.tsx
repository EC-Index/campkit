import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Privacy Policy | CampKit',
  description: 'Privacy Policy for CampKit - How we handle your data',
}

export default function Privacy() {
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
          <h1 className="font-display text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-invert prose-midnight max-w-none space-y-8 text-midnight-300">
            
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Privacy at a Glance</h2>
              
              <h3 className="text-lg font-semibold text-white mt-6 mb-3">General Information</h3>
              <p>
                The following information provides a simple overview of what happens to your personal data when you visit this website. Personal data is any data that can be used to personally identify you.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Data Collection on This Website</h3>
              <p><strong className="text-white">Who is responsible for data collection on this website?</strong></p>
              <p>
                Data processing on this website is carried out by the website operator:<br /><br />
                Thomas Kiene<br />
                Im Roggesch 10c<br />
                49635 Badbergen, Germany<br />
                Email: service@getcampkit.com
              </p>

              <p className="mt-4"><strong className="text-white">How do we collect your data?</strong></p>
              <p>
                Your data is collected when you provide it to us. This may be data you enter in a contact form or when registering.
              </p>
              <p className="mt-2">
                Other data is automatically collected or collected with your consent when you visit the website by our IT systems. This is primarily technical data (e.g., internet browser, operating system, or time of page access).
              </p>

              <p className="mt-4"><strong className="text-white">What do we use your data for?</strong></p>
              <p>
                Part of the data is collected to ensure error-free provision of the website. Other data may be used to analyze your user behavior.
              </p>

              <p className="mt-4"><strong className="text-white">What rights do you have regarding your data?</strong></p>
              <p>
                You have the right to receive free information about the origin, recipient, and purpose of your stored personal data at any time. You also have the right to request the correction or deletion of this data. If you have given consent to data processing, you can revoke this consent at any time for the future.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Hosting</h2>
              <p>
                We host the content of our website with Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
              </p>
              <p className="mt-2">
                Vercel is a recipient of your personal data and acts as a processor on our behalf. Processing is based on our legitimate interest in the efficient and secure provision of our website pursuant to Art. 6(1)(f) GDPR.
              </p>
              <p className="mt-2">
                For details, see Vercel's privacy policy: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-camp-400 hover:underline">https://vercel.com/legal/privacy-policy</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. General Information and Mandatory Information</h2>
              
              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Data Protection</h3>
              <p>
                The operators of these pages take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with statutory data protection regulations and this privacy policy.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Information About the Responsible Party</h3>
              <p>
                The responsible party for data processing on this website is:<br /><br />
                Thomas Kiene<br />
                Im Roggesch 10c<br />
                49635 Badbergen, Germany<br />
                Email: service@getcampkit.com
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Storage Duration</h3>
              <p>
                Unless a more specific storage period is stated in this privacy policy, your personal data will remain with us until the purpose for data processing no longer applies. If you assert a legitimate request for deletion or revoke consent for data processing, your data will be deleted unless we have other legally permissible reasons for storing your personal data.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Revocation of Your Consent to Data Processing</h3>
              <p>
                Many data processing operations are only possible with your express consent. You can revoke consent you have already given at any time. The legality of data processing carried out before the revocation remains unaffected by the revocation.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Right to Data Portability</h3>
              <p>
                You have the right to have data that we process automatically based on your consent or in fulfillment of a contract handed over to you or to a third party in a common, machine-readable format.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Information, Deletion, and Correction</h3>
              <p>
                Within the framework of applicable legal provisions, you have the right to free information about your stored personal data, its origin and recipients, and the purpose of data processing at any time, and if applicable, a right to correction or deletion of this data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Data Collection on This Website</h2>
              
              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Cookies</h3>
              <p>
                Our website uses so-called "cookies." Cookies are small data packets and do not cause any damage to your device. They are either stored temporarily for the duration of a session (session cookies) or permanently (permanent cookies) on your device.
              </p>
              <p className="mt-2">
                We use technically necessary cookies for authentication and session management.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Server Log Files</h3>
              <p>
                The provider of the pages automatically collects and stores information in so-called server log files, which your browser automatically transmits to us. These are:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Browser type and version</li>
                <li>Operating system used</li>
                <li>Referrer URL</li>
                <li>Hostname of the accessing computer</li>
                <li>Time of server request</li>
                <li>IP address</li>
              </ul>
              <p className="mt-2">
                This data is not merged with other data sources.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Registration on This Website</h3>
              <p>
                You can register on this website to use additional functions. We use the data entered only for the purpose of using the respective offer or service for which you have registered.
              </p>
              <p className="mt-2">
                We store: email address, name (optional), password (encrypted).
              </p>
              <p className="mt-2">
                Registration data is stored as long as your account is active. After deleting the account, the data will be deleted unless legal retention obligations exist.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Analytics Tools</h2>
              
              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Google Analytics</h3>
              <p>
                This website uses functions of the web analytics service Google Analytics. The provider is Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland.
              </p>
              <p className="mt-2">
                Google Analytics enables the website operator to analyze the behavior of website visitors. Use is based on your consent pursuant to Art. 6(1)(a) GDPR.
              </p>
              <p className="mt-2">
                We have activated IP anonymization. Your IP address is shortened by Google within member states of the EU.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Payment Providers</h2>
              
              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Stripe</h3>
              <p>
                We use Stripe for payment processing. The provider is Stripe Payments Europe, Ltd., 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Ireland.
              </p>
              <p className="mt-2">
                When paying by credit card or other payment methods, the payment data you enter is transmitted to Stripe. Transmission is based on Art. 6(1)(b) GDPR (contract fulfillment).
              </p>
              <p className="mt-2">
                For details, see Stripe's privacy policy: <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-camp-400 hover:underline">https://stripe.com/privacy</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Click Tracking for Short Links</h2>
              <p>
                When you click on a short link created with CampKit, we collect the following anonymous data:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Timestamp of the click</li>
                <li>Approximate location (country, city) based on IP</li>
                <li>Device type (desktop, mobile, tablet)</li>
                <li>Browser and operating system</li>
                <li>Referrer (where the click came from)</li>
              </ul>
              <p className="mt-2">
                The IP address is not stored. This data is used exclusively for statistical purposes and cannot be traced back to individuals.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Contact</h2>
              <p>
                If you have questions about the collection, processing, or use of your personal data, please contact:
              </p>
              <p className="mt-2">
                Thomas Kiene<br />
                Email: <a href="mailto:service@getcampkit.com" className="text-camp-400 hover:underline">service@getcampkit.com</a>
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
