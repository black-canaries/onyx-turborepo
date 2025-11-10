/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    // Include workspace packages (ui-native will be added here)
    "../../packages/ui-native/src/**/*.{js,jsx,ts,tsx}",
  ],
  // NativeWind preset is required for React Native compatibility
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // Design tokens are imported from @repo/tailwind-config via global.css
      // Additional mobile-specific customizations can be added here
    },
  },
  plugins: [],
};
