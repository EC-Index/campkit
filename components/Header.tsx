'use client'

import Link from 'next/link'
import Image from 'next/image'

interface HeaderProps {
  showLogin?: boolean
  sticky?: boolean
}

export function Header({ showLogin = true, sticky = true }: HeaderProps) {
  return (
    <header className={`${sticky ? 'fixed top-0 left-0 right-0 z-50' : ''} bg-midnight-900/90 backdrop-blur-xl border-b border-midnight-800/50`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Image
            src="/logo.png"
            alt="CampKit"
            width={36}
            height={36}
            className="rounded-xl"
          />
          <span className="font-display font-semibold text-lg">
            <span className="text-white">Camp</span>
            <span className="text-camp-500">Kit</span>
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {showLogin && (
            <Link href="/login" className="text-midnight-400 hover:text-white text-sm hidden sm:block">
              Login
            </Link>
          )}
          <Link 
            href="/signup" 
            className="px-5 py-2.5 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-all hover:scale-105"
          >
            Start Free →
          </Link>
        </div>
      </div>
    </header>
  )
}

// Footer with logo
export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-midnight-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="CampKit"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="font-display font-semibold">
            <span className="text-white">Camp</span>
            <span className="text-camp-500">Kit</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-6 text-sm text-midnight-400">
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <Link href="/compare" className="hover:text-white transition-colors">Compare</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <Link href="/login" className="hover:text-white transition-colors">Login</Link>
        </div>
        
        <p className="text-midnight-500 text-sm">
          © 2024 CampKit. Made in Germany 🇩🇪
        </p>
      </div>
    </footer>
  )
}
