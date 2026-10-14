import Link from 'next/link'
import { TRADES } from '../../lib/trades'
import { prestation, tradeRange } from '../../lib/pricing'
import { activeTrades } from '../../lib/seo/rollout'
import { tradeUrl, pricesUrl } from '../../lib/seo/routes'

// Home page: one block per trade with real catalogue prices and a link to its local page (once its
// rollout wave is live) or to its price page. Server-rendered so the text is in the HTML.
const BLOCKS = {
  serrurier: {
    title: 'Serrurier à Bruxelles et dans le Brabant',
    text: 'Porte claquée, clés perdues, clé cassée dans la serrure ou porte fracturée après un cambriolage : le serrurier ouvre sans abîmer quand c’est possible, remplace le cylindre si nécessaire et remet votre porte en sécurité le jour même.',
    jobs: ['porte-claquee', 'cylindre', 'effraction'],
  },
  plombier: {
    title: 'Plombier à Bruxelles et dans le Brabant',
    text: 'WC ou évier bouché, fuite d’eau, chasse qui coule, chauffe-eau en panne : le plombier débouche, répare la fuite et remplace l’équipement défectueux, avec le prix annoncé avant de se déplacer.',
    jobs: ['debouchage-wc', 'fuite-apparente', 'chauffe-eau'],
  },
  electricien: {
    title: 'Électricien à Bruxelles et dans le Brabant',
    text: 'Plus de courant, différentiel qui saute, prise qui chauffe ou installation à mettre en conformité avant un contrôle RGIE : l’électricien trouve la panne, remplace le matériel en cause et sécurise le tableau.',
    jobs: ['panne', 'differentiel', 'conformite'],
  },
  chauffagiste: {
    title: 'Chauffagiste à Bruxelles et dans le Brabant',
    text: 'Chaudière en panne, plus d’eau chaude, pression qui chute ou entretien annuel obligatoire : le chauffagiste remet votre chauffage en route et vous remet l’attestation d’entretien.',
    jobs: ['panne-chaudiere', 'entretien-gaz', 'pression'],
  },
}

const euro = n => `${n} €`

export default function Trades() {
  const live = activeTrades('fr')
  return (
    <section id="services" className="section">
      <div className="container">
        <h2 className="section-title">Nos métiers à Bruxelles et dans le Brabant</h2>
        <p className="section-sub">Une fourchette de prix par intervention, annoncée avant le déplacement.</p>
        <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', maxWidth: 880, margin: '0 auto 32px' }}>
          {Object.values(TRADES).map(trade => {
            const block = BLOCKS[trade.id]
            const range = tradeRange(trade.key)
            const href = live.includes(trade.id) ? tradeUrl(trade.id, 'fr') : pricesUrl('fr', trade.id)
            return (
              <article key={trade.id} className="service-card" style={{ cursor: 'default' }}>
                <h3 className="service-name" style={{ fontSize: 18 }}><Link href={href}>{block.title}</Link></h3>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: 'rgba(26,26,46,0.75)' }}>{block.text}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14, display: 'grid', gap: 6 }}>
                  {block.jobs.map(id => prestation(trade.key, id)).filter(Boolean).map(p => (
                    <li key={p.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                      <span>{p.fr}</span><b style={{ whiteSpace: 'nowrap' }}>{euro(p.min)} – {euro(p.max)}</b>
                    </li>
                  ))}
                </ul>
                <div className="service-price" style={{ fontSize: 14 }}>De {euro(range.low)} à {euro(range.high)} selon l’intervention</div>
                <Link href={href} className="service-link">Tous les prix d’un {trade.name.fr.toLowerCase()} →</Link>
              </article>
            )
          })}
        </div>
        <Link href="/booking" className="btn btn-primary" style={{ maxWidth: 400, margin: '0 auto', display: 'flex' }}>
          Voir mon prix et réserver →
        </Link>
      </div>
    </section>
  )
}
