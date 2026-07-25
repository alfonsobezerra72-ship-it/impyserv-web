import { Resend } from "resend";
import { BRAND } from "@/lib/constants";
import type { LeadInput } from "@/lib/validations/lead";
import { PROPERTY_TYPE_LABELS, SERVICE_TYPE_LABELS } from "@/lib/validations/lead";

/**
 * Envía la notificación de un nuevo lead por correo. No lanza error si
 * RESEND_API_KEY no está configurada — solo lo registra en consola, para que
 * el formulario siga funcionando en desarrollo antes de conectar Resend.
 */
export async function sendLeadNotification(lead: LeadInput) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY no configurada — se omite el envío de correo.", lead);
    return;
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: `${BRAND.name} <notificaciones@impyserv.com>`,
    to: BRAND.email,
    subject: `Nuevo contacto: ${SERVICE_TYPE_LABELS[lead.serviceType]} — ${lead.name}`,
    text: [
      `Nombre: ${lead.name}`,
      `Teléfono: ${lead.phone}`,
      `Ciudad: ${lead.city ?? "-"}`,
      `Tipo de inmueble: ${PROPERTY_TYPE_LABELS[lead.propertyType]}`,
      `Servicio solicitado: ${SERVICE_TYPE_LABELS[lead.serviceType]}`,
      `Mensaje: ${lead.message ?? "-"}`,
    ].join("\n"),
  });

  if (error) {
    console.error("[email] Resend rechazó el envío:", error.name, "-", error.message);
  }
}
