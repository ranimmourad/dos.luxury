"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Size } from "@/lib/types";

export type CartItem = {
  id: string;            // productId + size + color
  productId: string;
  name: string;
  image: string;
  price: number;
  size: Size;
  color: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "id">) => void;
  updateQuantity: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  subtotal: number;
  count: number;
};

const CartContext = createContext<CartContextType | null>(null);
const STORAGE_KEY = "dos_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, hydrated]);

  const value = useMemo<CartContextType>(() => {
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const count = items.reduce((s, i) => s + i.quantity, 0);
    return {
      items,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      toggleCart: () => setIsOpen((v) => !v),
      addItem: (item) => {
        const id = `${item.productId}__${item.size}__${item.color}`;
        setItems((prev) => {
          const existing = prev.find((p) => p.id === id);
          if (existing) {
            return prev.map((p) =>
              p.id === id ? { ...p, quantity: p.quantity + item.quantity } : p,
            );
          }
          return [...prev, { ...item, id }];
        });
        setIsOpen(true);
      },
      updateQuantity: (id, qty) =>
        setItems((prev) =>
          prev
            .map((p) => (p.id === id ? { ...p, quantity: Math.max(0, qty) } : p))
            .filter((p) => p.quantity > 0),
        ),
      removeItem: (id) => setItems((prev) => prev.filter((p) => p.id !== id)),
      clearCart: () => setItems([]),
      subtotal,
      count,
    };
  }, [items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
