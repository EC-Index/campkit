import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'CampKit vs Bitly', description: 'Compare CampKit vs Bitly for UTM tracking. CampKit is built for campaign management.' }

export default function VsBitlyPage() {
  return (
    <main className="min-h-screen bg-midnight-900 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display text-4xl font-bold text-center mb-4">CampKit vs Bitly</h1>
        <p className="text-xl text-midnight-300 text-center mb-12">Need UTM tracking? CampKit is purpose-built for campaigns. Bitly is a general link shortener.</p>
        
        <div className="gradient-border p-8 mb-12">
          <h2 className="font-display text-2xl font-bold mb-4 text-center">Key Difference</h2>
          <p className="text-midnight-300 text-center"><strong className="text-camp-400">CampKit</strong> = UTM-focused campaign management<br/><strong className="text-midnight-400">Bitly</strong> = General link shortening</p>
        </div>

        <div className="space-y-6 mb-12">
          <div className="gradient-border p-6"><h3 className="font-semibold text-lg mb-2">UTM Builder</h3><p className="text-midnight-300"><strong className="text-camp-400">CampKit:</strong> Dedicated builder with templates. <strong className="text-midnight-400">Bitly:</strong> Basic UTM support.</p></div>
          <div className="gradient-border p-6"><h3 className="font-semibold text-lg mb-2">Pricing</h3><p className="text-midnight-300"><strong className="text-camp-400">CampKit:</strong> Free tier, Pro $9/mo unlimited. <strong className="text-midnight-400">Bitly:</strong> Free limited, paid from $8/mo.</p></div>
        </div>

        <div className="text-center">
          <Link href="/signup" className="inline-block px-8 py-4 bg-camp-500 text-midnight-900 font-semibold rounded-xl">Get Started Free →</Link>
        </div>
        <div className="mt-12 pt-8 border-t border-midnight-800"><Link href="/" className="text-camp-400">← Back</Link></div>
      </div>
    </main>
  )
}
