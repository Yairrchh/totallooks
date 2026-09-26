import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { products, categoryLabels, type Category } from "@/data/products";

const shortcuts: { category: Category; label: string; image: string }[] = [
  {
    category: "zapatos",
    label: categoryLabels.zapatos,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
  },
  {
    category: "ropa",
    label: categoryLabels.ropa,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80",
  },
  {
    category: "perfumes",
    label: categoryLabels.perfumes,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80",
  },
  {
    category: "accesorios",
    label: categoryLabels.accesorios,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
  },
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
                className="group relative block h-24 overflow-hidden rounded-lg border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-tl-red hover:shadow-lg hover:shadow-tl-red/10 active:translate-y-0 active:scale-95"
              >
                <Image
                  src={s.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
                <span className="absolute inset-0 flex items-center justify-center text-center font-semibold uppercase tracking-wide text-tl-white transition-colors group-hover:text-tl-red">
                  {s.label}
                </span>
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
