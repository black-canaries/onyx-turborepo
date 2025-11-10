# @repo/ui-native

React Native UI component library built with NativeWind v5 for cross-platform mobile apps.

## Overview

This package provides React Native components styled with NativeWind (Tailwind CSS for React Native), designed to work alongside the web-based `@repo/ui` package. Components share the same design tokens through `@repo/tailwind-config`.

## Features

- 🎨 **Tailwind CSS with NativeWind v5** - Use Tailwind classes in React Native
- 🎭 **Shared Design Tokens** - Consistent colors, spacing, typography across web and mobile
- ⚡ **React Native Reanimated** - Smooth 60fps animations
- 📦 **TypeScript First** - Full type safety and IntelliSense
- ♿ **Accessible** - Built with accessibility in mind

## Installation

This package is designed to be used within the monorepo. It's automatically available to apps via workspace protocol.

```bash
# In your app's package.json
{
  "dependencies": {
    "@repo/ui-native": "workspace:*"
  }
}
```

## Usage

```tsx
import { Button, Text, Card } from '@repo/ui-native';

function MyScreen() {
  return (
    <Card>
      <Text variant="displaySm" color="primary">
        Hello World
      </Text>
      <Button
        variant="primary"
        size="md"
        onPress={() => console.log('Pressed')}
      >
        Click me
      </Button>
    </Card>
  );
}
```

## Components

### Text
Typography component with design system variants:
- **Variants**: `displayXs`, `displaySm`, `displayMd`, `displayLg`, `displayXl`, `display2xl`, `xs`, `sm`, `md`, `lg`, `xl`
- **Colors**: `primary`, `secondary`, `tertiary`, `disabled`, `brand`, `error`, `warning`, `success`
- **Weights**: `regular`, `medium`, `semibold`, `bold`

### Button
Pressable button with multiple variants and states:
- **Variants**: `primary`, `secondary`, `tertiary`, `link`, `destructive`
- **Sizes**: `sm`, `md`, `lg`, `xl`
- **States**: default, pressed, disabled, loading
- **Icons**: Support for leading/trailing icons

### Card
Compound component for card layouts:
- `Card` - Container
- `CardHeader` - Header section
- `CardContent` - Main content
- `CardFooter` - Footer section

## Styling with NativeWind

Components use NativeWind's `className` prop for styling:

```tsx
<Text className="text-brand-600 font-semibold">
  Styled with Tailwind
</Text>
```

### Design Tokens

Design tokens are imported from `@repo/tailwind-config`:

```tsx
import { colors, spacing, fontSize } from '@repo/tailwind-config/native/tokens';

// Use in StyleSheet
const styles = StyleSheet.create({
  container: {
    padding: spacing[16],
    backgroundColor: colors.brand[600],
  },
});
```

## Component Patterns

### Forwarding Refs
All components support ref forwarding:

```tsx
const buttonRef = useRef<View>(null);
<Button ref={buttonRef} />
```

### Custom Styling
Override styles with `className` prop:

```tsx
<Button className="bg-purple-600 px-8">
  Custom Button
</Button>
```

### Composition
Build complex UIs by composing components:

```tsx
<Card>
  <CardHeader>
    <Text variant="displaySm">Title</Text>
  </CardHeader>
  <CardContent>
    <Text>Content goes here</Text>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

## Development

```bash
# Type checking
pnpm check-types

# Linting
pnpm lint
```

## Architecture

- **No bundling**: Exports raw TypeScript source for tree-shaking
- **Workspace dependencies**: Uses shared packages from monorepo
- **Platform-specific**: Built exclusively for React Native (no web support)

## Related Packages

- `@repo/ui` - Web/desktop component library
- `@repo/tailwind-config` - Shared design tokens
- `@repo/typescript-config` - TypeScript configuration
- `@repo/eslint-config` - ESLint rules
