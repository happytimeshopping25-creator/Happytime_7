#!/bin/bash
set -euo pipefail

echo "🚀 Starting full Firebase + alias repair for Next.js project..."

# 1️⃣ إنشاء مجلد firebase إن لم يكن موجودًا
mkdir -p src/lib/firebase

# 2️⃣ إنشاء ملفات Firebase الأساسية
cat > src/lib/firebase/client.ts <<'TS'
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

export const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(firebaseApp);
TS

cat > src/lib/firebase/firestore.ts <<'TS'
import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "./client";
export const db = getFirestore(firebaseApp);
TS

cat > src/lib/firebase/storage.ts <<'TS'
import { getStorage } from "firebase/storage";
import { firebaseApp } from "./client";
export const storage = getStorage(firebaseApp);
TS

cat > src/lib/firebase/index.ts <<'TS'
export * from "./client";
export * from "./firestore";
export * from "./storage";
TS

echo "✅ Firebase modules created."

# 3️⃣ تحديث tsconfig.json ليشمل alias الصحيح
cat > tsconfig.json <<'JSON'
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"]
    }
  },
  "include": ["next-env.d.ts", "src/**/*", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
JSON

echo "✅ tsconfig.json alias configured."

# 4️⃣ إصلاح next.config.js
cat > next.config.js <<'JS'
const path = require("path");

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
};
JS

echo "✅ next.config.js alias configured."

# 5️⃣ تنظيف المشروع وإعادة البناء
echo "🧹 Cleaning cache and node_modules..."
rm -rf .next node_modules

echo "📦 Reinstalling dependencies..."
npm install --legacy-peer-deps

echo "🏗️ Building project..."
npm run build

echo "🎉 Build completed successfully!"
