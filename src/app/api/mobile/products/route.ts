import { NextRequest, NextResponse } from 'next/server'
import { applicationDefault, getApps, initializeApp } from 'firebase-admin/app'
import { Timestamp, getFirestore, type DocumentData } from 'firebase-admin/firestore'

import {
  MobileApiAuthError,
  authenticateMobileRequest,
} from '@/lib/api/mobile-auth'

const DEFAULT_LIMIT = 20
const MAX_LIMIT = 50

const ensureFirebaseAdmin = () => {
  if (!getApps().length) {
    initializeApp({
      credential: applicationDefault(),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    })
  }
}

const getAdminFirestore = () => {
  ensureFirebaseAdmin()
  return getFirestore()
}

export async function GET(request: NextRequest) {
  try {
    authenticateMobileRequest(request, { requiredRoles: ['reader'] })

    const { searchParams } = new URL(request.url)
    const limitParam = Number.parseInt(searchParams.get('limit') ?? `${DEFAULT_LIMIT}`, 10)
    const limit = Number.isFinite(limitParam)
      ? Math.min(Math.max(1, limitParam), MAX_LIMIT)
      : DEFAULT_LIMIT

    const afterParam = searchParams.get('after')
    let cursor: Timestamp | null = null

    if (afterParam) {
      const parsedDate = new Date(afterParam)
      if (Number.isNaN(parsedDate.getTime())) {
        throw new MobileApiAuthError('Invalid "after" cursor. Expected an ISO date string.', 400)
      }
      cursor = Timestamp.fromDate(parsedDate)
    }

    const db = getAdminFirestore()
    let queryRef = db
      .collection('products')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(limit)

    if (cursor) {
      queryRef = queryRef.startAfter(cursor)
    }

    const snapshot = await queryRef.get()
    const products = snapshot.docs.map((doc) => {
      const data = doc.data() as DocumentData
      return {
        id: doc.id,
        title: data.title,
        description: data.description ?? null,
        price: data.price,
        currency: data.currency ?? 'USD',
        images: Array.isArray(data.images) ? data.images : [],
        tags: Array.isArray(data.tags) ? data.tags : [],
        inventory: data.inventory ?? null,
        createdAt:
          data.createdAt instanceof Timestamp
            ? data.createdAt.toDate().toISOString()
            : null,
        updatedAt:
          data.updatedAt instanceof Timestamp
            ? data.updatedAt.toDate().toISOString()
            : null,
      }
    })

    const lastDocument = snapshot.docs.at(-1)
    const lastCreatedAt = lastDocument?.get('createdAt')
    const nextCursor = lastCreatedAt instanceof Timestamp ? lastCreatedAt.toDate().toISOString() : null

    return NextResponse.json({
      products,
      paging: {
        nextCursor,
        hasMore: Boolean(nextCursor && snapshot.size === limit),
      },
    })
  } catch (error) {
    if (error instanceof MobileApiAuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }

    console.error('Failed to load mobile products:', error)
    return NextResponse.json({ error: 'Unable to load products' }, { status: 500 })
  }
}
