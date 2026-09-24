import Image from "next/image";
import Link from "next/link";
import { categoryLabels, type Category } from "@/data/products";
import { SELLER_WHATSAPP_NUMBER } from "@/lib/whatsapp";

const footerCategories: Category[] = ["zapatos", "ropa", "perfumes", "accesorios"];

const INSTAGRAM_HANDLE = "totallooks.val";

const contactMessage = encodeURIComponent(
  "Hola, quiero más información sobre TOTAL LOOKS."
);

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 4.99L2 22l5.2-1.36a9.94 9.94 0 0 0 4.84 1.23h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.83 14.24c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.02.28-3.42-.71-2.88-1.19-4.73-4.1-4.87-4.29-.14-.19-1.16-1.55-1.16-2.96s.72-2.1.98-2.39c.25-.28.55-.35.73-.35.19 0 .37 0 .53.01.17.01.4-.06.62.48.24.58.8 2 .87 2.14.07.15.12.32.02.51-.1.19-.15.31-.29.47-.15.17-.31.37-.44.5-.15.14-.3.3-.13.59.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.45.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.68.79 1.97.93.29.14.48.21.55.33.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-tl-black px-4 py-12">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3">
        <div className="flex flex-col gap-3">
          <Image
            src="/logo.svg"
            alt="TOTAL LOOKS"
            width={88}
            height={38}
            className="h-9 w-auto"
          />
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
          <div className="flex gap-3">
            <a
              href={`https://wa.me/${SELLER_WHATSAPP_NUMBER}?text=${contactMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escribinos por WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:opacity-85"
            >
              <WhatsAppIcon />
            </a>
            <a
              href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Seguinos en Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:opacity-85"
              style={{
                background:
                  "linear-gradient(45deg, #FEDA75, #FA7E1E, #D62976, #962FBF, #4F5BD5)",
              }}
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-xs text-tl-grey">
        © {new Date().getFullYear()} TOTAL LOOKS. Todos los derechos reservados.
      </div>
    </footer>
  );
}
