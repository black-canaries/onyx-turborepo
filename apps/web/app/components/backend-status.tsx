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
import { createConvexReactClient } from "@repo/convex";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

export function BackendStatus() {
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
              <Badge color={integration.configured ? "success" : "error"}>
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
            <Button color="tertiary" href={integration.docs}>
              Docs
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
