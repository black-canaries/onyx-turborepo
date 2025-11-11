"use client";

import { useState } from "react";
import { useAuthActions } from "@repo/convex/auth";
import { Input } from "@repo/ui";
import { Button } from "@repo/ui";

export function SignUpForm() {
  const { signIn } = useAuthActions();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      await signIn("password", {
        email,
        password,
        flow: "signUp",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-primary">Create Account</h2>
        <p className="text-sm text-secondary">
          Enter your information to create a new account
        </p>
      </div>

      {error && (
        <div className="bg-error-primary p-3 rounded-lg text-sm text-error-primary">
          {error}
        </div>
      )}

      <Input
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="John Doe"
        isDisabled={isLoading}
        size="md"
      />

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
        hint="Must be at least 8 characters"
        isRequired
        isDisabled={isLoading}
        size="md"
      />

      <Input
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
        isDisabled={isLoading || !email || !password || !confirmPassword}
        className="w-full"
      >
        Create Account
      </Button>
    </form>
  );
}
