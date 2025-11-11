import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { auth } from "./auth";

/**
 * User Management Functions
 *
 * These functions handle user profile operations.
 */

/**
 * Get the current authenticated user
 */
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});

/**
 * Update user profile
 */
export const updateProfile = mutation({
  args: {
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    await ctx.db.patch(userId, {
      name: args.name,
    });

    return { success: true };
  },
});

/**
 * Get user by ID (for internal use)
 */
export const getUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});
