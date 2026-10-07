import { homeCard } from '../../lib/seo/og/pages'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Dépannage.be — artisans à Bruxelles et dans le Brabant, prix annoncé avant le déplacement'

export default function Image() {
  return homeCard('fr')
}
