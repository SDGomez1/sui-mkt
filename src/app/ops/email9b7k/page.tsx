import { EmailSenderClient } from "./EmailSenderClient";

export default function EmailSenderPage() {
  const baseHtml = "";

  return (
    <div className="min-h-screen bg-[#f7f6f2] px-6 py-12 text-[#1d2142]">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-[#8a8aa3]">
            Ops
          </p>
          <h1 className="text-3xl font-semibold">
            Enviar emails personalizados
          </h1>
          <p className="text-sm text-[#4b4f73]">
            Usa esta herramienta para enviar correos con HTML editable a traves
            de Resend.
          </p>
        </header>
        <EmailSenderClient initialHtml={baseHtml} />
      </div>
    </div>
  );
}
