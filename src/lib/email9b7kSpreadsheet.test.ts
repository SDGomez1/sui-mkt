import assert from "node:assert/strict";
import test from "node:test";
import * as XLSX from "xlsx";
import {
  buildSpreadsheetExample,
  getSpreadsheetColumns,
  parseRecipientSpreadsheet,
} from "@/lib/email9b7kSpreadsheet";

function createCsvFile(contents: string, name = "recipients.csv") {
  return new File([contents], name, { type: "text/csv" });
}

function createXlsxFile(rows: string[][], name = "recipients.xlsx") {
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.aoa_to_sheet(rows);

  XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");

  const bytes = XLSX.write(workbook, {
    type: "buffer",
    bookType: "xlsx",
  });

  return new File([bytes], name, {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
}

test("getSpreadsheetColumns appends email after custom tokens", () => {
  assert.deepEqual(getSpreadsheetColumns(["name"]), ["name", "email"]);
});

test("buildSpreadsheetExample updates rows from the current tokens", () => {
  assert.deepEqual(buildSpreadsheetExample(["name"]).headers, ["name", "email"]);
  assert.deepEqual(buildSpreadsheetExample(["utm_source"]).rows[0], [
    "meta",
    "ana@example.com",
  ]);
});

test("parseRecipientSpreadsheet accepts a valid csv file", async () => {
  const result = await parseRecipientSpreadsheet(
    createCsvFile("name,email\nAna,ana@example.com\nLuis,luis@example.com\n"),
    ["name"],
  );

  assert.equal(result.ok, true);

  if (!result.ok) {
    return;
  }

  assert.deepEqual(result.result.headers, ["name", "email"]);
  assert.deepEqual(result.result.rows, [
    {
      email: "ana@example.com",
      variables: { name: "Ana" },
    },
    {
      email: "luis@example.com",
      variables: { name: "Luis" },
    },
  ]);
  assert.deepEqual(result.result.validationErrors, []);
});

test("parseRecipientSpreadsheet accepts a valid xlsx file", async () => {
  const result = await parseRecipientSpreadsheet(
    createXlsxFile([
      ["name", "utm_source", "email"],
      ["Ana", "meta", "ana@example.com"],
      ["Luis", "google", "luis@example.com"],
    ]),
    ["name", "utm_source"],
  );

  assert.equal(result.ok, true);

  if (!result.ok) {
    return;
  }

  assert.deepEqual(result.result.previewRows, [
    ["Ana", "meta", "ana@example.com"],
    ["Luis", "google", "luis@example.com"],
  ]);
});

test("parseRecipientSpreadsheet rejects a wrong header order", async () => {
  const result = await parseRecipientSpreadsheet(
    createCsvFile("email,name\nana@example.com,Ana\n"),
    ["name"],
  );

  assert.equal(result.ok, false);

  if (result.ok) {
    return;
  }

  assert.equal(
    result.errors[0]?.message,
    "La cabecera del archivo no coincide con el formato esperado.",
  );
});

test("parseRecipientSpreadsheet rejects a missing email header", async () => {
  const result = await parseRecipientSpreadsheet(
    createCsvFile("name\nAna\n"),
    ["name"],
  );

  assert.equal(result.ok, false);

  if (result.ok) {
    return;
  }

  assert.match(result.errors[1]?.message ?? "", /Se esperaba: name, email\./);
});

test("parseRecipientSpreadsheet rejects extra populated columns", async () => {
  const result = await parseRecipientSpreadsheet(
    createCsvFile("name,email\nAna,ana@example.com,sobra\n"),
    ["name"],
  );

  assert.equal(result.ok, false);

  if (result.ok) {
    return;
  }

  assert.equal(
    result.errors[0]?.message,
    "Fila 1: hay columnas con datos fuera del formato esperado.",
  );
});

test("parseRecipientSpreadsheet rejects a blank file", async () => {
  const result = await parseRecipientSpreadsheet(createCsvFile(""), ["name"]);

  assert.equal(result.ok, false);

  if (result.ok) {
    return;
  }

  assert.equal(result.errors[0]?.message, "El archivo esta vacio.");
});

test("parseRecipientSpreadsheet ignores blank trailing rows", async () => {
  const result = await parseRecipientSpreadsheet(
    createCsvFile("name,email\nAna,ana@example.com\n,\n"),
    ["name"],
  );

  assert.equal(result.ok, true);

  if (!result.ok) {
    return;
  }

  assert.deepEqual(result.result.rows, [
    {
      email: "ana@example.com",
      variables: { name: "Ana" },
    },
  ]);
});

test("parseRecipientSpreadsheet surfaces row-level validation errors", async () => {
  const result = await parseRecipientSpreadsheet(
    createCsvFile("name,email\nAna,\n"),
    ["name"],
  );

  assert.equal(result.ok, true);

  if (!result.ok) {
    return;
  }

  assert.equal(result.result.validationErrors[0]?.field, "email");
  assert.equal(result.result.validationErrors[0]?.message, "Fila 1: el email es obligatorio.");
});
