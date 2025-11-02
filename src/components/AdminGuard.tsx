"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firestore";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [ok, setOk] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) { router.replace("/login"); return; }
    (async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      const role = snap.exists() ? snap.data().role : null;
      if (role === "admin") setOk(true);
      else router.replace("/");
    })();
  }, [user, loading, router]);

  if (!ok) return null;
  return <>{children}</>;
}
