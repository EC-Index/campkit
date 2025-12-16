import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'FAQ', description: 'Frequently asked questions about CampKit UTM Link Manager.' }

const faqs = [
  { q: 'What is CampKit?', a: 'CampKit is a UTM link manager that helps marketing teams create, organize, and track campaign links. It\'s an affordable alternative to UTM.io with plans starting at $0/month.' },
  { q: 'How much does CampKit cost?', a: 'CampKit offers a free tier with 50 links. Paid plans: Pro $9/month, Team $29/month, Business $79/month. Save up to 50% vs UTM.io.' },
  { q: 'Is CampKit a good UTM.io alternative?', a: 'Yes. CampKit offers similar features at lower prices. Free tier available, Pro at $9/mo vs UTM.io\'s $19/mo.' },
  { q: 'What features does the free plan include?', a: '50 UTM links, basic analytics, link shortener, CSV export. No credit card required.' },
  { q: 'Can I use custom domains?', a: 'Yes, custom short domains are available on Pro plan ($9/month) and above.' },
  { q: 'Does CampKit have team features?', a: 'Yes. Team plan ($29/mo) includes 5 members, workspaces, permissions, shared templates, and API access.' },
  { q: 'Is there an API?', a: 'Yes, API access is included in Team plan and above.' },
  { q: 'Can I import existing links?', a: 'Yes, bulk import via CSV is supported.' },
  { q: 'Is my data secure?', a: 'Yes. HTTPS encryption, bcrypt passwords, secure hosting on Vercel/Neon. GDPR compliant.' },
  { q: 'Can I cancel anytime?', a: 'Yes, cancel anytime. No long-term contracts.' }
]

export default function FAQPage() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-midnight-900 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl font-bold text-center mb-12">Frequently Asked Questions</h1>
          <div className="space-y-6">
            {faqs.map((f, i) => <div key={i} className="gradient-border p-6"><h2 className="font-display font-semibold text-lg mb-3">{f.q}</h2><p className="text-midnight-300">{f.a}</p></div>)}
          </div>
          <div className="mt-12 pt-8 border-t border-midnight-800"><Link href="/" className="text-camp-400">← Back</Link></div>
        </div>
      </main>
    </>
  )
}
