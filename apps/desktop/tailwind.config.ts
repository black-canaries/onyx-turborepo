import type { Config } from "tailwindcss";
import sharedConfig from "../../packages/ui-web/tailwind.config";

const config: Config = {
  ...sharedConfig,
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "../../packages/ui-web/src/**/*.{ts,tsx}",
  ],
} as Config;;

export default config;
