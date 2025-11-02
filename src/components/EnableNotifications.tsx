"use client";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { enableNotifications } from "@/lib/notifications";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function EnableNotifications() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const click = async () => {
    if (!user) return toast.warning("سجّل الدخول أولًا");
    setLoading(true);
    const res = await enableNotifications(user.uid);
    setLoading(false);
    res.ok ? toast.success("تم تفعيل الإشعارات") : toast.error(res.msg || "فشل التفعيل");
  };

  return (
    <Button onClick={click} variant="outline" disabled={loading}>
      {loading ? "..." : "تفعيل الإشعارات 🔔"}
    </Button>
  );
}
