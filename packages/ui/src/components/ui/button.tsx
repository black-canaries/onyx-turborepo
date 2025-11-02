import * as React from "react";
import { Pressable, type PressableProps, View, Text as RNText } from "react-native";
import { cn } from "../../lib/utils";

export interface ButtonProps extends Omit<PressableProps, "children"> {
  action?: "primary" | "secondary" | "positive" | "negative" | "default";
  variant?: "link" | "outline" | "solid";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isDisabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const actionClasses = {
  primary: "bg-primary-500 data-[hover=true]:bg-primary-600 data-[active=true]:bg-primary-700 border-primary-300",
  secondary: "bg-secondary-500 border-secondary-300 data-[hover=true]:bg-secondary-600",
  positive: "bg-success-500 border-success-300 data-[hover=true]:bg-success-600",
  negative: "bg-error-500 border-error-300 data-[hover=true]:bg-error-600",
  default: "bg-transparent data-[hover=true]:bg-background-50",
};

const variantClasses = {
  link: "px-0",
  outline: "bg-transparent border data-[hover=true]:bg-background-50",
  solid: "",
};

const sizeClasses = {
  xs: "px-3.5 h-8",
  sm: "px-4 h-9",
  md: "px-5 h-10",
  lg: "px-6 h-11",
  xl: "px-7 h-12",
};

export const Button = React.forwardRef<View, ButtonProps>(
  ({ action = "primary", variant = "solid", size = "md", isDisabled, className, ...props }, ref) => {
    const classes = cn(
      "rounded bg-primary-500 flex-row items-center justify-center",
      "data-[focus-visible=true]:web:outline-none data-[focus-visible=true]:web:ring-2",
      "data-[disabled=true]:opacity-40 gap-2",
      actionClasses[action],
      variantClasses[variant],
      sizeClasses[size],
      className
    );
    return (
      <Pressable
        ref={ref}
        disabled={isDisabled}
        className={classes}
        data-disabled={isDisabled}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export interface ButtonTextProps {
  children?: React.ReactNode;
  className?: string;
}

export const ButtonText = React.forwardRef<RNText, ButtonTextProps>(
  ({ children, className, ...props }, ref) => {
    const classes = cn(
      "text-typography-0 font-semibold web:select-none",
      className
    );
    return (
      <RNText ref={ref} className={classes} {...props}>
        {children}
      </RNText>
    );
  }
);
ButtonText.displayName = "ButtonText";

export interface ButtonIconProps {
  as?: React.ComponentType<any>;
  className?: string;
  children?: React.ReactNode;
}

export const ButtonIcon = React.forwardRef<any, ButtonIconProps>(
  ({ as: Component, className, children, ...props }, ref) => {
    const classes = cn("fill-none", className);
    if (Component) {
      return <Component ref={ref} className={classes} {...props} />;
    }
    if (children) {
      return <View ref={ref} className={classes} {...props}>{children}</View>;
    }
    return null;
  }
);
ButtonIcon.displayName = "ButtonIcon";
