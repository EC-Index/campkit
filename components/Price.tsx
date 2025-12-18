'use client'

import { useCurrency } from './CurrencyContext'

interface PriceProps {
  amount: number
  period?: string
  className?: string
}

export function Price({ amount, period = '/month', className = '' }: PriceProps) {
  const { currency, symbol } = useCurrency()

  return (
    <span className={className}>
      {symbol}{amount}
      {period && <span className="text-midnight-500">{period}</span>}
    </span>
  )
}

export function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency()

  return (
    <div className="inline-flex items-center gap-1 p-1 bg-midnight-800 rounded-lg text-sm">
      <button
        onClick={() => setCurrency('EUR')}
        className={`px-3 py-1.5 rounded-md transition-all ${
          currency === 'EUR' 
            ? 'bg-camp-500 text-midnight-900 font-medium' 
            : 'text-midnight-400 hover:text-white'
        }`}
      >
        € EUR
      </button>
      <button
        onClick={() => setCurrency('USD')}
        className={`px-3 py-1.5 rounded-md transition-all ${
          currency === 'USD' 
            ? 'bg-camp-500 text-midnight-900 font-medium' 
            : 'text-midnight-400 hover:text-white'
        }`}
      >
        $ USD
      </button>
    </div>
  )
}
