import * as React from "react";
import { View, Text as RNText, type ViewProps } from "react-native";
import { cn } from "../../lib/utils";

export interface LabelProps extends ViewProps {
  requiredMarker?: React.ReactNode;
  required?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Label = React.forwardRef<View, LabelProps>(
  ({ className, requiredMarker = "*", required, children, ...props }, ref) => (
    <View
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    >
      {typeof children === "string" ? (
        <RNText>
          {children}
          {required ? <RNText className="ml-0.5 text-destructive">{requiredMarker}</RNText> : null}
        </RNText>
      ) : (
        <>
          {children}
          {required ? <RNText className="ml-0.5 text-destructive">{requiredMarker}</RNText> : null}
        </>
      )}
    </View>
  )
);
Label.displayName = "Label";

export { Label };
