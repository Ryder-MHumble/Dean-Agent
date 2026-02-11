/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // 禁用 Turbopack，使用传统 Webpack
  experimental: {
    turbo: false,
  }
}

export default nextConfig
