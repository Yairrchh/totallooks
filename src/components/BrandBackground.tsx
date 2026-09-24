const TAPE_TEXT = Array(14).fill("TOTAL BOOST").join("  •  ");

function RadarArcs({ opacityClass }: { opacityClass: string }) {
  return (
    <svg
      className={`absolute -right-24 -top-24 h-72 w-72 ${opacityClass}`}
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="90" strokeWidth="1" strokeDasharray="2 6" />
      <circle cx="100" cy="100" r="65" strokeWidth="1" />
      <circle cx="160" cy="40" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function GlowStreak({ opacityClass }: { opacityClass: string }) {
  return (
    <div
      className={`absolute -bottom-10 left-[-20%] h-24 w-[140%] rotate-[-6deg] bg-gradient-to-r from-transparent via-tl-red to-transparent blur-2xl ${opacityClass}`}
      aria-hidden="true"
    />
  );
}

function TapeBand({
  top,
  rotate,
  opacityClass,
  blurClass,
}: {
  top: string;
  rotate: string;
  opacityClass: string;
  blurClass: string;
}) {
  return (
    <div
      className={`absolute left-[-30%] w-[160%] overflow-hidden bg-tl-red py-1.5 ${rotate} ${opacityClass} ${blurClass}`}
      style={{ top }}
      aria-hidden="true"
    >
      <p className="whitespace-nowrap text-xs font-bold uppercase tracking-widest text-tl-white">
        {TAPE_TEXT}
      </p>
    </div>
  );
}

/**
 * Layered brand background — blurred "caution tape" bands, radar arcs, and a
 * glowing diagonal streak, echoing the client's own Instagram campaign look.
 */
export default function BrandBackground({
  variant = "subtle",
}: {
  variant?: "full" | "subtle" | "ambient";
}) {
  if (variant === "full") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden text-white/20">
        <TapeBand top="8%" rotate="-rotate-[8deg]" opacityClass="opacity-30" blurClass="blur-[2px]" />
        <TapeBand top="38%" rotate="-rotate-[6deg]" opacityClass="opacity-20" blurClass="blur-[3px]" />
        <TapeBand top="72%" rotate="-rotate-[9deg]" opacityClass="opacity-25" blurClass="blur-[2px]" />
        <RadarArcs opacityClass="opacity-25" />
        <GlowStreak opacityClass="opacity-50" />
      </div>
    );
  }

  if (variant === "ambient") {
    // Meant to sit in a viewport-fixed wrapper, so it reads behind whatever
    // content doesn't fully cover it (page margins, gaps between cards) no
    // matter where the page is scrolled to.
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden text-white/15">
        <TapeBand top="12%" rotate="-rotate-[8deg]" opacityClass="opacity-[0.16]" blurClass="blur-[2px]" />
        <TapeBand top="55%" rotate="-rotate-[6deg]" opacityClass="opacity-[0.12]" blurClass="blur-[3px]" />
        <TapeBand top="85%" rotate="-rotate-[9deg]" opacityClass="opacity-[0.14]" blurClass="blur-[2px]" />
        <RadarArcs opacityClass="opacity-[0.16]" />
        <GlowStreak opacityClass="opacity-[0.25]" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden text-white/10">
      <TapeBand top="20%" rotate="-rotate-[7deg]" opacityClass="opacity-[0.06]" blurClass="blur-[3px]" />
      <RadarArcs opacityClass="opacity-10" />
      <GlowStreak opacityClass="opacity-20" />
    </div>
  );
}
