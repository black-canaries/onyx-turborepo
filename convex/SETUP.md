# Convex Turborepo Integration Setup Guide

This guide explains how Convex is integrated into this Turborepo monorepo and how to get started.

## Architecture Overview

### Directory Structure

```
onyx-turborepo/
├── convex/                    # Convex backend (this directory)
│   ├── schema.ts              # Database schema
│   ├── example.ts             # Example queries/mutations
│   └── _generated/            # Auto-generated types (gitignored)
├── packages/
│   └── convex/                # @repo/convex - Shared Convex client wrapper
│       ├── src/client.ts      # Client-side helpers
│       └── src/server.ts      # Server-side helpers
├── apps/
│   ├── web/                   # Next.js web app
│   │   └── app/providers.tsx  # ConvexProvider wrapper
│   └── desktop/               # Electron desktop app
│       └── src/app/providers.tsx  # ConvexProvider wrapper
└── .env.local                 # Environment variables (create this)
```

### How It Works

1. **Backend (`/convex`)**: Contains your Convex functions (queries, mutations, actions) and schema
2. **Shared Package (`@repo/convex`)**: Wraps Convex clients with environment-aware configuration
3. **Apps**: Each app uses `ConvexProvider` from `@repo/convex` to connect to the backend

## Getting Started

### Step 1: Set Up Convex Account

1. Sign up at [convex.dev](https://convex.dev)
2. Install the CLI globally (optional):
   ```bash
   npm install -g convex
   ```

### Step 2: Initialize Convex Backend

From the repository root:

```bash
# Initialize Convex (creates convex.json)
pnpm convex dev --once

# Or if you prefer to run it interactively
pnpm convex dev
```

This will:
- Create a new Convex deployment (or link to existing)
- Generate a deployment URL
- Create `convex.json` with your project configuration
- Generate TypeScript types in `convex/_generated/`

### Step 3: Configure Environment Variables

Create `.env.local` in the repository root:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Convex deployment URL:

```env
# Get this from https://dashboard.convex.dev
CONVEX_URL=https://your-deployment.convex.cloud
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
EXPO_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

**Note**: For local development, use the same URL for all three variables.

### Step 4: Start Development

```bash
# Terminal 1: Run Convex backend (watches for changes)
pnpm dev:convex

# Terminal 2: Run your apps
pnpm dev
```

Or run both concurrently:

```bash
# Add to root package.json scripts:
"dev:all": "concurrently -k \"pnpm dev:convex\" \"pnpm dev\""
```

## Using Convex in Your Apps

### Web App (`apps/web`)

The ConvexProvider is already configured in `apps/web/app/providers.tsx`:

```tsx
import { ConvexProvider, createConvexReactClient } from "@repo/convex";

const convexClient = createConvexReactClient();

<ConvexProvider client={convexClient}>
  {children}
</ConvexProvider>
```

**Using in Components:**

```tsx
"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function UserList() {
  const users = useQuery(api.example.listUsers);
  const createUser = useMutation(api.example.createUser);

  if (!users) return <div>Loading...</div>;

  return (
    <div>
      {users.map((user) => (
        <div key={user._id}>{user.name}</div>
      ))}
      <button onClick={() => createUser({ name: "New User", email: "user@example.com" })}>
        Add User
      </button>
    </div>
  );
}
```

### Desktop App (`apps/desktop`)

The ConvexProvider is configured in `apps/desktop/src/app/providers.tsx`:

```tsx
import { ConvexProvider, createConvexReactClient } from "@repo/convex";

const convexClient = createConvexReactClient();

<ConvexProvider client={convexClient}>
  {children}
</ConvexProvider>
```

Usage is identical to the web app.

### Server-Side Usage (Next.js Server Components/Actions)

```tsx
import { createServerConvexClient } from "@repo/convex/server";
import { api } from "../../../convex/_generated/api";

export async function ServerComponent() {
  const convex = createServerConvexClient();
  const users = await convex.query(api.example.listUsers);

  return (
    <div>
      {users.map((user) => (
        <div key={user._id}>{user.name}</div>
      ))}
    </div>
  );
}
```

## Writing Convex Functions

### Queries (Read Data)

Create a new file in `convex/` directory:

```typescript
// convex/users.ts
import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  returns: v.array(v.object({
    _id: v.id("users"),
    name: v.string(),
    email: v.string(),
  })),
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});
```

### Mutations (Write Data)

```typescript
// convex/users.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
  },
  returns: v.id("users"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
```

### Actions (External API Calls)

```typescript
// convex/notifications.ts
import { action } from "./_generated/server";
import { v } from "convex/values";

export const sendEmail = action({
  args: {
    to: v.string(),
    subject: v.string(),
    body: v.string(),
  },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    // Call external API (SendGrid, Resend, etc.)
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: args.to }] }],
        from: { email: "noreply@example.com" },
        subject: args.subject,
        content: [{ type: "text/plain", value: args.body }],
      }),
    });

    return response.ok;
  },
});
```

## Schema Updates

When you update `convex/schema.ts`, Convex will automatically:
1. Detect the changes
2. Update the TypeScript types
3. Apply migrations to your database

**Example Schema:**

```typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  })
    .index("by_email", ["email"])
    .index("by_created_at", ["createdAt"]),

  posts: defineTable({
    title: v.string(),
    content: v.string(),
    authorId: v.id("users"),
    published: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_author", ["authorId"])
    .index("by_published", ["published", "createdAt"]),
});
```

## Best Practices

### 1. Always Use Validators

```typescript
// ✅ Good
export const getUser = query({
  args: { id: v.id("users") },
  returns: v.object({ name: v.string(), email: v.string() }),
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// ❌ Bad
export const getUser = query(async (ctx, args: any) => {
  return await ctx.db.get(args.id);
});
```

### 2. Never Use `ctx.db` in Actions

```typescript
// ❌ Bad - Actions cannot access ctx.db
export const myAction = action(async (ctx) => {
  const user = await ctx.db.query("users").first(); // ERROR!
});

// ✅ Good - Use queries/mutations
export const myAction = action(async (ctx) => {
  const user = await ctx.runQuery(api.users.first);
});
```

### 3. Use Internal Functions for Private Logic

```typescript
// convex/users.ts
import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

// This can only be called from other Convex functions
export const _internal_deleteUser = internalMutation({
  args: { id: v.id("users") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return null;
  },
});
```

### 4. Add Indexes for Performance

```typescript
// convex/schema.ts
export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
  })
    .index("by_email", ["email"]) // Makes email lookups fast
});

// convex/users.ts
export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    // Uses the index for fast lookup
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});
```

## Troubleshooting

### "Convex URL is not configured"

**Solution**: Create `.env.local` with your deployment URL:
```env
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

### Type Errors After Schema Changes

**Solution**: Restart Convex dev server:
```bash
pnpm dev:convex
```

### Functions Not Updating

**Solution**:
1. Check `convex dev` is running
2. Check for errors in the Convex CLI output
3. Verify files are saved

### Environment Variables Not Working

**Solution**:
- Restart the dev server after changing `.env.local`
- For Next.js: Use `NEXT_PUBLIC_` prefix for client-side
- For Expo: Use `EXPO_PUBLIC_` prefix for client-side
- Server-only: No prefix needed (e.g., `CONVEX_URL`)

## Production Deployment

### Option 1: Deploy with Convex CLI

```bash
# Deploy to production
pnpm convex deploy --prod

# Get production URL
pnpm convex dashboard
```

### Option 2: Deploy via CI/CD

Add to your CI/CD pipeline:

```yaml
# .github/workflows/deploy.yml
- name: Deploy Convex
  run: npx convex deploy --prod
  env:
    CONVEX_DEPLOY_KEY: ${{ secrets.CONVEX_DEPLOY_KEY }}
```

Get deploy key from: https://dashboard.convex.dev → Settings → Deploy Keys

## Resources

- [Convex Documentation](https://docs.convex.dev)
- [Convex Best Practices](.cursor/rules/convex_rules.mdc)
- [Convex Dashboard](https://dashboard.convex.dev)
- [Convex Examples](https://github.com/get-convex/convex-examples)

## Support

- Convex Discord: https://convex.dev/community
- GitHub Issues: https://github.com/get-convex/convex-js/issues
