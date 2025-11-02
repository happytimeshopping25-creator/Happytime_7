"use client";
import Link from "next/link";
import { useCart } from "@/store/cart";

export function CartBadge() {
  const qty = useCart((s) => s.totalQty());
  return (
    <Link href="/cart" className="relative">
      <span>🛒</span>
      {qty > 0 && (
        <span style={{
          position: "absolute", top: -6, right: -10, fontSize: 12,
          background: "#0F7B6C", color: "#fff", borderRadius: 12, padding: "2px 6px"
        }}>
          {qty}
        </span>
      )}
    </Link>
  );
}
