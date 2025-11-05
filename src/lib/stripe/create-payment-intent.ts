import type Stripe from 'stripe'

import stripe from '@/lib/stripe'
import type { Product } from '@/lib/stores/cart-store'

export type PaymentIntentCustomer = {
  id?: string | null
  email?: string | null
  name?: string | null
  phone?: string | null
}

export type PaymentIntentPayload = {
  amount: number
  products: Product[]
  customer?: PaymentIntentCustomer | null
  shippingInfo?: Record<string, unknown> | null
  metadata?: Record<string, string | number | boolean | null | undefined>
}

const normalizeMetadata = (
  metadata: PaymentIntentPayload['metadata'],
  extras: Record<string, unknown>
): Stripe.Metadata => {
  const normalizedEntries: [string, string][] = []

  const appendEntries = (source: Record<string, unknown>) => {
    Object.entries(source).forEach(([key, value]) => {
      if (value === undefined || value === null) return
      normalizedEntries.push([key, String(value)])
    })
  }

  if (metadata) {
    appendEntries(metadata)
  }

  appendEntries(extras)

  return Object.fromEntries(normalizedEntries)
}

const serializeProductsForMetadata = (products: Product[]) =>
  products.map((product) => ({
    productId: (product as Product & { productId?: string }).productId ?? product.id ?? '',
    name: product.name,
    quantity: product.quantity,
    price: product.price,
    variant: product.selectedOption
      ?.map((option) => `${option.name}: ${option.value}`)
      .join(', '),
  }))

export const createCheckoutPaymentIntent = async ({
  amount,
  products,
  customer,
  shippingInfo,
  metadata,
}: PaymentIntentPayload): Promise<Stripe.PaymentIntent> => {
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error('Invalid payment amount. Amount must be a positive number.')
  }

  if (!Array.isArray(products) || products.length === 0) {
    throw new Error('At least one product is required to create a payment intent.')
  }

  const productItems = serializeProductsForMetadata(products)

  return stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: normalizeMetadata(metadata, {
      order_items: JSON.stringify(productItems),
      customer_email: customer?.email ?? 'guest',
      customer_id: customer?.id ?? 'guest',
      customer_name: customer?.name ?? 'guest',
      customer_phone: customer?.phone ?? 'N/A',
      total_items: products.length,
      products: products.map((product) => product.name).join(', '),
      shipping_info: JSON.stringify(shippingInfo ?? {}),
    }),
  })
}
