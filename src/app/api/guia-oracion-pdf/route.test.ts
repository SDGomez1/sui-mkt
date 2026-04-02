import assert from "node:assert/strict";
import test from "node:test";
import { createGuiaOracionPdfResponse } from "@/app/api/guia-oracion-pdf/route";

test("createGuiaOracionPdfResponse returns a personalized inline pdf for valid emails", async () => {
  const originalBuffer = Buffer.from("%PDF-original");
  const personalizedBuffer = Buffer.from("%PDF-personalized");
  let receivedEmail: string | undefined;

  const response = await createGuiaOracionPdfResponse(
    new Request("https://suivelas.com/api/guia-oracion-pdf?email=ana@example.com"),
    {
      generatePdf: async (_templateBuffer, userEmail) => {
        receivedEmail = userEmail;
        return personalizedBuffer;
      },
      loadTemplateBuffer: async () => originalBuffer,
    },
  );

  assert.equal(response.status, 200);
  assert.equal(receivedEmail, "ana@example.com");
  assert.equal(response.headers.get("Content-Type"), "application/pdf");
  assert.equal(
    response.headers.get("Content-Disposition"),
    'inline; filename="guiaOracion.pdf"',
  );
  assert.equal(
    response.headers.get("Cache-Control"),
    "no-store, private, max-age=0, must-revalidate",
  );
  assert.deepEqual(
    Buffer.from(await response.arrayBuffer()),
    personalizedBuffer,
  );
});

test("createGuiaOracionPdfResponse falls back to the original pdf when email is missing", async () => {
  const originalBuffer = Buffer.from("%PDF-original");
  let generateCalled = false;

  const response = await createGuiaOracionPdfResponse(
    new Request("https://suivelas.com/api/guia-oracion-pdf"),
    {
      generatePdf: async () => {
        generateCalled = true;
        return Buffer.from("%PDF-should-not-run");
      },
      loadTemplateBuffer: async () => originalBuffer,
    },
  );

  assert.equal(generateCalled, false);
  assert.deepEqual(Buffer.from(await response.arrayBuffer()), originalBuffer);
});

test("createGuiaOracionPdfResponse falls back to the original pdf when email is invalid", async () => {
  const originalBuffer = Buffer.from("%PDF-original");
  let generateCalled = false;

  const response = await createGuiaOracionPdfResponse(
    new Request("https://suivelas.com/api/guia-oracion-pdf?email=not-an-email"),
    {
      generatePdf: async () => {
        generateCalled = true;
        return Buffer.from("%PDF-should-not-run");
      },
      loadTemplateBuffer: async () => originalBuffer,
    },
  );

  assert.equal(generateCalled, false);
  assert.deepEqual(Buffer.from(await response.arrayBuffer()), originalBuffer);
});
