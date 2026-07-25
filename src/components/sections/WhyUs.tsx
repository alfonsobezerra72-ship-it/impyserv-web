import { ShieldCheck, Clock, GraduationCap, MapPin } from "lucide-react";

const POINTS = [
  { icon: GraduationCap, title: "Equipo especializado", text: "Técnicos altamente calificados, con más de 10 años de experiencia combinada." },
  { icon: ShieldCheck, title: "Garantía real", text: "2 años de garantía en los equipos que instalamos." },
  { icon: Clock, title: "Respuesta rápida", text: "Emergencias 24/7, además del horario regular de 8:00 a 18:00." },
  { icon: MapPin, title: "Cobertura nacional", text: "Con base en Santa Cruz, atendemos proyectos en todo el país." },
];

export function WhyUs() {
  return (
    <section className="bg-primary text-white py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">Por qué IMPYSERV</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-white/80">
          Somos un grupo de profesionales con conocimiento especializado y más de una década de
          experiencia — eso es lo que marca la diferencia entre una instalación cualquiera y una
          que dura.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="text-center">
              <Icon className="mx-auto h-9 w-9 text-secondary" strokeWidth={1.5} />
              <h3 className="mt-3 font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-white/75">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
