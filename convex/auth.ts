import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";

/**
 * Convex Auth Configuration
 *
 * This file configures authentication providers for the app.
 * Currently using Password (email/password) authentication.
 */

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    Password({
      // Customize the password validation if needed
      // Default requires at least 8 characters
      verify: async (params: { email: string; password: string }) => {
        // You can add custom validation logic here
        // For now, use default behavior
        return params;
      },
    }),
  ],
});
