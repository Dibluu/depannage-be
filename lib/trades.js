// Trades offered, with their FR/NL vocabulary. `key` matches lib/pricing.js and the booking flow.
export const TRADES = {
  serrurier: {
    id: 'serrurier',
    key: 'Serrurerie',
    slug: { fr: 'serrurier', nl: 'slotenmaker' },
    name: { fr: 'Serrurier', nl: 'Slotenmaker' },
    plural: { fr: 'serruriers', nl: 'slotenmakers' },
    activity: { fr: 'serrurerie', nl: 'slotenwerk' },
    article: { fr: 'un serrurier', nl: 'een slotenmaker' },
    pricePath: { fr: 'serrurier', nl: 'slotenmaker' },
  },
  plombier: {
    id: 'plombier',
    key: 'Plomberie',
    slug: { fr: 'plombier', nl: 'loodgieter' },
    name: { fr: 'Plombier', nl: 'Loodgieter' },
    plural: { fr: 'plombiers', nl: 'loodgieters' },
    activity: { fr: 'plomberie', nl: 'sanitair' },
    article: { fr: 'un plombier', nl: 'een loodgieter' },
    pricePath: { fr: 'plombier', nl: 'loodgieter' },
  },
  electricien: {
    id: 'electricien',
    key: 'Électricité',
    slug: { fr: 'electricien', nl: 'elektricien' },
    name: { fr: 'Électricien', nl: 'Elektricien' },
    plural: { fr: 'électriciens', nl: 'elektriciens' },
    activity: { fr: 'électricité', nl: 'elektriciteit' },
    article: { fr: 'un électricien', nl: 'een elektricien' },
    pricePath: { fr: 'electricien', nl: 'elektricien' },
  },
  chauffagiste: {
    id: 'chauffagiste',
    key: 'Chauffage',
    slug: { fr: 'chauffagiste', nl: 'chauffagist' },
    name: { fr: 'Chauffagiste', nl: 'Chauffagist' },
    plural: { fr: 'chauffagistes', nl: 'chauffagisten' },
    activity: { fr: 'chauffage', nl: 'verwarming' },
    article: { fr: 'un chauffagiste', nl: 'een chauffagist' },
    pricePath: { fr: 'chauffagiste', nl: 'chauffagist' },
  },
}

export const TRADE_IDS = Object.keys(TRADES)

export function tradeBySlug(slug, lang) {
  return Object.values(TRADES).find(t => t.slug[lang] === slug) || null
}

export function tradeByKey(key) {
  return Object.values(TRADES).find(t => t.key === key) || null
}
