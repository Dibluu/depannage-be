import { TRADES } from '../trades'
import { REGIONS, communeName, communeLabel, neighbours } from '../geo'
import { isPublishable } from './publish'
import { LOCAL } from './content/local'
import { FEES } from '../pricing'
import { CONTENT } from './content'
import { pick, pickMany, joinList, ETA } from './content/shared'
import { isActive } from './rollout'

// Everything a commune page needs, computed once per (trade, commune, lang).
export function communeContext(tradeId, commune, lang, catalog) {
  const trade = TRADES[tradeId]
  const bank = CONTENT[tradeId][lang]
  const region = REGIONS[commune.region]
  const prices = catalog[trade.key]
  const seed = `${tradeId}:${commune.id}:${lang}`
  const name = communeName(commune, lang)
  const sectionsSample = pickMany(commune.sections, seed, 3)
  const near = neighbours(commune, 6).map(n => ({
    ...n,
    name: communeName(n.commune, lang),
    linked: isPublishable(tradeId, n.commune, lang),
  }))

  const x = {
    trade,
    lang,
    commune,
    region,
    name,
    label: communeLabel(commune, lang),
    pc: commune.postcodes[0],
    pcList: commune.postcodes.join(', '),
    pcLabel: lang === 'nl'
      ? `postcode ${commune.postcodes.join(', ')}`
      : `${commune.postcodes.length > 1 ? 'codes postaux' : 'code postal'} ${commune.postcodes.join(', ')}`,
    sections: commune.sections,
    secText: sectionsSample.length ? joinList(sectionsSample, lang) : '',
    facilites: !!commune.facilites,
    kind: commune.kind,
    eta: ETA[commune.kind][lang],
    fees: FEES[trade.key],
    prices,
    p: id => prices.find(p => p.id === id) || { min: 0, max: 0 },
    near,
    police: LOCAL[tradeId]?.[commune.id]?.police?.[lang] || null,
  }
  x.from = Math.min(...prices.filter(p => p.urgent).map(p => p.min))

  return {
    x,
    bank,
    intro: pick(bank.intros, seed)(x),
    tip: pickMany(bank.tips, seed, 1),
    kinds: pickMany(bank.kind[commune.kind], seed, 2),
    // Localised questions first (price, identity/sections), then one rotating general question.
    faqs: (() => {
      const all = bank.faq(x)
      const isLocal = f => f.q.includes(name) || (commune.sections[0] && f.q.includes(commune.sections[0]))
      const local = all.filter(isLocal)
      const general = all.filter(f => !isLocal(f))
      return [...local, ...pickMany(general, seed, 1)]
    })(),
    // Emergency jobs first; the full grid lives on the price page.
    priceRows: [...prices].sort((a, b) => Number(b.urgent) - Number(a.urgent)).slice(0, 6),
  }
}
