import type { Metadata } from "next";
import FavoritesList from "@/components/FavoritesList";

export const metadata: Metadata = {
  title: "Favoritos — TOTAL LOOKS",
  description: "Los productos que guardaste para comprar más adelante.",
};

export default function FavoritosPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-xl font-medium uppercase tracking-[0.2em] sm:text-2xl">Favoritos</h1>
      <FavoritesList />
    </main>
  );
}
