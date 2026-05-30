"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { initialProducts } from "@/lib/products";
import type { Product } from "@/lib/types";

type ProductContextType = {
  products: Product[];
  addProduct: (p: Product) => void;
  updateProduct: (id: string, p: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProducts: () => void;
  hydrated: boolean;
};

const ProductContext = createContext<ProductContextType | null>(null);
const STORAGE_KEY = "dos_products_v1";

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: Product[] = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        }
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  // Persist
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products, hydrated]);

  const value = useMemo<ProductContextType>(
    () => ({
      products,
      hydrated,
      addProduct: (p) => setProducts((prev) => [p, ...prev]),
      updateProduct: (id, patch) =>
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        ),
      deleteProduct: (id) =>
        setProducts((prev) => prev.filter((p) => p.id !== id)),
      resetProducts: () => setProducts(initialProducts),
    }),
    [products, hydrated],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used within ProductProvider");
  return ctx;
}
