'use server'

import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const apps = getApps();
if (!apps.length) {
  initializeApp();
}
const db = getFirestore();

export type CreateReviewPayload = {
  productId: string
  customerId: string
  rating: number
  content: string
}

export const handleCreateReview = async (payload: CreateReviewPayload) => {
  await db.collection('reviews').add(payload);
}
