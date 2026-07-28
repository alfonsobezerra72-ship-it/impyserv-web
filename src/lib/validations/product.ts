import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Ingresa el nombre del equipo"),
  brand: z.string().min(1, "Ingresa la marca"),
  capacityBtu: z.coerce.number().int().positive("Ingresa la capacidad en BTU"),
  type: z.enum(["split", "central", "vrf"], { message: "Selecciona el tipo" }),
  price: z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? undefined : v),
    z.coerce.number().positive("Ingresa un precio válido").optional()
  ),
  description: z.string().optional(),
  active: z.coerce.boolean().default(true),
});

export type ProductInput = z.infer<typeof productSchema>;

export const CAPACITY_OPTIONS = [9000, 12000, 18000, 24000, 36000, 60000];
