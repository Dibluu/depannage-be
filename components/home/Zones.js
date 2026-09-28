import Link from 'next/link'
import { TRADES } from '../../lib/trades'
import { REGIONS, COMMUNES } from '../../lib/geo'
import { isPublishable } from '../../lib/seo/publish'
import { activeTrades, activeRegions, isActive } from '../../lib/seo/rollout'
import { regionUrl, communeUrl, pricesUrl, tradeUrl } from '../../lib/seo/routes'

// Communes with the most local searches (DataForSEO, Brussels, 2026-09) are linked first.
const POPULAR = ['schaerbeek', 'uccle', 'ixelles', 'evere', 'anderlecht', 'jette', 'molenbeek-saint-jean', 'woluwe-saint-lambert', 'waterloo', 'wavre', 'louvain', 'zaventem']

export default function Zones({ lang = 'fr' }) {
  const trades = activeTrades(lang)
  if (!trades.length) return null
  const nl = lang === 'nl'
  return (
    <section className="section" id="zones">
      <div className="container">
        <h2 className="section-title">{nl ? 'Waar we tussenkomen' : 'Où intervenons-nous ?'}</h2>
        <p className="section-sub">{nl ? 'Kies uw vakgebied en uw gemeente.' : 'Choisissez votre métier et votre commune.'}</p>
        <div style={{ display: 'grid', gap: 24, maxWidth: 880, margin: '0 auto' }}>
          {trades.map(id => {
            const trade = TRADES[id]
            const popular = POPULAR
              .map(slug => COMMUNES.find(c => c.id === slug))
              .filter(c => c && isPublishable(id, c, lang))
            return (
              <div key={id}>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>
                  <Link href={tradeUrl(id, lang)}>{trade.name[lang]}</Link>
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {activeRegions(id, lang).map(r => (
                    <Link key={r} href={regionUrl(id, r, lang)} className="rounded-lg bg-orange px-3 py-2 text-sm font-semibold text-white">
                      {trade.name[lang]} {REGIONS[r].in[lang]}
                    </Link>
                  ))}
                  {popular.map(c => (
                    <Link key={c.id} href={communeUrl(id, c, lang)} className="rounded-lg border border-black/10 px-3 py-2 text-sm font-medium">
                      {trade.name[lang]} {nl ? c.nameNl || c.nameFr : c.nameFr}
                    </Link>
                  ))}
                  <Link href={pricesUrl(lang, id)} className="rounded-lg border border-black/10 px-3 py-2 text-sm font-medium">
                    {nl ? 'Prijzen' : 'Prix'} {trade.name[lang].toLowerCase()}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
