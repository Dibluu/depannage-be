import { SITE_URL, absolute } from './routes'
import { BRAND, PHONE, EMAIL, LEGAL } from '../site'
import { REGIONS } from '../geo'

export const ORG_ID = `${SITE_URL}/#organization`

export function organization() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: BRAND,
    url: `${SITE_URL}/`,
    description: 'Plateforme belge de dépannage à domicile : prix annoncé avant le déplacement, artisans indépendants vérifiés.',
    areaServed: Object.values(REGIONS).map(r => ({ '@type': 'AdministrativeArea', name: r.full.fr })),
    address: { '@type': 'PostalAddress', streetAddress: LEGAL.street, postalCode: LEGAL.postcode, addressLocality: LEGAL.city.fr, addressCountry: 'BE' },
    vatID: LEGAL.vat,
    founder: { '@type': 'Person', name: LEGAL.owner },
    ...(EMAIL ? { email: EMAIL } : {}),
    ...(PHONE ? { telephone: PHONE, contactPoint: { '@type': 'ContactPoint', telephone: PHONE, contactType: 'customer service', availableLanguage: ['fr', 'nl'], hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' } } } : {}),
  }
}

export function website() {
  return { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: BRAND, publisher: { '@id': ORG_ID }, inLanguage: ['fr-BE', 'nl-BE'] }
}

export function breadcrumb(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: absolute(it.path) })),
  }
}

export function service({ name, serviceType, path, lang, areaServed, prices }) {
  const low = Math.min(...prices.map(p => p.min))
  const high = Math.max(...prices.map(p => p.max))
  return {
    '@type': 'Service',
    '@id': `${absolute(path)}#service`,
    name,
    serviceType,
    url: absolute(path),
    inLanguage: lang === 'nl' ? 'nl-BE' : 'fr-BE',
    provider: { '@id': ORG_ID },
    areaServed,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: low,
      highPrice: high,
      offerCount: prices.length,
      offers: prices.map(p => ({
        '@type': 'Offer',
        name: lang === 'nl' ? p.nl : p.fr,
        priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'EUR', minPrice: p.min, maxPrice: p.max, valueAddedTaxIncluded: true },
      })),
    },
  }
}

export function city(c, name) {
  return { '@type': 'City', name, address: { '@type': 'PostalAddress', postalCode: c.postcodes[0], addressLocality: name, addressCountry: 'BE' } }
}

export function faqPage(faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
}

export function jsonLd(...nodes) {
  return { '@context': 'https://schema.org', '@graph': nodes }
}
