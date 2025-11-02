"use client";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firestore";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { Card, CardContent } from "@/components/ui/card";

type Order = { id: string; total: number; status: string; createdAt?: any };

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    (async () => {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      setOrders(snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })));
      setLoading(false);
    })();
  }, [user]);

  if (!user) return <div className="p-10 text-center">سجّل الدخول لعرض طلباتك</div>;
  if (loading) return <div className="p-10 text-center">جاري التحميل...</div>;

  return (
    <main className="container py-8 grid gap-4">
      {orders.map(o => (
        <Link key={o.id} href={`/orders/${o.id}`}>
          <Card><CardContent className="p-4 flex justify-between">
            <span>#{o.id.slice(0,6)} — {o.status}</span>
            <b>{o.total?.toFixed(3)} OMR</b>
          </CardContent></Card>
        </Link>
      ))}
      {!orders.length && <div className="p-10 text-center opacity-70">لا توجد طلبات بعد</div>}
    </main>
  );
}
