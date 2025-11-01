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
      description: "Realtime database, auth, and storage services shared across apps.",
      configured: Boolean(supabaseClient),
      docs: "https://supabase.com/docs",
    },
    {
      id: "convex",
      title: "Convex",
      description: "Reactive backend with automatic syncing and serverless functions.",
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
          <CardContent className="flex items-center justify-between gap-3">
            <div className="text-sm text-muted-foreground">
              {integration.configured
                ? "Clients are ready to be consumed throughout the workspace."
                : "Populate the .env file to enable the shared client helpers."}
            </div>
            <Button asChild variant="ghost">
              <a href={integration.docs} target="_blank" rel="noreferrer">
                Docs
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
