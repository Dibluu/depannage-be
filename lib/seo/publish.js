import { communesOf, localNote } from '../geo'
import { LOCAL } from './content/local'
import { isActive } from './rollout'

// Trade-specific local paragraphs for a commune, or null.
export function tradeLocal(tradeId, commune, lang) {
  return LOCAL[tradeId]?.[commune.id]?.[lang] || null
}

// A commune page exists only when its wave is active AND both hand-written blocks exist
// (commune context + trade-specific local copy). Keeps thin pages out of the index.
export function isPublishable(tradeId, commune, lang) {
  return isActive(tradeId, commune.region, lang) && !!localNote(commune, lang) && !!tradeLocal(tradeId, commune, lang)
}

export function publishableCommunes(tradeId, regionId, lang) {
  return communesOf(regionId).filter(c => isPublishable(tradeId, c, lang))
}
