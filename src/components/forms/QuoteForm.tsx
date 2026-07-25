"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { leadSchema, type LeadInput, PROPERTY_TYPE_LABELS, SERVICE_TYPE_LABELS } from "@/lib/validations/lead";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type QuoteFormProps = {
  productId?: string;
  defaultServiceType?: LeadInput["serviceType"];
  className?: string;
  dark?: boolean;
};

export function QuoteForm({ productId, defaultServiceType, className, dark }: QuoteFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { serviceType: defaultServiceType, productId },
  });

  const onSubmit = async (data: LeadInput) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const labelClass = cn("text-sm font-medium", dark ? "text-white" : "text-text");
  const inputClass = cn(
    "mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary",
    dark ? "border-white/20 bg-white/10 text-white placeholder:text-white/50" : "border-black/10 bg-white text-text"
  );

  if (status === "sent") {
    return (
      <div className={cn("rounded-lg bg-success/10 p-6 text-center", dark ? "text-white" : "text-success")}>
        <p className="font-semibold">¡Listo! Recibimos tu solicitud.</p>
        <p className="mt-1 text-sm opacity-90">Te contactaremos a la brevedad para coordinar.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-4", className)}>
      <input type="hidden" {...register("productId")} />

      <div>
        <label className={labelClass}>Nombre completo</label>
        <input className={inputClass} {...register("name")} />
        {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Teléfono / WhatsApp</label>
          <input className={inputClass} {...register("phone")} />
          {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Ciudad</label>
          <input className={inputClass} {...register("city")} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Tipo de inmueble</label>
          <select className={inputClass} {...register("propertyType")} defaultValue="">
            <option value="" disabled>
              Selecciona...
            </option>
            {Object.entries(PROPERTY_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {errors.propertyType && (
            <p className="mt-1 text-xs text-destructive">{errors.propertyType.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>¿Qué necesitas?</label>
          <select className={inputClass} {...register("serviceType")} defaultValue={defaultServiceType ?? ""}>
            <option value="" disabled>
              Selecciona...
            </option>
            {Object.entries(SERVICE_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {errors.serviceType && (
            <p className="mt-1 text-xs text-destructive">{errors.serviceType.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className={labelClass}>Mensaje (opcional)</label>
        <textarea className={inputClass} rows={3} {...register("message")} />
      </div>

      <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? "Enviando..." : "Enviar solicitud"}
      </Button>
      {status === "error" && (
        <p className="text-sm text-destructive">
          Hubo un problema al enviar. Intenta de nuevo o escríbenos por WhatsApp.
        </p>
      )}
    </form>
  );
}
