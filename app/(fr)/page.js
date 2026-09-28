import HomeClient from '../../components/home/HomeClient'
import Zones from '../../components/home/Zones'
import { JsonLd } from '../../components/seo/ui'
import { organization, website, jsonLd } from '../../lib/seo/schema'
import { absolute } from '../../lib/seo/routes'

export const metadata = {
  title: 'Dépannage.be — Artisans à Bruxelles et dans le Brabant, prix annoncé',
  description: 'Serrurier, plombier, électricien, chauffagiste à Bruxelles et dans le Brabant. Prix fixe annoncé avant le déplacement, paiement après l’intervention.',
  alternates: { canonical: absolute('/'), languages: { 'fr-BE': absolute('/'), 'nl-BE': absolute('/nl'), 'x-default': absolute('/') } },
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={jsonLd(organization(), website())} />
      <HomeClient zonesSection={<Zones lang="fr" />} />
    </>
  )
}
