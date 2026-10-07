import { communeCard } from '../../../../../lib/seo/og/pages'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Artisan Dépannage.be dans votre commune, prix annoncé avant le déplacement'

export default function Image({ params }) {
  return communeCard(params, 'fr')
}
