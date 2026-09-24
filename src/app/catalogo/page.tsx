import type { Metadata } from "next";
import { Suspense } from "react";
import FilterBar from "@/components/FilterBar";

export const metadata: Metadata = {
  title: "Catálogo — TOTAL LOOKS",
  description: "Ropa deportiva, calzado, perfumes y accesorios para hombre y mujer.",
};

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
