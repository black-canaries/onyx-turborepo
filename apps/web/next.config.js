/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  transpilePackages: ["@repo/ui", "@repo/convex", "@repo/supabase"],
};

export default nextConfig;
