import assert from "node:assert/strict";
import test from "node:test";
import {
  PDFArray,
  PDFDict,
  PDFDocument,
  PDFHexString,
  PDFName,
  PDFPage,
  PDFString,
} from "pdf-lib";
import {
  generatePersonalizedPdf,
  personalizeUriWithEmail,
} from "@/lib/guiaOracionPdf";

test("personalizeUriWithEmail adds email when the uri has no query string", () => {
  assert.equal(
    personalizeUriWithEmail(
      "https://suivelas.com/landing/oracion",
      "ana@example.com",
    ),
    "https://suivelas.com/landing/oracion?email=ana%40example.com",
  );
});

test("personalizeUriWithEmail preserves existing query params", () => {
  assert.equal(
    personalizeUriWithEmail(
      "https://suivelas.com/landing/oracion?utm_source=pdf&utm_medium=document",
      "ana@example.com",
    ),
    "https://suivelas.com/landing/oracion?utm_source=pdf&utm_medium=document&email=ana%40example.com",
  );
});

test("personalizeUriWithEmail replaces an existing email query param", () => {
  assert.equal(
    personalizeUriWithEmail(
      "https://suivelas.com/landing/oracion?email=old@example.com&utm_content=button",
      "ana@example.com",
    ),
    "https://suivelas.com/landing/oracion?email=ana%40example.com&utm_content=button",
  );
});

test("personalizeUriWithEmail leaves unrelated params untouched", () => {
  assert.equal(
    personalizeUriWithEmail(
      "https://suivelas.com/landing/oracion?utm_source=pdf&ref=guide",
      "ana@example.com",
    ),
    "https://suivelas.com/landing/oracion?utm_source=pdf&ref=guide&email=ana%40example.com",
  );
});

test("generatePersonalizedPdf rewrites uri link annotations and preserves non-uri actions", async () => {
  const templateBuffer = await createTemplatePdfBuffer();
  const personalizedBuffer = await generatePersonalizedPdf(
    templateBuffer,
    "ana@example.com",
  );

  const pdfDoc = await PDFDocument.load(personalizedBuffer);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  assert.ok(firstPage);

  const firstPageUris = getUriLinkTargets(firstPage);
  assert.deepEqual(firstPageUris, [
    "https://suivelas.com/landing/oracion?email=ana%40example.com",
    "https://suivelas.com/landing/oracion?utm_source=pdf&utm_medium=document&email=ana%40example.com",
    "https://suivelas.com/landing/oracion?email=ana%40example.com&utm_content=button",
  ]);

  const annots = firstPage.node.lookupMaybe(PDFName.of("Annots"), PDFArray);
  if (!annots) {
    throw new Error("Expected first page annotations");
  }

  const launchAnnotation = annots.lookup(3, PDFDict);
  const launchAction = launchAnnotation.lookup(PDFName.of("A"), PDFDict);
  assert.equal(launchAction.lookup(PDFName.of("S"), PDFName).toString(), "/Launch");
  assert.equal(
    launchAction.lookup(PDFName.of("F"), PDFString, PDFHexString).decodeText(),
    "/tmp/open-me",
  );

  const firstUriAnnotation = annots.lookup(0, PDFDict);
  const firstUriAction = firstUriAnnotation.lookup(PDFName.of("A"), PDFDict);
  const firstUriObject = firstUriAction.lookup(
    PDFName.of("URI"),
    PDFString,
    PDFHexString,
  );
  assert.ok(firstUriObject instanceof PDFString);
});

test("generatePersonalizedPdf does not throw for pages without annotations", async () => {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.addPage();

  const personalizedBuffer = await generatePersonalizedPdf(
    Buffer.from(await pdfDoc.save()),
    "ana@example.com",
  );

  const personalizedPdf = await PDFDocument.load(personalizedBuffer);
  assert.equal(personalizedPdf.getPages().length, 1);
});

test("generatePersonalizedPdf preserves hex string uri annotations when the original used hex", async () => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  const annotation = page.doc.context.obj({
    A: {
      S: PDFName.of("URI"),
      URI: PDFHexString.fromText("https://suivelas.com/landing/oracion"),
    },
    Border: [0, 0, 0],
    Rect: [0, 0, 100, 20],
    Subtype: PDFName.of("Link"),
    Type: PDFName.of("Annot"),
  });

  page.node.addAnnot(page.doc.context.register(annotation));

  const personalizedBuffer = await generatePersonalizedPdf(
    Buffer.from(await pdfDoc.save()),
    "ana@example.com",
  );

  const personalizedPdf = await PDFDocument.load(personalizedBuffer);
  const annots = personalizedPdf
    .getPages()[0]
    ?.node.lookupMaybe(PDFName.of("Annots"), PDFArray);

  if (!annots) {
    throw new Error("Expected annotations");
  }

  const uriAnnotation = annots.lookup(0, PDFDict);
  const uriAction = uriAnnotation.lookup(PDFName.of("A"), PDFDict);
  const uriObject = uriAction.lookup(PDFName.of("URI"), PDFString, PDFHexString);

  assert.ok(uriObject instanceof PDFHexString);
  assert.equal(
    uriObject.decodeText(),
    "https://suivelas.com/landing/oracion?email=ana%40example.com",
  );
});

async function createTemplatePdfBuffer() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  pdfDoc.addPage();

  addUriLinkAnnotation(page, "https://suivelas.com/landing/oracion");
  addUriLinkAnnotation(
    page,
    "https://suivelas.com/landing/oracion?utm_source=pdf&utm_medium=document",
  );
  addUriLinkAnnotation(
    page,
    "https://suivelas.com/landing/oracion?email=old@example.com&utm_content=button",
  );
  addLaunchLinkAnnotation(page);

  return Buffer.from(await pdfDoc.save());
}

function addUriLinkAnnotation(page: PDFPage, uri: string) {
  const annotation = page.doc.context.obj({
    A: {
      S: PDFName.of("URI"),
      URI: PDFString.of(uri),
    },
    Border: [0, 0, 0],
    Rect: [0, 0, 100, 20],
    Subtype: PDFName.of("Link"),
    Type: PDFName.of("Annot"),
  });

  page.node.addAnnot(page.doc.context.register(annotation));
}

function addLaunchLinkAnnotation(page: PDFPage) {
  const annotation = page.doc.context.obj({
    A: {
      F: PDFHexString.fromText("/tmp/open-me"),
      S: PDFName.of("Launch"),
    },
    Border: [0, 0, 0],
    Rect: [0, 0, 100, 20],
    Subtype: PDFName.of("Link"),
    Type: PDFName.of("Annot"),
  });

  page.node.addAnnot(page.doc.context.register(annotation));
}

function getUriLinkTargets(page: PDFPage) {
  const annots = page.node.lookupMaybe(PDFName.of("Annots"), PDFArray);
  if (!annots) {
    return [];
  }

  const uris: string[] = [];

  for (let index = 0; index < annots.size(); index += 1) {
    const annotation = annots.lookupMaybe(index, PDFDict);
    if (!annotation) {
      continue;
    }

    const action = annotation.lookupMaybe(PDFName.of("A"), PDFDict);
    if (!action) {
      continue;
    }

    const actionType = action.lookupMaybe(PDFName.of("S"), PDFName);
    if (!actionType || actionType.toString() !== "/URI") {
      continue;
    }

    const uri = action.lookupMaybe(PDFName.of("URI"), PDFString, PDFHexString);
    if (uri) {
      uris.push(uri.decodeText());
    }
  }

  return uris;
}
