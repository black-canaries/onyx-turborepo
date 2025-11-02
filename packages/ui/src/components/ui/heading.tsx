import * as React from "react";
import { Text, type TextProps } from "react-native";
import { H1, H2, H3, H4, H5, H6 } from "@expo/html-elements";
import { cn } from "../../lib/utils";

export interface HeadingProps extends Omit<TextProps, "as"> {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  isTruncated?: boolean;
  bold?: boolean;
  underline?: boolean;
  strikeThrough?: boolean;
  italic?: boolean;
  highlight?: boolean;
  as?: React.ElementType;
  className?: string;
}

const sizeMap = {
  xs: { as: H6, className: "text-sm" },
  sm: { as: H6, className: "text-base" },
  md: { as: H5, className: "text-lg" },
  lg: { as: H4, className: "text-xl" },
  xl: { as: H3, className: "text-2xl" },
  "2xl": { as: H2, className: "text-3xl" },
  "3xl": { as: H1, className: "text-4xl" },
  "4xl": { as: H1, className: "text-5xl" },
  "5xl": { as: H1, className: "text-6xl" },
};

export const Heading = React.forwardRef<Text, HeadingProps>(
  ({ size = "md", isTruncated, bold, underline, strikeThrough, italic, highlight, as, className, style, ...props }, ref) => {
    const sizeConfig = sizeMap[size];
    const Component = as || sizeConfig?.as || H5;
    const classes = cn(
      "text-typography-900 font-bold font-heading tracking-sm my-0",
      sizeConfig?.className,
      isTruncated && "truncate",
      bold && "font-bold",
      underline && "underline",
      strikeThrough && "line-through",
      italic && "italic",
      highlight && "bg-yellow-500",
      "font-sans tracking-sm bg-transparent border-0 box-border display-inline list-none margin-0 padding-0 position-relative text-start no-underline whitespace-pre-wrap word-wrap-break-word",
      className
    );
    return <Component ref={ref} className={classes} style={style} {...props} />;
  }
);
Heading.displayName = "Heading";

