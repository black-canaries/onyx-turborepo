# Cursor AI Commands Plan

## Overview
This document outlines the planned Cursor AI custom commands for optimizing development workflow in this Turborepo monorepo.

## Command Configuration Format
Cursor AI commands are stored in `.cursor/commands.json` with the following structure:
```json
[
  {
    "name": "command-name",
    "description": "Brief description of what the command does",
    "prompt": "Detailed prompt/instructions for the AI"
  }
]
```

## Planned Commands

### 1. Development & Monitoring Commands

#### 1.1 `dev:monitor` - Start Dev Server with Error Monitoring
**Description**: Start development server(s) and monitor for runtime/build errors, automatically fixing common issues.

**Prompt**: 
```
Start the development server using `pnpm dev` and monitor for errors. Watch for:
- Build errors (TypeScript, ESLint, compilation)
- Runtime errors (console errors, React errors)
- Port conflicts
- Missing dependencies

If errors occur:
1. First, identify the root cause
2. Check if it's a missing dependency (run `pnpm install` if needed)
3. Check TypeScript errors (run `pnpm check-types`)
4. Check linting errors (run `pnpm lint`)
5. Fix the errors automatically if possible
6. If errors persist, provide clear diagnostic information

Start monitoring from the workspace root. Use turbo to run dev tasks.
```

#### 1.2 `dev:app` - Start Specific App Dev Server
**Description**: Start development server for a specific app (web, desktop, mobile, docs).

**Prompt**:
```
Start the development server for [APP_NAME] where APP_NAME is one of: web, desktop, mobile, docs.

Use the command: `pnpm turbo dev --filter=[APP_NAME]`

If APP_NAME is not provided, ask which app to start.

Monitor for errors and provide status updates.
```

### 2. Error Resolution Commands

#### 2.1 `fix:errors` - Auto-fix Build and Runtime Errors
**Description**: Analyze and fix build errors, TypeScript errors, linting errors, and runtime issues.

**Prompt**:
```
Analyze the current codebase for errors:
1. Run `pnpm check-types` to find TypeScript errors
2. Run `pnpm lint` to find linting errors
3. Check for build errors in recent changes
4. Review runtime errors if dev server is running

For each error found:
- Read the relevant files
- Understand the error context
- Fix the error following project conventions:
  - Use TypeScript strictly
  - Follow ESLint rules from @repo/eslint-config
  - Respect monorepo structure
  - Use workspace:* for internal dependencies
- Ensure fixes don't break other parts of the codebase

After fixing, verify by running checks again. Provide a summary of fixes applied.
```

#### 2.2 `fix:types` - Fix TypeScript Errors
**Description**: Focus specifically on TypeScript type errors.

**Prompt**:
```
Run `pnpm check-types` to find all TypeScript errors across the monorepo.

For each error:
1. Read the file containing the error
2. Understand the type issue
3. Fix it following TypeScript best practices and project conventions
4. Ensure type safety is maintained

Provide a summary of all fixes applied.
```

#### 2.3 `fix:lint` - Fix Linting Errors
**Description**: Auto-fix ESLint errors across the codebase.

**Prompt**:
```
Run `pnpm lint` to find all linting errors.

For each error:
1. Read the file containing the error
2. Understand the linting rule violation
3. Fix it following the ESLint rules from @repo/eslint-config
4. Maintain code style consistency

If errors cannot be auto-fixed, provide clear guidance on manual fixes needed.
```

### 3. Feature Planning Commands

#### 3.1 `plan:feature` - Plan New Feature
**Description**: Create a structured plan for implementing a new feature across the monorepo.

**Prompt**:
```
Help plan a new feature. Ask the user for:
1. Feature name and description
2. Which apps/platforms are affected (web, desktop, mobile, docs, or all)
3. Backend requirements (Convex, Supabase, or both)
4. UI/UX requirements
5. Dependencies or integrations needed

Create a structured plan that includes:
- Architecture overview
- Files/components to create/modify
- Shared packages affected
- Implementation steps
- Testing approach
- Cross-platform considerations (if applicable)

Consider:
- Monorepo structure (shared packages vs app-specific)
- TypeScript type definitions
- Backend client wrappers (@repo/convex, @repo/supabase)
- UI component library (@repo/ui)
- Cross-platform compatibility
```

#### 3.2 `plan:refactor` - Plan Code Refactoring
**Description**: Plan refactoring work across the monorepo.

**Prompt**:
```
Help plan a refactoring task. Analyze the codebase to understand:
1. Current implementation
2. What needs to be refactored
3. Affected files and packages
4. Breaking changes risks
5. Dependencies between packages

Create a refactoring plan that:
- Identifies all affected files
- Ensures backward compatibility where possible
- Follows monorepo best practices
- Considers cross-platform implications
- Includes testing strategy
- Provides step-by-step implementation guide
```

### 4. Pull Request Commands

#### 4.1 `pr:create` - Create Pull Request
**Description**: Help create a well-structured pull request with description, title, and checklist.

**Prompt**:
```
Help create a pull request. First, check git status to see what changes exist.

Then:
1. Review the changes (git diff)
2. Identify the scope of changes (which apps/packages)
3. Create a PR title following conventional commits format
4. Create a comprehensive PR description including:
   - What changed and why
   - Which apps/platforms are affected
   - Testing done
   - Breaking changes (if any)
   - Screenshots (if UI changes)
   - Checklist:
     - [ ] Code follows project conventions
     - [ ] TypeScript types are correct
     - [ ] Linting passes
     - [ ] Tests pass (if applicable)
     - [ ] Cross-platform tested (if applicable)
     - [ ] Documentation updated (if needed)

5. Suggest appropriate labels based on changes
6. Provide the git commands to create the PR branch if not already created

If no changes exist, ask what feature/bugfix to work on first.
```

#### 4.2 `pr:review` - Review Current Changes for PR
**Description**: Review current git changes and prepare them for PR creation.

**Prompt**:
```
Review the current git changes:
1. Run `git status` to see changed files
2. Run `git diff` to see the actual changes
3. Analyze the changes for:
   - Code quality
   - Type safety
   - Linting compliance
   - Monorepo structure compliance
   - Cross-platform compatibility
   - Missing tests
   - Documentation gaps

4. Provide feedback and suggestions
5. Offer to fix any issues found
6. Prepare a summary suitable for PR description
```

### 5. Build & Quality Commands

#### 5.1 `build:all` - Build All Apps and Packages
**Description**: Build all apps and packages, check for errors, and provide build report.

**Prompt**:
```
Run `pnpm build` to build all apps and packages in the monorepo.

Monitor the build process:
1. Check for build errors
2. Identify which packages failed
3. For each failure:
   - Analyze the error
   - Check dependencies
   - Verify configuration
   - Fix if possible

Provide a build summary:
- Successful builds
- Failed builds with reasons
- Build times (if available)
- Recommendations for fixes
```

#### 5.2 `build:app` - Build Specific App
**Description**: Build a specific app with error checking.

**Prompt**:
```
Build the [APP_NAME] app where APP_NAME is one of: web, desktop, mobile, docs.

Use: `pnpm turbo build --filter=[APP_NAME]`

Monitor for errors and fix if possible. If APP_NAME is not provided, ask which app to build.
```

#### 5.3 `quality:check` - Run All Quality Checks
**Description**: Run linting, type checking, and build checks.

**Prompt**:
```
Run comprehensive quality checks:
1. `pnpm lint` - Check linting
2. `pnpm check-types` - Check TypeScript
3. Optionally run `pnpm build` if requested

For each check:
- Report failures
- Offer to fix automatically
- Provide summary

This ensures code quality before committing or creating PRs.
```

### 6. Component & Code Generation Commands

#### 6.1 `generate:component` - Generate New Component
**Description**: Create a new component following project conventions.

**Prompt**:
```
Create a new component. Ask the user for:
1. Component name
2. Platform (web/desktop uses @repo/ui, mobile uses @repo/ui/native)
3. Component type (button, card, form, etc.)
4. Location (which app or shared package)

Then:
1. Create the component file(s) following project structure
2. Use TypeScript with proper types
3. Follow shadcn/ui patterns for web/desktop
4. Export from appropriate index files
5. Add to @repo/ui if it's a shared component
6. Consider cross-platform compatibility

Use existing components as reference for style and structure.
```

#### 6.2 `generate:page` - Generate New Page/Route
**Description**: Create a new page/route for Next.js apps.

**Prompt**:
```
Create a new page/route. Ask the user for:
1. App name (web, desktop, docs)
2. Route path
3. Page type (server component, client component, API route)

Then:
1. Create the page file in app/[route]/page.tsx
2. Set up proper layout if needed
3. Use TypeScript
4. Follow Next.js 16 App Router conventions
5. Add proper metadata
6. Consider shared UI components from @repo/ui

Ensure the route follows Next.js conventions and project structure.
```

### 7. Dependency Management Commands

#### 7.1 `deps:add` - Add Dependency
**Description**: Add a dependency to the correct package/app.

**Prompt**:
```
Add a dependency. Ask the user for:
1. Package name
2. Target (specific app/package or root)
3. Type (dependency or devDependency)

Then:
1. Determine the correct location
2. Use `pnpm add` with workspace protocol if internal
3. Use `pnpm add -w -D` for root dev dependencies
4. Update package.json in correct location
5. If adding to shared package, consider if it should be peer dependency
6. Run `pnpm install` to install

Provide guidance on:
- Workspace protocol usage (workspace:*)
- Transpilation requirements for Next.js
- Platform-specific considerations
```

#### 7.2 `deps:check` - Check Dependency Issues
**Description**: Check for dependency conflicts, outdated packages, or missing dependencies.

**Prompt**:
```
Analyze dependencies:
1. Check for version conflicts across packages
2. Check for outdated packages
3. Verify workspace:* protocol usage for internal packages
4. Check for missing peer dependencies
5. Verify all dependencies are installed

Provide a report and suggest fixes if issues found.
```

### 8. Testing Commands

#### 8.1 `test:run` - Run Tests
**Description**: Run tests across the monorepo (if test setup exists).

**Prompt**:
```
Run tests in the monorepo. First check if test scripts exist in package.json files.

Then:
1. Run tests for all packages/apps
2. Or run tests for specific package/app if requested
3. Report test results
4. Identify failing tests
5. Offer to fix failing tests

If no test setup exists, offer to help set up testing infrastructure.
```

### 9. Documentation Commands

#### 9.1 `docs:update` - Update Documentation
**Description**: Update README or documentation based on code changes.

**Prompt**:
```
Review the codebase and update documentation:
1. Check if README files are up to date
2. Update API documentation if needed
3. Update setup instructions
4. Document new features/components
5. Update examples

Focus on:
- Root README.md
- App-specific READMEs
- Package READMEs
- Inline code documentation

Ensure documentation reflects current state of the codebase.
```

## Implementation Priority

### Phase 1 (Essential Workflow)
1. `dev:monitor` - Core development workflow
2. `fix:errors` - Error resolution
3. `pr:create` - PR workflow

### Phase 2 (Common Tasks)
4. `plan:feature` - Feature planning
5. `quality:check` - Quality assurance
6. `build:all` - Build verification

### Phase 3 (Advanced)
7. `generate:component` - Code generation
8. `deps:manage` - Dependency management
9. Remaining commands

## Notes

- Commands should be context-aware and understand the monorepo structure
- Commands should respect platform differences (web, desktop, mobile)
- Commands should use pnpm and turbo commands correctly
- Commands should follow project conventions from .cursor/rules files
- Commands should provide clear feedback and actionable next steps
