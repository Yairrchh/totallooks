import { Suspense } from "react";
import FilterBar from "@/components/FilterBar";
import BrandBackground from "@/components/BrandBackground";

export default function CatalogoPage() {
  return (
    <>
      <div className="relative overflow-hidden border-b border-white/10 bg-tl-black px-4 py-12">
        <BrandBackground variant="full" />
        <h1 className="relative mx-auto max-w-6xl font-display text-3xl uppercase">Catálogo</h1>
      </div>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <Suspense fallback={<p className="text-tl-grey">Cargando...</p>}>
          <FilterBar />
        </Suspense>
      </main>
    </>
  );
}
