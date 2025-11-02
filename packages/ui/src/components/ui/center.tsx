import * as React from "react";
import { View, type ViewProps } from "react-native";
import { cn } from "../../lib/utils";

export interface CenterProps extends ViewProps {
  className?: string;
}

export const Center = React.forwardRef<View, CenterProps>(
  ({ className, ...props }, ref) => {
    const classes = cn(
      "justify-center items-center",
      "flex flex-col relative z-0",
      className
    );
    return <View ref={ref} className={classes} {...props} />;
  }
);
Center.displayName = "Center";

