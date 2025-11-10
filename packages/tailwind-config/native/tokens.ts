/**
 * Design tokens for React Native / NativeWind
 * Extracted from CSS theme.css for cross-platform use
 */

// Base spacing unit (4px = 0.25rem in web)
export const SPACING_UNIT = 4;

// Font Families
export const fontFamily = {
  body: 'Inter',
  display: 'Inter',
  mono: 'Courier New',
} as const;

// Font Sizes (in pixels, converted from CSS calc(var(--spacing) * N))
export const fontSize = {
  xs: SPACING_UNIT * 3, // 12px
  sm: SPACING_UNIT * 3.5, // 14px
  md: SPACING_UNIT * 4, // 16px
  lg: SPACING_UNIT * 4.5, // 18px
  xl: SPACING_UNIT * 5, // 20px
  displayXs: SPACING_UNIT * 6, // 24px
  displaySm: SPACING_UNIT * 7.5, // 30px
  displayMd: SPACING_UNIT * 9, // 36px
  displayLg: SPACING_UNIT * 12, // 48px
  displayXl: SPACING_UNIT * 15, // 60px
  display2xl: SPACING_UNIT * 18, // 72px
} as const;

// Line Heights (in pixels)
export const lineHeight = {
  xs: SPACING_UNIT * 4.5, // 18px
  sm: SPACING_UNIT * 5, // 20px
  md: SPACING_UNIT * 6, // 24px
  lg: SPACING_UNIT * 7, // 28px
  xl: SPACING_UNIT * 7.5, // 30px
  displayXs: SPACING_UNIT * 8, // 32px
  displaySm: SPACING_UNIT * 9.5, // 38px
  displayMd: SPACING_UNIT * 11, // 44px
  displayLg: SPACING_UNIT * 15, // 60px
  displayXl: SPACING_UNIT * 18, // 72px
  display2xl: SPACING_UNIT * 22.5, // 90px
} as const;

// Letter Spacing (in pixels)
export const letterSpacing = {
  displayMd: -0.72,
  displayLg: -0.96,
  displayXl: -1.2,
  display2xl: -1.44,
} as const;

// Border Radius
export const radius = {
  none: 0,
  xs: 2,
  sm: 4,
  DEFAULT: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  full: 9999,
} as const;

// Colors - Base
export const colors = {
  transparent: 'rgba(0, 0, 0, 0)',
  white: 'rgb(255, 255, 255)',
  black: 'rgb(0, 0, 0)',

  // Brand colors
  brand: {
    25: 'rgb(252, 250, 255)',
    50: 'rgb(249, 245, 255)',
    100: 'rgb(244, 235, 255)',
    200: 'rgb(233, 215, 254)',
    300: 'rgb(214, 187, 251)',
    400: 'rgb(182, 146, 246)',
    500: 'rgb(158, 119, 237)',
    600: 'rgb(127, 86, 217)',
    700: 'rgb(105, 65, 198)',
    800: 'rgb(83, 56, 158)',
    900: 'rgb(66, 48, 125)',
    950: 'rgb(44, 28, 95)',
  },

  // Error colors
  error: {
    25: 'rgb(255, 251, 250)',
    50: 'rgb(254, 243, 242)',
    100: 'rgb(254, 228, 226)',
    200: 'rgb(254, 205, 202)',
    300: 'rgb(253, 162, 155)',
    400: 'rgb(249, 112, 102)',
    500: 'rgb(240, 68, 56)',
    600: 'rgb(217, 45, 32)',
    700: 'rgb(180, 35, 24)',
    800: 'rgb(145, 32, 24)',
    900: 'rgb(122, 39, 26)',
    950: 'rgb(85, 22, 12)',
  },

  // Warning colors
  warning: {
    25: 'rgb(255, 252, 245)',
    50: 'rgb(255, 250, 235)',
    100: 'rgb(254, 240, 199)',
    200: 'rgb(254, 223, 137)',
    300: 'rgb(254, 200, 75)',
    400: 'rgb(253, 176, 34)',
    500: 'rgb(247, 144, 9)',
    600: 'rgb(220, 104, 3)',
    700: 'rgb(181, 71, 8)',
    800: 'rgb(147, 55, 13)',
    900: 'rgb(122, 46, 14)',
    950: 'rgb(78, 29, 9)',
  },

  // Success colors
  success: {
    25: 'rgb(246, 254, 249)',
    50: 'rgb(236, 253, 243)',
    100: 'rgb(220, 250, 230)',
    200: 'rgb(171, 239, 198)',
    300: 'rgb(117, 224, 167)',
    400: 'rgb(71, 205, 137)',
    500: 'rgb(23, 178, 106)',
    600: 'rgb(7, 148, 85)',
    700: 'rgb(6, 118, 71)',
    800: 'rgb(8, 93, 58)',
    900: 'rgb(7, 77, 49)',
    950: 'rgb(5, 51, 33)',
  },

  // Gray colors (default gray scale)
  gray: {
    25: 'rgb(253, 253, 253)',
    50: 'rgb(250, 250, 250)',
    100: 'rgb(245, 245, 245)',
    200: 'rgb(233, 234, 235)',
    300: 'rgb(213, 215, 218)',
    400: 'rgb(164, 167, 174)',
    500: 'rgb(113, 118, 128)',
    600: 'rgb(83, 88, 98)',
    700: 'rgb(65, 70, 81)',
    800: 'rgb(37, 43, 55)',
    900: 'rgb(24, 29, 39)',
    950: 'rgb(10, 13, 18)',
  },
} as const;

// Shadows (React Native shadow properties)
// Note: React Native uses separate properties for shadows
export const shadows = {
  xs: {
    shadowColor: 'rgb(10, 13, 18)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: 'rgb(10, 13, 18)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: 'rgb(10, 13, 18)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: 'rgb(10, 13, 18)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: 'rgb(10, 13, 18)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 12,
  },
  '2xl': {
    shadowColor: 'rgb(10, 13, 18)',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.18,
    shadowRadius: 48,
    elevation: 16,
  },
  '3xl': {
    shadowColor: 'rgb(10, 13, 18)',
    shadowOffset: { width: 0, height: 32 },
    shadowOpacity: 0.14,
    shadowRadius: 64,
    elevation: 20,
  },
} as const;

// Spacing scale (multipliers of SPACING_UNIT)
export const spacing = {
  0: 0,
  1: SPACING_UNIT * 0.25, // 1px
  2: SPACING_UNIT * 0.5, // 2px
  3: SPACING_UNIT * 0.75, // 3px
  4: SPACING_UNIT * 1, // 4px
  5: SPACING_UNIT * 1.25, // 5px
  6: SPACING_UNIT * 1.5, // 6px
  7: SPACING_UNIT * 1.75, // 7px
  8: SPACING_UNIT * 2, // 8px
  9: SPACING_UNIT * 2.25, // 9px
  10: SPACING_UNIT * 2.5, // 10px
  11: SPACING_UNIT * 2.75, // 11px
  12: SPACING_UNIT * 3, // 12px
  14: SPACING_UNIT * 3.5, // 14px
  16: SPACING_UNIT * 4, // 16px
  20: SPACING_UNIT * 5, // 20px
  24: SPACING_UNIT * 6, // 24px
  28: SPACING_UNIT * 7, // 28px
  32: SPACING_UNIT * 8, // 32px
  36: SPACING_UNIT * 9, // 36px
  40: SPACING_UNIT * 10, // 40px
  44: SPACING_UNIT * 11, // 44px
  48: SPACING_UNIT * 12, // 48px
  52: SPACING_UNIT * 13, // 52px
  56: SPACING_UNIT * 14, // 56px
  60: SPACING_UNIT * 15, // 60px
  64: SPACING_UNIT * 16, // 64px
  72: SPACING_UNIT * 18, // 72px
  80: SPACING_UNIT * 20, // 80px
  96: SPACING_UNIT * 24, // 96px
} as const;

// Breakpoints (for responsive design)
export const breakpoints = {
  xxs: 320,
  xs: 600,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Export types for TypeScript
export type FontSize = keyof typeof fontSize;
export type LineHeight = keyof typeof lineHeight;
export type Radius = keyof typeof radius;
export type ColorScale = keyof typeof colors;
export type Shadow = keyof typeof shadows;
export type Spacing = keyof typeof spacing;
export type Breakpoint = keyof typeof breakpoints;
