import { Building2, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Placeholder visual mientras se cargan las fotos reales (proyectos/productos)
 * a public/images/. Una vez agregadas las fotos, reemplazar por <Image src=... />.
 */
export function ProjectImagePlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-gradient-to-br from-primary to-primary-accent",
        className
      )}
    >
      <Building2 className="h-10 w-10 text-secondary" strokeWidth={1.5} />
    </div>
  );
}

export function ProductImagePlaceholder({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center bg-surface", className)}>
      <Wind className="h-10 w-10 text-primary-accent" strokeWidth={1.5} />
    </div>
  );
}
