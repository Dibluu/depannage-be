import { CATALOG, FEES } from '../../lib/pricing'

// Home page FAQ, shown by HomeClient and marked up as FAQPage by app/(fr)/page.js.
const claquee = CATALOG.Serrurerie.find(p => p.id === 'porte-claquee')

export const FAQS = [
  {
    q: 'Combien coûte un serrurier à Bruxelles ?',
    a: `Une ouverture de porte claquée coûte de ${claquee.min} € à ${claquee.max} €, déplacement et main-d’œuvre compris, TVA comprise. Chaque intervention a sa propre fourchette, affichée sur nos pages de prix et confirmée avant le déplacement de l’artisan.`,
  },
  {
    q: 'Intervenez-vous la nuit, le week-end et les jours fériés ?',
    a: `Oui, une demande urgente est possible à toute heure. Entre 20h et 8h, le week-end et les jours fériés, une majoration unique s’ajoute (${FEES.Serrurerie.surcharge} € pour un serrurier) : elle est affichée avant la réservation et ne se cumule jamais.`,
  },
  {
    q: 'Comment le prix est-il calculé ?',
    a: 'Notre tarif est basé sur le type d\'intervention et la durée estimée. Il vous est communiqué avant toute confirmation — vous n\'avez aucune mauvaise surprise à l\'arrivée de l\'artisan.',
  },
  {
    q: 'Que se passe-t-il si le problème est plus complexe ?',
    a: 'L\'artisan vous prévient sur place avant d\'aller plus loin. Vous restez décisionnaire à chaque étape. Pas de travaux supplémentaires sans votre accord explicite.',
  },
  {
    q: 'Quelles zones couvrez-vous ?',
    a: 'Dépannage.be intervient dans les 19 communes de Bruxelles, dans tout le Brabant wallon et dans tout le Brabant flamand. Indiquez votre code postal lors de la réservation : nous vous confirmons tout de suite si un artisan partenaire couvre votre adresse.',
  },
  {
    q: 'Puis-je annuler ma réservation ?',
    a: 'Oui, gratuitement jusqu\'à 2h avant l\'intervention. Au-delà, des frais d\'annulation peuvent s\'appliquer pour couvrir le déplacement de l\'artisan.',
  },
]
