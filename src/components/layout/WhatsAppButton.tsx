import { whatsappLink } from "@/lib/constants";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("Hola IMPYSERV, quiero agendar una visita técnica.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden>
        <path d="M16.01 3C9.38 3 4 8.36 4 15c0 2.4.7 4.63 1.9 6.51L4 29l7.68-1.86A11.9 11.9 0 0 0 16.01 27C22.64 27 28 21.64 28 15S22.64 3 16.01 3Zm0 21.6c-2.02 0-3.91-.58-5.5-1.58l-.4-.24-4.55 1.1 1.13-4.44-.26-.42A9.53 9.53 0 0 1 6.4 15c0-5.3 4.3-9.6 9.6-9.6 5.3 0 9.6 4.3 9.6 9.6 0 5.3-4.3 9.6-9.6 9.6Zm5.27-7.18c-.29-.15-1.7-.84-1.96-.94-.26-.1-.46-.15-.65.15-.19.29-.75.94-.92 1.13-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.58-.9-2.16-.24-.57-.48-.49-.65-.5h-.56c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.44s1.02 2.83 1.16 3.03c.15.19 2 3.06 4.86 4.29.68.29 1.21.47 1.62.6.68.21 1.3.18 1.79.11.55-.08 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.37-.07-.12-.26-.19-.55-.34Z" />
      </svg>
    </a>
  );
}
