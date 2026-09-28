import Link from 'next/link'
import { notFound } from 'next/navigation'
import { UI } from '../../lib/i18n'
import { TRADES, tradeBySlug } from '../../lib/trades'
import { REGIONS, regionBySlug, communeBySlug, localNote, communeName, communeLabel } from '../../lib/geo'
import { isPublishable, publishableCommunes, tradeLocal } from '../../lib/seo/publish'
import { FEES, tradeRange, loadCatalog } from '../../lib/pricing'
import { communeContext } from '../../lib/seo/page-context'
import { HUBS } from '../../lib/seo/content/hubs'
import { isActive, activeRegions, activeTrades } from '../../lib/seo/rollout'
import { tradeUrl, regionUrl, communeUrl, pricesUrl, bookingUrl, absolute } from '../../lib/seo/routes'
import { organization, website, breadcrumb, service, city, faqPage, jsonLd } from '../../lib/seo/schema'
import { euro } from '../../lib/seo/content/shared'
import { PARTNERS } from '../../lib/partners'
import {
  JsonLd, SiteHeader, SiteFooter, Breadcrumbs, Hero, Section, PriceTable, FeesBox,
  HowItWorks, Faq, LinkGrid, CtaBand, MobileBar,
} from './ui'

const other = lang => (lang === 'nl' ? 'fr' : 'nl')
const hreflang = lang => (lang === 'nl' ? 'nl-BE' : 'fr-BE')

function languages(paths) {
  const out = {}
  for (const [lang, path] of Object.entries(paths)) if (path) out[hreflang(lang)] = absolute(path)
  if (paths.fr) out['x-default'] = absolute(paths.fr)
  return out
}

function meta({ title, description, path, lang, alternates }) {
  return {
    title,
    description,
    alternates: { canonical: absolute(path), languages: languages({ [lang]: path, ...alternates }) },
    openGraph: { title, description, url: absolute(path), siteName: 'Dépannage.be', locale: lang === 'nl' ? 'nl_BE' : 'fr_BE', type: 'website' },
  }
}

/* ─── Params resolution ──────────────────────────────────── */

export function resolveTrade(slug, lang) {
  const trade = tradeBySlug(slug, lang)
  if (!trade || !activeRegions(trade.id, lang).length) return null
  return trade
}

export function resolveRegion(tradeSlug, regionSlug, lang) {
  const trade = tradeBySlug(tradeSlug, lang)
  const region = regionBySlug(regionSlug, lang)
  if (!trade || !region || !isActive(trade.id, region.id, lang)) return null
  return { trade, region }
}

export function resolveCommune(tradeSlug, regionSlug, communeSlug, lang) {
  const tr = resolveRegion(tradeSlug, regionSlug, lang)
  if (!tr) return null
  const commune = communeBySlug(tr.region.id, communeSlug, lang)
  if (!commune || !isPublishable(tr.trade.id, commune, lang)) return null
  return { ...tr, commune }
}

/* ─── Static params ──────────────────────────────────────── */

export function tradeParams(lang) {
  return activeTrades(lang).map(id => ({ trade: TRADES[id].slug[lang] }))
}

export function regionParams(lang) {
  return activeTrades(lang).flatMap(id => activeRegions(id, lang).map(r => ({ trade: TRADES[id].slug[lang], region: REGIONS[r].slug[lang] })))
}

export function communeParams(lang) {
  return activeTrades(lang).flatMap(id => activeRegions(id, lang).flatMap(r =>
    publishableCommunes(id, r, lang).map(c => ({ trade: TRADES[id].slug[lang], region: REGIONS[r].slug[lang], commune: lang === 'nl' ? c.slugNl : c.slugFr })),
  ))
}

/* ─── Commune page ───────────────────────────────────────── */

function communeAlternates(tradeId, commune, lang) {
  const o = other(lang)
  return isPublishable(tradeId, commune, o) ? { [o]: communeUrl(tradeId, commune, o) } : {}
}

export async function communeMetadata({ params }, lang) {
  const r = resolveCommune(params.trade, params.region, params.commune, lang)
  if (!r) return {}
  const catalog = await loadCatalog()
  const { x, bank } = communeContext(r.trade.id, r.commune, lang, catalog)
  return meta({ title: bank.title(x), description: bank.description(x), path: communeUrl(r.trade.id, r.commune, lang), lang, alternates: communeAlternates(r.trade.id, r.commune, lang) })
}

export async function CommunePage({ params, lang }) {
  const r = resolveCommune(params.trade, params.region, params.commune, lang)
  if (!r) notFound()
  const { trade, region, commune } = r
  const t = UI[lang]
  const catalog = await loadCatalog()
  const { x, bank, intro, tip, priceRows, kinds, faqs } = communeContext(trade.id, commune, lang, catalog)
  const path = communeUrl(trade.id, commune, lang)
  const alt = communeAlternates(trade.id, commune, lang)[other(lang)]
  const book = p => bookingUrl(lang, { metier: trade.id, prestation: p?.id, cp: x.pc })
  const crumbs = [
    { name: t.home, path: lang === 'nl' ? '/nl' : '/' },
    { name: trade.name[lang], path: tradeUrl(trade.id, lang) },
    { name: region.name[lang], path: regionUrl(trade.id, region.id, lang) },
    { name: x.name, path },
  ]
  const otherTrades = activeTrades(lang).filter(id => id !== trade.id && isActive(id, region.id, lang))

  const ld = jsonLd(
    organization(),
    breadcrumb(crumbs),
    service({ name: bank.h1(x), serviceType: trade.name[lang], path, lang, areaServed: city(commune, x.name), prices: priceRows }),
    faqPage(faqs),
  )

  return (
    <>
      <JsonLd data={ld} />
      <SiteHeader lang={lang} altHref={alt} />
      <main className="pb-20 sm:pb-0">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6"><Breadcrumbs items={crumbs} /></div>
        <Hero lang={lang} h1={bank.h1(x)} lead={bank.lead(x)} bookHref={book()} />

        <Section>
          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-navy/85">
            <p>{intro}</p>
            <p>{localNote(commune, lang)}</p>
            <p>{bank.region[region.id](x)}</p>
          </div>
        </Section>

        <Section title={t.priceTitleIn(trade.name[lang].toLowerCase(), x.name)} id="prix">
          <PriceTable lang={lang} rows={priceRows} bookHref={book} />
          <p className="mt-3 text-sm text-navy/70">{t.feesShort(x.fees)}</p>
          <Link href={pricesUrl(lang, trade.id)} className="mt-2 inline-block text-sm font-semibold text-orange">{t.allPrices} →</Link>
        </Section>

        <Section title={bank.kindTitle(x)}>
          <ul className="grid list-none gap-3 sm:grid-cols-2">
            {kinds.map(k => (
              <li key={k.t} className="rounded-xl border border-black/10 p-4">
                <div className="font-bold text-navy">{k.t}</div>
                <p className="mt-1 text-sm text-navy/70">{k.d}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title={t.localTitle(trade.name[lang], x.name)}>
          <div className="max-w-3xl space-y-4 leading-relaxed text-navy/85">
            {tradeLocal(trade.id, commune, lang).map(para => <p key={para.slice(0, 24)}>{para}</p>)}
          </div>
          {PARTNERS.filter(pt => pt.trade === trade.id && pt.communes.includes(commune.id)).map(pt => (
            <p key={pt.id} className="mt-4 max-w-3xl rounded-xl bg-[#F7F7F8] p-4 text-sm text-navy/80">
              {lang === 'nl' ? 'Partnervakman in deze zone: ' : 'Artisan partenaire dans cette zone : '}
              <a href={pt.url} className="font-semibold text-navy underline">{pt.name}</a> — {pt.about[lang]}{' '}
              <Link href={lang === 'nl' ? '/nl/partners' : '/partenaires'} className="font-semibold text-orange">{lang === 'nl' ? 'Onze partners' : 'Nos partenaires'} →</Link>
            </p>
          ))}
        </Section>

        <Section title={bank.zoneTitle(x)}>
          <p className="mb-2 max-w-3xl text-navy/80">{bank.eta(x)}</p>
          <p className="mb-4 max-w-3xl text-navy/80">{bank.zone(x)}</p>
          <LinkGrid links={x.near.filter(n => n.linked).map(n => ({
            href: communeUrl(trade.id, n.commune, lang),
            label: `${trade.name[lang]} ${n.name}`,
            meta: `${n.commune.postcodes[0]} · ${n.km.toFixed(1).replace('.', ',')} km`,
          }))} />
          {x.near.some(n => !n.linked) && (
            <p className="mt-3 text-sm text-navy/60">{x.near.filter(n => !n.linked).map(n => n.name).join(', ')}</p>
          )}
          <Link href={regionUrl(trade.id, region.id, lang)} className="mt-4 inline-block text-sm font-semibold text-orange">
            {t.regionCommunes(region.in[lang])} →
          </Link>
        </Section>

        {otherTrades.length > 0 && (
          <Section title={t.otherTrades(x.name)}>
            <LinkGrid links={otherTrades.map(id => ({ href: communeUrl(id, commune, lang), label: `${TRADES[id].name[lang]} ${x.name}` }))} />
          </Section>
        )}

        <Section title={t.faqTitle}>
          <Faq faqs={faqs} />
        </Section>

        <CtaBand lang={lang} title={t.ctaTitle(x.name)} href={book()} />
      </main>
      <SiteFooter lang={lang} />
      <MobileBar lang={lang} href={book()} />
    </>
  )
}

/* ─── Region hub ─────────────────────────────────────────── */

function regionAlternates(tradeId, regionId, lang) {
  const o = other(lang)
  return isActive(tradeId, regionId, o) ? { [o]: regionUrl(tradeId, regionId, o) } : {}
}

export async function regionMetadata({ params }, lang) {
  const r = resolveRegion(params.trade, params.region, lang)
  if (!r) return {}
  const h = HUBS[lang]
  const catalog = await loadCatalog()
  const from = Math.min(...catalog[r.trade.key].filter(p => p.urgent).map(p => p.min))
  return meta({ title: h.regionTitle(r.trade, r.region), description: h.regionDesc(r.trade, r.region, from), path: regionUrl(r.trade.id, r.region.id, lang), lang, alternates: regionAlternates(r.trade.id, r.region.id, lang) })
}

export async function RegionPage({ params, lang }) {
  const r = resolveRegion(params.trade, params.region, lang)
  if (!r) notFound()
  const { trade, region } = r
  const t = UI[lang]
  const h = HUBS[lang]
  const catalog = await loadCatalog()
  const prices = catalog[trade.key]
  const rows = [...prices].sort((a, b) => Number(b.urgent) - Number(a.urgent)).slice(0, 10)
  const communes = publishableCommunes(trade.id, region.id, lang).sort((a, b) => communeName(a, lang).localeCompare(communeName(b, lang), lang))
  const path = regionUrl(trade.id, region.id, lang)
  const faqs = h.faq(trade, FEES[trade.key])
  const crumbs = [
    { name: t.home, path: lang === 'nl' ? '/nl' : '/' },
    { name: trade.name[lang], path: tradeUrl(trade.id, lang) },
    { name: region.name[lang], path },
  ]
  const book = p => bookingUrl(lang, { metier: trade.id, prestation: p?.id })
  const ld = jsonLd(
    organization(),
    breadcrumb(crumbs),
    service({ name: h.regionH1(trade, region), serviceType: trade.name[lang], path, lang, areaServed: { '@type': 'AdministrativeArea', name: region.full[lang] }, prices: rows }),
    faqPage(faqs),
  )

  return (
    <>
      <JsonLd data={ld} />
      <SiteHeader lang={lang} altHref={regionAlternates(trade.id, region.id, lang)[other(lang)]} />
      <main className="pb-20 sm:pb-0">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6"><Breadcrumbs items={crumbs} /></div>
        <Hero lang={lang} h1={h.regionH1(trade, region)} lead={h.regionLead(trade, region, communes.length)} bookHref={book()} />
        <Section>
          <p className="max-w-3xl leading-relaxed text-navy/85">{h.regionIntro[region.id](trade)}</p>
        </Section>
        <Section title={h.communesTitle(region)}>
          <LinkGrid links={communes.map(c => ({ href: communeUrl(trade.id, c, lang), label: communeLabel(c, lang), meta: c.postcodes.join(', ') }))} />
        </Section>
        <Section title={t.priceTitle(trade.name[lang].toLowerCase())}>
          <PriceTable lang={lang} rows={rows} bookHref={book} />
          <FeesBox lang={lang} fees={FEES[trade.key]} />
          <Link href={pricesUrl(lang, trade.id)} className="mt-3 inline-block text-sm font-semibold text-orange">{t.allPrices} →</Link>
        </Section>
        <Section title={t.howTitle}><HowItWorks lang={lang} /></Section>
        <Section title={t.faqTitle}><Faq faqs={faqs} /></Section>
        <CtaBand lang={lang} title={h.regionH1(trade, region)} href={book()} />
      </main>
      <SiteFooter lang={lang} />
      <MobileBar lang={lang} href={book()} />
    </>
  )
}

/* ─── Trade hub ──────────────────────────────────────────── */

export async function tradeMetadata({ params }, lang) {
  const trade = resolveTrade(params.trade, lang)
  if (!trade) return {}
  const h = HUBS[lang]
  const o = other(lang)
  const alt = activeRegions(trade.id, o).length ? { [o]: tradeUrl(trade.id, o) } : {}
  return meta({ title: h.tradeTitle(trade), description: h.tradeDesc(trade, tradeRange(trade.key)), path: tradeUrl(trade.id, lang), lang, alternates: alt })
}

export async function TradePage({ params, lang }) {
  const trade = resolveTrade(params.trade, lang)
  if (!trade) notFound()
  const t = UI[lang]
  const h = HUBS[lang]
  const catalog = await loadCatalog()
  const rows = [...catalog[trade.key]].sort((a, b) => Number(b.urgent) - Number(a.urgent)).slice(0, 10)
  const path = tradeUrl(trade.id, lang)
  const faqs = h.faq(trade, FEES[trade.key])
  const crumbs = [{ name: t.home, path: lang === 'nl' ? '/nl' : '/' }, { name: trade.name[lang], path }]
  const book = p => bookingUrl(lang, { metier: trade.id, prestation: p?.id })
  const o = other(lang)
  const ld = jsonLd(
    organization(),
    website(),
    breadcrumb(crumbs),
    service({ name: h.tradeH1(trade), serviceType: trade.name[lang], path, lang, areaServed: activeRegions(trade.id, lang).map(r => ({ '@type': 'AdministrativeArea', name: REGIONS[r].full[lang] })), prices: rows }),
    faqPage(faqs),
  )
  return (
    <>
      <JsonLd data={ld} />
      <SiteHeader lang={lang} altHref={activeRegions(trade.id, o).length ? tradeUrl(trade.id, o) : null} />
      <main className="pb-20 sm:pb-0">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6"><Breadcrumbs items={crumbs} /></div>
        <Hero lang={lang} h1={h.tradeH1(trade)} lead={h.tradeLead(trade)} bookHref={book()} />
        <Section title={h.regionsTitle}>
          <LinkGrid links={activeRegions(trade.id, lang).map(r => ({
            href: regionUrl(trade.id, r, lang),
            label: `${trade.name[lang]} ${REGIONS[r].in[lang]}`,
            meta: `${publishableCommunes(trade.id, r, lang).length} ${lang === 'nl' ? 'gemeenten' : 'communes'}`,
          }))} />
        </Section>
        <Section title={t.priceTitle(trade.name[lang].toLowerCase())}>
          <PriceTable lang={lang} rows={rows} bookHref={book} />
          <FeesBox lang={lang} fees={FEES[trade.key]} />
          <Link href={pricesUrl(lang, trade.id)} className="mt-3 inline-block text-sm font-semibold text-orange">{t.allPrices} →</Link>
        </Section>
        <Section title={t.howTitle}><HowItWorks lang={lang} /></Section>
        <Section title={t.faqTitle}><Faq faqs={faqs} /></Section>
        <CtaBand lang={lang} title={h.tradeH1(trade)} href={book()} />
      </main>
      <SiteFooter lang={lang} />
      <MobileBar lang={lang} href={book()} />
    </>
  )
}

/* ─── Price pages ────────────────────────────────────────── */

export function pricesTradeParams(lang) {
  return Object.values(TRADES).map(tr => ({ trade: tr.pricePath[lang] }))
}

function tradeByPricePath(slug, lang) {
  return Object.values(TRADES).find(tr => tr.pricePath[lang] === slug) || null
}

export async function pricesTradeMetadata({ params }, lang) {
  const trade = tradeByPricePath(params.trade, lang)
  if (!trade) return {}
  const h = HUBS[lang]
  return meta({ title: h.pricesTitle(trade), description: h.pricesDesc(trade, tradeRange(trade.key)), path: pricesUrl(lang, trade.id), lang, alternates: { [other(lang)]: pricesUrl(other(lang), trade.id) } })
}

export async function PricesTradePage({ params, lang }) {
  const trade = tradeByPricePath(params.trade, lang)
  if (!trade) notFound()
  const t = UI[lang]
  const h = HUBS[lang]
  const catalog = await loadCatalog()
  const rows = catalog[trade.key]
  const path = pricesUrl(lang, trade.id)
  const crumbs = [{ name: t.home, path: lang === 'nl' ? '/nl' : '/' }, { name: t.prices, path: pricesUrl(lang) }, { name: trade.name[lang], path }]
  const faqs = h.faq(trade, FEES[trade.key])
  const book = p => bookingUrl(lang, { metier: trade.id, prestation: p?.id })
  const ld = jsonLd(organization(), breadcrumb(crumbs), service({ name: h.pricesH1(trade), serviceType: trade.name[lang], path, lang, areaServed: Object.values(REGIONS).map(r => ({ '@type': 'AdministrativeArea', name: r.full[lang] })), prices: rows }), faqPage(faqs))
  const regions = activeRegions(trade.id, lang)
  return (
    <>
      <JsonLd data={ld} />
      <SiteHeader lang={lang} altHref={pricesUrl(other(lang), trade.id)} />
      <main className="pb-20 sm:pb-0">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6"><Breadcrumbs items={crumbs} /></div>
        <Hero lang={lang} h1={h.pricesH1(trade)} lead={h.pricesLead(trade)} bookHref={book()} />
        <Section>
          <PriceTable lang={lang} rows={rows} bookHref={book} />
          <FeesBox lang={lang} fees={FEES[trade.key]} />
        </Section>
        <Section title={h.method}><p className="max-w-3xl leading-relaxed text-navy/80">{h.methodText}</p></Section>
        {regions.length > 0 && (
          <Section title={h.regionsTitle}>
            <LinkGrid links={regions.map(r => ({ href: regionUrl(trade.id, r, lang), label: `${trade.name[lang]} ${REGIONS[r].in[lang]}` }))} />
          </Section>
        )}
        <Section title={t.faqTitle}><Faq faqs={faqs} /></Section>
      </main>
      <SiteFooter lang={lang} />
      <MobileBar lang={lang} href={book()} />
    </>
  )
}

export function pricesIndexMetadata(lang) {
  const h = HUBS[lang]
  return meta({ title: h.pricesIndexTitle, description: h.pricesIndexDesc, path: pricesUrl(lang), lang, alternates: { [other(lang)]: pricesUrl(other(lang)) } })
}

export async function PricesIndexPage({ lang }) {
  const t = UI[lang]
  const h = HUBS[lang]
  const catalog = await loadCatalog()
  const crumbs = [{ name: t.home, path: lang === 'nl' ? '/nl' : '/' }, { name: t.prices, path: pricesUrl(lang) }]
  return (
    <>
      <JsonLd data={jsonLd(organization(), breadcrumb(crumbs))} />
      <SiteHeader lang={lang} altHref={pricesUrl(other(lang))} />
      <main className="pb-20 sm:pb-0">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6"><Breadcrumbs items={crumbs} /></div>
        <Hero lang={lang} h1={h.pricesIndexH1} lead={h.pricesIndexLead} bookHref={bookingUrl(lang)} trust={false} />
        {Object.values(TRADES).map(trade => {
          const rows = catalog[trade.key].filter(p => p.booking)
          return (
            <Section key={trade.id} title={t.priceTitle(trade.name[lang].toLowerCase())}>
              <PriceTable lang={lang} rows={rows} />
              <Link href={pricesUrl(lang, trade.id)} className="mt-3 inline-block text-sm font-semibold text-orange">
                {t.allPrices} ({catalog[trade.key].length}) →
              </Link>
            </Section>
          )
        })}
        <Section title={h.method}><p className="max-w-3xl leading-relaxed text-navy/80">{h.methodText}</p></Section>
      </main>
      <SiteFooter lang={lang} />
      <MobileBar lang={lang} href={bookingUrl(lang)} />
    </>
  )
}

