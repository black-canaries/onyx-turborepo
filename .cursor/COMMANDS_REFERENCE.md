# Cursor AI Commands - Complete Reference

This document provides a complete reference for all custom Cursor AI commands available in this workspace.

## All Commands (18 Total)

### Phase 1 - Essential Workflow ?

#### `dev:monitor`
**Usage**: Use Cmd+K and type `/dev:monitor` or Command Palette ? "dev:monitor"

**What it does**:
- Starts development server using `pnpm dev`
- Monitors for runtime/build errors
- Automatically fixes common issues (missing deps, TypeScript errors, linting errors)
- Provides diagnostic information if errors persist

**When to use**: 
- Starting development work
- When you want to catch errors early
- After pulling changes that might have dependency issues

---

#### `fix:errors`
**Usage**: Use Cmd+K and type `/fix:errors` or Command Palette ? "fix:errors"

**What it does**:
- Runs `pnpm check-types` to find TypeScript errors
- Runs `pnpm lint` to find linting errors
- Checks for build errors
- Reviews runtime errors
- Automatically fixes issues following project conventions
- Provides summary of fixes applied

**When to use**:
- After making code changes
- Before committing code
- When build/dev server shows errors
- As part of PR preparation

---

#### `pr:create`
**Usage**: Use Cmd+K and type `/pr:create` or Command Palette ? "pr:create"

**What it does**:
- Reviews current git changes
- Identifies scope of changes (apps/packages affected)
- Creates PR title following conventional commits
- Generates comprehensive PR description with:
  - Change summary
  - Affected platforms/apps
  - Testing information
  - Checklist for reviewers
- Suggests appropriate labels
- Provides git commands for branch creation

**When to use**:
- After completing a feature/bugfix
- Before creating a pull request
- When you want to ensure PR quality

---

### Phase 2 - Common Tasks ?

#### `dev:app`
**Usage**: Use Cmd+K and type `/dev:app` or Command Palette ? "dev:app"

**What it does**:
- Starts development server for a specific app (web, desktop, mobile, docs)
- Monitors for errors
- Provides status updates
- Fixes common issues automatically

**When to use**:
- When you only need to work on one app
- Testing a specific platform
- Faster startup for focused development

---

#### `fix:types`
**Usage**: Use Cmd+K and type `/fix:types` or Command Palette ? "fix:types"

**What it does**:
- Runs `pnpm check-types` to find TypeScript errors
- Fixes type errors following TypeScript best practices
- Provides summary of fixes

**When to use**:
- When you have TypeScript errors
- After refactoring type definitions
- Before committing type changes

---

#### `fix:lint`
**Usage**: Use Cmd+K and type `/fix:lint` or Command Palette ? "fix:lint"

**What it does**:
- Runs `pnpm lint` to find linting errors
- Auto-fixes ESLint violations
- Provides guidance for manual fixes when needed

**When to use**:
- When you have linting errors
- Before committing code
- After code changes

---

#### `plan:feature`
**Usage**: Use Cmd+K and type `/plan:feature` or Command Palette ? "plan:feature"

**What it does**:
- Guides you through feature planning
- Creates structured implementation plan
- Identifies affected files and packages
- Considers cross-platform implications
- Provides step-by-step implementation guide

**When to use**:
- Starting a new feature
- Planning cross-platform features
- When you need to understand scope and dependencies

---

#### `quality:check`
**Usage**: Use Cmd+K and type `/quality:check` or Command Palette ? "quality:check"

**What it does**:
- Runs `pnpm lint` - Check linting
- Runs `pnpm check-types` - Check TypeScript
- Optionally runs `pnpm build` if requested
- Reports all issues with details
- Offers to fix automatically

**When to use**:
- Before committing code
- Before creating PRs
- As part of code review process
- Regularly during development

---

#### `build:all`
**Usage**: Use Cmd+K and type `/build:all` or Command Palette ? "build:all"

**What it does**:
- Builds all apps and packages
- Monitors for build errors
- Identifies failed packages
- Provides build summary with recommendations

**When to use**:
- Before deploying
- After major changes
- Verifying all packages build correctly
- CI/CD preparation

---

#### `plan:refactor`
**Usage**: Use Cmd+K and type `/plan:refactor` or Command Palette ? "plan:refactor"

**What it does**:
- Analyzes current implementation
- Identifies affected files and packages
- Creates refactoring plan with backward compatibility
- Provides step-by-step guide
- Identifies migration path

**When to use**:
- Planning code refactoring
- Before major restructuring
- When you need to understand dependencies
- Minimizing breaking changes

---

#### `pr:review`
**Usage**: Use Cmd+K and type `/pr:review` or Command Palette ? "pr:review"

**What it does**:
- Reviews current git changes
- Analyzes code quality, type safety, linting
- Checks monorepo structure compliance
- Provides feedback and suggestions
- Prepares PR summary

**When to use**:
- Before creating PR
- After making changes
- Ensuring code quality
- Getting feedback on changes

---

#### `build:app`
**Usage**: Use Cmd+K and type `/build:app` or Command Palette ? "build:app"

**What it does**:
- Builds a specific app (web, desktop, mobile, docs)
- Checks for errors
- Verifies build output
- Fixes errors if possible

**When to use**:
- Building specific app
- Testing app build
- Faster than building all apps

---

### Phase 3 - Advanced Features ?

#### `generate:component`
**Usage**: Use Cmd+K and type `/generate:component` or Command Palette ? "generate:component"

**What it does**:
- Creates new component following project conventions
- Handles shared vs app-specific components
- Sets up proper TypeScript types
- Follows platform-specific patterns (web/desktop/mobile)
- Exports correctly

**When to use**:
- Creating new UI components
- Adding shared components to @repo/ui
- Creating app-specific components

---

#### `generate:page`
**Usage**: Use Cmd+K and type `/generate:page` or Command Palette ? "generate:page"

**What it does**:
- Creates new Next.js page/route
- Follows App Router conventions
- Sets up proper metadata
- Handles server/client components
- Creates API routes if needed

**When to use**:
- Adding new pages to web/desktop/docs apps
- Creating new routes
- Setting up API endpoints

---

#### `deps:add`
**Usage**: Use Cmd+K and type `/deps:add` or Command Palette ? "deps:add"

**What it does**:
- Adds dependency to correct location
- Uses workspace protocol for internal packages
- Handles root vs package-specific dependencies
- Provides guidance on placement
- Updates package.json correctly

**When to use**:
- Adding new dependencies
- Installing packages
- Adding dev dependencies

---

#### `deps:check`
**Usage**: Use Cmd+K and type `/deps:check` or Command Palette ? "deps:check"

**What it does**:
- Checks for version conflicts
- Identifies outdated packages
- Verifies workspace:* protocol usage
- Checks for missing peer dependencies
- Finds unused dependencies
- Reports security vulnerabilities

**When to use**:
- Before major updates
- Checking dependency health
- Resolving conflicts
- Security audits

---

#### `test:run`
**Usage**: Use Cmd+K and type `/test:run` or Command Palette ? "test:run"

**What it does**:
- Runs tests across monorepo
- Reports test results
- Identifies failing tests
- Offers to fix tests
- Helps set up testing if needed

**When to use**:
- Running test suite
- Before committing
- CI/CD verification
- Debugging test failures

---

#### `docs:update`
**Usage**: Use Cmd+K and type `/docs:update` or Command Palette ? "docs:update"

**What it does**:
- Updates README files
- Updates API documentation
- Updates setup instructions
- Documents new features
- Updates code examples
- Updates inline documentation

**When to use**:
- After feature completion
- When documentation is outdated
- Before releases
- Maintaining codebase

---

## How to Use Commands

### Method 1: Command Palette
1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Type the command name (e.g., "dev:monitor")
3. Select from the list

### Method 2: Cmd+K
1. Press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux)
2. Type `/` followed by the command name (e.g., "/dev:monitor")
3. The command will execute

### Method 3: Chat
1. Open Cursor chat
2. Mention the command name or describe what you want to do
3. Cursor will suggest using the appropriate command

---

## Command Categories

### Development
- `dev:monitor` - Start dev server with monitoring
- `dev:app` - Start specific app

### Error Resolution
- `fix:errors` - Fix all errors
- `fix:types` - Fix TypeScript errors
- `fix:lint` - Fix linting errors

### Planning
- `plan:feature` - Plan new features
- `plan:refactor` - Plan refactoring

### Pull Requests
- `pr:create` - Create PR
- `pr:review` - Review changes

### Build & Quality
- `build:all` - Build everything
- `build:app` - Build specific app
- `quality:check` - Run quality checks

### Code Generation
- `generate:component` - Generate components
- `generate:page` - Generate pages

### Dependencies
- `deps:add` - Add dependency
- `deps:check` - Check dependencies

### Testing & Documentation
- `test:run` - Run tests
- `docs:update` - Update docs

---

## Tips

- Commands are context-aware and understand your monorepo structure
- Commands respect platform differences (web, desktop, mobile)
- Commands use `pnpm` and `turbo` correctly
- Commands follow project conventions from `.cursor/rules` files
- Commands can be chained or used sequentially
- Commands provide clear feedback and actionable next steps

---

## Command Configuration

Commands are defined in `.cursor/commands.json`. To add or modify commands, edit this file.

See `.cursor/COMMANDS_PLAN.md` for the original plan and implementation details.

---

## Implementation Status

? **Phase 1** - Essential Workflow (3 commands)
? **Phase 2** - Common Tasks (6 commands)
? **Phase 3** - Advanced Features (9 commands)

**Total: 18 commands implemented**

All planned commands have been successfully implemented and are ready to use!
