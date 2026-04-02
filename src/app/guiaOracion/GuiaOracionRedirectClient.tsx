"use client";

import TrackedRedirectClient from "@/components/redirects/TrackedRedirectClient";
import { useSearchParams } from "next/navigation";
import { buildGuiaOracionPdfDestination } from "@/lib/guiaOracionPdf";

const EVENT_NAME = "guia_oracion_pdf_opened";

export default function GuiaOracionRedirectClient() {
  const searchParams = useSearchParams();
  const destination = buildGuiaOracionPdfDestination(searchParams);

  return (
    <TrackedRedirectClient
      destination={destination}
      eventName={EVENT_NAME}
    />
  );
}
