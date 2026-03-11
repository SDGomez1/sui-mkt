import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const payloadSchema = z.object({
  to: z.string().min(1),
  subject: z.string().min(1),
  html: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = payloadSchema.parse(body);
    const recipients = payload.to
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    const recipientsSchema = z.array(z.string().email());
    const validatedRecipients = recipientsSchema.parse(recipients);

    if (validatedRecipients.length === 0) {
      return Response.json(
        { error: "Debes incluir al menos un email valido." },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Sui <crecimiento@suivelas.com>",
      to: validatedRecipients,
      subject: payload.subject,
      html: payload.html,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ ok: true, id: data?.id ?? null });
  } catch (error) {
    const message =
      error instanceof z.ZodError
        ? "Datos invalidos para enviar el correo."
        : error instanceof Error
          ? error.message
          : "Error inesperado enviando el correo.";

    return Response.json({ error: message }, { status: 400 });
  }
}
