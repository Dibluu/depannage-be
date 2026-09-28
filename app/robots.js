import { absolute } from '../lib/seo/routes'

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/home'] }],
    sitemap: absolute('/sitemap.xml'),
  }
}
