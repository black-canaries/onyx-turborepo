"use client";

import React from "react";
import {
  Pressable,
  PressableProps,
  View,
  ActivityIndicator,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";
import { cx, sortCx } from "../utils/cx";
import { Text } from "./text";

/**
 * Button variants
 */
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "link"
  | "destructive";

/**
 * Button sizes
 */
export type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends Omit<PressableProps, "style" | "children"> {
  /**
   * Button variant style
   * @default "primary"
   */
  variant?: ButtonVariant;

  /**
   * Button size
   * @default "md"
   */
  size?: ButtonSize;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Loading state - shows spinner
   */
  isLoading?: boolean;

  /**
   * Button label text
   */
  children?: React.ReactNode;

  /**
   * Leading icon (renders before text)
   */
  leadingIcon?: React.ReactNode;

  /**
   * Trailing icon (renders after text)
   */
  trailingIcon?: React.ReactNode;

  /**
   * Additional Tailwind classes
   */
  className?: string;

  /**
   * Full width button
   */
  fullWidth?: boolean;
}

/**
 * Button container styles by variant
 */
const variantStyles = sortCx({
  primary: {
    base: "bg-brand-600 border border-brand-600",
    pressed: "bg-brand-700 border-brand-700",
    disabled: "bg-brand-200 border-brand-200",
  },
  secondary: {
    base: "bg-white border border-gray-300 shadow-xs",
    pressed: "bg-gray-50 border-gray-300",
    disabled: "bg-gray-50 border-gray-200",
  },
  tertiary: {
    base: "bg-transparent border border-transparent",
    pressed: "bg-gray-100",
    disabled: "bg-transparent",
  },
  link: {
    base: "bg-transparent border border-transparent",
    pressed: "bg-transparent",
    disabled: "bg-transparent",
  },
  destructive: {
    base: "bg-error-600 border border-error-600",
    pressed: "bg-error-700 border-error-700",
    disabled: "bg-error-200 border-error-200",
  },
});

/**
 * Button size styles
 */
const sizeStyles = sortCx({
  sm: "px-3.5 py-2 rounded-lg gap-1.5",
  md: "px-4 py-2.5 rounded-lg gap-2",
  lg: "px-4.5 py-2.5 rounded-lg gap-2",
  xl: "px-5 py-3 rounded-xl gap-2.5",
});

/**
 * Text color styles by variant
 */
const textColorStyles = sortCx({
  primary: {
    base: "text-white",
    disabled: "text-brand-300",
  },
  secondary: {
    base: "text-gray-700",
    disabled: "text-gray-300",
  },
  tertiary: {
    base: "text-gray-600",
    disabled: "text-gray-300",
  },
  link: {
    base: "text-brand-700",
    disabled: "text-gray-300",
  },
  destructive: {
    base: "text-white",
    disabled: "text-error-300",
  },
});

/**
 * Text size styles
 */
const textSizeStyles = sortCx({
  sm: "text-sm leading-5 font-semibold",
  md: "text-sm leading-5 font-semibold",
  lg: "text-base leading-6 font-semibold",
  xl: "text-base leading-6 font-semibold",
});

/**
 * Icon size in pixels
 */
const iconSizes = {
  sm: 16,
  md: 20,
  lg: 20,
  xl: 20,
};

/**
 * Button component with variants, sizes, and loading states
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onPress={() => console.log('Pressed')}>
 *   Click me
 * </Button>
 *
 * <Button variant="secondary" isLoading>
 *   Loading...
 * </Button>
 *
 * <Button variant="link" leadingIcon={<Icon name="arrow-left" />}>
 *   Back
 * </Button>
 * ```
 */
export const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      disabled = false,
      isLoading = false,
      children,
      leadingIcon,
      trailingIcon,
      className,
      fullWidth = false,
      onPress,
      onPressIn,
      onPressOut,
      ...props
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = React.useState(false);
    const rotation = useSharedValue(0);

    // Animate loading spinner
    React.useEffect(() => {
      if (isLoading) {
        rotation.value = withRepeat(
          withTiming(360, {
            duration: 1000,
            easing: Easing.linear,
          }),
          -1 // Infinite repeat
        );
      } else {
        rotation.value = 0;
      }
    }, [isLoading, rotation]);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${rotation.value}deg` }],
    }));

    const isDisabled = disabled || isLoading;

    const handlePressIn: PressableProps["onPressIn"] = (event) => {
      setIsPressed(true);
      onPressIn?.(event);
    };

    const handlePressOut: PressableProps["onPressOut"] = (event) => {
      setIsPressed(false);
      onPressOut?.(event);
    };

    // Determine button styles based on state
    const containerClasses = cx(
      // Base styles
      "flex-row items-center justify-center",
      // Size
      sizeStyles[size],
      // Variant
      isDisabled
        ? variantStyles[variant].disabled
        : isPressed
          ? variantStyles[variant].pressed
          : variantStyles[variant].base,
      // Full width
      fullWidth && "w-full",
      // Custom className
      className
    );

    // Determine text color based on state
    const textClasses = cx(
      textSizeStyles[size],
      isDisabled
        ? textColorStyles[variant].disabled
        : textColorStyles[variant].base
    );

    // Spinner color based on variant
    const spinnerColor =
      variant === "primary" || variant === "destructive" ? "white" : "#6366F1";

    return (
      <Pressable
        ref={ref}
        className={containerClasses}
        disabled={isDisabled}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        {...props}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <Animated.View style={animatedStyle}>
            <ActivityIndicator size="small" color={spinnerColor} />
          </Animated.View>
        )}

        {/* Leading Icon */}
        {!isLoading && leadingIcon && (
          <View style={{ width: iconSizes[size], height: iconSizes[size] }}>
            {leadingIcon}
          </View>
        )}

        {/* Button Text */}
        {children && (
          <Text className={textClasses}>
            {children}
          </Text>
        )}

        {/* Trailing Icon */}
        {!isLoading && trailingIcon && (
          <View style={{ width: iconSizes[size], height: iconSizes[size] }}>
            {trailingIcon}
          </View>
        )}
      </Pressable>
    );
  }
);

Button.displayName = "Button";
