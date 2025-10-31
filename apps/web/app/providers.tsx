"use client";

import { type ReactNode, useMemo } from "react";
import { ConvexProvider, createConvexReactClient } from "@repo/convex";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

export function Providers({ children }: { children: ReactNode }) {
  const convexClient = useMemo(() => {
    if (!convexUrl) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Convex URL is not configured. Skipping ConvexProvider setup.");
      }
      return null;
    }
    return createConvexReactClient({ deploymentUrl: convexUrl });
  }, []);

  if (!convexClient) {
    return <>{children}</>;
  }

  return <ConvexProvider client={convexClient}>{children}</ConvexProvider>;
}
