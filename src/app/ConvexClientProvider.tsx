"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";
import { useMemo } from "react";

type ConvexClientProviderProps = {
  children: ReactNode;
};

export function ConvexClientProvider({ children }: ConvexClientProviderProps) {
  const deploymentUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

  if (!deploymentUrl) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL no esta configurado.");
  }

  const client = useMemo(
    () => new ConvexReactClient(deploymentUrl),
    [deploymentUrl],
  );

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
