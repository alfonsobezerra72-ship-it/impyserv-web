import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { WhyUs } from "@/components/sections/WhyUs";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce a IMPYSERV: más de 10 años de experiencia en climatización, con base en Santa Cruz de la Sierra y cobertura en toda Bolivia.",
};

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        title="Nosotros"
        subtitle="Más de 10 años climatizando Bolivia."
      />
      <section className="mx-auto max-w-[900px] px-4 py-16 sm:px-6">
        <h2 className="text-xl font-semibold text-primary">Nuestra historia</h2>
        <p className="mt-3 text-muted">
          {BRAND.name} ({BRAND.name === "IMPYSERV" ? "Importaciones y Servicios" : BRAND.name}) nació
          como un grupo de profesionales especializados en climatización, con el objetivo de ofrecer
          un servicio técnico serio y confiable en {BRAND.city}. Con más de 10 años de trayectoria,
          hemos instalado más de 300 equipos y hoy cubrimos proyectos en todo el país, desde el aire
          acondicionado de una casa hasta la climatización completa de hoteles y edificios.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-primary">Nuestro equipo</h2>
        <p className="mt-3 text-muted">
          Contamos con un grupo de técnicos altamente calificados y una flotilla de vehículos
          equipados para atender instalaciones, mantenimiento y emergencias en toda Bolivia,
          las 24 horas del día.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-primary">Cobertura</h2>
        <p className="mt-3 text-muted">
          Con base en {BRAND.city}, atendemos clientes residenciales, comerciales y proyectos
          grandes (hoteles, edificios, clínicas) en todo el territorio boliviano.
        </p>
      </section>
      <WhyUs />
    </>
  );
}
