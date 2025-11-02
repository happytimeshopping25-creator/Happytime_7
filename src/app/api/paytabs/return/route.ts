import { NextRequest, NextResponse } from "next/server";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firestore";

export async function GET(req: NextRequest) {
  const BASE = process.env.PAYTABS_BASE_URL!;
  const SERVER_KEY = process.env.PAYTABS_SERVER_KEY!;
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");
  const tranRef = searchParams.get("tranRef") || searchParams.get("tran_ref");

  if (!orderId) return NextResponse.redirect(new URL(`/orders`, process.env.NEXT_PUBLIC_APP_URL));

  // استعلم عن حالة العملية (Query API)
  let status = "failed";
  try {
    const qres = await fetch(`${BASE}/payment/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${SERVER_KEY}` },
      body: JSON.stringify({ tran_ref: tranRef })
    });
    const q = await qres.json();
    const code = q?.payment_result?.response_status; // "A" عادةً للنجاح
    status = code === "A" ? "paid" : "failed";
  } catch {}

  await updateDoc(doc(db, "orders", orderId), {
    status: status === "paid" ? "confirmed" : "pending",
    payment: { method: "card", status, tranRef }
  });

  // رجّع المستخدم لتفاصيل الطلب
  return NextResponse.redirect(new URL(`/orders/${orderId}`, process.env.NEXT_PUBLIC_APP_URL));
}
