import { NextRequest, NextResponse } from 'next/server'

import {
  MobileApiAuthError,
  authenticateMobileRequest,
} from '@/lib/api/mobile-auth'
import {
  createCheckoutPaymentIntent,
  type PaymentIntentPayload,
} from '@/lib/stripe/create-payment-intent'

const isValidationError = (error: unknown): error is Error =>
  error instanceof Error &&
  (error.message.includes('Invalid payment amount') ||
    error.message.includes('At least one product'))

export async function POST(request: NextRequest) {
  try {
    authenticateMobileRequest(request, { requiredRoles: ['payments'] })

    const payload = (await request.json()) as PaymentIntentPayload
    const paymentIntent = await createCheckoutPaymentIntent(payload)

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    if (error instanceof MobileApiAuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }

    if (isValidationError(error)) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    console.error('Failed to create mobile payment intent:', error)
    return NextResponse.json({ error: 'Unable to create payment intent' }, { status: 500 })
  }
}
