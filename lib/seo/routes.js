import { TRADES } from '../trades'
import { REGIONS, communeSlug } from '../geo'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.xn--dpannage-b1a.be').replace(/\/$/, '')

const prefix = lang => (lang === 'nl' ? '/nl' : '')

export function tradeUrl(tradeId, lang) {
  return `${prefix(lang)}/${TRADES[tradeId].slug[lang]}`
}

export function regionUrl(tradeId, regionId, lang) {
  return `${tradeUrl(tradeId, lang)}/${REGIONS[regionId].slug[lang]}`
}

export function communeUrl(tradeId, commune, lang) {
  return `${regionUrl(tradeId, commune.region, lang)}/${communeSlug(commune, lang)}`
}

export function pricesUrl(lang, tradeId) {
  const base = lang === 'nl' ? '/nl/prijzen' : '/prix'
  return tradeId ? `${base}/${TRADES[tradeId].pricePath[lang]}` : base
}

export function bookingUrl(lang, params = {}) {
  const qs = new URLSearchParams(Object.entries(params).filter(([, v]) => v)).toString()
  return `${lang === 'nl' ? '/nl/reserveren' : '/booking'}${qs ? `?${qs}` : ''}`
}

export const homeUrl = lang => (lang === 'nl' ? '/nl' : '/')

export const absolute = path => `${SITE_URL}${path}`

// Locksmith directory page (FR only, deliberately not linked from the home page or navigation).
export const ANNUAIRE_PATH = '/annuaire-serrurier'
