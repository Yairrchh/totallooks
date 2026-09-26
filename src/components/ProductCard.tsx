"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/data/products";
import { effectivePrice } from "@/lib/pricing";
import { useCart } from "@/context/CartContext";
import FavoriteButton from "./FavoriteButton";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const hasDiscount = Boolean(product.discountPercent);
  const price = effectivePrice(product);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[0], product.colors[0], 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 350);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-white/10 bg-tl-surface transition-all duration-300 hover:-translate-y-1 hover:border-tl-red hover:shadow-xl hover:shadow-black/40">
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
        <div className="absolute right-2 top-2 z-20 flex flex-col items-end gap-1.5">
          <FavoriteButton
            productId={product.id}
            productName={product.name}
            className="h-7 w-7 sm:h-8 sm:w-8"
          />
          {hasDiscount && (
            <span className="rounded bg-tl-red px-2 py-1 text-xs font-bold text-tl-white">
              -{product.discountPercent}%
            </span>
          )}
        </div>
      </div>

      <div className="relative flex flex-1 flex-col gap-1 p-3 pr-10 sm:pr-12">
        <h3 className="font-semibold leading-tight">{product.name}</h3>
        <div className="mt-auto flex items-baseline gap-2">
          <p className="font-display text-lg text-tl-red">${price}</p>
          {hasDiscount && (
            <p className="text-sm text-tl-grey line-through">${product.price}</p>
          )}
        </div>

        <button
          type="button"
          onClick={handleQuickAdd}
          aria-label={`Agregar ${product.name} al carrito`}
          className={`absolute bottom-2 right-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-tl-white text-tl-black shadow-lg shadow-black/40 transition duration-200 hover:scale-110 hover:bg-tl-grey active:scale-90 sm:h-9 sm:w-9 ${justAdded ? "animate-pop" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5 sm:h-4 sm:w-4"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
    </div>
  );
}
