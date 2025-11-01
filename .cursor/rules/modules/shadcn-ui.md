# shadcn/ui Module Guidance

## Shared Package
- Located in `packages/ui` with exports from `src/components/ui/*` and `src/native/*`.
- Tailwind tokens and CSS live in `packages/ui/styles.css`; apps import via `@repo/ui/styles.css`.
- Tailwind config is centralized in `packages/ui/tailwind.config.ts`; apps extend content paths and reuse theme tokens.

## Adding Components
- Follow shadcn/ui conventions: component in `src/components/ui/<component>.tsx`, optional primitives in `src/lib`.
- Export the component from `src/components/ui/<component>.tsx`, re-export in `src/index.ts` with explicit `.js` extension.
- If a React Native equivalent is needed, place it in `src/native/` and expose via `src/native/index.ts`.

## Styling Rules
- Use `class-variance-authority` (`cva`) for variants; it is already a dependency.
- Compose class names with `cn` helper from `src/lib/utils.ts`.
- Keep design tokens in CSS custom properties (`styles.css`); avoid embedding magic colors in components unless platform-specific.

## Tailwind Usage in Apps
- Import Tailwind base styles in each app?s `globals.css`: `@import "@repo/ui/styles.css"; @import "tailwindcss";`.
- Tailwind config in apps should spread the shared config: `import shared from "@repo/ui/tailwind.config"; export default { ...shared, content: [...] }`.
- Run `pnpm run check-types --filter <app>` after adding new content globs to ensure type-safe theme usage.

## Iconography & Assets
- Use `lucide-react` (already dependency) for icons in web/desktop apps.
- For React Native, supply replacements or keep icons optional.
