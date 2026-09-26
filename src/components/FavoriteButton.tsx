"use client";

import { useState } from "react";
import { useFavorites } from "@/context/FavoritesContext";

export default function FavoriteButton({
  productId,
  productName,
  className = "",
}: {
  productId: string;
  productName: string;
  className?: string;
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [popped, setPopped] = useState(false);
  const active = isFavorite(productId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(productId);
    setPopped(true);
    setTimeout(() => setPopped(false), 350);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-label={active ? `Quitar ${productName} de favoritos` : `Agregar ${productName} a favoritos`}
      className={`flex items-center justify-center rounded-full bg-tl-black/70 backdrop-blur transition-transform duration-200 hover:scale-110 active:scale-90 ${
        active ? "text-tl-red" : "text-tl-white"
      } ${popped ? "animate-pop" : ""} ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
      </svg>
    </button>
  );
}
