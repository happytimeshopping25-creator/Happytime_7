"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firestore";
import { useAuth } from "@/components/AuthProvider";
import { useCart } from "@/store/cart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, totalPrice, clear } = useCart();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [payMethod, setPayMethod] = useState<"cod"|"card">("cod");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!user) return toast.warning("يرجى تسجيل الدخول أولًا");
    if (!items.length) return toast.warning("السلة فارغة");
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      return toast.warning("أكمل الحقول المطلوبة: الاسم، الهاتف، العنوان");
    }

    setLoading(true);
    try {
      const customer = { fullName, phone, address, note, email: user.email };
      const orderData = {
        userId: user.uid,
        customer,
        items: items.map(i => ({ productId: i.id, title: i.title, qty: i.qty, price: i.price })),
        total: totalPrice(),
        payment: { method: payMethod, status: payMethod === "cod" ? "unpaid" : "pending" },
        status: "pending",
        createdAt: serverTimestamp(),
      };

      const orderRef = await addDoc(collection(db, "orders"), orderData);

      if (payMethod === 'card') {
        const res = await fetch('/api/paytabs/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: orderRef.id, amount: orderData.total, customer }),
        });
        const { redirect, error } = await res.json();
        if (error) {
          toast.error("لم نتمكن من إنشاء صفحة الدفع. حاول مجددًا.");
          setLoading(false);
          return;
        }
        window.location.href = redirect;
      } else {
        clear();
        toast.success("✅ تم إنشاء الطلب بنجاح");
        router.push(`/orders/${orderRef.id}`);
      }

    } catch (e) {
      toast.error("❌ حدث خطأ أثناء إنشاء الطلب");
      setLoading(false);
    }
  };

  return (
    <div className="container py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader><CardTitle>إتمام الشراء</CardTitle></CardHeader>
        <CardContent className="grid gap-5">
          <div className="grid gap-2">
            <Label>الاسم الكامل *</Label>
            <Input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="مثال: محمد جمال" />
          </div>
          <div className="grid gap-2">
            <Label>رقم الهاتف *</Label>
            <Input dir="ltr" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+9689xxxxxxx" />
          </div>
          <div className="grid gap-2">
            <Label>العنوان الكامل *</Label>
            <Textarea value={address} onChange={e => setAddress(e.target.value)} placeholder="صلالة – السعادة – وصف دقيق للموقع" />
          </div>
          <div className="grid gap-2">
            <Label>ملاحظات (اختياري)</Label>
            <Textarea value={note} onChange={e => setNote(e.target.value)} placeholder="تعليمات التسليم، وقت مفضل..." />
          </div>

          <div className="grid gap-2">
            <Label>طريقة الدفع</Label>
            <RadioGroup value={payMethod} onValueChange={(v) => setPayMethod(v as any)} className="grid gap-3">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod">الدفع عند الاستلام (موصى به)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card">بطاقة / دفع إلكتروني</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-between text-lg font-semibold">
            <span>المجموع:</span>
            <span className="text-emerald-700">{totalPrice().toFixed(3)} OMR</span>
          </div>

          <Button onClick={handleCheckout} disabled={loading} className="w-full">
            {loading ? "جاري التنفيذ..." : "تأكيد الطلب"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
