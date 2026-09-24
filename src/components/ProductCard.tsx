"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { effectivePrice } from "@/lib/pricing";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const hasDiscount = Boolean(product.discountPercent);
  const price = effectivePrice(product);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[0], product.colors[0], 1);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-white/10 bg-tl-surface transition hover:border-tl-red">
      <Link
        href={`/producto/${product.slug}`}
        aria-label={product.name}
        className="absolute inset-0 z-10"
      />

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
        {hasDiscount && (
          <span className="absolute right-2 top-2 rounded bg-tl-red px-2 py-1 text-xs font-bold text-tl-white">
            -{product.discountPercent}%
          </span>
        )}

        <button
          type="button"
          onClick={handleQuickAdd}
          aria-label={`Agregar ${product.name} al carrito`}
          className="absolute bottom-2 right-2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-tl-red text-tl-white shadow-lg shadow-black/40 transition hover:bg-tl-red-dark"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="font-semibold leading-tight">{product.name}</h3>
        <div className="mt-auto flex items-baseline gap-2">
          <p className="font-display text-lg text-tl-red">${price}</p>
          {hasDiscount && (
            <p className="text-sm text-tl-grey line-through">${product.price}</p>
          )}
        </div>
      </div>
    </div>
  );
}
