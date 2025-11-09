# Convex Backend

This directory contains the Convex backend functions, schema, and configuration.

## Structure

- `schema.ts` - Database schema definition
- `*.ts` - Convex functions (queries, mutations, actions)
- `_generated/` - Auto-generated types (gitignored)

## Development

The Convex backend runs alongside the Turborepo apps. When you run `pnpm dev` from the root, Convex will watch for changes and automatically deploy to your development deployment.

## Writing Functions

### Queries (Read-only)
```typescript
import { query } from "./_generated/server";
import { v } from "convex/values";

export const getUser = query({
  args: { id: v.id("users") },
  returns: v.object({ name: v.string(), email: v.string() }),
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
```

### Mutations (Write)
```typescript
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: { name: v.string(), email: v.string() },
  returns: v.id("users"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      createdAt: Date.now(),
    });
  },
});
```

### Actions (External API calls)
```typescript
import { action } from "./_generated/server";
import { v } from "convex/values";

export const sendEmail = action({
  args: { to: v.string(), subject: v.string() },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    // Call external API
    const response = await fetch("https://api.sendgrid.com/...");
    return response.ok;
  },
});
```

## Best Practices

1. **Always use validators** - Use `args` and `returns` validators
2. **Never use `ctx.db` in actions** - Use queries/mutations via `ctx.runQuery`/`ctx.runMutation`
3. **Use internal functions** - Prefix with `internal` for private functions
4. **Index your queries** - Add indexes in schema.ts for performance

See `.cursor/rules/convex_rules.mdc` for comprehensive guidelines.
