/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Fonts read from disk by the social preview images (lib/seo/og/render.js).
    outputFileTracingIncludes: { '/**/opengraph-image*': ['./lib/seo/og/*.ttf'] },
  },
  async rewrites() {
    return [
      { source: '/home', destination: '/home.html' },
    ]
  },
}
export default nextConfig
