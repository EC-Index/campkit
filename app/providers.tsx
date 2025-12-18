'use client'

import { SessionProvider } from 'next-auth/react'
import { CurrencyProvider } from '@/components/CurrencyContext'

export function Providers({ 
  children,
  initialCountry 
}: { 
  children: React.ReactNode
  initialCountry?: string 
}) {
  return (
    <SessionProvider>
      <CurrencyProvider initialCountry={initialCountry}>
        {children}
      </CurrencyProvider>
    </SessionProvider>
  )
}
