import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { whatsappLink } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <Image
        src="/images/hero-bg.png"
        alt="Técnicos de IMPYSERV con flotilla de vehículos"
        fill
        priority
        className="object-cover object-bottom"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/40 to-transparent" />

      <div className="relative mx-auto max-w-[1280px] px-4 py-20 sm:px-6 sm:py-28">
        <div className="ml-auto max-w-xl text-right sm:text-left">
          <h1 className="text-3xl font-bold sm:text-5xl">
            Especialistas en climatización
          </h1>
          <p className="mt-4 text-lg text-white/85">
            Instalación, mantenimiento y proyectos de climatización en toda Bolivia — desde el
            aire acondicionado de tu casa hasta el sistema completo de tu hotel.
          </p>
          <div className="mt-8 flex flex-wrap justify-end gap-4 sm:justify-start">
            <LinkButton href={whatsappLink("Hola IMPYSERV, quiero agendar una visita técnica.")} variant="primary">
              Agendar visita técnica
            </LinkButton>
            <LinkButton href="/catalogo" variant="outline">
              Ver catálogo de equipos
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
