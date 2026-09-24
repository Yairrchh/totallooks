import type { Product } from "@/data/products";

export function effectivePrice(product: Product): number {
  if (!product.discountPercent) return product.price;
  return Math.round(product.price * (1 - product.discountPercent / 100) * 100) / 100;
}
