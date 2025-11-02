"use client"
import { Button } from "@/components/ui/button"

export function ShareButton({ title, text, url }: { title: string; text: string; url: string }) {
  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url })
      } else {
        await navigator.clipboard.writeText(url)
        alert("تم نسخ الرابط")
      }n    } catch {}
  }
  return <Button variant="outline" onClick={share}>مشاركة 🔗</Button>
}
