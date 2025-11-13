# Convex Auth Setup and Troubleshooting

## Important: Auth Configuration Warning

If you see a warning about `auth.config.js` and `auth.config.ts`, this is usually because:

1. **We're using `@convex-dev/auth` (NOT traditional Convex Auth)**
   - `@convex-dev/auth` does NOT require `auth.config.ts` or `auth.config.js`
   - Configuration is done in `convex/auth.ts` using `convexAuth()`

2. **Traditional Convex Auth (Auth0, Clerk, etc.) uses `auth.config.ts`**
   - If you're migrating from traditional auth, remove any `auth.config.ts` files

## Proper Setup Steps

### 1. Initialize Convex (First Time Only)

```bash
# This creates convex.json and initializes your deployment
pnpm dlx convex dev
```

Follow the prompts to:
- Create or select a Convex project
- Get your deployment URL

### 2. Set Up Environment Variables

Create `.env.local` in the repository root:

```bash
CONVEX_URL=https://your-deployment.convex.cloud
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
EXPO_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# Required for Convex Auth
SITE_URL=http://localhost:3000  # Or your production URL
```

### 3. Run Convex Auth Setup (Recommended)

```bash
# This configures @convex-dev/auth properly
npx @convex-dev/auth
```

This command will:
- Verify your auth configuration
- Set up required environment variables
- Check for configuration issues

### 4. Start Development

```bash
# Terminal 1: Run Convex backend
pnpm dlx convex dev

# Terminal 2: Run your apps
pnpm dev --filter=web
```

## Current Implementation

Our project uses:
- ✅ `@convex-dev/auth` with Password provider
- ✅ `convex/auth.ts` for auth configuration
- ✅ `convex/http.ts` for HTTP routes
- ✅ `convex/schema.ts` with authTables
- ❌ NO `auth.config.ts` needed (not used with @convex-dev/auth)

## Troubleshooting

### "auth.config.js and auth.config.ts both exist" Warning

**Solution**: Delete both files if they exist. They are NOT needed for `@convex-dev/auth`.

```bash
# Check if these files exist
ls convex/auth.config.*

# If they exist, remove them
rm convex/auth.config.js convex/auth.config.ts
```

### "Could not find a configured CONVEX_DEPLOYMENT"

**Solution**: Run `pnpm dlx convex dev` first to initialize your deployment.

### Environment Variables Not Loading

**Solution**:
1. Ensure `.env.local` exists at repository root
2. Restart your dev server
3. Verify variable names have correct prefixes:
   - `NEXT_PUBLIC_*` for Next.js client
   - `EXPO_PUBLIC_*` for Expo client
   - No prefix for server-only

## File Structure

```
convex/
├── auth.ts          ✅ Auth provider configuration (convexAuth)
├── http.ts          ✅ HTTP routes (auth.addHttpRoutes)
├── schema.ts        ✅ Database schema (includes authTables)
├── users.ts         ✅ User management functions
└── example.ts       (optional, can be removed)

# These files should NOT exist for @convex-dev/auth:
# ❌ auth.config.ts
# ❌ auth.config.js
# ❌ convex.config.ts (only for @convex-dev/better-auth)
```

## References

- [Convex Auth Docs](https://labs.convex.dev/auth)
- [Password Provider Docs](https://labs.convex.dev/auth/config/passwords)
- [Convex Auth GitHub](https://github.com/get-convex/convex-auth)
