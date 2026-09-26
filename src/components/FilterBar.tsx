"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import Select from "./Select";
import {
  products,
  categoryLabels,
  genderLabels,
  type Category,
  type Gender,
} from "@/data/products";

const allCategories = Object.keys(categoryLabels) as Category[];
const allGenders = Object.keys(genderLabels) as Gender[];

function buildCatalogUrl(params: { categoria?: string; q?: string }) {
  const search = new URLSearchParams();
  if (params.categoria) search.set("categoria", params.categoria);
  if (params.q) search.set("q", params.q);
  const qs = search.toString();
  return qs ? `/catalogo?${qs}` : "/catalogo";
}

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawCategory = searchParams.get("categoria") as Category | null;
  const urlQuery = searchParams.get("q") ?? "";

  // The URL is the source of truth for category (so navbar links, back/forward,
  // and shareable filtered links all just work) — no local state or effect
  // needed to keep it in sync.
  const category: Category | "todas" =
    rawCategory && allCategories.includes(rawCategory) ? rawCategory : "todas";
  const setCategory = (v: Category | "todas") => {
    router.replace(
      buildCatalogUrl({ categoria: v === "todas" ? undefined : v, q: urlQuery }),
      { scroll: false }
    );
  };

  // The search box needs its own local state so typing feels instant — pushing
  // every keystroke into the URL (and re-filtering on it) would lag. It stays
  // in sync with the URL both ways: debounced writes out, and reset back in
  // when the URL changes from elsewhere (e.g. a header search navigation).
  // Adjusting state during render (rather than in an effect) when the URL
  // value changes out from under us is the documented React pattern for
  // this — see https://react.dev/learn/you-might-not-need-an-effect.
  const [query, setQuery] = useState(urlQuery);
  const [syncedUrlQuery, setSyncedUrlQuery] = useState(urlQuery);
  if (urlQuery !== syncedUrlQuery) {
    setSyncedUrlQuery(urlQuery);
    setQuery(urlQuery);
  }
  useEffect(() => {
    const t = setTimeout(() => {
      if (query !== urlQuery) {
        router.replace(
          buildCatalogUrl({ categoria: category !== "todas" ? category : undefined, q: query }),
          { scroll: false }
        );
      }
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const [gender, setGender] = useState<Gender | "todos">("todos");
  const [brand, setBrand] = useState<string>("todas");
  const [size, setSize] = useState<string>("todas");
  const [color, setColor] = useState<string>("todos");

  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))).sort(),
    []
  );
  const sizes = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.sizes))).sort(),
    []
  );
  const colors = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.colors))).sort(),
    []
  );

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = products.filter((p) => {
    if (category !== "todas" && p.category !== category) return false;
    if (gender !== "todos" && p.gender !== gender && p.gender !== "unisex") return false;
    if (brand !== "todas" && p.brand !== brand) return false;
    if (size !== "todas" && !p.sizes.includes(size)) return false;
    if (color !== "todos" && !p.colors.includes(color)) return false;
    if (
      normalizedQuery &&
      !p.name.toLowerCase().includes(normalizedQuery) &&
      !p.brand.toLowerCase().includes(normalizedQuery)
    )
      return false;
    return true;
  });

  const clearFilters = () => {
    setGender("todos");
    setBrand("todas");
    setSize("todas");
    setColor("todos");
    setQuery("");
    router.replace("/catalogo", { scroll: false });
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap animate-fade-up gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre o marca..."
          className="w-full rounded border border-white/20 bg-tl-surface px-3 py-2 text-sm outline-none transition-colors focus:border-tl-red sm:w-56"
        />

        <Select
          value={category}
          onChange={(v) => setCategory(v as Category | "todas")}
          className="w-44"
          options={[
            { value: "todas", label: "Todas las categorías" },
            ...allCategories.map((c) => ({ value: c, label: categoryLabels[c] })),
          ]}
        />

        <Select
          value={gender}
          onChange={(v) => setGender(v as Gender | "todos")}
          className="w-40"
          options={[
            { value: "todos", label: "Todos los géneros" },
            ...allGenders
              .filter((g) => g !== "unisex")
              .map((g) => ({ value: g, label: genderLabels[g] })),
          ]}
        />

        <Select
          value={brand}
          onChange={setBrand}
          className="w-40"
          options={[
            { value: "todas", label: "Todas las marcas" },
            ...brands.map((b) => ({ value: b, label: b })),
          ]}
        />

        <Select
          value={size}
          onChange={setSize}
          className="w-36"
          options={[
            { value: "todas", label: "Todas las tallas" },
            ...sizes.map((s) => ({ value: s, label: s })),
          ]}
        />

        <Select
          value={color}
          onChange={setColor}
          className="w-36"
          options={[
            { value: "todos", label: "Todos los colores" },
            ...colors.map((c) => ({ value: c, label: c })),
          ]}
        />

        {(category !== "todas" ||
          gender !== "todos" ||
          brand !== "todas" ||
          size !== "todas" ||
          color !== "todos" ||
          normalizedQuery) && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-semibold uppercase tracking-wide text-tl-red"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="animate-fade-in text-tl-grey">
          No hay productos que coincidan con estos filtros.{" "}
          <button type="button" onClick={clearFilters} className="text-tl-red underline">
            Limpiar filtros
          </button>
        </p>
      ) : (
        <div
          key={`${category}-${gender}-${brand}-${size}-${color}-${normalizedQuery}`}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className="animate-fade-up"
              style={{ animationDelay: `${(i % 8) * 60}ms` }}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
