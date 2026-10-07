import { communeCard } from '../../../../../../lib/seo/og/pages'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Vakman Dépannage.be in uw gemeente, prijs gekend vóór de verplaatsing'

export default function Image({ params }) {
  return communeCard(params, 'nl')
}
