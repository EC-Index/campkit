import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Terms of Service', description: 'CampKit Terms of Service' }

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-midnight-900 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-midnight-400 mb-8">Last updated: December 2024</p>
        <div className="space-y-8 text-midnight-300">
          <section><h2 className="text-xl font-semibold text-white mb-3">1. Agreement</h2><p>By using CampKit, you agree to these terms.</p></section>
          <section><h2 className="text-xl font-semibold text-white mb-3">2. Service</h2><p>CampKit provides UTM link management including link builder, shortener, analytics, and team features.</p></section>
          <section><h2 className="text-xl font-semibold text-white mb-3">3. Accounts</h2><p>You're responsible for your password and account activity.</p></section>
          <section><h2 className="text-xl font-semibold text-white mb-3">4. Acceptable Use</h2><p>Don't use CampKit for illegal activities, spam, malware, or to infringe on others' rights.</p></section>
          <section><h2 className="text-xl font-semibold text-white mb-3">5. Payments</h2><p>Paid plans billed monthly. Cancel anytime. No refunds for partial months.</p></section>
          <section><h2 className="text-xl font-semibold text-white mb-3">6. Limitation of Liability</h2><p>CampKit is provided "as is". We're not liable for indirect damages.</p></section>
          <section><h2 className="text-xl font-semibold text-white mb-3">7. Governing Law</h2><p>These terms are governed by German law.</p></section>
          <section><h2 className="text-xl font-semibold text-white mb-3">8. Contact</h2><p>t.kiene@montitech.de</p></section>
        </div>
        <div className="mt-12 pt-8 border-t border-midnight-800"><Link href="/" className="text-camp-400">← Back</Link></div>
      </div>
    </main>
  )
}
