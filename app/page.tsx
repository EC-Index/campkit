'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Footer } from '@/components/Footer'

export default function Home() {
  const { data: session } = useSession()
  return (
    <main className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-midnight-900/80 backdrop-blur-xl border-b border-midnight-700/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center"><span className="text-midnight-900 font-bold text-sm">C</span></div>
            <span className="font-display font-semibold text-lg">CampKit</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-midnight-300">
            <Link href="/#pricing" className="hover:text-white">Pricing</Link>
            <Link href="/faq" className="hover:text-white">FAQ</Link>
            <Link href="/vs-utmio" className="hover:text-white">vs UTM.io</Link>
          </div>
          <div className="flex items-center gap-4">
            {session ? <Link href="/dashboard" className="btn-primary">Dashboard</Link> : (
              <><Link href="/login" className="text-midnight-300 hover:text-white">Login</Link><Link href="/signup" className="btn-primary">Get Started</Link></>
            )}
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-camp-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-midnight-800 rounded-full border border-midnight-700 mb-8">
            <span className="text-camp-400">★★★★★</span><span className="text-sm text-midnight-300">Trusted by 500+ marketers</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">The <span className="gradient-text">affordable UTM.io alternative</span> for marketing teams</h1>
          <p className="text-xl text-midnight-300 max-w-2xl mx-auto mb-10">CampKit helps you create, organize, and track UTM campaign links in one place. Save up to 50% compared to UTM.io. Free tier available.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="px-8 py-4 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-xl">Get Started Free →</Link>
            <Link href="/vs-utmio" className="px-8 py-4 border border-midnight-600 text-midnight-200 rounded-xl">Compare to UTM.io</Link>
          </div>
          <p className="mt-4 text-sm text-midnight-500">Free forever • No credit card required</p>
        </div>
      </section>

      <section className="py-16 px-6 bg-midnight-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold mb-4">What is CampKit?</h2>
          <p className="text-midnight-300 text-lg">CampKit is a <strong className="text-white">UTM link manager</strong> designed as an <strong className="text-white">affordable alternative to UTM.io</strong>, with plans starting at <strong className="text-white">$0/month</strong>. Includes UTM builder, link shortener, click analytics, and team features.</p>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-midnight-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12">Sound familiar?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[{e:'📊',t:'Spreadsheet chaos',d:'Your UTM links live in Google Sheets. Half are broken.'},{e:'💸',t:'Tools are expensive',d:'UTM.io charges $19-159/month for link management.'},{e:'🔍',t:'No visibility',d:'Which campaign drove that traffic? Hard to find out.'}].map((i,x)=>(
              <div key={x} className="gradient-border p-6"><div className="text-4xl mb-4">{i.e}</div><h3 className="font-display font-semibold text-lg mb-2">{i.t}</h3><p className="text-midnight-400 text-sm">{i.d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-6 bg-midnight-800/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12">Everything you need</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[{i:'⚡',t:'UTM Builder',d:'Create UTM links with templates and autocomplete.'},{i:'🔗',t:'Link Shortener',d:'Clean short links. Custom domains on Pro.'},{i:'📈',t:'Click Analytics',d:'Track clicks and see which campaigns work.'},{i:'👥',t:'Team Workspaces',d:'Collaborate with shared templates.'},{i:'📋',t:'Bulk Import',d:'Import from spreadsheets via CSV.'},{i:'🔌',t:'API Access',d:'Automate link creation.'}].map((f,x)=>(
              <div key={x} className="flex gap-4 p-6"><div className="text-3xl">{f.i}</div><div><h3 className="font-display font-semibold text-lg mb-1">{f.t}</h3><p className="text-midnight-400 text-sm">{f.d}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-6 border-t border-midnight-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-4">Simple pricing</h2>
          <p className="text-midnight-400 text-center mb-12">Save up to 50% vs UTM.io</p>
          <div className="grid md:grid-cols-4 gap-6">
            {[{n:'FREE',p:'$0',d:'Forever',f:['50 UTM links','Basic analytics','Link shortener','CSV export'],pop:false},{n:'PRO',p:'$9',d:'/month',f:['Unlimited links','Advanced analytics','Custom domains','UTM templates','Priority support'],pop:true},{n:'TEAM',p:'$29',d:'/month',f:['5 team members','Workspaces','Role permissions','Shared templates','API access'],pop:false},{n:'BUSINESS',p:'$79',d:'/month',f:['Unlimited members','Multiple workspaces','SSO / SAML','Dedicated support','SLA guarantee'],pop:false}].map((t,x)=>(
              <div key={x} className={`gradient-border p-6 ${t.pop?'relative':''}`}>
                {t.pop&&<div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-camp-500 text-midnight-900 text-xs font-semibold rounded-full">POPULAR</div>}
                <div className={`text-sm font-medium mb-2 ${t.pop?'text-camp-400':'text-midnight-400'}`}>{t.n}</div>
                <div className="flex items-baseline gap-1 mb-2"><span className="font-display text-4xl font-bold">{t.p}</span><span className="text-midnight-500">{t.d}</span></div>
                <Link href="/signup" className={`block text-center py-3 rounded-lg mb-6 ${t.pop?'bg-camp-500 text-midnight-900 font-semibold':'border border-midnight-600 text-midnight-300'}`}>Get Started</Link>
                <ul className="space-y-3 text-sm">{t.f.map((f,i)=><li key={i} className="flex items-center gap-2"><span className="text-camp-400">✓</span>{f}</li>)}</ul>
              </div>
            ))}
          </div>
          <p className="text-center text-midnight-500 text-sm mt-8">UTM.io charges $19-159/mo. CampKit saves you up to 50%.</p>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-midnight-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold mb-4">Ready to organize your campaign links?</h2>
          <p className="text-midnight-400 mb-8">Join 500+ marketers who switched from spreadsheets.</p>
          <Link href="/signup" className="inline-block px-8 py-4 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-xl">Get Started Free →</Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}
