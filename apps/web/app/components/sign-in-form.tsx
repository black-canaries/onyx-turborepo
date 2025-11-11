"use client";

import { useState } from "react";
import { useAuthActions } from "@repo/convex/auth";
import { Input } from "@repo/ui";
import { Button } from "@repo/ui";

export function SignInForm() {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await signIn("password", {
        email,
        password,
        flow: "signIn",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-primary">Sign In</h2>
        <p className="text-sm text-secondary">
          Enter your email and password to sign in to your account
        </p>
      </div>

      {error && (
        <div className="bg-error-primary p-3 rounded-lg text-sm text-error-primary">
          {error}
        </div>
      )}

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        isRequired
        isDisabled={isLoading}
        size="md"
      />

      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        isRequired
        isDisabled={isLoading}
        size="md"
      />

      <Button
        type="submit"
        color="primary"
        size="md"
        isLoading={isLoading}
        isDisabled={isLoading || !email || !password}
        className="w-full"
      >
        Sign In
      </Button>
    </form>
  );
}
