#!/usr/bin/env bash
set -euo pipefail

echo "🧠 Smart Auto Fix – Firebase Studio Ready (v2)"

# 1️⃣ We will use npx to run a specific pnpm version, no global setup needed.

# 2️⃣ ضبط registry يدويًا
echo "🌐 Forcing public npm registry..."
npx pnpm@10.20.0 config set registry https://registry.npmjs.org

# 3️⃣ تثبيت الحزم
echo "📦 Installing dependencies..."
if ! npx pnpm@10.20.0 install --no-frozen-lockfile; then
  echo "⚠️ pnpm failed — switching to npm fallback..."
  npm ci || npm install
fi

# 4️⃣ إضافة المسار إلى PATH
export PATH="./node_modules/.bin:$PATH"

# 5️⃣ إصلاح الأخطاء تلقائيًا
echo "🧹 Running ESLint auto-fix..."
if [ -f "pnpm-lock.yaml" ]; then
    npx pnpm@10.20.0 run lint --if-present --fix || npx eslint . --fix || true
else
    npm run lint --if-present -- --fix || npx eslint . --fix || true
fi

# 6️⃣ بناء المشروع
echo "🏗️ Building Next.js app..."
if [ -f "pnpm-lock.yaml" ]; then
    npx pnpm@10.20.0 run build || npx next build src
else
    npm run build || npx next build src
fi

# 7️⃣ تشغيل المعاينة (Firebase Studio)
echo "🚀 Starting local preview..."
if [ -f "pnpm-lock.yaml" ]; then
    npx pnpm@10.20.0 run dev --if-present -- --hostname 0.0.0.0 --port 9002 || npx next dev src --port 9002 --hostname 0.0.0.0
else
    npm run dev --if-present -- --hostname 0.0.0.0 --port 9002 || npx next dev src --port 9002 --hostname 0.0.0.0
fi
