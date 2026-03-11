import { POST as sendEmail } from "@/app/api/_ops/email-9b7k/send/route";

export const POST = sendEmail;

export function GET() {
  return Response.json({
    ok: true,
    message: "Usa POST con { to, subject, html } para enviar el correo.",
  });
}
