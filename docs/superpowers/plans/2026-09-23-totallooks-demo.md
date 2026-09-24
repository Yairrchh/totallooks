# TOTAL LOOKS Demo E-commerce Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a working Next.js demo storefront for TOTAL LOOKS (sportswear) with
catalog filters, cart, and WhatsApp checkout, to win a cold-sale client pitch.

**Architecture:** Next.js 14 App Router + TypeScript + Tailwind, fully client-side
(static product data, Context-based cart persisted to localStorage), no backend.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS 3, next/image with
Unsplash remote images, deployed to Netlify.

**Spec:** `docs/superpowers/specs/2026-09-23-totallooks-demo-design.md`

## Global Constraints

- No automated test suite this iteration (spec's explicit scope cut). Every task's
  "Verify" step is manual: `npx tsc --noEmit` for type safety, plus running
  `npm run dev` and checking behavior in the browser. Do not add Jest/Vitest.
- Categories are exactly: `"hombre" | "mujer" | "zapatos-dama" | "zapatos-caballero"`.
- Brand colors (Tailwind tokens, defined once in Task 1, used everywhere after):
  `tl-black:#0a0a0c`, `tl-surface:#151517`, `tl-red:#e31c23`, `tl-red-dark:#9c1116`,
  `tl-white:#f5f5f2`, `tl-grey:#8b8b90`.
- Fonts: display = "Anton" (Google Font), body/UI = "Barlow" (Google Font, 400/600/700).
- WhatsApp number constant: `584144854795` (seller's own number for the live pitch —
  confirmed with user, converted from local Venezuelan format `04144854795`).
- Logo source file: `/home/yairrchh/Descargas/totallooks-logo-sin-fondo.svg` — copy
  into `public/logo.svg` in Task 1, do not recreate it.

---

### Task 1: Scaffold project, brand theme, logo

**Files:**
- Create: whole Next.js scaffold via `create-next-app` (App Router, TS, Tailwind,
  ESLint, `src/` dir, `@/*` import alias)
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Modify: `next.config.mjs`
- Create: `public/logo.svg` (copied from the path above)
- Modify: `src/app/layout.tsx` (root layout metadata + font setup, no Cart yet)

**Interfaces:**
- Produces: Tailwind tokens `tl-black`, `tl-surface`, `tl-red`, `tl-red-dark`,
  `tl-white`, `tl-grey` usable as `bg-tl-black`, `text-tl-red`, etc. Font classes
  `font-display` (Anton) and `font-sans` (Barlow, set as Tailwind's default sans).

- [ ] **Step 1: Scaffold the app**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir \
  --import-alias "@/*" --use-npm
```

Answer any remaining prompts with defaults (e.g. accept or decline Turbopack for dev —
either is fine, it doesn't affect this plan). This runs inside
`/home/yairrchh/Carpetapersonal/totalLooks`, which is already a git repo with the
`docs/` folder — confirm the installer doesn't overwrite `docs/`.

- [ ] **Step 2: Copy the logo asset**

```bash
mkdir -p public
cp "/home/yairrchh/Descargas/totallooks-logo-sin-fondo.svg" public/logo.svg
```

- [ ] **Step 3: Configure Tailwind brand tokens and fonts**

Edit `tailwind.config.ts`, extend `theme`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "tl-black": "#0a0a0c",
        "tl-surface": "#151517",
        "tl-red": "#e31c23",
        "tl-red-dark": "#9c1116",
        "tl-white": "#f5f5f2",
        "tl-grey": "#8b8b90",
      },
      fontFamily: {
        display: ["var(--font-anton)", "Impact", "sans-serif"],
        sans: ["var(--font-barlow)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 4: Load Google Fonts via next/font in the root layout**

Edit `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Anton, Barlow } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const barlow = Barlow({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TOTAL LOOKS — Tu look sube, los precios bajan",
  description: "Ropa deportiva y calzado para hombre y mujer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${anton.variable} ${barlow.variable} bg-tl-black text-tl-white font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Allow Unsplash remote images**

Edit `next.config.mjs`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit` — expect no errors.
Run: `npm run dev`, open `http://localhost:3000` — expect the (still default/blank)
page to load on a black background with no console errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Scaffold Next.js project with TOTAL LOOKS brand theme"
```

---

### Task 2: Product catalog data

**Files:**
- Create: `src/data/products.ts`

**Interfaces:**
- Produces:
  ```ts
  export type Category = "hombre" | "mujer" | "zapatos-dama" | "zapatos-caballero";
  export type Product = {
    id: string;
    slug: string;
    name: string;
    category: Category;
    brand: string;
    price: number;
    sizes: string[];
    colors: string[];
    images: string[];
    description: string;
  };
  export const products: Product[];
  export const categoryLabels: Record<Category, string>;
  ```

- [ ] **Step 1: Write the catalog file**

```ts
// src/data/products.ts
export type Category =
  | "hombre"
  | "mujer"
  | "zapatos-dama"
  | "zapatos-caballero";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  brand: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: string[];
  description: string;
};

export const categoryLabels: Record<Category, string> = {
  hombre: "Hombre",
  mujer: "Mujer",
  "zapatos-dama": "Zapatos Dama",
  "zapatos-caballero": "Zapatos Caballero",
};

const ropaSizes = ["S", "M", "L", "XL", "XXL"];
const shoeSizesDama = ["36", "37", "38", "39", "40"];
const shoeSizesCaballero = ["40", "41", "42", "43", "44", "45"];

export const products: Product[] = [
  {
    id: "p01",
    slug: "hoodie-training-negro",
    name: "Hoodie Training",
    category: "hombre",
    brand: "Nike",
    price: 42,
    sizes: ropaSizes,
    colors: ["Negro", "Gris"],
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80",
      "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&q=80",
    ],
    description: "Buzo con capucha de algodón perchado, ajuste relajado, ideal para entrenar o para la calle.",
  },
  {
    id: "p02",
    slug: "camiseta-dry-fit-blanca",
    name: "Camiseta Dry-Fit",
    category: "hombre",
    brand: "Adidas",
    price: 24,
    sizes: ropaSizes,
    colors: ["Blanco", "Negro", "Azul"],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    ],
    description: "Camiseta técnica transpirable, tejido ligero que se seca rápido.",
  },
  {
    id: "p03",
    slug: "short-basketball-rojo",
    name: "Short Basketball",
    category: "hombre",
    brand: "Puma",
    price: 22,
    sizes: ropaSizes,
    colors: ["Rojo", "Negro"],
    images: [
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=80",
    ],
    description: "Short deportivo suelto con bolsillos laterales, tela ligera anti-roce.",
  },
  {
    id: "p04",
    slug: "chaqueta-cortavientos-gris",
    name: "Chaqueta Cortavientos",
    category: "hombre",
    brand: "New Balance",
    price: 55,
    sizes: ropaSizes,
    colors: ["Gris", "Negro"],
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    ],
    description: "Chaqueta liviana resistente al viento, corte deportivo entallado.",
  },
  {
    id: "p05",
    slug: "jogger-fleece-negro",
    name: "Jogger Fleece",
    category: "hombre",
    brand: "Under Armour",
    price: 38,
    sizes: ropaSizes,
    colors: ["Negro", "Gris"],
    images: [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80",
    ],
    description: "Pantalón jogger con puños ajustados, bolsillos con cierre, tela fleece cálida.",
  },
  {
    id: "p06",
    slug: "conjunto-deportivo-negro",
    name: "Conjunto Deportivo Total",
    category: "hombre",
    brand: "TOTAL LOOKS",
    price: 65,
    sizes: ropaSizes,
    colors: ["Negro", "Rojo"],
    images: [
      "https://images.unsplash.com/photo-1483721310020-03333e577078?w=800&q=80",
    ],
    description: "Conjunto buzo + jogger a juego, línea propia TOTAL LOOKS.",
  },
  {
    id: "p07",
    slug: "top-deportivo-negro",
    name: "Top Deportivo Estampado",
    category: "mujer",
    brand: "Nike",
    price: 28,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Negro", "Rojo"],
    images: [
      "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=800&q=80",
    ],
    description: "Top deportivo de soporte medio, tela compresiva, ideal para entrenar.",
  },
  {
    id: "p08",
    slug: "legging-alto-negro",
    name: "Legging Cintura Alta",
    category: "mujer",
    brand: "Puma",
    price: 34,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Negro", "Gris"],
    images: [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
    ],
    description: "Legging de cintura alta, tela con compresión suave y control de abdomen.",
  },
  {
    id: "p09",
    slug: "hoodie-crop-gris",
    name: "Hoodie Crop",
    category: "mujer",
    brand: "Adidas",
    price: 40,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Gris", "Rosa", "Negro"],
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    ],
    description: "Buzo corto con capucha, corte moderno, algodón suave.",
  },
  {
    id: "p10",
    slug: "chaqueta-bomber-mujer",
    name: "Chaqueta Bomber",
    category: "mujer",
    brand: "New Balance",
    price: 58,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Negro", "Blanco"],
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    ],
    description: "Chaqueta estilo bomber, forro interior liviano, cierre frontal.",
  },
  {
    id: "p11",
    slug: "conjunto-yoga-negro",
    name: "Conjunto Yoga Total",
    category: "mujer",
    brand: "TOTAL LOOKS",
    price: 52,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Negro", "Rojo"],
    images: [
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=80",
    ],
    description: "Conjunto top + legging línea propia TOTAL LOOKS, tela suave de alta compresión.",
  },
  {
    id: "p12",
    slug: "short-running-mujer",
    name: "Short Running",
    category: "mujer",
    brand: "Under Armour",
    price: 26,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Negro", "Azul"],
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80",
    ],
    description: "Short running con malla interior, tela ligera de secado rápido.",
  },
  {
    id: "p13",
    slug: "tenis-runner-blanco-dama",
    name: "Tenis Runner",
    category: "zapatos-dama",
    brand: "Nike",
    price: 78,
    sizes: shoeSizesDama,
    colors: ["Blanco", "Rosa"],
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    ],
    description: "Zapatilla running con amortiguación ligera y malla transpirable.",
  },
  {
    id: "p14",
    slug: "tenis-lifestyle-negro-dama",
    name: "Tenis Lifestyle",
    category: "zapatos-dama",
    brand: "Puma",
    price: 65,
    sizes: shoeSizesDama,
    colors: ["Negro", "Blanco"],
    images: [
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80",
    ],
    description: "Zapatilla urbana de uso diario, suela flexible, diseño minimalista.",
  },
  {
    id: "p15",
    slug: "botas-training-dama",
    name: "Botas Training",
    category: "zapatos-dama",
    brand: "New Balance",
    price: 72,
    sizes: shoeSizesDama,
    colors: ["Negro"],
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
    ],
    description: "Bota deportiva de caña baja, agarre firme para entrenamiento funcional.",
  },
  {
    id: "p16",
    slug: "sandalias-deportivas-dama",
    name: "Sandalias Deportivas",
    category: "zapatos-dama",
    brand: "Adidas",
    price: 35,
    sizes: shoeSizesDama,
    colors: ["Negro", "Blanco"],
    images: [
      "https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=800&q=80",
    ],
    description: "Sandalia deportiva con velcro ajustable, suela con buen agarre.",
  },
  {
    id: "p17",
    slug: "tenis-runner-negro-caballero",
    name: "Tenis Runner Pro",
    category: "zapatos-caballero",
    brand: "Nike",
    price: 85,
    sizes: shoeSizesCaballero,
    colors: ["Negro", "Rojo"],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    ],
    description: "Zapatilla de running con entresuela con retorno de energía.",
  },
  {
    id: "p18",
    slug: "tenis-basketball-caballero",
    name: "Tenis Basketball",
    category: "zapatos-caballero",
    brand: "Under Armour",
    price: 92,
    sizes: shoeSizesCaballero,
    colors: ["Negro", "Blanco"],
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80",
    ],
    description: "Zapatilla de basketball con soporte en tobillo y suela de alta tracción.",
  },
  {
    id: "p19",
    slug: "tenis-casual-caballero",
    name: "Tenis Casual",
    category: "zapatos-caballero",
    brand: "Puma",
    price: 60,
    sizes: shoeSizesCaballero,
    colors: ["Gris", "Blanco"],
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80",
    ],
    description: "Zapatilla casual todo terreno, cómoda para uso diario.",
  },
  {
    id: "p20",
    slug: "botas-outdoor-caballero",
    name: "Botas Outdoor",
    category: "zapatos-caballero",
    brand: "TOTAL LOOKS",
    price: 70,
    sizes: shoeSizesCaballero,
    colors: ["Negro", "Gris"],
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80",
    ],
    description: "Bota resistente línea propia TOTAL LOOKS, suela reforzada.",
  },
];
```

- [ ] **Step 2: Verify every image URL actually resolves**

Run this for each unique image URL in the file just written (batch it):

```bash
for u in $(grep -oE 'https://images\.unsplash\.com/[^"]+' src/data/products.ts | sort -u); do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$u")
  echo "$code $u"
done
```

Expected: every line starts with `200`. For any line that doesn't, replace that exact
URL in `src/data/products.ts` with a working Unsplash photo on the same subject
(search unsplash.com for the product type — e.g. "sneakers", "hoodie", "running
shorts" — copy the real photo URL from the address bar, append `?w=800&q=80`), then
re-run this loop until every URL returns 200.

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit` — expect no errors.

- [ ] **Step 4: Commit**

```bash
git add src/data/products.ts
git commit -m "Add product catalog data (20 items across 4 categories)"
```

---

### Task 3: Cart context (state + localStorage persistence)

**Files:**
- Create: `src/context/CartContext.tsx`

**Interfaces:**
- Consumes: `Product` type from `src/data/products.ts` (Task 2).
- Produces:
  ```ts
  export type CartLine = {
    lineId: string; // `${productId}-${size}-${color}`
    product: Product;
    size: string;
    color: string;
    qty: number;
  };
  export function CartProvider({ children }: { children: React.ReactNode }): JSX.Element;
  export function useCart(): {
    lines: CartLine[];
    addItem: (product: Product, size: string, color: string, qty: number) => void;
    removeItem: (lineId: string) => void;
    updateQty: (lineId: string, qty: number) => void;
    subtotal: number;
    itemCount: number;
    isOpen: boolean;
    open: () => void;
    close: () => void;
  };
  ```

- [ ] **Step 1: Write the context**

```tsx
// src/context/CartContext.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/data/products";

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
  subtotal: number;
  itemCount: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "totallooks-cart";

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

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.product.price * l.qty, 0),
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
```

- [ ] **Step 2: Wire the provider into the root layout**

Edit `src/app/layout.tsx` — wrap `{children}` with `<CartProvider>`:

```tsx
import { CartProvider } from "@/context/CartContext";
// ...
      <body className={`${anton.variable} ${barlow.variable} bg-tl-black text-tl-white font-sans`}>
        <CartProvider>{children}</CartProvider>
      </body>
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` — expect no errors.
Run: `npm run dev` — expect the app still loads with no console errors (context has
no consumers yet, that's fine).

- [ ] **Step 4: Commit**

```bash
git add src/context/CartContext.tsx src/app/layout.tsx
git commit -m "Add CartContext with localStorage persistence"
```

---

### Task 4: WhatsApp order message utility

**Files:**
- Create: `src/lib/whatsapp.ts`

**Interfaces:**
- Consumes: `CartLine` type from `src/context/CartContext.tsx` (Task 3).
- Produces:
  ```ts
  export const SELLER_WHATSAPP_NUMBER = "584144854795";
  export function buildOrderMessage(lines: CartLine[], subtotal: number, customerName?: string): string;
  export function buildWhatsAppUrl(message: string): string;
  ```

- [ ] **Step 1: Write the utility**

```ts
// src/lib/whatsapp.ts
import type { CartLine } from "@/context/CartContext";

export const SELLER_WHATSAPP_NUMBER = "584144854795";

export function buildOrderMessage(
  lines: CartLine[],
  subtotal: number,
  customerName?: string
): string {
  const header = customerName
    ? `Hola, soy ${customerName}. Quiero hacer este pedido en TOTAL LOOKS:`
    : "Hola, quiero hacer este pedido en TOTAL LOOKS:";

  const items = lines
    .map((l) => {
      const lineTotal = (l.product.price * l.qty).toFixed(2);
      return `• ${l.product.name} (${l.color}, talla ${l.size}) x${l.qty} — $${lineTotal}`;
    })
    .join("\n");

  return `${header}\n\n${items}\n\nTotal: $${subtotal.toFixed(2)}`;
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${SELLER_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit` — expect no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/whatsapp.ts
git commit -m "Add WhatsApp order message builder"
```

---

### Task 5: Header + CartDrawer + CheckoutPanel

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/CartDrawer.tsx`
- Create: `src/components/CheckoutPanel.tsx`
- Modify: `src/app/layout.tsx` (render `<Header />` and `<CartDrawer />`)

**Interfaces:**
- Consumes: `useCart()` (Task 3), `buildOrderMessage`/`buildWhatsAppUrl` (Task 4),
  `categoryLabels` (Task 2).
- Produces: `<Header />`, `<CartDrawer />` (no props — both read from `useCart()`).

- [ ] **Step 1: Write the Header**

```tsx
// src/components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { categoryLabels } from "@/data/products";

export default function Header() {
  const { itemCount, open } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-tl-black/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="shrink-0">
          <Image src="/logo.svg" alt="TOTAL LOOKS" width={140} height={40} priority />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold uppercase tracking-wide sm:flex">
          <Link href="/catalogo?categoria=hombre" className="hover:text-tl-red">
            {categoryLabels.hombre}
          </Link>
          <Link href="/catalogo?categoria=mujer" className="hover:text-tl-red">
            {categoryLabels.mujer}
          </Link>
          <Link href="/catalogo?categoria=zapatos-dama" className="hover:text-tl-red">
            Zapatos
          </Link>
          <Link href="/catalogo" className="hover:text-tl-red">
            Todo
          </Link>
        </nav>

        <button
          type="button"
          onClick={open}
          aria-label="Abrir carrito"
          className="relative rounded-full border border-white/20 px-4 py-2 text-sm font-semibold uppercase tracking-wide hover:border-tl-red hover:text-tl-red"
        >
          Carrito
          {itemCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-tl-red text-xs font-bold text-tl-white">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Write the CartDrawer (renders CheckoutPanel inline)**

```tsx
// src/components/CartDrawer.tsx
"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import CheckoutPanel from "./CheckoutPanel";

export default function CartDrawer() {
  const { isOpen, close, lines, removeItem, updateQty, subtotal } = useCart();

  return (
    <div
      className={`fixed inset-0 z-50 transition ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={close}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md transform bg-tl-surface transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"} flex flex-col`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="font-display text-xl uppercase">Tu Carrito</h2>
          <button type="button" onClick={close} aria-label="Cerrar carrito" className="text-2xl leading-none">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <p className="text-tl-grey">Tu carrito está vacío. Agregá algo del catálogo.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {lines.map((l) => (
                <li key={l.lineId} className="flex gap-3 border-b border-white/10 pb-4">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded bg-tl-black">
                    <Image src={l.product.images[0]} alt={l.product.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="font-semibold">{l.product.name}</p>
                    <p className="text-sm text-tl-grey">
                      {l.color} · Talla {l.size}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQty(l.lineId, l.qty - 1)}
                        className="h-6 w-6 rounded border border-white/20 hover:border-tl-red"
                        aria-label="Restar cantidad"
                      >
                        −
                      </button>
                      <span className="w-6 text-center">{l.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(l.lineId, l.qty + 1)}
                        className="h-6 w-6 rounded border border-white/20 hover:border-tl-red"
                        aria-label="Sumar cantidad"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(l.lineId)}
                        className="ml-auto text-xs uppercase text-tl-grey hover:text-tl-red"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                  <p className="whitespace-nowrap font-semibold">
                    ${(l.product.price * l.qty).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <CheckoutPanel lines={lines} subtotal={subtotal} />
      </aside>
    </div>
  );
}
```

- [ ] **Step 3: Write the CheckoutPanel**

```tsx
// src/components/CheckoutPanel.tsx
"use client";

import { useState } from "react";
import type { CartLine } from "@/context/CartContext";
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export default function CheckoutPanel({
  lines,
  subtotal,
}: {
  lines: CartLine[];
  subtotal: number;
}) {
  const [name, setName] = useState("");
  const isEmpty = lines.length === 0;

  const handleCheckout = () => {
    const message = buildOrderMessage(lines, subtotal, name.trim() || undefined);
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="border-t border-white/10 px-5 py-4">
      <label htmlFor="checkout-name" className="mb-1 block text-xs uppercase tracking-wide text-tl-grey">
        Tu nombre (opcional)
      </label>
      <input
        id="checkout-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ej: María Pérez"
        className="mb-4 w-full rounded border border-white/20 bg-tl-black px-3 py-2 text-sm outline-none focus:border-tl-red"
      />

      <div className="mb-4 flex items-center justify-between font-display text-lg uppercase">
        <span>Total</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <button
        type="button"
        onClick={handleCheckout}
        disabled={isEmpty}
        className="w-full rounded-full bg-tl-red py-3 text-center font-semibold uppercase tracking-wide text-tl-white transition hover:bg-tl-red-dark disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-tl-grey"
      >
        Finalizar pedido por WhatsApp
      </button>
    </div>
  );
}
```

- [ ] **Step 4: Render Header and CartDrawer in the root layout**

Edit `src/app/layout.tsx`:

```tsx
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
// ...
        <CartProvider>
          <Header />
          {children}
          <CartDrawer />
        </CartProvider>
```

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit` — expect no errors.
Run: `npm run dev` — open the app, click "Carrito", confirm the drawer slides in from
the right with the empty-cart message, and closes on the × button and on backdrop
click.

- [ ] **Step 6: Commit**

```bash
git add src/components/Header.tsx src/components/CartDrawer.tsx src/components/CheckoutPanel.tsx src/app/layout.tsx
git commit -m "Add Header, CartDrawer, and WhatsApp CheckoutPanel"
```

---

### Task 6: Home page (hero + category shortcuts + featured products)

**Files:**
- Create: `src/components/Hero.tsx`
- Create: `src/components/ProductCard.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `products`, `categoryLabels`, `Category` (Task 2), `useCart` (Task 3).
- Produces: `<ProductCard product={Product} />` — reused by Task 7 and Task 8.

- [ ] **Step 1: Write ProductCard (shared component)**

```tsx
// src/components/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-white/10 bg-tl-surface transition hover:border-tl-red"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-tl-black">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, 25vw"
        />
        <span className="absolute left-2 top-2 rounded bg-tl-black/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-tl-grey">
          {product.brand}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="font-semibold leading-tight">{product.name}</h3>
        <p className="mt-auto font-display text-lg text-tl-red">${product.price}</p>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Write the Hero**

```tsx
// src/components/Hero.tsx
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-tl-black px-4 py-16 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "repeating-linear-gradient(115deg, transparent 0 40px, rgba(227,28,35,0.35) 40px 46px, transparent 46px 140px)",
        }}
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6">
        <span className="rounded-full border border-tl-red px-4 py-1 text-xs font-semibold uppercase tracking-widest text-tl-red">
          Total Boost · Hasta 60% OFF
        </span>
        <h1 className="font-display text-5xl uppercase leading-[0.95] sm:text-7xl">
          Tu look sube.
          <br />
          <span className="text-tl-red">Los precios bajan.</span>
        </h1>
        <p className="max-w-md text-tl-grey">
          Ropa deportiva y calzado para hombre y mujer. Nuevas rebajas cada 15 días.
        </p>
        <Link
          href="/catalogo"
          className="rounded-full bg-tl-red px-8 py-3 font-semibold uppercase tracking-wide transition hover:bg-tl-red-dark"
        >
          Ver catálogo
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Write the home page**

```tsx
// src/app/page.tsx
import Link from "next/link";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { products, categoryLabels, type Category } from "@/data/products";

const shortcuts: { category: Category; label: string }[] = [
  { category: "hombre", label: categoryLabels.hombre },
  { category: "mujer", label: categoryLabels.mujer },
  { category: "zapatos-dama", label: "Zapatos Dama" },
  { category: "zapatos-caballero", label: "Zapatos Caballero" },
];

export default function HomePage() {
  const featured = products.slice(0, 8);

  return (
    <main>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {shortcuts.map((s) => (
            <Link
              key={s.category}
              href={`/catalogo?categoria=${s.category}`}
              className="rounded-lg border border-white/10 bg-tl-surface px-4 py-6 text-center font-semibold uppercase tracking-wide hover:border-tl-red hover:text-tl-red"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="mb-4 font-display text-2xl uppercase">Destacados</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit` — expect no errors.
Run: `npm run dev`, open `/` — expect the hero, four category shortcuts, and an 8-item
featured grid, all images loading (no broken-image icons).

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.tsx src/components/ProductCard.tsx src/app/page.tsx
git commit -m "Add home page with hero and featured products"
```

---

### Task 7: Catalog page with filters

**Files:**
- Create: `src/components/FilterBar.tsx`
- Create: `src/app/catalogo/page.tsx`

**Interfaces:**
- Consumes: `products`, `categoryLabels`, `Category` (Task 2), `ProductCard` (Task 6).
- Produces: `<FilterBar />` is a self-contained client component owning its own
  filter state and rendering the filtered grid itself (simplest correct shape for
  this scope — no prop-drilling between a separate page shell and the filter state).

- [ ] **Step 1: Write FilterBar (owns filter state + renders the grid)**

```tsx
// src/components/FilterBar.tsx
"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import { products, categoryLabels, type Category } from "@/data/products";

const allCategories = Object.keys(categoryLabels) as Category[];

export default function FilterBar() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categoria") as Category | null;

  const [category, setCategory] = useState<Category | "todas">(
    initialCategory && allCategories.includes(initialCategory) ? initialCategory : "todas"
  );
  const [brand, setBrand] = useState<string>("todas");
  const [size, setSize] = useState<string>("todas");
  const [color, setColor] = useState<string>("todos");

  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))).sort(),
    []
  );
  const sizes = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.sizes))).sort(),
    []
  );
  const colors = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.colors))).sort(),
    []
  );

  const filtered = products.filter((p) => {
    if (category !== "todas" && p.category !== category) return false;
    if (brand !== "todas" && p.brand !== brand) return false;
    if (size !== "todas" && !p.sizes.includes(size)) return false;
    if (color !== "todos" && !p.colors.includes(color)) return false;
    return true;
  });

  const clearFilters = () => {
    setCategory("todas");
    setBrand("todas");
    setSize("todas");
    setColor("todos");
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category | "todas")}
          className="rounded border border-white/20 bg-tl-surface px-3 py-2 text-sm"
        >
          <option value="todas">Todas las categorías</option>
          {allCategories.map((c) => (
            <option key={c} value={c}>
              {categoryLabels[c]}
            </option>
          ))}
        </select>

        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="rounded border border-white/20 bg-tl-surface px-3 py-2 text-sm"
        >
          <option value="todas">Todas las marcas</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="rounded border border-white/20 bg-tl-surface px-3 py-2 text-sm"
        >
          <option value="todas">Todas las tallas</option>
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="rounded border border-white/20 bg-tl-surface px-3 py-2 text-sm"
        >
          <option value="todos">Todos los colores</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {(category !== "todas" || brand !== "todas" || size !== "todas" || color !== "todos") && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-semibold uppercase tracking-wide text-tl-red"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="text-tl-grey">
          No hay productos que coincidan con estos filtros.{" "}
          <button type="button" onClick={clearFilters} className="text-tl-red underline">
            Limpiar filtros
          </button>
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Write the catalog page**

`useSearchParams` requires a Suspense boundary in the App Router — wrap `FilterBar`:

```tsx
// src/app/catalogo/page.tsx
import { Suspense } from "react";
import FilterBar from "@/components/FilterBar";

export default function CatalogoPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 font-display text-3xl uppercase">Catálogo</h1>
      <Suspense fallback={<p className="text-tl-grey">Cargando...</p>}>
        <FilterBar />
      </Suspense>
    </main>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` — expect no errors.
Run: `npm run dev`, open `/catalogo` — expect all 20 products; open
`/catalogo?categoria=zapatos-dama` (as linked from the home page shortcuts) — expect
only that category pre-selected in the dropdown and grid filtered. Change each filter
dropdown and confirm the grid updates; select a combination with no matches and
confirm the empty state appears with a working "Limpiar filtros".

- [ ] **Step 4: Commit**

```bash
git add src/components/FilterBar.tsx src/app/catalogo/page.tsx
git commit -m "Add catalog page with category/brand/size/color filters"
```

---

### Task 8: Product detail page

**Files:**
- Create: `src/app/producto/[slug]/page.tsx`
- Create: `src/components/AddToCartForm.tsx`

**Interfaces:**
- Consumes: `products` (Task 2), `useCart` (Task 3).
- Produces: nothing consumed by later tasks (leaf page).

- [ ] **Step 1: Write AddToCartForm (client component: size/color pick + add)**

```tsx
// src/components/AddToCartForm.tsx
"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

export default function AddToCartForm({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-1 text-xs uppercase tracking-wide text-tl-grey">Talla</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`rounded border px-3 py-1 text-sm ${
                size === s ? "border-tl-red bg-tl-red text-tl-white" : "border-white/20 hover:border-tl-red"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-1 text-xs uppercase tracking-wide text-tl-grey">Color</p>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`rounded border px-3 py-1 text-sm ${
                color === c ? "border-tl-red bg-tl-red text-tl-white" : "border-white/20 hover:border-tl-red"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="h-8 w-8 rounded border border-white/20 hover:border-tl-red"
        >
          −
        </button>
        <span className="w-6 text-center">{qty}</span>
        <button
          type="button"
          onClick={() => setQty((q) => q + 1)}
          className="h-8 w-8 rounded border border-white/20 hover:border-tl-red"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={() => addItem(product, size, color, qty)}
        className="rounded-full bg-tl-red py-3 font-semibold uppercase tracking-wide hover:bg-tl-red-dark"
      >
        Agregar al carrito
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Write the product detail page**

```tsx
// src/app/producto/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import AddToCartForm from "@/components/AddToCartForm";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-tl-surface">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-tl-grey">{product.brand}</p>
          <h1 className="font-display text-3xl uppercase">{product.name}</h1>
          <p className="font-display text-2xl text-tl-red">${product.price}</p>
          <p className="text-tl-grey">{product.description}</p>
          <AddToCartForm product={product} />
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` — expect no errors.
Run: `npm run dev`, click into a product from the catalog — expect image, name,
price, description, size/color pickers, and quantity stepper. Pick a size and color,
click "Agregar al carrito", open the cart drawer — expect the line item to appear
with the chosen size/color and correct subtotal. Visit `/producto/does-not-exist` —
expect Next.js's 404 page.

- [ ] **Step 4: Commit**

```bash
git add src/app/producto src/components/AddToCartForm.tsx
git commit -m "Add product detail page with size/color selection"
```

---

### Task 9: Footer, Netlify deploy config, full manual QA

**Files:**
- Create: `src/components/Footer.tsx`
- Modify: `src/app/page.tsx` and `src/app/catalogo/page.tsx` and
  `src/app/producto/[slug]/page.tsx` (render `<Footer />`)
- Create: `netlify.toml`

**Interfaces:**
- Consumes: none new.
- Produces: nothing consumed elsewhere (last task).

- [ ] **Step 1: Write the Footer**

```tsx
// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-tl-grey">
      <p>TOTAL LOOKS — Tu look sube, los precios bajan.</p>
      <p className="mt-1">Pedidos por WhatsApp · Demo de catálogo</p>
    </footer>
  );
}
```

Add `import Footer from "@/components/Footer";` and `<Footer />` right before the
closing tag of `<main>` in each of the three pages (`src/app/page.tsx`,
`src/app/catalogo/page.tsx`, `src/app/producto/[slug]/page.tsx`) — or, simpler and
DRY, move `<Footer />` into `src/app/layout.tsx` right after `{children}` and before
`<CartDrawer />` instead of touching three files. Prefer the layout change.

- [ ] **Step 2: Add Netlify config**

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

- [ ] **Step 3: Verify — full manual QA pass**

Run: `npx tsc --noEmit` — expect no errors.
Run: `npm run build` — expect a successful production build with no errors.
Run: `npm run dev` and manually walk through, per
superpowers:verification-before-completion:
1. Home loads, hero renders, category shortcuts link to filtered catalog views.
2. Catalog: each filter (categoría, marca, talla, color) narrows results correctly;
   clearing filters restores all 20 products.
3. Product detail: size/color selection works, add-to-cart opens the drawer with the
   correct line.
4. Cart: quantity +/− and remove work; subtotal recalculates correctly.
5. Checkout: clicking "Finalizar pedido por WhatsApp" with a non-empty cart opens
   `wa.me/584144854795` in a new tab with a pre-filled message listing every line item
   and the correct total.
6. Refresh the page with items in the cart — cart contents survive (localStorage).
7. Resize the browser to ~375px wide — no horizontal scroll, filters and grid stack
   sensibly.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add footer, Netlify config, and complete manual QA pass"
```

---

## Final Handoff

After Task 9 passes QA, the demo is ready to push to a GitHub repo and connect to
Netlify (or `netlify deploy --prod` via the Netlify CLI) to get a public link to send
the client ahead of the pitch.
