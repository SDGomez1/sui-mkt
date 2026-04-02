"use client";

import {
  Fragment,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  extractTemplateTokens,
  renderPersonalizedHtml,
  sanitizeEmailHtml,
  validateRecipientRows,
  type RecipientRow,
  type ValidationError,
} from "@/lib/email9b7kPersonalization";
import {
  buildSpreadsheetExample,
  getSpreadsheetColumns,
  parseRecipientSpreadsheet,
  type SpreadsheetImportError,
  type SpreadsheetImportResult,
} from "@/lib/email9b7kSpreadsheet";

type EmailSenderClientProps = {
  initialHtml: string;
};

type RowFieldErrors = {
  email?: string;
  variables: Record<string, string>;
};

type ImportState = {
  status: "idle" | "parsing" | "ready" | "error";
  fileName: string;
  message: string;
  errors: SpreadsheetImportError[];
  result: SpreadsheetImportResult | null;
};

function createEmptyRecipientRow(tokens: string[]): RecipientRow {
  return {
    email: "",
    variables: Object.fromEntries(tokens.map((token) => [token, ""])),
  };
}

function syncRecipientRows(rows: RecipientRow[], tokens: string[]): RecipientRow[] {
  const nextRows = rows.length > 0 ? rows : [createEmptyRecipientRow(tokens)];

  return nextRows.map((row) => ({
    email: row.email,
    variables: Object.fromEntries(
      tokens.map((token) => [token, row.variables[token] ?? ""]),
    ),
  }));
}

function areRecipientRowsEqual(current: RecipientRow[], next: RecipientRow[]) {
  return JSON.stringify(current) === JSON.stringify(next);
}

function mapValidationErrors(errors: ValidationError[]) {
  const nextMap: Record<number, RowFieldErrors> = {};

  for (const error of errors) {
    if (error.rowIndex === null) {
      continue;
    }

    const currentRow =
      nextMap[error.rowIndex] ?? {
        variables: {},
      };

    if (error.field === "email") {
      currentRow.email = error.message;
    }

    if (error.field === "variable" && error.token) {
      currentRow.variables[error.token] = error.message;
    }

    nextMap[error.rowIndex] = currentRow;
  }

  return nextMap;
}

function createEmptyImportState(): ImportState {
  return {
    status: "idle",
    fileName: "",
    message: "",
    errors: [],
    result: null,
  };
}

function formatRowCountLabel(count: number) {
  return `${count} ${count === 1 ? "fila" : "filas"}`;
}

export function EmailSenderClient({ initialHtml }: EmailSenderClientProps) {
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState(initialHtml);
  const customTokens = extractTemplateTokens(html).filter(
    (token) => token !== "email",
  );
  const tokensKey = customTokens.join("|");
  const spreadsheetColumns = getSpreadsheetColumns(customTokens);
  const spreadsheetExample = buildSpreadsheetExample(customTokens);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [recipients, setRecipients] = useState<RecipientRow[]>([
    createEmptyRecipientRow(customTokens),
  ]);
  const [previewRecipients, setPreviewRecipients] = useState<RecipientRow[]>([
    createEmptyRecipientRow(customTokens),
  ]);
  const [rowErrors, setRowErrors] = useState<Record<number, RowFieldErrors>>({});
  const [importState, setImportState] = useState<ImportState>(
    createEmptyImportState(),
  );
  const [previewRowIndex, setPreviewRowIndex] = useState(0);
  const [loginUser, setLoginUser] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState<
    "idle" | "loading" | "error"
  >("idle");
  const [loginMessage, setLoginMessage] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const previewHtml = useDeferredValue(
    sanitizeEmailHtml(
      renderPersonalizedHtml(
        html,
        previewRecipients[previewRowIndex] ??
          createEmptyRecipientRow(customTokens),
      ),
    ),
  );
  const verifyLogin = useMutation(api.adminLogin.verify);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const nextTokens = tokensKey.length > 0 ? tokensKey.split("|") : [];

    setRecipients((current) => {
      const next = syncRecipientRows(current, nextTokens);
      return areRecipientRowsEqual(current, next) ? current : next;
    });
    setPreviewRecipients((current) => {
      const next = syncRecipientRows(current, nextTokens);
      return areRecipientRowsEqual(current, next) ? current : next;
    });
    setImportState(createEmptyImportState());
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [tokensKey]);

  useEffect(() => {
    setPreviewRowIndex((current) =>
      recipients.length === 0 ? 0 : Math.min(current, recipients.length - 1),
    );
  }, [recipients.length]);

  useEffect(() => {
    if (!isAuthed) {
      return;
    }

    if (initialHtml.trim().length > 0) {
      return;
    }

    let isMounted = true;

    const loadTemplate = async () => {
      try {
        const response = await fetch("/api/ops/email9b7k/template");
        if (!response.ok) {
          throw new Error("No se pudo cargar la plantilla.");
        }
        const payload = await response.json();
        if (isMounted && typeof payload?.html === "string") {
          setHtml(payload.html);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadTemplate();

    return () => {
      isMounted = false;
    };
  }, [initialHtml, isAuthed]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    setRowErrors({});

    const validation = validateRecipientRows(customTokens, recipients);

    if (!validation.valid) {
      setStatus("error");
      setMessage(validation.errors[0]?.message ?? "Datos invalidos.");
      setRowErrors(mapValidationErrors(validation.errors));
      return;
    }

    try {
      const response = await fetch("/api/ops/email9b7k", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          html,
          recipients: validation.normalizedRows,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        const errorMessage =
          payload?.error?.message ||
          payload?.error ||
          "Error enviando el correo.";
        throw new Error(errorMessage);
      }

      setStatus("success");
      setMessage("Correo enviado correctamente.");
      setRowErrors({});
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Error enviando el correo.",
      );
    }
  };

  const handleRecipientChange = (
    rowIndex: number,
    field: "email" | "variable",
    value: string,
    token?: string,
  ) => {
    setRecipients((current) =>
      current.map((row, currentIndex) => {
        if (currentIndex !== rowIndex) {
          return row;
        }

        if (field === "email") {
          return {
            ...row,
            email: value,
          };
        }

        if (!token) {
          return row;
        }

        return {
          ...row,
          variables: {
            ...row.variables,
            [token]: value,
          },
        };
      }),
    );

    setRowErrors((current) => {
      if (!current[rowIndex]) {
        return current;
      }

      const next = { ...current };
      const nextRow = {
        email: current[rowIndex]?.email,
        variables: { ...current[rowIndex].variables },
      };

      if (field === "email") {
        delete nextRow.email;
      } else if (token) {
        delete nextRow.variables[token];
      }

      if (!nextRow.email && Object.keys(nextRow.variables).length === 0) {
        delete next[rowIndex];
      } else {
        next[rowIndex] = nextRow;
      }

      return next;
    });
  };

  const resetImportState = () => {
    setImportState(createEmptyImportState());
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSpreadsheetUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      resetImportState();
      return;
    }

    setImportState({
      status: "parsing",
      fileName: file.name,
      message: "Leyendo archivo...",
      errors: [],
      result: null,
    });

    const result = await parseRecipientSpreadsheet(file, customTokens);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (!result.ok) {
      setImportState({
        status: "error",
        fileName: file.name,
        message: result.errors[0]?.message ?? "No se pudo importar el archivo.",
        errors: result.errors,
        result: null,
      });
      return;
    }

    const validationCount = result.result.validationErrors.length;
    const importMessage =
      validationCount > 0
        ? `Se importaron ${formatRowCountLabel(
            result.result.rows.length,
          )} con observaciones. Puedes reemplazarlas y corregirlas en la tabla.`
        : `Archivo listo. Se detectaron ${formatRowCountLabel(
            result.result.rows.length,
          )} para revisar antes de reemplazar.`;

    setImportState({
      status: "ready",
      fileName: file.name,
      message: importMessage,
      errors: [],
      result: result.result,
    });
  };

  const applyImportedRows = () => {
    if (!importState.result) {
      return;
    }

    const nextRows = syncRecipientRows(importState.result.rows, customTokens);

    setRecipients(nextRows);
    setPreviewRecipients(nextRows);
    setPreviewRowIndex(0);
    setRowErrors(mapValidationErrors(importState.result.validationErrors));
    resetImportState();
  };

  const addRecipientRow = () => {
    const nextRow = createEmptyRecipientRow(customTokens);
    setRecipients((current) => [...current, nextRow]);
    setPreviewRecipients((current) => [...current, nextRow]);
    setPreviewRowIndex(recipients.length);
  };

  const removeRecipientRow = (rowIndex: number) => {
    setRecipients((current) => {
      const next = current.filter((_, currentIndex) => currentIndex !== rowIndex);

      return next.length > 0 ? next : [createEmptyRecipientRow(customTokens)];
    });
    setPreviewRecipients((current) => {
      const next = current.filter((_, currentIndex) => currentIndex !== rowIndex);

      return next.length > 0 ? next : [createEmptyRecipientRow(customTokens)];
    });
    setRowErrors((current) => {
      const nextEntries = Object.entries(current).flatMap(([key, value]) => {
        const numericKey = Number(key);

        if (numericKey === rowIndex) {
          return [];
        }

        const nextKey = numericKey > rowIndex ? numericKey - 1 : numericKey;
        return [[nextKey, value] as const];
      });

      return Object.fromEntries(nextEntries);
    });
  };

  const commitRecipientsToPreview = () => {
    setPreviewRecipients(syncRecipientRows(recipients, customTokens));
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginMessage("");
    setLoginStatus("loading");

    try {
      const isValid = await verifyLogin({
        username: loginUser.trim(),
        password: loginPassword,
      });

      if (!isValid) {
        setLoginStatus("error");
        setLoginMessage("Credenciales invalidas.");
        return;
      }

      setIsAuthed(true);
      setLoginStatus("idle");
    } catch (error) {
      console.error(error);
      setLoginStatus("error");
      setLoginMessage(
        error instanceof Error ? error.message : "Error autenticando.",
      );
    }
  };

  if (!isAuthed) {
    return (
      <form
        onSubmit={handleLogin}
        className="space-y-6 rounded-3xl bg-white/90 p-6 shadow-[0_20px_60px_-40px_rgba(21,23,55,0.5)] sm:p-8"
      >
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Acceso</h2>
          <p className="text-sm text-[#4b4f73]">
            Ingresa tus credenciales para desbloquear el envio de correos.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Usuario</Label>
          <Input
            id="username"
            name="username"
            value={loginUser}
            onChange={(event) => setLoginUser(event.target.value)}
            autoComplete="username"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={loginPassword}
            onChange={(event) => setLoginPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" disabled={loginStatus === "loading"}>
            {loginStatus === "loading" ? "Verificando..." : "Entrar"}
          </Button>
          {loginMessage ? (
            <p className="text-sm text-red-600">{loginMessage}</p>
          ) : null}
        </div>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl bg-white/90 p-6 shadow-[0_20px_60px_-40px_rgba(21,23,55,0.5)] sm:p-8"
    >
      <div className="space-y-2">
        <Label htmlFor="from">From</Label>
        <div className="rounded-xl border border-[#e2e0db] bg-[#f7f6f2] px-4 py-3 text-sm">
          Sui &lt;crecimiento@suivelas.com&gt;
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          name="subject"
          placeholder="Asunto del correo"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="html">HTML</Label>
        <Textarea
          id="html"
          name="html"
          value={html}
          onChange={(event) => setHtml(event.target.value)}
          className="min-h-[320px] font-mono text-xs"
          required
        />
        <p className="text-xs text-[#6b6f8f]">
          Usa placeholders como {"{{name}}"} o {"{{utm_source}}"} para
          personalizar cada destinatario. {"{{email}}"} siempre esta
          disponible. El preview ignora scripts por seguridad.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label>Variables detectadas</Label>
          <span className="text-xs text-[#6b6f8f]">
            Se generan desde el HTML.
          </span>
        </div>
        <div className="rounded-2xl border border-[#e2e0db] bg-[#f7f6f2] px-4 py-3 text-sm text-[#4b4f73]">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#1d2142]">
              email
            </span>
            {customTokens.length > 0 ? (
              customTokens.map((token) => (
                <span
                  key={token}
                  className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#1d2142]"
                >
                  {token}
                </span>
              ))
            ) : (
              <span className="text-xs text-[#6b6f8f]">
                No hay variables personalizadas en el template.
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-[#e2e0db] bg-[#f7f6f2] p-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Label className="text-sm font-medium text-[#1d2142]">
              Formato del Excel
            </Label>
            <span className="text-xs text-[#6b6f8f]">
              CSV y XLSX, con `email` siempre al final.
            </span>
          </div>
          <p className="text-xs text-[#6b6f8f]">
            La fila 1 debe tener las columnas en este orden exacto. Desde la
            fila 2 van los datos.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b6f8f]">
            Cabecera esperada
          </p>
          <div className="flex flex-wrap gap-2">
            {spreadsheetColumns.map((column) => (
              <span
                key={column}
                className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#1d2142]"
              >
                {column}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b6f8f]">
            Ejemplo en tiempo real
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[#e2e0db] bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#fbfaf7] text-xs uppercase tracking-[0.2em] text-[#6b6f8f]">
                <tr>
                  {spreadsheetExample.headers.map((header) => (
                    <th key={header} className="px-3 py-2 font-semibold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {spreadsheetExample.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-t border-[#f0eee8]">
                    {row.map((value, cellIndex) => (
                      <td key={`${rowIndex}-${cellIndex}`} className="px-3 py-2 text-[#4b4f73]">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-[#e2e0db] bg-white p-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Label htmlFor="spreadsheet-upload">Importar destinatarios</Label>
            <span className="text-xs text-[#6b6f8f]">
              Sube un archivo y revisa el resultado antes de reemplazar la
              tabla.
            </span>
          </div>
          <Input
            ref={fileInputRef}
            id="spreadsheet-upload"
            type="file"
            accept=".xlsx,.csv,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={handleSpreadsheetUpload}
          />
        </div>

        {importState.status !== "idle" ? (
          <div className="space-y-3 rounded-2xl border border-[#e2e0db] bg-[#f7f6f2] p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-[#1d2142]">
                  {importState.fileName}
                </p>
                <p className="text-xs text-[#6b6f8f]">{importState.message}</p>
              </div>
              {importState.status === "parsing" ? (
                <span className="text-xs font-medium text-[#6b6f8f]">
                  Procesando...
                </span>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-[#6b6f8f]">
              <span>Cabecera esperada:</span>
              <span className="font-medium text-[#1d2142]">
                {spreadsheetColumns.join(", ")}
              </span>
            </div>

            {importState.status === "error" ? (
              <div className="space-y-2">
                {importState.errors.map((error, index) => (
                  <p key={`${error.message}-${index}`} className="text-sm text-red-600">
                    {error.message}
                  </p>
                ))}
              </div>
            ) : null}

            {importState.status === "ready" && importState.result ? (
              <Fragment>
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b6f8f]">
                    Preview de importacion
                  </p>
                  <div className="overflow-x-auto rounded-2xl border border-[#e2e0db] bg-white">
                    <table className="min-w-full text-left text-sm">
                      <thead className="bg-[#fbfaf7] text-xs uppercase tracking-[0.2em] text-[#6b6f8f]">
                        <tr>
                          {importState.result.headers.map((header) => (
                            <th key={header} className="px-3 py-2 font-semibold">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {importState.result.previewRows.slice(0, 5).map((row, rowIndex) => (
                          <tr key={rowIndex} className="border-t border-[#f0eee8]">
                            {row.map((value, cellIndex) => (
                              <td
                                key={`${rowIndex}-${cellIndex}`}
                                className="px-3 py-2 text-[#4b4f73]"
                              >
                                {value || "—"}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-[#6b6f8f]">
                    {formatRowCountLabel(importState.result.rows.length)} detectadas.
                    {importState.result.previewRows.length > 5
                      ? " Se muestran solo las primeras 5."
                      : ""}
                  </p>
                </div>

                {importState.result.validationErrors.length > 0 ? (
                  <div className="space-y-2 rounded-2xl border border-amber-200 bg-amber-50 p-3">
                    <p className="text-sm font-medium text-amber-900">
                      Observaciones en las filas importadas
                    </p>
                    {importState.result.validationErrors.slice(0, 5).map((error, index) => (
                      <p key={`${error.message}-${index}`} className="text-sm text-amber-900">
                        {error.message}
                      </p>
                    ))}
                    {importState.result.validationErrors.length > 5 ? (
                      <p className="text-xs text-amber-900">
                        Hay mas observaciones. Si reemplazas la tabla, podras verlas
                        y corregirlas fila por fila.
                      </p>
                    ) : null}
                  </div>
                ) : null}

                <div className="flex flex-wrap items-center gap-3">
                  <Button type="button" onClick={applyImportedRows}>
                    Reemplazar filas actuales
                  </Button>
                  <Button type="button" variant="outline" onClick={resetImportState}>
                    Cancelar importacion
                  </Button>
                </div>
              </Fragment>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label>Destinatarios</Label>
          <Button type="button" variant="outline" onClick={addRecipientRow}>
            Agregar fila
          </Button>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-[#e2e0db]">
          <div
            className="grid min-w-[720px] gap-px bg-[#e2e0db]"
            style={{
              gridTemplateColumns: `80px repeat(${customTokens.length}, minmax(180px, 1fr)) minmax(220px, 1.4fr) 120px`,
            }}
          >
            <div className="bg-[#f7f6f2] px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6b6f8f]">
              Preview
            </div>
            {customTokens.map((token) => (
              <div
                key={token}
                className="bg-[#f7f6f2] px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6b6f8f]"
              >
                {token}
              </div>
            ))}
            <div className="bg-[#f7f6f2] px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6b6f8f]">
              Email
            </div>
            <div className="bg-[#f7f6f2] px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6b6f8f]">
              Accion
            </div>

            {recipients.map((recipient, rowIndex) => (
              <Fragment key={rowIndex}>
                <div
                  className="bg-white px-3 py-3"
                >
                  <Button
                    type="button"
                    variant={previewRowIndex === rowIndex ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewRowIndex(rowIndex)}
                  >
                    {previewRowIndex === rowIndex ? "Activa" : "Ver"}
                  </Button>
                </div>
                {customTokens.map((token) => (
                  <div key={`${token}-${rowIndex}`} className="bg-white px-3 py-3">
                    <Input
                      placeholder={`Valor para ${token}`}
                      value={recipient.variables[token] ?? ""}
                      onBlur={commitRecipientsToPreview}
                      onChange={(event) =>
                        handleRecipientChange(
                          rowIndex,
                          "variable",
                          event.target.value,
                          token,
                        )
                      }
                      className={
                        rowErrors[rowIndex]?.variables[token]
                          ? "border-red-500"
                          : undefined
                      }
                    />
                    {rowErrors[rowIndex]?.variables[token] ? (
                      <p className="mt-1 text-xs text-red-600">
                        {rowErrors[rowIndex].variables[token]}
                      </p>
                    ) : null}
                  </div>
                ))}
                <div className="bg-white px-3 py-3">
                  <Input
                    type="email"
                    placeholder="nombre@dominio.com"
                    value={recipient.email}
                    onBlur={commitRecipientsToPreview}
                    onChange={(event) =>
                      handleRecipientChange(
                        rowIndex,
                        "email",
                        event.target.value,
                      )
                    }
                    className={
                      rowErrors[rowIndex]?.email ? "border-red-500" : undefined
                    }
                  />
                  {rowErrors[rowIndex]?.email ? (
                    <p className="mt-1 text-xs text-red-600">
                      {rowErrors[rowIndex].email}
                    </p>
                  ) : null}
                </div>
                <div className="bg-white px-3 py-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRecipientRow(rowIndex)}
                  >
                    Eliminar
                  </Button>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label>Previsualizacion</Label>
          <span className="text-xs text-[#6b6f8f]">
            Se actualiza con la fila seleccionada.
          </span>
        </div>
        {html.trim().length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#e2e0db] bg-[#f7f6f2] px-4 py-6 text-sm text-[#6b6f8f]">
            No hay HTML para mostrar. Agrega contenido para ver el preview.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-[#e2e0db] bg-white">
            <iframe
              title="Email preview"
              className="h-[520px] w-full bg-white"
              srcDoc={previewHtml}
              sandbox=""
            />
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Enviando..." : "Enviar email"}
        </Button>
        {message ? (
          <p
            className={`text-sm ${
              status === "success" ? "text-emerald-700" : "text-red-600"
            }`}
          >
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
