import { TRADES, tradeBySlug } from '../../trades'
import { REGIONS, regionBySlug, communeBySlug } from '../../geo'
import { loadCatalog } from '../../pricing'
import { HUBS } from '../content/hubs'
import { communeContext } from '../page-context'
import { isActive, activeRegions } from '../rollout'
import { isPublishable } from '../publish'
import { euro } from '../content/shared'
import { ogImage } from './render'

// One builder per page type; params are the route params of the page the card belongs to.
// Unknown params fall back to the generic card (the page itself is a 404 anyway).

const TAGLINE = {
  fr: { kicker: 'Serrurier · Plombier · Électricien · Chauffagiste', title: 'L’artisan qu’il vous faut, au prix qu’on vous annonce.' },
  nl: { kicker: 'Slotenmaker · Loodgieter · Elektricien · Chauffagist', title: 'De vakman die u nodig hebt, aan de prijs die we aankondigen.' },
}

async function lowestPrice(trade) {
  const catalog = await loadCatalog()
  return euro(Math.min(...catalog[trade.key].map(p => p.min)))
}

export function homeCard(lang) {
  return ogImage({ lang, ...TAGLINE[lang] })
}

export async function tradeCard(params, lang) {
  const trade = tradeBySlug(params.trade, lang)
  if (!trade || !activeRegions(trade.id, lang).length) return homeCard(lang)
  return ogImage({
    lang,
    kicker: activeRegions(trade.id, lang).map(r => REGIONS[r].name[lang]).join(' · '),
    title: HUBS[lang].tradeH1(trade),
    from: await lowestPrice(trade),
  })
}

export async function regionCard(params, lang) {
  const trade = tradeBySlug(params.trade, lang)
  const region = regionBySlug(params.region, lang)
  if (!trade || !region || !isActive(trade.id, region.id, lang)) return homeCard(lang)
  return ogImage({ lang, kicker: region.full[lang], title: HUBS[lang].regionH1(trade, region), from: await lowestPrice(trade) })
}

export async function communeCard(params, lang) {
  const trade = tradeBySlug(params.trade, lang)
  const region = regionBySlug(params.region, lang)
  const commune = region && communeBySlug(region.id, params.commune, lang)
  if (!trade || !commune || !isPublishable(trade.id, commune, lang)) return homeCard(lang)
  const { x, bank } = communeContext(trade.id, commune, lang, await loadCatalog())
  return ogImage({ lang, kicker: `${x.pcList} · ${region.name[lang]}`, title: bank.h1(x), from: await lowestPrice(trade) })
}

export async function pricesCard(params, lang) {
  const trade = Object.values(TRADES).find(tr => tr.pricePath[lang] === params.trade)
  if (!trade) return homeCard(lang)
  return ogImage({ lang, kicker: lang === 'nl' ? 'Prijslijst' : 'Grille de prix', title: HUBS[lang].pricesH1(trade), from: await lowestPrice(trade) })
}
