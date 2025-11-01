# pnpm Commands & Scripts Guidance

## Global Usage
- Use `pnpm` for all install and script commands (workspace `packageManager` is `pnpm@9`).
- Run commands from repo root unless a package-specific context is required.

## Core Scripts
- `pnpm install` ? install dependencies and link workspace packages.
- `pnpm run dev` ? run `turbo run dev` across apps (persistent processes).
- `pnpm run build` ? build all packages/apps.
- `pnpm run lint` ? lint all packages/apps (zero-warning budget).
- `pnpm run check-types` ? TypeScript validation across workspace.

## Filtering & Scoping
- Append `--filter <workspace>` to run a script in a specific package/app: `pnpm run dev --filter web`.
- Use glob filters for groups, e.g., `pnpm run lint --filter "apps/..."`.
- For one-off commands inside a package, use `pnpm --filter <workspace> <command>` (e.g., `pnpm --filter ui test`).

## Executing Binaries
- Use `pnpm dlx <package>@latest` when scaffolding (e.g., `pnpm dlx create-expo-app`).
- Workspace binaries can be run via `pnpm <bin>` (pnpm automatically adds `.bin` to PATH).

## Lockfile Etiquette
- Commit `pnpm-lock.yaml` after dependency changes.
- Avoid manual edits in `node_modules`; use `pnpm up <pkg>` or adjust `package.json` then reinstall.
