import { NextRequest, NextResponse } from "next/server";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firestore";

export async function POST(req: NextRequest) {
  const { orderId, amount, customer } = await req.json();
  if (!orderId || !amount) return NextResponse.json({ error: "missing" }, { status: 400 });

  const BASE = process.env.PAYTABS_BASE_URL!;
  const PROFILE_ID = process.env.PAYTABS_PROFILE_ID!;
  const SERVER_KEY = process.env.PAYTABS_SERVER_KEY!;
  const CURRENCY = process.env.PAYTABS_CURRENCY || "OMR";
  const APP = process.env.NEXT_PUBLIC_APP_URL!;

  const payload = {
    profile_id: PROFILE_ID,
    tran_type: "sale",
    tran_class: "ecom",
    cart_id: orderId,
    cart_currency: CURRENCY,
    cart_amount: Number(amount).toFixed(3),
    cart_description: `Order ${orderId}`,
    return: `${APP}/api/paytabs/return?orderId=${orderId}`,
    callback: `${APP}/api/paytabs/webhook`,
    customer_details: {
      name: customer?.fullName || "Customer",
      email: customer?.email || "noreply@happytime.om",
      phone: customer?.phone || "",
      street1: customer?.address || "Salalah",
      city: "Salalah",
      country: "OM",
    },
    shipping_details: {
      name: customer?.fullName || "Customer",
      email: customer?.email || "noreply@happytime.om",
      phone: customer?.phone || "",
      street1: customer?.address || "Salalah",
      city: "Salalah",
      country: "OM",
    },
  };

  const res = await fetch(`${BASE}/payment/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${SERVER_KEY}`
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.redirect_url || !data.tran_ref) {
    return NextResponse.json({ error: "paytabs_error", data }, { status: 400 });
  }

  // احفظ مرجع المعاملة على الطلب
  await updateDoc(doc(db, "orders", orderId), {
    payment: { method: "card", status: "pending", tranRef: data.tran_ref }
  });

  return NextResponse.json({ redirect: data.redirect_url });
}
