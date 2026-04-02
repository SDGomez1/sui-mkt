import { Suspense } from "react";

import {
  RedirectLoadingState,
} from "@/components/redirects/TrackedRedirectClient";
import { buildGuiaOracionPdfDestination } from "@/lib/guiaOracionPdf";
import GuiaOracionRedirectClient from "./GuiaOracionRedirectClient";

type GuiaOracionRedirectPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function GuiaOracionRedirectPage({
  searchParams,
}: GuiaOracionRedirectPageProps) {
  const destination = buildGuiaOracionPdfDestination(await searchParams);

  return (
    <Suspense fallback={<RedirectLoadingState destination={destination} />}>
      <GuiaOracionRedirectClient />
    </Suspense>
  );
}
