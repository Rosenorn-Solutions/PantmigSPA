/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    // Disable server-side image optimization in standalone artifact deploys
    // so public/ images are served directly without requiring sharp at runtime.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
