/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Temporarily disable ESLint during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Temporarily disable TypeScript checking during builds
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['ubocvxgvjvfrmvkhqaav.supabase.co'],
    formats: ['image/avif', 'image/webp'],
    // Enable image optimization for production
    unoptimized: false,
  },
  // Enable SWC minification for faster builds
  swcMinify: true,
  // Optimize for Vercel deployment
  experimental: {
    scrollRestoration: true,
    webpackBuildWorker: true,
  },
}

export default nextConfig