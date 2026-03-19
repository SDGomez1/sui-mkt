import { Suspense } from "react";

import {
  RedirectLoadingState,
} from "@/components/redirects/TrackedRedirectClient";
import SkoolRedirectClient from "./SkoolRedirectClient";

const REDIRECT_TARGET = "https://www.skool.com/conecta-con-dios-2729/about";

export default function SkoolRedirectPage() {
  return (
    <Suspense fallback={<RedirectLoadingState destination={REDIRECT_TARGET} />}>
      <SkoolRedirectClient />
    </Suspense>
  );
}
