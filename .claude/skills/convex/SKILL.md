---
name: convex
description: Convex backend development skill covering database schema design, queries, mutations, actions, validators, HTTP endpoints, file storage, scheduling, full-text search, pagination, and TypeScript patterns. Use when working with Convex functions, designing schemas, implementing backend logic, or configuring Convex services.
---

# Convex Backend Development

This project uses **Convex** as a real-time backend with type-safe database operations.

## Convex Package

**Location:** /Users/jonathansmith/Projects/onyx-turborepo/packages/convex

The `@repo/convex` package provides a wrapper around Convex with:
- `/client` export for client-side operations
- `/server` export for server-side operations
- Environment variable resolution for different platforms

## Function Syntax

### NEW Function Syntax (ALWAYS USE THIS)

Convex uses a new function syntax with explicit `args` and `returns` validators:

```typescript
import { query } from "./_generated/server";
import { v } from "convex/values";

export const getUser = query({
  args: { userId: v.id("users") },
  returns: v.union(
    v.object({
      _id: v.id("users"),
      _creationTime: v.number(),
      name: v.string(),
      email: v.string(),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});
```

**IMPORTANT:**
- ALWAYS include `args` and `returns` validators
- If a function doesn't return anything, use `returns: v.null()`
- JavaScript functions without return implicitly return `null`

## Function Types

### Public Functions (Part of Public API)

```typescript
import { query, mutation, action } from "./_generated/server";
import { v } from "convex/values";

// Public query - exposed to clients
export const listUsers = query({
  args: {},
  returns: v.array(v.object({
    _id: v.id("users"),
    name: v.string(),
  })),
  handler: async (ctx, args) => {
    return await ctx.db.query("users").collect();
  },
});

// Public mutation - exposed to clients
export const createUser = mutation({
  args: { name: v.string(), email: v.string() },
  returns: v.id("users"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", args);
  },
});

// Public action - exposed to clients
export const sendEmail = action({
  args: { to: v.string(), subject: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Call external API
    await sendEmailService(args.to, args.subject);
    return null;
  },
});
```

### Internal Functions (Private, NOT Exposed)

```typescript
import { internalQuery, internalMutation, internalAction } from "./_generated/server";
import { v } from "convex/values";

// Internal query - private, only callable by other Convex functions
export const getInternalData = internalQuery({
  args: { id: v.string() },
  returns: v.union(v.object({ data: v.string() }), v.null()),
  handler: async (ctx, args) => {
    // Private logic
    return { data: "secret" };
  },
});

// Internal mutation - private
export const updateInternalState = internalMutation({
  args: { id: v.id("users"), value: v.number() },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { value: args.value });
    return null;
  },
});

// Internal action - private
export const processBackground = internalAction({
  args: { taskId: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Background processing
    return null;
  },
});
```

**IMPORTANT:**
- Use `internalQuery`, `internalMutation`, `internalAction` for private functions
- These are imported from `./_generated/server`
- DO NOT use public `query`, `mutation`, `action` for sensitive functions

## Function References

Convex uses file-based routing with function references:

```typescript
// convex/users.ts
export const getUser = query({ /* ... */ });
export const createUser = mutation({ /* ... */ });
export const processUser = internalAction({ /* ... */ });
```

**Function References:**
- Public: `api.users.getUser`, `api.users.createUser`
- Internal: `internal.users.processUser`

**Nested Directories:**
```typescript
// convex/messages/access.ts
export const checkAccess = query({ /* ... */ });
```
- Reference: `api.messages.access.checkAccess`

## Calling Functions

### From Queries, Mutations, Actions

```typescript
import { query, mutation, action } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { v } from "convex/values";

// Call query from anywhere
export const myQuery = query({
  args: {},
  returns: v.array(v.object({ name: v.string() })),
  handler: async (ctx, args) => {
    const users: Array<{ name: string }> = await ctx.runQuery(
      api.users.listUsers,
      {}
    );
    return users;
  },
});

// Call mutation from mutation or action
export const myMutation = mutation({
  args: { name: v.string() },
  returns: v.id("users"),
  handler: async (ctx, args) => {
    const userId: string = await ctx.runMutation(
      api.users.createUser,
      { name: args.name }
    );
    return userId;
  },
});

// Call action from action
export const myAction = action({
  args: {},
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.runAction(internal.background.process, {});
    return null;
  },
});
```

**IMPORTANT:**
- Use `ctx.runQuery` to call queries
- Use `ctx.runMutation` to call mutations
- Use `ctx.runAction` to call actions
- Pass function references from `api` or `internal`, NOT the function directly
- When calling functions in the same file, add type annotations to avoid TypeScript circularity:
  ```typescript
  const result: string = await ctx.runQuery(api.example.f, { name: "Bob" });
  ```

**Best Practices:**
- ONLY call actions from other actions if crossing runtimes (V8 to Node)
- Otherwise, extract shared code into helper async functions
- Minimize calls from actions to queries/mutations (avoid race conditions)

## Validators

### Convex Type System

| Convex Type | TS/JS Type  | Validator              | Notes                                                       |
|-------------|-------------|------------------------|-------------------------------------------------------------|
| Id          | string      | `v.id(tableName)`      | Document ID                                                 |
| Null        | null        | `v.null()`             | Use `null`, not `undefined`                                 |
| Int64       | bigint      | `v.int64()`            | -2^63 to 2^63-1 (not `v.bigint()`)                          |
| Float64     | number      | `v.number()`           | IEEE-754 double precision                                   |
| Boolean     | boolean     | `v.boolean()`          |                                                             |
| String      | string      | `v.string()`           | UTF-8, must be valid Unicode                                |
| Bytes       | ArrayBuffer | `v.bytes()`            | First-class bytestrings                                     |
| Array       | Array       | `v.array(values)`      | Max 8192 values                                             |
| Object      | Object      | `v.object({...})`      | Max 1024 entries, no custom prototypes                      |
| Record      | Record      | `v.record(keys, vals)` | Dynamic keys, ASCII only, max 1024 entries                  |

### Array Validators

```typescript
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const processArray = mutation({
  args: {
    // Array of strings or numbers
    items: v.array(v.union(v.string(), v.number())),
    // Array of objects
    users: v.array(v.object({
      name: v.string(),
      age: v.number(),
    })),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Process arrays
    return null;
  },
});
```

### Object Validators (Discriminated Unions)

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  results: defineTable(
    v.union(
      v.object({
        kind: v.literal("error"),
        errorMessage: v.string(),
      }),
      v.object({
        kind: v.literal("success"),
        value: v.number(),
      }),
    ),
  ),
});
```

### Record Validators

```typescript
import { query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const getUserMap = query({
  args: { userIds: v.array(v.id("users")) },
  returns: v.record(v.id("users"), v.string()),
  handler: async (ctx, args) => {
    const idToUsername: Record<Id<"users">, string> = {};
    for (const userId of args.userIds) {
      const user = await ctx.db.get(userId);
      if (user) {
        idToUsername[user._id] = user.username;
      }
    }
    return idToUsername;
  },
});
```

**IMPORTANT:**
- Use `v.int64()` NOT `v.bigint()` (deprecated)
- Use `v.record()` NOT `v.map()` or `v.set()` (not supported)
- Use `v.null()` when returning null

## Database Schema

### Defining Schemas

**ALWAYS define schemas in `convex/schema.ts`:**

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    age: v.optional(v.number()),
  })
    .index("by_email", ["email"])
    .index("by_name_and_email", ["name", "email"]),

  messages: defineTable({
    channelId: v.id("channels"),
    authorId: v.optional(v.id("users")),
    content: v.string(),
  })
    .index("by_channel", ["channelId"])
    .searchIndex("search_body", {
      searchField: "content",
      filterFields: ["channelId"],
    }),

  channels: defineTable({
    name: v.string(),
  }),
});
```

### System Fields

Automatically added to all documents:
- `_id`: `v.id(tableName)` - Document ID
- `_creationTime`: `v.number()` - Creation timestamp

### Index Naming Convention

**ALWAYS include all index fields in the index name:**
- Index on `["email"]` → name: `"by_email"`
- Index on `["field1", "field2"]` → name: `"by_field1_and_field2"`

**IMPORTANT:**
- Index fields must be queried in the same order they are defined
- Create separate indexes for different query orders

## Database Operations

### Queries

```typescript
import { query } from "./_generated/server";
import { v } from "convex/values";

export const getUsers = query({
  args: { email: v.string() },
  returns: v.array(v.object({
    _id: v.id("users"),
    name: v.string(),
    email: v.string(),
  })),
  handler: async (ctx, args) => {
    // Use indexes, NOT filter
    const users = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .collect();

    return users;
  },
});

// Get single document with .unique()
export const getUserByEmail = query({
  args: { email: v.string() },
  returns: v.union(v.object({ name: v.string() }), v.null()),
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique(); // Throws if multiple results

    return user;
  },
});

// Async iteration (don't use .collect() or .take())
export const processUsers = query({
  args: {},
  returns: v.null(),
  handler: async (ctx, args) => {
    for await (const user of ctx.db.query("users")) {
      console.log(user.name);
    }
    return null;
  },
});
```

**IMPORTANT:**
- DO NOT use `.filter()` - use indexes with `.withIndex()` instead
- Use `.unique()` to get a single document (throws if multiple)
- Use `for await` for async iteration, not `.collect()` or `.take()`
- Queries do NOT support `.delete()` - collect results and iterate

### Query Ordering

```typescript
// Default: ascending by _creationTime
const messages = await ctx.db.query("messages").collect();

// Descending order
const recent = await ctx.db
  .query("messages")
  .order("desc")
  .take(10);

// With index (ordered by index columns)
const byChannel = await ctx.db
  .query("messages")
  .withIndex("by_channel", (q) => q.eq("channelId", channelId))
  .order("desc")
  .collect();
```

### Mutations

```typescript
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: { name: v.string(), email: v.string() },
  returns: v.id("users"),
  handler: async (ctx, args) => {
    // Insert
    const userId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
    });
    return userId;
  },
});

export const updateUser = mutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Partial update (shallow merge)
    await ctx.db.patch(args.userId, {
      name: args.name,
    });
    return null;
  },
});

export const replaceUser = mutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
    email: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Full replacement
    await ctx.db.replace(args.userId, {
      name: args.name,
      email: args.email,
    });
    return null;
  },
});

export const deleteUser = mutation({
  args: { userId: v.id("users") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.delete(args.userId);
    return null;
  },
});

// Delete query results
export const deleteByEmail = mutation({
  args: { email: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const users = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .collect();

    for (const user of users) {
      await ctx.db.delete(user._id);
    }
    return null;
  },
});
```

**IMPORTANT:**
- Use `ctx.db.patch()` for partial updates (shallow merge)
- Use `ctx.db.replace()` for full replacement
- Both throw if document doesn't exist

## Actions

Actions run in Node.js runtime and can call external APIs:

```typescript
"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { api, internal } from "./_generated/api";

export const sendEmail = action({
  args: {
    to: v.string(),
    subject: v.string(),
    body: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Call external API
    await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: args.to,
        subject: args.subject,
        html: args.body,
      }),
    });

    // Call mutations to update database
    await ctx.runMutation(internal.emails.markSent, {
      to: args.to,
    });

    return null;
  },
});
```

**IMPORTANT:**
- Add `"use node";` at top of file for Node.js built-ins
- NEVER use `ctx.db` in actions (no database access)
- Add `@types/node` to package.json for Node.js types
- Actions can call queries/mutations via `ctx.runQuery`/`ctx.runMutation`

## HTTP Endpoints

Define HTTP endpoints in `convex/http.ts`:

```typescript
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
  path: "/api/webhook",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const body = await req.json();

    // Process webhook
    await ctx.runMutation(internal.webhooks.process, {
      data: body,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
});

http.route({
  path: "/api/echo",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const body = await req.bytes();
    return new Response(body, { status: 200 });
  }),
});

export default http;
```

**IMPORTANT:**
- Endpoints are registered at the exact path specified
- Use `httpAction` decorator for handlers

## File Storage

Convex includes built-in file storage:

```typescript
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getFileUrl = query({
  args: { storageId: v.id("_storage") },
  returns: v.union(v.string(), v.null()),
  handler: async (ctx, args) => {
    // Get signed URL (returns null if doesn't exist)
    const url = await ctx.storage.getUrl(args.storageId);
    return url;
  },
});

export const getFileMetadata = query({
  args: { storageId: v.id("_storage") },
  returns: v.union(
    v.object({
      _id: v.id("_storage"),
      _creationTime: v.number(),
      contentType: v.optional(v.string()),
      sha256: v.string(),
      size: v.number(),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    // Query _storage system table for metadata
    const metadata = await ctx.db.system.get(args.storageId);
    return metadata;
  },
});
```

**IMPORTANT:**
- DO NOT use deprecated `ctx.storage.getMetadata()`
- Query `_storage` system table for metadata
- Storage items are `Blob` objects - convert to/from Blob

## Scheduling

### Cron Jobs

Define cron jobs in `convex/crons.ts`:

```typescript
import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";
import { internalAction } from "./_generated/server";
import { v } from "convex/values";

const cleanup = internalAction({
  args: {},
  returns: v.null(),
  handler: async (ctx, args) => {
    console.log("Running cleanup");
    return null;
  },
});

const crons = cronJobs();

// Run every 2 hours
crons.interval("cleanup inactive users", { hours: 2 }, internal.crons.cleanup, {});

// Run on cron schedule
crons.cron("daily backup", "0 0 * * *", internal.crons.backup, {});

export default crons;
```

**IMPORTANT:**
- Use `crons.interval()` or `crons.cron()` - NOT helpers like `crons.hourly()`
- Pass function references from `internal`, even if in same file
- Can register functions in crons.ts like any other file

### Scheduled Functions

```typescript
import { mutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

export const scheduleEmail = mutation({
  args: {
    userId: v.id("users"),
    delay: v.number(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Schedule action to run after delay (milliseconds)
    await ctx.scheduler.runAfter(
      args.delay,
      internal.emails.send,
      { userId: args.userId }
    );
    return null;
  },
});
```

## Pagination

Implement paginated queries for large result sets:

```typescript
import { query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

export const listMessages = query({
  args: {
    paginationOpts: paginationOptsValidator,
    channelId: v.id("channels"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("messages")
      .withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
      .order("desc")
      .paginate(args.paginationOpts);

    // result = {
    //   page: Array<Doc<"messages">>,
    //   isDone: boolean,
    //   continueCursor: string
    // }

    return result;
  },
});
```

**paginationOpts validator:**
- `numItems`: `v.number()` - max documents to return
- `cursor`: `v.union(v.string(), v.null())` - cursor for next page

**Paginate result:**
- `page` - array of documents
- `isDone` - boolean, true if last page
- `continueCursor` - string cursor for next page

## Full-Text Search

```typescript
import { query } from "./_generated/server";
import { v } from "convex/values";

export const searchMessages = query({
  args: {
    query: v.string(),
    channelId: v.id("channels"),
  },
  returns: v.array(v.object({
    _id: v.id("messages"),
    content: v.string(),
  })),
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withSearchIndex("search_body", (q) =>
        q.search("content", args.query).eq("channelId", args.channelId)
      )
      .take(10);

    return messages;
  },
});
```

**Schema with search index:**
```typescript
messages: defineTable({
  channelId: v.id("channels"),
  content: v.string(),
}).searchIndex("search_body", {
  searchField: "content",
  filterFields: ["channelId"],
}),
```

## TypeScript Patterns

### ID Types

```typescript
import { Id, Doc } from "./_generated/dataModel";

// Use Id<"tableName"> for type-safe IDs
function processUser(userId: Id<"users">) {
  // userId is strongly typed
}

// Document types
const user: Doc<"users"> = await ctx.db.get(userId);
```

**IMPORTANT:**
- Be strict with ID types: use `Id<"users">` not `string`
- Use `Doc<"tableName">` for document types

### String Literals in Discriminated Unions

```typescript
import { v } from "convex/values";

// ALWAYS use "as const" for literals
export const result = v.union(
  v.object({
    type: v.literal("success" as const),
    value: v.number(),
  }),
  v.object({
    type: v.literal("error" as const),
    message: v.string(),
  })
);
```

### Array and Record Types

```typescript
import { v } from "convex/values";

export const processData = mutation({
  args: {
    items: v.array(v.string()),
    mapping: v.record(v.string(), v.number()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Define array type explicitly
    const array: Array<string> = args.items;

    // Define record type explicitly
    const record: Record<string, number> = args.mapping;

    return null;
  },
});
```

## Best Practices

1. **Always use new function syntax** - Include `args` and `returns` validators
2. **Use internal functions for private APIs** - `internalQuery`, `internalMutation`, `internalAction`
3. **Use indexes, not filters** - Define indexes in schema, use `.withIndex()`
4. **Type-safe IDs** - Use `Id<"tableName">` not `string`
5. **Actions for external APIs** - Add `"use node";` and `@types/node`
6. **File-based routing** - Organize functions thoughtfully
7. **Minimize action to query/mutation calls** - Avoid race conditions
8. **Pagination for large lists** - Use `.paginate()` for scalability
9. **Search indexes for text search** - Define `searchIndex` in schema
10. **Proper error handling** - Throw errors with meaningful messages

## Common Patterns

### Chat Application

See the complete example in `.cursor/rules/convex_rules.mdc` lines 318-667 for a full chat application implementation with:
- User management
- Channel management
- Message operations
- AI response generation
- OpenAI integration

## Troubleshooting

### Module Resolution Issues
- Check `transpilePackages` in next.config.js includes `@repo/convex`
- Verify environment variables are set correctly
- Ensure Convex CLI is up to date

### Type Errors
- Regenerate types: `npx convex dev` or `npx convex codegen`
- Check validator types match TypeScript types
- Verify imports from `./_generated/server` and `./_generated/api`

### Function Call Errors
- Use function references (`api.file.function`) not direct function calls
- Check args match validator definitions exactly
- Verify return types match `returns` validator

## Reference

- Convex docs: https://docs.convex.dev
- Full guidelines: .cursor/rules/convex_rules.mdc
- Package location: /Users/jonathansmith/Projects/onyx-turborepo/packages/convex
