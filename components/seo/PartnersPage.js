import Link from 'next/link'
import { PARTNERS } from '../../lib/partners'
import { TRADES } from '../../lib/trades'
import { COMMUNES, communeName } from '../../lib/geo'
import { isPublishable } from '../../lib/seo/publish'
import { communeUrl, bookingUrl, absolute } from '../../lib/seo/routes'
import { organization, breadcrumb, jsonLd } from '../../lib/seo/schema'
import { JsonLd, SiteHeader, SiteFooter, Breadcrumbs, Hero, Section, MobileBar } from './ui'

const COPY = {
  fr: {
    title: 'Nos artisans partenaires à Bruxelles et dans le Brabant | Dépannage.be',
    description: 'Les serruriers et artisans indépendants qui interviennent pour Dépannage.be : zones couvertes, spécialités et avis Google.',
    h1: 'Nos artisans partenaires',
    lead: 'Des artisans indépendants, installés dans leur zone, qui appliquent nos prix annoncés à l’avance. Chaque partenaire garde son entreprise, son site et ses clients.',
    zone: 'Zone',
    rating: (r) => `${r.value}/5 sur Google (${r.count} avis, relevé le ${new Date(r.readOn).toLocaleDateString('fr-BE')})`,
    site: 'Site du partenaire',
    pages: 'Ses communes sur Dépannage.be',
    joinTitle: 'Vous êtes artisan ?',
    join: 'Rejoignez le réseau : vous recevez des demandes à prix annoncé dans votre zone, sans commission cachée.',
    joinCta: 'Devenir partenaire',
    home: 'Accueil',
    crumb: 'Partenaires',
  },
  nl: {
    title: 'Onze partnervakmensen in Brussel en Brabant | Dépannage.be',
    description: 'De slotenmakers en zelfstandige vakmensen die voor Dépannage.be werken: werkgebied, specialiteiten en Google-reviews.',
    h1: 'Onze partnervakmensen',
    lead: 'Zelfstandige vakmensen uit de buurt die onze vooraf aangekondigde prijzen toepassen. Elke partner houdt zijn eigen bedrijf, website en klanten.',
    zone: 'Werkgebied',
    rating: (r) => `${r.value}/5 op Google (${r.count} reviews, op ${new Date(r.readOn).toLocaleDateString('nl-BE')})`,
    site: 'Website van de partner',
    pages: 'Zijn gemeenten op Dépannage.be',
    joinTitle: 'Bent u vakman?',
    join: 'Word partner: u krijgt aanvragen met vooraf aangekondigde prijs in uw regio, zonder verborgen commissie.',
    joinCta: 'Partner worden',
    home: 'Home',
    crumb: 'Partners',
  },
}

export function partnersMetadata(lang) {
  const c = COPY[lang]
  const path = lang === 'nl' ? '/nl/partners' : '/partenaires'
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: absolute(path), languages: { 'fr-BE': absolute('/partenaires'), 'nl-BE': absolute('/nl/partners') } },
  }
}

export default function PartnersPage({ lang }) {
  const c = COPY[lang]
  const path = lang === 'nl' ? '/nl/partners' : '/partenaires'
  const crumbs = [{ name: c.home, path: lang === 'nl' ? '/nl' : '/' }, { name: c.crumb, path }]
  return (
    <>
      <JsonLd data={jsonLd(organization(), breadcrumb(crumbs))} />
      <SiteHeader lang={lang} altHref={lang === 'nl' ? '/partenaires' : '/nl/partners'} />
      <main className="pb-20 sm:pb-0">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6"><Breadcrumbs items={crumbs} /></div>
        <Hero lang={lang} h1={c.h1} lead={c.lead} bookHref={bookingUrl(lang)} trust={false} />
        <Section>
          <div className="grid gap-4 sm:grid-cols-2">
            {PARTNERS.map(p => {
              const pages = p.communes
                .map(id => COMMUNES.find(x => x.id === id))
                .filter(x => x && isPublishable(p.trade, x, lang))
              return (
                <article key={p.id} className="rounded-2xl border border-black/10 p-5">
                  <div className="text-xs font-bold uppercase tracking-wide text-orange">{TRADES[p.trade].name[lang]} · {p.base[lang]}</div>
                  <h2 className="mt-1 text-xl font-extrabold text-navy">{p.name}</h2>
                  <p className="mt-2 text-sm text-navy/75">{p.about[lang]}</p>
                  <p className="mt-2 text-sm text-navy/75"><b>{c.zone} :</b> {p.zone[lang]}</p>
                  <p className="mt-2 text-sm font-semibold text-navy">★ {c.rating(p.rating)}</p>
                  <a href={p.url} className="mt-3 inline-block text-sm font-semibold text-orange">{c.site} →</a>
                  {pages.length > 0 && (
                    <div className="mt-4">
                      <div className="text-xs font-bold text-navy/60">{c.pages}</div>
                      <ul className="mt-1 flex list-none flex-wrap gap-2">
                        {pages.map(x => (
                          <li key={x.id}><Link href={communeUrl(p.trade, x, lang)} className="rounded-md border border-black/10 px-2 py-1 text-xs text-navy hover:border-orange">{TRADES[p.trade].name[lang]} {communeName(x, lang)}</Link></li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </Section>
        <Section title={c.joinTitle}>
          <p className="max-w-2xl text-navy/80">{c.join}</p>
          <a href="https://partenaire.xn--dpannage-b1a.be/" className="mt-3 inline-block rounded-xl bg-orange px-5 py-3 font-bold text-white">{c.joinCta} →</a>
        </Section>
      </main>
      <SiteFooter lang={lang} />
      <MobileBar lang={lang} href={bookingUrl(lang)} />
    </>
  )
}
