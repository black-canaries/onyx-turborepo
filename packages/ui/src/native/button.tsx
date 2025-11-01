import * as React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

export interface NativeButtonProps extends PressableProps {
  label: string;
  variant?: "primary" | "secondary" | "ghost";
}

export function Button({ label, variant = "primary", style, ...props }: NativeButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      style={(state) => {
        const external = typeof style === "function" ? style(state) : style;
        return [styles.base, styles[variant], state.pressed && styles.pressed, external].filter(Boolean) as StyleProp<ViewStyle>;
      }}
      {...props}
    >
      <Text style={[styles.text, styles[`${variant}Text` as const]]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  primary: {
    backgroundColor: "#5B21B6",
  },
  primaryText: {
    color: "white",
  },
  secondary: {
    backgroundColor: "#EDE9FE",
  },
  secondaryText: {
    color: "#4C1D95",
  },
  ghost: {
    backgroundColor: "transparent",
  },
  ghostText: {
    color: "#5B21B6",
  },
  pressed: {
    opacity: 0.85,
  },
});
