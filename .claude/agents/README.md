# Claude Code Agents for Onyx Turborepo

Custom Claude Code agents for parallel development in the Onyx monorepo.

## 🎯 Quick Start

### Available Agents (Phase 1)

| Agent | Use For | Scope | Quick Command |
|-------|---------|-------|---------------|
| **web-app-dev** | Next.js web app features | `apps/web/` | `@agent web-app-dev: [task]` |
| **backend-dev** | Convex backend & database | `convex/`, `packages/convex/` | `@agent backend-dev: [task]` |
| **ui-library-dev** | Shared UI components | `packages/ui/` | `@agent ui-library-dev: [task]` |

### Basic Usage

**Single Agent:**
```markdown
@agent web-app-dev: Create a new /about page with company information
```

**Multiple Agents (Parallel):**
```markdown
Launch these agents in parallel:

1. @agent backend-dev: Add user profile schema with bio, location, website fields
2. @agent ui-library-dev: Create ProfileCard component
3. @agent web-app-dev: Create /profile page using ProfileCard
```

---

## 📚 Agent Details

### 1. web-app-dev

**Primary Focus**: Next.js 16 web application development

**Responsibilities**:
- Create pages and routes in `apps/web/app/`
- Implement proxy.ts functions (Next.js 16 pattern)
- Integrate components from `@repo/ui`
- Connect to Convex backend via `@repo/convex/client`
- Handle web-specific environment variables

**Skills**: `nextjs`, `reactjs`, `tailwind-css-4`

**Example Tasks**:
```markdown
@agent web-app-dev: Create a dashboard page with user statistics
@agent web-app-dev: Add authentication flow with login and signup pages
@agent web-app-dev: Implement a blog listing page with pagination
```

**Read More**: [web-app-dev.md](./web-app-dev.md)

---

### 2. backend-dev

**Primary Focus**: Convex backend, database, and API development

**Responsibilities**:
- Design and modify database schemas
- Implement Convex queries, mutations, and actions
- Create validators and indexes
- Maintain `@repo/convex` wrapper package
- Handle Supabase integration

**Skills**: `convex`, `typescript`

**Important Rules**:
- Follow `.cursor/rules/convex_rules.mdc` strictly
- Use `args` and `returns` validators on all functions
- Never use `ctx.db` in actions
- Use `internal*` functions for private API
- Document breaking schema changes

**Example Tasks**:
```markdown
@agent backend-dev: Add a tasks table with title, description, userId, completed fields
@agent backend-dev: Create getTasksByUser query with pagination
@agent backend-dev: Implement real-time notifications system
```

**Read More**: [backend-dev.md](./backend-dev.md)

---

### 3. ui-library-dev

**Primary Focus**: Shared UI component library

**Responsibilities**:
- Create reusable components in `packages/ui/`
- Build with React Aria Components for accessibility
- Use Tailwind CSS 4 for styling
- Support both web and desktop apps
- Handle forms with React Hook Form + Zod
- Add animations with Motion (Framer Motion)

**Skills**: `reactjs`, `tailwind-css-4`, `typescript`

**Important Notes**:
- Components must work in web AND desktop (not mobile/React Native)
- Built with Vite, exported as library
- Follow shadcn/ui patterns
- Maintain backward compatibility

**Example Tasks**:
```markdown
@agent ui-library-dev: Create a DataTable component with sorting and filtering
@agent ui-library-dev: Add a Toast notification system
@agent ui-library-dev: Create a multi-step form wizard component
```

**Read More**: [ui-library-dev.md](./ui-library-dev.md)

---

## 🚀 Parallel Workflows

### Workflow 1: Full-Stack Feature

**Scenario**: Add a complete feature with backend, UI, and frontend

**Execution**:
```markdown
Launch these agents in parallel:

1. @agent backend-dev
   Task: Add comments system to Convex
   - Create comments schema with postId, userId, content, createdAt
   - Add getComments query (paginated)
   - Add addComment mutation
   - Add deleteComment mutation

2. @agent ui-library-dev
   Task: Create comment UI components
   - CommentList component
   - CommentForm component (with React Hook Form)
   - CommentCard component with delete button

3. @agent web-app-dev
   Task: Add comments to blog posts
   - Integrate CommentList on post pages
   - Add CommentForm below posts
   - Connect to Convex queries/mutations
```

**Timeline**: ~25-35 minutes parallel vs ~75-90 minutes sequential
**Speed-up**: 3x faster

---

### Workflow 2: Design System Update

**Scenario**: Update shared components across apps

**Execution**:
```markdown
Launch these agents in parallel:

1. @agent ui-library-dev
   Task: Update Card component with new variants
   - Add elevated, outlined, filled variants
   - Update Tailwind classes
   - Add hover animations

2. @agent web-app-dev
   Task: Migrate web app to new Card API
   - Update all Card instances
   - Apply new variants appropriately
   - Test all pages

3. @agent desktop-app-dev (Phase 2)
   Task: Migrate desktop app to new Card API
   - Update all Card instances
   - Test desktop UI
```

**Timeline**: ~15-20 minutes parallel vs ~45-60 minutes sequential
**Speed-up**: 2.5-3x faster

---

### Workflow 3: Independent App Features

**Scenario**: Different apps need different features

**Execution**:
```markdown
Launch these agents in parallel:

1. @agent web-app-dev
   Task: Add analytics dashboard to web app
   - Create /dashboard/analytics page
   - Add charts and metrics

2. @agent desktop-app-dev (Phase 2)
   Task: Add system tray to desktop app
   - Implement Electron tray icon
   - Add right-click menu
```

**Timeline**: Both complete independently, no dependencies

---

## 💡 When to Use Which Agent

### Use web-app-dev When:
- ✅ Creating/modifying pages in web app
- ✅ Adding web-specific features (SEO, proxy.ts)
- ✅ Integrating shared components into web UI
- ✅ Connecting web app to backend

### Use backend-dev When:
- ✅ Adding database tables or schemas
- ✅ Creating new queries, mutations, or actions
- ✅ Updating backend API contracts
- ✅ Implementing backend business logic

### Use ui-library-dev When:
- ✅ Creating new reusable components
- ✅ Updating design system
- ✅ Adding form components
- ✅ Building animated/interactive UI elements

---

## 📋 Best Practices

### DO ✅

1. **Define Clear Boundaries**
   ```markdown
   Good: @agent web-app-dev: Modify files in apps/web/ only
   Bad:  @agent web-app-dev: Update entire app and backend
   ```

2. **Run Independent Tasks in Parallel**
   ```markdown
   Good: backend-dev + ui-library-dev + web-app-dev (all parallel)
   Bad:  Sequential execution when tasks are independent
   ```

3. **Communicate Dependencies**
   ```markdown
   Good: Step 1: backend-dev creates schema
         Step 2: web-app-dev uses generated types
   Bad:  Assume types exist before backend runs
   ```

4. **Use Type Safety**
   ```markdown
   Good: Wait for Convex types to generate, then use in frontend
   Bad:  Use 'any' types or skip type checking
   ```

### DON'T ❌

1. **Overlapping File Modifications**
   ```markdown
   Bad: web-app-dev and ui-library-dev both modify same component
   Good: One agent per file/directory scope
   ```

2. **Ignore Breaking Changes**
   ```markdown
   Bad: Update @repo/ui without notifying consuming apps
   Good: Document breaking changes, provide migration guide
   ```

3. **Skip Integration Testing**
   ```markdown
   Bad: Assume parallel agents work together without testing
   Good: Test integration after all agents complete
   ```

---

## 🔍 Troubleshooting

### Issue: "Agent modified files outside its scope"

**Solution**: Clarify scope in task description
```markdown
@agent web-app-dev: Create /about page (modify ONLY apps/web/ files)
```

---

### Issue: "Type errors after backend changes"

**Solution**: Run backend first, then frontend
```markdown
Step 1: @agent backend-dev: Add schema

Step 2 (after backend completes):
@agent web-app-dev: Use new types
```

---

### Issue: "Components not found in @repo/ui"

**Solution**: Ensure ui-library-dev exports components
```markdown
@agent ui-library-dev: Create Button and export in src/index.ts
```

Then verify:
```bash
pnpm turbo build --filter=@repo/ui
```

---

## 📊 Success Metrics

### Quality Indicators
- ✅ All agents complete successfully
- ✅ No type errors across monorepo
- ✅ All builds pass: `pnpm build`
- ✅ All lint checks pass: `pnpm lint` (zero warnings)
- ✅ Integration tests pass

### Speed Improvements
- **Single feature**: 2-3x faster with parallel agents
- **Design system update**: 2.5-3x faster
- **Independent features**: Complete simultaneously

---

## 📖 Additional Resources

- **Parallel Workflows Guide**: [parallel-workflows.md](./parallel-workflows.md)
- **Agent Definitions**:
  - [web-app-dev.md](./web-app-dev.md)
  - [backend-dev.md](./backend-dev.md)
  - [ui-library-dev.md](./ui-library-dev.md)
- **Convex Rules**: `.cursor/rules/convex_rules.mdc`
- **Monorepo Guide**: `.cursor/rules/monorepo.mdc`

---

## 🎓 Learning Path

### Beginner: Start with Single Agents
```markdown
# Try each agent individually
@agent web-app-dev: Create a simple /test page
@agent backend-dev: Add a simple users query
@agent ui-library-dev: Create a simple Badge component
```

### Intermediate: 2 Agents in Parallel
```markdown
# Backend + Frontend
1. @agent backend-dev: Add tasks schema
2. @agent web-app-dev: Create /tasks page
```

### Advanced: 3+ Agents in Parallel
```markdown
# Full-stack feature
1. @agent backend-dev: Add notifications system
2. @agent ui-library-dev: Create NotificationBell component
3. @agent web-app-dev: Integrate notifications in header
```

---

## 🛠️ Development Commands

### Agent-Specific Development

**Web App**:
```bash
pnpm turbo dev --filter=web          # Start dev server (port 3000)
pnpm turbo build --filter=web        # Build web app
pnpm turbo check-types --filter=web  # Type check
```

**Backend**:
```bash
npx convex dev                       # Start Convex dev server
npx convex deploy                    # Deploy functions
pnpm turbo build --filter=@repo/convex
```

**UI Library**:
```bash
pnpm turbo dev --filter=@repo/ui     # Watch and rebuild
pnpm turbo build --filter=@repo/ui   # Build library
```

### Monorepo Commands

```bash
pnpm build                           # Build all apps and packages
pnpm dev                             # Start all dev servers
pnpm lint                            # Lint entire monorepo
pnpm check-types                     # Type check all packages
```

---

## 🚦 Next Steps

### Phase 1 (Current) ✅
- [x] web-app-dev agent
- [x] backend-dev agent
- [x] ui-library-dev agent

### Phase 2 (Future)
- [ ] desktop-app-dev agent (Electron-specific features)
- [ ] mobile-app-dev agent (React Native/Expo)
- [ ] docs-writer agent (Documentation updates)

### Phase 3 (Automation)
- [ ] test-automation agent (Testing across monorepo)
- [ ] build-optimizer agent (Performance tuning)

---

## 📝 Contributing

When adding new agents:

1. **Create Agent Definition**
   - File: `.claude/agents/[agent-name].md`
   - Include: Role, Scope, Skills, Responsibilities, Constraints

2. **Update README**
   - Add to "Available Agents" table
   - Add usage examples
   - Update workflow patterns

3. **Test Agent**
   - Verify scope boundaries
   - Test parallel execution
   - Ensure no file conflicts

4. **Document Workflows**
   - Add to `parallel-workflows.md`
   - Include timeline estimates
   - Show coordination points

---

## 📄 License

Part of the Onyx Turborepo project.

---

**Version**: 1.0.0
**Last Updated**: 2025-01-09
**Maintainer**: Onyx Development Team
**Questions?** Check the detailed agent guides in this directory
