'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Currency = 'EUR' | 'USD'

interface CurrencyContextType {
  currency: Currency
  symbol: string
  setCurrency: (currency: Currency) => void
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'EUR',
  symbol: '€',
  setCurrency: () => {},
})

export function useCurrency() {
  return useContext(CurrencyContext)
}

// EU countries that should see EUR
const EUR_COUNTRIES = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
  'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'CH', 'NO', 'GB'
]

export function CurrencyProvider({ 
  children, 
  initialCountry 
}: { 
  children: ReactNode
  initialCountry?: string 
}) {
  const [currency, setCurrency] = useState<Currency>('EUR')

  useEffect(() => {
    // Check if country was passed from server
    if (initialCountry) {
      const isEUR = EUR_COUNTRIES.includes(initialCountry.toUpperCase())
      setCurrency(isEUR ? 'EUR' : 'USD')
      return
    }

    // Fallback: check localStorage for user preference
    const saved = localStorage.getItem('preferred-currency') as Currency
    if (saved && (saved === 'EUR' || saved === 'USD')) {
      setCurrency(saved)
    }
  }, [initialCountry])

  const handleSetCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency)
    localStorage.setItem('preferred-currency', newCurrency)
  }

  const symbol = currency === 'EUR' ? '€' : '$'

  return (
    <CurrencyContext.Provider value={{ currency, symbol, setCurrency: handleSetCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}
