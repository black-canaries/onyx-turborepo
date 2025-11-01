# Next.js Module Guidance

## Projects
- `apps/web` (Next.js 16 App Router)
- `apps/desktop` renderer (Next.js 16 + Electron shell)
- `apps/docs` (Next.js 16 documentation site)

## Common Commands
- `pnpm run dev --filter web` ? start web app on port 3000.
- `pnpm run dev --filter desktop` ? launches Next.js renderer and Electron shell (requires port 3010 free).
- `pnpm run dev --filter docs` ? dev server for docs app on port 3001.
- `pnpm run build --filter <app>` ? production build; ensures `.next` output is ready.

## Patterns & Conventions
- Use shared UI from `@repo/ui`; avoid redefining Tailwind tokens inside app directories.
- Import Tailwind config from `@repo/ui/tailwind.config` and extend `content` paths locally.
- Keep environment variables declared in `turbo.json.globalEnv` before accessing them in Next.js runtime code.
- Use `convex` and `supabase` helpers through `@repo/convex` and `@repo/supabase`; they already perform URL validation.

## Type Safety
- Run `pnpm run check-types --filter web` (or `desktop`/`docs`) for focused diagnostics.
- Ensure routes rely on generated `route-types` (`next typegen` is invoked automatically in `check-types`).
- Prefer `app/` directory for new features; follow existing layout (`layout.tsx`, `providers.tsx`).

## Testing & QA (future work)
- Add Playwright or Cypress integration per app if end-to-end testing needed.
- Use Vercel preview deployments to validate Next.js runtime differences when pushing branches.
