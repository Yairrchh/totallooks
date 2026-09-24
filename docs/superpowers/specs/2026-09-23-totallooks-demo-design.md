# TOTAL LOOKS — Demo E-commerce — Design Spec

Date: 2026-09-23

## Context

Cold-sale opportunity: a sportswear store (TOTAL LOOKS, ropa deportiva hombre/mujer +
zapatos) is already in talks with another developer for an e-commerce build. Goal is a
working demo, built as a real Next.js project (not a throwaway mockup), to win the
client over on both design quality and speed of delivery. Timeline: 1-2 days.

## Brand identity

- Name: TOTAL LOOKS. Logo provided (`totallooks-logo-sin-fondo.svg`, transparent bg).
- Visual style (from client's own Instagram promo): black background, aggressive
  diagonal red streak motifs, bold condensed display type, high-contrast red/white on
  black, promo badges ("TOTAL BOOST", "HASTA 60% OFF").
- No real product photos available yet. Client's own PDFs are not practically
  extractable. Decision: use generic sportswear stock photos (Unsplash) to simulate the
  real catalog experience for the pitch — understood tradeoff: not their actual
  inventory, swapped later.

## Scope (this iteration)

Full demo: home (campaign hero), catalog with filters, product detail page, cart
drawer, WhatsApp checkout. No real backend, no payment gateway, no admin panel — those
are out of scope for the pitch demo.

## Architecture

- Next.js 14, App Router, TypeScript, Tailwind CSS.
- Routes:
  - `/` — home, campaign hero + category shortcuts + featured products.
  - `/catalogo` — full grid with `FilterBar` (categoría, talla, color, marca).
  - `/producto/[slug]` — product detail (gallery, size/color selection, add to cart).
- Cart is a global slide-over drawer (not a route), reachable from the header on every
  page via `CartProvider` in the root layout.
- No backend/API routes. No test suite (see Testing).

## Data model

`src/data/products.ts` — static typed array, no external CMS/API:

```ts
type Product = {
  id: string;
  slug: string;
  name: string;
  category: "hombre" | "mujer" | "zapatos-dama" | "zapatos-caballero";
  brand: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: string[]; // Unsplash URLs
  description: string;
};
```

~20 products spread across the four categories, enough to make filters meaningful.

## State management

- `CartContext` (React Context + `useReducer` or `useState`), provided at root layout.
- Actions: `addItem(product, size, color, qty)`, `removeItem(lineId)`,
  `updateQty(lineId, qty)`, derived `subtotal`, `itemCount`.
- Persisted to `localStorage` on every change; hydrated on mount behind an
  `isMounted` guard to avoid SSR/client hydration mismatches. Every localStorage
  read/write wrapped in try/catch (private browsing can throw or no-op).
- Filters (`FilterBar`) use local component state — no URL query params in this
  iteration (YAGNI: shareable filtered URLs aren't needed for a live pitch demo).

## Checkout → WhatsApp

`CheckoutPanel` (inside the cart drawer) collects optional name/phone, builds a
plain-text order summary (product, talla, color, cantidad, subtotal por línea, total),
URL-encodes it, and opens:

```
https://wa.me/584144854795?text=<encoded message>
```

in a new tab. Number is the seller's own (for the live pitch, replies land on their
phone), stored as a single constant for easy swap to the client's real number later.

## Edge cases

- Empty cart → checkout button disabled, empty-state message in drawer.
- No products match active filters → empty-state message in grid, "limpiar filtros"
  action.
- `next/image` remote patterns configured for Unsplash; broken image falls back to
  `next/image`'s default broken-image handling (no custom fallback needed at this
  scope).
- `localStorage` unavailable → cart still works in-memory for the session, no crash.

## Testing

No automated test suite for this iteration — deliberate scope cut given the 1-2 day
pitch-demo timeline (YAGNI). Verification is manual: run `npm run dev`, click through
add-to-cart, filters, product detail, and the full WhatsApp checkout flow before
handing over the link, per superpowers:verification-before-completion.

## Deploy

Netlify (client preference). Static/SSR-compatible Next.js build; no environment
secrets needed since there's no backend.

## Out of scope (explicitly)

- Real payment gateway / checkout beyond WhatsApp handoff.
- Admin panel / product management UI.
- Real product photography or the client's actual inventory.
- Automated tests.
- Accounts/auth, wishlists, reviews.
