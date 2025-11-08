import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include: ["src/**/*"],
      exclude: ["**/*.story.tsx", "**/*.demo.tsx"],
      outDir: "dist",
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        client: resolve(__dirname, "src/client.ts"),
      },
      formats: ["es"],
      fileName: (format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: (id) => {
        // Externalize all node_modules dependencies
        if (!id.startsWith(".") && !id.startsWith("/") && !resolve(__dirname, id).startsWith(__dirname)) {
          return true;
        }
        // Also externalize specific known dependencies
        return [
          "react",
          "react-dom",
          "react/jsx-runtime",
          "@internationalized/date",
          "@react-aria/utils",
          "@react-stately/utils",
          "@tailwindcss/typography",
          "@untitledui/file-icons",
          "@untitledui/icons",
          "@emotion/is-prop-valid",
          "clsx",
          "embla-carousel-react",
          "input-otp",
          "motion",
          "next-themes",
          "qr-code-styling",
          "react-aria",
          "react-aria-components",
          "react-hook-form",
          "react-stately",
          "recharts",
          "sonner",
          "tailwind-merge",
          "tailwindcss-animate",
          "tailwindcss-react-aria-components",
          "zod",
        ].some((dep) => id === dep || id.startsWith(`${dep}/`));
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "index.css";
          }
          return assetInfo.name || "asset";
        },
      },
    },
    cssCodeSplit: false,
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});

