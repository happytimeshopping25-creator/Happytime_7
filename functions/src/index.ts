import * as admin from "firebase-admin"
import * as functions from "firebase-functions"
admin.initializeApp()
const db = admin.firestore()
const fcm = admin.messaging()

export const onOrderCreated = functions.firestore
  .document("orders/{orderId}")
  .onCreate(async (snap, ctx) => {
    const order = snap.data() as any
    const user = await db.doc(`users/${order.userId}`).get()
    const tokens: string[] = user.exists ? (user.data()?.fcmTokens || []) : []
    if (!tokens.length) return

    await fcm.sendEachForMulticast({
      tokens,
      notification: { title: "✅ تم استلام طلبك", body: `المجموع: ${order.total} OMR` },
      data: { screen: "Order", id: ctx.params.orderId }
    })
  })

export const onOrderStatusChanged = functions.firestore
  .document("orders/{orderId}")
  .onUpdate(async (chg, ctx) => {
    const before = chg.before.data() as any
    const after = chg.after.data() as any
    if (before.status === after.status) return
    const user = await db.doc(`users/${after.userId}`).get()
    const tokens: string[] = user.exists ? (user.data()?.fcmTokens || []) : []
    if (!tokens.length) return

    await fcm.sendEachForMulticast({
      tokens,
      notification: { title: "🔔 تحديث حالة الطلب", body: `الحالة: ${after.status}` },
      data: { screen: "Order", id: ctx.params.orderId }
    })
  })

// حملة ترويجية موجهة (Callable)
export const promoBroadcast = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError("unauthenticated", "Auth required")
  const me = await db.doc(`users/${context.auth.uid}`).get()
  if (!me.exists || me.data()?.role !== "admin") throw new functions.https.HttpsError("permission-denied", "Admins only")

  const title = data?.title || "عرض جديد 🎉"
  const body  = data?.body  || "خصومات مميزة في مركز الزمن السعيد"
  const users = await db.collection("users").get()
  const tokens = Array.from(new Set(users.docs.flatMap(d => d.data().fcmTokens || [])))
  if (!tokens.length) return { sent: 0 }

  await fcm.sendEachForMulticast({
    tokens,
    notification: { title, body },
    data: { screen: "Category", id: data?.categoryId || "offers" }
  })
  return { sent: tokens.length }
})
