import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";

export const metadata: Metadata = {
  title: "Proyectos grandes de climatización",
  description:
    "Climatización integral para hoteles, edificios y clínicas en Bolivia: VRF/VRV, ductos y cámaras frigoríficas, con más de 10 años de experiencia.",
};

export default function ProyectosGrandesPage() {
  return (
    <>
      <PageHero
        title="Proyectos grandes"
        subtitle="Climatización integral para hoteles, edificios y clínicas — de punta a punta."
      />
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-primary">Experiencia comprobada</h2>
            <p className="mt-3 text-muted">
              Hemos climatizado quirófanos, hoteles boutique y edificios corporativos en distintas
              regiones del país. Diseñamos e instalamos sistemas VRF/VRV, ductos y cámaras
              frigoríficas adaptados a las necesidades específicas de cada proyecto.
            </p>
            <p className="mt-3 text-muted">
              Trabajamos con hoteles, edificios, cooperativas y centros de salud, cubriendo desde el
              diseño técnico hasta la instalación y el mantenimiento posterior.
            </p>
            <Link href="/proyectos" className="mt-4 inline-block text-sm font-semibold text-primary-accent hover:underline">
              Ver casos de éxito →
            </Link>
          </div>
          <div className="rounded-xl bg-surface p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-primary">Cuéntanos sobre tu proyecto</h2>
            <p className="mt-1 text-sm text-muted">
              Nuestro equipo técnico te contacta para coordinar una evaluación.
            </p>
            <div className="mt-6">
              <QuoteForm defaultServiceType="proyecto_grande" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
