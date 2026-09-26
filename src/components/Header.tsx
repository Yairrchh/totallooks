"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { categoryLabels } from "@/data/products";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group relative py-1 hover:text-tl-red">
      {children}
      <span className="absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left scale-x-0 bg-tl-red transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </Link>
  );
}

export default function Header() {
  const router = useRouter();
  const { itemCount, open } = useCart();
  const { count: favCount } = useFavorites();
  const [searchValue, setSearchValue] = useState("");
  const [pop, setPop] = useState(false);
  const prevCount = useRef(itemCount);
  const [favPop, setFavPop] = useState(false);
  const prevFavCount = useRef(favCount);

  useEffect(() => {
    if (itemCount !== prevCount.current) {
      setPop(true);
      prevCount.current = itemCount;
      const t = setTimeout(() => setPop(false), 350);
      return () => clearTimeout(t);
    }
  }, [itemCount]);

  useEffect(() => {
    if (favCount !== prevFavCount.current) {
      setFavPop(true);
      prevFavCount.current = favCount;
      const t = setTimeout(() => setFavPop(false), 350);
      return () => clearTimeout(t);
    }
  }, [favCount]);

  return (
    <header className="sticky top-0 z-40 animate-fade-up border-b border-white/10 bg-tl-black/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="shrink-0 transition-transform hover:scale-105">
          <Image
            src="/logo.svg"
            alt="TOTAL LOOKS"
            width={92}
            height={40}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold uppercase tracking-wide sm:flex">
          <NavLink href="/catalogo?categoria=zapatos">{categoryLabels.zapatos}</NavLink>
          <NavLink href="/catalogo?categoria=ropa">{categoryLabels.ropa}</NavLink>
          <NavLink href="/catalogo?categoria=perfumes">{categoryLabels.perfumes}</NavLink>
          <NavLink href="/catalogo?categoria=accesorios">{categoryLabels.accesorios}</NavLink>
          <NavLink href="/catalogo">Todo</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const q = searchValue.trim();
              router.push(q ? `/catalogo?q=${encodeURIComponent(q)}` : "/catalogo");
            }}
            className="relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-tl-grey"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Buscar..."
              aria-label="Buscar productos"
              className="w-24 rounded-full border border-white/20 bg-transparent py-1.5 pl-8 pr-3 text-sm outline-none transition-all duration-200 focus:w-36 focus:border-tl-red sm:w-32 sm:focus:w-48"
            />
          </form>

          <Link
            href="/favoritos"
            aria-label={`Ver favoritos${favCount > 0 ? ` (${favCount} producto${favCount === 1 ? "" : "s"})` : ""}`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-tl-red hover:text-tl-red active:scale-90"
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
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
            </svg>
            {favCount > 0 && (
              <span
                className={`absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-tl-red text-xs font-bold text-tl-white ${favPop ? "animate-pop" : ""}`}
              >
                {favCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={open}
            aria-label={`Abrir carrito${itemCount > 0 ? ` (${itemCount} producto${itemCount === 1 ? "" : "s"})` : ""}`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-tl-red hover:text-tl-red active:scale-90"
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
              <span
                className={`absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-tl-red text-xs font-bold text-tl-white ${pop ? "animate-pop" : ""}`}
              >
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
