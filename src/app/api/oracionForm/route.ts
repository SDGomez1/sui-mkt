import { Resend } from "resend";
import { z } from "zod";
import PrayerGuideEmail from "@/components/emailTemplates/OracionFormEmail";

const payloadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  countryCode: z.enum(["+52", "+57"]),
  phone: z.string().min(5),
  prayerFrequency: z.string().min(1),
  isChristian: z.enum(["si", "no"]),
  prayerDifficulty: z.string().min(1),
  prayerGoal: z.string().min(1),
  prayerDifficultyOther: z.string().optional(),
  prayerGoalOther: z.string().optional(),
});

const ADMIN_EMAIL = "suivelas087@gmail.com";
const ADMIN_SUBJECT = "Nuevo registro en landing de oración";
const USER_SUBJECT = "Tu guía de oración ya está aquí 💜";

const formatOther = (value: string, other?: string) => {
  if (value !== "other") return value;

  const trimmed = other?.trim();
  return trimmed ? `Otro: ${trimmed}` : "Otro";
};

const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  return new Resend(apiKey);
};

export async function POST(request: Request) {
  try {
    const resend = getResendClient();
    const payload = payloadSchema.parse(await request.json());

    const prayerDifficulty = formatOther(
      payload.prayerDifficulty,
      payload.prayerDifficultyOther,
    );

    const prayerGoal = formatOther(
      payload.prayerGoal,
      payload.prayerGoalOther,
    );

    const adminHtml = `
      <h2>${ADMIN_SUBJECT}</h2>
      <p><strong>Nombre:</strong> ${payload.firstName} ${payload.lastName}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p><strong>Teléfono:</strong> ${payload.countryCode} ${payload.phone}</p>
      <p><strong>Veces que oras en el día:</strong> ${payload.prayerFrequency}</p>
      <p><strong>¿Eres cristiana(o)?:</strong> ${payload.isChristian}</p>
      <p><strong>¿Qué es lo que más te cuesta al orar?:</strong> ${prayerDifficulty}</p>
      <p><strong>¿Qué quieres lograr en tu relación con Dios?:</strong> ${prayerGoal}</p>
    `;

    const [adminResponse, userResponse] = await Promise.all([
      resend.emails.send({
        from: "Sui <onboarding@resend.dev>",
        to: [ADMIN_EMAIL],
        subject: ADMIN_SUBJECT,
        html: adminHtml,
      }),
      resend.emails.send({
        from: "Sui <guias@suivelas.com>",
        to: [payload.email],
        subject: USER_SUBJECT,
        react: PrayerGuideEmail({
          userName: payload.firstName,
          email: payload.email,
        }),
      }),
    ]);

    const error = adminResponse.error || userResponse.error;

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
