import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Convex database schema
 *
 * Define your tables here. This schema is used for:
 * - Type generation for queries and mutations
 * - Database validation
 * - Indexing optimization
 */

export default defineSchema({
  // Example table - replace with your actual schema
  users: defineTable({
    name: v.string(),
    email: v.string(),
    createdAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_created_at", ["createdAt"]),
});
