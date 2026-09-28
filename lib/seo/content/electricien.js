import { joinList, euro, de } from './shared'

export const electricien = {
  fr: {
    title: x => `Électricien ${x.name} (${x.pc}) : panne, tableau, conformité RGIE`,
    description: x => `Électricien à ${x.name} ${x.pc} : recherche de panne dès ${euro(x.p('panne').min)}, différentiel, tableau, mise en conformité RGIE. Prix annoncé avant le déplacement.`,
    h1: x => `Électricien à ${x.label}`,
    lead: x => `Plus de courant, différentiel qui saute, contrôle RGIE à passer : un électricien indépendant intervient à ${x.name} (${x.pc}) avec un prix annoncé à l’avance.`,
    intros: [
      x => `À ${x.name}, la plupart des appels concernent un différentiel qui déclenche sans raison apparente ou un circuit sans courant. L’électricien isole le circuit en défaut, remet l’installation en service et vous explique la cause. ${x.secText ? `Interventions dans toute la commune, y compris ${x.secText}.` : ''}`,
      x => `Vente ou location d’un logement à ${x.name} ? Le contrôle de l’installation électrique (RGIE) est obligatoire. Nos électriciens préparent l’installation, établissent le schéma unifilaire et lèvent les remarques du procès-verbal. ${x.secText ? `Nous couvrons ${x.secText} et tout le ${x.pcLabel}.` : ''}`,
      x => `Panne, remplacement de tableau, ajout de circuits, bornes de recharge : nos électriciens travaillent à ${x.name} ${x.pcLabel} avec des prix fixes par prestation, TVA comprise.`,
    ],
    kindTitle: x => `Les interventions électriques courantes à ${x.name}`,
    kind: {
      urbain: [
        { t: 'Tableau d’appartement ancien', d: 'Fusibles à broche ou tableau sans différentiel : remplacement par un tableau conforme.' },
        { t: 'Parlophone et vidéophone', d: 'Remplacement du combiné ou de la platine de rue, en lien avec le syndic pour les parties communes.' },
        { t: 'Contrôle avant location', d: 'Mise en conformité et schémas pour passer le contrôle sans remarque.' },
        { t: 'Prises et éclairage', d: 'Ajout de prises, remplacement d’interrupteurs, pose de luminaires.' },
      ],
      periurbain: [
        { t: 'Borne de recharge', d: 'Installation d’une borne pour véhicule électrique avec circuit dédié et différentiel adapté.' },
        { t: 'Éclairage extérieur et garage', d: 'Circuits extérieurs étanches, détecteurs de mouvement, prises de jardin.' },
        { t: 'Défaut de terre', d: 'Recherche et correction d’un défaut d’isolement qui fait déclencher le différentiel.' },
        { t: 'Photovoltaïque', d: 'Dépannage de l’onduleur et contrôle des protections.' },
      ],
      rural: [
        { t: 'Installation ancienne', d: 'Remplacement progressif des anciennes installations et mise à la terre.' },
        { t: 'Circuits d’annexes', d: 'Alimentation d’un atelier, d’une écurie ou d’un abri de jardin.' },
        { t: 'Panne après orage', d: 'Diagnostic des protections et des appareils touchés.' },
        { t: 'Chauffage électrique', d: 'Dépannage de convecteurs et d’accumulateurs.' },
      ],
    },
    region: {
      bruxelles: x => `À Bruxelles comme dans le reste du pays, le contrôle d’une installation domestique est réalisé par un organisme agréé ; notre électricien prépare l’installation et peut vous accompagner le jour du contrôle.`,
      'brabant-wallon': x => `En Brabant wallon, beaucoup de maisons combinent installation ancienne et extensions récentes : l’électricien vérifie que les nouveaux circuits sont bien protégés au tableau.`,
      'brabant-flamand': x => `En Brabant flamand, nos électriciens établissent les schémas en français ou en néerlandais selon la langue de l’organisme de contrôle.`,
    },
    eta: x => `Délai visé à ${x.name} : ${x.eta} pour une panne totale, selon la disponibilité de l’électricien le plus proche.`,
    zoneTitle: x => `Zone d’intervention autour ${de(x.name)}`,
    zone: x => `Nos électriciens couvrent ${x.name} (${x.pcList})${x.sections.length ? `, dont ${joinList(x.sections, 'fr')}` : ''}, et les communes voisines :`,
    faq: x => [
      { q: `Combien coûte un électricien à ${x.name} ?`, a: `Une recherche de panne coûte entre ${euro(x.p('panne').min)} et ${euro(x.p('panne').max)} TTC, le remplacement d’un différentiel entre ${euro(x.p('differentiel').min)} et ${euro(x.p('differentiel').max)}. La nuit, le week-end et les jours fériés, une majoration de ${euro(x.fees.surcharge)} s’applique une fois.` },
      { q: 'Mon différentiel saute sans arrêt, que faire ?', a: 'Débranchez tous les appareils, réarmez, puis rebranchez-les un par un. Si le différentiel saute encore sans appareil branché, le défaut est dans l’installation : appelez un électricien.' },
      { q: 'Le contrôle RGIE est-il obligatoire ?', a: 'Oui lors de la vente d’un logement et dans d’autres cas prévus par la réglementation. Un procès-verbal négatif laisse un délai pour lever les remarques ; notre électricien s’en charge.' },
      { q: 'Quelle TVA s’applique ?', a: '6 % pour un logement privé de plus de 10 ans, 21 % sinon. Les fourchettes affichées sont calculées à 6 %.' },
    ],
    tips: [
      'Gardez le schéma unifilaire près du tableau : il fait gagner du temps à l’électricien.',
      'Un différentiel se teste une fois par mois avec le bouton « T ».',
      'Une prise qui chauffe ou noircit doit être remplacée sans attendre.',
    ],
  },
  nl: {
    title: x => `Elektricien ${x.name} (${x.pc}): storing, zekeringkast, AREI-keuring`,
    description: x => `Elektricien in ${x.name} ${x.pc}: storing opsporen vanaf ${euro(x.p('panne').min)}, differentieel, zekeringkast, AREI-conformiteit. Prijs vooraf gekend.`,
    h1: x => `Elektricien in ${x.label}`,
    lead: x => `Geen stroom, differentieel dat afslaat, AREI-keuring op komst: een zelfstandige elektricien komt naar ${x.name} (${x.pc}) met een prijs die u vooraf kent.`,
    intros: [
      x => `In ${x.name} gaat het meestal om een differentieel dat zonder duidelijke reden afslaat of een kring zonder stroom. De elektricien isoleert de defecte kring, zet de installatie weer in werking en legt de oorzaak uit. ${x.secText ? `In de hele gemeente, ook in ${x.secText}.` : ''}`,
      x => `Verkoop of verhuur van een woning in ${x.name}? De keuring van de elektrische installatie (AREI) is verplicht. Onze elektriciens bereiden de installatie voor, maken het eendraadschema en werken de opmerkingen van het proces-verbaal weg.`,
      x => `Storing, nieuwe zekeringkast, extra kringen, laadpalen: onze elektriciens werken in ${x.name} ${x.pcLabel} met vaste prijzen per interventie, btw inbegrepen.`,
    ],
    kindTitle: x => `Veelvoorkomende elektriciteitswerken in ${x.name}`,
    kind: {
      urbain: [
        { t: 'Oude zekeringkast in een appartement', d: 'Stekzekeringen of kast zonder differentieel: vervanging door een conforme kast.' },
        { t: 'Parlofoon en videofoon', d: 'Vervanging van de binnenpost of het buitenpaneel, in overleg met de syndicus.' },
        { t: 'Keuring vóór verhuur', d: 'Conformiteit en schema’s om de keuring zonder opmerkingen te doorstaan.' },
        { t: 'Stopcontacten en verlichting', d: 'Extra stopcontacten, schakelaars vervangen, armaturen plaatsen.' },
      ],
      periurbain: [
        { t: 'Laadpaal', d: 'Laadpaal voor een elektrische wagen met eigen kring en aangepast differentieel.' },
        { t: 'Buitenverlichting en garage', d: 'Waterdichte buitenkringen, bewegingsmelders, tuinstopcontacten.' },
        { t: 'Aardingsfout', d: 'Isolatiefout opsporen en herstellen die het differentieel doet afslaan.' },
        { t: 'Zonnepanelen', d: 'Omvormer herstellen en beveiligingen controleren.' },
      ],
      rural: [
        { t: 'Oude installatie', d: 'Stapsgewijze vernieuwing van oude installaties en aarding.' },
        { t: 'Kringen voor bijgebouwen', d: 'Voeding van een werkplaats, stal of tuinhuis.' },
        { t: 'Storing na onweer', d: 'Diagnose van beveiligingen en getroffen toestellen.' },
        { t: 'Elektrische verwarming', d: 'Herstelling van convectoren en accumulatoren.' },
      ],
    },
    region: {
      bruxelles: x => `In Brussel, zoals in de rest van het land, gebeurt de keuring door een erkend organisme; onze elektricien bereidt de installatie voor en kan aanwezig zijn op de dag van de keuring.`,
      'brabant-wallon': x => `In Waals-Brabant combineren veel woningen een oude installatie met recente uitbreidingen: de elektricien controleert of de nieuwe kringen goed beveiligd zijn.`,
      'brabant-flamand': x => `In Vlaams-Brabant maken onze elektriciens de schema’s in het Nederlands of Frans, naargelang het keuringsorganisme.`,
    },
    eta: x => `Streeftijd in ${x.name}: ${x.eta} bij volledige stroomuitval, afhankelijk van de dichtstbijzijnde elektricien.`,
    zoneTitle: x => `Werkgebied rond ${x.name}`,
    zone: x => `Onze elektriciens werken in ${x.name} (${x.pcList})${x.sections.length ? `, waaronder ${joinList(x.sections, 'nl')}` : ''}, en in de buurgemeenten:`,
    faq: x => [
      { q: `Hoeveel kost een elektricien in ${x.name}?`, a: `Een storing opsporen kost tussen ${euro(x.p('panne').min)} en ${euro(x.p('panne').max)} incl. btw, een differentieel vervangen tussen ${euro(x.p('differentiel').min)} en ${euro(x.p('differentiel').max)}. 's Nachts, in het weekend en op feestdagen geldt één toeslag van ${euro(x.fees.surcharge)}.` },
      { q: 'Mijn differentieel slaat steeds af, wat nu?', a: 'Trek alle stekkers uit, schakel opnieuw in en sluit de toestellen één voor één weer aan. Slaat het differentieel af zonder toestellen, dan zit de fout in de installatie: bel een elektricien.' },
      { q: 'Is de AREI-keuring verplicht?', a: 'Ja bij de verkoop van een woning en in andere gevallen die de regelgeving voorziet. Na een negatief proces-verbaal krijgt u tijd om de opmerkingen weg te werken; onze elektricien doet dat.' },
      { q: 'Welke btw is van toepassing?', a: '6 % voor een privéwoning ouder dan 10 jaar, anders 21 %. De getoonde prijzen zijn berekend aan 6 %.' },
    ],
    tips: [
      'Bewaar het eendraadschema bij de zekeringkast: dat bespaart de elektricien tijd.',
      'Test het differentieel maandelijks met de « T »-knop.',
      'Een stopcontact dat warm wordt of zwart kleurt, moet meteen vervangen worden.',
    ],
  },
}
