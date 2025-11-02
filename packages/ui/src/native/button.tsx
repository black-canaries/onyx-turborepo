import * as React from "react";
import { Pressable, Text, type PressableProps } from "react-native";
import { cn } from "../lib/utils";

export interface NativeButtonProps extends PressableProps {
  label: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

export function Button({ label, variant = "primary", className, ...props }: NativeButtonProps) {
  const buttonClasses = cn(
    "items-center rounded-xl px-4 py-3 flex-row justify-center gap-2 active:opacity-85",
    variant === "primary" && "bg-primary",
    variant === "secondary" && "bg-secondary",
    variant === "ghost" && "bg-transparent",
    className
  );

  const textClasses = cn(
    "text-base font-semibold",
    variant === "primary" && "text-primary-foreground",
    variant === "secondary" && "text-secondary-foreground",
    variant === "ghost" && "text-primary"
  );

  return (
    <Pressable accessibilityRole="button" className={buttonClasses} {...props}>
      <Text className={textClasses}>{label}</Text>
    </Pressable>
  );
}
