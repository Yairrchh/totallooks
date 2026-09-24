import Image from "next/image";
import Link from "next/link";
import { categoryLabels, type Category } from "@/data/products";
import { SELLER_WHATSAPP_NUMBER } from "@/lib/whatsapp";

const footerCategories: Category[] = ["zapatos", "ropa", "perfumes", "accesorios"];

const contactMessage = encodeURIComponent(
  "Hola, quiero más información sobre TOTAL LOOKS."
);

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-tl-black px-4 py-12">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3">
        <div className="flex flex-col gap-3">
          <Image src="/logo.svg" alt="TOTAL LOOKS" width={130} height={38} className="h-9 w-auto" />
          <p className="max-w-xs text-sm text-tl-grey">
            Ropa deportiva y calzado para hombre y mujer. Tu look sube, los precios bajan.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-tl-white">
            Categorías
          </h3>
          <nav className="flex flex-col gap-2 text-sm text-tl-grey">
            {footerCategories.map((c) => (
              <Link
                key={c}
                href={`/catalogo?categoria=${c}`}
                className="w-fit hover:text-tl-red"
              >
                {categoryLabels[c]}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-tl-white">
            Contacto
          </h3>
          <p className="text-sm text-tl-grey">
            Pedidos y consultas por WhatsApp — te respondemos directo.
          </p>
          <a
            href={`https://wa.me/${SELLER_WHATSAPP_NUMBER}?text=${contactMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit rounded-full bg-tl-red px-5 py-2 text-sm font-semibold uppercase tracking-wide transition hover:bg-tl-red-dark"
          >
            Escribinos
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-xs text-tl-grey">
        © {new Date().getFullYear()} TOTAL LOOKS. Todos los derechos reservados.
      </div>
    </footer>
  );
}
