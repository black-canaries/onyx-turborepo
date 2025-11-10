"use client";

import React from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";
import { cx, sortCx } from "../utils/cx";

/**
 * Typography variants based on design system
 */
export type TextVariant =
  | "displayXs"
  | "displaySm"
  | "displayMd"
  | "displayLg"
  | "displayXl"
  | "display2xl"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl";

/**
 * Color variants for text
 */
export type TextColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "disabled"
  | "brand"
  | "error"
  | "warning"
  | "success"
  | "white"
  | "black";

/**
 * Font weight variants
 */
export type TextWeight = "regular" | "medium" | "semibold" | "bold";

export interface TextComponentProps extends Omit<RNTextProps, "style"> {
  /**
   * Typography variant - controls font size and line height
   * @default "md"
   */
  variant?: TextVariant;

  /**
   * Text color from design system
   * @default "primary"
   */
  color?: TextColor;

  /**
   * Font weight
   * @default "regular"
   */
  weight?: TextWeight;

  /**
   * Additional Tailwind classes
   */
  className?: string;

  /**
   * Text content
   */
  children?: React.ReactNode;
}

/**
 * Style mappings for typography variants
 */
const variantStyles = sortCx({
  displayXs: "text-2xl leading-8",  // 24px / 32px
  displaySm: "text-[30px] leading-[38px]",  // 30px / 38px
  displayMd: "text-4xl leading-11 tracking-tight",  // 36px / 44px
  displayLg: "text-5xl leading-[60px] tracking-tight",  // 48px / 60px
  displayXl: "text-[60px] leading-[72px] tracking-tight",  // 60px / 72px
  display2xl: "text-[72px] leading-[90px] tracking-tighter",  // 72px / 90px
  xs: "text-xs leading-[18px]",  // 12px / 18px
  sm: "text-sm leading-5",  // 14px / 20px
  md: "text-base leading-6",  // 16px / 24px
  lg: "text-lg leading-7",  // 18px / 28px
  xl: "text-xl leading-[30px]",  // 20px / 30px
});

/**
 * Style mappings for text colors
 */
const colorStyles = sortCx({
  primary: "text-gray-950 dark:text-gray-50",
  secondary: "text-gray-700 dark:text-gray-300",
  tertiary: "text-gray-600 dark:text-gray-400",
  disabled: "text-gray-400 dark:text-gray-600",
  brand: "text-brand-600 dark:text-brand-400",
  error: "text-error-600 dark:text-error-400",
  warning: "text-warning-600 dark:text-warning-400",
  success: "text-success-600 dark:text-success-400",
  white: "text-white",
  black: "text-black",
});

/**
 * Style mappings for font weights
 */
const weightStyles = sortCx({
  regular: "font-normal",  // 400
  medium: "font-medium",  // 500
  semibold: "font-semibold",  // 600
  bold: "font-bold",  // 700
});

/**
 * Text component with design system typography variants
 *
 * @example
 * ```tsx
 * <Text variant="displayMd" color="brand" weight="bold">
 *   Hello World
 * </Text>
 *
 * <Text variant="sm" color="secondary">
 *   Smaller secondary text
 * </Text>
 * ```
 */
export const Text = React.forwardRef<RNText, TextComponentProps>(
  (
    {
      variant = "md",
      color = "primary",
      weight = "regular",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cx(
      variantStyles[variant],
      colorStyles[color],
      weightStyles[weight],
      className
    );

    return (
      <RNText ref={ref} className={classes} {...props}>
        {children}
      </RNText>
    );
  }
);

Text.displayName = "Text";

// Export types
export type TextProps = TextComponentProps;
