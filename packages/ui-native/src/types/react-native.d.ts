/// <reference types="react-native-css/types" />

/**
 * Type augmentations for NativeWind v5
 * Adds className prop to React Native components
 */
declare module "react-native" {
  interface TextProps {
    className?: string;
  }

  interface ViewProps {
    className?: string;
  }

  interface PressableProps {
    className?: string;
  }

  interface ImageProps {
    className?: string;
  }

  interface ScrollViewProps {
    className?: string;
  }
}

export {};
