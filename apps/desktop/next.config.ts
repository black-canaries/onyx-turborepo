import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true,
  },
  transpilePackages: ["@repo/ui", "@repo/convex", "@repo/supabase"],
};

export default nextConfig;
