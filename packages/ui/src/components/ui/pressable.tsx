import * as React from "react";
import { Pressable as RNPressable, type PressableProps, View } from "react-native";
import { cn } from "../../lib/utils";

export interface PressablePropsExtended extends PressableProps {
  className?: string;
}

export const Pressable = React.forwardRef<View, PressablePropsExtended>(
  ({ className, ...props }, ref) => {
    const classes = cn(
      "data-[focus-visible=true]:outline-none data-[focus-visible=true]:ring-indicator-info",
      "data-[focus-visible=true]:ring-2 data-[disabled=true]:opacity-40",
      className
    );
    return <RNPressable ref={ref} className={classes} {...props} />;
  }
);
Pressable.displayName = "Pressable";

