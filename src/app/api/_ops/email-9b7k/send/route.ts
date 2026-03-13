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

    const emailPayload = {
      from: "Sui <crecimiento@suivelas.com>",
      subject: payload.subject,
      html: payload.html,
    };

    const { data, error } =
      validatedRecipients.length > 1
        ? await resend.batch.send(
            validatedRecipients.map((recipient) => ({
              ...emailPayload,
              to: recipient,
            })),
          )
        : await resend.emails.send({
            ...emailPayload,
            to: validatedRecipients,
          });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    const ids =
      validatedRecipients.length > 1 && data && "data" in data
        ? data.data.map((item) => item.id)
        : data && "id" in data
          ? [data.id]
          : [];

    return Response.json({
      ok: true,
      id: ids[0] ?? null,
      ids: ids.length > 1 ? ids : undefined,
    });
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
