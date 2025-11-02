import * as React from "react";
import { View, type ViewProps } from "react-native";
import { cn } from "../../lib/utils";

export interface HStackProps extends ViewProps {
  space?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  reversed?: boolean;
  className?: string;
}

const spaceMap = {
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-3",
  lg: "gap-4",
  xl: "gap-5",
  "2xl": "gap-6",
  "3xl": "gap-7",
  "4xl": "gap-8",
};

export const HStack = React.forwardRef<View, HStackProps>(
  ({ space = "md", reversed, className, ...props }, ref) => {
    const classes = cn(
      "flex-row",
      "flex relative z-0 box-border border-0 list-none min-w-0 min-h-0 bg-transparent items-stretch m-0 p-0 text-decoration-none",
      spaceMap[space],
      reversed && "flex-row-reverse",
      className
    );
    return <View ref={ref} className={classes} {...props} />;
  }
);
HStack.displayName = "HStack";

