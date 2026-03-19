"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";

type TrackedRedirectClientProps = {
  destination: string;
  eventName: string;
};

const REDIRECT_DELAY_MS = 300;
const REDIRECT_FALLBACK_MS = 2000;

export function RedirectLoadingState({
  destination,
}: {
  destination: string;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 text-center text-[#1b1d33]">
      <div className="max-w-md space-y-3">
        <p className="text-lg font-semibold">Redirigiendo...</p>
        <p className="text-sm text-[#4a4a4a]">
          Si no continua,{" "}
          <a href={destination} className="underline">
            haz clic aqui
          </a>
          .
        </p>
      </div>
    </main>
  );
}

export default function TrackedRedirectClient({
  destination,
  eventName,
}: TrackedRedirectClientProps) {
  const pathname = usePathname();
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
    const utmTerm = searchParams.get("utm_term");
    const utmContent = searchParams.get("utm_content");

    const properties: Record<string, string> = {
      destination,
      source_path: pathname,
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
    if (utmTerm) {
      properties.utm_term = utmTerm;
    }
    if (utmContent) {
      properties.utm_content = utmContent;
    }

    try {
      posthog.capture(eventName, properties);
    } catch {
      // Ignore capture errors and continue to redirect.
    }

    let redirected = false;
    const redirect = () => {
      if (redirected) {
        return;
      }
      redirected = true;
      window.location.assign(destination);
    };

    const delayTimer = window.setTimeout(redirect, REDIRECT_DELAY_MS);
    const fallbackTimer = window.setTimeout(redirect, REDIRECT_FALLBACK_MS);

    return () => {
      window.clearTimeout(delayTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, [destination, eventName, pathname, searchParams]);

  return <RedirectLoadingState destination={destination} />;
}
