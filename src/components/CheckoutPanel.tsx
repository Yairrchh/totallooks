"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart, type CartLine } from "@/context/CartContext";
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export default function CheckoutPanel({
  lines,
  subtotal,
}: {
  lines: CartLine[];
  subtotal: number;
}) {
  const { close } = useCart();
  const [name, setName] = useState("");
  const isEmpty = lines.length === 0;

  const handleCheckout = () => {
    const message = buildOrderMessage(lines, subtotal, name.trim() || undefined);
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="border-t border-white/10 px-5 py-4">
      <label htmlFor="checkout-name" className="mb-1 block text-xs uppercase tracking-wide text-tl-grey">
        Tu nombre (opcional)
      </label>
      <input
        id="checkout-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ej: María Pérez"
        className="mb-4 w-full rounded border border-white/20 bg-tl-black px-3 py-2 text-sm outline-none focus:border-tl-red"
      />

      <div className="mb-4 flex items-center justify-between font-display text-lg uppercase">
        <span>Total</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={handleCheckout}
          disabled={isEmpty}
          className="w-full rounded-full bg-tl-red py-3 text-center font-semibold uppercase tracking-wide text-tl-white transition hover:bg-tl-red-dark disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-tl-grey"
        >
          Finalizar pedido por WhatsApp
        </button>

        {!isEmpty && (
          <Link
            href="/catalogo"
            onClick={close}
            className="w-full rounded-full border border-white/20 py-3 text-center text-sm font-semibold uppercase tracking-wide transition hover:border-tl-red hover:text-tl-red"
          >
            Seguir comprando
          </Link>
        )}
      </div>
    </div>
  );
}
