/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/home', destination: '/home.html' },
    ]
  },
}
export default nextConfig
