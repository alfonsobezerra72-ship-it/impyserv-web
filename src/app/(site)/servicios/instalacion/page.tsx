import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Card } from "@/components/ui/Card";
import { QuoteForm } from "@/components/forms/QuoteForm";

export const metadata: Metadata = {
  title: "Instalación de equipos de climatización",
  description:
    "Instalación de aire acondicionado split, sistemas centrales, VRF/VRV, ductos y cámaras frigoríficas en Santa Cruz y toda Bolivia.",
};

const SYSTEMS = [
  { name: "Split residencial y comercial", detail: "De 9000 a 60000 BTU, en distintas marcas y capacidades." },
  { name: "Sistemas centrales", detail: "Climatización de múltiples ambientes desde una sola unidad." },
  { name: "VRF / VRV", detail: "Para hoteles y edificios — control por zonas, alta eficiencia." },
  { name: "Ductos", detail: "Diseño e instalación de redes de ductos para climatización distribuida." },
  { name: "Cámaras frigoríficas", detail: "Instalación para uso comercial e industrial." },
];

export default function InstalacionPage() {
  return (
    <>
      <PageHero
        title="Instalación de equipos"
        subtitle="Desde el split de una habitación hasta sistemas VRF completos para tu edificio."
      />
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            {SYSTEMS.map((s) => (
              <Card key={s.name} className="p-4">
                <p className="font-semibold text-primary">{s.name}</p>
                <p className="text-sm text-muted">{s.detail}</p>
              </Card>
            ))}
          </div>
          <div className="rounded-xl bg-surface p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-primary">Cuéntanos qué necesitas instalar</h2>
            <p className="mt-1 text-sm text-muted">Te contactamos para coordinar una visita técnica.</p>
            <div className="mt-6">
              <QuoteForm defaultServiceType="instalacion" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
