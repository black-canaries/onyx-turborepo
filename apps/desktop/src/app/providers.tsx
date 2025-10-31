"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";
import { ConvexProvider, createConvexReactClient } from "@repo/convex";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

declare global {
  interface Window {
    desktopBridge?: {
      getPlatformInfo?: () => Promise<{ platform: string; version: string }>;
      openExternal?: (url: string) => Promise<void>;
    };
  }
}

export function Providers({ children }: { children: ReactNode }) {
  const convexClient = useMemo(() => {
    if (!convexUrl) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Convex URL is not configured. Skipping ConvexProvider setup.");
      }
      return null;
    }

    try {
      return createConvexReactClient({ deploymentUrl: convexUrl });
    } catch (error) {
      console.warn("Failed to initialise Convex client", error);
      return null;
    }
  }, []);

  const [platformInfo, setPlatformInfo] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!window.desktopBridge?.getPlatformInfo) {
        return;
      }
      try {
        const info = await window.desktopBridge.getPlatformInfo();
        setPlatformInfo(`${info.platform} v${info.version}`);
      } catch (error) {
        console.warn("Unable to fetch platform info", error);
      }
    }

    void load();
  }, []);

  return (
    <ConvexContextWrapper client={convexClient}>
      {platformInfo ? (
        <div className="fixed inset-x-0 bottom-3 mx-auto w-fit rounded-full bg-muted px-4 py-1 text-xs text-muted-foreground shadow">
          Running on {platformInfo}
        </div>
      ) : null}
      {children}
    </ConvexContextWrapper>
  );
}

function ConvexContextWrapper({
  client,
  children,
}: {
  client: ReturnType<typeof createConvexReactClient> | null;
  children: ReactNode;
}) {
  if (!client) {
    return <>{children}</>;
  }

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
