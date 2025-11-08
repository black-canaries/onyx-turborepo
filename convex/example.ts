import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Example query - fetches all users
 */
export const listUsers = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("users"),
      name: v.string(),
      email: v.string(),
      createdAt: v.number(),
    })
  ),
  handler: async (ctx) => {
    return await ctx.db.query("users").order("desc").collect();
  },
});

/**
 * Example query - get a single user by ID
 */
export const getUser = query({
  args: { id: v.id("users") },
  returns: v.union(
    v.object({
      _id: v.id("users"),
      name: v.string(),
      email: v.string(),
      createdAt: v.number(),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

/**
 * Example mutation - create a new user
 */
export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
  },
  returns: v.id("users"),
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      createdAt: Date.now(),
    });
    return userId;
  },
});

/**
 * Example mutation - update a user
 */
export const updateUser = mutation({
  args: {
    id: v.id("users"),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return null;
  },
});

/**
 * Example mutation - delete a user
 */
export const deleteUser = mutation({
  args: { id: v.id("users") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return null;
  },
});
