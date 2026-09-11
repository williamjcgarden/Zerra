import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Context,
  type ReactNode,
} from "react";
import { PRODUCTS, type Product } from "@/demos/dovetail/data/nocturn";
import {
  addCartItem,
  normalizeCart,
  removeCartItem,
  setCartItemQty,
  type CartItem,
} from "./cart-model";
export type { CartItem } from "./cart-model";

interface CartEntry extends CartItem {
  product: Product;
}

interface CartContextValue {
  items: CartEntry[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  addItem: (productId: string, size: string, color: string) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  setQty: (productId: string, size: string, color: string, qty: number) => void;
  clear: () => void;
}

// Stash the context on a global so hot-module reloads (which can create a
// second copy of this module) keep sharing one provider instead of throwing.
const globalScope = globalThis as typeof globalThis & {
  __nocturnCartContext?: Context<CartContextValue | null>;
};

const CartContext =
  globalScope.__nocturnCartContext ??
  (globalScope.__nocturnCartContext = createContext<CartContextValue | null>(null));

const STORAGE_KEY = "nocturn-cart";

function load(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return normalizeCart(JSON.parse(raw));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<CartItem[]>([]);
  const [restored, setRestored] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setRaw(load());
    setRestored(true);
  }, []);

  useEffect(() => {
    // The server and first client render stay empty; never persist that placeholder.
    if (!restored) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(raw));
    } catch {
      /* private mode — bag just won't persist */
    }
  }, [raw, restored]);

  const addItem = useCallback((productId: string, size: string, color: string) => {
    setRaw((prev) => addCartItem(prev, { productId, size, color }));
    setOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, size: string, color: string) => {
    setRaw((prev) => removeCartItem(prev, { productId, size, color }));
  }, []);

  const setQty = useCallback((productId: string, size: string, color: string, qty: number) => {
    setRaw((prev) => setCartItemQty(prev, { productId, size, color }, qty));
  }, []);

  const clear = useCallback(() => setRaw([]), []);

  const value = useMemo<CartContextValue>(() => {
    const items = raw
      .map((i) => ({ ...i, product: PRODUCTS.find((p) => p.id === i.productId) }))
      .filter((i): i is CartEntry => !!i.product);
    return {
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((n, i) => n + i.qty * i.product.price, 0),
      open,
      setOpen,
      addItem,
      removeItem,
      setQty,
      clear,
    };
  }, [raw, open, addItem, removeItem, setQty, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
