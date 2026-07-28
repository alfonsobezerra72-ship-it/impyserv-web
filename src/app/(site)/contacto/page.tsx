import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { BRAND } from "@/lib/constants";
import { getProductById } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos para agendar una visita técnica, solicitar una cotización o consultarnos sobre un proyecto de climatización.",
};

type ContactoPageProps = {
  searchParams: Promise<{ producto?: string }>;
};

export default async function ContactoPage({ searchParams }: ContactoPageProps) {
  const { producto } = await searchParams;
  const product = producto ? await getProductById(producto) : null;

  return (
    <>
      <PageHero
        title="Contacto"
        subtitle="Escríbenos y coordinamos tu visita técnica o cotización."
      />
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-primary">Datos de contacto</h2>
            <ul className="mt-4 space-y-3 text-muted">
              <li>
                <span className="font-semibold text-text">WhatsApp / Teléfono: </span>
                {BRAND.phoneDisplay}
              </li>
              <li>
                <span className="font-semibold text-text">Correo: </span>
                {BRAND.email}
              </li>
              <li>
                <span className="font-semibold text-text">Horario: </span>
                {BRAND.hours}
              </li>
              <li>
                <span className="font-semibold text-success">{BRAND.emergency}</span>
              </li>
              <li>{BRAND.coverage}</li>
            </ul>
          </div>

          <div className="rounded-xl bg-surface p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-primary">Solicita tu cotización</h2>
            {product && (
              <p className="mt-1 text-sm text-muted">
                Cotizando: <span className="font-semibold text-text">{product.name}</span>
              </p>
            )}
            <div className="mt-6">
              <QuoteForm
                productId={product?.id}
                defaultServiceType={product ? "cotizacion_equipo" : undefined}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
