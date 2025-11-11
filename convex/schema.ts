import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

/**
 * Convex database schema
 *
 * Define your tables here. This schema is used for:
 * - Type generation for queries and mutations
 * - Database validation
 * - Indexing optimization
 *
 * Auth tables are automatically included from @convex-dev/auth
 */

export default defineSchema({
  // Auth tables (authSessions, authAccounts, authRefreshTokens, authVerificationCodes, users)
  ...authTables,

  // Override the default users table to add custom fields
  users: defineTable({
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerified: v.optional(v.number()),
    image: v.optional(v.string()),
    isAnonymous: v.optional(v.boolean()),
  })
    .index("email", ["email"]),
});
