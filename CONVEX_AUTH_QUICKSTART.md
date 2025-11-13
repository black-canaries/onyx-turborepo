# Convex Auth Quick Start Guide

## What We Fixed

Your auth configuration has been updated to resolve the warning about `auth.config.js` and `auth.config.ts`.

### Key Changes Made:

1. ✅ Fixed `convex/auth.ts` to use correct Password provider syntax
2. ✅ Added `SITE_URL` to environment variables
3. ✅ Created setup documentation

## Understanding the Warning

The warning you saw happens because:

- **Old Convex Auth** (for Auth0, Clerk) uses `auth.config.ts`
- **New @convex-dev/auth** (what we're using) uses `convex/auth.ts`
- The Convex CLI sometimes creates placeholder config files that conflict

**Solution**: We don't need `auth.config.ts` or `auth.config.js` for `@convex-dev/auth`.

## Setup Steps (Do These In Order)

### Step 1: Clean Up Any Conflicting Files

```bash
# Check if these files exist (they shouldn't)
ls convex/auth.config.* 2>/dev/null

# If they exist, delete them
rm convex/auth.config.js convex/auth.config.ts 2>/dev/null
```

### Step 2: Set Up Environment Variables

```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your values:
# - CONVEX_URL (you'll get this in Step 3)
# - NEXT_PUBLIC_CONVEX_URL (same as CONVEX_URL)
# - EXPO_PUBLIC_CONVEX_URL (same as CONVEX_URL)
# - SITE_URL (http://localhost:3000 for development)
```

### Step 3: Initialize Convex Deployment

```bash
# This creates convex.json and gives you your CONVEX_URL
pnpm dlx convex dev
```

Follow the prompts:
1. Login to Convex (or create account)
2. Create a new project or select existing
3. Copy your deployment URL
4. Add the URL to `.env.local`
5. Keep the dev server running

### Step 4: Verify Auth Setup (Optional but Recommended)

In a new terminal:

```bash
# This validates your auth configuration
npx @convex-dev/auth
```

This command checks:
- Auth tables in schema ✅
- Auth provider configuration ✅
- Environment variables ✅

### Step 5: Start Development

```bash
# In one terminal: Convex dev (if not already running)
pnpm dlx convex dev

# In another terminal: Start web app
pnpm dev --filter=web
```

## Testing Authentication

1. Navigate to `http://localhost:3000`
2. Click "Sign Up" in the top right
3. Create an account:
   - Email: test@example.com
   - Password: (at least 8 characters)
4. You should be signed in automatically
5. Your name should appear in the welcome message

## Project Structure

```
onyx-turborepo/
├── convex/
│   ├── auth.ts              ✅ Auth provider config (@convex-dev/auth)
│   ├── http.ts              ✅ HTTP routes for auth
│   ├── schema.ts            ✅ Database schema with authTables
│   ├── users.ts             ✅ User management functions
│   ├── AUTH_SETUP.md        📚 Detailed troubleshooting guide
│   └── _generated/          🔄 Auto-generated (don't edit)
│
├── packages/convex/         📦 Shared Convex wrapper
│   └── src/
│       ├── auth.ts          ✅ Auth hooks export
│       └── client.ts        ✅ ConvexAuthProvider export
│
└── apps/web/                🌐 Next.js web app
    └── app/
        ├── components/
        │   ├── sign-in-form.tsx     ✅ Sign in form
        │   ├── sign-up-form.tsx     ✅ Registration form
        │   └── user-profile.tsx     ✅ User profile display
        ├── sign-in/page.tsx         ✅ Sign in page
        ├── sign-up/page.tsx         ✅ Sign up page
        └── providers.tsx            ✅ ConvexAuthProvider setup
```

## Troubleshooting

### Still seeing the auth.config warning?

```bash
# Find and remove any auth.config files
find . -name "auth.config.*" -not -path "*/node_modules/*" -delete

# Restart convex dev
pnpm dlx convex dev
```

### "Could not find CONVEX_DEPLOYMENT" error

This means you haven't run `pnpm dlx convex dev` yet. See Step 3 above.

### Sign up/Sign in not working

1. Check convex dev is running
2. Check `.env.local` has all required variables
3. Check browser console for errors
4. Verify you're using at least 8 characters for password

### Types not updating

```bash
# Restart convex dev
# It will regenerate types in convex/_generated/
```

## What's Next?

Now that auth is working, you can:

1. **Add Email Verification**
   - Configure email provider in `convex/auth.ts`
   - See: https://labs.convex.dev/auth/config/passwords#email-verification

2. **Add Password Reset**
   - Configure reset provider
   - See: https://labs.convex.dev/auth/config/passwords#password-reset

3. **Add OAuth Providers** (Google, GitHub, etc.)
   - See: https://labs.convex.dev/auth/config/oauth

4. **Implement Role-Based Access Control**
   - See: https://labs.convex.dev/auth/authz

## Resources

- 📖 [Convex Auth Docs](https://labs.convex.dev/auth)
- 🔐 [Password Provider Docs](https://labs.convex.dev/auth/config/passwords)
- 🐙 [Convex Auth GitHub](https://github.com/get-convex/convex-auth)
- 💬 [Convex Discord Community](https://convex.dev/community)
- 📚 [Detailed Setup Guide](./convex/AUTH_SETUP.md)
