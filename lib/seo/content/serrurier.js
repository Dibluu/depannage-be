import { joinList, euro, de } from './shared'

// Content bank for locksmith pages. Every function receives the page context (see lib/seo/page-context.js).
export const serrurier = {
  fr: {
    title: x => (x.name.length > 16 ? `Serrurier ${x.name} (${x.pc}) : prix annoncé` : `Serrurier ${x.name} (${x.pc}) : ouverture de porte, prix annoncé`),
    description: x => `Serrurier à ${x.name} ${x.pc} : porte claquée dès ${euro(x.p('porte-claquee').min)}, cylindre, effraction. Prix annoncé avant le déplacement, 24h/24.`,
    h1: x => `Serrurier à ${x.label}`,
    lead: x => `Porte claquée, clés perdues, serrure forcée : un serrurier indépendant intervient à ${x.name} (${x.pc}) avec une fourchette de prix annoncée avant son départ.`,
    intros: [
      x => `À ${x.name}, la majorité des appels concernent une porte claquée avec les clés à l’intérieur ou un cylindre qui ne tourne plus. Notre serrurier commence par une ouverture fine, sans perçage quand la serrure le permet, et ne remplace le cylindre que si c’est nécessaire. ${x.secText ? `Nous intervenons dans toute la commune, y compris ${x.secText}.` : ''}`,
      x => `Vous êtes bloqué dehors à ${x.name} ? Décrivez la situation en ligne ou par téléphone : vous recevez la fourchette de prix avant que le serrurier ne se déplace, et vous ne payez qu’une fois la porte ouverte. ${x.secText ? `Le service couvre ${x.secText} et le reste du ${x.pcLabel}.` : ''}`,
      x => `Un serrurier à ${x.name} doit surtout être joignable vite et clair sur le prix. C’est ce que nous organisons : un artisan de la zone, un prix annoncé par prestation (ouverture, cylindre, serrure), et une facture détaillée à la fin. ${x.secText ? `Interventions fréquentes à ${x.secText}.` : ''}`,
      x => `Ouverture de porte, remplacement de cylindre après une perte de clés, mise en sécurité après effraction : nos serruriers couvrent ${x.name} ${x.pcLabel} tous les jours, de jour comme de nuit. ${x.secText ? `Ils passent régulièrement à ${x.secText}.` : ''}`,
    ],
    kindTitle: x => `Les dépannages les plus fréquents à ${x.name}`,
    kind: {
      urbain: [
        { t: 'Porte palière d’appartement claquée', d: 'Dans les immeubles, la porte d’appartement se referme seule. Ouverture à la radio ou au crochet, sans abîmer le cylindre dans la plupart des cas.' },
        { t: 'Porte d’immeuble et parlophone', d: 'Serrure de porte commune grippée, gâche électrique qui ne libère plus : réparation ou remplacement, en accord avec le syndic si besoin.' },
        { t: 'Cylindre remplacé après un déménagement', d: 'À l’entrée dans un nouveau logement, changer le cylindre évite que d’anciens occupants gardent une clé. Nouveau jeu de clés remis sur place.' },
        { t: 'Mise en sécurité après tentative d’effraction', d: 'Cylindre arraché ou porte forcée : fermeture provisoire le jour même, puis remplacement définitif sur devis.' },
      ],
      periurbain: [
        { t: 'Porte d’entrée de maison fermée à clé', d: 'Clés perdues ou restées à l’intérieur : ouverture de la porte principale ou de la porte arrière, avec ou sans remplacement du cylindre.' },
        { t: 'Porte de garage et portail', d: 'Serrure de porte de garage bloquée, portail qui ne ferme plus : déblocage ou remplacement de la serrure.' },
        { t: 'Serrure multipoints à régler', d: 'Sur les portes de maison récentes, une serrure multipoints qui force se règle souvent sans la remplacer.' },
        { t: 'Sécurisation après effraction', d: 'Porte-fenêtre ou porte arrière forcée : mise en sécurité immédiate et rapport pour votre assurance.' },
      ],
      rural: [
        { t: 'Porte arrière ou d’annexe bloquée', d: 'Portes de dépendance, de cave ou d’atelier : ouverture et remplacement de serrures anciennes.' },
        { t: 'Portail et porte de garage', d: 'Serrures extérieures exposées aux intempéries qui grippent : dégrippage ou remplacement.' },
        { t: 'Clés perdues pour une maison isolée', d: 'Ouverture puis changement de cylindre pour ne pas laisser une clé dans la nature.' },
        { t: 'Renforcement d’une porte d’entrée', d: 'Pose d’un verrou de sûreté ou d’une serrure multipoints pour une maison 4 façades.' },
      ],
    },
    region: {
      bruxelles: x => `À Bruxelles, beaucoup de portes d’entrée sont celles d’immeubles à appartements ou de maisons de maître divisées en logements. Le serrurier vérifie avec vous qui prend en charge l’intervention (locataire, propriétaire ou syndic) avant de commencer, et remet une facture à votre nom.`,
      'brabant-wallon': x => `En Brabant wallon, la plupart des interventions se font sur des maisons avec plusieurs accès (porte avant, porte de garage, porte-fenêtre). Le serrurier contrôle l’ensemble des accès quand il remplace un cylindre après une perte de clés.`,
      'brabant-flamand': x => `En Brabant flamand, nos serruriers interviennent en français ou en néerlandais. ${x.facilites ? `${x.name} étant une commune à facilités, vous pouvez demander une facture en français.` : 'La facture peut être établie dans la langue de votre choix.'}`,
    },
    eta: x => `Délai visé à ${x.name} : ${x.eta} après la confirmation, selon la disponibilité du serrurier le plus proche. Le délai réel vous est annoncé au téléphone avant le départ.`,
    zoneTitle: x => `Zone d’intervention autour ${de(x.name)}`,
    zone: x => `Nos serruriers couvrent ${x.name} (${x.pcList})${x.sections.length ? `, dont ${joinList(x.sections, 'fr')}` : ''}. Ils interviennent aussi dans les communes voisines :`,
    faq: x => [
      { q: `Combien coûte un serrurier à ${x.name} ?`, a: `Une ouverture de porte claquée coûte entre ${euro(x.p('porte-claquee').min)} et ${euro(x.p('porte-claquee').max)} TTC, une porte fermée à clé entre ${euro(x.p('porte-verrouillee').min)} et ${euro(x.p('porte-verrouillee').max)}. Le déplacement est inclus. Entre 20h et 8h, le week-end et les jours fériés, une majoration de ${euro(x.fees.surcharge)} s’applique une seule fois.` },
      { q: `Le serrurier peut-il ouvrir sans casser la serrure ?`, a: `Sur une porte simplement claquée, oui dans la grande majorité des cas. Sur une porte fermée à clé ou équipée d’un cylindre de sécurité, le serrurier vous dit avant de commencer s’il doit remplacer le cylindre et combien cela coûte.` },
      { q: `Faut-il prouver que j’habite à ${x.name} ?`, a: `Oui. Avant ou juste après l’ouverture, le serrurier demande une pièce d’identité et un document à l’adresse (bail, facture, courrier). C’est une protection pour vous comme pour lui.` },
      { q: `Après une effraction, que faut-il faire pour l’assurance ?`, a: `Déclarez l’effraction à la police${x.police ? ` (à ${x.name}, la ${x.police})` : ''} : votre assureur demandera généralement le numéro de procès-verbal. Le serrurier met la porte en sécurité et vous remet un rapport d’intervention et une facture détaillée à joindre à votre déclaration.` },
      { q: `Quelle TVA s’applique ?`, a: `6 % pour un logement privé de plus de 10 ans, 21 % pour un logement plus récent ou un local professionnel. Les fourchettes affichées sont calculées à 6 %.` },
      ...(x.sections.length ? [{ q: `Intervenez-vous à ${x.sections[0]}${x.sections[1] ? ` et à ${x.sections[1]}` : ''} ?`, a: `Oui, ${x.sections[0]}${x.sections[1] ? ` et ${x.sections[1]}` : ''} font partie de notre zone à ${x.name} (${x.pcList}). Le prix est le même partout dans la commune.` }] : []),
    ],
    tips: [
      'Si la porte est seulement claquée, ne forcez pas la poignée et ne tentez pas de glisser une carte : vous risquez d’abîmer le pêne et de rendre l’ouverture plus chère.',
      'Si une clé s’est cassée dans le cylindre, laissez le morceau en place : une extraction propre évite souvent de changer le cylindre.',
      'Après une perte de clés avec vos papiers d’identité, changez le cylindre : quelqu’un peut retrouver votre adresse.',
      'Gardez la facture : elle mentionne le type de cylindre posé et sert de preuve pour l’assurance.',
      'Un cylindre de sécurité certifié protège contre le crochetage et le cassage, mais il faut aussi une rosace de protection pour qu’il soit efficace.',
    ],
  },

  nl: {
    title: x => (x.name.length > 16 ? `Slotenmaker ${x.name} (${x.pc}): vaste prijs` : `Slotenmaker ${x.name} (${x.pc}): deur openen, vaste prijs`),
    description: x => `Slotenmaker in ${x.name} ${x.pc}: dichtgevallen deur vanaf ${euro(x.p('porte-claquee').min)}, cilinder, slot, inbraak. Prijs vooraf gekend, 24/7. Online reserveren.`,
    h1: x => `Slotenmaker in ${x.label}`,
    lead: x => `Deur dichtgevallen, sleutels kwijt, slot geforceerd: een zelfstandige slotenmaker komt naar ${x.name} (${x.pc}) met een prijsvork die u vóór vertrek kent.`,
    intros: [
      x => `In ${x.name} gaat het meestal om een dichtgevallen deur met de sleutels binnen of een cilinder die niet meer draait. Onze slotenmaker opent eerst zonder te boren als het slot dat toelaat, en vervangt de cilinder alleen als het nodig is. ${x.secText ? `We komen in de hele gemeente, ook in ${x.secText}.` : ''}`,
      x => `Buitengesloten in ${x.name}? Beschrijf de situatie online of telefonisch: u krijgt de prijsvork vóór de slotenmaker vertrekt en u betaalt pas als de deur open is. ${x.secText ? `We werken in ${x.secText} en de rest van ${x.pcLabel}.` : ''}`,
      x => `Een slotenmaker in ${x.name} moet vooral snel bereikbaar zijn en duidelijk over de prijs. Daar zorgen we voor: een vakman uit de buurt, een vaste prijsvork per interventie en een gedetailleerde factuur achteraf. ${x.secText ? `Regelmatig aan het werk in ${x.secText}.` : ''}`,
      x => `Deur openen, cilinder vervangen na sleutelverlies, beveiliging na inbraak: onze slotenmakers werken dag en nacht in ${x.name} ${x.pcLabel}. ${x.secText ? `Ook in ${x.secText}.` : ''}`,
    ],
    kindTitle: x => `Meest voorkomende interventies in ${x.name}`,
    kind: {
      urbain: [
        { t: 'Dichtgevallen appartementsdeur', d: 'In appartementsgebouwen valt de voordeur vanzelf dicht. Openen zonder de cilinder te beschadigen lukt in de meeste gevallen.' },
        { t: 'Gemeenschappelijke deur en parlofoon', d: 'Vastgelopen slot van de inkomdeur, elektrische sluitplaat die niet meer opent: herstelling of vervanging, zo nodig in overleg met de syndicus.' },
        { t: 'Cilinder vervangen na een verhuis', d: 'Bij een nieuwe woning voorkomt een nieuwe cilinder dat vorige bewoners nog een sleutel hebben. Nieuwe sleutels ter plaatse.' },
        { t: 'Beveiliging na inbraakpoging', d: 'Uitgetrokken cilinder of geforceerde deur: dezelfde dag voorlopig afgesloten, daarna definitieve vervanging op offerte.' },
      ],
      periurbain: [
        { t: 'Voordeur van de woning op slot', d: 'Sleutels verloren of binnen gelaten: opening van voor- of achterdeur, met of zonder vervanging van de cilinder.' },
        { t: 'Garagepoort en tuinpoort', d: 'Vastzittend slot van de garagepoort, poort die niet meer sluit: deblokkeren of slot vervangen.' },
        { t: 'Meerpuntsslot afstellen', d: 'Bij recente woningdeuren is een stroef meerpuntsslot vaak af te stellen zonder het te vervangen.' },
        { t: 'Beveiliging na inbraak', d: 'Geforceerde schuifdeur of achterdeur: onmiddellijk beveiligd en een verslag voor uw verzekering.' },
      ],
      rural: [
        { t: 'Achterdeur of bijgebouw geblokkeerd', d: 'Deuren van berging, kelder of werkplaats: openen en oude sloten vervangen.' },
        { t: 'Poort en garagepoort', d: 'Buitensloten die door weer en wind vastlopen: ontroesten of vervangen.' },
        { t: 'Sleutels kwijt voor een afgelegen woning', d: 'Deur openen en cilinder vervangen, zodat er geen sleutel meer rondslingert.' },
        { t: 'Voordeur versterken', d: 'Veiligheidsgrendel of meerpuntsslot plaatsen voor een open bebouwing.' },
      ],
    },
    region: {
      bruxelles: x => `In Brussel gaat het vaak om deuren van appartementsgebouwen of opgesplitste herenhuizen. De slotenmaker overlegt vooraf wie de interventie betaalt (huurder, eigenaar of syndicus) en maakt de factuur op uw naam.`,
      'brabant-wallon': x => `In Waals-Brabant gaat het meestal om woningen met meerdere toegangen (voordeur, garagepoort, schuifraam). Bij sleutelverlies controleert de slotenmaker alle toegangen.`,
      'brabant-flamand': x => `In Vlaams-Brabant werken onze slotenmakers in het Nederlands of het Frans. ${x.facilites ? `${x.name} is een faciliteitengemeente: de factuur kan ook in het Frans.` : 'De factuur wordt opgemaakt in de taal van uw keuze.'}`,
    },
    eta: x => `Streeftijd in ${x.name}: ${x.eta} na bevestiging, afhankelijk van de dichtstbijzijnde slotenmaker. De werkelijke wachttijd hoort u telefonisch vóór vertrek.`,
    zoneTitle: x => `Werkgebied rond ${x.name}`,
    zone: x => `Onze slotenmakers werken in ${x.name} (${x.pcList})${x.sections.length ? `, waaronder ${joinList(x.sections, 'nl')}` : ''}. Ook in de buurgemeenten:`,
    faq: x => [
      { q: `Hoeveel kost een slotenmaker in ${x.name}?`, a: `Een dichtgevallen deur openen kost tussen ${euro(x.p('porte-claquee').min)} en ${euro(x.p('porte-claquee').max)} incl. btw, een op slot gedraaide deur tussen ${euro(x.p('porte-verrouillee').min)} en ${euro(x.p('porte-verrouillee').max)}. De verplaatsing is inbegrepen. Tussen 20u en 8u, in het weekend en op feestdagen geldt één toeslag van ${euro(x.fees.surcharge)}.` },
      { q: 'Kan de slotenmaker openen zonder het slot te breken?', a: 'Bij een deur die gewoon dichtgevallen is, in de meeste gevallen wel. Bij een deur op slot of met een veiligheidscilinder zegt de slotenmaker vooraf of de cilinder vervangen moet worden en wat dat kost.' },
      { q: `Moet ik bewijzen dat ik in ${x.name} woon?`, a: 'Ja. Vóór of vlak na het openen vraagt de slotenmaker een identiteitskaart en een document op het adres (huurcontract, factuur, brief). Dat beschermt u en hem.' },
      { q: 'Wat moet ik doen voor de verzekering na een inbraak?', a: `Doe aangifte bij de politie${x.police ? ` (in ${x.name}: de ${x.police})` : ''}: uw verzekeraar vraagt meestal het pv-nummer. De slotenmaker beveiligt de deur en geeft u een interventieverslag en gedetailleerde factuur voor uw aangifte.` },
      { q: 'Welke btw is van toepassing?', a: '6 % voor een privéwoning ouder dan 10 jaar, 21 % voor een recentere woning of een beroepsruimte. De getoonde prijzen zijn berekend aan 6 %.' },
      ...(x.sections.length ? [{ q: `Komen jullie ook naar ${x.sections[0]}${x.sections[1] ? ` en ${x.sections[1]}` : ''}?`, a: `Ja, ${x.sections[0]}${x.sections[1] ? ` en ${x.sections[1]}` : ''} horen bij ons werkgebied in ${x.name} (${x.pcList}). De prijs is overal in de gemeente dezelfde.` }] : []),
    ],
    tips: [
      'Is de deur enkel dichtgevallen? Forceer de klink niet en probeer geen kaart: u kunt de schoot beschadigen en de opening duurder maken.',
      'Is er een sleutel afgebroken in de cilinder? Laat het stuk zitten: een propere extractie vermijdt vaak een nieuwe cilinder.',
      'Sleutels kwijt samen met uw identiteitskaart? Vervang de cilinder: iemand kan uw adres vinden.',
      'Bewaar de factuur: ze vermeldt het type cilinder en dient als bewijs voor de verzekering.',
      'Een gecertificeerde veiligheidscilinder beschermt tegen lockpicking en breken, maar werkt pas goed met een veiligheidsrozet.',
    ],
  },
}
