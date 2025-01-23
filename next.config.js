/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true, // Bypass TypeScript errors during the build
  },
  output: 'export'
};

module.exports = nextConfig;
