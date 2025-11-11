"use client";

import { type ReactNode, useMemo } from "react";
import { ConvexAuthProvider, createConvexReactClient } from "@repo/convex/client";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

export function Providers({ children }: { children: ReactNode }) {
  const convexClient = useMemo(() => {
    if (!convexUrl) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Convex URL is not configured. Skipping ConvexAuthProvider setup.");
      }
      return null;
    }
    return createConvexReactClient({ deploymentUrl: convexUrl });
  }, []);

  if (!convexClient) {
    return <>{children}</>;
  }

  return <ConvexAuthProvider client={convexClient}>{children}</ConvexAuthProvider>;
}
