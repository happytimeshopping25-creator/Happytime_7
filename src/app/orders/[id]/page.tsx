"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firestore";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrderDetails() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const snap = await getDoc(doc(db, "orders", params.id));
      setOrder(snap.exists() ? snap.data() : null);
    })();
  }, [params.id]);

  if (!order) return <div className="p-10 text-center">...</div>;

  return (
    <main className="container py-8">
      <Card>
        <CardHeader><CardTitle>تفاصيل الطلب #{params.id.slice(0,6)}</CardTitle></CardHeader>
        <CardContent className="grid gap-3">
          <div className="flex justify-between"><span>الحالة</span><b>{order.status}</b></div>
          <div className="flex justify-between"><span>المجموع</span><b>{order.total?.toFixed(3)} OMR</b></div>
          <div><b>العناصر:</b>
            <ul className="list-disc pr-5 mt-2">
              {order.items?.map((it: any, i: number) => (
                <li key={i}>{it.title} × {it.qty} — {(it.price * it.qty).toFixed(3)} OMR</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
