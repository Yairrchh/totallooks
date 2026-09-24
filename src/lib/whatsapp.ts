import type { CartLine } from "@/context/CartContext";
import { effectivePrice } from "@/lib/pricing";

export const SELLER_WHATSAPP_NUMBER = "584144854795";

export function buildOrderMessage(
  lines: CartLine[],
  subtotal: number,
  customerName?: string
): string {
  const header = customerName
    ? `Hola, soy ${customerName}. Quiero hacer este pedido en TOTAL LOOKS:`
    : "Hola, quiero hacer este pedido en TOTAL LOOKS:";

  const items = lines
    .map((l) => {
      const lineTotal = (effectivePrice(l.product) * l.qty).toFixed(2);
      return `• ${l.product.name} (${l.color}, talla ${l.size}) x${l.qty} — $${lineTotal}`;
    })
    .join("\n");

  return `${header}\n\n${items}\n\nTotal: $${subtotal.toFixed(2)}`;
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${SELLER_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
