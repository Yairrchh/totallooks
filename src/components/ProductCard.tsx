import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { effectivePrice } from "@/lib/pricing";

export default function ProductCard({ product }: { product: Product }) {
  const hasDiscount = Boolean(product.discountPercent);
  const price = effectivePrice(product);

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
        {hasDiscount && (
          <span className="absolute right-2 top-2 rounded bg-tl-red px-2 py-1 text-xs font-bold text-tl-white">
            -{product.discountPercent}%
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="font-semibold leading-tight">{product.name}</h3>
        <div className="mt-auto flex items-baseline gap-2">
          <p className="font-display text-lg text-tl-red">${price}</p>
          {hasDiscount && (
            <p className="text-sm text-tl-grey line-through">${product.price}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
