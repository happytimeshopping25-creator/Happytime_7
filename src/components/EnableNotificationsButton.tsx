"use client"
import { useState } from "react"
import { useAuth } from "@/components/AuthProvider"
import { Button } from "@/components/ui/button"
import { enableNotifications } from "@/lib/notifications"
import { toast } from "sonner"

export function EnableNotificationsButton() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const click = async () => {
    if (!user) return toast.warning("سجّل الدخول أولًا")
    setLoading(true)
    const res = await enableNotifications(user.uid)
    setLoading(false)
    res.ok ? toast.success("تم تفعيل الإشعارات") : toast.error(res.msg || "فشل التفعيل")
  }
  return <Button onClick={click} disabled={loading} variant="outline">{loading ? "..." : "تفعيل الإشعارات 🔔"}</Button>
}
