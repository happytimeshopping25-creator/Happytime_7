#!/usr/bin/env node
/**
 * firebase-auth-optimize.js
 * 🔒 تحسين إعدادات Firebase Auth و AuthProvider لمشاريع Next.js + Firebase
 *
 * تشغيل:
 *   node firebase-auth-optimize.js           -> تحليل فقط
 *   node firebase-auth-optimize.js --fix     -> إصلاح تلقائي للكود
 */

const fs = require("fs");
const path = require("path");

const cwd = process.cwd();
const doFix = process.argv.includes("--fix");
const report = { timestamp: new Date().toISOString(), fixes: [], issues: [] };

function readFileSafe(p) {
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return null;
  }
}
function writeFileSafe(p, data) {
  fs.writeFileSync(p, data, "utf8");
}

// 🔍 تحديد المواقع المحتملة للملفات
const firebasePath = path.join(cwd, "src/lib/firebase.ts");
const authProviderPath = path.join(cwd, "src/components/AuthProvider.tsx");

const firebaseFile = readFileSafe(firebasePath);
const authProviderFile = readFileSafe(authProviderPath);

if (!firebaseFile) {
  report.issues.push({
    level: "error",
    message: `لم يتم العثور على ملف firebase.ts في ${firebasePath}`,
  });
}
if (!authProviderFile) {
  report.issues.push({
    level: "error",
    message: `لم يتم العثور على ملف AuthProvider.tsx في ${authProviderPath}`,
  });
}

// 🧠 تحليل firebase.ts
if (firebaseFile) {
  if (!firebaseFile.includes("initializeApp")) {
    report.issues.push({
      level: "error",
      message: "firebase.ts لا يحتوي على initializeApp — يجب تهيئة Firebase app.",
    });
  }
  if (!firebaseFile.includes("getAuth")) {
    report.issues.push({
      level: "warning",
      message: "لم يتم تصدير getAuth — لن تعمل المصادقة بشكل صحيح.",
    });
  }
  if (!firebaseFile.includes("GoogleAuthProvider")) {
    report.issues.push({
      level: "info",
      message: "لم يتم إعداد GoogleAuthProvider — سجل الدخول بـ Google معطل حالياً.",
    });
  }
  if (!firebaseFile.includes("EmailAuthProvider")) {
    report.issues.push({
      level: "info",
      message: "لم يتم إعداد EmailAuthProvider — سجل الدخول بالبريد الإلكتروني معطل حالياً.",
    });
  }
}

// 🧠 تحليل AuthProvider.tsx
if (authProviderFile) {
  if (!authProviderFile.includes("onAuthStateChanged")) {
    report.issues.push({
      level: "error",
      message: "AuthProvider.tsx لا يراقب حالة المستخدم (onAuthStateChanged).",
    });
  }
  if (!authProviderFile.includes("createContext")) {
    report.issues.push({
      level: "warning",
      message: "AuthProvider.tsx لا يعرّف سياقاً (Context) لمشاركة المستخدم.",
    });
  }
  if (!authProviderFile.includes("useEffect")) {
    report.issues.push({
      level: "warning",
      message: "AuthProvider.tsx لا يستخدم useEffect لمتابعة تغيّرات المستخدم.",
    });
  }
}

// 🧰 اقتراح كود Firebase آمن وحديث
const recommendedFirebase = `// ✅ firebase.ts (مُوصى به)
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const emailProvider = new EmailAuthProvider();
export default app;
`;

const recommendedAuthProvider = `// ✅ AuthProvider.tsx (مُوصى به)
'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

const AuthContext = createContext({ user: null, loading: true, signInGoogle: async () => {}, signOutUser: async () => {} });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const signInGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      console.error('Google login error:', e);
    }
  };

  const signInEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.error('Email login error:', e);
    }
  };

  const registerEmail = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.error('Email register error:', e);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error('Sign out error:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInGoogle, signInEmail, registerEmail, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
`;

if (doFix) {
  if (firebaseFile) {
    writeFileSafe(firebasePath, recommendedFirebase);
    report.fixes.push({ file: firebasePath, fix: "Replaced with secure recommended firebase.ts" });
  }
  if (authProviderFile) {
    writeFileSafe(authProviderPath, recommendedAuthProvider);
    report.fixes.push({ file: authProviderPath, fix: "Replaced with secure recommended AuthProvider.tsx" });
  }
}

// حفظ التقارير
const reportPath = path.join(cwd, "auth-optimize-report.json");
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf8");

console.log("✅ تحليل وتحسين مصادقة Firebase اكتمل.");
console.log(`📄 تقرير محفوظ في: ${reportPath}`);
if (report.issues.length) {
  console.log("🚨 نتائج التحليل:");
  report.issues.forEach((i, n) => console.log(`${n + 1}. [${i.level}] ${i.message}`));
}
if (doFix) {
  console.log("🛠️ تم تنفيذ التصحيحات التالية:");
  report.fixes.forEach((f) => console.log(`- ${f.fix} (${f.file})`));
} else {
  console.log("\nللتصحيح التلقائي الآمن: أعد التشغيل باستخدام --fix");
}
