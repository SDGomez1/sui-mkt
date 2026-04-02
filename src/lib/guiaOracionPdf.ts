type SearchParamsRecord = Record<string, string | string[] | undefined>;
type SearchParamsLike = {
  entries(): IterableIterator<[string, string]>;
};

export const GUIDE_PDF_TEMPLATE_PATH = "public/guiaOracion.pdf";
export const GUIDE_PDF_ENDPOINT = "/api/guia-oracion-pdf";

export function buildGuiaOracionPdfDestination(
  searchParams?: SearchParamsLike | SearchParamsRecord,
) {
  const params = new URLSearchParams();

  if (searchParams && typeof searchParams.entries === "function") {
    for (const [key, value] of searchParams.entries()) {
      params.append(key, value);
    }
  } else if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (Array.isArray(value)) {
        for (const item of value) {
          params.append(key, item);
        }
        continue;
      }

      if (typeof value === "string") {
        params.append(key, value);
      }
    }
  }

  const query = params.toString();
  return query ? `${GUIDE_PDF_ENDPOINT}?${query}` : GUIDE_PDF_ENDPOINT;
}

export function personalizeUriWithEmail(uri: string, email: string) {
  try {
    const url = new URL(uri);
    url.searchParams.set("email", email);
    return url.toString();
  } catch {
    return uri;
  }
}

export async function generatePersonalizedPdf(
  templateBuffer: Buffer,
  userEmail: string,
) {
  const {
    PDFArray,
    PDFDict,
    PDFDocument,
    PDFHexString,
    PDFName,
    PDFString,
  } = await import("pdf-lib");

  const annotsKey = PDFName.of("Annots");
  const actionKey = PDFName.of("A");
  const actionTypeKey = PDFName.of("S");
  const linkSubtype = PDFName.of("Link");
  const subtypeKey = PDFName.of("Subtype");
  const uriAction = PDFName.of("URI");
  const uriKey = PDFName.of("URI");

  const pdfDoc = await PDFDocument.load(templateBuffer);

  for (const page of pdfDoc.getPages()) {
    const annots = page.node.lookupMaybe(annotsKey, PDFArray);
    if (!annots) {
      continue;
    }

    for (let index = 0; index < annots.size(); index += 1) {
      const annotation = annots.lookupMaybe(index, PDFDict);
      if (!annotation) {
        continue;
      }

      const subtype = annotation.lookupMaybe(subtypeKey, PDFName);
      if (!subtype || subtype.toString() !== linkSubtype.toString()) {
        continue;
      }

      const action = annotation.lookupMaybe(actionKey, PDFDict);
      if (!action) {
        continue;
      }

      const actionType = action.lookupMaybe(actionTypeKey, PDFName);
      if (!actionType || actionType.toString() !== uriAction.toString()) {
        continue;
      }

      const uri = action.lookupMaybe(uriKey, PDFString, PDFHexString);
      if (!uri) {
        continue;
      }

      const personalizedUri = personalizeUriWithEmail(
        uri.decodeText(),
        userEmail,
      );

      action.set(
        uriKey,
        uri instanceof PDFHexString
          ? PDFHexString.fromText(personalizedUri)
          : PDFString.of(personalizedUri),
      );
    }
  }

  return Buffer.from(await pdfDoc.save());
}
