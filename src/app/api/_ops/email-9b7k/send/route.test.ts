import assert from "node:assert/strict";
import test from "node:test";
import { sendPersonalizedEmails } from "@/app/api/_ops/email-9b7k/send/sendPersonalizedEmails";

test("sendPersonalizedEmails uses batch send with personalized html per recipient", async () => {
  let batchPayload:
    | Array<{
        from: string;
        to: string;
        subject: string;
        html: string;
      }>
    | undefined;

  const response = await sendPersonalizedEmails(
    {
      subject: "Hola",
      html: "<p>Hola {{name}}</p><a href='/?utm={{utm_source}}&email={{email}}'>Abrir</a>",
      recipients: [
        {
          email: "ana@example.com",
          variables: {
            name: "Ana",
            utm_source: "meta",
          },
        },
        {
          email: "luis@example.com",
          variables: {
            name: "Luis",
            utm_source: "google",
          },
        },
      ],
    },
    {
      batch: {
        send: async (payload) => {
          batchPayload = payload;
          return {
            data: {
              data: [{ id: "id-1" }, { id: "id-2" }],
            },
          };
        },
      },
      emails: {
        send: async () => {
          throw new Error("emails.send should not be called");
        },
      },
    },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(batchPayload, [
    {
      from: "Sui <crecimiento@suivelas.com>",
      to: "ana@example.com",
      subject: "Hola",
      html: "<p>Hola Ana</p><a href='/?utm=meta&email=ana@example.com'>Abrir</a>",
    },
    {
      from: "Sui <crecimiento@suivelas.com>",
      to: "luis@example.com",
      subject: "Hola",
      html: "<p>Hola Luis</p><a href='/?utm=google&email=luis@example.com'>Abrir</a>",
    },
  ]);
});

test("sendPersonalizedEmails uses single-send path for one recipient", async () => {
  let singlePayload:
    | {
        from: string;
        to: string[];
        subject: string;
        html: string;
      }
    | undefined;

  const response = await sendPersonalizedEmails(
    {
      subject: "Hola",
      html: "<p>Hola {{name}}</p>",
      recipients: [
        {
          email: "ana@example.com",
          variables: {
            name: "Ana",
          },
        },
      ],
    },
    {
      batch: {
        send: async () => {
          throw new Error("batch.send should not be called");
        },
      },
      emails: {
        send: async (payload) => {
          singlePayload = payload;
          return {
            data: { id: "single-id" },
          };
        },
      },
    },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(singlePayload, {
    from: "Sui <crecimiento@suivelas.com>",
    to: ["ana@example.com"],
    subject: "Hola",
    html: "<p>Hola Ana</p>",
  });

  const payload = await response.json();
  assert.equal(payload.id, "single-id");
});

test("sendPersonalizedEmails blocks sends when a referenced variable is missing", async () => {
  let called = false;

  const response = await sendPersonalizedEmails(
    {
      subject: "Hola",
      html: "<p>Hola {{name}}</p>",
      recipients: [
        {
          email: "ana@example.com",
          variables: {},
        },
      ],
    },
    {
      batch: {
        send: async () => {
          called = true;
          return { data: { data: [] } };
        },
      },
      emails: {
        send: async () => {
          called = true;
          return { data: { id: "should-not-send" } };
        },
      },
    },
  );

  assert.equal(response.status, 400);
  assert.equal(called, false);

  const payload = await response.json();
  assert.equal(payload.error.message, "Fila 1: falta el valor para name.");
});
