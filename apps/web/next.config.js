/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  transpilePackages: ["@repo/ui", "@repo/convex", "@repo/supabase"],
};

export default nextConfig;
