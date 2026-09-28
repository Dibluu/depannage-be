import { TRADES } from '../lib/trades'
import { publishableCommunes, isPublishable } from '../lib/seo/publish'
import { activeTrades, activeRegions, isActive } from '../lib/seo/rollout'
import { absolute, tradeUrl, regionUrl, communeUrl, pricesUrl } from '../lib/seo/routes'

// Only published (active-wave) pages are listed, with their FR/NL alternates.
const LAST_CONTENT_UPDATE = new Date('2026-09-28')

function entry(path, alternates, priority) {
  const languages = {}
  for (const [lang, p] of Object.entries(alternates)) if (p) languages[lang === 'nl' ? 'nl-BE' : 'fr-BE'] = absolute(p)
  return { url: absolute(path), lastModified: LAST_CONTENT_UPDATE, changeFrequency: 'monthly', priority, alternates: { languages } }
}

export default function sitemap() {
  const out = [
    entry('/', { fr: '/', nl: '/nl' }, 1),
    entry('/nl', { fr: '/', nl: '/nl' }, 0.9),
    entry(pricesUrl('fr'), { fr: pricesUrl('fr'), nl: pricesUrl('nl') }, 0.7),
    entry(pricesUrl('nl'), { fr: pricesUrl('fr'), nl: pricesUrl('nl') }, 0.6),
    entry('/partenaires', { fr: '/partenaires', nl: '/nl/partners' }, 0.5),
    entry('/nl/partners', { fr: '/partenaires', nl: '/nl/partners' }, 0.4),
  ]
  for (const id of Object.keys(TRADES)) {
    const alt = { fr: pricesUrl('fr', id), nl: pricesUrl('nl', id) }
    out.push(entry(alt.fr, alt, 0.7), entry(alt.nl, alt, 0.6))
  }
  for (const lang of ['fr', 'nl']) {
    const o = lang === 'nl' ? 'fr' : 'nl'
    for (const id of activeTrades(lang)) {
      out.push(entry(tradeUrl(id, lang), { [lang]: tradeUrl(id, lang), [o]: activeRegions(id, o).length ? tradeUrl(id, o) : null }, 0.9))
      for (const r of activeRegions(id, lang)) {
        out.push(entry(regionUrl(id, r, lang), { [lang]: regionUrl(id, r, lang), [o]: isActive(id, r, o) ? regionUrl(id, r, o) : null }, 0.8))
        for (const c of publishableCommunes(id, r, lang)) {
          out.push(entry(communeUrl(id, c, lang), { [lang]: communeUrl(id, c, lang), [o]: isPublishable(id, c, o) ? communeUrl(id, c, o) : null }, 0.7))
        }
      }
    }
  }
  return out
}
