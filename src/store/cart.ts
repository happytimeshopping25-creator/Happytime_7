import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";

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

const createMemoryStorage = (): StateStorage => {
  const store = new Map<string, string>();
  return {
    getItem: (name) => store.get(name) ?? null,
    setItem: (name, value) => {
      store.set(name, value);
    },
    removeItem: (name) => {
      store.delete(name);
    },
  };
};

const memoryStorage = createMemoryStorage();

let storageOverride: StateStorage | undefined;

export const CART_STORAGE_KEY = "ht_cart";

const resolveStorage = (): StateStorage => {
  if (storageOverride) return storageOverride;
  if (typeof window !== "undefined" && window.localStorage) {
    return window.localStorage;
  }
  return memoryStorage;
};

const shouldSkipHydration = typeof window === "undefined";

const readStorageValue = async (storage: StateStorage): Promise<string | null> => {
  try {
    return await Promise.resolve(storage.getItem(CART_STORAGE_KEY));
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Failed to read cart storage", error);
    }
    return null;
  }
};

const writeStorageValue = async (storage: StateStorage, value: string) => {
  try {
    await Promise.resolve(storage.setItem(CART_STORAGE_KEY, value));
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Failed to write cart storage", error);
    }
  }
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
    {
      name: CART_STORAGE_KEY,
      storage: createJSONStorage(resolveStorage),
      skipHydration: shouldSkipHydration,
    }
  )
);

export const configureCartStorage = async (storage: StateStorage) => {
  const previousStorage = resolveStorage();
  const previousSnapshot = await readStorageValue(previousStorage);
  const targetSnapshot = await readStorageValue(storage);

  storageOverride = storage;

  useCart.persist?.setOptions?.({
    storage: createJSONStorage(() => storage),
    skipHydration: false,
  });

  if (!targetSnapshot && previousSnapshot) {
    await writeStorageValue(storage, previousSnapshot);
  }

  await ensureCartHydrated();
};

export const ensureCartHydrated = async () => {
  if (!useCart.persist?.hasHydrated?.()) {
    await useCart.persist?.rehydrate?.();
  }
};