# TypeScript Module Guidance

## Repo-wide Standards
- Target TypeScript `5.9.x`; keep workspace packages aligned unless upgrading all consumers.
- Reuse shared configs from `@repo/typescript-config` (`/packages/typescript-config`). Use the exported entry points: `base`, `next`, `react-library`, `expo`, `electron`, `backend`, `node`.
- Prefer `tsconfig.json` that `extends` one of the shared configs and only override minimal options (e.g., `paths`, `outDir`).

## Type Checking
- Use `pnpm run check-types` to run `turbo run check-types` across all workspaces.
- For incremental debugging, run `pnpm run check-types --filter <package>`.
- Keep `tsconfig` references pointing to `.ts` modules with explicit `.js` extensions when using NodeNext or bundler module resolution (already enforced in shared configs).

## Adding Types
- Declare shared types in appropriate packages (e.g., `packages/ui/src`, `packages/convex/src`). Avoid duplicating types in app directories.
- For environment typings, add `env.d.ts` files near the applicable app/package and include them via `tsconfig.include`.
- When pulling in third-party libraries without types, add `@types/<pkg>` as a dev dependency in the relevant workspace.

## Tooling
- Enable ESLint (`pnpm run lint`) before pushing TypeScript-heavy changes?the configs are tuned to catch module-resolution mistakes.
- Use `tsc --noEmit` for quick checks when working on a single package (already scripted in each workspace).
