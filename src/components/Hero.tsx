import Image from "next/image";
import Link from "next/link";
import BrandBackground from "./BrandBackground";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-tl-black px-4 py-16 sm:py-24">
      <BrandBackground variant="mobileHero" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 sm:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
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

        <div className="relative mx-auto hidden aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50 sm:block">
          <Image
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&q=80"
            alt="Tenis Runner Pro Nike"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 0px, 384px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
