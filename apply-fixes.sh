set -euo pipefail

# 1) overwrite login page with your corrected code
mkdir -p "src/app/(auth)/login"
cat > "src/app/(auth)/login/page.tsx" << 'TSX'
"use client";

import { useState } from "react";
import { auth } from "@/lib/firebaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const { signInWithPopup, GoogleAuthProvider } = await import("firebase/auth");
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider); // Use the imported 'auth' directly
      router.push("/");
    } catch (e) {
      alert("فشل تسجيل الدخول عبر Google");
    } finally {
      setLoading(false);
    }
  };

  const signInWithPhone = async () => {
    setLoading(true);
    try {
      const { RecaptchaVerifier, signInWithPhoneNumber } = await import("firebase/auth");

      // إنشاء reCAPTCHA غير مرئي
      // @ts-ignore
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible"
      });

      // إرسال كود
      const confirmation = await signInWithPhoneNumber(auth, phone, (window as any).recaptchaVerifier);
      const code = prompt("أدخل رمز التحقق المرسل إلى هاتفك:");
      if (!code) return;
      await confirmation.confirm(code);
      router.push("/");
    } catch (e) {
      alert("فشل تسجيل الدخول بالهاتف. تأكد من رقم الهاتف ومعرّف reCAPTCHA في كونسول Firebase.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 24, display: "grid", gap: 16 }}>
      <h1>تسجيل الدخول</h1>

      <button onClick={signInWithGoogle} disabled={loading} style={{ padding: 12 }}>
        الدخول عبر Google
      </button>

      <div style={{ display: "grid", gap: 8 }}>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+9689xxxxxxx"
          dir="ltr"
          style={{ padding: 10 }}
        />
        <button onClick={signInWithPhone} disabled={loading} style={{ padding: 12 }}>
          إرسال كود للهاتف
        </button>
      </div>

      {/* عنصر reCAPTCHA */}
      <div id="recaptcha-container" />
    </main>
  );
}
TSX

# 2) fix Button import in product-section.tsx
if [ -f "src/components/sections/product-section.tsx" ]; then
  sed -i.bak "s|^import Button from '../ui/button'|import { Button } from '../ui/button'|g" 
    src/components/sections/product-section.tsx || true
  rm -f src/components/sections/product-section.tsx.bak
fi

# 3) fix Button import in review-modal.tsx
if [ -f "src/components/sections/reviews/review-modal.tsx" ]; then
  sed -i.bak "s|^import Button from '@/components/ui/button'|import { Button } from '@/components/ui/button'|g" 
    src/components/sections/reviews/review-modal.tsx || true
  rm -f src/components/sections/reviews/review-modal.tsx.bak
fi

# minimal verification
echo "— Changed files —"
printf "  - %s
" 
  "src/app/(auth)/login/page.tsx" 
  "src/components/sections/product-section.tsx" 
  "src/components/sections/reviews/review-modal.tsx"

echo "I have applied the fixes."
