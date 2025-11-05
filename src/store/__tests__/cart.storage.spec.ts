import type { StateStorage } from "zustand/middleware";

type PersistedSnapshot =
  | string
  | null
  | Record<string, unknown>
  | Promise<string | null | Record<string, unknown>>;

const createSyncStorage = (): StateStorage => {
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

const readValue = async (storage: StateStorage, key: string) => {
  const value = storage.getItem(key) as PersistedSnapshot;
  return await Promise.resolve(value);
};

describe("cart storage switching", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetModules();
  });

  it("keeps persisted items when switching storage providers", async () => {
    const cartModule = await import("../cart");
    const { useCart, configureCartStorage, ensureCartHydrated, CART_STORAGE_KEY } = cartModule;

    useCart.getState().clear();
    useCart.getState().add({ id: "1", title: "Test", price: 25 });

    const browserSnapshot = localStorage.getItem(CART_STORAGE_KEY);
    expect(browserSnapshot).toEqual(
      expect.stringContaining('"items"')
    );

    const memoryStorage = createSyncStorage();

    await configureCartStorage(memoryStorage);
    await ensureCartHydrated();

    const items = useCart.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({ id: "1", qty: 1, price: 25 });

    await expect(readValue(memoryStorage, CART_STORAGE_KEY)).resolves.toBe(browserSnapshot);
  });

  it("hydrates immediately after switching storage", async () => {
    const cartModule = await import("../cart");
    const { useCart, configureCartStorage, ensureCartHydrated } = cartModule;

    useCart.getState().add({ id: "1", title: "Test", price: 10 });

    const memoryStorage = createSyncStorage();

    await configureCartStorage(memoryStorage);
    await ensureCartHydrated();

    expect(useCart.persist?.hasHydrated?.()).toBe(true);
    expect(useCart.getState().items).toHaveLength(1);
  });
});