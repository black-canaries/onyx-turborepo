"use client";

/**
 * @repo/ui-native - React Native UI Components with NativeWind
 *
 * Main export file for the UI component library.
 * Import components from this file in your React Native app.
 */

// Utilities
export { cx, sortCx } from "./utils/cx";

// Components
export { Text } from "./components/text";
export type { TextProps, TextVariant, TextColor, TextWeight } from "./components/text";

export { Button } from "./components/button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./components/button";

export {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "./components/card";
export type {
  CardProps,
  CardHeaderProps,
  CardContentProps,
  CardFooterProps,
} from "./components/card";
