"use client";

import React from "react";
import { View, ViewProps } from "react-native";
import { cx } from "../utils/cx";

/**
 * Card container props
 */
export interface CardProps extends Omit<ViewProps, "style"> {
  /**
   * Card content
   */
  children?: React.ReactNode;

  /**
   * Additional Tailwind classes
   */
  className?: string;
}

/**
 * CardHeader props
 */
export interface CardHeaderProps extends Omit<ViewProps, "style"> {
  children?: React.ReactNode;
  className?: string;
}

/**
 * CardContent props
 */
export interface CardContentProps extends Omit<ViewProps, "style"> {
  children?: React.ReactNode;
  className?: string;
}

/**
 * CardFooter props
 */
export interface CardFooterProps extends Omit<ViewProps, "style"> {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Card container component
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <Text variant="displaySm">Card Title</Text>
 *   </CardHeader>
 *   <CardContent>
 *     <Text>Card content goes here</Text>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */
export const Card = React.forwardRef<View, CardProps>(
  ({ children, className, ...props }, ref) => {
    const classes = cx(
      "rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden",
      "dark:border-gray-800 dark:bg-gray-900",
      className
    );

    return (
      <View ref={ref} className={classes} {...props}>
        {children}
      </View>
    );
  }
);

Card.displayName = "Card";

/**
 * CardHeader component
 * Container for card header content (title, description, etc.)
 *
 * @example
 * ```tsx
 * <CardHeader>
 *   <Text variant="displaySm" weight="semibold">Title</Text>
 *   <Text variant="sm" color="secondary">Description</Text>
 * </CardHeader>
 * ```
 */
export const CardHeader = React.forwardRef<View, CardHeaderProps>(
  ({ children, className, ...props }, ref) => {
    const classes = cx(
      "px-6 py-5 border-b border-gray-200",
      "dark:border-gray-800",
      className
    );

    return (
      <View ref={ref} className={classes} {...props}>
        {children}
      </View>
    );
  }
);

CardHeader.displayName = "CardHeader";

/**
 * CardContent component
 * Container for main card content
 *
 * @example
 * ```tsx
 * <CardContent>
 *   <Text>This is the main content of the card.</Text>
 * </CardContent>
 * ```
 */
export const CardContent = React.forwardRef<View, CardContentProps>(
  ({ children, className, ...props }, ref) => {
    const classes = cx("px-6 py-5", className);

    return (
      <View ref={ref} className={classes} {...props}>
        {children}
      </View>
    );
  }
);

CardContent.displayName = "CardContent";

/**
 * CardFooter component
 * Container for card footer content (actions, metadata, etc.)
 *
 * @example
 * ```tsx
 * <CardFooter>
 *   <Button variant="primary">Save</Button>
 *   <Button variant="secondary">Cancel</Button>
 * </CardFooter>
 * ```
 */
export const CardFooter = React.forwardRef<View, CardFooterProps>(
  ({ children, className, ...props }, ref) => {
    const classes = cx(
      "px-6 py-4 border-t border-gray-200 flex-row gap-3",
      "dark:border-gray-800",
      className
    );

    return (
      <View ref={ref} className={classes} {...props}>
        {children}
      </View>
    );
  }
);

CardFooter.displayName = "CardFooter";
