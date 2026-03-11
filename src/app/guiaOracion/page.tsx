import { Suspense } from "react";
import GuiaOracionRedirectClient from "./GuiaOracionRedirectClient";

const REDIRECT_TARGET = "/guiaOracion.pdf";

export default function GuiaOracionRedirectPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-white px-6 text-center text-[#1b1d33]">
          <div className="max-w-md space-y-3">
            <p className="text-lg font-semibold">Preparando tu descarga…</p>
            <p className="text-sm text-[#4a4a4a]">
              Si no inicia,{" "}
              <a href={REDIRECT_TARGET} className="underline">
                haz clic aquí
              </a>
              .
            </p>
          </div>
        </main>
      }
    >
      <GuiaOracionRedirectClient />
    </Suspense>
  );
}
