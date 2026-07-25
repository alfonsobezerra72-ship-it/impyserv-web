import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Wrench, Snowflake, Building2 } from "lucide-react";

const SERVICES = [
  {
    icon: Snowflake,
    title: "Venta de equipos",
    description:
      "Split de 9000 a 60000 BTU, sistemas centrales y VRF/VRV. Marcas LG y Samsung, con garantía de 2 años.",
    href: "/catalogo",
    cta: "Ver catálogo",
  },
  {
    icon: Wrench,
    title: "Mantenimiento",
    description:
      "Preventivo y correctivo, con planes mensuales, trimestrales y anuales para empresas y hoteles.",
    href: "/servicios/mantenimiento",
    cta: "Ver planes",
  },
  {
    icon: Building2,
    title: "Proyectos grandes",
    description:
      "Instalación de VRF/VRV, ductos y cámaras frigoríficas para hoteles, edificios y clínicas.",
    href: "/servicios/proyectos-grandes",
    cta: "Cotizar proyecto",
  },
];

export function ServicesGrid() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6">
      <h2 className="text-center text-2xl font-bold text-primary sm:text-3xl">Nuestros servicios</h2>
      <p className="mx-auto mt-2 max-w-2xl text-center text-muted">
        Cubrimos todo el ciclo de climatización: venta e instalación, mantenimiento, y proyectos a
        gran escala.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {SERVICES.map(({ icon: Icon, title, description, href, cta }) => (
          <Card key={title} className="p-6">
            <Icon className="h-9 w-9 text-secondary" strokeWidth={1.5} />
            <h3 className="mt-4 text-lg font-semibold text-primary">{title}</h3>
            <p className="mt-2 text-sm text-muted">{description}</p>
            <Link href={href} className="mt-4 inline-block text-sm font-semibold text-primary-accent hover:underline">
              {cta} →
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
