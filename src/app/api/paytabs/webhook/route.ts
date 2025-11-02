import { NextRequest, NextResponse } from "next/server";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firestore";
import crypto from "crypto";

function verifySignature(serverKey: string, body: any, signature?: string) {
  // تحقق تقريبي: بعض تكوينات PayTabs ترسل توقيعًا HMAC
  if (!signature) return true; // إن لم يُرسل توقيع
  const raw = JSON.stringify(body);
  const h = crypto.createHmac("sha256", serverKey).update(raw).digest("hex");
  return h === signature;
}

export async function POST(req: NextRequest) {
  const SERVER_KEY = process.env.PAYTABS_SERVER_KEY!;
  const sig = req.headers.get("signature") || req.headers.get("x-signature") || undefined;
  const payload = await req.json();

  if (!verifySignature(SERVER_KEY, payload, sig)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const tranRef = payload?.tran_ref;
  const cartId = payload?.cart_id;
  const statusCode = payload?.payment_result?.response_status; // "A" للنجاح
  const status = statusCode === "A" ? "paid" : "failed";

  if (cartId) {
    await updateDoc(doc(db, "orders", cartId), {
      payment: { method: "card", status, tranRef },
      status: status === "paid" ? "confirmed" : "pending"
    });
  }
  return NextResponse.json({ ok: true });
}
