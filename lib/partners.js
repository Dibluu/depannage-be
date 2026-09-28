// Partner artisans shown on /partenaires. Ratings are copied from their Google Business Profile
// with the date they were read — update both together, never the rating alone.
export const PARTNERS = [
  {
    id: 'lockey',
    trade: 'serrurier',
    name: 'Serrurerie LocKey',
    url: 'https://serrurerielockey.be/',
    base: { fr: 'Wemmel', nl: 'Wemmel' },
    zone: {
      fr: 'Nord-ouest de Bruxelles : Jette, Ganshoren, Koekelberg, Laeken, Berchem-Sainte-Agathe, Molenbeek, et Wemmel.',
      nl: 'Noordwest-Brussel: Jette, Ganshoren, Koekelberg, Laken, Sint-Agatha-Berchem, Molenbeek, en Wemmel.',
    },
    communes: ['jette', 'ganshoren', 'koekelberg', 'laeken', 'berchem-sainte-agathe', 'molenbeek-saint-jean'],
    rating: { value: '4,9', count: 47, readOn: '2026-09-28' },
    about: {
      fr: 'Serrurerie d’urgence 24h/24 : ouverture de porte, remplacement de cylindre, mise en sécurité après effraction, clés de voiture.',
      nl: 'Dringend slotenwerk 24/7: deur openen, cilinder vervangen, beveiliging na inbraak, autosleutels.',
    },
  },
  {
    id: 'kiverrou',
    trade: 'serrurier',
    name: 'Serrurier Kiverrou',
    url: 'https://kiverrou.be/',
    base: { fr: 'Bruxelles et Brabant', nl: 'Brussel en Brabant' },
    zone: {
      fr: 'Sud et est de Bruxelles (Ixelles, Uccle, Etterbeek, Auderghem) et Brabant wallon (Wavre, Waterloo, Rixensart, La Hulpe).',
      nl: 'Zuid- en Oost-Brussel (Elsene, Ukkel, Etterbeek, Oudergem) en Waals-Brabant (Waver, Waterloo, Rixensart, Terhulpen).',
    },
    communes: ['ixelles', 'uccle', 'etterbeek', 'auderghem', 'wavre', 'waterloo', 'rixensart', 'la-hulpe'],
    rating: { value: '4,9', count: 206, readOn: '2026-09-28' },
    about: {
      fr: 'Serrurerie résidentielle et commerciale : ouvertures, cylindres de sécurité, serrures multipoints, coffres-forts.',
      nl: 'Slotenwerk voor woningen en handelszaken: openingen, veiligheidscilinders, meerpuntssloten, kluizen.',
    },
  },
]
