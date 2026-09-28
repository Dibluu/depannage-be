import { PARTNERS } from './partners'
import { communesOf } from './geo'

// Locksmiths listed on /annuaire-serrurier. Deliberately no website, phone or street address:
// requests go through Dépannage.be. Reuses the partner record when the locksmith has one, so
// rating and zone stay in one place. Ratings: copy from Google Business Profile with the date.
const fromPartner = id => {
  const p = PARTNERS.find(x => x.id === id)
  return { id: p.id, name: p.name, base: p.base.fr, zone: p.zone.fr, communes: p.communes, rating: p.rating, about: p.about.fr }
}

export const DIRECTORY = [
  {
    id: 'smithlock',
    name: 'SmithLock',
    base: 'Berchem-Sainte-Agathe',
    since: 2000,
    zone: 'Les 19 communes de Bruxelles, au départ de Berchem-Sainte-Agathe.',
    communes: communesOf('bruxelles').map(c => c.id),
    rating: null,
    about: 'Serrurerie d’urgence 24h/24 : porte claquée ou fermée à clé, serrure bloquée, clés perdues, installation de serrures et cylindres de sécurité.',
  },
  fromPartner('kiverrou'),
  fromPartner('lockey'),
]
