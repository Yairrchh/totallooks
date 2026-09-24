import Link from "next/link";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { products, categoryLabels, type Category } from "@/data/products";

const shortcuts: { category: Category; label: string }[] = [
  { category: "hombre", label: categoryLabels.hombre },
  { category: "mujer", label: categoryLabels.mujer },
  { category: "zapatos-dama", label: "Zapatos Dama" },
  { category: "zapatos-caballero", label: "Zapatos Caballero" },
];

export default function HomePage() {
  const featured = products.slice(0, 8);

  return (
    <main>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {shortcuts.map((s) => (
            <Link
              key={s.category}
              href={`/catalogo?categoria=${s.category}`}
              className="rounded-lg border border-white/10 bg-tl-surface px-4 py-6 text-center font-semibold uppercase tracking-wide hover:border-tl-red hover:text-tl-red"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="mb-4 font-display text-2xl uppercase">Destacados</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
