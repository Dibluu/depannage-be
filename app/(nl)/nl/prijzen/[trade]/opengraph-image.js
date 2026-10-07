import { pricesCard } from '../../../../../lib/seo/og/pages'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Prijslijst Dépannage.be'

export default function Image({ params }) {
  return pricesCard(params, 'nl')
}
