import { Inter } from 'next/font/google'
import '../../globals.css'
import { SITE_URL } from '../../../lib/seo/routes'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Dépannage.be — De vakman die u nodig hebt, aan de prijs die we aankondigen.',
  description: 'Slotenmaker, loodgieter, elektricien, chauffagist in Brussel en Vlaams-Brabant. Vaste prijs gekend vóór de interventie.',
  openGraph: { siteName: 'Dépannage.be', locale: 'nl_BE', type: 'website' },
  twitter: { card: 'summary_large_image' },
}

export default function NlLayout({ children }) {
  return (
    <html lang="nl-BE">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
