import Link from 'next/link'

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-midnight-800">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center">
                <span className="text-midnight-900 font-bold text-sm">C</span>
              </div>
              <span className="font-display font-semibold text-lg">CampKit</span>
            </div>
            <p className="text-midnight-400 text-sm">The affordable UTM link manager.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-midnight-400">
              <li><Link href="/#pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Compare</h4>
            <ul className="space-y-2 text-sm text-midnight-400">
              <li><Link href="/vs-utmio" className="hover:text-white">vs UTM.io</Link></li>
              <li><Link href="/vs-bitly" className="hover:text-white">vs Bitly</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-midnight-400">
              <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
              <li><Link href="/impressum" className="hover:text-white">Impressum</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-midnight-800 text-center text-midnight-500 text-sm">
          © {new Date().getFullYear()} CampKit
        </div>
      </div>
    </footer>
  )
}
