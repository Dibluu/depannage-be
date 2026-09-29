import Link from 'next/link'
import { DIRECTORY } from '../../lib/directory'
import { TRADES } from '../../lib/trades'
import { REGIONS, COMMUNES, communeName } from '../../lib/geo'
import { FEES, loadCatalog } from '../../lib/pricing'
import { publishableCommunes } from '../../lib/seo/publish'
import { activeRegions } from '../../lib/seo/rollout'
import { communeUrl, bookingUrl, absolute, pricesUrl, ANNUAIRE_PATH } from '../../lib/seo/routes'
import { organization, breadcrumb, faqPage, jsonLd } from '../../lib/seo/schema'
import { euro } from '../../lib/seo/content/shared'
import { JsonLd, SiteHeader, SiteFooter, Breadcrumbs, Hero, Section, PriceTable, FeesBox, Faq, LinkGrid, CtaBand, MobileBar } from './ui'

// French-only page targeting « annuaire serrurier ». Not linked from the home page or the
// navigation on purpose: reached from the sitemap and one discreet link on the locksmith hub.

const TRADE = TRADES.serrurier
const PRICE_IDS = ['porte-claquee', 'porte-verrouillee', 'cle-cassee', 'cylindre-perte-cles', 'effraction', 'porte-blindee']

const CRITERIA = [
  ['Entreprise active à la BCE', 'Numéro d’entreprise et TVA actifs à la Banque-Carrefour des Entreprises, siège réel en Belgique.'],
  ['Assurance responsabilité civile professionnelle', 'Une porte abîmée pendant l’intervention est couverte.'],
  ['Prix annoncé avant le déplacement', 'Le serrurier applique nos fourchettes par prestation, TVA comprise. Pas de « forfait déplacement » découvert sur place.'],
  ['Facture détaillée', 'Chaque intervention donne lieu à une facture avec le détail des prestations et des pièces.'],
  ['Installé dans sa zone', 'Un artisan local, pas un centre d’appels qui revend l’intervention au plus offrant.'],
  ['Avis clients suivis', 'Les avis publics sont relus régulièrement ; un serrurier qui accumule les plaintes sort de l’annuaire.'],
]

const SCAM_SIGNS = [
  'Aucun prix donné au téléphone, ou un « à partir de 29 € » qui ne veut rien dire.',
  'Un numéro trouvé en tête des annonces, sans nom d’entreprise ni numéro BCE sur le site.',
  'Pour une porte simplement claquée, le serrurier veut percer le cylindre ou changer toute la serrure : dans la grande majorité des cas, elle s’ouvre sans dégât.',
  'Paiement exigé en liquide uniquement, ou refus de remettre une facture.',
  'Un devis signé « sous pression » sur le pas de la porte, avant toute explication.',
]

const faqs = from => [
  { q: 'Comment trouver un serrurier fiable à Bruxelles ?', a: `Vérifiez trois choses avant qu’il se déplace : un nom d’entreprise avec numéro BCE, un prix annoncé par prestation (une ouverture de porte claquée coûte en général entre ${euro(from.min)} et ${euro(from.max)} TTC en journée) et la remise d’une facture. Les serruriers de cet annuaire remplissent ces trois conditions.` },
  { q: 'Pourquoi les coordonnées des serruriers ne sont-elles pas affichées ?', a: 'Vous passez par Dépannage.be pour obtenir le prix avant le déplacement : c’est ce qui garantit que la fourchette annoncée est respectée et vous donne un interlocuteur en cas de litige. Le serrurier disponible le plus proche de chez vous est ensuite envoyé.' },
  { q: 'Combien coûte un serrurier la nuit ou le week-end ?', a: `Une seule majoration de ${euro(FEES[TRADE.key].surcharge)} s’applique entre 20h et 8h, le week-end et les jours fériés. Elle vous est annoncée avant le déplacement et ne se cumule pas.` },
  { q: 'Que faire si je pense avoir été arnaqué par un serrurier ?', a: 'Gardez la facture ou, à défaut, le numéro appelé et le montant payé. Vous pouvez signaler les faits au SPF Économie via le Point de contact en ligne, et contacter votre banque rapidement si vous avez payé par carte.' },
  { q: 'Un serrurier peut-il ouvrir ma porte sans l’abîmer ?', a: 'Pour une porte claquée (non fermée à clé), oui dans la grande majorité des cas. Pour une porte fermée à clé ou une porte blindée, cela dépend du cylindre ; le serrurier vous dit avant de commencer s’il doit le remplacer et à quel prix.' },
]

export function annuaireMetadata() {
  return {
    title: 'Annuaire serrurier Bruxelles et Brabant wallon : serruriers vérifiés',
    description: 'Annuaire des serruriers vérifiés à Bruxelles et en Brabant wallon : entreprise active à la BCE, assurance RC, prix annoncé avant le déplacement. Guide anti-arnaque et tarifs 2026.',
    alternates: { canonical: absolute(ANNUAIRE_PATH) },
  }
}

export default async function AnnuairePage() {
  const lang = 'fr'
  const catalog = await loadCatalog()
  const prices = PRICE_IDS.map(id => catalog[TRADE.key].find(p => p.id === id)).filter(Boolean)
  const claquee = prices.find(p => p.id === 'porte-claquee') || prices[0]
  const qa = faqs(claquee)
  const crumbs = [{ name: 'Accueil', path: '/' }, { name: 'Annuaire serrurier', path: ANNUAIRE_PATH }]
  const book = p => bookingUrl(lang, { metier: TRADE.id, prestation: p?.id })
  const regions = activeRegions(TRADE.id, lang)

  const list = {
    '@type': 'ItemList',
    name: 'Annuaire des serruriers vérifiés à Bruxelles et en Brabant wallon',
    numberOfItems: DIRECTORY.length,
    itemListElement: DIRECTORY.map((d, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Locksmith',
        name: d.name,
        description: d.about,
        address: { '@type': 'PostalAddress', addressLocality: d.base, addressCountry: 'BE' },
        areaServed: d.communes.map(id => COMMUNES.find(c => c.id === id)).filter(Boolean).map(c => ({ '@type': 'City', name: c.nameFr })),
        ...(d.rating ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: d.rating.value.replace(',', '.'), reviewCount: d.rating.count, bestRating: 5 } } : {}),
      },
    })),
  }

  return (
    <>
      <JsonLd data={jsonLd(organization(), breadcrumb(crumbs), list, faqPage(qa))} />
      <SiteHeader lang={lang} />
      <main className="pb-20 sm:pb-0">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6"><Breadcrumbs items={crumbs} /></div>
        <Hero
          lang={lang}
          h1="Annuaire des serruriers vérifiés à Bruxelles et en Brabant wallon"
          lead="Des serruriers indépendants contrôlés un par un : entreprise active à la BCE, assurance RC professionnelle, prix annoncé avant le déplacement et facture détaillée. Pas d’intermédiaire douteux, pas de mauvaise surprise sur le pas de la porte."
          bookHref={book()}
        />

        <Section title="Les serruriers de l’annuaire">
          <p className="mb-4 max-w-3xl text-sm text-navy/70">Les serruriers listés sont sélectionnés par Dépannage.be. Pour une intervention, demandez votre prix en ligne : le serrurier disponible le plus proche de chez vous est envoyé, au tarif annoncé.</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DIRECTORY.map(d => (
              <article key={d.id} className="flex flex-col rounded-2xl border border-black/10 p-5">
                <div className="text-xs font-bold uppercase tracking-wide text-orange">Serrurier · {d.base}</div>
                <h3 className="mt-1 text-xl font-extrabold text-navy">{d.name}</h3>
                <p className="mt-2 text-sm text-navy/75">{d.about}</p>
                <p className="mt-2 text-sm text-navy/75"><b>Zone :</b> {d.zone}</p>
                {d.since && <p className="mt-2 text-sm text-navy/75"><b>En activité depuis :</b> {d.since}</p>}
                {d.rating && (
                  <p className="mt-2 text-sm font-semibold text-navy">★ {d.rating.value}/5 sur Google ({d.rating.count} avis, relevé le {new Date(d.rating.readOn).toLocaleDateString('fr-BE')})</p>
                )}
                <ul className="mt-3 flex list-none flex-wrap gap-1.5 text-xs text-navy/70">
                  <li className="rounded-md bg-[#F7F7F8] px-2 py-1">✓ BCE active</li>
                  <li className="rounded-md bg-[#F7F7F8] px-2 py-1">✓ Assurance RC</li>
                  <li className="rounded-md bg-[#F7F7F8] px-2 py-1">✓ Prix annoncé</li>
                </ul>
                <Link href={book()} className="mt-auto pt-4 text-sm font-semibold text-orange">Obtenir mon prix →</Link>
              </article>
            ))}
          </div>
        </Section>

        <Section title="Comment nous sélectionnons les serruriers">
          <ul className="grid list-none gap-3 sm:grid-cols-2">
            {CRITERIA.map(([t, d]) => (
              <li key={t} className="rounded-xl border border-black/10 p-4">
                <div className="font-bold text-navy"><span className="text-green">✓</span> {t}</div>
                <p className="mt-1 text-sm text-navy/70">{d}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Prix de référence d’un serrurier en 2026">
          <p className="mb-4 max-w-3xl text-navy/80">Tous les serruriers de l’annuaire appliquent la même grille. Les fourchettes comprennent le déplacement, la main-d’œuvre et les petites fournitures, TVA 6 % comprise.</p>
          <PriceTable lang={lang} rows={prices} bookHref={book} />
          <FeesBox lang={lang} fees={FEES[TRADE.key]} />
          <Link href={pricesUrl(lang, TRADE.id)} className="mt-3 inline-block text-sm font-semibold text-orange">Voir tous les prix serrurier →</Link>
        </Section>

        <Section title="Arnaque au serrurier : les 5 signaux d’alerte">
          <div className="max-w-3xl space-y-4 text-navy/85">
            <p>Chaque année, des Bruxellois paient plusieurs centaines d’euros pour une simple porte claquée. Le scénario est presque toujours le même : un numéro trouvé en urgence, aucun prix au téléphone, puis une facture gonflée sur place. Méfiez-vous si :</p>
            <ol className="list-decimal space-y-2 pl-5">
              {SCAM_SIGNS.map(s => <li key={s}>{s}</li>)}
            </ol>
            <p>Le bon réflexe : exiger un prix par prestation avant le déplacement, vérifier le numéro d’entreprise sur le site public de la BCE, et ne rien signer avant d’avoir compris ce qui va être fait.</p>
          </div>
        </Section>

        {regions.map(r => (
          <Section key={r} title={`Serrurier par commune ${REGIONS[r].in[lang]}`}>
            <LinkGrid links={publishableCommunes(TRADE.id, r, lang).map(c => ({ href: communeUrl(TRADE.id, c, lang), label: `Serrurier ${communeName(c, lang)}` }))} />
          </Section>
        ))}

        <Section title="Questions fréquentes"><Faq faqs={qa} /></Section>
        <CtaBand lang={lang} title="Un serrurier vérifié, un prix annoncé" href={book()} />
      </main>
      <SiteFooter lang={lang} />
      <MobileBar lang={lang} href={book()} />
    </>
  )
}
