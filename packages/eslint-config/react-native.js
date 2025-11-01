import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReact from "eslint-plugin-react";
import pluginReactNative from "eslint-plugin-react-native";
import globals from "globals";
import tseslint from "typescript-eslint";
import { config as baseConfig } from "./base.js";

/**
 * Shared configuration targeting React Native / Expo projects.
 * @type {import("eslint").Linter.Config[]}
 */
const reactNativeRecommendedRules =
  pluginReactNative.configs?.recommended?.rules ??
  pluginReactNative.configs?.all?.rules ??
  {};

export const reactNativeConfig = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.es2021,
        ...globals.browser,
      },
    },
  },
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
  {
    plugins: {
      "react-native": pluginReactNative,
    },
    rules: {
      ...reactNativeRecommendedRules,
      "react-native/no-inline-styles": "warn",
      "react-native/no-unused-styles": "error",
      "react-native/no-color-literals": "off",
      "react-native/sort-styles": "off",
    },
  },
  {
    files: ["**/*.config.js", "**/*.config.cjs", "**/*.config.mjs"],
    languageOptions: {
      sourceType: "script",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off",
    },
  },
];

export default reactNativeConfig;
