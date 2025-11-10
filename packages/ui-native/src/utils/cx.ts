import { extendTailwindMerge } from "tailwind-merge";

/**
 * Extended Tailwind merge for NativeWind with custom design system classes
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      // Add custom text size classes from design system
      text: [
        "display-xs",
        "display-sm",
        "display-md",
        "display-lg",
        "display-xl",
        "display-2xl",
      ],
    },
  },
});

/**
 * Merge Tailwind CSS classes with intelligent conflict resolution
 * @example cx("px-4 py-2", "px-6") // Returns: "py-2 px-6"
 */
export const cx = twMerge;

/**
 * Helper function for organizing style objects with Tailwind classes.
 * This doesn't do anything at runtime but helps with IDE autocomplete
 * and allows Prettier/ESLint to sort classes.
 *
 * @example
 * const styles = sortCx({
 *   container: "flex items-center px-4",
 *   text: "text-lg font-semibold"
 * });
 */
export function sortCx<
  T extends Record<
    string,
    | string
    | number
    | Record<string, string | number | Record<string, string | number>>
  >,
>(classes: T): T {
  return classes;
}
