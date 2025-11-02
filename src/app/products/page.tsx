"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firestore";
import { useCart } from "@/store/cart";
import Image from "next/image";

type Product = {
  id: string;
  title: string;
  price: number;
  images?: string[];
};

export default function ProductsPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Product[]>([]);
  const add = useCart((s) => s.add);

  useEffect(() => {
    (async () => {
      const q = query(
        collection(db, "products"),
        where("published", "==", true),
        orderBy("createdAt", "desc"),
        limit(40)
      );
      const snap = await getDocs(q);
      setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))] p-16">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl bg-zinc-200 h-64" />
        ))}
      </div>
    );
  }

  return (
    <main className="p-6 grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
      {items.map((p) => (
        <article key={p.id} className="rounded-2xl border p-3 shadow-sm">
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src={p.images?.[0] || "/placeholder.jpg"}
              alt={p.title}
              fill
              sizes="(max-width:768px) 100vw, 25vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <h3 className="mt-3 font-bold line-clamp-2">{p.title}</h3>
          <div className="mt-1 text-emerald-700 font-semibold">{p.price.toFixed(3)} OMR</div>
          <button
            onClick={() => add({ id: p.id, title: p.title, price: p.price, image: p.images?.[0] })}
            className="mt-3 w-full rounded-xl py-2 bg-emerald-700 text-white"
          >
            أضف إلى السلة
          </button>
        </article>
      ))}
    </main>
  );
}
