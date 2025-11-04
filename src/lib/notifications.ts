import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging"
import { firebaseApp } from "../../../lib/firebaseClient"
import { db } from "@/lib/firestore"
import { doc, setDoc, arrayUnion } from "firebase/firestore"

export async function enableNotifications(uid: string) {
  if (!(await isSupported())) return { ok: false, msg: "المتصفح لا يدعم الإشعارات" }
  const messaging = getMessaging(firebaseApp)
  const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!
  const token = await getToken(messaging, { vapidKey })
  if (!token) return { ok: false, msg: "تعذر الحصول على رمز الإشعار" }

  await setDoc(doc(db, "users", uid), { fcmTokens: arrayUnion(token) }, { merge: true })
  onMessage(messaging, (payload) => {
    // يمكنك إظهار Toast…
    console.log("🔔 Foreground:", payload.notification?.title, payload.data)
  })
  return { ok: true }
}
