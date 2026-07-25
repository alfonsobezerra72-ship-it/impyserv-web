import { QuoteForm } from "@/components/forms/QuoteForm";

export function CTASection() {
  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-[700px] px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">
            ¿Necesitas una visita técnica o una cotización?
          </h2>
          <p className="mt-2 text-muted">
            Escríbenos directo y coordinamos tu visita, o llena el formulario y te contactamos.
          </p>
        </div>
        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm sm:p-8">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
