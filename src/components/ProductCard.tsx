import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-white/10 bg-tl-surface transition hover:border-tl-red"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-tl-black">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, 25vw"
        />
        <span className="absolute left-2 top-2 rounded bg-tl-black/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-tl-grey">
          {product.brand}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="font-semibold leading-tight">{product.name}</h3>
        <p className="mt-auto font-display text-lg text-tl-red">${product.price}</p>
      </div>
    </Link>
  );
}
