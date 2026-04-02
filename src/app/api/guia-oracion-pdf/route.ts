import { createGuiaOracionPdfResponse } from "./createGuiaOracionPdfResponse";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return createGuiaOracionPdfResponse(request);
}
