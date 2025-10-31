import globals from "globals";
import { nextJsConfig } from "./next.js";

/**
 * ESLint configuration for Electron apps that reuse Next.js for the renderer.
 * @type {import("eslint").Linter.Config[]}
 */
export const electronConfig = [
  ...nextJsConfig,
  {
    files: ["electron/**/*.{js,jsx,ts,tsx,mjs,cjs}", "main.{js,ts}", "preload.{js,ts}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];

export default electronConfig;
