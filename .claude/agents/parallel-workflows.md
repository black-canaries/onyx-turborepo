# Parallel Development Workflows

## Overview

This guide demonstrates how to use multiple Claude Code agents in parallel to accelerate development in the Onyx Turborepo monorepo.

**Benefits of Parallel Agent Execution:**
- ⚡ **Faster Development** - Multiple agents work simultaneously
- 🎯 **Specialized Focus** - Each agent handles its domain expertise
- 🔄 **Independent Progress** - Agents don't block each other
- 📊 **Clear Separation** - Reduced conflicts and clearer responsibilities

## Core Agents (Phase 1)

| Agent | Primary Focus | Parallel Compatible | Scope |
|-------|--------------|---------------------|-------|
| `web-app-dev` | Next.js web app | ✅ Yes | `apps/web/` |
| `backend-dev` | Convex functions | ✅ Yes | `convex/`, `packages/convex/` |
| `ui-library-dev` | Shared components | ✅ Yes | `packages/ui/` |

---

## Parallel Workflow Patterns

### Pattern 1: Full-Stack Feature Development

**Scenario**: Add a complete feature with backend, UI, and frontend integration

**Agents Involved**: 3 agents in parallel
- `backend-dev` - Creates database schema and API
- `ui-library-dev` - Builds shared UI components
- `web-app-dev` - Integrates everything in the web app

**Example: User Profile with Avatar Upload**

```markdown
Launch these agents in parallel:

1. @agent backend-dev
   Task: Add user profile feature to Convex
   - Create profile schema with fields: bio, location, website, avatarUrl
   - Add getProfile query
   - Add updateProfile mutation
   - Add uploadAvatar action (Supabase storage integration)
   - Export types from @repo/convex

2. @agent ui-library-dev
   Task: Create profile UI components
   - ProfileCard component (display mode)
   - ProfileForm component (edit mode with React Hook Form + Zod)
   - AvatarUpload component (with drag-and-drop)
   - Export all from @repo/ui

3. @agent web-app-dev
   Task: Create profile page in web app
   - Create /profile/page.tsx
   - Create /profile/edit/page.tsx
   - Integrate ProfileCard and ProfileForm from @repo/ui
   - Connect to Convex queries/mutations
   - Handle avatar upload flow
```

**Timeline**: All 3 agents work simultaneously, completing in ~20-30 minutes vs ~60-90 minutes sequential

**Coordination Points**:
- Backend exports types → Frontend uses types
- UI library exports components → Web app imports components
- All agents complete independently, then web app integrates

---

### Pattern 2: Cross-Platform UI Update

**Scenario**: Update design system or shared components

**Agents Involved**: 3 agents in parallel
- `ui-library-dev` - Updates component library
- `web-app-dev` - Migrates web app
- `desktop-app-dev` - Migrates desktop app

**Example: Button Component Redesign**

```markdown
Launch these agents in parallel:

1. @agent ui-library-dev
   Task: Update Button component with new design system
   - Update button variants (primary, secondary, destructive, ghost, link)
   - Add new sizes (xs, sm, default, lg, xl)
   - Update Tailwind classes with new design tokens
   - Add loading state variant
   - Export updated Button from @repo/ui
   - Document breaking changes in CHANGELOG.md

2. @agent web-app-dev
   Task: Migrate web app to new Button API
   - Find all Button imports in apps/web/
   - Update variant props
   - Update size props
   - Add loading states where applicable
   - Test all pages

3. @agent desktop-app-dev
   Task: Migrate desktop app to new Button API
   - Find all Button imports in apps/desktop/
   - Update variant props
   - Update size props
   - Test desktop UI
```

**Timeline**: Parallel execution ~15-20 minutes vs ~45-60 minutes sequential

---

### Pattern 3: Backend + Documentation

**Scenario**: Add complex backend features that need documentation

**Agents Involved**: 2 agents in parallel
- `backend-dev` - Implements backend logic
- `docs-writer` - Documents API and usage

**Example: Real-Time Notifications System**

```markdown
Launch these agents in parallel:

1. @agent backend-dev
   Task: Implement notifications system
   - Create notifications schema with type, title, message, read, userId, createdAt
   - Add getNotifications query (paginated)
   - Add markAsRead mutation
   - Add markAllAsRead mutation
   - Add sendNotification internal mutation
   - Set up real-time subscriptions
   - Export notification types

2. @agent docs-writer
   Task: Document notifications API
   - Create notifications section in apps/docs/
   - Document schema structure
   - Document all queries and mutations
   - Add usage examples for web/desktop/mobile
   - Document real-time subscription patterns
   - Add migration guide if needed
```

**Timeline**: Both complete simultaneously in ~25-35 minutes

---

### Pattern 4: Isolated App Development

**Scenario**: Multiple apps need independent features

**Agents Involved**: 2-3 app agents in parallel
- `web-app-dev` - Web-specific feature
- `desktop-app-dev` - Desktop-specific feature
- `mobile-app-dev` - Mobile-specific feature

**Example: Platform-Specific Features**

```markdown
Launch these agents in parallel:

1. @agent web-app-dev
   Task: Add analytics dashboard to web app
   - Create /dashboard/analytics page
   - Add charts with recharts library
   - Fetch data from Convex
   - Add export to CSV feature

2. @agent desktop-app-dev
   Task: Add system tray icon to desktop app
   - Implement tray icon in Electron main process
   - Add right-click context menu
   - Add show/hide window shortcuts
   - Add "Launch at startup" preference

3. @agent mobile-app-dev
   Task: Add biometric authentication to mobile app
   - Implement expo-local-authentication
   - Add Face ID / Touch ID prompts
   - Store auth token securely
   - Add fallback to PIN
```

**Timeline**: All 3 complete independently in ~30-40 minutes

---

## Workflow Templates

### Template 1: New Feature (Backend + Frontend)

```markdown
# Feature: [Feature Name]

## Parallel Agents

### Agent 1: backend-dev
**Task**: [Backend implementation]
- [ ] Schema changes
- [ ] Queries/mutations
- [ ] Types exported

### Agent 2: ui-library-dev (if new components needed)
**Task**: [Component creation]
- [ ] Component created
- [ ] Variants defined
- [ ] Exported from @repo/ui

### Agent 3: web-app-dev
**Task**: [Frontend integration]
- [ ] Page/route created
- [ ] Components integrated
- [ ] Convex functions connected

## Coordination
- Backend completes first → Frontend can type-check
- UI completes independently → Frontend can integrate
- All agents report completion → Integration testing

## Success Criteria
- [ ] Backend deployed
- [ ] UI library built
- [ ] Web app working
- [ ] All type checks pass
```

### Template 2: Refactoring (Multiple Apps)

```markdown
# Refactoring: [Refactor Name]

## Parallel Agents

### Agent 1: [shared-package]-dev
**Task**: [Update shared code]
- [ ] Breaking changes documented
- [ ] Migration guide provided
- [ ] New version published

### Agent 2: web-app-dev
**Task**: [Migrate web app]
- [ ] Updated imports
- [ ] Fixed breaking changes
- [ ] Tests pass

### Agent 3: desktop-app-dev
**Task**: [Migrate desktop app]
- [ ] Updated imports
- [ ] Fixed breaking changes
- [ ] Tests pass

## Coordination
- Shared package completes first
- Frontend agents migrate independently
- All apps build successfully

## Success Criteria
- [ ] All apps build
- [ ] All type checks pass
- [ ] No runtime errors
```

---

## Agent Invocation Syntax

### Single Agent
```markdown
@agent web-app-dev: Create a new /about page with company information
```

### Multiple Agents (Parallel)
```markdown
Launch these agents in parallel:

1. @agent backend-dev: Add user preferences schema
2. @agent ui-library-dev: Create SettingsPanel component
3. @agent web-app-dev: Create /settings page
```

### Sequential with Dependencies
```markdown
Step 1: @agent backend-dev: Add authentication schema

Then after backend completes:

Step 2 (parallel):
- @agent web-app-dev: Add login page
- @agent desktop-app-dev: Add login window
```

---

## Best Practices

### DO ✅

1. **Clear Task Boundaries**
   - Give each agent a specific, non-overlapping scope
   - Define what files each agent can modify

2. **Communicate Dependencies**
   - If Agent B needs Agent A's output, run sequentially
   - If independent, run in parallel

3. **Use Type Safety**
   - Backend exports types first
   - Frontend imports and uses generated types

4. **Monitor Progress**
   - Each agent reports completion independently
   - Verify integration after all agents complete

5. **Document Breaking Changes**
   - Shared package changes documented immediately
   - Migration guides provided before apps migrate

### DON'T ❌

1. **Overlapping File Access**
   - Don't have 2+ agents modify the same files
   - Use clear scope boundaries

2. **Assume Completion Order**
   - Agents may finish at different times
   - Don't depend on specific timing

3. **Skip Integration Testing**
   - After parallel agents complete, test integration
   - Verify all pieces work together

4. **Ignore Breaking Changes**
   - Coordinate breaking changes across all consuming apps
   - Use migration guides

---

## Coordination Strategies

### Strategy 1: Backend-First
```
backend-dev completes
    ↓
Types generated
    ↓
web-app-dev + desktop-app-dev + mobile-app-dev (parallel)
    ↓
All apps use typed API
```

### Strategy 2: UI-First
```
ui-library-dev completes
    ↓
Components exported
    ↓
web-app-dev + desktop-app-dev (parallel)
    ↓
All apps use shared components
```

### Strategy 3: Fully Parallel
```
backend-dev + ui-library-dev + web-app-dev (all parallel)
    ↓
Each completes independently
    ↓
Integration phase
    ↓
Test all pieces together
```

---

## Real-World Examples

### Example 1: E-Commerce Product Catalog

**Goal**: Add product browsing and filtering

**Parallel Execution**:
```markdown
1. @agent backend-dev
   - Create products schema
   - Add listProducts query with pagination
   - Add searchProducts query with filters
   - Add getProduct query

2. @agent ui-library-dev
   - Create ProductCard component
   - Create ProductGrid component
   - Create ProductFilters component
   - Create SearchBar component

3. @agent web-app-dev
   - Create /products page
   - Create /products/[id] page
   - Integrate ProductGrid and filters
   - Connect to Convex queries
```

**Timeline**: ~30-40 minutes parallel vs ~90-120 minutes sequential

---

### Example 2: Dark Mode Implementation

**Goal**: Add dark mode across web and desktop

**Parallel Execution**:
```markdown
1. @agent ui-library-dev
   - Update Tailwind config with dark mode classes
   - Update all components to support dark mode
   - Create ThemeProvider component
   - Create theme toggle button

2. @agent web-app-dev
   - Wrap app with ThemeProvider
   - Add theme toggle to header
   - Test all pages in dark mode
   - Persist theme preference

3. @agent desktop-app-dev
   - Wrap app with ThemeProvider
   - Add theme toggle to settings
   - Sync with system theme
   - Persist theme preference
```

**Timeline**: ~20-30 minutes parallel vs ~60-75 minutes sequential

---

### Example 3: Multi-Step Form

**Goal**: Add complex multi-step onboarding form

**Parallel Execution**:
```markdown
1. @agent backend-dev
   - Create onboarding schema
   - Add saveOnboardingStep mutation
   - Add getOnboardingProgress query
   - Add completeOnboarding mutation

2. @agent ui-library-dev
   - Create StepIndicator component
   - Create FormStep wrapper component
   - Create navigation buttons (Next/Back)
   - Add form field components

3. @agent web-app-dev
   - Create /onboarding page
   - Create step 1, 2, 3 components
   - Integrate StepIndicator
   - Connect to Convex mutations
   - Handle step navigation
```

**Timeline**: ~25-35 minutes parallel vs ~75-90 minutes sequential

---

## Troubleshooting

### Issue: Agents Modify Same Files

**Problem**: Both `web-app-dev` and `ui-library-dev` trying to modify same component

**Solution**:
- Clarify scope boundaries in task description
- One agent modifies, other agent waits or reads only
- Use sequential execution if necessary

---

### Issue: Type Mismatches

**Problem**: Frontend agent using types before backend generates them

**Solution**:
- Run `backend-dev` first to generate types
- Then run frontend agents in parallel
- Use sequential execution: backend → frontends

---

### Issue: Breaking Changes Not Communicated

**Problem**: Shared package changes break apps without warning

**Solution**:
- `ui-library-dev` or `backend-dev` document breaking changes
- Create migration guide before app agents run
- Notify all consuming app agents explicitly

---

## Measuring Success

### Metrics

**Development Speed**:
- Parallel: 3 agents × 30 min = 30 min total
- Sequential: 3 agents × 30 min = 90 min total
- **Speed-up: 3x faster**

**Quality Indicators**:
- All agents complete successfully
- Integration testing passes
- No type errors
- No runtime errors
- All builds pass

**Coordination Effectiveness**:
- Minimal conflicts between agents
- Clear communication of dependencies
- Smooth integration phase

---

## Next Steps

1. **Try a Simple Workflow**
   - Start with 2 agents (backend + frontend)
   - Build confidence with parallel execution

2. **Scale to 3+ Agents**
   - Add UI library agent
   - Run full-stack features in parallel

3. **Create Custom Workflows**
   - Document your team's common patterns
   - Build workflow templates for recurring tasks

4. **Monitor and Optimize**
   - Track time savings
   - Identify bottlenecks
   - Refine agent boundaries

---

**Version**: 1.0.0
**Last Updated**: 2025-01-09
**Maintainer**: Onyx Development Team
