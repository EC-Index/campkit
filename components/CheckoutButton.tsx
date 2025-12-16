'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type PlanType = 'pro' | 'team' | 'business'

export function CheckoutButton({ plan, children, className }: { 
  plan: PlanType
  children: React.ReactNode
  className?: string 
}) {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (!session) {
      router.push('/signup')
      return
    }

    setLoading(true)
    
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      
      const data = await res.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Failed to start checkout')
        setLoading(false)
      }
    } catch (error) {
      alert('Something went wrong')
      setLoading(false)
    }
  }

  return (
    <button 
      onClick={handleCheckout}
      disabled={loading}
      className={`${className} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {loading ? 'Loading...' : children}
    </button>
  )
}
