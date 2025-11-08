---
name: typescript
description: TypeScript configuration and development skill for the monorepo. Use when configuring TypeScript, setting up tsconfig.json files, troubleshooting type errors, understanding module resolution, working with strict mode, or managing TypeScript in different app/package contexts (Next.js, Electron, Expo, Node, React libraries). Covers @repo/typescript-config usage and best practices.
---

# TypeScript Configuration & Development

This project uses **TypeScript 5.9.2** with strict mode enabled across all apps and packages. Shared TypeScript configurations are managed in `@repo/typescript-config`.

## Configuration Structure

### Available Configs

The `@repo/typescript-config` package provides specialized configurations for different contexts:

| Config | Import Path | Use Case | Module System |
|--------|------------|----------|---------------|
| **base.json** | `@repo/typescript-config/base` | Base config (extended by all others) | NodeNext |
| **nextjs.json** | `@repo/typescript-config/nextjs` | Next.js apps (web, desktop, docs) | ESNext + Bundler |
| **react-library.json** | `@repo/typescript-config/react-library` | React component libraries | ESNext + Bundler |
| **expo.json** | `@repo/typescript-config/expo` | Expo/React Native mobile app | ESNext + Bundler |
| **electron.json** | `@repo/typescript-config/electron` | Electron main/preload processes | ESNext + Bundler |
| **node.json** | `@repo/typescript-config/node` | Pure Node.js packages | NodeNext |
| **backend.json** | `@repo/typescript-config/backend` | Backend/server code | NodeNext |

### Base Configuration

All configs extend `base.json` which provides:

```json
{
  "compilerOptions": {
    "strict": true,                      // Enable all strict type checking
    "declaration": true,                 // Generate .d.ts files
    "declarationMap": true,              // Generate sourcemaps for .d.ts
    "esModuleInterop": true,             // CommonJS/ESM interop
    "isolatedModules": true,             // Required for bundlers
    "lib": ["es2023", "DOM", "DOM.Iterable"],
    "module": "NodeNext",
    "moduleDetection": "force",          // Always treat files as modules
    "moduleResolution": "NodeNext",
    "noUncheckedIndexedAccess": true,    // Array/object access returns T | undefined
    "resolveJsonModule": true,           // Import .json files
    "skipLibCheck": true,                // Skip type checking of .d.ts files
    "target": "ES2022"
  }
}
```

**Key strict mode features:**
- `noUncheckedIndexedAccess: true` - Array indexing returns `T | undefined`
- All strict flags enabled (noImplicitAny, strictNullChecks, etc.)

## Configuration by App/Package Type

### Next.js Apps (web, desktop, docs)

**tsconfig.json:**
```json
{
  "extends": "@repo/typescript-config/nextjs",
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Key features:**
- Uses `next` TypeScript plugin for type-safe routing
- `module: "ESNext"` with `moduleResolution: "Bundler"`
- `jsx: "preserve"` (Next.js transforms JSX)
- `noEmit: true` (Next.js handles compilation)
- `incremental: true` for faster type checking
- `allowJs: true` for gradual migration

**Type generation:**
```bash
# Generate Next.js route types
pnpm next typegen

# Included in check-types task
pnpm check-types --filter=web
```

### React Component Libraries (@repo/ui)

**tsconfig.json:**
```json
{
  "extends": "@repo/typescript-config/react-library",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Key features:**
- `jsx: "react-jsx"` (automatic JSX runtime)
- `module: "ESNext"` with `moduleResolution: "Bundler"`
- Inherits `declaration: true` from base for type generation
- Vite handles bundling, TypeScript generates types

### Expo/React Native Mobile App

**tsconfig.json:**
```json
{
  "extends": "@repo/typescript-config/expo",
  "compilerOptions": {
    "paths": {
      "@/*": ["./app/*"],
      "@components/*": ["./components/*"]
    }
  },
  "include": ["expo-env.d.ts", "**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/*.json"],
  "exclude": ["node_modules", "babel.config.js", "metro.config.js"]
}
```

**Key features:**
- `jsx: "react-jsx"`
- `types: ["react", "react-native", "expo"]`
- `allowJs: true` for React Native ecosystem compatibility
- Excludes config files from type checking
- `noEmit: true` (Metro bundler handles compilation)

### Electron Main/Preload Processes

**tsconfig.json:**
```json
{
  "extends": "@repo/typescript-config/electron",
  "compilerOptions": {
    "outDir": "dist-electron"
  },
  "include": ["electron/**/*"],
  "exclude": ["node_modules", "dist-electron"]
}
```

**Key features:**
- `jsx: "react-jsx"` (for renderer types)
- `module: "ESNext"` with `moduleResolution: "Bundler"`
- `types: ["node"]` for Node.js APIs
- `noEmit: false` (TypeScript compiles to dist-electron/)

### Node.js Packages

**tsconfig.json:**
```json
{
  "extends": "@repo/typescript-config/node",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Key features:**
- `module: "NodeNext"` with `moduleResolution: "NodeNext"`
- `lib: ["ES2022"]` (no DOM)
- `types: ["node"]`
- `allowJs: false` (strict TypeScript only)

### Backend/Server Packages (@repo/convex, @repo/supabase)

**tsconfig.json:**
```json
{
  "extends": "@repo/typescript-config/backend",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

**Key features:**
- `module: "NodeNext"` for Node.js compatibility
- `lib: ["ES2022"]` (server-only, no DOM)
- `types: ["node"]`
- `noEmit: true` (packages export TypeScript source)

## Module Resolution Strategies

### NodeNext (Node.js packages, backend)

**When to use:**
- Pure Node.js code
- Backend services
- Packages that run in Node.js environment

**Characteristics:**
- Respects package.json `"type": "module"` and `"exports"`
- Requires explicit file extensions in imports for ESM
- Uses Node.js module resolution algorithm

**Example:**
```typescript
// ✅ Correct - explicit extension
import { foo } from './utils.js'

// ❌ Incorrect - missing extension
import { foo } from './utils'
```

### Bundler (Next.js, Expo, React libraries)

**When to use:**
- Code processed by bundlers (Vite, Webpack, Metro)
- Next.js apps
- Expo/React Native apps
- Frontend libraries

**Characteristics:**
- No file extensions required
- Understands package.json `"exports"` field
- Optimized for bundler tools

**Example:**
```typescript
// ✅ Correct - no extension needed
import { Button } from '@repo/ui'
import { useConvex } from '@repo/convex/client'
```

## Common TypeScript Patterns

### Workspace Package Imports

Apps import workspace packages using their package names:

```typescript
// Import from @repo/ui
import { Button } from '@repo/ui'
import { Card } from '@repo/ui/client'

// Import from @repo/convex
import { ConvexProvider } from '@repo/convex/client'
import { api } from '@repo/convex/server'
```

**Important:** Next.js apps must transpile workspace packages:

```javascript
// next.config.js
module.exports = {
  transpilePackages: ['@repo/ui', '@repo/convex', '@repo/supabase']
}
```

### Path Aliases

Use `paths` in tsconfig.json for internal aliases:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@components/*": ["./components/*"],
      "@lib/*": ["./lib/*"]
    }
  }
}
```

```typescript
// Instead of: import { foo } from '../../../lib/utils'
import { foo } from '@/lib/utils'
```

### Type-Only Imports

Use `import type` for type-only imports to avoid runtime imports:

```typescript
// ✅ Type-only import
import type { User } from '@/types'

// ✅ Mixed import
import { getUser, type User } from '@/lib/api'

// ❌ Runtime import for types (unnecessary)
import { User } from '@/types'
```

### Strict Null Checks

With `strict: true`, handle null/undefined explicitly:

```typescript
// Array access returns T | undefined
const first = array[0]
if (first) {
  // first is T here
}

// Optional chaining
const name = user?.profile?.name

// Nullish coalescing
const displayName = name ?? 'Anonymous'

// Non-null assertion (use sparingly!)
const element = document.getElementById('root')!
```

### noUncheckedIndexedAccess

This strict setting requires handling array/object access:

```typescript
const items = [1, 2, 3]

// ❌ Error: Type 'number | undefined' is not assignable to 'number'
const first: number = items[0]

// ✅ Correct - handle undefined
const first = items[0]
if (first !== undefined) {
  const value: number = first
}

// ✅ Or use non-null assertion if certain
const first = items[0]!

// ✅ Or use default value
const first = items[0] ?? 0
```

## Type Checking Tasks

### Run Type Checks

```bash
# Check all workspaces
pnpm check-types

# Check specific workspace
pnpm check-types --filter=web
pnpm check-types --filter=@repo/ui

# Watch mode (in specific workspace)
cd apps/web
pnpm tsc --noEmit --watch
```

### Next.js Type Generation

Next.js generates route types for type-safe navigation:

```bash
# Generate route types (creates .next/types)
pnpm next typegen

# Auto-generated during dev
pnpm dev --filter=web
```

**Usage:**
```typescript
import Link from 'next/link'

// ✅ Type-safe route
<Link href="/dashboard/settings" />

// ❌ TypeScript error - route doesn't exist
<Link href="/invalid-route" />
```

## Troubleshooting

### "Cannot find module" Errors

**Workspace packages not found:**
1. Check package.json has correct dependency: `"@repo/ui": "workspace:*"`
2. Run `pnpm install` to refresh workspace graph
3. For Next.js, ensure `transpilePackages` includes the package

**Path aliases not resolving:**
1. Check `tsconfig.json` has correct `paths` and `baseUrl`
2. Restart TypeScript server in editor
3. For Next.js, path aliases work automatically

### Module Resolution Errors

**"Module not found" with NodeNext:**
- Add file extensions to imports: `'./utils.js'` not `'./utils'`
- Check package.json has correct `"type"` field
- Use `.js` extension even for `.ts` files (TypeScript convention)

**Workspace package types not found:**
- Ensure package has `"types"` or `"exports"` in package.json
- Check package builds types: `declaration: true` in tsconfig.json
- Build the package: `pnpm build --filter=@repo/ui`

### Type Errors in node_modules

Add `skipLibCheck: true` to skip type checking dependencies:

```json
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

Already included in base config.

### Incremental Build Issues

Clear TypeScript cache if experiencing stale type errors:

```bash
# Remove tsconfig.tsbuildinfo files
find . -name "tsconfig.tsbuildinfo" -delete

# Clear Next.js type cache
rm -rf apps/web/.next/types

# Rebuild
pnpm check-types
```

### React Hook Type Errors (Expo/Mobile)

If seeing "Invalid hook call" type errors:

1. Ensure Metro config forces React resolution from mobile app
2. Check React versions match across workspace
3. Clear Metro cache: `pnpm expo start --clear`

## Best Practices

### 1. Always Extend Shared Configs

```json
{
  "extends": "@repo/typescript-config/nextjs"
}
```

Never duplicate settings - extend appropriate config.

### 2. Use Strict Mode Settings

All strict checks are enabled by default. Don't disable them:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### 3. Workspace Package Types

Packages should export their TypeScript source for tree-shaking:

```json
{
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "default": "./src/index.ts"
    }
  }
}
```

Consuming apps transpile via `transpilePackages` (Next.js) or Metro config (Expo).

### 4. Type-Only Imports

Use `import type` when importing only types:

```typescript
import type { ComponentProps } from 'react'
```

Reduces bundle size by avoiding runtime imports.

### 5. Avoid `any`

With strict mode, avoid `any`. Use:
- `unknown` for truly unknown types
- Generics for flexible types
- Union types for known possibilities

```typescript
// ❌ Bad
function process(data: any) {}

// ✅ Good
function process<T>(data: T) {}
function process(data: unknown) {}
```

### 6. Pin TypeScript Version

TypeScript is pinned to 5.9.2 across workspace. Don't upgrade individual packages:

```json
{
  "devDependencies": {
    "typescript": "5.9.2"
  }
}
```

### 7. Check Types in CI/CD

Always run type checks before builds:

```bash
pnpm check-types && pnpm build
```

TurboRepo ensures upstream packages type-check first via `^check-types` dependency.

## Reference

- TypeScript handbook: https://www.typescriptlang.org/docs/handbook/
- Module resolution: https://www.typescriptlang.org/docs/handbook/modules/theory.html
- Package config: /Users/jonathansmith/Projects/onyx-turborepo/packages/typescript-config
- Base config: /Users/jonathansmith/Projects/onyx-turborepo/packages/typescript-config/base.json
- Version: TypeScript 5.9.2
