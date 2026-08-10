import { z } from "zod";

function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const projectSchema = z.object({
  clientName: z.string().min(2, "Ingresa el nombre del cliente/obra"),
  location: z.string().min(2, "Ingresa la ubicación"),
  category: z.enum(["salud", "hoteleria", "cooperativa", "edificio"], {
    message: "Selecciona una categoría",
  }),
  description: z.string().min(2, "Ingresa una descripción breve"),
  featured: z.coerce.boolean().default(false),
});

export type ProjectInput = z.infer<typeof projectSchema>;

export function slugFromClientName(clientName: string) {
  return slugify(clientName);
}

export const CATEGORY_OPTIONS: Record<ProjectInput["category"], string> = {
  salud: "Salud",
  hoteleria: "Hotelería",
  cooperativa: "Cooperativa",
  edificio: "Edificio corporativo",
};
