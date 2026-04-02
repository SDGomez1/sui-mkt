import { readFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import {
  GUIDE_PDF_TEMPLATE_PATH,
  generatePersonalizedPdf,
} from "@/lib/guiaOracionPdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type GuiaOracionPdfResponseDeps = {
  generatePdf?: (templateBuffer: Buffer, userEmail: string) => Promise<Buffer>;
  loadTemplateBuffer?: () => Promise<Buffer>;
};

const emailSchema = z.string().email();

let templateBufferPromise: Promise<Buffer> | undefined;

const getTemplateBuffer = () => {
  templateBufferPromise ??= readFile(
    path.join(process.cwd(), GUIDE_PDF_TEMPLATE_PATH),
  );

  return templateBufferPromise;
};

export async function createGuiaOracionPdfResponse(
  request: Request,
  deps: GuiaOracionPdfResponseDeps = {},
) {
  const loadTemplateBuffer = deps.loadTemplateBuffer ?? getTemplateBuffer;
  const generatePdf = deps.generatePdf ?? generatePersonalizedPdf;

  const templateBuffer = await loadTemplateBuffer();
  const requestUrl = new URL(request.url);
  const emailResult = emailSchema.safeParse(requestUrl.searchParams.get("email"));

  const pdfBuffer = emailResult.success
    ? await generatePdf(templateBuffer, emailResult.data)
    : templateBuffer;

  return new Response(pdfBuffer, {
    headers: {
      "Cache-Control": "no-store, private, max-age=0, must-revalidate",
      "Content-Disposition": 'inline; filename="guiaOracion.pdf"',
      "Content-Type": "application/pdf",
    },
  });
}

export async function GET(request: Request) {
  return createGuiaOracionPdfResponse(request);
}
