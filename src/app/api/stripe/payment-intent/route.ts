import { NextResponse } from 'next/server'

import { createCheckoutPaymentIntent } from '@/lib/stripe/create-payment-intent'
import type { PaymentIntentPayload } from '@/lib/stripe/create-payment-intent'

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as PaymentIntentPayload
    const paymentIntent = await createCheckoutPaymentIntent(payload)

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json({ error: 'Error creating payment intent' }, { status: 500 })
  }
}
