"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CheckoutPanel from "./CheckoutPanel";
import { effectivePrice } from "@/lib/pricing";

export default function CartDrawer() {
  const { isOpen, close, lines, removeItem, updateQty, subtotal } = useCart();

  return (
    <div
      className={`fixed inset-0 z-50 transition ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={close}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md transform bg-tl-surface transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"} flex flex-col`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="font-display text-xl uppercase">Tu Carrito</h2>
          <button type="button" onClick={close} aria-label="Cerrar carrito" className="text-2xl leading-none">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="flex flex-col items-start gap-4">
              <p className="text-tl-grey">Tu carrito está vacío.</p>
              <Link
                href="/catalogo"
                onClick={close}
                className="rounded-full bg-tl-red px-6 py-2.5 text-sm font-semibold uppercase tracking-wide transition hover:bg-tl-red-dark"
              >
                Seguir comprando
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {lines.map((l) => (
                <li key={l.lineId} className="flex gap-3 border-b border-white/10 pb-4">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded bg-tl-black">
                    <Image src={l.product.images[0]} alt={l.product.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{l.product.name}</p>
                      {l.product.discountPercent && (
                        <span className="rounded bg-tl-red px-1.5 py-0.5 text-[10px] font-bold text-tl-white">
                          -{l.product.discountPercent}%
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-tl-grey">
                      {l.color} · Talla {l.size}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQty(l.lineId, l.qty - 1)}
                        className="h-6 w-6 rounded border border-white/20 hover:border-tl-red"
                        aria-label="Restar cantidad"
                      >
                        −
                      </button>
                      <span className="w-6 text-center">{l.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(l.lineId, l.qty + 1)}
                        className="h-6 w-6 rounded border border-white/20 hover:border-tl-red"
                        aria-label="Sumar cantidad"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(l.lineId)}
                        aria-label={`Quitar ${l.product.name} del carrito`}
                        className="ml-auto text-tl-grey hover:text-tl-red"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                          aria-hidden="true"
                        >
                          <path d="M3 6h18" />
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="whitespace-nowrap text-right">
                    <p className="font-semibold">
                      ${(effectivePrice(l.product) * l.qty).toFixed(2)}
                    </p>
                    {l.product.discountPercent && (
                      <p className="text-xs text-tl-grey line-through">
                        ${(l.product.price * l.qty).toFixed(2)}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <CheckoutPanel lines={lines} subtotal={subtotal} />
      </aside>
    </div>
  );
}
