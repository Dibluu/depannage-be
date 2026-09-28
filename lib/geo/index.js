import { COMMUNES } from './communes'
import { LOCAL_NOTES } from './local-notes'

// Regions we serve. `langs` = page languages generated for the region.
export const REGIONS = {
  bruxelles: {
    id: 'bruxelles',
    slug: { fr: 'bruxelles', nl: 'brussel' },
    name: { fr: 'Bruxelles', nl: 'Brussel' },
    full: { fr: 'Région de Bruxelles-Capitale', nl: 'Brussels Hoofdstedelijk Gewest' },
    in: { fr: 'à Bruxelles', nl: 'in Brussel' },
    langs: ['fr', 'nl'],
    water: { fr: 'Vivaqua', nl: 'Vivaqua' },
  },
  'brabant-wallon': {
    id: 'brabant-wallon',
    slug: { fr: 'brabant-wallon', nl: 'waals-brabant' },
    name: { fr: 'Brabant wallon', nl: 'Waals-Brabant' },
    full: { fr: 'Province du Brabant wallon', nl: 'Provincie Waals-Brabant' },
    in: { fr: 'en Brabant wallon', nl: 'in Waals-Brabant' },
    langs: ['fr'],
    water: { fr: 'inBW', nl: 'inBW' },
  },
  'brabant-flamand': {
    id: 'brabant-flamand',
    slug: { fr: 'brabant-flamand', nl: 'vlaams-brabant' },
    name: { fr: 'Brabant flamand', nl: 'Vlaams-Brabant' },
    full: { fr: 'Province du Brabant flamand', nl: 'Provincie Vlaams-Brabant' },
    in: { fr: 'en Brabant flamand', nl: 'in Vlaams-Brabant' },
    langs: ['fr', 'nl'],
    water: { fr: 'De Watergroep', nl: 'De Watergroep' },
  },
}

export const REGION_IDS = Object.keys(REGIONS)

export function regionBySlug(slug, lang) {
  return Object.values(REGIONS).find(r => r.slug[lang] === slug) || null
}

export function communeName(c, lang) {
  if (lang === 'nl') return c.nameNl || c.nameFr
  return c.nameFr
}

// In French, Flemish communes known under a French exonym show both names: « Louvain (Leuven) ».
export function communeLabel(c, lang) {
  const main = communeName(c, lang)
  const other = lang === 'nl' ? c.nameFr : c.nameNl
  if (other && other !== main && c.region !== 'bruxelles') return `${main} (${other})`
  return main
}

export function communeSlug(c, lang) {
  return lang === 'nl' ? c.slugNl : c.slugFr
}

export function communesOf(regionId) {
  return COMMUNES.filter(c => c.region === regionId)
}

// A commune page is only published once its hand-written local note exists in that language.
export function localNote(c, lang) {
  return LOCAL_NOTES[c.id]?.[lang] || null
}

export function communeBySlug(regionId, slug, lang) {
  return COMMUNES.find(c => c.region === regionId && communeSlug(c, lang) === slug) || null
}

export function communeByPostcode(postcode) {
  const pc = String(postcode || '').trim()
  if (!/^\d{4}$/.test(pc)) return null
  return COMMUNES.find(c => c.postcodes.includes(pc)) || null
}

function distanceKm(a, b) {
  const toRad = d => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 6371 * 2 * Math.asin(Math.sqrt(h))
}

// Nearest communes, any region (Brussels pages link across the regional border and vice versa).
export function neighbours(c, count = 5, filter = () => true) {
  return COMMUNES
    .filter(o => o.id !== c.id && filter(o))
    .map(o => ({ commune: o, km: distanceKm(c, o) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, count)
}

export { COMMUNES, distanceKm }
