export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block font-display uppercase leading-none tracking-wide ${className}`}
    >
      Urban<span className="text-tl-red"> Sport</span>
    </span>
  );
}
