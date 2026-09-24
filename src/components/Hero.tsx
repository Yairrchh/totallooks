import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-tl-black px-4 py-16 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "repeating-linear-gradient(115deg, transparent 0 40px, rgba(227,28,35,0.35) 40px 46px, transparent 46px 140px)",
        }}
      />
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
