import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";

/**
 * Convex Auth Configuration
 *
 * This file configures authentication providers for the app.
 * Currently using Password (email/password) authentication.
 *
 * The Password provider supports:
 * - signUp: Create a new account
 * - signIn: Sign in with existing account
 * - Default password requirement: At least 8 characters
 */

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [Password],
});
