# Turborepo Module Guidance

## When to Reach for Turborepo
- Use `turbo.json` to orchestrate repo-wide tasks (`build`, `lint`, `check-types`, `dev`).
- Prefer `turbo run <task>` over running scripts in individual packages when a task should fan out to workspaces.
- Keep new tasks consistent with existing naming (`build`, `check-types`, `lint`, `dev`).

## Core Commands
- `pnpm run dev` ? kicks off `turbo run dev` (non-cached, persistent dev processes).
- `pnpm run build` ? `turbo run build` (cached, produces `.next` builds and Electron output).
- `pnpm run lint` ? `turbo run lint` (zero-warning policy, uses shared ESLint config).
- `pnpm run check-types` ? verifies TypeScript across packages and apps; run before commits.

## Adding New Pipelines
- Declare new pipeline tasks inside `turbo.json` under `tasks` and document expected inputs/outputs.
- Register environment variables in `turbo.json.globalEnv` to avoid `turbo/no-undeclared-env-vars` warnings.
- Prefer workspace scripts that call `turbo run <task>` so caching remains consistent.

## Performance Tips
- Use `dependsOn: ['^task']` for tasks that must complete in dependencies first.
- Mark long-running dev tasks with `{ "cache": false, "persistent": true }`.
- When debugging caching, run `pnpm run <task> -- --force` to bust caches temporarily.
