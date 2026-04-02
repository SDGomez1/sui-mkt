import * as XLSX from "xlsx";
import {
  validateRecipientRows,
  type RecipientRow,
  type ValidationError,
} from "@/lib/email9b7kPersonalization";

const EMAIL_COLUMN = "email";

const TOKEN_SAMPLE_VALUES: Record<string, [string, string]> = {
  city: ["Bogota", "Medellin"],
  company: ["Sui", "Velas"],
  first_name: ["Ana", "Luis"],
  last_name: ["Gomez", "Rojas"],
  name: ["Ana", "Luis"],
  phone: ["3001234567", "3007654321"],
  plan: ["Premium", "Basico"],
  product: ["Guia de oracion", "Pack de velas"],
  utm_campaign: ["guia_oracion", "seguimiento"],
  utm_content: ["hero_cta", "recordatorio"],
  utm_medium: ["email", "paid_social"],
  utm_source: ["meta", "google"],
};

export type SpreadsheetImportError = {
  message: string;
  rowIndex?: number | null;
  field?: "header" | "file" | "row";
};

export type SpreadsheetImportResult = {
  headers: string[];
  rows: RecipientRow[];
  previewRows: string[][];
  validationErrors: ValidationError[];
};

export type SpreadsheetImportParseResult =
  | {
      ok: true;
      result: SpreadsheetImportResult;
    }
  | {
      ok: false;
      errors: SpreadsheetImportError[];
    };

function normalizeCellValue(value: unknown) {
  if (typeof value === "string") {
    return value.trim();
  }

  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

function isRowEmpty(row: string[]) {
  return row.every((value) => value.length === 0);
}

function trimTrailingEmptyCells(row: string[]) {
  let lastValueIndex = row.length - 1;

  while (lastValueIndex >= 0 && row[lastValueIndex].length === 0) {
    lastValueIndex -= 1;
  }

  return row.slice(0, lastValueIndex + 1);
}

function getExampleValue(token: string, rowIndex: number) {
  const samples = TOKEN_SAMPLE_VALUES[token];

  if (samples) {
    return samples[rowIndex] ?? samples[samples.length - 1];
  }

  return `${token}_${rowIndex + 1}`;
}

function formatExpectedHeaders(headers: string[]) {
  return headers.join(", ");
}

function getHeaderMismatchErrors(expectedHeaders: string[]) {
  return [
    {
      field: "header" as const,
      message: "La cabecera del archivo no coincide con el formato esperado.",
    },
    {
      field: "header" as const,
      message: `Se esperaba: ${formatExpectedHeaders(expectedHeaders)}.`,
    },
  ];
}

function extractRowsFromSheet(sheet: XLSX.WorkSheet) {
  const rows = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    raw: false,
    defval: "",
    blankrows: true,
  }) as unknown[][];

  return rows.map((row) => row.map(normalizeCellValue));
}

function buildRecipientRows(tokens: string[], dataRows: string[][]) {
  return dataRows.map((row) => ({
    email: row[tokens.length] ?? "",
    variables: Object.fromEntries(
      tokens.map((token, index) => [token, row[index] ?? ""]),
    ),
  }));
}

export function getSpreadsheetColumns(tokens: string[]) {
  return [...tokens.filter((token) => token !== EMAIL_COLUMN), EMAIL_COLUMN];
}

export function buildSpreadsheetExample(tokens: string[]) {
  const headers = getSpreadsheetColumns(tokens);

  return {
    headers,
    rows: [0, 1].map((rowIndex) =>
      headers.map((header) =>
        header === EMAIL_COLUMN
          ? rowIndex === 0
            ? "ana@example.com"
            : "luis@example.com"
          : getExampleValue(header, rowIndex),
      ),
    ),
  };
}

export async function parseRecipientSpreadsheet(
  file: File,
  tokens: string[],
): Promise<SpreadsheetImportParseResult> {
  const expectedHeaders = getSpreadsheetColumns(tokens);

  try {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, {
      type: "array",
    });
    const firstSheetName = workbook.SheetNames[0];

    if (!firstSheetName) {
      return {
        ok: false,
        errors: [
          {
            field: "file",
            message: "El archivo no contiene hojas para importar.",
          },
        ],
      };
    }

    const firstSheet = workbook.Sheets[firstSheetName];
    const sheetRows = extractRowsFromSheet(firstSheet);
    const headerRowIndex = sheetRows.findIndex((row) => !isRowEmpty(row));

    if (headerRowIndex === -1) {
      return {
        ok: false,
        errors: [
          {
            field: "file",
            message: "El archivo esta vacio.",
          },
        ],
      };
    }

    const headerRow = trimTrailingEmptyCells(sheetRows[headerRowIndex]);
    const normalizedHeaders = headerRow.slice(0, expectedHeaders.length);
    const duplicateHeaders = new Set<string>();
    const seenHeaders = new Set<string>();

    for (const header of headerRow.filter((value) => value.length > 0)) {
      if (seenHeaders.has(header)) {
        duplicateHeaders.add(header);
      }
      seenHeaders.add(header);
    }

    if (duplicateHeaders.size > 0) {
      return {
        ok: false,
        errors: [
          {
            field: "header",
            message: `La cabecera tiene columnas duplicadas: ${[
              ...duplicateHeaders,
            ].join(", ")}.`,
          },
          ...getHeaderMismatchErrors(expectedHeaders),
        ],
      };
    }

    if (
      headerRow.length !== expectedHeaders.length ||
      normalizedHeaders.some((header, index) => header !== expectedHeaders[index])
    ) {
      return {
        ok: false,
        errors: getHeaderMismatchErrors(expectedHeaders),
      };
    }

    const dataRows = sheetRows
      .slice(headerRowIndex + 1)
      .map((row) => row.slice(0, expectedHeaders.length).map(normalizeCellValue));
    const extraColumnError = dataRows.findIndex((row, rowIndex) =>
      sheetRows[headerRowIndex + rowIndex + 1]
        ?.slice(expectedHeaders.length)
        .some((value) => normalizeCellValue(value).length > 0),
    );

    if (extraColumnError !== -1) {
      return {
        ok: false,
        errors: [
          {
            field: "row",
            rowIndex: extraColumnError,
            message: `Fila ${extraColumnError + 1}: hay columnas con datos fuera del formato esperado.`,
          },
        ],
      };
    }

    const nonEmptyRows = dataRows.filter((row) => !isRowEmpty(row));
    const recipientRows = buildRecipientRows(tokens, nonEmptyRows);
    const validation = validateRecipientRows(tokens, recipientRows);

    if (!validation.valid && validation.normalizedRows.length === 0) {
      return {
        ok: false,
        errors: validation.errors.map((error) => ({
          field: error.field === "recipients" ? "file" : "row",
          rowIndex: error.rowIndex,
          message: error.message,
        })),
      };
    }

    return {
      ok: true,
      result: {
        headers: expectedHeaders,
        rows: recipientRows,
        previewRows: recipientRows.map((row) => [
          ...tokens.map((token) => row.variables[token] ?? ""),
          row.email,
        ]),
        validationErrors: validation.errors,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      errors: [
        {
          field: "file",
          message:
            error instanceof Error
              ? `No se pudo leer el archivo: ${error.message}`
              : "No se pudo leer el archivo.",
        },
      ],
    };
  }
}
