"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/data/products";
import { effectivePrice } from "@/lib/pricing";

export type CartLine = {
  lineId: string;
  product: Product;
  size: string;
  color: string;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  addItem: (product: Product, size: string, color: string, qty: number) => void;
  removeItem: (lineId: string) => void;
  updateQty: (lineId: string, qty: number) => void;
  updateLine: (lineId: string, size: string, color: string) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "urbansport-cart";

function readStoredLines(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStoredLines(lines: CartLine[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // localStorage unavailable (private browsing) — cart stays in-memory only.
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Intentional: localStorage only exists client-side, so the cart must
    // start empty on the server-rendered pass and hydrate here to avoid a
    // markup mismatch. This is the one-time "subscribe to external state on
    // mount" case, not a derived-state anti-pattern.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLines(readStoredLines());
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) writeStoredLines(lines);
  }, [lines, isMounted]);

  const addItem = (product: Product, size: string, color: string, qty: number) => {
    const lineId = `${product.id}-${size}-${color}`;
    setLines((prev) => {
      const existing = prev.find((l) => l.lineId === lineId);
      if (existing) {
        return prev.map((l) =>
          l.lineId === lineId ? { ...l, qty: l.qty + qty } : l
        );
      }
      return [...prev, { lineId, product, size, color, qty }];
    });
    setIsOpen(true);
  };

  const removeItem = (lineId: string) => {
    setLines((prev) => prev.filter((l) => l.lineId !== lineId));
  };

  const updateQty = (lineId: string, qty: number) => {
    if (qty < 1) {
      removeItem(lineId);
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.lineId === lineId ? { ...l, qty } : l))
    );
  };

  // Size/color are part of lineId, so an edit that lands on a combination
  // already in the cart merges into that line instead of duplicating it.
  const updateLine = (lineId: string, size: string, color: string) => {
    setLines((prev) => {
      const target = prev.find((l) => l.lineId === lineId);
      if (!target) return prev;
      const newId = `${target.product.id}-${size}-${color}`;
      if (newId === lineId) return prev;
      if (prev.some((l) => l.lineId === newId)) {
        return prev
          .filter((l) => l.lineId !== lineId)
          .map((l) =>
            l.lineId === newId ? { ...l, qty: l.qty + target.qty } : l
          );
      }
      return prev.map((l) =>
        l.lineId === lineId ? { ...l, lineId: newId, size, color } : l
      );
    });
  };

  const clearCart = () => {
    setLines([]);
  };

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + effectivePrice(l.product) * l.qty, 0),
    [lines]
  );
  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.qty, 0),
    [lines]
  );

  return (
    <CartContext.Provider
      value={{
        lines,
        addItem,
        removeItem,
        updateQty,
        updateLine,
        clearCart,
        subtotal,
        itemCount,
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
