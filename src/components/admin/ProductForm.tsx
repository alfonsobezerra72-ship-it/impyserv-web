"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { CAPACITY_OPTIONS } from "@/lib/validations/product";
import type { ProductActionState } from "@/lib/actions/products";
import type { Product } from "@/types";

const initialState: ProductActionState = { error: null };

type ProductFormProps = {
  action: (state: ProductActionState, formData: FormData) => Promise<ProductActionState>;
  product?: Product;
};

export function ProductForm({ action, product }: ProductFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="max-w-xl space-y-4 rounded-xl bg-white p-6 shadow-sm">
      <div>
        <label className="text-sm font-medium text-text">Nombre del equipo</label>
        <input
          name="name"
          required
          defaultValue={product?.name}
          placeholder="Ej. Split LG 12000 BTU"
          className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-text">Marca</label>
          <input
            name="brand"
            required
            defaultValue={product?.brand}
            placeholder="LG, Samsung..."
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-text">Capacidad (BTU)</label>
          <select
            name="capacityBtu"
            required
            defaultValue={product?.capacityBtu ?? ""}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            <option value="" disabled>
              Selecciona...
            </option>
            {CAPACITY_OPTIONS.map((btu) => (
              <option key={btu} value={btu}>
                {btu.toLocaleString("es-BO")}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-text">Tipo</label>
          <select
            name="type"
            required
            defaultValue={product?.type ?? ""}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            <option value="" disabled>
              Selecciona...
            </option>
            <option value="split">Split</option>
            <option value="central">Central</option>
            <option value="vrf">VRF/VRV</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-text">Precio (Bs.)</label>
          <input
            type="number"
            step="1"
            name="price"
            required
            defaultValue={product?.price}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-text">Descripción (opcional)</label>
        <textarea
          name="description"
          rows={3}
          defaultValue={product?.description ?? ""}
          className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-text">Foto del equipo</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="mt-1 w-full text-sm"
        />
        {product?.imageUrl && (
          <p className="mt-1 text-xs text-muted">Ya tiene una foto — sube una nueva solo si quieres reemplazarla.</p>
        )}
      </div>

      <label className="flex items-center gap-2 text-sm text-text">
        <input type="checkbox" name="active" defaultChecked={product?.active ?? true} />
        Visible en el catálogo público
      </label>

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}

      <Button type="submit" variant="dark" disabled={pending}>
        {pending ? "Guardando..." : product ? "Guardar cambios" : "Crear equipo"}
      </Button>
    </form>
  );
}
