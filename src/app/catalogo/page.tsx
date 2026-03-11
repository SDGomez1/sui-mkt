"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import posthog from "posthog-js";

const REDIRECT_TARGET = "/Catalogo.pdf";
const EVENT_NAME = "catalogo_pdf_opened";
const REDIRECT_DELAY_MS = 300;
const REDIRECT_FALLBACK_MS = 2000;

export default function CatalogoRedirectPage() {
  const searchParams = useSearchParams();
  const hasCapturedRef = useRef(false);

  useEffect(() => {
    if (hasCapturedRef.current) {
      return;
    }
    hasCapturedRef.current = true;

    const utmSource = searchParams.get("utm_source");
    const utmMedium = searchParams.get("utm_medium");
    const utmCampaign = searchParams.get("utm_campaign");
    const email = searchParams.get("email");
    const utmContent = searchParams.get("utm_content");

    const properties: Record<string, string> = {
      destination: REDIRECT_TARGET,
    };

    if (utmSource) {
      properties.utm_source = utmSource;
    }
    if (utmMedium) {
      properties.utm_medium = utmMedium;
    }
    if (utmCampaign) {
      properties.utm_campaign = utmCampaign;
    }
    if (utmContent) {
      properties.utm_content = utmContent;
    }

    try {
      posthog.capture(EVENT_NAME, properties);
    } catch {
      // Ignore capture errors and continue to redirect.
    }

    let redirected = false;
    const redirect = () => {
      if (redirected) {
        return;
      }
      redirected = true;
      window.location.assign(REDIRECT_TARGET);
    };

    const delayTimer = window.setTimeout(redirect, REDIRECT_DELAY_MS);
    const fallbackTimer = window.setTimeout(redirect, REDIRECT_FALLBACK_MS);

    return () => {
      window.clearTimeout(delayTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, [searchParams]);

  return (
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
  );
}
