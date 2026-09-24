import Link from "next/link";
import BrandBackground from "./BrandBackground";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-tl-black px-4 py-16 sm:py-24">
      <BrandBackground variant="full" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6">
        <span className="rounded-full border border-tl-red px-4 py-1 text-xs font-semibold uppercase tracking-widest text-tl-red">
          Total Boost · Hasta 60% OFF
        </span>
        <h1 className="font-display text-5xl uppercase leading-[0.95] sm:text-7xl">
          Tu look sube.
          <br />
          <span className="text-tl-red">Los precios bajan.</span>
        </h1>
        <p className="max-w-md text-tl-grey">
          Ropa deportiva y calzado para hombre y mujer. Nuevas rebajas cada 15 días.
        </p>
        <Link
          href="/catalogo"
          className="rounded-full bg-tl-red px-8 py-3 font-semibold uppercase tracking-wide transition hover:bg-tl-red-dark"
        >
          Ver catálogo
        </Link>
      </div>
    </section>
  );
}
