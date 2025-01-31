/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true, // Bypass TypeScript errors during the build
  },
  output: 'export',
  images: {
    unoptimized: true, // Disable optimization for static export
  },
};

module.exports = nextConfig;
