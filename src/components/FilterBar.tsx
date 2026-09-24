"use client";

import { useMemo, useState } from "react";
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

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawCategory = searchParams.get("categoria") as Category | null;

  // The URL is the source of truth for category (so navbar links, back/forward,
  // and shareable filtered links all just work) — no local state or effect
  // needed to keep it in sync.
  const category: Category | "todas" =
    rawCategory && allCategories.includes(rawCategory) ? rawCategory : "todas";
  const setCategory = (v: Category | "todas") => {
    router.replace(v === "todas" ? "/catalogo" : `/catalogo?categoria=${v}`, {
      scroll: false,
    });
  };

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

  const filtered = products.filter((p) => {
    if (category !== "todas" && p.category !== category) return false;
    if (gender !== "todos" && p.gender !== gender && p.gender !== "unisex") return false;
    if (brand !== "todas" && p.brand !== brand) return false;
    if (size !== "todas" && !p.sizes.includes(size)) return false;
    if (color !== "todos" && !p.colors.includes(color)) return false;
    return true;
  });

  const clearFilters = () => {
    setCategory("todas");
    setGender("todos");
    setBrand("todas");
    setSize("todas");
    setColor("todos");
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-3">
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
          color !== "todos") && (
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
        <p className="text-tl-grey">
          No hay productos que coincidan con estos filtros.{" "}
          <button type="button" onClick={clearFilters} className="text-tl-red underline">
            Limpiar filtros
          </button>
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
