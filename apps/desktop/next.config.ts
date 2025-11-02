import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  transpilePackages: ["@repo/ui", "@repo/convex", "@repo/supabase"],
  webpack: (config, { isServer }) => {
    // Ensure react-native-web is properly resolved
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-native": "react-native-web",
    };
    return config;
  },
};

export default nextConfig;
