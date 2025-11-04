import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "@/firestore.native";
import { useAuth } from "@/AuthProvider.native";
import { Link } from "expo-router";

// 1. تعريف واجهة للطلب
interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: any; // يفضل استخدام Timestamp من Firebase
  // أضف أي حقول أخرى هنا
}

export default function OrdersScreen() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true); // 2. حالة التحميل

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const q = query(
      collection(db, "orders"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() } as Order)));
      setLoading(false); // إيقاف التحميل بعد وصول البيانات
    });
    const unsub = onSnapshot(
      q,
      (snap) => {
        setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Order)));
        setLoading(false); // إيقاف التحميل بعد وصول البيانات
      },
      (error) => {
        console.error("Failed to fetch orders:", error);
        setLoading(false);
        // يمكنك هنا عرض رسالة خطأ للمستخدم
      }
    );
    return () => unsub();
  }, [user]);

  return (
    <View style={styles.container}>
      <FlatList
        // 3. معالجة الحالات المختلفة
        ListHeaderComponent={() => (
          loading ? <ActivityIndicator style={{ marginTop: 20 }} size="large" /> : null
        )}
        ListEmptyComponent={() => (
          !loading && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>لا توجد طلبات سابقة.</Text>
            </View>
          )
        )}
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Link href={`/orders/${item.id}`} asChild>
            <TouchableOpacity style={styles.item}>
              <Text>#{item.id.slice(0, 6)}</Text>
              <Text>{item.status}</Text>
              <Text>{item.total.toFixed(3)} OMR</Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  emptyText: { fontSize: 16, color: 'gray' },
  item: { flexDirection: "row", justifyContent: "space-between", padding: 15, borderBottomWidth: 1, borderBottomColor: "#eee" },
});
