/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  transpilePackages: ["@repo/ui-web", "@repo/convex", "@repo/supabase"],
};

export default nextConfig;
