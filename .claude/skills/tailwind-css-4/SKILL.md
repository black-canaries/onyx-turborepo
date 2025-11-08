---
name: tailwind-css-4
description: Tailwind CSS 4 styling skill covering the new CSS-first architecture, PostCSS configuration, custom variants, utilities, theme customization, Vite plugin integration, and shared configuration patterns. Use when styling components, configuring Tailwind, creating custom utilities, or setting up Tailwind in apps/packages.
---

# Tailwind CSS 4 Development

This project uses **Tailwind CSS 4.x** with the new **CSS-first architecture**.

## Key Difference: Tailwind CSS 4.x

Tailwind CSS 4 introduces a **CSS-first** approach instead of the traditional JavaScript config file:

- **No `tailwind.config.js`** - Configuration is done in CSS using `@theme` directive
- **PostCSS-based** - Uses PostCSS for processing
- **CSS imports** - Import Tailwind using `@import "tailwindcss"`
- **Native CSS variables** - Theme values are CSS variables

## Shared Configuration

**Location:** /Users/jonathansmith/Projects/onyx-turborepo/packages/tailwind-config

### Package Structure

```
packages/tailwind-config/
├── styles/
│   └── globals.css       # Main Tailwind CSS 4 configuration
├── postcss.config.js     # PostCSS configuration
└── package.json          # Exports configuration
```

### Using Shared Config

```json
// package.json
{
  "dependencies": {
    "@repo/tailwind-config": "workspace:*"
  }
}
```

```css
/* app/globals.css or styles/globals.css */
@import "@repo/tailwind-config";
```

## Tailwind CSS 4 Configuration

### globals.css Structure

```css
/* packages/tailwind-config/styles/globals.css */

@import "tailwindcss";

/* Theme configuration */
@theme {
  /* Custom colors */
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;

  /* Custom spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 0.75rem;

  /* Custom breakpoints */
  --breakpoint-3xl: 1920px;
}

/* Custom variants */
@variant dark (&:where(.dark, .dark *));
@variant label (&:has(+ label));

/* Custom utilities */
@utility scrollbar-hide {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
```

## Using Tailwind Classes

### Basic Styling

```tsx
export function Card() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="text-2xl font-bold text-gray-900">Title</h2>
      <p className="mt-2 text-gray-600">Description</p>
    </div>
  )
}
```

### Responsive Design

```tsx
export function ResponsiveGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {/* Grid items */}
    </div>
  )
}
```

### Dark Mode

```tsx
export function ThemedCard() {
  return (
    <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <h2 className="text-lg font-semibold">Themed Content</h2>
    </div>
  )
}
```

## Custom Variants

This project includes custom variants in the shared config:

### Dark Variant

```css
@variant dark (&:where(.dark, .dark *));
```

**Usage:**

```tsx
<div className="bg-white dark:bg-gray-900">
  Content
</div>
```

### Label Variant

```css
@variant label (&:has(+ label));
```

**Usage:**

```tsx
<input className="label:ring-2" />
<label>Label triggers ring</label>
```

### Focus-Input-Within Variant

```css
@variant focus-input-within (&:has(:is(input, textarea):focus));
```

**Usage:**

```tsx
<div className="focus-input-within:border-blue-500">
  <input type="text" />
</div>
```

## Custom Utilities

### Scrollbar Hide

```css
@utility scrollbar-hide {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
```

**Usage:**

```tsx
<div className="scrollbar-hide overflow-auto">
  {/* Scrollable content without scrollbar */}
</div>
```

### Transition Inherit All

```css
@utility transition-inherit-all {
  transition: all inherit;
}
```

**Usage:**

```tsx
<div className="transition-inherit-all">
  {/* Inherits parent transition */}
</div>
```

## Plugins

The shared config includes these plugins:

### Typography Plugin

```css
@plugin "@tailwindcss/typography";
```

**Usage:**

```tsx
<article className="prose dark:prose-invert">
  <h1>Article Title</h1>
  <p>Automatically styled prose content.</p>
</article>
```

### React Aria Components Plugin

```css
@plugin "tailwindcss-react-aria-components";
```

Provides utilities for React Aria Components states.

### Tailwind Animate Plugin

```css
@plugin "tailwindcss-animate";
```

**Usage:**

```tsx
<div className="animate-fade-in">Fades in</div>
<div className="animate-slide-up">Slides up</div>
```

## PostCSS Configuration

### For Next.js Apps

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### For Vite (Component Library)

```javascript
// vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

## Setting Up Tailwind in Apps

### Next.js App Setup

1. **Install dependencies:**

```bash
pnpm add @repo/tailwind-config --filter=web
```

2. **Create PostCSS config:**

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

3. **Import in global CSS:**

```css
/* app/globals.css */
@import "@repo/tailwind-config";

/* App-specific styles below */
```

4. **Import in layout:**

```tsx
// app/layout.tsx
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

### Vite Package Setup

1. **Install dependencies:**

```bash
pnpm add @tailwindcss/vite --filter=@repo/ui
```

2. **Configure Vite:**

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

3. **Import Tailwind:**

```css
/* src/index.css */
@import "tailwindcss";
```

## Theme Customization

### Adding Custom Colors

```css
/* packages/tailwind-config/styles/globals.css */

@theme {
  --color-brand-50: #f0f9ff;
  --color-brand-100: #e0f2fe;
  --color-brand-500: #0ea5e9;
  --color-brand-900: #0c4a6e;
}
```

**Usage:**

```tsx
<div className="bg-brand-500 text-white">Brand color</div>
```

### Adding Custom Spacing

```css
@theme {
  --spacing-18: 4.5rem;
  --spacing-72: 18rem;
}
```

**Usage:**

```tsx
<div className="mt-18 mb-72">Custom spacing</div>
```

### Adding Custom Fonts

```css
@theme {
  --font-family-display: "Playfair Display", serif;
}
```

**Usage:**

```tsx
<h1 className="font-display">Display heading</h1>
```

### Adding Custom Breakpoints

```css
@theme {
  --breakpoint-3xl: 1920px;
  --breakpoint-4xl: 2560px;
}
```

**Usage:**

```tsx
<div className="3xl:text-5xl 4xl:text-6xl">Large screen text</div>
```

## Advanced Patterns

### Creating Custom Variants

```css
/* Hover parent variant */
@variant hover-parent (&:is(:hover *));

/* Focus-visible variant */
@variant focus-visible (&:focus-visible);

/* Group hover variant */
@variant group-hover (.group:hover &);
```

**Usage:**

```tsx
<div className="group">
  <div className="group-hover:bg-blue-500">
    Changes on parent hover
  </div>
</div>
```

### Creating Complex Utilities

```css
@utility glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

@utility card-elevated {
  box-shadow:
    0 1px 3px 0 rgb(0 0 0 / 0.1),
    0 1px 2px -1px rgb(0 0 0 / 0.1);
  border-radius: 0.5rem;
  background: white;
  padding: 1.5rem;
}
```

**Usage:**

```tsx
<div className="glass">Glassmorphism effect</div>
<div className="card-elevated">Elevated card</div>
```

## Component Patterns

### Using clsx for Conditional Classes

```tsx
import clsx from 'clsx'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export function Button({ variant = 'primary', size = 'md', disabled }: ButtonProps) {
  return (
    <button
      className={clsx(
        'rounded-lg font-semibold transition-colors',
        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
          'bg-gray-200 text-gray-900 hover:bg-gray-300': variant === 'secondary',
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
          'opacity-50 cursor-not-allowed': disabled,
        }
      )}
      disabled={disabled}
    >
      Button
    </button>
  )
}
```

### Using Tailwind Merge (CVA Pattern)

```tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const buttonVariants = cva(
  'rounded-lg font-semibold transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  className?: string
}

export function Button({ variant, size, className }: ButtonProps) {
  return (
    <button className={twMerge(buttonVariants({ variant, size }), className)}>
      Button
    </button>
  )
}
```

## Performance Tips

1. **Avoid inline styles** - Use Tailwind classes instead
2. **Use design system** - Leverage shared theme values
3. **Extract components** - Don't repeat long class strings
4. **PurgeCSS works automatically** - Tailwind 4 removes unused styles
5. **Use semantic names** - Create custom utilities for common patterns

## Responsive Design Breakpoints

Default breakpoints (can be customized in `@theme`):

```
sm:  640px   (min-width)
md:  768px   (min-width)
lg:  1024px  (min-width)
xl:  1280px  (min-width)
2xl: 1536px  (min-width)
```

**Usage:**

```tsx
<div className="text-sm md:text-base lg:text-lg xl:text-xl">
  Responsive text
</div>
```

## Common Patterns

### Card Component

```tsx
export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      {children}
    </div>
  )
}
```

### Button with States

```tsx
<button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50">
  Click me
</button>
```

### Input with Focus States

```tsx
<input className="w-full rounded-lg border border-gray-300 px-4 py-2 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
```

### Grid Layout

```tsx
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {/* Grid items */}
</div>
```

### Flexbox Utilities

```tsx
<div className="flex items-center justify-between">
  <span>Left</span>
  <span>Right</span>
</div>
```

## Troubleshooting

### Styles not applying

- Check if `@import "@repo/tailwind-config"` is in your CSS file
- Ensure PostCSS is configured correctly
- Restart dev server after config changes
- Check if Tailwind classes are spelled correctly

### Custom theme values not working

- Verify `@theme` syntax in globals.css
- Use CSS variable naming: `--color-*`, `--spacing-*`
- Check if the theme values are in the shared config

### Dark mode not working

- Ensure you have the dark variant defined
- Add `dark` class to parent element (usually `<html>` or `<body>`)
- Use `dark:` prefix for dark mode styles

### Build errors with Vite

- Ensure `@tailwindcss/vite` plugin is installed
- Check plugin order in vite.config.ts
- Verify CSS import syntax

## Migration from Tailwind CSS 3.x

If migrating from Tailwind 3.x:

1. **Remove `tailwind.config.js`** - Not used in v4
2. **Update imports** - Use `@import "tailwindcss"` instead of separate imports
3. **Move config to CSS** - Use `@theme` directive for customization
4. **Update PostCSS** - Use `@tailwindcss/postcss` plugin
5. **Check custom utilities** - Use `@utility` directive
6. **Update variants** - Use `@variant` directive

## Best Practices

1. **Use shared config** - Import from `@repo/tailwind-config`
2. **Consistent naming** - Follow CSS variable naming conventions
3. **Mobile-first** - Design for mobile, add breakpoint modifiers for larger screens
4. **Semantic utilities** - Create custom utilities for repeated patterns
5. **Component extraction** - Extract components instead of repeating classes
6. **Dark mode** - Always consider dark mode for new components
7. **Accessibility** - Use focus states and proper contrast
8. **Performance** - Avoid unnecessary custom CSS

## Reference

- Tailwind CSS 4 docs: https://tailwindcss.com/docs
- Migration guide: https://tailwindcss.com/docs/upgrade-guide
- Shared config: /Users/jonathansmith/Projects/onyx-turborepo/packages/tailwind-config
- Global CSS: /Users/jonathansmith/Projects/onyx-turborepo/packages/tailwind-config/styles/globals.css
