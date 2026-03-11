"use client";

import { useDeferredValue, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type EmailSenderClientProps = {
  initialHtml: string;
};

const AUTH_USERNAME = "sui-admin";
const AUTH_PASSWORD = "sui-2026";

export function EmailSenderClient({ initialHtml }: EmailSenderClientProps) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState(initialHtml);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [loginUser, setLoginUser] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState<"idle" | "error">("idle");
  const [loginMessage, setLoginMessage] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const previewHtml = useDeferredValue(html);

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

    try {
      const response = await fetch("/api/ops/email9b7k", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, html }),
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
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Error enviando el correo.",
      );
    }
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginMessage("");
    const isValid =
      loginUser.trim() === AUTH_USERNAME &&
      loginPassword === AUTH_PASSWORD;

    if (!isValid) {
      setLoginStatus("error");
      setLoginMessage("Credenciales invalidas.");
      return;
    }

    setIsAuthed(true);
    setLoginStatus("idle");
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
          <Button type="submit">Entrar</Button>
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
        <Label htmlFor="to">To (separado por comas)</Label>
        <Input
          id="to"
          name="to"
          placeholder="nombre@dominio.com, otro@dominio.com"
          value={to}
          onChange={(event) => setTo(event.target.value)}
          required
        />
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
          Este HTML se enviara tal cual a Resend. Puedes editarlo libremente.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label>Previsualizacion</Label>
          <span className="text-xs text-[#6b6f8f]">
            Se actualiza automaticamente.
          </span>
        </div>
        {previewHtml.trim().length === 0 ? (
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
