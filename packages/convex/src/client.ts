import { ConvexClient, ConvexHttpClient } from "convex/browser";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";

export interface CreateConvexClientOptions {
  deploymentUrl?: string;
  skipUrlValidation?: boolean;
  verbose?: boolean;
}

function resolveConvexUrl(overrides?: string): string {
  const url =
    overrides ??
    process.env.NEXT_PUBLIC_CONVEX_URL ??
    process.env.EXPO_PUBLIC_CONVEX_URL ??
    process.env.CONVEX_URL;

  if (!url) {
    throw new Error(
      "Convex deployment URL is missing. Set NEXT_PUBLIC_CONVEX_URL, EXPO_PUBLIC_CONVEX_URL, or CONVEX_URL."
    );
  }

  return url;
}

export function createConvexClient(options: CreateConvexClientOptions = {}) {
  const deploymentUrl = resolveConvexUrl(options.deploymentUrl);
  return new ConvexClient(deploymentUrl, {
    skipConvexDeploymentUrlCheck: options.skipUrlValidation,
    verbose: options.verbose,
  });
}

export function createConvexReactClient(options: CreateConvexClientOptions = {}) {
  const deploymentUrl = resolveConvexUrl(options.deploymentUrl);
  return new ConvexReactClient(deploymentUrl, {
    skipConvexDeploymentUrlCheck: options.skipUrlValidation,
    verbose: options.verbose,
  });
}

export function createConvexHttpClient(options: CreateConvexClientOptions = {}) {
  const deploymentUrl = resolveConvexUrl(options.deploymentUrl);
  return new ConvexHttpClient(deploymentUrl, {
    skipConvexDeploymentUrlCheck: options.skipUrlValidation,
    logger: options.verbose ?? undefined,
  });
}

export { ConvexProvider, ConvexAuthProvider };
