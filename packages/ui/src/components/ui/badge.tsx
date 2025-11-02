import * as React from "react";
import { View, type ViewProps, Text as RNText } from "react-native";
import { cn } from "../../lib/utils";

export interface BadgeProps extends ViewProps {
  action?: "error" | "warning" | "success" | "info" | "muted";
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const actionClasses = {
  error: "bg-background-error border-error-300",
  warning: "bg-background-warning border-warning-300",
  success: "bg-background-success border-success-300",
  info: "bg-background-info border-info-300",
  muted: "bg-background-muted border-background-300",
};

const variantClasses = {
  solid: "",
  outline: "border",
};

export const Badge = React.forwardRef<View, BadgeProps>(
  ({ action = "muted", variant = "solid", size = "md", isDisabled, className, children, ...props }, ref) => {
    const classes = cn(
      "flex-row items-center rounded-sm data-[disabled=true]:opacity-50 px-2 py-1",
      actionClasses[action],
      variantClasses[variant],
      className
    );
    return (
      <View ref={ref} className={classes} data-disabled={isDisabled} {...props}>
        {children}
      </View>
    );
  }
);
Badge.displayName = "Badge";

export interface BadgeTextProps {
  children?: React.ReactNode;
  className?: string;
}

const sizeTextMap = {
  sm: "text-2xs",
  md: "text-xs",
  lg: "text-sm",
};

const actionTextMap = {
  error: "text-error-600",
  warning: "text-warning-600",
  success: "text-success-600",
  info: "text-info-600",
  muted: "text-background-800",
};

export const BadgeText = React.forwardRef<RNText, BadgeTextProps & { size?: "sm" | "md" | "lg"; action?: string }>(
  ({ children, className, size = "md", action = "muted", ...props }, ref) => {
    const classes = cn(
      "text-typography-700 font-body font-normal tracking-normal uppercase",
      sizeTextMap[size],
      actionTextMap[action as keyof typeof actionTextMap],
      className
    );
    return (
      <RNText ref={ref} className={classes} {...props}>
        {children}
      </RNText>
    );
  }
);
BadgeText.displayName = "BadgeText";

export interface BadgeIconProps {
  as?: React.ComponentType<any>;
  className?: string;
}

export const BadgeIcon = React.forwardRef<any, BadgeIconProps & { size?: "sm" | "md" | "lg"; action?: string }>(
  ({ as: Component, className, size = "md", action = "muted", ...props }, ref) => {
    const sizeIconMap = {
      sm: "h-3 w-3",
      md: "h-3.5 w-3.5",
      lg: "h-4 w-4",
    };
    const actionIconMap = {
      error: "text-error-600",
      warning: "text-warning-600",
      success: "text-success-600",
      info: "text-info-600",
      muted: "text-background-800",
    };
    const classes = cn(
      "fill-none",
      sizeIconMap[size],
      actionIconMap[action as keyof typeof actionIconMap],
      className
    );
    if (Component) {
      return <Component ref={ref} className={classes} {...props} />;
    }
    return null;
  }
);
BadgeIcon.displayName = "BadgeIcon";
