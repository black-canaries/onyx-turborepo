---
name: turborepo
description: TurboRepo monorepo management skill for pnpm workspaces. Use when working with the monorepo structure, running tasks (build, lint, dev, check-types), managing workspace dependencies, configuring pipelines, handling environment variables, or troubleshooting cache issues. Covers pnpm workspace protocol, filtering apps/packages, task dependencies, and TurboRepo configuration.
---

# TurboRepo Monorepo Management

This project uses **TurboRepo 2.6.0** with **pnpm workspaces** for managing a multi-platform monorepo.

## Project Structure

```
onyx-turborepo/
├── apps/
│   ├── web/          # Next.js web app (port 3000)
│   ├── mobile/       # Expo/React Native app (port 8082)
│   ├── desktop/      # Electron desktop app (port 3010)
│   └── docs/         # Documentation site (port 3001)
├── packages/
│   ├── ui/                  # Component library (@repo/ui)
│   ├── convex/              # Convex backend client (@repo/convex)
│   ├── supabase/            # Supabase backend client (@repo/supabase)
│   ├── tailwind-config/     # Shared Tailwind config (@repo/tailwind-config)
│   ├── typescript-config/   # Shared TypeScript configs (@repo/typescript-config)
│   └── eslint-config/       # Shared ESLint configs (@repo/eslint-config)
├── turbo.json        # TurboRepo configuration
└── pnpm-workspace.yaml
```

## Key Configuration Files

- **turbo.json:10** - Task pipeline configuration with environment variable tracking
- **pnpm-workspace.yaml:1** - Workspace definitions
- **package.json:1** - Root package with scripts and pnpm requirement

## Running Tasks

### Development Mode

```bash
# Run specific app
pnpm dev --filter=web
pnpm dev --filter=mobile
pnpm dev --filter=desktop
pnpm dev --filter=docs

# Run all apps
pnpm dev

# Run multiple specific apps
pnpm dev --filter=web --filter=mobile
```

### Building

```bash
# Build all apps and packages
pnpm build

# Build specific app/package
pnpm build --filter=web
pnpm build --filter=@repo/ui

# Build app and its dependencies
pnpm build --filter=web...
```

### Linting and Type Checking

```bash
# Lint everything
pnpm lint

# Lint specific workspace
pnpm lint --filter=web

# Type check everything
pnpm check-types

# Type check specific workspace
pnpm check-types --filter=@repo/ui
```

## TurboRepo Pipeline Configuration

The turbo.json defines these tasks:

### `build` Task
- Depends on: `^build` (upstream dependencies must build first)
- Inputs: All source files + `.env*` files
- Outputs: `.next/`, `dist/`, `dist-electron/`
- Environment variables tracked for cache invalidation

### `lint` Task
- Depends on: `^lint` (upstream dependencies must lint first)
- Outputs: None (terminal only)

### `check-types` Task
- Depends on: `^check-types` (upstream dependencies must type-check first)
- Outputs: None (terminal only)

### `dev` Task
- Persistent: true (long-running server)
- Cache: false (never cached)

## Workspace Dependencies

Use the `workspace:*` protocol for internal dependencies:

```json
{
  "dependencies": {
    "@repo/ui": "workspace:*",
    "@repo/convex": "workspace:*",
    "@repo/supabase": "workspace:*"
  }
}
```

## Environment Variables

### Global Environment Variables

Defined in turbo.json for cache invalidation:

```json
{
  "globalEnv": [
    "CONVEX_URL",
    "NEXT_PUBLIC_CONVEX_URL",
    "EXPO_PUBLIC_CONVEX_URL",
    "SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_URL",
    "EXPO_PUBLIC_SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY"
  ]
}
```

**IMPORTANT:** Apps and packages DO NOT inherit environment variables from the root. Each app/package should have its own `.env.example` and `.env.local` files in their root directory.

### Environment Variable Patterns

- **Next.js apps:** `NEXT_PUBLIC_*` for client, no prefix for server-only
- **Expo app:** `EXPO_PUBLIC_*` for client
- **Backend packages:** No prefix for server-side secrets

## Package Manager

This project requires **pnpm 10.0.0**:

```json
{
  "packageManager": "pnpm@10.0.0",
  "engines": {
    "node": ">=18"
  }
}
```

Always use `pnpm` commands, never `npm` or `yarn`.

## Adding New Packages/Apps

### Adding a New App

1. Create directory in `apps/`
2. Add package.json with `name` matching pattern (no `@repo/` prefix for apps)
3. Add dependencies using `workspace:*` for internal packages
4. Update turbo.json if needed
5. Run `pnpm install`

### Adding a New Package

1. Create directory in `packages/`
2. Add package.json with `name` as `@repo/package-name`
3. Define exports in package.json
4. Use `workspace:*` for internal dependencies
5. Add TypeScript config extending `@repo/typescript-config`
6. Run `pnpm install`

## Common Patterns

### Installing Dependencies

```bash
# Install in specific workspace
pnpm add <package> --filter=web

# Install dev dependency
pnpm add -D <package> --filter=@repo/ui

# Install workspace package in app
pnpm add @repo/ui --filter=web
```

### Cleaning Build Artifacts

```bash
# Clean all builds
pnpm clean

# Clean specific workspace
rm -rf apps/web/.next
rm -rf packages/ui/dist
```

### Cache Management

```bash
# Clear TurboRepo cache
rm -rf .turbo

# Run task without cache
pnpm build --force

# See cache hit/miss information
pnpm build --summarize
```

## Troubleshooting

### "Workspace not found" Errors

- Ensure package name matches exactly
- Check pnpm-workspace.yaml includes the directory
- Run `pnpm install` to refresh workspace graph

### Build Dependency Issues

- Check turbo.json task dependencies (`^build` means upstream deps)
- Ensure workspace dependencies use `workspace:*` protocol
- Build dependencies explicitly: `pnpm build --filter=@repo/ui`

### Cache Issues

- Environment variables may affect cache - check turbo.json `globalEnv`
- Clear cache: `rm -rf .turbo`
- Use `--force` flag to skip cache

### Hot Reload Issues

- Check if `transpilePackages` includes workspace packages in Next.js
- For Expo, check Metro config has correct workspace paths
- Restart dev server after package changes

## Best Practices

1. **Always use workspace protocol** - Never use file paths or versions for internal packages
2. **Define task dependencies** - Use `^taskName` for upstream dependencies
3. **Track environment variables** - Add to `globalEnv` if they affect builds
4. **Use filters** - Run tasks on specific workspaces to save time
5. **Check build order** - Ensure dependencies build before dependents
6. **Keep pnpm-lock.yaml** - Commit lockfile for reproducible builds

## Reference

- TurboRepo docs: https://turbo.build/repo/docs
- pnpm workspaces: https://pnpm.io/workspaces
- Project turbo.json: /Users/jonathansmith/Projects/onyx-turborepo/turbo.json
