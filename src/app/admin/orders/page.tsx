'use client'

import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, orderBy, query, where, updateDoc, doc } from "firebase/firestore";
import { db } from "../../../lib/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Order {
  id: string;
  status: string;
  // Add other order properties here
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    if (filter !== "all") {
      q = query(q, where("status", "==", filter));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newOrders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Order));
      setOrders(newOrders);
    });

    return () => unsubscribe();
  }, [filter]);

  const filteredOrders = useMemo(() => {
    if (filter === "all") {
      return orders;
    }
    return orders.filter((order) => order.status === filter);
  }, [orders, filter]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status: newStatus });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="mb-4">
        <Label htmlFor="status-filter">Filter by status:</Label>
        <Select onValueChange={setFilter} defaultValue="all">
          <SelectTrigger id="status-filter" className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-4">
        {filteredOrders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <CardTitle>Order #{order.id}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p>Status: <Badge>{order.status}</Badge></p>
                  {/* Add more order details here */}
                </div>
                <Select onValueChange={(newStatus) => handleStatusChange(order.id, newStatus)} defaultValue={order.status}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Change status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
