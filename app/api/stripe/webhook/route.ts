import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    console.log('Stripe webhook event:', event.type)

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        if (session.mode === 'subscription' && session.subscription) {
          const userId = session.metadata?.userId
          const plan = session.metadata?.plan || 'pro'
          const customerEmail = session.customer_email
          
          if (userId) {
            // Get subscription details
            const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
            
            // Update user plan
            await sql`UPDATE users SET plan = ${plan} WHERE id = ${userId}`
            
            // Create subscription record
            await sql`
              INSERT INTO subscriptions (user_id, stripe_customer_id, stripe_subscription_id, plan, status, current_period_end, created_at, updated_at)
              VALUES (${userId}, ${session.customer as string}, ${session.subscription as string}, ${plan}, 'active', to_timestamp(${subscription.current_period_end}), NOW(), NOW())
              ON CONFLICT (user_id) 
              DO UPDATE SET 
                stripe_customer_id = ${session.customer as string},
                stripe_subscription_id = ${session.subscription as string},
                plan = ${plan},
                status = 'active',
                current_period_end = to_timestamp(${subscription.current_period_end}),
                updated_at = NOW()
            `
            
            console.log(`User ${userId} upgraded to ${plan}`)
          } else if (customerEmail) {
            // Fallback: find user by email
            const users = await sql`SELECT id FROM users WHERE email = ${customerEmail}`
            if (users.length > 0) {
              const foundUserId = users[0].id
              const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
              
              await sql`UPDATE users SET plan = ${plan} WHERE id = ${foundUserId}`
              
              await sql`
                INSERT INTO subscriptions (user_id, stripe_customer_id, stripe_subscription_id, plan, status, current_period_end)
                VALUES (${foundUserId}, ${session.customer as string}, ${session.subscription as string}, ${plan}, 'active', to_timestamp(${subscription.current_period_end}))
              `
              
              console.log(`User ${foundUserId} (by email) upgraded to ${plan}`)
            }
          }
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        
        await sql`
          UPDATE subscriptions 
          SET status = ${subscription.status}, 
              current_period_end = to_timestamp(${subscription.current_period_end}),
              updated_at = NOW()
          WHERE stripe_subscription_id = ${subscription.id}
        `
        
        // If cancelled or unpaid, downgrade to free
        if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
          const subs = await sql`SELECT user_id FROM subscriptions WHERE stripe_subscription_id = ${subscription.id}`
          if (subs.length > 0) {
            await sql`UPDATE users SET plan = 'free' WHERE id = ${subs[0].user_id}`
            console.log(`User ${subs[0].user_id} downgraded to free`)
          }
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        
        const subs = await sql`SELECT user_id FROM subscriptions WHERE stripe_subscription_id = ${subscription.id}`
        if (subs.length > 0) {
          await sql`UPDATE users SET plan = 'free' WHERE id = ${subs[0].user_id}`
          await sql`UPDATE subscriptions SET status = 'canceled', updated_at = NOW() WHERE stripe_subscription_id = ${subscription.id}`
          console.log(`User ${subs[0].user_id} subscription canceled`)
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}
