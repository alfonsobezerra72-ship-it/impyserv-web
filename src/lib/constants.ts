export const BRAND = {
  name: "IMPYSERV",
  tagline: "Especialistas en Climatización",
  phoneDisplay: "77085250",
  phoneWhatsApp: "59177085250", // formato internacional sin '+'
  email: "alfonsoespoz@impyserv.com",
  city: "Santa Cruz de la Sierra, Bolivia",
  coverage: "Cobertura a todo Bolivia",
  hours: "Lun a Sáb, 8:00 - 18:00",
  emergency: "Emergencias 24/7",
  social: {
    facebook: "https://facebook.com/impyserv",
    instagram: "https://instagram.com/impyserv",
    tiktok: "https://tiktok.com/@impyserv",
  },
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${BRAND.phoneWhatsApp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
] as const;
