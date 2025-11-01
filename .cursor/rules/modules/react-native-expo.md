# React Native & Expo Module Guidance

## Project
- `apps/mobile` (Expo SDK 54, React Native 0.81)

## Core Commands
- `pnpm run start --filter mobile` ? Expo dev server (interactive CLI for iOS/Android/Web).
- `pnpm run android --filter mobile` / `pnpm run ios --filter mobile` ? launch platform-specific emulators.
- `pnpm run web --filter mobile` ? Expo web preview (uses React DOM).
- `pnpm run lint --filter mobile` ? React Native lint rules (flat config in `eslint.config.js`).
- `pnpm run check-types --filter mobile` ? TypeScript validation using shared Expo tsconfig.

## Metro & Module Resolution
- `babel.config.js` sets `module-resolver` so `@repo/ui` resolves to the native export (`@repo/ui/native`). Maintain this alias when adding new shared modules.
- `metro.config.js` already watches the monorepo root; keep new packages within `packages/` to stay inside watch folders.

## Styling & Components
- Shared primitives live in `packages/ui/src/native`. Add new React Native components there; re-export from `native/index.ts`.
- Use Tailwind tokens only when targeting web. Native components rely on `StyleSheet` definitions.

## Environment Variables
- Expo uses `EXPO_PUBLIC_*` variables. Declare any new keys in `turbo.json.globalEnv` to avoid lint failures.
- Access vars via `process.env.EXPO_PUBLIC_<NAME>` in client code.

## Deployment Considerations
- Before building native binaries, ensure `expo prebuild` respects monorepo workspace versions.
- For OTA updates, keep shared packages versioned; modifications automatically propagate after bundling.
