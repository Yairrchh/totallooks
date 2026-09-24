"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
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
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categoria") as Category | null;

  const [category, setCategory] = useState<Category | "todas">(
    initialCategory && allCategories.includes(initialCategory) ? initialCategory : "todas"
  );
  const [gender, setGender] = useState<Gender | "todos">("todos");
  const [brand, setBrand] = useState<string>("todas");
  const [size, setSize] = useState<string>("todas");
  const [color, setColor] = useState<string>("todos");

  useEffect(() => {
    setCategory(
      initialCategory && allCategories.includes(initialCategory) ? initialCategory : "todas"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCategory]);

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
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category | "todas")}
          className="rounded border border-white/20 bg-tl-surface px-3 py-2 text-sm"
        >
          <option value="todas">Todas las categorías</option>
          {allCategories.map((c) => (
            <option key={c} value={c}>
              {categoryLabels[c]}
            </option>
          ))}
        </select>

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value as Gender | "todos")}
          className="rounded border border-white/20 bg-tl-surface px-3 py-2 text-sm"
        >
          <option value="todos">Todos los géneros</option>
          {allGenders
            .filter((g) => g !== "unisex")
            .map((g) => (
              <option key={g} value={g}>
                {genderLabels[g]}
              </option>
            ))}
        </select>

        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="rounded border border-white/20 bg-tl-surface px-3 py-2 text-sm"
        >
          <option value="todas">Todas las marcas</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="rounded border border-white/20 bg-tl-surface px-3 py-2 text-sm"
        >
          <option value="todas">Todas las tallas</option>
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="rounded border border-white/20 bg-tl-surface px-3 py-2 text-sm"
        >
          <option value="todos">Todos los colores</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

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
