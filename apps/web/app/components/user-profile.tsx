"use client";

import { useAuthActions } from "@repo/convex/auth";
import { useCurrentUser } from "../hooks/use-current-user";
import { Button } from "@repo/ui";

export function UserProfile() {
  const user = useCurrentUser();
  const { signOut } = useAuthActions();

  if (user === undefined) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-secondary">Loading...</span>
      </div>
    );
  }

  if (user === null) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-primary rounded-lg border border-primary">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-primary">
          {user.name || "User"}
        </span>
        <span className="text-xs text-secondary">{user.email}</span>
      </div>

      <Button
        color="secondary"
        size="sm"
        onClick={() => void signOut()}
      >
        Sign Out
      </Button>
    </div>
  );
}
