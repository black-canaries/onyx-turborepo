/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  transpilePackages: ["@repo/ui", "@repo/convex"],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
