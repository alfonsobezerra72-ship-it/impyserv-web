import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Card } from "@/components/ui/Card";
import { Wrench, Snowflake, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Servicios de climatización",
  description:
    "Venta de equipos, mantenimiento preventivo y correctivo, e instalación de proyectos grandes de climatización en Bolivia.",
};

const SERVICES = [
  {
    icon: Snowflake,
    title: "Venta de equipos",
    description:
      "Split de 9000 a 60000 BTU, sistemas centrales y VRF/VRV, en distintas marcas (LG, Samsung y otras). Garantía de 2 años.",
    href: "/catalogo",
    cta: "Ver catálogo",
  },
  {
    icon: Wrench,
    title: "Mantenimiento preventivo y correctivo",
    description:
      "Visitas únicas o planes periódicos (mensual, trimestral, anual) para empresas y hoteles.",
    href: "/servicios/mantenimiento",
    cta: "Ver planes de mantenimiento",
  },
  {
    icon: Building2,
    title: "Proyectos grandes",
    description:
      "Instalación de sistemas VRF/VRV, ductos y cámaras frigoríficas para hoteles, edificios y clínicas.",
    href: "/servicios/proyectos-grandes",
    cta: "Cotizar un proyecto",
  },
];

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        title="Servicios"
        subtitle="Cubrimos todo el ciclo de climatización: venta e instalación, mantenimiento, y proyectos a gran escala."
      />
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, description, href, cta }) => (
            <Card key={title} className="p-6">
              <Icon className="h-9 w-9 text-secondary" strokeWidth={1.5} />
              <h2 className="mt-4 text-lg font-semibold text-primary">{title}</h2>
              <p className="mt-2 text-sm text-muted">{description}</p>
              <Link href={href} className="mt-4 inline-block text-sm font-semibold text-primary-accent hover:underline">
                {cta} →
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
