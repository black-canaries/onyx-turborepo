---
name: reactjs
description: React 19 development skill covering modern patterns, hooks, component architecture, React Aria Components, forms with React Hook Form and Zod, animations with Motion (Framer Motion), server/client components, and the shared component library (@repo/ui). Use for React component development, state management, accessibility, form handling, and UI implementation.
---

# React 19 Development

This project uses **React 19.2.0** across all applications with modern patterns and best practices.

## Technology Stack

- **React 19.2.0** - Core library
- **React Aria Components 1.13.0** - Accessible UI primitives
- **Motion 12.23.12** (Framer Motion) - Animations
- **React Hook Form 7.62.0** - Form management
- **Zod 4.0.17** - Schema validation
- **Recharts** - Data visualization

## Component Library

The project has a shared component library at `/packages/ui`:

**Location:** /Users/jonathansmith/Projects/onyx-turborepo/packages/ui

### Using Components

```tsx
// Import from @repo/ui
import { Button, Input, Card } from '@repo/ui'

// Import client-only components
import { HookForm } from '@repo/ui/client'

// Import styles
import '@repo/ui/styles/globals.css'
```

### Available Components

**Base Components:**
- Avatar, Badges, Buttons, Cards, Checkbox
- Dropdown, Forms, Inputs, Progress, Radio
- Select, Slider, Tags, Textarea, Toggle, Tooltip

**Application Components:**
- Navigation (Header, Sidebar)
- Tables, Tabs, Pagination, Carousel
- Charts (Bar, Line, Pie, Radar, Activity Gauges)
- Date Picker, File Upload, Modals, Slideouts
- Empty States, Loading Indicators

**Foundations:**
- Logo, Featured Icons, Rating
- Payment/Social Icons

## Component Patterns

### Functional Components (Modern)

```tsx
// Modern React 19 component
interface UserCardProps {
  name: string
  email: string
  avatar?: string
}

export function UserCard({ name, email, avatar }: UserCardProps) {
  return (
    <Card>
      {avatar && <Avatar src={avatar} alt={name} />}
      <h3>{name}</h3>
      <p>{email}</p>
    </Card>
  )
}
```

### Server vs Client Components (Next.js)

```tsx
// Server Component (default in Next.js App Router)
// No 'use client' directive
async function ServerComponent() {
  const data = await fetchData() // Direct data fetching
  return <div>{data}</div>
}

// Client Component
'use client'

import { useState } from 'react'

function ClientComponent() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

**Use 'use client' when you need:**
- React hooks (useState, useEffect, etc.)
- Event handlers (onClick, onChange)
- Browser APIs (localStorage, window)
- Context consumers
- Third-party libraries with hooks

## React 19 Hooks

### useState - State Management

```tsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

### useEffect - Side Effects

```tsx
import { useEffect } from 'react'

function DataFetcher() {
  const [data, setData] = useState(null)

  useEffect(() => {
    // Fetch data on mount
    fetchData().then(setData)

    // Cleanup function
    return () => {
      // Cancel subscriptions, etc.
    }
  }, []) // Empty deps = run once on mount
}
```

### useCallback - Memoize Functions

```tsx
import { useCallback } from 'react'

function Parent() {
  const handleClick = useCallback(() => {
    console.log('Clicked')
  }, []) // Dependencies

  return <Child onClick={handleClick} />
}
```

### useMemo - Memoize Values

```tsx
import { useMemo } from 'react'

function ExpensiveComponent({ items }) {
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.value - b.value)
  }, [items])

  return <ul>{sortedItems.map(item => <li key={item.id}>{item.name}</li>)}</ul>
}
```

### useRef - DOM References

```tsx
import { useRef, useEffect } from 'react'

function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return <input ref={inputRef} />
}
```

### Custom Hooks

```tsx
// useLocalStorage hook
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  })

  const setStoredValue = (newValue: T) => {
    setValue(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  return [value, setStoredValue] as const
}

// Usage
function Component() {
  const [name, setName] = useLocalStorage('name', 'John')
  return <input value={name} onChange={e => setName(e.target.value)} />
}
```

## Forms with React Hook Form + Zod

### Basic Form

```tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Define schema
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type FormData = z.infer<typeof schema>

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register('password')} type="password" placeholder="Password" />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Login</button>
    </form>
  )
}
```

### Using HookForm Component

```tsx
'use client'

import { HookForm } from '@repo/ui/client'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
})

function MyForm() {
  return (
    <HookForm
      schema={schema}
      onSubmit={(data) => {
        console.log(data)
      }}
    >
      {/* Form fields */}
    </HookForm>
  )
}
```

## React Aria Components (Accessibility)

The component library uses **React Aria Components** for accessible UI primitives.

### Button

```tsx
import { Button } from 'react-aria-components'

function MyButton() {
  return (
    <Button onPress={() => console.log('Pressed')}>
      Click me
    </Button>
  )
}
```

### Dialog (Modal)

```tsx
import {
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
  Button,
} from 'react-aria-components'

function MyModal() {
  return (
    <DialogTrigger>
      <Button>Open Modal</Button>
      <ModalOverlay>
        <Modal>
          <Dialog>
            {({ close }) => (
              <>
                <h2>Modal Title</h2>
                <p>Modal content</p>
                <Button onPress={close}>Close</Button>
              </>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  )
}
```

### Select

```tsx
import {
  Select,
  Label,
  Button,
  SelectValue,
  Popover,
  ListBox,
  ListBoxItem,
} from 'react-aria-components'

function MySelect() {
  return (
    <Select>
      <Label>Choose option</Label>
      <Button>
        <SelectValue />
      </Button>
      <Popover>
        <ListBox>
          <ListBoxItem id="1">Option 1</ListBoxItem>
          <ListBoxItem id="2">Option 2</ListBoxItem>
        </ListBox>
      </Popover>
    </Select>
  )
}
```

## Animations with Motion (Framer Motion)

The component library includes **Motion 12.23.12** for animations.

### Basic Animation

```tsx
import { motion } from 'motion/react'

function AnimatedBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      Animated content
    </motion.div>
  )
}
```

### Hover Animations

```tsx
import { motion } from 'motion/react'

function HoverCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Hover me
    </motion.div>
  )
}
```

### Variants

```tsx
import { motion } from 'motion/react'

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

function AnimatedList() {
  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
    >
      {items.map((item) => (
        <motion.li key={item.id} variants={variants}>
          {item.name}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

### Layout Animations

```tsx
import { motion } from 'motion/react'

function LayoutAnimation() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      style={{
        width: isExpanded ? '300px' : '150px',
        height: isExpanded ? '200px' : '100px',
      }}
    >
      Click to expand
    </motion.div>
  )
}
```

## Context API

### Creating Context

```tsx
import { createContext, useContext, useState } from 'react'

interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
```

### Using Context

```tsx
'use client'

import { useTheme } from './ThemeProvider'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  )
}
```

## Performance Optimization

### React.memo

```tsx
import { memo } from 'react'

const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  // Only re-renders if data changes
  return <div>{data}</div>
})
```

### Code Splitting

```tsx
import { lazy, Suspense } from 'react'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}
```

## Error Boundaries

```tsx
import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <MyComponent />
    </ErrorBoundary>
  )
}
```

## TypeScript with React

### Component Props

```tsx
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
}: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className={variant}>
      {children}
    </button>
  )
}
```

### Generic Components

```tsx
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map((item, index) => <li key={index}>{renderItem(item)}</li>)}</ul>
}

// Usage
<List
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
/>
```

## Component Library Structure

### packages/ui/src/

```
components/
├── base/           # Basic UI components
│   ├── buttons/
│   ├── inputs/
│   └── cards/
├── application/    # Complex components
│   ├── navigation/
│   ├── tables/
│   └── charts/
└── foundations/    # Design foundations
    ├── logo/
    └── icons/
```

### Creating New Components

```tsx
// packages/ui/src/components/base/my-component/MyComponent.tsx
export interface MyComponentProps {
  // Props
}

export function MyComponent({ }: MyComponentProps) {
  return <div>My Component</div>
}
```

```tsx
// packages/ui/src/components/base/my-component/index.ts
export { MyComponent } from './MyComponent'
export type { MyComponentProps } from './MyComponent'
```

```tsx
// packages/ui/src/index.ts
export { MyComponent } from './components/base/my-component'
```

## Best Practices

1. **Use functional components** - Avoid class components
2. **TypeScript for type safety** - Define prop types
3. **React Aria for accessibility** - Use accessible primitives
4. **Form validation with Zod** - Schema-based validation
5. **Memoization for performance** - Use memo, useMemo, useCallback wisely
6. **Error boundaries** - Catch and handle errors gracefully
7. **Code splitting** - Lazy load heavy components
8. **Server components by default** - Only use 'use client' when needed (Next.js)
9. **Custom hooks for logic** - Extract reusable logic
10. **Context sparingly** - Avoid context for frequently changing values

## Common Patterns

### Compound Components

```tsx
interface TabsContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

function Tabs({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState('tab1')

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  )
}

function TabList({ children }: { children: React.ReactNode }) {
  return <div role="tablist">{children}</div>
}

function Tab({ id, children }: { id: string; children: React.ReactNode }) {
  const { activeTab, setActiveTab } = useContext(TabsContext)!

  return (
    <button
      role="tab"
      aria-selected={activeTab === id}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  )
}

function TabPanel({ id, children }: { id: string; children: React.ReactNode }) {
  const { activeTab } = useContext(TabsContext)!

  if (activeTab !== id) return null

  return <div role="tabpanel">{children}</div>
}

Tabs.List = TabList
Tabs.Tab = Tab
Tabs.Panel = TabPanel

// Usage
<Tabs>
  <Tabs.List>
    <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab id="tab2">Tab 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel id="tab1">Content 1</Tabs.Panel>
  <Tabs.Panel id="tab2">Content 2</Tabs.Panel>
</Tabs>
```

### Render Props

```tsx
interface DataFetcherProps<T> {
  url: string
  children: (data: T | null, loading: boolean, error: Error | null) => React.ReactNode
}

function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [url])

  return children(data, loading, error)
}

// Usage
<DataFetcher url="/api/users">
  {(data, loading, error) => {
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    return <ul>{data.map((user) => <li key={user.id}>{user.name}</li>)}</ul>
  }}
</DataFetcher>
```

## Troubleshooting

### "Invalid hook call" error
- Ensure React version matches across packages
- Check metro.config.js (Expo) for React resolution
- Run `pnpm install` to sync versions

### Components not updating
- Check if you're mutating state directly
- Use functional updates: `setState(prev => ({ ...prev, value }))`
- Verify dependencies in useEffect/useMemo/useCallback

### Performance issues
- Use React DevTools Profiler
- Add React.memo to expensive components
- Memoize callbacks and values
- Check for unnecessary re-renders

## Reference

- React 19 docs: https://react.dev
- React Aria: https://react-spectrum.adobe.com/react-aria/
- Motion: https://motion.dev
- React Hook Form: https://react-hook-form.com
- Zod: https://zod.dev
- Component library: /Users/jonathansmith/Projects/onyx-turborepo/packages/ui
