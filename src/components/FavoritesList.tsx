"use client";

import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

export default function FavoritesList() {
  const { ids } = useFavorites();
  const favorites = products.filter((p) => ids.includes(p.id));

  if (favorites.length === 0) {
    return (
      <div className="flex animate-fade-up flex-col items-start gap-4">
        <p className="text-tl-grey">Aún no tenés favoritos.</p>
        <Link
          href="/catalogo"
          className="rounded-full bg-tl-red px-6 py-2.5 text-sm font-semibold uppercase tracking-wide transition hover:bg-tl-red-dark"
        >
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {favorites.map((p, i) => (
        <Reveal key={p.id} delay={(i % 8) * 60}>
          <ProductCard product={p} />
        </Reveal>
      ))}
    </div>
  );
}
