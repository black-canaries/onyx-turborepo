# @repo/ui-native

React Native UI component library with NativeWind (Tailwind CSS) styling for the mobile app.

## Overview

This package provides React Native versions of the web UI components from `@repo/ui`, designed specifically for use with Expo and React Native. It uses NativeWind for styling, providing a familiar Tailwind CSS experience in React Native.

## Installation

This package is part of the monorepo and is already available as a workspace dependency.

```bash
pnpm add @repo/ui-native
```

## Usage

### Setup NativeWind in your app

1. Install required dependencies (already included):
   - `nativewind`
   - `react-native-reanimated`
   - `react-native-gesture-handler`

2. Configure your `tailwind.config.js` to include the ui-native package:

```js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    '../../packages/ui-native/src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  // ... rest of config
};
```

3. Import components:

```tsx
import { Button, Input, Card, Badge } from '@repo/ui-native';

export function MyScreen() {
  return (
    <Card>
      <Input label="Email" placeholder="Enter your email" />
      <Button color="primary">Submit</Button>
      <Badge color="success">Active</Badge>
    </Card>
  );
}
```

## Available Components

### Base Components

#### Buttons
- `Button` - Pressable button with multiple variants and sizes

#### Form Controls
- `Input` - Text input field
- `Label` - Form label
- `HintText` - Helper/error text
- `Textarea` - Multi-line text input
- `SelectNative` - Native picker/select (requires @react-native-picker/picker)
- `Checkbox` - Checkbox input
- `RadioButtons` - Radio button group
- `Toggle` - Toggle/Switch component

#### Display
- `Badge` - Badge component with various colors
- `Avatar` - User avatar component
- `Card`, `CardHeader`, `CardContent`, `CardFooter` - Card components
- `ProgressBar` - Progress indicator

### Application Components

- `LoadingIndicator` - Loading spinner with optional text
- `EmptyState` - Empty state placeholder

## Styling

Components use NativeWind for styling, which means you can:

1. Use Tailwind classes via the `className` prop
2. Customize colors and theme in `tailwind.config.js`
3. Override styles with custom classes

Example:

```tsx
<Button
  color="primary"
  size="lg"
  className="my-4"
>
  Custom Button
</Button>
```

## Utilities

- `cn()` / `cx()` - Class name merging utilities (same as web UI)

## Development

```bash
# Lint the package
pnpm lint

# Type check
pnpm check-types
```

## Notes

- This package exports raw TypeScript source (not bundled)
- The mobile app must transpile this package using Metro bundler
- Some components require additional native dependencies (e.g., SelectNative needs @react-native-picker/picker)
- Components are designed to work with Expo SDK 54+

## Differences from @repo/ui

- Uses React Native components instead of DOM elements
- Uses NativeWind instead of web Tailwind
- Simplified API where React Native doesn't support certain web features
- No direct React Aria Components (React Native doesn't support DOM)
- Native animations using Animated API instead of Framer Motion
