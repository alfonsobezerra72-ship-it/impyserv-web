import { LinkButton } from "@/components/ui/Button";
import { whatsappLink } from "@/lib/constants";

export function Hero() {
  return (
    <section className="bg-primary text-white">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold sm:text-5xl">
            Especialistas en climatización con más de 10 años de experiencia
          </h1>
          <p className="mt-4 text-lg text-white/85">
            Instalación, mantenimiento y proyectos de climatización en toda Bolivia — desde el
            aire acondicionado de tu casa hasta el sistema completo de tu hotel.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
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
