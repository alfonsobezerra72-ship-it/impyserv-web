import { Zap, Timer, Filter, Star } from "lucide-react";

const BENEFITS = [
  {
    icon: Zap,
    title: "Ahorro energético",
    text: "Un equipo limpio y bien calibrado consume hasta 15–20% menos electricidad.",
  },
  {
    icon: Timer,
    title: "Mayor vida útil del equipo",
    text: "Evita el desgaste prematuro del compresor y suma años de uso al equipo.",
  },
  {
    icon: Filter,
    title: "Mejor calidad de aire",
    text: "Filtros y serpentines limpios evitan fallas antes de que se vuelvan reparaciones grandes.",
  },
  {
    icon: Star,
    title: "Repuestos originales",
    text: "Piezas certificadas de fábrica que garantizan rendimiento y respaldo de garantía real.",
  },
];

export function MaintenanceBenefits() {
  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">
            Mantenimiento de A/C, <span className="text-primary-accent">a tiempo</span>
          </h2>
          <p className="mt-2 text-muted">
            Un servicio preventivo bien hecho cuesta menos que una reparación de emergencia.
          </p>
        </div>

        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {BENEFITS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/10">
                <Icon className="h-5 w-5 text-success" strokeWidth={2} />
              </span>
              <div>
                <p className="font-semibold text-primary">{title}</p>
                <p className="mt-1 text-sm text-muted">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
