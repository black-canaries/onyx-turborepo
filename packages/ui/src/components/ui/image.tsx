import * as React from "react";
import { Image as RNImage, type ImageProps as RNImageProps } from "react-native";
import { cn } from "../../lib/utils";

export interface ImageProps extends RNImageProps {
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none";
  className?: string;
}

const sizeMap = {
  "2xs": "h-6 w-6",
  xs: "h-10 w-10",
  sm: "h-16 w-16",
  md: "h-20 w-20",
  lg: "h-24 w-24",
  xl: "h-32 w-32",
  "2xl": "h-64 w-64",
  full: "h-full w-full",
  none: "",
};

export const Image = React.forwardRef<RNImage, ImageProps>(
  ({ size = "md", className, style, ...props }, ref) => {
    const classes = cn(
      "max-w-full",
      size !== "none" && sizeMap[size],
      className
    );
    return <RNImage ref={ref} className={classes} style={style} {...props} />;
  }
);
Image.displayName = "Image";

