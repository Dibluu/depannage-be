// Progressive rollout of the local pages (batches of 50–100 URLs, then 2–4 weeks of
// indexing/ranking checks before the next wave). Pages outside the active waves are not
// generated at all (404), so they can't be indexed half-finished.
export const WAVES = [
  // Wave 1 — 69 pages: locksmith, Brussels (FR + NL) and Walloon Brabant.
  { wave: 1, trade: 'serrurier', region: 'bruxelles', lang: 'fr' },
  { wave: 1, trade: 'serrurier', region: 'bruxelles', lang: 'nl' },
  { wave: 1, trade: 'serrurier', region: 'brabant-wallon', lang: 'fr' },
  // Wave 1 (extension) — 207 pages: plumber, electrician and heating, same zones as the locksmith.
  { wave: 1, trade: 'plombier', region: 'bruxelles', lang: 'fr' },
  { wave: 1, trade: 'plombier', region: 'bruxelles', lang: 'nl' },
  { wave: 1, trade: 'plombier', region: 'brabant-wallon', lang: 'fr' },
  { wave: 1, trade: 'electricien', region: 'bruxelles', lang: 'fr' },
  { wave: 1, trade: 'electricien', region: 'bruxelles', lang: 'nl' },
  { wave: 1, trade: 'electricien', region: 'brabant-wallon', lang: 'fr' },
  { wave: 1, trade: 'chauffagiste', region: 'bruxelles', lang: 'fr' },
  { wave: 1, trade: 'chauffagiste', region: 'bruxelles', lang: 'nl' },
  { wave: 1, trade: 'chauffagiste', region: 'brabant-wallon', lang: 'fr' },
  // Wave 2 — Flemish Brabant, locksmith (NL first, FR for French speakers).
  { wave: 2, trade: 'serrurier', region: 'brabant-flamand', lang: 'nl' },
  { wave: 2, trade: 'serrurier', region: 'brabant-flamand', lang: 'fr' },
  // Wave 3 — Flemish Brabant, plumber.
  { wave: 3, trade: 'plombier', region: 'brabant-flamand', lang: 'nl' },
  { wave: 3, trade: 'plombier', region: 'brabant-flamand', lang: 'fr' },
  // Wave 4 — Flemish Brabant, electrician and heating.
  { wave: 4, trade: 'electricien', region: 'brabant-flamand', lang: 'nl' },
  { wave: 4, trade: 'electricien', region: 'brabant-flamand', lang: 'fr' },
  { wave: 4, trade: 'chauffagiste', region: 'brabant-flamand', lang: 'nl' },
  { wave: 4, trade: 'chauffagiste', region: 'brabant-flamand', lang: 'fr' },
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
