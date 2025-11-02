import * as React from "react";
import { Pressable, type PressableProps, Linking, Text as RNText, View } from "react-native";
import { cn } from "../../lib/utils";

export interface LinkProps extends Omit<PressableProps, "children"> {
  href?: string;
  isExternal?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Link = React.forwardRef<View, LinkProps>(
  ({ href, isExternal, className, onPress, children, ...props }, ref) => {
    const handlePress = React.useCallback((e: any) => {
      if (href) {
        if (isExternal || href.startsWith("http")) {
          Linking.openURL(href);
        }
      }
      onPress?.(e);
    }, [href, isExternal, onPress]);

    const classes = cn(
      "group/link web:outline-0 data-[disabled=true]:web:cursor-not-allowed",
      "data-[focus-visible=true]:web:ring-2 data-[focus-visible=true]:web:ring-indicator-primary",
      "data-[focus-visible=true]:web:outline-0 data-[disabled=true]:opacity-4",
      className
    );

    return (
      <Pressable ref={ref} className={classes} onPress={handlePress} {...props}>
        {children}
      </Pressable>
    );
  }
);
Link.displayName = "Link";

export interface LinkTextProps {
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  className?: string;
  children?: React.ReactNode;
}

const sizeMap = {
  "2xs": "text-2xs",
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
};

export const LinkText = React.forwardRef<RNText, LinkTextProps>(
  ({ size = "md", className, children, ...props }, ref) => {
    const classes = cn(
      "underline text-info-700 data-[hover=true]:text-info-600",
      "font-normal font-body",
      sizeMap[size],
      className
    );
    return (
      <RNText ref={ref} className={classes} {...props}>
        {children}
      </RNText>
    );
  }
);
LinkText.displayName = "LinkText";

