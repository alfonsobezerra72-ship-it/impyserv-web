import { BRAND, SITE_URL } from "@/lib/constants";

const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["HVACBusiness", "LocalBusiness"],
    "@id": BUSINESS_ID,
    name: BRAND.name,
    description:
      "Instalación, mantenimiento y venta de equipos de climatización: split, sistemas centrales, VRF/VRV, ductos y cámaras frigoríficas. Más de 10 años de experiencia en Bolivia.",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-impyserv.png`,
    image: `${SITE_URL}/images/logo-impyserv.png`,
    telephone: `+${BRAND.phoneWhatsApp}`,
    email: BRAND.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Santa Cruz de la Sierra",
      addressRegion: "Santa Cruz",
      addressCountry: "BO",
    },
    areaServed: { "@type": "Country", name: "Bolivia" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${BRAND.phoneWhatsApp}`,
      contactType: "customer service",
      areaServed: "BO",
      availableLanguage: "es",
    },
    sameAs: Object.values(BRAND.social),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: BRAND.name,
    inLanguage: "es",
    publisher: { "@id": BUSINESS_ID },
  };
}

type ServiceSchemaInput = {
  name: string;
  description: string;
  path: string;
  serviceType: string;
};

export function serviceSchema({ name, description, path, serviceType }: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: `${SITE_URL}${path}`,
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "Country", name: "Bolivia" },
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE_URL}/contacto`,
    name: `Contacto — ${BRAND.name}`,
    about: { "@id": BUSINESS_ID },
  };
}
