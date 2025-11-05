/** @jest-environment node */

import type { StateStorage } from "zustand/middleware";

type PersistedSnapshot =
  | string
  | null
  | Record<string, unknown>
  | Promise<string | null | Record<string, unknown>>;

type StorageResult = void | Promise<void>;

const createAsyncStorage = (initial: Record<string, string> = {}): StateStorage => {
  const store = new Map<string, string>(Object.entries(initial));
  return {
    getItem: async (name) => store.get(name) ?? null,
    setItem: async (name, value) => {
      store.set(name, value);
    },
    removeItem: async (name) => {
      store.delete(name);
    },
  };
};

const readValue = async (storage: StateStorage, key: string) => {
  const value = storage.getItem(key) as PersistedSnapshot;
  return await Promise.resolve(value);
};

const writeValue = async (storage: StateStorage, key: string, value: string) => {
  const result = storage.setItem(key, value) as StorageResult;
  await Promise.resolve(result);
};

describe("cart store in server environments", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("falls back to memory storage when window is unavailable", async () => {
    const cartModule = await import("../cart");
    const { useCart, ensureCartHydrated, CART_STORAGE_KEY } = cartModule;

    expect(typeof globalThis.window).toBe("undefined");

    expect(() => useCart.getState()).not.toThrow();

    useCart.getState().add({ id: "srv", title: "Server", price: 5 });
    await ensureCartHydrated();

    const options = useCart.persist?.getOptions?.();
    const storage = options?.storage as StateStorage | undefined;
    expect(storage).toBeDefined();

    const snapshot = storage ? await readValue(storage, CART_STORAGE_KEY) : null;
    expect(snapshot).not.toBeNull();

    const serialized = typeof snapshot === "string" ? snapshot : JSON.stringify(snapshot);
    expect(serialized).toEqual(expect.stringContaining('"srv"'));
  });

  it("hydrates once via ensureCartHydrated with preloaded data", async () => {
    const payload = JSON.stringify({
      state: {
        items: [
          { id: "seed", title: "Seeded", price: 15, qty: 2 },
        ],
      },
      version: 0,
    });

    const seededStorage = createAsyncStorage();

    const cartModule = await import("../cart");
    const { useCart, configureCartStorage, ensureCartHydrated, CART_STORAGE_KEY } = cartModule;

    await writeValue(seededStorage, CART_STORAGE_KEY, payload);

    const rehydrateSpy = jest.spyOn(useCart.persist!, "rehydrate");

    await configureCartStorage(seededStorage);
    await ensureCartHydrated();

    expect(rehydrateSpy).toHaveBeenCalledTimes(1);
    expect(useCart.getState().totalQty()).toBe(2);
    expect(useCart.getState().totalPrice()).toBe(30);

    await ensureCartHydrated();
    expect(rehydrateSpy).toHaveBeenCalledTimes(1);

    const snapshot = await readValue(seededStorage, CART_STORAGE_KEY);
    expect(snapshot).toEqual(payload);
  });
});