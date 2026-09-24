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
  const { close, clearCart } = useCart();
  const [name, setName] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const isEmpty = lines.length === 0;

  const handleCheckoutClick = () => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    const message = buildOrderMessage(lines, subtotal, name.trim() || undefined);
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    clearCart();
    setIsConfirming(false);
    close();
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
        {isConfirming && (
          <p className="text-center text-xs text-tl-grey">
            ¿Confirmás el pedido? Se va a abrir WhatsApp.
          </p>
        )}

        <button
          type="button"
          onClick={handleCheckoutClick}
          disabled={isEmpty}
          className="w-full rounded-full bg-tl-red py-3 text-center font-semibold uppercase tracking-wide text-tl-white transition hover:bg-tl-red-dark disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-tl-grey"
        >
          {isConfirming ? "Sí, enviar pedido" : "Finalizar pedido por WhatsApp"}
        </button>

        {isConfirming && (
          <button
            type="button"
            onClick={() => setIsConfirming(false)}
            className="w-full rounded-full border border-white/20 py-3 text-center text-sm font-semibold uppercase tracking-wide transition hover:border-tl-red hover:text-tl-red"
          >
            Cancelar
          </button>
        )}

        {!isEmpty && !isConfirming && (
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
