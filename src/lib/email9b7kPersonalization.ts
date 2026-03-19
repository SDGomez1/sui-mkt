import { z } from "zod";

const TEMPLATE_TOKEN_REGEX = /\{\{\s*([A-Za-z][A-Za-z0-9_]*)\s*\}\}/g;

const emailSchema = z.string().email();

export type RecipientRow = {
  email: string;
  variables: Record<string, string>;
};

export type ValidationError = {
  rowIndex: number | null;
  field: "recipients" | "email" | "variable";
  token?: string;
  message: string;
};

export type ValidationResult = {
  valid: boolean;
  normalizedRows: RecipientRow[];
  errors: ValidationError[];
};

export function sanitizeEmailHtml(html: string): string {
  return html.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    "",
  );
}

export function extractTemplateTokens(html: string): string[] {
  const tokens = new Set<string>();

  for (const match of html.matchAll(TEMPLATE_TOKEN_REGEX)) {
    const token = match[1]?.trim();

    if (token) {
      tokens.add(token);
    }
  }

  return [...tokens];
}

export function renderPersonalizedHtml(html: string, row: RecipientRow): string {
  return html.replace(TEMPLATE_TOKEN_REGEX, (_, rawToken: string) => {
    const token = rawToken.trim();

    if (token === "email") {
      return row.email;
    }

    return row.variables[token] ?? "";
  });
}

export function validateRecipientRows(
  tokens: string[],
  rows: RecipientRow[],
): ValidationResult {
  const requiredTokens = tokens.filter((token) => token !== "email");
  const errors: ValidationError[] = [];
  const normalizedRows: RecipientRow[] = [];

  rows.forEach((row, rowIndex) => {
    const email = row.email.trim();
    const normalizedVariables = Object.fromEntries(
      requiredTokens.map((token) => [token, row.variables[token]?.trim() ?? ""]),
    );
    const extraValues = Object.values(row.variables).some(
      (value) => value.trim().length > 0,
    );
    const hasAnyValue =
      email.length > 0 ||
      extraValues ||
      Object.values(normalizedVariables).some((value) => value.length > 0);

    if (!hasAnyValue) {
      return;
    }

    if (email.length === 0) {
      errors.push({
        rowIndex,
        field: "email",
        message: `Fila ${rowIndex + 1}: el email es obligatorio.`,
      });
    } else if (!emailSchema.safeParse(email).success) {
      errors.push({
        rowIndex,
        field: "email",
        message: `Fila ${rowIndex + 1}: el email no es valido.`,
      });
    }

    for (const token of requiredTokens) {
      if (normalizedVariables[token].length === 0) {
        errors.push({
          rowIndex,
          field: "variable",
          token,
          message: `Fila ${rowIndex + 1}: falta el valor para ${token}.`,
        });
      }
    }

    normalizedRows.push({
      email,
      variables: normalizedVariables,
    });
  });

  if (normalizedRows.length === 0) {
    errors.push({
      rowIndex: null,
      field: "recipients",
      message: "Debes agregar al menos un destinatario.",
    });
  }

  return {
    valid: errors.length === 0,
    normalizedRows,
    errors,
  };
}
