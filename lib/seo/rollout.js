// Progressive rollout of the local pages (batches of 50–100 URLs, then 2–4 weeks of
// indexing/ranking checks before the next wave). Pages outside the active waves are not
// generated at all (404), so they can't be indexed half-finished.
export const WAVES = [
  // Wave 1 — 69 pages: locksmith, Brussels (FR + NL) and Walloon Brabant.
  { wave: 1, trade: 'serrurier', region: 'bruxelles', lang: 'fr' },
  { wave: 1, trade: 'serrurier', region: 'bruxelles', lang: 'nl' },
  { wave: 1, trade: 'serrurier', region: 'brabant-wallon', lang: 'fr' },
  // Wave 2 — 69 pages: plumber, Brussels (FR + NL) and Walloon Brabant.
  { wave: 2, trade: 'plombier', region: 'bruxelles', lang: 'fr' },
  { wave: 2, trade: 'plombier', region: 'bruxelles', lang: 'nl' },
  { wave: 2, trade: 'plombier', region: 'brabant-wallon', lang: 'fr' },
  // Wave 3 — 69 pages: electrician, same zones.
  { wave: 3, trade: 'electricien', region: 'bruxelles', lang: 'fr' },
  { wave: 3, trade: 'electricien', region: 'bruxelles', lang: 'nl' },
  { wave: 3, trade: 'electricien', region: 'brabant-wallon', lang: 'fr' },
  // Wave 4 — 69 pages: heating, same zones.
  { wave: 4, trade: 'chauffagiste', region: 'bruxelles', lang: 'fr' },
  { wave: 4, trade: 'chauffagiste', region: 'bruxelles', lang: 'nl' },
  { wave: 4, trade: 'chauffagiste', region: 'brabant-wallon', lang: 'fr' },
  // Waves 5+ — Flemish Brabant (local copy per commune still to write; keep these waves
  // inactive until it exists, or the region hubs publish with no communes).
  { wave: 5, trade: 'serrurier', region: 'brabant-flamand', lang: 'nl' },
  { wave: 5, trade: 'serrurier', region: 'brabant-flamand', lang: 'fr' },
  { wave: 6, trade: 'plombier', region: 'brabant-flamand', lang: 'nl' },
  { wave: 6, trade: 'plombier', region: 'brabant-flamand', lang: 'fr' },
  { wave: 7, trade: 'electricien', region: 'brabant-flamand', lang: 'nl' },
  { wave: 7, trade: 'electricien', region: 'brabant-flamand', lang: 'fr' },
  { wave: 7, trade: 'chauffagiste', region: 'brabant-flamand', lang: 'nl' },
  { wave: 7, trade: 'chauffagiste', region: 'brabant-flamand', lang: 'fr' },
]

// Raise to publish the next wave.
export const ACTIVE_WAVE = Number(process.env.SEO_ACTIVE_WAVE || 1)

export function isActive(trade, region, lang) {
  return WAVES.some(w => w.wave <= ACTIVE_WAVE && w.trade === trade && w.region === region && w.lang === lang)
}

export function activeRegions(trade, lang) {
  return [...new Set(WAVES.filter(w => w.wave <= ACTIVE_WAVE && w.trade === trade && w.lang === lang).map(w => w.region))]
}

export function activeTrades(lang) {
  return [...new Set(WAVES.filter(w => w.wave <= ACTIVE_WAVE && w.lang === lang).map(w => w.trade))]
}
