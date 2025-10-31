import { ConvexHttpClient } from "convex/browser";
import type { CreateConvexClientOptions } from "./client.js";

export interface CreateServerClientOptions extends CreateConvexClientOptions {
  accessToken?: string;
}

export function createServerConvexClient(options: CreateServerClientOptions = {}) {
  const deploymentUrl =
    options.deploymentUrl ??
    process.env.CONVEX_URL ??
    process.env.NEXT_PUBLIC_CONVEX_URL ??
    process.env.EXPO_PUBLIC_CONVEX_URL;

  if (!deploymentUrl) {
    throw new Error(
      "Convex deployment URL is missing. Set CONVEX_URL or NEXT_PUBLIC_CONVEX_URL."
    );
  }

  const client = new ConvexHttpClient(deploymentUrl, {
    skipConvexDeploymentUrlCheck: options.skipUrlValidation,
    logger: options.verbose ?? undefined,
  });

  if (options.accessToken) {
    client.setAuth(options.accessToken);
  }

  return client;
}
