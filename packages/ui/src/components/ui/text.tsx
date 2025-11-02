import * as React from "react";
import { Text as RNText, type TextProps } from "react-native";
import { cn } from "../../lib/utils";

export interface TextPropsExtended extends TextProps {
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikeThrough?: boolean;
  highlight?: boolean;
  isTruncated?: boolean;
  className?: string;
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

export const Text = React.forwardRef<RNText, TextPropsExtended>(
  ({ size = "md", bold, italic, underline, strikeThrough, highlight, isTruncated, className, style, ...props }, ref) => {
    const classes = cn(
      "text-typography-700 font-body",
      sizeMap[size],
      bold && "font-bold",
      italic && "italic",
      underline && "underline",
      strikeThrough && "line-through",
      highlight && "bg-yellow-500",
      isTruncated && "web:truncate",
      "font-sans tracking-sm my-0 bg-transparent border-0 box-border display-inline list-none margin-0 padding-0 position-relative text-start no-underline whitespace-pre-wrap word-wrap-break-word",
      className
    );
    return <RNText ref={ref} className={classes} style={style} {...props} />;
  }
);
Text.displayName = "Text";

