import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validations/lead";
import { sendLeadNotification } from "@/lib/email";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const lead = parsed.data;
  const supabase = await createClient();

  if (supabase) {
    const { error } = await supabase.from("leads").insert({
      name: lead.name,
      phone: lead.phone,
      city: lead.city || null,
      property_type: lead.propertyType,
      service_type: lead.serviceType,
      message: lead.message || null,
      product_id: lead.productId || null,
    });

    if (error) {
      console.error("[api/leads] Error insertando en Supabase:", error.message);
    }
  } else {
    console.warn("[api/leads] Supabase no configurado — lead no persistido:", lead);
  }

  await sendLeadNotification(lead).catch((err) =>
    console.error("[api/leads] Error enviando notificación:", err)
  );

  return NextResponse.json({ success: true });
}
