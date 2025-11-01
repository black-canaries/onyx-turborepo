import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  transpilePackages: ["@repo/ui", "@repo/convex", "@repo/supabase"],
};

export default nextConfig;
