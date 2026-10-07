import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/constants";
import { cn } from "@/lib/utils";

type WhatsAppCTAProps = {
  message: string;
  label?: string;
  className?: string;
};

export function WhatsAppCTA({ message, label = "Escríbenos por WhatsApp", className }: WhatsAppCTAProps) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe5b] sm:w-auto sm:text-base",
        className
      )}
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      {label}
    </a>
  );
}
