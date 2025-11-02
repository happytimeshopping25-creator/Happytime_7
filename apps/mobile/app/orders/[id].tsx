import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/src/firestore.native";

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    const unsub = onSnapshot(doc(db, "orders", id as string), (snap) => {
      setOrder(snap.data());
    });
    return () => unsub();
  }, [id]);

  if (!order) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text>Order #{id}</Text>
      <Text>Status: {order.status}</Text>
      <Text>Total: {order.total.toFixed(3)} OMR</Text>
      {/* اعرض تفاصيل إضافية هنا */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 10 },
});
