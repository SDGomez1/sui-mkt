import { Resend } from "resend";
import { z } from "zod";
import PrayerGuideEmail from "@/components/emailTemplates/OracionFormEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = payloadSchema.parse(body);

    const prayerDifficulty =
      payload.prayerDifficulty === "other"
        ? payload.prayerDifficultyOther?.trim()
          ? `Otro: ${payload.prayerDifficultyOther.trim()}`
          : "Otro"
        : payload.prayerDifficulty;
    const prayerGoal =
      payload.prayerGoal === "other"
        ? payload.prayerGoalOther?.trim()
          ? `Otro: ${payload.prayerGoalOther.trim()}`
          : "Otro"
        : payload.prayerGoal;

    const adminHtml = `
      <h2>Nuevo registro en landing de oraciÃ³n</h2>
      <p><strong>Nombre:</strong> ${payload.firstName} ${payload.lastName}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p><strong>TelÃ©fono:</strong> ${payload.countryCode} ${payload.phone}</p>
      <p><strong>Veces que oras en el dÃ­a:</strong> ${payload.prayerFrequency}</p>
      <p><strong>Â¿Eres cristiana(o)?:</strong> ${payload.isChristian}</p>
      <p><strong>Â¿QuÃ© es lo que mÃ¡s te cuesta al orar?:</strong> ${prayerDifficulty}</p>
      <p><strong>Â¿QuÃ© quieres lograr en tu relaciÃ³n con Dios?:</strong> ${prayerGoal}</p>
    `;

    const [adminResponse, userResponse] = await Promise.all([
      resend.emails.send({
        from: "Sui <onboarding@resend.dev>",
        to: ["suivelas087@gmail.com"],
        subject: "nuevo registro en landing de oracion",
        html: adminHtml,
      }),
      resend.emails.send({
        from: "Sui <guias@suivelas.com>",
        to: [payload.email],
        subject: "Tu guÃ­a de oraciÃ³n ya estÃ¡ aquÃ­ ðŸ’œ",
        react: PrayerGuideEmail({
          userName: payload.firstName,
          email: payload.email,
        }),
      }),
    ]);

    if (adminResponse.error || userResponse.error) {
      return Response.json(
        { error: adminResponse.error ?? userResponse.error },
        { status: 500 },
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

