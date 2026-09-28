import Link from 'next/link'
import { JsonLd, SiteHeader, SiteFooter, Hero, Section, HowItWorks, LinkGrid, MobileBar } from '../../../components/seo/ui'
import Zones from '../../../components/home/Zones'
import { organization, website, jsonLd } from '../../../lib/seo/schema'
import { absolute, pricesUrl, bookingUrl } from '../../../lib/seo/routes'
import { TRADES } from '../../../lib/trades'

export const metadata = {
  title: 'Dépannage.be — Vakmensen in Brussel en Vlaams-Brabant, vaste prijs',
  description: 'Slotenmaker, loodgieter, elektricien en chauffagist in Brussel en Vlaams-Brabant. Prijs gekend vóór de verplaatsing, betalen na de interventie.',
  alternates: { canonical: absolute('/nl'), languages: { 'fr-BE': absolute('/'), 'nl-BE': absolute('/nl'), 'x-default': absolute('/') } },
}

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd(organization(), website())} />
      <SiteHeader lang="nl" altHref="/" />
      <main className="pb-20 sm:pb-0">
        <Hero
          lang="nl"
          h1="De vakman die u nodig hebt, aan de prijs die we aankondigen."
          lead="Slotenmaker, loodgieter, elektricien of chauffagist in Brussel en Vlaams-Brabant. U kent de prijsvork vóór de verplaatsing en betaalt na de interventie."
          bookHref={bookingUrl('nl')}
        />
        <Section title="Zo werkt het"><HowItWorks lang="nl" /></Section>
        <Zones lang="nl" />
        <Section title="Onze prijzen">
          <LinkGrid links={Object.values(TRADES).map(tr => ({ href: pricesUrl('nl', tr.id), label: `Prijs ${tr.name.nl.toLowerCase()}` }))} />
          <Link href={pricesUrl('nl')} className="mt-3 inline-block text-sm font-semibold text-orange">Alle prijzen →</Link>
        </Section>
      </main>
      <SiteFooter lang="nl" />
      <MobileBar lang="nl" href={bookingUrl('nl')} />
    </>
  )
}
