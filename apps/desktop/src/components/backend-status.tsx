"use client";

import { useMemo } from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui";
import { createSupabaseBrowserClient } from "@repo/supabase";
import { createConvexReactClient } from "@repo/convex";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

export function BackendStatus() {
  const supabaseClient = useMemo(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
      return null;
    }

    try {
      return createSupabaseBrowserClient({
        supabaseUrl,
        supabaseKey: supabaseAnonKey,
      });
    } catch (error) {
      console.warn("Failed to initialise Supabase client", error);
      return null;
    }
  }, []);

  const convexClient = useMemo(() => {
    if (!convexUrl) {
      return null;
    }

    try {
      return createConvexReactClient({ deploymentUrl: convexUrl });
    } catch (error) {
      console.warn("Failed to initialise Convex client", error);
      return null;
    }
  }, []);

  const integrations = [
    {
      id: "supabase",
      title: "Supabase",
      description: "EXPO/NEXT public keys enable realtime auth & storage across form factors.",
      configured: Boolean(supabaseClient),
      docs: "https://supabase.com/docs",
    },
    {
      id: "convex",
      title: "Convex",
      description: "Bring reactive data-layer helpers into the desktop shell with one import.",
      configured: Boolean(convexClient),
      docs: "https://docs.convex.dev",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {integrations.map((integration) => (
        <Card key={integration.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-3 text-base">
              {integration.title}
              <Badge variant={integration.configured ? "secondary" : "destructive"}>
                {integration.configured ? "Connected" : "Awaiting env"}
              </Badge>
            </CardTitle>
            <CardDescription>{integration.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground">
              {integration.configured ? "Clients available via shared helpers." : "Add environment variables to enable."}
            </span>
            <Button asChild variant="ghost">
              <a
                href={integration.docs}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => {
                  if (window.desktopBridge?.openExternal) {
                    event.preventDefault();
                    void window.desktopBridge.openExternal(integration.docs).catch(() => {
                      window.open(integration.docs, "_blank");
                    });
                  }
                }}
              >
                Docs
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
