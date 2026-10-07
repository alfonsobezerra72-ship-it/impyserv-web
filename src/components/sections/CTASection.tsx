import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";

export function CTASection() {
  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-[700px] px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">
            ¿Necesitas una visita técnica o una cotización?
          </h2>
          <p className="mt-2 text-muted">
            Escríbenos directo por WhatsApp y coordinamos tu visita.
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          <WhatsAppCTA message="Hola IMPYSERV, quisiera coordinar una visita técnica o solicitar una cotización." />
        </div>
      </div>
    </section>
  );
}
