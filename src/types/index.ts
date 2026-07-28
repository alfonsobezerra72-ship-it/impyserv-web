export type ProductType = "split" | "central" | "vrf";

export type Product = {
  id: string;
  name: string;
  brand: string;
  capacityBtu: number;
  type: ProductType;
  price: number | null;
  imageUrl: string | null;
  description: string | null;
  active: boolean;
};

export type ProjectCategory = "salud" | "hoteleria" | "cooperativa" | "edificio";

export type Project = {
  id: string;
  slug: string;
  clientName: string;
  location: string;
  category: ProjectCategory;
  description: string;
  imageUrl: string | null;
  featured: boolean;
};

export type ServiceType =
  | "instalacion"
  | "mantenimiento"
  | "proyecto_grande"
  | "cotizacion_equipo";

export type PropertyType = "casa" | "oficina" | "hotel_edificio";
