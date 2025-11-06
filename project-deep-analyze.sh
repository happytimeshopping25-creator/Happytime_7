#!/bin/bash
# =========================================================
# 🔍 Smart Project Deep Analyzer
# تحليل شامل لمشروع Next.js + Firebase + Auth + Git + Env
# =========================================================
# إصدار: v2.3 — مصمم لمشاريع Firebase Studio / Cloud Workstations
# =========================================================

echo "🚀 بدء التحليل العميق لمشروعك..."
echo "--------------------------------------------------------"

# 📦 تحقق من الأوامر الأساسية
commands=(node npm firebase git jq)
for cmd in "${commands[@]}"; do
  if command -v $cmd &> /dev/null; then
    echo "✓ $cmd مثبت ✅"
  else
    echo "❌ $cmd غير مثبت ❗️"
  fi
done

echo "--------------------------------------------------------"

# 🗂️ تحقق من الملفات الأساسية
files=(
  "package.json"
  "firebase.json"
  ".env.local"
  "next.config.js"
  "src/lib/firebase.ts"
  "src/components/AuthProvider.tsx"
)
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "✓ الملف موجود: $file"
  else
    echo "❌ الملف مفقود: $file"
  fi
done

echo "--------------------------------------------------------"

# 📋 استخراج إصدارات الحزم
if [ -f package.json ]; then
  NEXT_VERSION=$(jq -r '.dependencies["next"] // empty' package.json)
  FIREBASE_VERSION=$(jq -r '.dependencies["firebase"] // empty' package.json)
  echo "Next.js version: ${NEXT_VERSION:-غير محدد}"
  echo "Firebase version: ${FIREBASE_VERSION:-غير محدد}"
fi

echo "--------------------------------------------------------"

# 🔐 تحليل مصادقة Firebase
if grep -q "EmailAuthProvider" src/lib/firebase.ts 2>/dev/null; then
  echo "✓ EmailAuthProvider مفعّل ✅"
else
  echo "⚠️ EmailAuthProvider غير مفعّل ❗️"
fi

if grep -q "GoogleAuthProvider" src/lib/firebase.ts 2>/dev/null; then
  echo "✓ GoogleAuthProvider مفعّل ✅"
else
  echo "⚠️ GoogleAuthProvider غير مفعّل ❗️"
fi

if grep -q "onAuthStateChanged" src/components/AuthProvider.tsx 2>/dev/null; then
  echo "✓ AuthProvider يراقب حالة المستخدم ✅"
else
  echo "⚠️ AuthProvider لا يراقب حالة المستخدم ❗️"
fi

echo "--------------------------------------------------------"

# 🌍 تحليل بيئة Next.js
if [ -f next.config.js ]; then
  if grep -q "images" next.config.js; then
    echo "✓ إعداد images.domains موجود ✅"
  else
    echo "⚠️ إعداد images.domains غير موجود ❗️"
  fi
fi

# 🔍 فحص استعمالات قديمة
OLD_IMAGE_COUNT=$(grep -r "layout=" src 2>/dev/null | wc -l)
if [ "$OLD_IMAGE_COUNT" -gt 0 ]; then
  echo "⚠️ تم العثور على $OLD_IMAGE_COUNT استخدام قديم لـ layout في next/image ❗️"
else
  echo "✓ لا توجد استخدامات قديمة لـ layout ✅"
fi

echo "--------------------------------------------------------"

# 🗄️ تحليل Firestore
if grep -q "getFirestore" src/lib/firebase.ts 2>/dev/null; then
  echo "✓ Firestore مهيأ ✅"
else
  echo "⚠️ Firestore غير مهيأ ❗️"
fi

# 🔄 تحقق من Sync أو Realtime DB
if grep -q "getDatabase" src/lib/firebase.ts 2>/dev/null; then
  echo "ℹ️ Realtime Database مفعّلة"
else
  echo "ℹ️ لا يوجد Realtime Database"
fi

echo "--------------------------------------------------------"

# ☁️ حالة Firebase Hosting / Functions
if [ -f firebase.json ]; then
  if grep -q "hosting" firebase.json; then
    echo "✓ إعداد Firebase Hosting موجود ✅"
  else
    echo "⚠️ لا يوجد إعداد Hosting ❗️"
  fi
  if grep -q "functions" firebase.json; then
    echo "✓ إعداد Cloud Functions موجود ✅"
  else
    echo "ℹ️ لا توجد Functions بعد"
  fi
fi

echo "--------------------------------------------------------"

# 🧾 تحليل Git
if git rev-parse --is-inside-work-tree &> /dev/null; then
  branch=$(git rev-parse --abbrev-ref HEAD)
  echo "📍 داخل مستودع Git - الفرع الحالي: $branch"
  changes=$(git status --porcelain | wc -l)
  if [ "$changes" -gt 0 ]; then
    echo "⚠️ يوجد $changes تعديل غير ملتزم ❗️"
  else
    echo "✓ لا توجد تعديلات غير ملتزمة ✅"
  fi
else
  echo "⚠️ ليس داخل مستودع Git ❗️"
fi

echo "--------------------------------------------------------"

# 📦 تحليل ESLint / TypeScript (اختياري)
if [ -f .eslintrc* ]; then
  echo "✓ تم العثور على إعداد ESLint ✅"
else
  echo "ℹ️ لا يوجد إعداد ESLint"
fi

if [ -f tsconfig.json ]; then
  echo "✓ TypeScript مفعّل ✅"
else
  echo "ℹ️ لا يوجد TypeScript"
fi

echo "--------------------------------------------------------"
echo "✅ تم التحليل الكامل للمشروع بنجاح."
echo "📄 يمكنك الآن نسخ هذا النص ولصقه هنا لتحليل التطوير القادم."
echo "--------------------------------------------------------"
