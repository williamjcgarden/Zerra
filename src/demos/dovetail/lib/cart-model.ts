import { PRODUCTS } from "@/demos/dovetail/data/nocturn";

export interface CartItem {
  productId: string;
  size: string;
  color: string;
  qty: number;
}

type CartVariant = Omit<CartItem, "qty">;
export const MAX_CART_QTY = 10;

const sameVariant = (a: CartVariant, b: CartVariant) =>
  a.productId === b.productId && a.size === b.size && a.color === b.color;

export function normalizeCart(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];
  const items: CartItem[] = [];
  for (const entry of value) {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) continue;
    const { productId, size, color, qty } = entry;
    if (
      typeof productId !== "string" ||
      typeof size !== "string" ||
      typeof color !== "string" ||
      typeof qty !== "number" ||
      !Number.isFinite(qty) ||
      !Number.isInteger(qty) ||
      qty <= 0
    )
      continue;
    const product = PRODUCTS.find((p) => p.id === productId);
    if (
      !product ||
      !product.sizes.includes(size) ||
      product.soldOut.includes(size) ||
      !product.colorways.some((c) => c.name === color)
    )
      continue;
    const item = { productId, size, color, qty: Math.min(qty, MAX_CART_QTY) };
    const index = items.findIndex((existing) => sameVariant(existing, item));
    const existing = items[index];
    if (existing)
      items[index] = { ...existing, qty: Math.min(existing.qty + item.qty, MAX_CART_QTY) };
    else items.push(item);
  }
  return items;
}

export function addCartItem(items: readonly CartItem[], variant: CartVariant): CartItem[] {
  return normalizeCart([...items, { ...variant, qty: 1 }]);
}

export function removeCartItem(items: readonly CartItem[], variant: CartVariant): CartItem[] {
  return items.filter((item) => !sameVariant(item, variant));
}

export function setCartItemQty(
  items: readonly CartItem[],
  variant: CartVariant,
  qty: number,
): CartItem[] {
  if (!Number.isFinite(qty) || !Number.isInteger(qty)) return [...items];
  if (qty <= 0) return removeCartItem(items, variant);
  return normalizeCart(items.map((item) => (sameVariant(item, variant) ? { ...item, qty } : item)));
}
