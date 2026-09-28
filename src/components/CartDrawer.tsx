"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart, type CartLine } from "@/context/CartContext";
import CheckoutPanel from "./CheckoutPanel";
import { effectivePrice } from "@/lib/pricing";

function chipClass(selected: boolean) {
  return `rounded border px-2.5 py-1 text-xs uppercase tracking-[0.12em] transition-colors ${
    selected
      ? "border-tl-white bg-tl-white text-tl-black"
      : "border-white/20 text-tl-white/70 hover:border-tl-white/60"
  }`;
}

function LineEditor({
  line,
  onSave,
  onCancel,
}: {
  line: CartLine;
  onSave: (size: string, color: string) => void;
  onCancel: () => void;
}) {
  const [size, setSize] = useState(line.size);
  const [color, setColor] = useState(line.color);
  const unchanged = size === line.size && color === line.color;

  return (
    <div className="mt-1 flex animate-fade-in flex-col gap-3 rounded border border-white/10 bg-tl-black/60 p-3">
      <div>
        <p className="mb-1.5 text-[10px] uppercase tracking-[0.2em] text-tl-grey">Talla</p>
        <div className="flex flex-wrap gap-1.5">
          {line.product.sizes.map((s) => (
            <button key={s} type="button" onClick={() => setSize(s)} aria-pressed={s === size} className={chipClass(s === size)}>
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-1.5 text-[10px] uppercase tracking-[0.2em] text-tl-grey">Color</p>
        <div className="flex flex-wrap gap-1.5">
          {line.product.colors.map((c) => (
            <button key={c} type="button" onClick={() => setColor(c)} aria-pressed={c === color} className={chipClass(c === color)}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onSave(size, color)}
          disabled={unchanged}
          className="rounded-full bg-tl-red px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] transition hover:bg-tl-red-dark disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-tl-grey"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-white/20 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] transition hover:border-tl-white/60"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default function CartDrawer() {
  const { isOpen, close, lines, removeItem, updateQty, updateLine, subtotal } = useCart();
  const [editingId, setEditingId] = useState<string | null>(null);

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
        className={`absolute right-0 top-0 h-full w-full max-w-md transform bg-tl-surface transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "translate-x-0" : "translate-x-full"} flex flex-col`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="text-sm font-medium uppercase tracking-[0.2em]">Tu Carrito</h2>
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
                className="rounded-full bg-tl-red px-6 py-2.5 text-xs font-medium uppercase tracking-[0.15em] transition hover:bg-tl-red-dark"
              >
                Seguir comprando
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {lines.map((l, i) => (
                <li
                  key={l.lineId}
                  className="flex animate-fade-up gap-3 border-b border-white/10 pb-4"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded bg-tl-black">
                    <Image src={l.product.images[0]} alt={l.product.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-medium uppercase tracking-[0.12em]">{l.product.name}</p>
                      {l.product.discountPercent && (
                        <span className="rounded bg-tl-red px-1.5 py-0.5 text-[10px] font-bold text-tl-white">
                          -{l.product.discountPercent}%
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs uppercase tracking-[0.1em] text-tl-grey">
                        {l.color} · Talla {l.size}
                      </p>
                      <button
                        type="button"
                        onClick={() => setEditingId(editingId === l.lineId ? null : l.lineId)}
                        aria-label={`Editar talla y color de ${l.product.name}`}
                        aria-expanded={editingId === l.lineId}
                        className="text-tl-grey transition-colors hover:text-tl-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                        </svg>
                      </button>
                    </div>
                    {editingId === l.lineId && (
                      <LineEditor
                        line={l}
                        onSave={(size, color) => {
                          updateLine(l.lineId, size, color);
                          setEditingId(null);
                        }}
                        onCancel={() => setEditingId(null)}
                      />
                    )}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQty(l.lineId, l.qty - 1)}
                        className="h-6 w-6 rounded border border-white/20 transition-transform duration-200 hover:border-tl-red active:scale-90"
                        aria-label="Restar cantidad"
                      >
                        −
                      </button>
                      <span className="w-6 text-center">{l.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(l.lineId, l.qty + 1)}
                        className="h-6 w-6 rounded border border-white/20 transition-transform duration-200 hover:border-tl-red active:scale-90"
                        aria-label="Sumar cantidad"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(l.lineId)}
                        aria-label={`Quitar ${l.product.name} del carrito`}
                        className="ml-auto text-tl-grey transition-transform duration-200 hover:scale-110 hover:text-tl-red active:scale-90"
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
                    <p className="text-sm font-medium">
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
