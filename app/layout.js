import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata = {
  title: "Dépannage.be — L'artisan qu'il vous faut, au prix qu'on vous annonce.",
  description: "Prix fixe annoncé avant l'intervention. Sans surprise. Couverture toute la Belgique.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
