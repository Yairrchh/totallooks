const messages = [
  "Tu look sube, los precios bajan",
  "Nueva colección: nuevos estilos",
  "Enviamos a todo el país en 24 horas",
  "Pedidos por WhatsApp",
];

export default function AnnouncementBar() {
  // The list is rendered twice and the track slides -50%, so the loop is seamless.
  const items = [...messages, ...messages];

  return (
    <div
      aria-label={messages.join(". ")}
      className="group overflow-hidden border-b border-white/10 bg-tl-surface py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-tl-white/80"
    >
      <div
        aria-hidden="true"
        className="flex w-max animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] motion-reduce:animate-none"
      >
        {items.map((text, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6">{text}</span>
            <span className="text-tl-red">—</span>
          </span>
        ))}
      </div>
    </div>
  );
}
