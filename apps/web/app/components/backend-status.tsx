"use client";

import { useMemo } from "react";
import {
  Badge,
  BadgeText,
  Button,
  ButtonText,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  HStack,
  Text,
  Link,
  LinkText,
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
            <HStack className="items-center justify-between gap-3">
              <CardTitle className="text-base">{integration.title}</CardTitle>
              <Badge variant="solid" action={integration.configured ? "success" : "error"}>
                <BadgeText>{integration.configured ? "Connected" : "Awaiting env"}</BadgeText>
              </Badge>
            </HStack>
            <CardDescription>{integration.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <HStack className="items-center justify-between gap-3">
              <Text size="sm" className="text-muted-foreground flex-1">
                {integration.configured
                  ? "Clients are ready to be consumed throughout the workspace."
                  : "Populate the .env file to enable the shared client helpers."}
              </Text>
              <Button variant="outline" action="secondary" onPress={() => typeof window !== "undefined" && window.open(integration.docs, "_blank")}>
                <ButtonText>Docs</ButtonText>
              </Button>
            </HStack>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
