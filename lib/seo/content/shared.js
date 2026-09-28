// Helpers shared by the content banks.

// Deterministic pick so a page always renders the same variant (stable for Google, varied across pages).
export function hash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function pick(list, seed, offset = 0) {
  return list[(hash(seed) + offset) % list.length]
}

// Pick n distinct items.
export function pickMany(list, seed, n) {
  const start = hash(seed) % list.length
  const out = []
  for (let i = 0; i < Math.min(n, list.length); i++) out.push(list[(start + i) % list.length])
  return out
}

export function joinList(items, lang) {
  const and = lang === 'nl' ? 'en' : 'et'
  if (items.length <= 1) return items[0] || ''
  return `${items.slice(0, -1).join(', ')} ${and} ${items[items.length - 1]}`
}

// Travel-time target shown on pages. Stated as a target, not a guarantee — adjust to the real network.
export const ETA = {
  urbain: { fr: '30 à 60 minutes', nl: '30 tot 60 minuten' },
  periurbain: { fr: '45 à 75 minutes', nl: '45 tot 75 minuten' },
  rural: { fr: '60 à 90 minutes', nl: '60 tot 90 minuten' },
}

// French elision: « de Ixelles » → « d’Ixelles ».
export const de = name => (/^[aeiouyàâéèêîôûAEIOUYÀÂÉÈÊÎÔÛ]/.test(name) ? `d’${name}` : `de ${name}`)

export const euro = n => `${n.toLocaleString('fr-BE')} €`
