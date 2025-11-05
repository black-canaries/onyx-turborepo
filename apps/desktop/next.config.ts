/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  transpilePackages: ["@repo/ui-web", "@repo/convex", "@repo/supabase"],
};

export default nextConfig;
