import Image from "next/image";
import Link from "next/link";
import BrandBackground from "./BrandBackground";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-tl-black px-4 py-16 sm:py-14">
      <BrandBackground variant="mobileHero" />
      <BrandBackground variant="desktopHero" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 sm:items-start sm:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <span
            className="order-4 animate-fade-up rounded-full border border-tl-red px-4 py-1 text-xs font-semibold uppercase tracking-widest text-tl-red sm:order-none"
            style={{ animationDelay: "0ms" }}
          >
            Total Boost · Hasta 60% OFF
          </span>
          <h1 className="font-display text-5xl uppercase leading-[0.95] sm:text-7xl">
            <span
              className="block animate-slide-in-left"
              style={{ animationDelay: "120ms" }}
            >
              Tu look sube.
            </span>
            <span
              className="block animate-slide-in-right text-tl-red"
              style={{ animationDelay: "220ms" }}
            >
              Los precios bajan.
            </span>
          </h1>
          <p
            className="max-w-md animate-fade-up text-tl-grey"
            style={{ animationDelay: "240ms" }}
          >
            Ropa deportiva y calzado para hombre y mujer. Nuevas rebajas cada 15 días.
          </p>
          <Link
            href="/catalogo"
            className="animate-fade-up rounded-full bg-tl-red px-8 py-3 font-semibold uppercase tracking-wide transition duration-300 hover:scale-105 hover:bg-tl-red-dark active:scale-95"
            style={{ animationDelay: "360ms" }}
          >
            Ver catálogo
          </Link>
        </div>

        <div
          className="relative mx-auto hidden aspect-[3/4] w-full max-w-xs animate-slide-in-right overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50 transition-transform duration-500 hover:scale-[1.02] sm:block"
          style={{ animationDelay: "180ms" }}
        >
          <Image
            src="/hero-runner.jpg"
            alt="Modelo con conjunto deportivo negro y rojo en movimiento"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 0px, 320px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
