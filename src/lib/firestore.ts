// src/lib/firestore.ts
import { auth } from "./firebaseClient"
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  getFirestore,
} from "firebase/firestore"

// يجب استدعاء initializeFirestore مرة واحدة قبل أي getFirestore.
// نفعّل كاش محلي دائم + دعم تعدد التبويبات، مع fallback تلقائي.
let db: ReturnType<typeof getFirestore>;
// The `auth` object from `firebaseClient` is not needed for initializing Firestore.
// Firestore initialization is typically done with the Firebase app instance, which is handled internally by the client library.
// We can simply get the Firestore instance directly.
db = getFirestore();

export { db };