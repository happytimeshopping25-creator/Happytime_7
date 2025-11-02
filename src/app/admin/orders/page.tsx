"use client";
import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, orderBy, query, where, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Order = {
  id: string;
  userId: string;
  total: number;
  status: string;
  payment?: { method: string; status: string };
  items: { title: string; qty: number; price: number }[];
  customer?: { fullName?: string; phone?: string; address?: string; note?: string };
  createdAt?: any;
};

const STATUSES = ["pending","confirmed","preparing","shipped","done","cancelled"] as const;

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [qText, setQText] = useState("");

  useEffect(() => {
    const base = collection(db, "orders");
    const qy = filter === "all"
      ? query(base, orderBy("createdAt","desc"))
      : query(base, where("status","==",filter), orderBy("createdAt","desc"));
    const unsub = onSnapshot(qy, (snap) => {
      setOrders(snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })));
    });
    return () => unsub();
  }, [filter]);

  const filtered = useMemo(() => {
    if (!qText.trim()) return orders;
    const t = qText.toLowerCase();
    return orders.filter(o =>
      o.id.toLowerCase().includes(t) ||
      o.customer?.fullName?.toLowerCase().includes(t) ||
      o.customer?.phone?.toLowerCase().includes(t)
    );
  }, [orders, qText]);

  const setStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, "orders", id), { status });
      toast.success("تم تحديث الحالة");
      // ⚠️ الـ Cloud Function onUpdate سترسل إشعارًا للمستخدم تلقائيًا
    } catch {
      toast.error("تعذر تحديث الحالة");
    }
  };

  return (
    <main className="container py-8 grid gap-5">
      <div className="flex gap-3 flex-wrap items-center">
        <div className="space-y-1">
          <Label>فلترة الحالة</Label>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="اختر حالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">الكل</SelectItem>
              {STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>بحث</Label>
          <Input placeholder="رقم الطلب / الاسم / الهاتف" value={qText} onChange={e=>setQText(e.target.value)} />
        </div>
      </div>

      {filtered.map(o => (
        <Card key={o.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>#{o.id.slice(0,6)} — {o.customer?.fullName || "عميل"}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Total: {o.total?.toFixed(3)} OMR</Badge>
              <Badge>{o.payment?.method || "cod"} / {o.payment?.status || "unpaid"}</Badge>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="opacity-80">📞 {o.customer?.phone} — 📍 {o.customer?.address}</div>
            <ul className="list-disc pr-5">
              {o.items?.map((it, i) => (
                <li key={i}>{it.title} × {it.qty} — {(it.qty*it.price).toFixed(3)} OMR</li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <Label>الحالة:</Label>
              <Select value={o.status} onValueChange={(v)=>setStatus(o.id, v)}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button variant="secondary" onClick={()=>navigator.clipboard.writeText(o.id)}>نسخ رقم الطلب</Button>
            </div>
          </CardContent>
        </Card>
      ))}
      {!filtered.length && <div className="p-8 text-center opacity-70">لا يوجد نتائج</div>}
    </main>
  );
}
