import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = { id: string; title: string; price: number; qty: number; image?: string };
type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  totalQty: () => number;
  totalPrice: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item, qty = 1) => {
        const items = [...get().items];
        const i = items.findIndex(x => x.id === item.id);
        if (i >= 0) items[i].qty += qty; else items.push({ ...item, qty });
        set({ items });
      },
      remove: (id) => set({ items: get().items.filter(x => x.id !== id) }),
      clear: () => set({ items: [] }),
      inc: (id) => set({ items: get().items.map(x => x.id === id ? { ...x, qty: x.qty + 1 } : x) }),
      dec: (id) => set({ items: get().items.map(x => x.id === id ? { ...x, qty: Math.max(1, x.qty - 1) } : x) }),
      totalQty: () => get().items.reduce((a, b) => a + b.qty, 0),
      totalPrice: () => get().items.reduce((a, b) => a + b.qty * b.price, 0),
    }),
    { name: "ht_cart" }
  )
);
