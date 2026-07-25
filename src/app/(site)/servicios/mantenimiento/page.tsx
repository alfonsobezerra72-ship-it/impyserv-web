import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Card } from "@/components/ui/Card";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Mantenimiento de aire acondicionado",
  description:
    "Mantenimiento preventivo y correctivo de equipos de aire acondicionado en Santa Cruz y toda Bolivia, con planes mensuales, trimestrales y anuales para empresas y hoteles.",
};

const PLANS = [
  { name: "Mensual", detail: "Revisión periódica frecuente — recomendado para hoteles y clínicas." },
  { name: "Trimestral", detail: "El equilibrio más común para oficinas y comercios." },
  { name: "Anual", detail: "Mantenimiento programado una vez al año, ideal para uso residencial." },
];

export default function MantenimientoPage() {
  return (
    <>
      <PageHero
        title="Mantenimiento preventivo y correctivo"
        subtitle="Visitas únicas o planes periódicos para que tus equipos duren más y fallen menos."
      />
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-primary">Planes para empresas y hoteles</h2>
            <div className="mt-4 space-y-4">
              {PLANS.map((plan) => (
                <Card key={plan.name} className="flex items-start gap-3 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <div>
                    <p className="font-semibold text-primary">{plan.name}</p>
                    <p className="text-sm text-muted">{plan.detail}</p>
                  </div>
                </Card>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted">
              También ofrecemos mantenimiento correctivo puntual, sin necesidad de contrato,
              para el equipo de tu casa u oficina.
            </p>
          </div>
          <div className="rounded-xl bg-surface p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-primary">Solicita tu visita</h2>
            <p className="mt-1 text-sm text-muted">Te contactamos para coordinar.</p>
            <div className="mt-6">
              <QuoteForm defaultServiceType="mantenimiento" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
