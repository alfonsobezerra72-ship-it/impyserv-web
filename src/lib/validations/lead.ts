import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Ingresa tu nombre completo"),
  phone: z.string().min(6, "Ingresa un teléfono válido"),
  city: z.string().optional(),
  propertyType: z.enum(["casa", "oficina", "hotel_edificio"], {
    message: "Selecciona un tipo de inmueble",
  }),
  serviceType: z.enum(
    ["instalacion", "mantenimiento", "proyecto_grande", "cotizacion_equipo"],
    { message: "Selecciona qué necesitas" }
  ),
  message: z.string().optional(),
  productId: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const PROPERTY_TYPE_LABELS: Record<LeadInput["propertyType"], string> = {
  casa: "Casa",
  oficina: "Oficina o comercio",
  hotel_edificio: "Hotel o edificio",
};

export const SERVICE_TYPE_LABELS: Record<LeadInput["serviceType"], string> = {
  instalacion: "Instalación",
  mantenimiento: "Mantenimiento",
  proyecto_grande: "Proyecto grande",
  cotizacion_equipo: "Cotización de equipo",
};
