import Link from "next/link";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { products, categoryLabels, type Category } from "@/data/products";

const shortcuts: { category: Category; label: string }[] = [
  { category: "zapatos", label: categoryLabels.zapatos },
  { category: "ropa", label: categoryLabels.ropa },
  { category: "perfumes", label: categoryLabels.perfumes },
  { category: "accesorios", label: categoryLabels.accesorios },
];

export default function HomePage() {
  const featured = products.slice(0, 8);

  return (
    <main>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {shortcuts.map((s, i) => (
            <Reveal key={s.category} variant="scale-in" delay={i * 80}>
              <Link
                href={`/catalogo?categoria=${s.category}`}
                className="block rounded-lg border border-white/10 bg-tl-surface px-4 py-6 text-center font-semibold uppercase tracking-wide transition-all duration-300 hover:-translate-y-1 hover:border-tl-red hover:text-tl-red hover:shadow-lg hover:shadow-tl-red/10 active:translate-y-0 active:scale-95"
              >
                {s.label}
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <Reveal>
          <h2 className="mb-4 font-display text-2xl uppercase">Destacados</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
