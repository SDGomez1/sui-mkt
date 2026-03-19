import assert from "node:assert/strict";
import test from "node:test";
import {
  extractTemplateTokens,
  renderPersonalizedHtml,
  sanitizeEmailHtml,
  validateRecipientRows,
} from "@/lib/email9b7kPersonalization";

test("extractTemplateTokens supports whitespace and deduplicates tokens", () => {
  const html =
    "<p>{{ name }}</p><a href='/?utm={{utm_source}}&name={{name}}'>Link</a>";

  assert.deepEqual(extractTemplateTokens(html), ["name", "utm_source"]);
});

test("renderPersonalizedHtml resolves email and custom variables", () => {
  const html = "<p>Hola {{name}}</p><a href='/?email={{ email }}'>Abrir</a>";

  assert.equal(
    renderPersonalizedHtml(html, {
      email: "ana@example.com",
      variables: { name: "Ana" },
    }),
    "<p>Hola Ana</p><a href='/?email=ana@example.com'>Abrir</a>",
  );
});

test("sanitizeEmailHtml removes script tags but keeps markup", () => {
  const html =
    "<div>Antes</div><script>window.location='/x'</script><p>Despues</p>";

  assert.equal(sanitizeEmailHtml(html), "<div>Antes</div><p>Despues</p>");
});

test("validateRecipientRows reports missing variable values with row context", () => {
  const validation = validateRecipientRows(["name"], [
    {
      email: "ana@example.com",
      variables: { name: "" },
    },
  ]);

  assert.equal(validation.valid, false);
  assert.equal(validation.errors[0]?.rowIndex, 0);
  assert.equal(validation.errors[0]?.field, "variable");
  assert.equal(validation.errors[0]?.token, "name");
});

test("validateRecipientRows rejects invalid emails", () => {
  const validation = validateRecipientRows([], [
    {
      email: "correo-invalido",
      variables: {},
    },
  ]);

  assert.equal(validation.valid, false);
  assert.equal(validation.errors[0]?.field, "email");
});

test("validateRecipientRows allows bulk rows when the template has no custom tokens", () => {
  const validation = validateRecipientRows([], [
    {
      email: "ana@example.com",
      variables: {},
    },
    {
      email: "luis@example.com",
      variables: {},
    },
    {
      email: "",
      variables: {},
    },
  ]);

  assert.equal(validation.valid, true);
  assert.deepEqual(
    validation.normalizedRows.map((row) => row.email),
    ["ana@example.com", "luis@example.com"],
  );
});
