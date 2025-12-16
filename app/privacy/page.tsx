import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Privacy Policy', description: 'CampKit Privacy Policy' }

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-midnight-900 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-midnight-400 mb-8">Last updated: December 2024</p>
        <div className="space-y-8 text-midnight-300">
          <section><h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2><p>CampKit is committed to protecting your privacy. This policy explains how we collect and use your data.</p></section>
          <section><h2 className="text-xl font-semibold text-white mb-3">2. Data We Collect</h2><p>Account info: email, name, password (encrypted). Usage: IP, browser, pages visited. Link clicks: timestamp, referrer, location.</p></section>
          <section><h2 className="text-xl font-semibold text-white mb-3">3. How We Use Data</h2><p>To provide the service, process payments, send communications, provide analytics, and improve our service.</p></section>
          <section><h2 className="text-xl font-semibold text-white mb-3">4. Data Sharing</h2><p>We don't sell data. We share with: Vercel (hosting), Neon (database), Stripe (payments) only as needed.</p></section>
          <section><h2 className="text-xl font-semibold text-white mb-3">5. Cookies</h2><p>We use only essential cookies for authentication. No tracking cookies.</p></section>
          <section><h2 className="text-xl font-semibold text-white mb-3">6. Your Rights (GDPR)</h2><p>You can access, correct, delete your data. Contact: t.kiene@montitech.de</p></section>
          <section><h2 className="text-xl font-semibold text-white mb-3">7. Contact</h2><p>Thomas Kiene, Im Roggesch 10C, 49635 Badbergen, Germany. t.kiene@montitech.de</p></section>
        </div>
        <div className="mt-12 pt-8 border-t border-midnight-800"><Link href="/" className="text-camp-400">← Back</Link></div>
      </div>
    </main>
  )
}
