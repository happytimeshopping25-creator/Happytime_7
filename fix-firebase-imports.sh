#!/bin/bash
set -euo pipefail

echo "🔍 Searching for all imports from '@/lib/firebase' ..."

# 1️⃣ استبدال كل المسارات داخل مجلد src
grep -rl "@/lib/firebase" src | while read -r file; do
  echo "🛠️ Fixing import in: $file"
  cp "$file" "$file.bak"  # نسخة احتياطية
  sed -i 's|@/lib/firebase|../../../lib/firebase|g' "$file"
done

echo "✅ All firebase imports corrected."

# 2️⃣ تنظيف المجلدات المؤقتة
echo "🧹 Cleaning build cache..."
rm -rf .next node_modules out dist

# 3️⃣ تثبيت التبعيات
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# 4️⃣ تنفيذ البناء النهائي
echo "🏗️ Building project..."
npm run build

if [ $? -eq 0 ]; then
  echo "🎉 Build completed successfully — all firebase imports fixed!"
else
  echo "❌ Build failed — please check for any remaining path issues."
fi
