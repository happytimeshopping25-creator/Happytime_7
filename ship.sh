#!/usr/bin/env bash
set -euo pipefail

# === إعدادات قابلة للتعديل لو احتجت ===
GIT_REMOTE="https://github.com/happytimeshopping25-creator/Happytime_7.git"
BRANCH="main"

echo "🔎 1) التحقق من نسخة Node و npm..."
node -v || true
npm -v || true

echo "📦 2) تثبيت الاعتمادات (web) بإستخدام npm ci..."
npm ci

# (اختياري) لو عندك مجلد موبايل ويحتاج pnpm
if [ -d "apps/mobile" ]; then
  echo "📦 2b) تثبيت اعتمادات الموبايل (pnpm) إن وجدت..."
  corepack enable || true
  corepack use pnpm@10.20.0 || true
  pnpm -C apps/mobile install --no-frozen-lockfile || true
fi

echo "🧪 3) فحص وجود next..."
npx next --version >/dev/null 2>&1 || { echo "⚠️ لم أجد next. سأثبتها مؤقتًا..."; npm i -D next; }

echo "🌿 4) ضبط ريموت Git والتزامن..."
git init >/dev/null 2>&1 || true
git remote remove origin >/dev/null 2>&1 || true
git remote add origin "$GIT_REMOTE"
git fetch origin "$BRANCH" || true
git checkout -B "$BRANCH"
# اسحب آخر تغييرات بدون إنشاء كوميت دمج
git pull --rebase origin "$BRANCH" || true

echo "🧹 5) ضمان تجاهل المجلدات الكبيرة..."
grep -q '^node_modules/' .gitignore || echo -e "node_modules/\n.next/\ndist/\nout/" >> .gitignore

echo "📝 6) عمل commit للتغييرات المحلية..."
git add -A
if git diff --cached --quiet; then
  echo "ℹ️ لا يوجد تغييرات جديدة للالتزام."
else
  git commit -m "chore: sync Codex edits + setup build/deploy"
fi

echo "🚀 7) دفع التغييرات إلى GitHub..."
git push origin "$BRANCH"

echo "🏗️ 8) بناء Next.js (المجلد src)..."
npm run build --workspace-root --if-present || npm run build

echo "⚙️ 9) تمكين تكامل أطر الويب (مرة واحدة فقط)..."
firebase experiments:enable webframeworks || true

echo "☁️ 10) النشر إلى Firebase"
# لو عندك وظائف/قواعد انشر الكل، غير كدة يكفي hosting
firebase deploy || firebase deploy --only hosting

echo "✅ تم: دفع التغييرات إلى GitHub وتم النشر على Firebase بنجاح."
