import { joinList, euro, de } from './shared'

export const plombier = {
  fr: {
    title: x => `Plombier ${x.name} (${x.pc}) : fuite, débouchage, prix annoncé`,
    description: x => `Plombier à ${x.name} ${x.pc} : débouchage WC dès ${euro(x.p('debouchage-wc').min)}, recherche de fuite, chauffe-eau. Prix fixe annoncé avant le déplacement, 24h/24.`,
    h1: x => `Plombier à ${x.label}`,
    lead: x => `Fuite, WC bouché, plus d’eau chaude : un plombier indépendant intervient à ${x.name} (${x.pc}) avec un prix annoncé avant son départ.`,
    intros: [
      x => `À ${x.name}, les urgences de plomberie sont surtout des évacuations bouchées et des fuites sous évier ou derrière le WC. Le plombier coupe l’eau, localise la fuite et répare ; si un remplacement est nécessaire, il vous donne le prix avant de continuer. ${x.secText ? `Interventions dans toute la commune, y compris ${x.secText}.` : ''}`,
      x => `Une fuite à ${x.name} ? Fermez le robinet d’arrivée générale, puis décrivez le problème en ligne : vous connaissez la fourchette de prix avant le déplacement du plombier. ${x.secText ? `Nous couvrons ${x.secText} et tout le ${x.pcLabel}.` : ''}`,
      x => `Débouchage, recherche de fuite non destructive, remplacement de chauffe-eau : nos plombiers travaillent à ${x.name} ${x.pcLabel} avec des prix fixes par prestation, TVA comprise. ${x.secText ? `Ils passent régulièrement à ${x.secText}.` : ''}`,
    ],
    kindTitle: x => `Les interventions de plomberie courantes à ${x.name}`,
    kind: {
      urbain: [
        { t: 'Colonne d’évacuation d’immeuble bouchée', d: 'Quand plusieurs appartements sont touchés, le débouchage se fait sur la colonne commune, en lien avec le syndic.' },
        { t: 'Fuite chez le voisin du dessous', d: 'Recherche de fuite non destructive pour trouver l’origine sans casser le carrelage, avec rapport pour l’assurance.' },
        { t: 'Anciennes conduites', d: 'Dans les immeubles anciens, raccords et vannes d’arrêt fatigués sont une cause fréquente de fuite.' },
        { t: 'Chauffe-eau d’appartement', d: 'Groupe de sécurité qui goutte, plus d’eau chaude : diagnostic, réparation ou remplacement.' },
      ],
      periurbain: [
        { t: 'Égout privatif et avaloir', d: 'Évacuation extérieure bouchée par des racines ou des dépôts : débouchage et inspection caméra.' },
        { t: 'Fuite enterrée ou sous chape', d: 'Compteur qui tourne alors que tout est fermé : recherche de fuite non destructive avant toute ouverture.' },
        { t: 'Chauffe-eau et adoucisseur', d: 'Détartrage ou remplacement du chauffe-eau, entretien de l’installation.' },
        { t: 'Robinetterie de cuisine et salle de bain', d: 'Remplacement de mitigeurs, flexibles et siphons.' },
      ],
      rural: [
        { t: 'Canalisation gelée', d: 'En hiver, les conduites des annexes et garages gèlent : dégel et protection.' },
        { t: 'Égout et fosse', d: 'Évacuations longues vers la voirie : débouchage haute pression et inspection caméra.' },
        { t: 'Fuite sur installation ancienne', d: 'Remplacement de sections de tuyauterie vieillissantes.' },
        { t: 'Pression d’eau faible', d: 'Contrôle et pose d’un réducteur ou d’un surpresseur selon le cas.' },
      ],
    },
    region: {
      bruxelles: x => `À Bruxelles, l’eau est distribuée par ${x.region.water.fr}. En cas de fuite avant votre compteur, contactez d’abord le distributeur ; après le compteur, c’est l’installation privée et notre plombier intervient.`,
      'brabant-wallon': x => `En Brabant wallon, l’eau est en grande partie distribuée par ${x.region.water.fr}. Une fuite côté rue, avant le compteur, relève du distributeur ; tout ce qui suit le compteur relève de votre installation.`,
      'brabant-flamand': x => `En Brabant flamand, le distributeur d’eau est souvent ${x.region.water.fr}. Avant le compteur, contactez-le ; après le compteur, notre plombier prend le relais.`,
    },
    eta: x => `Délai visé à ${x.name} : ${x.eta} pour une urgence, selon la disponibilité du plombier le plus proche. Le délai réel vous est annoncé avant le départ.`,
    zoneTitle: x => `Zone d’intervention autour ${de(x.name)}`,
    zone: x => `Nos plombiers couvrent ${x.name} (${x.pcList})${x.sections.length ? `, dont ${joinList(x.sections, 'fr')}` : ''}, ainsi que les communes voisines :`,
    faq: x => [
      { q: `Combien coûte un plombier à ${x.name} ?`, a: `Un débouchage de WC coûte entre ${euro(x.p('debouchage-wc').min)} et ${euro(x.p('debouchage-wc').max)} TTC, une réparation de fuite apparente entre ${euro(x.p('fuite-apparente').min)} et ${euro(x.p('fuite-apparente').max)}. La nuit, le week-end et les jours fériés, une majoration de ${euro(x.fees.surcharge)} s’applique une fois.` },
      { q: 'Que faire en attendant le plombier ?', a: 'Fermez le robinet d’arrivée générale (souvent près du compteur), coupez l’électricité si l’eau approche des prises et épongez pour limiter les dégâts.' },
      { q: 'La recherche de fuite abîme-t-elle les murs ?', a: 'Non, la recherche est non destructive (caméra thermique, gaz traceur, humidimètre). L’ouverture ne se fait qu’à l’endroit précis de la fuite, avec votre accord.' },
      { q: 'Quelle TVA s’applique ?', a: '6 % pour un logement privé de plus de 10 ans, 21 % sinon. Les fourchettes affichées sont calculées à 6 %.' },
    ],
    tips: [
      'Repérez dès aujourd’hui votre robinet d’arrivée générale : en cas de fuite, c’est le premier geste.',
      'Évitez les déboucheurs chimiques répétés : ils abîment les joints et les conduites anciennes.',
      'Un compteur qui tourne robinets fermés signale une fuite cachée : relevez-le avant et après une nuit.',
    ],
  },
  nl: {
    title: x => `Loodgieter ${x.name} (${x.pc}): lek, ontstopping, vaste prijs`,
    description: x => `Loodgieter in ${x.name} ${x.pc}: wc ontstoppen vanaf ${euro(x.p('debouchage-wc').min)}, lekdetectie, boiler. Prijs vooraf gekend, 24/7.`,
    h1: x => `Loodgieter in ${x.label}`,
    lead: x => `Lek, verstopt toilet, geen warm water: een zelfstandige loodgieter komt naar ${x.name} (${x.pc}) met een prijs die u vóór vertrek kent.`,
    intros: [
      x => `In ${x.name} gaat het bij dringende sanitaire problemen vooral om verstoppingen en lekken onder de gootsteen of achter het toilet. De loodgieter sluit het water af, zoekt het lek en herstelt; moet er iets vervangen worden, dan kent u eerst de prijs. ${x.secText ? `In de hele gemeente, ook in ${x.secText}.` : ''}`,
      x => `Een lek in ${x.name}? Draai de hoofdkraan dicht en beschrijf het probleem online: u kent de prijsvork vóór de loodgieter vertrekt. ${x.secText ? `We werken in ${x.secText} en heel ${x.pcLabel}.` : ''}`,
      x => `Ontstoppen, niet-destructief lekzoeken, boiler vervangen: onze loodgieters werken in ${x.name} ${x.pcLabel} met vaste prijzen per interventie, btw inbegrepen.`,
    ],
    kindTitle: x => `Veelvoorkomende sanitaire interventies in ${x.name}`,
    kind: {
      urbain: [
        { t: 'Verstopte afvoerkolom', d: 'Als meerdere appartementen getroffen zijn, wordt de gemeenschappelijke kolom ontstopt, in overleg met de syndicus.' },
        { t: 'Lek bij de onderburen', d: 'Niet-destructief lekzoeken om de oorzaak te vinden zonder tegels te breken, met verslag voor de verzekering.' },
        { t: 'Oude leidingen', d: 'In oudere gebouwen zijn versleten koppelingen en afsluitkranen een vaak voorkomende oorzaak van lekken.' },
        { t: 'Boiler in een appartement', d: 'Druppelende veiligheidsgroep of geen warm water: diagnose, herstelling of vervanging.' },
      ],
      periurbain: [
        { t: 'Privé-riolering en putjes', d: 'Buitenafvoer verstopt door wortels of afzetting: ontstoppen en camera-inspectie.' },
        { t: 'Lek onder de chape', d: 'Meter draait terwijl alles dicht is: niet-destructief lekzoeken vóór er iets opengebroken wordt.' },
        { t: 'Boiler en waterontharder', d: 'Ontkalken of vervangen van de boiler, onderhoud van de installatie.' },
        { t: 'Kranen in keuken en badkamer', d: 'Vervangen van mengkranen, flexibels en sifons.' },
      ],
      rural: [
        { t: 'Bevroren leiding', d: 'In de winter bevriezen leidingen in bijgebouwen en garages: ontdooien en beschermen.' },
        { t: 'Riolering en put', d: 'Lange afvoeren naar de straat: hogedrukreiniging en camera-inspectie.' },
        { t: 'Lek in een oude installatie', d: 'Verouderde leidingstukken vervangen.' },
        { t: 'Lage waterdruk', d: 'Controle en plaatsing van een drukregelaar of drukverhoger.' },
      ],
    },
    region: {
      bruxelles: x => `In Brussel levert ${x.region.water.nl} het water. Bij een lek vóór de meter contacteert u eerst de maatschappij; na de meter is het uw privé-installatie en komt onze loodgieter.`,
      'brabant-wallon': x => `In Waals-Brabant levert vooral ${x.region.water.nl} het water. Vóór de meter is dat hun zaak, na de meter uw installatie.`,
      'brabant-flamand': x => `In Vlaams-Brabant is de watermaatschappij vaak ${x.region.water.nl}. Vóór de meter contacteert u hen; na de meter neemt onze loodgieter het over.`,
    },
    eta: x => `Streeftijd in ${x.name}: ${x.eta} bij een dringend probleem, afhankelijk van de dichtstbijzijnde loodgieter.`,
    zoneTitle: x => `Werkgebied rond ${x.name}`,
    zone: x => `Onze loodgieters werken in ${x.name} (${x.pcList})${x.sections.length ? `, waaronder ${joinList(x.sections, 'nl')}` : ''}, en in de buurgemeenten:`,
    faq: x => [
      { q: `Hoeveel kost een loodgieter in ${x.name}?`, a: `Een wc ontstoppen kost tussen ${euro(x.p('debouchage-wc').min)} en ${euro(x.p('debouchage-wc').max)} incl. btw, een zichtbaar lek herstellen tussen ${euro(x.p('fuite-apparente').min)} en ${euro(x.p('fuite-apparente').max)}. 's Nachts, in het weekend en op feestdagen geldt één toeslag van ${euro(x.fees.surcharge)}.` },
      { q: 'Wat doe ik in afwachting van de loodgieter?', a: 'Draai de hoofdkraan dicht (vaak bij de meter), schakel de stroom uit als het water bij stopcontacten komt en dweil om de schade te beperken.' },
      { q: 'Beschadigt lekzoeken de muren?', a: 'Nee, het lekzoeken is niet-destructief (thermische camera, tracergas, vochtmeter). Er wordt alleen op de juiste plek geopend, met uw akkoord.' },
      { q: 'Welke btw is van toepassing?', a: '6 % voor een privéwoning ouder dan 10 jaar, anders 21 %. De getoonde prijzen zijn berekend aan 6 %.' },
    ],
    tips: [
      'Zoek vandaag al uw hoofdkraan op: bij een lek is dat de eerste stap.',
      'Vermijd herhaaldelijk chemische ontstoppers: ze tasten dichtingen en oude leidingen aan.',
      'Draait de meter terwijl alle kranen dicht zijn? Dan is er een verborgen lek.',
    ],
  },
}
