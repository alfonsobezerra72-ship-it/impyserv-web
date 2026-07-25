"use client";

import Link from "next/link";
import { useTransition } from "react";
import { deleteProduct, toggleProductActive } from "@/lib/actions/products";
import { formatPriceBs, cn } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductTable({ products }: { products: Product[] }) {
  const [isPending, startTransition] = useTransition();

  if (products.length === 0) {
    return <p className="text-muted">Todavía no hay equipos en el catálogo.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
      <table className="w-full min-w-[640px] text-sm">
        <thead className="bg-surface text-left text-muted">
          <tr>
            <th className="px-4 py-3">Equipo</th>
            <th className="px-4 py-3">Marca</th>
            <th className="px-4 py-3">BTU</th>
            <th className="px-4 py-3">Precio</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t border-black/5">
              <td className="px-4 py-3 font-medium text-text">{product.name}</td>
              <td className="px-4 py-3 text-muted">{product.brand}</td>
              <td className="px-4 py-3 text-muted">{product.capacityBtu.toLocaleString("es-BO")}</td>
              <td className="px-4 py-3 text-text">{formatPriceBs(product.price)}</td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-semibold",
                    product.active ? "bg-success/15 text-success" : "bg-muted/15 text-muted"
                  )}
                >
                  {product.active ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-3">
                  <Link href={`/admin/catalogo/${product.id}`} className="text-primary-accent hover:underline">
                    Editar
                  </Link>
                  <button
                    disabled={isPending}
                    onClick={() =>
                      startTransition(() => toggleProductActive(product.id, product.active))
                    }
                    className="text-primary-accent hover:underline"
                  >
                    {product.active ? "Desactivar" : "Activar"}
                  </button>
                  <button
                    disabled={isPending}
                    onClick={() => {
                      if (confirm(`¿Borrar "${product.name}"? Esta acción no se puede deshacer.`)) {
                        startTransition(() => deleteProduct(product.id));
                      }
                    }}
                    className="text-destructive hover:underline"
                  >
                    Borrar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
