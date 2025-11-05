import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Re-export cx and sortCx from utils
export { cx, sortCx } from "../utils/cx";

// Backwards compatibility: cn function using clsx + twMerge (Shadcn style)
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
