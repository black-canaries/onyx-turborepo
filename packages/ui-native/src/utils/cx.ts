import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for combining class names
 * Alias for cn() to match web ui package
 */
export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
