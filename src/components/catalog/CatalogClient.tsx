"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/catalog/ProductCard";
import type { Product, ProductType } from "@/types";
import { cn } from "@/lib/utils";

const TYPE_LABELS: Record<ProductType, string> = {
  split: "Split",
  central: "Central",
  vrf: "VRF/VRV",
};

export function CatalogClient({ products }: { products: Product[] }) {
  const [type, setType] = useState<ProductType | "todos">("todos");
  const [brand, setBrand] = useState<string>("todas");

  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))).sort(),
    [products]
  );

  const filtered = products.filter(
    (p) => (type === "todos" || p.type === type) && (brand === "todas" || p.brand === brand)
  );

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <FilterGroup
          label="Tipo"
          value={type}
          options={[["todos", "Todos"], ...Object.entries(TYPE_LABELS)]}
          onChange={(v) => setType(v as ProductType | "todos")}
        />
        <FilterGroup
          label="Marca"
          value={brand}
          options={[["todas", "Todas"], ...brands.map((b) => [b, b] as [string, string])]}
          onChange={setBrand}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-muted">No hay equipos con esos filtros.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: [string, string][];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted">{label}:</span>
      <div className="flex flex-wrap gap-1">
        {options.map(([val, lbl]) => (
          <button
            key={val}
            onClick={() => onChange(val)}
            className={cn(
              "rounded-full border px-3 py-1 text-sm transition-colors",
              value === val
                ? "border-primary-accent bg-primary-accent text-white"
                : "border-black/10 text-text hover:border-primary-accent"
            )}
          >
            {lbl}
          </button>
        ))}
      </div>
    </div>
  );
}
