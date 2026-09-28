import BookingFlow from '../../../components/booking/BookingFlow'
import { loadCatalog } from '../../../lib/pricing'

export const metadata = {
  title: 'Réserver un artisan — prix annoncé avant le déplacement | Dépannage.be',
  description: 'Choisissez votre intervention, voyez le prix et réservez en 2 minutes. Serrurier, plombier, électricien, chauffagiste à Bruxelles et dans le Brabant.',
  robots: { index: false, follow: true },
}

export default async function Page({ searchParams }) {
  const catalog = await loadCatalog()
  const { metier, prestation, cp } = searchParams || {}
  return <BookingFlow lang="fr" catalog={catalog} initial={{ metier, prestation, cp }} />
}
