"use client";

import { createContext, useContext, ReactNode } from "react";
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// 1. Define the Firebase config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
};

// 2. Create a context for the Firebase app instance
const FirebaseAppContext = createContext<FirebaseApp | null>(null);

// 3. Create the Provider component
export function FirebaseProvider({ children }: { children: ReactNode }) {
  // Initialize Firebase only once
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

  // Log for verification
  if (typeof window !== "undefined") {
    console.log("🔥 Firebase App Initialized on Client:", app.options.projectId);
  }

  return (
    <FirebaseAppContext.Provider value={app}>
      {children}
    </FirebaseAppContext.Provider>
  );
}

// 4. Create a hook to access the Firebase app and services
export function useFirebase() {
  const app = useContext(FirebaseAppContext);
  if (!app) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }

  const auth = getAuth(app);
  const db = getFirestore(app);
  // Analytics is browser-only
  const analytics =
    typeof window !== "undefined" && isSupported() ? getAnalytics(app) : null;

  return { app, auth, db, analytics };
}
