import { Suspense } from "react";
import FilterBar from "@/components/FilterBar";
import BrandBackground from "@/components/BrandBackground";

export default function CatalogoPage() {
  return (
    <div className="relative overflow-hidden">
      <BrandBackground variant="subtle" />
      <main className="relative mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-6 font-display text-3xl uppercase">Catálogo</h1>
        <Suspense fallback={<p className="text-tl-grey">Cargando...</p>}>
          <FilterBar />
        </Suspense>
      </main>
    </div>
  );
}
