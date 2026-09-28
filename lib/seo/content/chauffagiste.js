import { joinList, euro, de } from './shared'

export const chauffagiste = {
  fr: {
    title: x => `Chauffagiste ${x.name} (${x.pc}) : dépannage et entretien chaudière`,
    description: x => `Chauffagiste à ${x.name} ${x.pc} : entretien chaudière gaz dès ${euro(x.p('entretien-gaz').min)}, dépannage, remise en pression. Attestation incluse, prix annoncé à l’avance.`,
    h1: x => `Chauffagiste à ${x.label}`,
    lead: x => `Chaudière en sécurité, radiateurs froids, entretien à faire : un chauffagiste agréé intervient à ${x.name} (${x.pc}) avec un prix annoncé à l’avance.`,
    intros: [
      x => `À ${x.name}, les pannes de chauffage arrivent surtout aux premiers froids : chaudière en sécurité, pression trop basse, circulateur bloqué. Le chauffagiste remet l’installation en route et vous dit, prix à l’appui, si une pièce doit être remplacée. ${x.secText ? `Interventions dans toute la commune, y compris ${x.secText}.` : ''}`,
      x => `L’entretien périodique de votre chaudière à ${x.name} est une obligation régionale et une condition de garantie. Nos chauffagistes remettent l’attestation réglementaire à la fin de la visite. ${x.secText ? `Nous couvrons ${x.secText} et tout le ${x.pcLabel}.` : ''}`,
      x => `Dépannage, entretien gaz ou mazout, thermostat, désembouage : nos chauffagistes travaillent à ${x.name} ${x.pcLabel} avec des prix fixes par prestation.`,
    ],
    kindTitle: x => `Les interventions de chauffage courantes à ${x.name}`,
    kind: {
      urbain: [
        { t: 'Chaudière murale gaz', d: 'La plupart des appartements sont équipés d’une chaudière murale : entretien, remise en pression, remplacement de pièces.' },
        { t: 'Chauffage collectif', d: 'Radiateurs froids dans un immeuble : purge et équilibrage côté logement, en lien avec le syndic pour la chaufferie.' },
        { t: 'Thermostat connecté', d: 'Remplacement d’un thermostat ancien pour réguler pièce par pièce.' },
        { t: 'Évacuation des fumées', d: 'Contrôle de la ventouse ou du conduit, point important dans les immeubles.' },
      ],
      periurbain: [
        { t: 'Chaudière mazout ou gaz au sol', d: 'Entretien, analyse de combustion et réglage du brûleur.' },
        { t: 'Pompe à chaleur', d: 'Dépannage et entretien annuel des pompes à chaleur récentes.' },
        { t: 'Plancher chauffant', d: 'Recherche de fuite et désembouage des circuits.' },
        { t: 'Remplacement de chaudière', d: 'Devis pour une chaudière à condensation ou une solution hybride.' },
      ],
      rural: [
        { t: 'Chaudière mazout', d: 'Entretien annuel, gicleur et filtre, contrôle de la citerne.' },
        { t: 'Poêle à pellets', d: 'Entretien et dépannage des poêles et chaudières à pellets.' },
        { t: 'Remise en service', d: 'Remise en route d’une installation après une longue inoccupation.' },
        { t: 'Radiateurs d’annexes', d: 'Ajout ou déplacement de radiateurs sur un circuit existant.' },
      ],
    },
    region: {
      bruxelles: x => `À Bruxelles, l’entretien et le contrôle périodique des chaudières sont encadrés par la réglementation régionale (PEB Chauffage) ; le chauffagiste vous remet l’attestation correspondante.`,
      'brabant-wallon': x => `En Wallonie, l’entretien périodique des chaudières est obligatoire à une fréquence qui dépend du combustible ; le chauffagiste agréé vous remet l’attestation.`,
      'brabant-flamand': x => `En Flandre, l’entretien des chaudières est obligatoire à une fréquence qui dépend du combustible ; le chauffagiste agréé remet l’attestation d’entretien.`,
    },
    eta: x => `Délai visé à ${x.name} : ${x.eta} pour une panne totale en hiver, selon la disponibilité du chauffagiste le plus proche.`,
    zoneTitle: x => `Zone d’intervention autour ${de(x.name)}`,
    zone: x => `Nos chauffagistes couvrent ${x.name} (${x.pcList})${x.sections.length ? `, dont ${joinList(x.sections, 'fr')}` : ''}, et les communes voisines :`,
    faq: x => [
      { q: `Combien coûte l’entretien d’une chaudière à ${x.name} ?`, a: `Entre ${euro(x.p('entretien-gaz').min)} et ${euro(x.p('entretien-gaz').max)} TTC pour une chaudière gaz, entre ${euro(x.p('entretien-mazout').min)} et ${euro(x.p('entretien-mazout').max)} pour une chaudière mazout, attestation comprise.` },
      { q: 'Ma chaudière s’est mise en sécurité, que faire ?', a: 'Vérifiez la pression (en général entre 1 et 2 bars à froid) et tentez un seul réarmement. Si elle se remet en sécurité, n’insistez pas : appelez un chauffagiste.' },
      { q: 'Quelle TVA pour un remplacement de chaudière ?', a: 'Le taux de 6 % pour les logements de plus de 10 ans ne s’applique plus à toutes les installations de chauffage aux combustibles fossiles : le chauffagiste ventile le devis poste par poste avec le bon taux.' },
    ],
    tips: [
      'Purgez vos radiateurs en début de saison et contrôlez la pression ensuite.',
      'Gardez les attestations d’entretien : elles sont demandées en cas de sinistre ou de vente.',
      'Un détecteur de monoxyde de carbone près de la chaudière est une précaution simple.',
    ],
  },
  nl: {
    title: x => `Chauffagist ${x.name} (${x.pc}): ketelonderhoud en herstelling`,
    description: x => `Chauffagist in ${x.name} ${x.pc}: onderhoud gasketel vanaf ${euro(x.p('entretien-gaz').min)}, herstelling, druk herstellen. Attest inbegrepen, prijs vooraf gekend.`,
    h1: x => `Chauffagist in ${x.label}`,
    lead: x => `Ketel in storing, koude radiatoren, onderhoud nodig: een erkende chauffagist komt naar ${x.name} (${x.pc}) met een prijs die u vooraf kent.`,
    intros: [
      x => `In ${x.name} vallen verwarmingen vooral uit bij de eerste koude: ketel in veiligheid, te lage druk, vastgelopen pomp. De chauffagist zet de installatie weer aan en zegt u, met prijs, of er een onderdeel vervangen moet worden. ${x.secText ? `In de hele gemeente, ook in ${x.secText}.` : ''}`,
      x => `Het periodiek onderhoud van uw ketel in ${x.name} is een gewestelijke verplichting en een voorwaarde voor de garantie. Onze chauffagisten geven het reglementaire attest mee.`,
      x => `Herstelling, onderhoud gas of stookolie, thermostaat, ontslibben: onze chauffagisten werken in ${x.name} ${x.pcLabel} met vaste prijzen per interventie.`,
    ],
    kindTitle: x => `Veelvoorkomende verwarmingswerken in ${x.name}`,
    kind: {
      urbain: [
        { t: 'Gaswandketel', d: 'De meeste appartementen hebben een wandketel: onderhoud, druk herstellen, onderdelen vervangen.' },
        { t: 'Collectieve verwarming', d: 'Koude radiatoren in een gebouw: ontluchten en inregelen, in overleg met de syndicus.' },
        { t: 'Slimme thermostaat', d: 'Oude thermostaat vervangen om per kamer te regelen.' },
        { t: 'Rookgasafvoer', d: 'Controle van ventouse of schouw, belangrijk in appartementsgebouwen.' },
      ],
      periurbain: [
        { t: 'Stookolie- of gasketel', d: 'Onderhoud, verbrandingsanalyse en afstelling van de brander.' },
        { t: 'Warmtepomp', d: 'Herstelling en jaarlijks onderhoud van recente warmtepompen.' },
        { t: 'Vloerverwarming', d: 'Lekzoeken en ontslibben van de kringen.' },
        { t: 'Ketel vervangen', d: 'Offerte voor een condensatieketel of hybride oplossing.' },
      ],
      rural: [
        { t: 'Stookolieketel', d: 'Jaarlijks onderhoud, sproeier en filter, controle van de tank.' },
        { t: 'Pelletkachel', d: 'Onderhoud en herstelling van pelletkachels en -ketels.' },
        { t: 'Opnieuw in gebruik nemen', d: 'Installatie herstarten na lange leegstand.' },
        { t: 'Radiatoren in bijgebouwen', d: 'Radiatoren toevoegen of verplaatsen op een bestaande kring.' },
      ],
    },
    region: {
      bruxelles: x => `In Brussel zijn onderhoud en periodieke controle van ketels geregeld door de gewestelijke EPB-verwarmingsregels; de chauffagist geeft het bijhorende attest.`,
      'brabant-wallon': x => `In Wallonië is periodiek ketelonderhoud verplicht, met een frequentie die afhangt van de brandstof; de erkende chauffagist geeft het attest.`,
      'brabant-flamand': x => `In Vlaanderen is ketelonderhoud verplicht, met een frequentie die afhangt van de brandstof; de erkende chauffagist geeft het onderhoudsattest.`,
    },
    eta: x => `Streeftijd in ${x.name}: ${x.eta} bij volledige uitval in de winter, afhankelijk van de dichtstbijzijnde chauffagist.`,
    zoneTitle: x => `Werkgebied rond ${x.name}`,
    zone: x => `Onze chauffagisten werken in ${x.name} (${x.pcList})${x.sections.length ? `, waaronder ${joinList(x.sections, 'nl')}` : ''}, en in de buurgemeenten:`,
    faq: x => [
      { q: `Hoeveel kost ketelonderhoud in ${x.name}?`, a: `Tussen ${euro(x.p('entretien-gaz').min)} en ${euro(x.p('entretien-gaz').max)} incl. btw voor een gasketel, tussen ${euro(x.p('entretien-mazout').min)} en ${euro(x.p('entretien-mazout').max)} voor een stookolieketel, attest inbegrepen.` },
      { q: 'Mijn ketel staat in veiligheid, wat nu?', a: 'Controleer de druk (meestal tussen 1 en 2 bar koud) en probeer één keer te resetten. Valt hij opnieuw uit, bel dan een chauffagist.' },
      { q: 'Welke btw bij een nieuwe ketel?', a: 'Het tarief van 6 % voor woningen ouder dan 10 jaar geldt niet meer voor alle verwarmingsinstallaties op fossiele brandstof: de chauffagist splitst de offerte op met het juiste tarief.' },
    ],
    tips: [
      'Ontlucht uw radiatoren bij het begin van het stookseizoen en controleer daarna de druk.',
      'Bewaar de onderhoudsattesten: ze worden gevraagd bij schade of verkoop.',
      'Een CO-melder bij de ketel is een eenvoudige voorzorg.',
    ],
  },
}
