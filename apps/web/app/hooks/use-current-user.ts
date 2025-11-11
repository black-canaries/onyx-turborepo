"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

/**
 * Hook to get the current authenticated user
 *
 * @returns The current user object or null if not authenticated
 */
export function useCurrentUser() {
  return useQuery(api.users.getCurrentUser);
}
