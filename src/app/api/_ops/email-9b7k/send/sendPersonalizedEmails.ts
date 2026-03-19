import { Resend } from "resend";
import { z } from "zod";
import {
  extractTemplateTokens,
  renderPersonalizedHtml,
  validateRecipientRows,
  type RecipientRow,
} from "@/lib/email9b7kPersonalization";

const recipientSchema = z.object({
  email: z.string(),
  variables: z.record(z.string()).default({}),
});

const payloadSchema = z.object({
  subject: z.string().min(1),
  html: z.string().min(1),
  recipients: z.array(recipientSchema).min(1),
});

export type ResendClient = {
  batch: {
    send: (payload: Array<{
      from: string;
      to: string;
      subject: string;
      html: string;
    }>) => Promise<{
      data?: unknown;
      error?: unknown;
    }>;
  };
  emails: {
    send: (payload: {
      from: string;
      to: string[];
      subject: string;
      html: string;
    }) => Promise<{
      data?: unknown;
      error?: unknown;
    }>;
  };
};

function getDefaultResendClient(): ResendClient {
  return new Resend(process.env.RESEND_API_KEY) as unknown as ResendClient;
}

function getValidationMessage(errors: ReturnType<typeof validateRecipientRows>["errors"]) {
  return errors[0]?.message ?? "Datos invalidos para enviar el correo.";
}

function extractIds(data: unknown, isBatch: boolean) {
  if (isBatch && data && typeof data === "object" && "data" in data) {
    const batchData = (data as { data: Array<{ id: string }> | null }).data;

    return Array.isArray(batchData) ? batchData.map((item) => item.id) : [];
  }

  if (!isBatch && data && typeof data === "object" && "id" in data) {
    const id = (data as { id: string | null }).id;
    return id ? [id] : [];
  }

  return [];
}

export async function sendPersonalizedEmails(
  body: unknown,
  resendClient: ResendClient = getDefaultResendClient(),
) {
  try {
    const payload = payloadSchema.parse(body);
    const tokens = extractTemplateTokens(payload.html);
    const validation = validateRecipientRows(
      tokens,
      payload.recipients as RecipientRow[],
    );

    if (!validation.valid) {
      return Response.json(
        {
          error: {
            message: getValidationMessage(validation.errors),
            errors: validation.errors,
          },
        },
        { status: 400 },
      );
    }

    const emailPayload = {
      from: "Sui <crecimiento@suivelas.com>",
      subject: payload.subject,
    };
    const isBatch = validation.normalizedRows.length > 1;
    const result = isBatch
      ? await resendClient.batch.send(
          validation.normalizedRows.map((recipient) => ({
            ...emailPayload,
            to: recipient.email,
            html: renderPersonalizedHtml(payload.html, recipient),
          })),
        )
      : await resendClient.emails.send({
          ...emailPayload,
          to: [validation.normalizedRows[0].email],
          html: renderPersonalizedHtml(payload.html, validation.normalizedRows[0]),
        });

    if (result.error) {
      return Response.json({ error: result.error }, { status: 500 });
    }

    const ids = extractIds(result.data, isBatch);

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
