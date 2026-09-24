"use client";

import { useState } from "react";
import type { CartLine } from "@/context/CartContext";
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export default function CheckoutPanel({
  lines,
  subtotal,
}: {
  lines: CartLine[];
  subtotal: number;
}) {
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

      <button
        type="button"
        onClick={handleCheckout}
        disabled={isEmpty}
        className="w-full rounded-full bg-tl-red py-3 text-center font-semibold uppercase tracking-wide text-tl-white transition hover:bg-tl-red-dark disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-tl-grey"
      >
        Finalizar pedido por WhatsApp
      </button>
    </div>
  );
}
