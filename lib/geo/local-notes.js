// Hand-written local context per commune (housing stock, access, what artisans run into).
// Trade-neutral on purpose: reused by every trade's page for the commune.
// Required before a commune's region is added to a rollout wave — review for accuracy first.
export const LOCAL_NOTES = {
  // ── Bruxelles ──
  anderlecht: {
    fr: 'Anderlecht mêle des rues ouvrières très denses à Cureghem et autour de la gare du Midi, des immeubles de logements sociaux au Peterbos et des quartiers de maisons unifamiliales vers Neerpede et la Roue. Les artisans y interviennent aussi bien sur des portes d’immeubles à plusieurs étages que sur des maisons mitoyennes avec cour arrière, et dans de nombreux commerces le long de la chaussée de Mons.',
    nl: 'Anderlecht combineert dichte arbeidersstraten in Kuregem en rond het Zuidstation, sociale woonblokken in Peterbos en rijhuizen richting Neerpede en het Rad. Vakmensen werken er zowel aan deuren van appartementsgebouwen als aan rijwoningen met koer, en in de vele handelszaken langs de Bergensesteenweg.',
  },
  auderghem: {
    fr: 'Commune résidentielle et verte au bord de la forêt de Soignes, Auderghem compte surtout des maisons bel-étage et des petits immeubles des années 1950 à 1970, avec des garages en façade. Les demandes portent souvent sur des portes de garage, des serrures de porte d’entrée d’origine et des installations à moderniser dans les maisons familiales autour du Transvaal et de Rouge-Cloître.',
    nl: 'Oudergem is een groene woongemeente aan het Zoniënwoud, met vooral bel-etagewoningen en kleine appartementsgebouwen uit de jaren 1950 tot 1970, vaak met een garage aan de straatkant. Vragen gaan vaak over garagepoorten, originele voordeursloten en te moderniseren installaties in gezinswoningen rond Transvaal en het Rood Klooster.',
  },
  'berchem-sainte-agathe': {
    fr: 'Petite commune du nord-ouest, Berchem-Sainte-Agathe est composée de quartiers résidentiels calmes, de maisons mitoyennes et de cités-jardins, avec quelques immeubles plus récents vers Hunderenveld. Les interventions concernent surtout des maisons familiales, avec portes d’entrée et portes de jardin à sécuriser, à la limite de Dilbeek et de Ganshoren.',
    nl: 'Sint-Agatha-Berchem is een kleine gemeente in het noordwesten met rustige woonwijken, rijhuizen en tuinwijken, en enkele recentere gebouwen richting Hunderenveld. Interventies gaan vooral over gezinswoningen, met voor- en tuindeuren die beveiligd moeten worden, op de grens met Dilbeek en Ganshoren.',
  },
  bruxelles: {
    fr: 'Le centre de Bruxelles concentre des immeubles anciens, des maisons de maître transformées en appartements, des commerces et des bureaux, du Pentagone aux Marolles et au quartier européen. Accès par cage d’escalier étroite, portes d’immeuble à gâche électrique, stationnement difficile : les artisans prévoient ces contraintes dans le délai annoncé, surtout dans les rues piétonnes autour de Sainte-Catherine et du Sablon.',
    nl: 'Het centrum van Brussel telt oude gebouwen, herenhuizen omgebouwd tot appartementen, winkels en kantoren, van de Vijfhoek tot de Marollen en de Europese wijk. Smalle trappenhallen, gebouwdeuren met elektrische sluitplaat en moeilijk parkeren: vakmensen houden er rekening mee in de aangekondigde wachttijd, zeker in de voetgangersstraten rond Sint-Katelijne en de Zavel.',
  },
  laeken: {
    fr: 'Laeken alterne rues commerçantes animées autour de Bockstael, grands immeubles d’appartements vers le Heysel et quartiers de maisons plus calmes au Mutsaard, près du parc royal. Les artisans y rencontrent beaucoup de portes palières d’appartement et de portes d’immeubles anciennes, ainsi que des maisons mitoyennes avec cave et garage.',
    nl: 'Laken wisselt drukke winkelstraten rond Bockstael af met grote appartementsgebouwen richting de Heizel en rustigere woonwijken in de Mutsaard, vlak bij het koninklijk park. Vakmensen komen er veel appartementsdeuren en oude gebouwdeuren tegen, en rijhuizen met kelder en garage.',
  },
  'neder-over-heembeek': {
    fr: 'Au nord de Bruxelles-Ville, Neder-Over-Heembeek garde un caractère de village, avec des maisons familiales, des cités de logements et quelques zones d’activité près du canal. Les interventions se font surtout sur des maisons unifamiliales et des immeubles bas, avec portes de garage et portails fréquents.',
    nl: 'In het noorden van Brussel-Stad heeft Neder-Over-Heembeek nog een dorps karakter, met gezinswoningen, sociale woonwijken en enkele bedrijvenzones langs het kanaal. Interventies gebeuren vooral in eengezinswoningen en lage gebouwen, met vaak garagepoorten en tuinpoorten.',
  },
  etterbeek: {
    fr: 'Etterbeek est une commune dense, faite de maisons de maître divisées en appartements, d’immeubles d’avant-guerre et de résidences proches des institutions européennes et du Cinquantenaire. Beaucoup de logements sont loués, souvent à des étudiants ou à des expatriés : clés perdues, cylindres à changer entre deux locataires et portes d’immeuble à gâche électrique reviennent souvent.',
    nl: 'Etterbeek is een dichtbebouwde gemeente met herenhuizen opgesplitst in appartementen, vooroorlogse gebouwen en residenties dicht bij de Europese instellingen en het Jubelpark. Veel woningen worden verhuurd, vaak aan studenten of expats: verloren sleutels, cilinders wisselen tussen huurders en gebouwdeuren met elektrische sluitplaat komen vaak voor.',
  },
  evere: {
    fr: 'Evere, au nord-est, combine quartiers de maisons mitoyennes, immeubles des années 1960 et 1970 et zones de bureaux le long du boulevard Léopold III, près de l’OTAN. Les artisans y interviennent autant dans des appartements avec parties communes que dans des maisons avec garage, et dans des locaux professionnels.',
    nl: 'Evere, in het noordoosten, combineert wijken met rijhuizen, gebouwen uit de jaren 1960 en 1970 en kantoorzones langs de Leopold III-laan, vlak bij de NAVO. Vakmensen werken er zowel in appartementen met gemeenschappelijke delen als in woningen met garage en in beroepsruimtes.',
  },
  forest: {
    fr: 'Forest s’étend des maisons de maître et immeubles Art déco d’Altitude Cent aux rues plus populaires autour de Saint-Denis et de Van Volxem, en passant par des zones industrielles. Portes anciennes en bois, cylindres d’origine et installations vieillissantes dans des immeubles des années 1930 sont des situations courantes pour les artisans.',
    nl: 'Vorst gaat van herenhuizen en art-decogebouwen op Hoogte Honderd tot volkse straten rond Sint-Denijs en Van Volxem, met ook industriezones. Oude houten deuren, originele cilinders en verouderde installaties in gebouwen uit de jaren 1930 zijn er dagelijkse kost voor vakmensen.',
  },
  ganshoren: {
    fr: 'Ganshoren est une commune résidentielle et verte du nord-ouest, avec des villas, des maisons familiales et des immeubles de taille moyenne autour du parc Roi Baudouin et de la basilique. Les demandes portent souvent sur des portes d’entrée et de garage de maisons des années 1950 à 1970, et sur des immeubles avec syndic.',
    nl: 'Ganshoren is een groene woongemeente in het noordwesten, met villa’s, gezinswoningen en middelgrote gebouwen rond het Koning Boudewijnpark en de basiliek. Vragen gaan vaak over voordeuren en garagepoorten van woningen uit de jaren 1950 tot 1970, en over gebouwen met een syndicus.',
  },
  ixelles: {
    fr: 'Ixelles est l’une des communes les plus denses de Bruxelles : maisons de maître divisées en appartements autour de Flagey et du Châtelain, immeubles d’étudiants vers l’ULB et Boondael, commerces à Matonge et porte de Namur. Beaucoup de logements changent de locataire chaque année, ce qui explique le nombre élevé de demandes pour des portes claquées, des clés perdues et des cylindres à remplacer.',
    nl: 'Elsene is een van de dichtstbevolkte gemeenten van Brussel: herenhuizen opgesplitst in appartementen rond Flagey en de Kastelein, studentenkoten richting ULB en Boondaal, winkels in Matonge en aan de Naamsepoort. Veel woningen wisselen jaarlijks van huurder, wat het hoge aantal dichtgevallen deuren, verloren sleutels en te vervangen cilinders verklaart.',
  },
  jette: {
    fr: 'Jette combine un centre commerçant autour de la place Reine Astrid, des quartiers de maisons mitoyennes, des immeubles près de l’hôpital universitaire et des zones plus vertes vers le parc Roi Baudouin. Les artisans y traitent aussi bien des portes de maisons avec cave et jardin que des immeubles à appartements avec parlophone.',
    nl: 'Jette combineert een winkelcentrum rond het Koningin Astridplein, wijken met rijhuizen, gebouwen bij het UZ Brussel en groenere zones richting het Koning Boudewijnpark. Vakmensen werken er aan deuren van woningen met kelder en tuin en aan appartementsgebouwen met parlofoon.',
  },
  koekelberg: {
    fr: 'Plus petite commune de la Région, Koekelberg est très dense autour de la basilique et de la place Simonis, avec surtout des immeubles d’appartements et des maisons mitoyennes étroites. Les interventions se font souvent en étage, avec accès par la porte d’immeuble et parties communes gérées par un syndic.',
    nl: 'Koekelberg, de kleinste gemeente van het Gewest, is erg dicht bebouwd rond de basiliek en het Simonisplein, met vooral appartementsgebouwen en smalle rijhuizen. Interventies gebeuren vaak op een verdieping, via de gebouwdeur en gemeenschappelijke delen beheerd door een syndicus.',
  },
  'molenbeek-saint-jean': {
    fr: 'Molenbeek va des rues denses du quartier Maritime et du vieux Molenbeek le long du canal aux quartiers plus aérés du Karreveld et d’Osseghem. On y trouve de nombreuses maisons divisées en logements, des commerces avec rideau métallique et des immeubles sociaux : portes d’immeuble, serrures anciennes et sécurisation après effraction sont des demandes fréquentes.',
    nl: 'Molenbeek gaat van de dichte straten van de Maritiemwijk en het oude Molenbeek langs het kanaal tot de ruimere wijken van Karreveld en Osseghem. Er zijn veel opgesplitste huizen, winkels met rolluik en sociale woonblokken: gebouwdeuren, oude sloten en beveiliging na inbraak komen vaak voor.',
  },
  'saint-gilles': {
    fr: 'Saint-Gilles est dense et très bâtie : maisons de maître fin XIXe divisées en appartements autour du Parvis et de la Barrière, immeubles Art nouveau, et quartier de la gare du Midi. Les portes d’entrée anciennes en bois massif, les serrures encastrées d’origine et les cages d’escalier étroites font partie du quotidien des artisans.',
    nl: 'Sint-Gillis is dicht bebouwd: herenhuizen uit eind 19e eeuw opgesplitst in appartementen rond het Voorplein en de Bareel, art-nouveaugebouwen en de wijk rond het Zuidstation. Oude massief houten voordeuren, originele inbouwsloten en smalle trappenhallen zijn dagelijkse kost voor vakmensen.',
  },
  'saint-josse-ten-noode': {
    fr: 'Saint-Josse est la commune la plus dense du pays : immeubles anciens, maisons divisées en nombreux logements, commerces et hôtels entre Madou, la place Saint-Josse et le Botanique. Les interventions se font presque toujours en appartement, avec des portes d’immeuble anciennes et des accès parfois compliqués.',
    nl: 'Sint-Joost is de dichtstbevolkte gemeente van het land: oude gebouwen, huizen opgesplitst in veel woningen, winkels en hotels tussen Madou, het Sint-Joostplein en de Kruidtuin. Interventies gebeuren bijna altijd in appartementen, met oude gebouwdeuren en soms moeilijke toegangen.',
  },
  schaerbeek: {
    fr: 'Schaerbeek, l’une des communes les plus peuplées, est faite de longues rues de maisons de maître et d’immeubles 1900 divisés en appartements, de Josaphat à Helmet et de Dailly au Diamant. Portes d’entrée anciennes à double battant, cylindres d’origine et portes palières claquées reviennent sans cesse, tout comme les commerces des chaussées de Haecht et d’Helmet.',
    nl: 'Schaarbeek, een van de volkrijkste gemeenten, bestaat uit lange straten met herenhuizen en gebouwen rond 1900, opgesplitst in appartementen, van Josaphat tot Helmet en van Dailly tot Diamant. Oude dubbele voordeuren, originele cilinders en dichtgevallen appartementsdeuren komen er voortdurend voor, net als de winkels aan de Haachtsesteenweg en Helmetsesteenweg.',
  },
  uccle: {
    fr: 'Uccle est vaste et résidentielle : villas et maisons quatre façades vers le Vivier d’Oie, le Fort-Jaco et Saint-Job, immeubles plus denses autour du Globe et de Calevoet. Les artisans y interviennent souvent sur des maisons avec plusieurs accès, des portes de garage, des portails et des serrures de sécurité haut de gamme, avec des distances plus longues entre quartiers.',
    nl: 'Ukkel is uitgestrekt en residentieel: villa’s en open bebouwing richting Diesdelle, Fort-Jaco en Sint-Job, dichtere bebouwing rond de Globe en Kalevoet. Vakmensen werken er vaak aan woningen met meerdere toegangen, garagepoorten, poorten en hoogwaardige veiligheidssloten, met grotere afstanden tussen de wijken.',
  },
  'watermael-boitsfort': {
    fr: 'Watermael-Boitsfort est très verte, entre la forêt de Soignes et les cités-jardins du Logis et de Floréal, avec des maisons familiales et quelques immeubles près de Keym et des Trois Tilleuls. Les interventions portent surtout sur des maisons anciennes aux portes en bois, des portes de jardin et des installations à rénover.',
    nl: 'Watermaal-Bosvoorde is erg groen, tussen het Zoniënwoud en de tuinwijken Logis en Floréal, met gezinswoningen en enkele gebouwen bij Keym en de Drie Linden. Interventies gaan vooral over oude woningen met houten deuren, tuindeuren en te renoveren installaties.',
  },
  'woluwe-saint-lambert': {
    fr: 'Woluwe-Saint-Lambert combine immeubles d’appartements des années 1960 et 1970 autour de Roodebeek et du Tomberg, maisons familiales vers Kapelleveld et Georges Henri, et grands ensembles résidentiels. Les demandes concernent souvent des appartements avec syndic, des caves et des garages en sous-sol.',
    nl: 'Sint-Lambrechts-Woluwe combineert appartementsgebouwen uit de jaren 1960 en 1970 rond Roodebeek en de Tomberg, gezinswoningen richting Kapelleveld en Georges Henri, en grote residentiële complexen. Vragen gaan vaak over appartementen met syndicus, kelders en ondergrondse garages.',
  },
  'woluwe-saint-pierre': {
    fr: 'Woluwe-Saint-Pierre est l’une des communes les plus résidentielles : villas et maisons quatre façades autour du Chant d’Oiseau, de Stockel et de Joli-Bois, avenues arborées et quelques immeubles près de Montgomery. Portes blindées, serrures multipoints, portails et systèmes de sécurité sont fréquents, tout comme les demandes de sécurisation.',
    nl: 'Sint-Pieters-Woluwe is een van de meest residentiële gemeenten: villa’s en open bebouwing rond Vogelzang, Stokkel en Mooi-Bos, lanen met bomen en enkele gebouwen bij Montgomery. Veiligheidsdeuren, meerpuntssloten, poorten en beveiligingssystemen zijn er gebruikelijk, net als vragen naar extra beveiliging.',
  },
  // ── Brabant wallon ──
  beauvechain: { fr: 'Beauvechain est une commune rurale de l’est du Brabant wallon, faite de villages comme Hamme-Mille, Tourinnes-la-Grosse ou Nodebais, de fermes rénovées et de maisons récentes. Les artisans y interviennent sur des maisons isolées avec annexes, portails et portes de garage, avec des trajets plus longs entre villages.' },
  'braine-l-alleud': { fr: 'Braine-l’Alleud est une ville en croissance, entre le centre commerçant, les nouveaux lotissements et les quartiers résidentiels de Lillois et d’Ophain. On y trouve autant d’appartements récents que de maisons quatre façades avec garage, ce qui donne des demandes très variées, des portes d’immeuble aux serrures multipoints.' },
  'braine-le-chateau': { fr: 'Braine-le-Château est un village résidentiel autour de son château et de sa place, avec Wauthier-Braine et de nombreuses maisons familiales en lotissement. Les interventions portent surtout sur des maisons avec jardin, portes de garage et portails, dans un cadre plutôt rural.' },
  chastre: { fr: 'Chastre regroupe des villages ruraux comme Blanmont, Gentinnes, Cortil-Noirmont ou Saint-Géry, avec fermes, maisons de village et lotissements récents. Les artisans y rencontrent des portes anciennes en bois, des annexes agricoles et des maisons isolées aux accès multiples.' },
  'chaumont-gistoux': { fr: 'Chaumont-Gistoux est une commune verte et vallonnée, avec les villages de Bonlez, Dion-Valmont, Corroy-le-Grand et Longueville, et beaucoup de villas en lotissement. Portails, portes de garage et maisons quatre façades avec plusieurs accès font partie des interventions courantes.' },
  'court-saint-etienne': { fr: 'Court-Saint-Étienne, ancienne cité industrielle au bord de la Thyle, compte des maisons ouvrières mitoyennes près du centre et des quartiers résidentiels plus récents vers Sart-Messire-Guillaume. Les artisans y interviennent sur des portes anciennes comme sur des constructions neuves.' },
  genappe: { fr: 'Genappe est une grande commune rurale qui regroupe Baisy-Thy, Bousval, Glabais, Houtain-le-Val, Loupoigne, Vieux-Genappe et Ways, avec un centre ancien et de nombreuses fermes. Les distances entre villages sont importantes et les interventions concernent souvent des maisons isolées, des annexes et des portails.' },
  'grez-doiceau': { fr: 'Grez-Doiceau s’étend dans la vallée de la Dyle, avec Archennes, Biez, Bossut-Gottechain et Nethen, entre maisons de village, fermes et villas. Les artisans y interviennent surtout sur des maisons familiales avec jardin, garage et accès secondaires.' },
  helecine: { fr: 'Hélécine est une petite commune rurale à la frontière linguistique, avec Linsmeau, Neerheylissem et Opheylissem, faite de villages agricoles et de maisons anciennes. Les interventions se font souvent sur des portes en bois d’origine et des bâtiments annexes.' },
  incourt: { fr: 'Incourt est une commune rurale du centre-est du Brabant wallon, avec Glimes, Opprebais, Piétrebais et Roux-Miroir, entre fermes en carré et maisons de village. Les artisans y rencontrent surtout des portes anciennes et des maisons isolées aux accès multiples.' },
  ittre: { fr: 'Ittre, avec Haut-Ittre et Virginal-Samme, est une commune rurale et verte au bord du canal Charleroi-Bruxelles, entre centre de village ancien et lotissements. Les interventions portent sur des maisons familiales, des fermes rénovées et des portails.' },
  jodoigne: { fr: 'Jodoigne est la petite ville de l’est du Brabant wallon, avec un centre commerçant et de nombreux villages autour, comme Jauchelette, Mélin ou Piétrain. On y trouve des commerces, des maisons de ville mitoyennes et des maisons rurales isolées, ce qui demande aux artisans de couvrir de longues distances.' },
  'la-hulpe': { fr: 'La Hulpe est une commune résidentielle et boisée près de la forêt de Soignes et du domaine Solvay, avec des villas, des maisons familiales et un centre plus dense autour de la gare. Les demandes portent souvent sur des serrures de sécurité, des portails et des maisons avec plusieurs accès.' },
  lasne: { fr: 'Lasne est l’une des communes les plus résidentielles du pays, avec de grandes villas à Ohain, Couture-Saint-Germain, Maransart et Plancenoit. Portes blindées, serrures multipoints, portails motorisés et systèmes de sécurité y sont fréquents, sur des terrains parfois étendus.' },
  'mont-saint-guibert': { fr: 'Mont-Saint-Guibert, avec Corbais et Hévillers, est une commune en développement autour de sa gare et de son parc d’entreprises, entre maisons de village et nouveaux quartiers. Les artisans y interviennent autant dans des appartements récents que dans des maisons anciennes.' },
  nivelles: { fr: 'Nivelles est la principale ville de l’ouest du Brabant wallon, avec un centre historique autour de la collégiale, des quartiers résidentiels et des villages comme Baulers, Bornival, Monstreux et Thines. On y trouve des commerces, des appartements en centre-ville et des maisons familiales en périphérie.' },
  'orp-jauche': { fr: 'Orp-Jauche est une commune rurale à l’extrême est de la province, avec de nombreux villages comme Jauche, Orp-le-Grand, Marilles ou Folx-les-Caves. Les interventions se font souvent sur des fermes, des maisons anciennes et des annexes, avec des trajets plus longs.' },
  'ottignies-louvain-la-neuve': { fr: 'Ottignies-Louvain-la-Neuve associe la ville universitaire piétonne de Louvain-la-Neuve, avec ses kots et appartements, le centre d’Ottignies autour de la gare et les quartiers résidentiels de Limelette et Céroux-Mousty. Clés perdues, portes de kot claquées et changements de cylindre entre étudiants y sont particulièrement fréquents.' },
  perwez: { fr: 'Perwez est un bourg rural avec un centre commerçant et des villages comme Orbais, Malèves-Sainte-Marie-Wastines et les Thorembais. Les artisans y interviennent sur des maisons de bourg, des fermes rénovées et des lotissements récents.' },
  ramillies: { fr: 'Ramillies est une commune agricole de l’est du Brabant wallon, avec Autre-Église, Bomal, Gérompont, Grand-Rosière-Hottomont, Huppaye et Mont-Saint-André. Les interventions concernent surtout des maisons rurales, des fermes et des portails, dans des villages éloignés les uns des autres.' },
  rebecq: { fr: 'Rebecq, avec Bierghes et Quenast, est une commune rurale de l’ouest du Brabant wallon, connue pour ses carrières de porphyre, entre maisons de village et lotissements. Les artisans y rencontrent des portes anciennes et des maisons familiales avec garage.' },
  rixensart: { fr: 'Rixensart, avec Genval et Rosières, est une commune résidentielle proche du lac de Genval et de la forêt, avec des villas, des maisons familiales et quelques immeubles autour des gares. Les demandes portent souvent sur des serrures de maisons quatre façades, des portails et des portes de garage.' },
  tubize: { fr: 'Tubize, avec Clabecq, Oisquercq et Saintes, est une ancienne ville industrielle en pleine rénovation, entre maisons ouvrières mitoyennes, immeubles récents et quartiers résidentiels. Les interventions sont variées, des portes anciennes du centre aux constructions neuves.' },
  'villers-la-ville': { fr: 'Villers-la-Ville, connue pour son abbaye, regroupe Marbais, Mellery, Sart-Dames-Avelines et Tilly, dans un cadre rural et boisé. Les artisans y interviennent sur des maisons de village, des fermes et des villas, avec des trajets parfois longs entre les sections.' },
  walhain: { fr: 'Walhain est une commune rurale du centre du Brabant wallon, avec Nil-Saint-Vincent-Saint-Martin, Tourinnes-Saint-Lambert et Walhain-Saint-Paul, entre fermes et lotissements récents. Les demandes portent sur des maisons familiales, des portails et des annexes.' },
  waterloo: { fr: 'Waterloo est une ville résidentielle et commerçante, avec des villas vers le Chenois, des quartiers de maisons familiales autour de Mont-Saint-Jean et une communauté internationale importante. Serrures de sécurité, portes blindées, portails et systèmes d’accès reviennent souvent, comme les commerces de la chaussée de Bruxelles.' },
  wavre: { fr: 'Wavre, chef-lieu du Brabant wallon, combine un centre commerçant animé, des appartements récents, des quartiers résidentiels à Bierges et Limal, et des zones d’activité. Les artisans y interviennent autant pour des commerces et des bureaux que pour des maisons et des appartements.' },
}
