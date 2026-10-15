/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  output: process.env.NEXT_EXPORT === "true" ? "export" : undefined,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
};
