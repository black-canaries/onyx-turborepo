import type { Config } from "tailwindcss";
import sharedConfig from "../../packages/ui-web/tailwind.config";

const config: Config = {
  ...sharedConfig,
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "../../packages/ui-web/src/**/*.{ts,tsx}",
  ],
} as Config;

export default config;
