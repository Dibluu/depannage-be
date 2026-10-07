import { Inter } from 'next/font/google'
import '../globals.css'
import { SITE_URL } from '../../lib/seo/routes'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Dépannage.be — L'artisan qu'il vous faut, au prix qu'on vous annonce.",
  description: 'Serrurier, plombier, électricien, chauffagiste à Bruxelles, en Brabant wallon et en Brabant flamand. Prix fixe annoncé avant l’intervention, sans surprise.',
  openGraph: { siteName: 'Dépannage.be', locale: 'fr_BE', type: 'website' },
  twitter: { card: 'summary_large_image' },
  // Google Search Console, URL-prefix property https://www.xn--dpannage-b1a.be/
  verification: { google: 'hzALC8eZPvPLTnqBUdpSSkNhmb7kPMUgUDwqDnfcycM' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr-BE">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
