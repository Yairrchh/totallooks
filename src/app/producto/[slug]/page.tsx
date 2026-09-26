import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import AddToCartForm from "@/components/AddToCartForm";
import BackButton from "@/components/BackButton";
import FavoriteButton from "@/components/FavoriteButton";
import { effectivePrice } from "@/lib/pricing";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Producto no encontrado — TOTAL LOOKS" };

  const price = effectivePrice(product);
  const title = `${product.name} — $${price} | TOTAL LOOKS`;
  const description = `${product.description} ${product.brand} · Disponible en talla ${product.sizes.join(", ")}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="relative aspect-[3/4] animate-slide-in-left overflow-hidden rounded-lg bg-tl-surface">
          <BackButton />
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
            priority
          />
          {product.discountPercent && (
            <span className="absolute left-3 top-3 rounded bg-tl-red px-2.5 py-1 text-sm font-bold text-tl-white">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        <div className="flex animate-slide-in-right flex-col gap-4" style={{ animationDelay: "120ms" }}>
          <p className="text-xs font-semibold uppercase tracking-wide text-tl-grey">{product.brand}</p>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-3xl uppercase">{product.name}</h1>
            <FavoriteButton
              productId={product.id}
              productName={product.name}
              className="h-9 w-9 shrink-0 bg-tl-surface"
            />
          </div>
          <div className="flex items-baseline gap-3">
            <p className="font-display text-2xl text-tl-red">${effectivePrice(product)}</p>
            {product.discountPercent && (
              <p className="text-lg text-tl-grey line-through">${product.price}</p>
            )}
          </div>
          <p className="text-tl-grey">{product.description}</p>
          <AddToCartForm product={product} />
        </div>
      </div>
    </main>
  );
}
