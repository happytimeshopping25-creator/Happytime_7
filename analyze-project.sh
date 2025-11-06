#!/bin/bash
# =======================================================
# 🔍 analyze-project.sh
# تحليل شامل لمشروع Next.js + Firebase
# إعداد: مطور محترف (ChatGPT-GPT5)
# =======================================================

# ألوان للإخراج
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # لا لون

# وقت التنفيذ
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
REPORT_JSON="project-status.json"
LOG_DIR="logs"
LOG_FILE="$LOG_DIR/analyze-$TIMESTAMP.txt"

mkdir -p "$LOG_DIR"

echo -e "${BLUE}🚀 بدء تحليل المشروع...${NC}"
echo "--------------------------------------------------------"

# =======================================================
# 1️⃣ التحقق من الأدوات المثبتة
# =======================================================
check_command() {
  if ! command -v "$1" &> /dev/null; then
    echo -e "${RED}✗ الأمر $1 غير مثبت.${NC}"
    echo "\"$1\": false," >> "$REPORT_JSON.tmp"
  else
    echo -e "${GREEN}✓ الأمر $1 مثبت.${NC}"
    echo "\"$1\": true," >> "$REPORT_JSON.tmp"
  fi
}

echo "{
  \"timestamp\": \"$TIMESTAMP\",
  \"tools\": {" > "$REPORT_JSON.tmp"

check_command node
check_command npm
check_command firebase
check_command git

# إزالة الفاصلة الأخيرة يدويًا
sed -i '$ s/,$//' "$REPORT_JSON.tmp"
echo "}," >> "$REPORT_JSON.tmp"

# =======================================================
# 2️⃣ فحص وجود ملفات أساسية
# =======================================================
echo "\"files\": {" >> "$REPORT_JSON.tmp"
for FILE in package.json next.config.js firebase.json .env.local src/lib/firebase.ts src/components/AuthProvider.tsx; do
  if [ -f "$FILE" ]; then
    echo -e "${GREEN}✓ الملف موجود: $FILE${NC}"
    echo "\"$FILE\": true," >> "$REPORT_JSON.tmp"
  else
    echo -e "${RED}⚠️ الملف مفقود: $FILE${NC}"
    echo "\"$FILE\": false," >> "$REPORT_JSON.tmp"
  fi
done
sed -i '$ s/,$//' "$REPORT_JSON.tmp"
echo "}," >> "$REPORT_JSON.tmp"

# =======================================================
# 3️⃣ فحص إصدار Next.js و Firebase
# =======================================================
echo "\"versions\": {" >> "$REPORT_JSON.tmp"

if [ -f "package.json" ]; then
  NEXT_VERSION=$(grep '"next":' package.json | awk -F '"' '{print $4}')
  FIREBASE_VERSION=$(grep '"firebase":' package.json | awk -F '"' '{print $4}')
  echo "\"next\": \"$NEXT_VERSION\"," >> "$REPORT_JSON.tmp"
  echo "\"firebase\": \"$FIREBASE_VERSION\"" >> "$REPORT_JSON.tmp"
  echo -e "${GREEN}Next.js: $NEXT_VERSION${NC}"
  echo -e "${GREEN}Firebase: $FIREBASE_VERSION${NC}"
else
  echo -e "${RED}لم يتم العثور على package.json للتحقق من الإصدارات.${NC}"
fi
echo "}," >> "$REPORT_JSON.tmp"

# =======================================================
# 4️⃣ ESLint و فحص الكود
# =======================================================
echo "\"eslint\": {" >> "$REPORT_JSON.tmp"

if npx eslint . &> /dev/null; then
  echo -e "${GREEN}✓ لا توجد أخطاء ESLint.${NC}"
  echo "\"status\": \"clean\"" >> "$REPORT_JSON.tmp"
else
  echo -e "${YELLOW}⚠️ يوجد تحذيرات أو أخطاء في الكود (ESLint).${NC}"
  echo "\"status\": \"issues-found\"" >> "$REPORT_JSON.tmp"
fi
echo "}," >> "$REPORT_JSON.tmp"

# =======================================================
# 5️⃣ فحص ملفات البيئة (.env.local)
# =======================================================
echo "\"env\": {" >> "$REPORT_JSON.tmp"
if [ -f ".env.local" ]; then
  MISSING_KEYS=()
  for KEY in NEXT_PUBLIC_FIREBASE_API_KEY NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN NEXT_PUBLIC_FIREBASE_PROJECT_ID NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID NEXT_PUBLIC_FIREBASE_APP_ID; do
    if ! grep -q "$KEY" .env.local; then
      MISSING_KEYS+=("$KEY")
    fi
  done
  if [ ${#MISSING_KEYS[@]} -eq 0 ]; then
    echo -e "${GREEN}✓ جميع مفاتيح Firebase موجودة في .env.local${NC}"
    echo "\"status\": \"complete\"" >> "$REPORT_JSON.tmp"
  else
    echo -e "${RED}⚠️ مفاتيح ناقصة في .env.local: ${MISSING_KEYS[*]}${NC}"
    echo "\"status\": \"missing\",\n\"missing_keys\": [\"${MISSING_KEYS[*]}\"]" >> "$REPORT_JSON.tmp"
  fi
else
  echo -e "${RED}⚠️ ملف .env.local غير موجود.${NC}"
  echo "\"status\": \"missing-file\"" >> "$REPORT_JSON.tmp"
fi
echo "}," >> "$REPORT_JSON.tmp"

# =======================================================
# 6️⃣ فحص حالة Git
# =======================================================
echo "\"git\": {" >> "$REPORT_JSON.tmp"
if git rev-parse --is-inside-work-tree &> /dev/null; then
  BRANCH=$(git rev-parse --abbrev-ref HEAD)
  CHANGES=$(git status --porcelain | wc -l)
  echo -e "${GREEN}✓ داخل مستودع Git، الفرع: $BRANCH${NC}"
  if [ "$CHANGES" -gt 0 ]; then
    echo -e "${YELLOW}⚠️ يوجد $CHANGES تعديل غير مُلتزم.${NC}"
  else
    echo -e "${GREEN}✓ لا توجد تغييرات غير ملتزمة.${NC}"
  fi
  echo "\"branch\": \"$BRANCH\",\n    \"changes\": $CHANGES" >> "$REPORT_JSON.tmp"
else
  echo -e "${RED}⚠️ المشروع ليس داخل مستودع Git.${NC}"
  echo "\"branch\": null,\n\"changes\": null\n}" >> "$REPORT_JSON.tmp"
fi

# إغلاق JSON
echo "}" >> "$REPORT_JSON.tmp"
mv "$REPORT_JSON.tmp" "$REPORT_JSON"

# =======================================================
# 7️⃣ حفظ تقرير نصي للعرض السريع
# =======================================================
{
  echo "==== Firebase + Next.js Project Report ===="
  echo "📅 Date: $TIMESTAMP"
  echo "-------------------------------------------"
  jq '.' "$REPORT_JSON"
} > "$LOG_FILE"

echo -e "\n${GREEN}✅ تم تحليل المشروع بنجاح.${NC}"
echo -e "📄 تقرير JSON محفوظ في: ${BLUE}$REPORT_JSON${NC}"
echo -e "🗂️  تقرير نصي محفوظ في: ${BLUE}$LOG_FILE${NC}"
echo -e "--------------------------------------------------------"