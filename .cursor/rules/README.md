# Cursor Rules Overview

This repository defines module-specific Cursor rules under `.cursor/rules/modules`. Each Markdown file documents best practices, commands, and conventions for a given technology used in the monorepo. When working in Cursor, the agent will surface these rules automatically so keep them up to date as tooling evolves.

## Available Modules
- `turborepo.md` ? Pipelines, caching, and task orchestration guidance.
- `typescript.md` ? Shared tsconfig usage and typing conventions.
- `nextjs.md` ? Patterns for web, desktop renderer, and docs apps.
- `react-native-expo.md` ? Expo workflow, Metro configuration, and native shared components.
- `shadcn-ui.md` ? Shared UI library practices for shadcn-style components.
- `pnpm.md` ? Workspace script conventions and filtering tips.

Add new modules in `modules/` when introducing new stacks or workflows. Keep guidance concise (command lists, dos/don?ts) so Cursor suggestions stay actionable.
