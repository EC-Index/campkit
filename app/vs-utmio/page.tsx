import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'CampKit vs UTM.io', description: 'Compare CampKit vs UTM.io. Save up to 50% with similar features. Free tier available.' }

export default function VsUtmioPage() {
  return (
    <main className="min-h-screen bg-midnight-900 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">CampKit vs UTM.io</h1>
        <p className="text-xl text-midnight-300 text-center mb-12">Looking for a UTM.io alternative? CampKit offers similar features at up to 50% lower cost.</p>
        
        <div className="gradient-border p-8 mb-12">
          <h2 className="font-display text-2xl font-bold mb-4 text-center">Quick Summary</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div><h3 className="text-camp-400 font-semibold mb-2">Choose CampKit if:</h3><ul className="space-y-2 text-midnight-300"><li>✓ Lower pricing (save 50%)</li><li>✓ Free tier with 50 links</li><li>✓ Simple, focused UTM management</li></ul></div>
            <div><h3 className="text-midnight-400 font-semibold mb-2">Choose UTM.io if:</h3><ul className="space-y-2 text-midnight-300"><li>• Need Chrome extension</li><li>• Need QR codes</li><li>• Enterprise features</li></ul></div>
          </div>
        </div>

        <h2 className="font-display text-2xl font-bold mb-6">Pricing Comparison</h2>
        <table className="w-full text-left mb-12">
          <thead><tr className="border-b border-midnight-700"><th className="py-4 px-4">Plan</th><th className="py-4 px-4 text-camp-400">CampKit</th><th className="py-4 px-4 text-midnight-400">UTM.io</th><th className="py-4 px-4">Savings</th></tr></thead>
          <tbody className="text-midnight-300">
            <tr className="border-b border-midnight-800"><td className="py-4 px-4">Free</td><td className="py-4 px-4 text-camp-400">$0/mo</td><td className="py-4 px-4">Limited</td><td className="py-4 px-4">-</td></tr>
            <tr className="border-b border-midnight-800"><td className="py-4 px-4">Pro</td><td className="py-4 px-4 text-camp-400">$9/mo</td><td className="py-4 px-4">$19/mo</td><td className="py-4 px-4 text-camp-400">53%</td></tr>
            <tr className="border-b border-midnight-800"><td className="py-4 px-4">Team</td><td className="py-4 px-4 text-camp-400">$29/mo</td><td className="py-4 px-4">$69/mo</td><td className="py-4 px-4 text-camp-400">58%</td></tr>
            <tr className="border-b border-midnight-800"><td className="py-4 px-4">Business</td><td className="py-4 px-4 text-camp-400">$79/mo</td><td className="py-4 px-4">$159/mo</td><td className="py-4 px-4 text-camp-400">50%</td></tr>
          </tbody>
        </table>

        <div className="text-center">
          <h2 className="font-display text-2xl font-bold mb-4">Ready to switch?</h2>
          <Link href="/signup" className="inline-block px-8 py-4 bg-camp-500 text-midnight-900 font-semibold rounded-xl">Get Started Free →</Link>
        </div>
        <div className="mt-12 pt-8 border-t border-midnight-800"><Link href="/" className="text-camp-400">← Back</Link></div>
      </div>
    </main>
  )
}
