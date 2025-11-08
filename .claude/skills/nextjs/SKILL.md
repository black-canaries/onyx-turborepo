---
name: nextjs
description: Next.js 16 development skill for App Router applications. Use when working with Next.js projects, implementing routes, server/client components, proxy functions (proxy.ts replaces middleware.ts), API routes, layouts, environment variables, or configuring Next.js. Covers App Router patterns, typed routes, server actions, and monorepo package transpilation.
---

# Next.js 16 Development

This project uses **Next.js 16.0.1** with the **App Router** architecture.

## Next.js Apps in This Project

### `/apps/web` - Main Web Application
- **Port:** 3000
- **Location:** /Users/jonathansmith/Projects/onyx-turborepo/apps/web
- **Config:** apps/web/next.config.js:1
- **Features:** Typed routes, Convex integration, shared UI components

### `/apps/desktop` - Electron Renderer
- **Port:** 3010
- **Location:** /Users/jonathansmith/Projects/onyx-turborepo/apps/desktop
- **Config:** apps/desktop/next.config.ts:1
- **Features:** Electron integration, transpiled workspace packages

### `/apps/docs` - Documentation Site
- **Port:** 3001
- **Location:** /Users/jonathansmith/Projects/onyx-turborepo/apps/docs
- **Features:** Simple docs site with shared UI

## App Router Structure

```
app/
├── layout.tsx          # Root layout (required)
├── page.tsx            # Home page (/)
├── loading.tsx         # Loading UI
├── error.tsx           # Error boundary
├── not-found.tsx       # 404 page
├── proxy.ts            # Proxy function (replaces middleware.ts)
├── api/
│   └── route.ts        # API route
└── [dynamic]/
    └── page.tsx        # Dynamic route
```

## IMPORTANT: Proxy Pattern (Next.js 16)

**Next.js 16 uses `proxy.ts` and proxy functions to replace `middleware.ts` and middleware functions.**

### Creating a Proxy Function

```typescript
// app/proxy.ts
import { NextRequest, NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
  // Authentication check
  const token = request.cookies.get('token')

  if (!token && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Add custom headers
  const response = NextResponse.next()
  response.headers.set('x-custom-header', 'value')

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
```

**Do NOT create `middleware.ts` files - use `proxy.ts` instead.**

## Server vs Client Components

### Server Components (Default)

```tsx
// app/page.tsx
// Server component by default - can fetch data directly

async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()

  return <div>{data.title}</div>
}
```

**Benefits:**
- Direct database/API access
- No JavaScript sent to client
- Automatic data fetching
- SEO-friendly

### Client Components

```tsx
'use client'

// app/components/Counter.tsx
import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

**Use 'use client' when you need:**
- Hooks (useState, useEffect, etc.)
- Event listeners (onClick, onChange, etc.)
- Browser APIs (localStorage, window, etc.)
- Third-party libraries using hooks

### Composition Pattern

```tsx
// app/page.tsx (Server Component)
import { Counter } from './Counter' // Client Component

export default function Page() {
  // Fetch data on server
  const data = await fetchData()

  return (
    <div>
      <h1>{data.title}</h1>
      {/* Client component for interactivity */}
      <Counter />
    </div>
  )
}
```

## Typed Routes

This project has typed routes enabled:

```typescript
// next.config.js
experimental: {
  typedRoutes: true
}
```

### Using Typed Routes

```tsx
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <>
      {/* TypeScript will check these routes exist */}
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/users/123">User 123</Link>

      <button onClick={() => router.push('/settings')}>
        Settings
      </button>
    </>
  )
}
```

## Layouts and Templates

### Root Layout (Required)

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'My App',
  description: 'App description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### Nested Layouts

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <nav>{/* Dashboard navigation */}</nav>
      <main>{children}</main>
    </div>
  )
}
```

## Data Fetching

### Server-Side Fetching

```tsx
// app/page.tsx
async function getData() {
  // This runs on the server
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store', // Dynamic data
    // or
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  })

  if (!res.ok) throw new Error('Failed to fetch')

  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <div>{data.title}</div>
}
```

### Caching Strategies

```typescript
// No caching (always fresh)
fetch(url, { cache: 'no-store' })

// Cache indefinitely
fetch(url, { cache: 'force-cache' })

// Revalidate after time
fetch(url, { next: { revalidate: 3600 } })

// Revalidate on demand
fetch(url, { next: { tags: ['posts'] } })
```

### Revalidating Data

```typescript
// app/actions.ts
'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

export async function createPost(data: FormData) {
  // Create post...

  // Revalidate specific path
  revalidatePath('/blog')

  // Or revalidate by tag
  revalidateTag('posts')
}
```

## Server Actions

```tsx
// app/actions.ts
'use server'

export async function createUser(formData: FormData) {
  const name = formData.get('name')

  // Server-side logic
  const user = await db.user.create({ name })

  return { success: true, user }
}
```

```tsx
// app/page.tsx (Client Component)
'use client'

import { createUser } from './actions'

export default function Page() {
  return (
    <form action={createUser}>
      <input name="name" />
      <button type="submit">Create</button>
    </form>
  )
}
```

## API Routes

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const users = await fetchUsers()
  return NextResponse.json({ users })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const user = await createUser(body)
  return NextResponse.json({ user }, { status: 201 })
}
```

### Dynamic API Routes

```typescript
// app/api/users/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await fetchUser(params.id)
  return NextResponse.json({ user })
}
```

## Environment Variables

### Server-Side Variables

```bash
# .env.local
DATABASE_URL=postgresql://...
API_SECRET=secret123
```

```typescript
// Can only access on server
const dbUrl = process.env.DATABASE_URL
```

### Client-Side Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_CONVEX_URL=https://...
```

```typescript
// Accessible on client and server
const apiUrl = process.env.NEXT_PUBLIC_API_URL
```

**IMPORTANT:** Apps DO NOT inherit environment variables from the monorepo root. Create `.env.example` and `.env.local` files in each app's root directory.

## Monorepo Configuration

### Transpiling Workspace Packages

When using workspace packages that need transpilation:

```javascript
// next.config.js
const nextConfig = {
  transpilePackages: [
    '@repo/ui',
    '@repo/convex',
    '@repo/supabase'
  ],
}

module.exports = nextConfig
```

This is required for packages that:
- Use JSX/TSX
- Need to be processed by Next.js
- Are imported from the monorepo

### Current App Configurations

**apps/web/next.config.js:**
```javascript
transpilePackages: ['@repo/convex']
```

**apps/desktop/next.config.ts:**
```javascript
transpilePackages: ['@repo/ui', '@repo/convex', '@repo/supabase']
```

## Image Optimization

```tsx
import Image from 'next/image'

export default function Page() {
  return (
    <>
      {/* Local image */}
      <Image
        src="/hero.png"
        alt="Hero"
        width={500}
        height={300}
      />

      {/* Remote image */}
      <Image
        src="https://example.com/image.jpg"
        alt="Remote"
        width={500}
        height={300}
      />

      {/* Fill container */}
      <div style={{ position: 'relative', width: '100%', height: '400px' }}>
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
    </>
  )
}
```

## Metadata and SEO

### Static Metadata

```typescript
// app/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
  openGraph: {
    title: 'OG Title',
    description: 'OG Description',
    images: ['/og-image.jpg'],
  },
}
```

### Dynamic Metadata

```typescript
// app/blog/[slug]/page.tsx
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post = await fetchPost(params.slug)

  return {
    title: post.title,
    description: post.excerpt,
  }
}
```

## Loading States

```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <div>Loading dashboard...</div>
}
```

This automatically wraps the route segment in a Suspense boundary.

## Error Handling

```tsx
// app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

## Development Commands

```bash
# Start dev server
pnpm dev --filter=web

# Build for production
pnpm build --filter=web

# Start production server
pnpm start --filter=web

# Lint
pnpm lint --filter=web

# Type check
pnpm check-types --filter=web
```

## Common Patterns

### Protected Routes (Using Proxy)

```typescript
// app/proxy.ts
import { NextRequest, NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
  const session = request.cookies.get('session')

  // Protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}
```

### Redirects

```typescript
// Server Component
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return <div>Welcome {user.name}</div>
}
```

### Not Found

```tsx
// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug)

  if (!post) {
    notFound()
  }

  return <article>{post.content}</article>
}
```

## Troubleshooting

### "Module not found" for workspace packages
- Add package to `transpilePackages` in next.config.js
- Run `pnpm install` to refresh workspace
- Check package.json exports in the workspace package

### Hot reload not working
- Restart dev server
- Check if workspace package is in `transpilePackages`
- Clear `.next` directory: `rm -rf .next`

### Environment variables not available
- Prefix client variables with `NEXT_PUBLIC_`
- Create `.env.local` in the app's root directory (not monorepo root)
- Restart dev server after changing env vars

### Build errors with TypeScript
- Run `pnpm check-types --filter=web` to see all errors
- Check `tsconfig.json` extends from `@repo/typescript-config`
- Ensure workspace packages are built: `pnpm build --filter=@repo/ui`

## Best Practices

1. **Use Server Components by default** - Only add 'use client' when needed
2. **Proxy, not middleware** - Use proxy.ts for Next.js 16, not middleware.ts
3. **Colocate components** - Keep components in app/ directory near usage
4. **Typed routes** - Leverage TypeScript route checking
5. **Environment variables per app** - Don't rely on root .env files
6. **Transpile workspace packages** - Configure next.config for monorepo packages
7. **Metadata for SEO** - Export metadata from pages
8. **Error boundaries** - Implement error.tsx for graceful failures

## Reference

- Next.js 16 docs: https://nextjs.org/docs
- App Router: https://nextjs.org/docs/app
- Data Fetching: https://nextjs.org/docs/app/building-your-application/data-fetching
