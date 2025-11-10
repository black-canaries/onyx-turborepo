# @repo/tailwind-config

Shared Tailwind CSS design tokens for cross-platform use across web, desktop, and mobile apps.

## Package Structure

```
@repo/tailwind-config/
├── css/
│   └── theme.css          # CSS custom properties for web/desktop
└── native/
    ├── tokens.ts          # JavaScript/TypeScript constants for React Native
    └── tokens.d.ts        # TypeScript declarations (auto-generated)
```

## Usage

### Web / Desktop (Next.js, Electron)

Import the CSS theme file in your Tailwind CSS configuration or global styles:

```css
/* In your global.css or theme file */
@import "@repo/tailwind-config/css/theme";
```

Or reference it from your `@repo/ui` package which already imports it.

### React Native / Expo (Mobile)

Import design tokens as JavaScript constants:

```typescript
import { colors, fontSize, spacing, radius, shadows } from '@repo/tailwind-config/native/tokens';

// Use in StyleSheet
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.brand[600],
    paddingHorizontal: spacing[16],
    paddingVertical: spacing[12],
    borderRadius: radius.lg,
    ...shadows.md,
  },
  text: {
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
    color: colors.white,
  },
});
```

### NativeWind v5

The tokens are also compatible with NativeWind's Tailwind-in-RN approach. Configure your `tailwind.config.js` to use these tokens:

```javascript
// apps/mobile/tailwind.config.js
import { colors, fontSize, spacing, radius } from '@repo/tailwind-config/native/tokens';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui-native/src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      fontSize,
      spacing,
      borderRadius: radius,
    },
  },
};
```

## Design Tokens

### Colors
- **Brand**: Purple/violet brand colors (25-950 scale)
- **Semantic**: error, warning, success (25-950 scale)
- **Gray**: Multiple gray variants (gray, gray-blue, gray-cool, gray-modern, gray-neutral, gray-iron)
- **Base**: transparent, white, black

### Typography
- **Font Sizes**: xs, sm, md, lg, xl, displayXs, displaySm, displayMd, displayLg, displayXl, display2xl
- **Line Heights**: Matching line heights for each font size
- **Letter Spacing**: Negative letter spacing for display sizes

### Spacing
- **Base Unit**: 4px (0.25rem)
- **Scale**: 0-96 (standard Tailwind spacing scale)

### Border Radius
- **Scale**: none, xs, sm, md, lg, xl, 2xl, 3xl, full

### Shadows
- React Native shadow objects with `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`, and `elevation`
- **Sizes**: xs, sm, md, lg, xl, 2xl, 3xl

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import type { FontSize, ColorScale, Shadow, Spacing } from '@repo/tailwind-config/native/tokens';
```

## Development

```bash
# Type check
pnpm check-types

# Build TypeScript declarations
pnpm build
```
