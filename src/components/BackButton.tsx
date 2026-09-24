"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="Volver"
      className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-tl-black/70 text-tl-white backdrop-blur hover:bg-tl-red"
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
        <path d="M18 6 6 18" />
        <path d="M6 6l12 12" />
      </svg>
    </button>
  );
}
