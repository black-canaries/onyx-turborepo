# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a **Turborepo monorepo** using **pnpm workspaces** for a cross-platform application suite with web, desktop (Electron), and mobile (React Native/Expo) apps sharing common packages.

**Key Technologies:**
- Next.js 16 (with App Router and proxy.ts instead of middleware.ts)
- Electron 31 (desktop app)
- Expo 54 / React Native 0.81.5 (mobile app)
- Tailwind CSS 4 (CSS-first architecture)
- React 19 / React Aria Components
- Convex (backend/database)
- Supabase (auth/storage)

## Common Commands

### Development
```bash
# Run all apps in development mode
pnpm dev

# Run specific app
pnpm turbo dev --filter=web
pnpm turbo dev --filter=desktop
pnpm turbo dev --filter=mobile
pnpm turbo dev --filter=docs
```

### Building
```bash
# Build all apps and packages
pnpm build

# Build specific app
pnpm turbo build --filter=web
pnpm turbo build --filter=desktop
```

### Linting & Type Checking
```bash
# Lint all packages
pnpm lint

# Type check all packages
pnpm check-types

# Format code
pnpm format
```

### Package Management
```bash
# Add dependency to specific package
cd apps/web && pnpm add <package>

# Add dev dependency to workspace root
pnpm add -w -D <package>

# Install all dependencies
pnpm install
```

## Architecture

### Monorepo Structure

```
apps/
├── web/          - Next.js 16 web app (port 3000)
├── desktop/      - Electron app with Next.js renderer (port 3010)
├── mobile/       - Expo/React Native mobile app (port 8082)
└── docs/         - Next.js documentation site

packages/
├── ui/              - Shared UI components (@repo/ui)
├── convex/          - Convex client wrapper (@repo/convex)
├── supabase/        - Supabase client wrapper (@repo/supabase)
├── tailwind-config/ - Shared Tailwind config (@repo/tailwind-config)
├── typescript-config/ - Shared TypeScript configs (@repo/typescript-config)
└── eslint-config/   - Shared ESLint configs (@repo/eslint-config)
```

### Cross-Platform Strategy

**UI Components:**
- `@repo/ui` - Web/Desktop components built with React Aria Components
- Server and client exports for flexibility
- Built with Vite, bundled for consumption

**Backend Clients:**
- `@repo/convex` - Convex wrapper with `/client` and `/server` exports
- `@repo/supabase` - Supabase wrapper with `/client` and `/server` exports
- Both packages handle platform-specific environment variable resolution

**Styling:**
- Tailwind CSS 4 with CSS-first architecture
- Shared config via `@repo/tailwind-config`
- PostCSS via `@tailwindcss/postcss` for Next.js apps

### Next.js Apps (web, desktop, docs)

**Important:**
- Next.js 16 uses `proxy.ts` (exports `proxy` function) instead of `middleware.ts`
- Enable `typedRoutes: true` for type-safe routing
- Must transpile workspace packages: `transpilePackages: ["@repo/ui", "@repo/convex", "@repo/supabase"]`

**App Router Structure:**
- Use `app/` directory for routes
- Server Components by default
- Client Components must use `"use client"` directive
- Run type generation: `next typegen` (included in `check-types`)

### Electron Desktop App

**Architecture:**
- Next.js renderer process (runs on port 3010)
- TypeScript main process (`electron/main.ts`)
- TypeScript preload script (`electron/preload.ts`)

**Development Workflow:**
1. Starts Next.js dev server on port 3010
2. Watches/compiles TypeScript electron files to `dist-electron/`
3. Launches Electron with `NEXT_DEV_SERVER_URL=http://localhost:3010`

**Build Process:**
- `pnpm build` - Builds Next.js and compiles electron TypeScript
- Main process loads from `dist-electron/main.js`
- Production uses `NODE_ENV=production`

### Mobile App (Expo/React Native)

**Metro Configuration:**
- Custom resolver for monorepo workspace compatibility
- Forces React/React Native resolution from mobile app's node_modules (prevents "Invalid hook call" errors)
- Watch folders include workspace root
- Hierarchical lookup enabled for pnpm compatibility

**Platform-Specific Env Vars:**
- Prefix: `EXPO_PUBLIC_*` for client-side variables

### Shared Packages

**@repo/ui:**
- Vite-built component library
- Multiple exports: `"."`, `"./client"`, `"./styles/globals.css"`
- Based on shadcn/ui with React Aria Components
- Uses Motion (Framer Motion), React Hook Form, Zod
- Exports TypeScript source for tree-shaking

**@repo/convex & @repo/supabase:**
- Export raw TypeScript source (not bundled)
- Three exports per package: `"."`, `"/client"`, `"/server"`
- Handle environment variable resolution internally
- Must be transpiled by consuming apps

**@repo/tailwind-config:**
- Shared Tailwind configuration
- Apps extend this base config

**@repo/typescript-config:**
- Base configs: `base.json`, `nextjs.json`, `react-library.json`
- Apps extend appropriate base

**@repo/eslint-config:**
- Shared linting rules
- Includes Next.js and Prettier configs

## Environment Variables

**Prefixing Rules:**
- Next.js apps: `NEXT_PUBLIC_*` for client, no prefix for server-only
- Expo mobile: `EXPO_PUBLIC_*` for client
- Server-only (all platforms): `CONVEX_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, etc.

**Global Env Vars (in turbo.json):**
```
CONVEX_URL
EXPO_PUBLIC_CONVEX_URL
EXPO_PUBLIC_SUPABASE_ANON_KEY
EXPO_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_CONVEX_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_URL
NODE_ENV
NEXT_DEV_SERVER_URL
```

**Per-App Configuration:**
- Apps and packages DO NOT inherit env vars from root
- Each app should have `.env.example` and `.env.local` in its root directory

## Turborepo Configuration

**Task Pipeline (turbo.json):**
- `build` - Depends on `^build`, outputs to `.next/`, `dist-electron/`, caches results
- `dev` - Persistent, no cache
- `lint` - Depends on `^lint`, cached
- `check-types` - Depends on `^check-types`, cached

**Cache Invalidation:**
- Build inputs include `.env*` files
- Global env vars listed in `globalEnv` array

## Important Conventions

**Package Manager:**
- Always use `pnpm`, never `npm` or `yarn`
- Workspace dependencies use `workspace:*` protocol

**TypeScript:**
- Strict mode enabled across all packages
- Version pinned to `5.9.2`
- ESLint max warnings set to `0` (fail on any warnings)

**Convex:**
- Follow comprehensive guidelines in `.cursor/rules/convex_rules.mdc`
- Use new function syntax with `args` and `returns` validators
- Never use `ctx.db` in actions
- Use `internalQuery/internalMutation/internalAction` for private functions

**Monorepo Best Practices:**
- Keep platform-specific code in respective apps
- Extract shared logic to packages
- Consider multi-platform impact when changing shared packages
- Use Turbo filters to scope commands: `--filter=web`, `--filter=mobile`
