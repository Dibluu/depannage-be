import BookingFlow from '../../../../components/booking/BookingFlow'
import { absolute } from '../../../../lib/seo/routes'
import { loadCatalog } from '../../../../lib/pricing'

export const metadata = {
  title: 'Een vakman reserveren — prijs gekend vóór vertrek | Dépannage.be',
  description: 'Kies uw interventie, bekijk de prijs en reserveer in 2 minuten. Slotenmaker, loodgieter, elektricien, chauffagist in Brussel en Vlaams-Brabant.',
  robots: { index: false, follow: true },
  // ?metier=&prestation=&cp= variants all collapse onto the bare booking URL
  alternates: { canonical: absolute('/nl/reserveren') },
}

export default async function Page({ searchParams }) {
  const catalog = await loadCatalog()
  const { metier, prestation, cp } = searchParams || {}
  return <BookingFlow lang="nl" catalog={catalog} initial={{ metier, prestation, cp }} />
}
