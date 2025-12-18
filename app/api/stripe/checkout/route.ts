import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import Stripe from 'stripe'
import { authOptions } from '@/lib/auth'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

// Price IDs from Stripe - you need to create USD prices in Stripe Dashboard
const PRICE_IDS = {
  EUR: {
    pro: process.env.STRIPE_PRICE_PRO_EUR!,
    team: process.env.STRIPE_PRICE_TEAM_EUR!,
    business: process.env.STRIPE_PRICE_BUSINESS_EUR!,
  },
  USD: {
    pro: process.env.STRIPE_PRICE_PRO_USD!,
    team: process.env.STRIPE_PRICE_TEAM_USD!,
    business: process.env.STRIPE_PRICE_BUSINESS_USD!,
  },
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { plan, currency = 'EUR' } = await req.json()

    if (!['pro', 'team', 'business'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const validCurrency = currency === 'USD' ? 'USD' : 'EUR'
    const priceId = PRICE_IDS[validCurrency][plan as keyof typeof PRICE_IDS.EUR]

    if (!priceId) {
      return NextResponse.json({ error: 'Price not configured' }, { status: 500 })
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/#pricing`,
      customer_email: session.user.email,
      metadata: {
        userId: session.user.email || '',
        plan,
        currency: validCurrency,
      },
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
