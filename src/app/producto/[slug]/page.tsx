import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import AddToCartForm from "@/components/AddToCartForm";
import BackButton from "@/components/BackButton";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
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
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-tl-surface">
          <BackButton />
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-tl-grey">{product.brand}</p>
          <h1 className="font-display text-3xl uppercase">{product.name}</h1>
          <p className="font-display text-2xl text-tl-red">${product.price}</p>
          <p className="text-tl-grey">{product.description}</p>
          <AddToCartForm product={product} />
        </div>
      </div>
    </main>
  );
}
