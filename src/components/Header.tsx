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
          aria-label={`Abrir carrito${itemCount > 0 ? ` (${itemCount} producto${itemCount === 1 ? "" : "s"})` : ""}`}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 hover:border-tl-red hover:text-tl-red"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.5 2.5h2l2.6 12.6a2 2 0 0 0 2 1.6h8.1a2 2 0 0 0 2-1.6L21 6.5H6" />
          </svg>
          {itemCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-tl-red text-xs font-bold text-tl-white">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
