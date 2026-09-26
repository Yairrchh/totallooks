"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

export default function AddToCartForm({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, size, color, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 400);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-1 text-xs uppercase tracking-wide text-tl-grey">Talla</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`rounded border px-3 py-1 text-sm transition-all duration-200 active:scale-90 ${
                size === s ? "border-tl-red bg-tl-red text-tl-white" : "border-white/20 hover:border-tl-red"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-1 text-xs uppercase tracking-wide text-tl-grey">Color</p>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`rounded border px-3 py-1 text-sm transition-all duration-200 active:scale-90 ${
                color === c ? "border-tl-red bg-tl-red text-tl-white" : "border-white/20 hover:border-tl-red"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="h-8 w-8 rounded border border-white/20 transition-transform duration-200 hover:border-tl-red active:scale-90"
        >
          −
        </button>
        <span className="w-6 text-center">{qty}</span>
        <button
          type="button"
          onClick={() => setQty((q) => q + 1)}
          className="h-8 w-8 rounded border border-white/20 transition-transform duration-200 hover:border-tl-red active:scale-90"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className={`rounded-full bg-tl-red py-3 font-semibold uppercase tracking-wide transition-all duration-200 hover:bg-tl-red-dark active:scale-95 ${added ? "animate-pop" : ""}`}
      >
        {added ? "¡Agregado!" : "Agregar al carrito"}
      </button>
    </div>
  );
}
