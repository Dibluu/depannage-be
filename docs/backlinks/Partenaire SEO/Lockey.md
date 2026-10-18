# Serrurerie LocKey — journal des optimisations SEO

Site : https://serrurerielockey.be · WordPress, Elementor Pro + Astra, SEOPress PRO
Point de départ : audit SEO du 2 octobre 2026 (`components/Audit Kiverrou, Lockey, Smithlock.pdf`).

Ce fichier sert de base au rapport client de fin de mois. Chaque intervention est notée avec la date, ce qui a changé, pourquoi, et comment on l'a vérifié.

## Situation de départ (mesure du 2 octobre 2026)

| Indicateur | Valeur |
|---|---|
| Pages publiées | 9 |
| Mots-clés positionnés (Google Belgique) | 50 |
| Mots-clés dans le top 3 | 3 |
| Mots-clés en positions 4 à 20 | 14 |
| Visites estimées par mois | ≈ 120 |
| Domaines référents | 46, dont 29 de spam |
| Score technique DataForSEO | 83 / 100 |

Mots-clés à suivre : serrurier (5 400 recherches/mois, 15e), serrurier bruxelles (2 900, 14e), serrurerie (390, 10e), serrurier dépannage (320, 10e), serrurier urgence bruxelles (320, 13e), serrurier automobile (210, 1er), serrurerie bruxelles (170, 9e), serrurier wemmel (170, 8e).

Prochaine mesure : mi-novembre 2026.

---

## Octobre 2026

### 2 octobre — Correctifs techniques prioritaires

Sauvegarde préalable des pages et des menus (copie locale hors dépôt), avant toute modification.

| # | Intervention | Avant | Après | Pourquoi |
|---|---|---|---|---|
| 1 | Page Contact rendue indexable | `noindex, nofollow` | `index, follow` | Google ne pouvait ni afficher la page Contact ni suivre ses liens. |
| 2 | Lien cassé corrigé sur la page d'accueil | Le lien « rendez-vous » menait à `/prise-de-rendez-vous/`, une page inexistante (erreur 404) | Il mène à `/contact/` | Un lien cassé sur la page qui porte presque tout le trafic gaspille l'exploration de Google et frustre les visiteurs. |
| 3 | Page Uccle reliée au reste du site | `/serrurier-uccle/` n'était liée depuis aucune page | Lien « Serrurier Uccle » ajouté au menu du pied de page, donc présent sur toutes les pages | Google ne trouvait la page que par le plan du site. Elle se positionne maintenant comme une vraie page du site. |

Vérifications faites le jour même sur le site en ligne :
- `/contact/` affiche `<meta name="robots" content="index, follow">`.
- La page d'accueil ne contient plus aucun lien vers `/prise-de-rendez-vous/`.
- Le lien vers `/serrurier-uccle/` apparaît sur l'accueil et sur la page Contact.
- La mise en page de l'accueil est inchangée (seule l'adresse du lien a été modifiée ; cache Elementor vidé).

Complément du même jour : redirection 301 de `/prise-de-rendez-vous/` vers `/contact/` ajoutée dans SEOPress → Redirections. Les visiteurs et les liens externes qui utilisent encore l'ancienne adresse arrivent maintenant sur la page Contact au lieu d'une erreur 404. Vérifié : l'adresse, avec ou sans barre finale, renvoie un code 301 vers `/contact/`.

Effet attendu : la page Contact peut entrer dans l'index de Google sous 1 à 3 semaines ; la page Uccle devrait progresser sur « serrurier uccle » (880 recherches par mois).

### 2 octobre — Partenariat Dépannage.be : badge et premier lien

| # | Intervention | Où | Lien vers |
|---|---|---|---|
| 4 | Badge « Partenaire vérifié Dépannage.be » | Accueil, section « Pourquoi choisir les services de serrurerie Lockey ? », sous le dernier paragraphe | `https://www.dépannage.be/partenaires` |
| 5 | Phrase « Nos tarifs sont aussi publiés, prestation par prestation, sur la grille de prix de Dépannage.be. » | `/prix-serrurerie/`, à la fin du paragraphe « Nos tarifs serrurier à Bruxelles et Brabant affichés en ligne… » | `https://www.dépannage.be/prix/serrurier` |

Pourquoi : Lockey apparaît comme artisan vérifié sur Dépannage.be, et ces liens confirment le partenariat dans les deux sens. Ce sont deux liens dans le texte, pas dans le pied de page. Un lien posé sur toutes les pages est le schéma que Google repère le plus facilement.

Vérifié sur le site en ligne : le badge s'affiche sur l'accueil et le lien sur la page Tarifs. Le reste des deux pages est inchangé (ajout de texte seulement, cache Elementor vidé). Remarque : le bloc de l'accueil qui contient le badge était déjà masqué sur téléphone par un réglage de la page. Le badge n'est donc visible que sur ordinateur et tablette, mais il reste présent dans le code lu par Google.

### 2 octobre — Page `/depannage-serrure/` : redirection conservée

Constat : cette page est redirigée vers l'accueil par un réglage SEOPress. Vérification faite, son contenu est un ancien code de mise en page Divi alors que Divi n'est plus installé sur le site : sans la redirection, les visiteurs verraient une page cassée. La redirection est donc justifiée et on la garde.

Opportunité : le texte de cette page (≈ 1 200 mots sur le dépannage de serrure, presque rien en commun avec l'accueil) pourrait être reconstruit dans Elementor pour en refaire une vraie page.

### 4 octobre — Sécurité : installation de Wordfence

- Extension de sécurité Wordfence (version gratuite 9.0.2) installée et activée. Le site n'avait aucune extension de sécurité. Le site reste accessible normalement (accueil, contact, tarifs, connexion vérifiés).
- Comptes administrateurs vérifiés : deux seulement, le compte LocKey (propriétaire, 2018) et le compte de l'agence (créé le 29 septembre 2026). Aucun compte inconnu.
- Ancienne redirection `h/6791837.html` → `/disallow/` : cette adresse renvoie vers une page qui n'existe pas (404). C'est le signe d'une ancienne adresse de spam neutralisée à la main. Elle ne présente pas de risque.
- Réglage Wordfence : à l'installation, Wordfence bloque par défaut les « mots de passe d'application », l'accès utilisé par l'agence pour intervenir sur le site. Ce blocage a été levé le 5 octobre (Wordfence → Toutes les options) et l'accès a été vérifié.
- Analyse complète Wordfence (4 octobre, 21 h 17) : 17 178 fichiers, 12 extensions, 3 thèmes, 9 publications et 8 312 adresses analysés. **Aucun logiciel malveillant, aucun fichier modifié, aucun lien suspect.** Le site est sain.
- Seuls points relevés : 4 extensions pas à jour. SEOPress 10.2 → 10.3 (jugé critique par Wordfence, donc probablement un correctif de sécurité), Elementor 4.3.2 → 4.3.3, Elementor Pro 4.3.0 → 4.3.1, WP Mail SMTP 4.9.0 → 4.10.0. Ce sont des mises à jour mineures.
- 5 octobre : SEOPress (et SEOPress PRO) passent en 10.3, Elementor en 4.3.3 et WP Mail SMTP en 4.10.0. Elementor Pro est resté en 4.3.0 : le site n'a pas de licence Elementor Pro active, donc WordPress ne peut pas télécharger la mise à jour (« La mise à jour automatique n'est pas disponible pour cette extension »). Contrôle après mise à jour sur le site en ligne : accueil, contact, tarifs et Uccle répondent normalement, aucun message d'erreur, mise en page de l'accueil identique. Le badge, le lien vers Dépannage.be, la page Contact en « index, follow » et la redirection `/prise-de-rendez-vous/` sont toujours en place.

**Recommandation au client : renouveler la licence Elementor Pro.** Sans licence active, Elementor Pro ne reçoit plus ni mises à jour ni correctifs de sécurité. Rester en 4.3.0 ne présente pas de risque immédiat (Wordfence le classe en niveau moyen), mais l'écart grandira avec le temps. Ne jamais installer une copie d'Elementor Pro obtenue ailleurs que sur le compte Elementor officiel : les versions « gratuites » d'extensions payantes sont une source classique de logiciels malveillants.

### 5 octobre — Page Uccle et page Contact

Sauvegarde préalable des pages (copie locale hors dépôt).

| # | Intervention | Avant | Après | Pourquoi |
|---|---|---|---|---|
| 6 | Lien vers Dépannage.be sur la page Uccle | — | Phrase « Prix affiché avant le déplacement : réservez un serrurier à Uccle en ligne. » à la fin du paragraphe d'introduction, vers `https://www.dépannage.be/serrurier/bruxelles/uccle` | Deuxième semaine du partenariat. L'ancre est descriptive, différente de celle de Kiverrou vers la même page. |
| 7 | Lien interne « Nos tarifs » corrigé sur la page Uccle | L'icône pointait vers `/tarifs-serrurier/`, une ancienne adresse redirigée | Elle pointe directement vers `/prix-serrurerie/` | Évite une redirection inutile à chaque visite et à chaque passage de Google. |
| 8 | Titre Google de la page Contact raccourci | « Serrurier Bruxelles Contact - Formulaire en ligne disponible 24H/7J » (67 caractères, coupé dans Google) | « Contact Serrurier Bruxelles LocKey - Joignable 24h/24, 7j/7 » (59 caractères) | Le titre s'affiche en entier dans les résultats et contient le nom de la marque. |
| 9 | Description Google de la page Contact raccourcie | 205 caractères, coupée dans Google | « Contactez Serrurerie LocKey jour et nuit, à Bruxelles et dans le Brabant. Appelez-nous ou écrivez-nous via le formulaire en ligne : réponse rapide. » (147 caractères) | La description s'affiche en entier, ce qui donne envie de cliquer. |

Vérifié sur le site en ligne : le lien vers Dépannage.be et le lien « Nos tarifs » sont en place sur la page Uccle, et le nouveau titre et la nouvelle description de la page Contact apparaissent dans le code de la page.

### 5 octobre — Demande du client : changer de spécialité

Le propriétaire souhaite que Lockey ne soit plus mis en avant sur les clés et l'ouverture de voiture, mais sur : ouverture de portes blindées, coffres-forts, blindage et sécurisation de portes existantes, sécurisation de fenêtres.

Données relevées le jour même (Google Belgique, recherches par mois) :

| Recherche | Volume | Lockey aujourd'hui |
|---|---|---|
| coffre fort bruxelles | 210 | absent du top 20 |
| porte blindée bruxelles | 140 | absent du top 20 |
| porte blindée (toute la Belgique) | 590 | absent du top 20 |
| serrure 3 points / serrure multipoint | 140 / 110 | absent du top 20 |
| sécurité fenêtre / verrou fenêtre | 90 / 70 | – |
| porte anti effraction / cylindre de sécurité | 50 / 50 | – |
| serrurier automobile + voiture + clé de voiture + double clé voiture | 210 + 110 + 170 + 140 | absent du top 20 ce jour (1er selon l'audit du 2 octobre : la position varie) |

« coffre fort » seul (2 400 recherches) vise surtout l'achat d'un coffre en magasin ou la location : ce n'est pas la bonne cible pour un serrurier.

### 7 octobre — Alerte Google Search Console : pages introuvables (404)

Google a signalé 3 adresses en erreur 404 :

| Adresse | Cause | Correctif |
|---|---|---|
| `/serrurier-ixelles/` | Ancienne page supprimée définitivement. Kiverrou y fait encore un lien depuis sa page Ixelles. | Redirection 301 vers l'accueil |
| `/serrurier-wemmel/` | Ancienne page supprimée, encore connue de Google (Lockey est 8e sur « serrurier wemmel ») | Redirection 301 vers l'accueil, à faire pointer vers la future page Wemmel quand elle existera |
| `/wp-content/plugins/*` | Adresse technique testée par Google, ce n'est pas une page | Aucune action, sans conséquence |

Autres corrections du même jour :
- La redirection SEOPress `sitemaps/page.xml` envoyait vers une adresse inexistante. Elle pointe maintenant vers le plan du site officiel `/sitemaps.xml`.
- Search Console : 3 plans du site étaient déclarés pour le même contenu. Seul `/sitemaps.xml` est conservé.
- Correction des erreurs demandée à Google (« Valider la correction »).

Vérifié sur le site en ligne : les deux anciennes pages renvoient vers l'accueil (301, avec ou sans barre finale), l'ancien plan du site renvoie vers `/sitemaps.xml`, et les pages principales répondent normalement.

Effet attendu : l'alerte disparaît de la Search Console sous 1 à 3 semaines, et la valeur des liens qui pointaient vers ces anciennes pages (dont celui de Kiverrou) profite à l'accueil au lieu d'être perdue.

### 7 octobre — Nouvelle spécialité : réponses du propriétaire et première page

Réponses du propriétaire sur les services réellement proposés :
- **Portes blindées :** ouverture, réparation et remplacement des mécanismes, blindage de porte existante. Pas de pose de porte blindée neuve.
- **Coffres-forts :** surtout de l'ouverture, changement de combinaison quand c'est possible, et vente sur demande du client.
- **Fenêtres et châssis :** remplacement et réparation des serrures, ajout de verrous de sécurité anti-effraction, poignées à clé (pour empêcher les enfants d'ouvrir une fenêtre). À partir de 95 € hors déplacement.

Page « Porte blindée à Bruxelles » (`/porte-blindee-bruxelles/`) créée en brouillon pour validation. Même mise en page que les autres pages de service du site, images de voiture retirées. Contenu : ouverture de porte blindée, réparation et remplacement des mécanismes, blindage de porte existante, prix réels de la grille tarifaire (ouverture claquée 180–270 €, verrouillée 310–475 €, cylindre dès 95 €, blindage dès 220 €), questions fréquentes, liens vers les tarifs, le contact et la page Uccle. Titre Google : « Porte blindée Bruxelles : ouverture, réparation | LocKey ».

### 7 octobre — Nouvelle spécialité en ligne : 3 pages de service, menu et accueil

Validé par le propriétaire. Adresse officielle confirmée : **Avenue de Limburg Stirum 115, 1780 Wemmel**. Licence Elementor Pro renouvelée.

| # | Intervention | Détail |
|---|---|---|
| 10 | Page « Porte blindée à Bruxelles » publiée | `/porte-blindee-bruxelles/` : ouverture, réparation et remplacement des mécanismes, blindage de porte existante, prix réels, questions fréquentes. Titre Google « Porte blindée Bruxelles : ouverture, réparation \| LocKey » |
| 11 | Page « Coffre-fort à Bruxelles » publiée | `/coffre-fort-bruxelles/` : ouverture, changement de combinaison, vente et installation sur demande (pose encastrable dès 425 €), questions fréquentes |
| 12 | Page « Sécurité des fenêtres à Bruxelles » publiée | `/securite-fenetre-bruxelles/` : réparation de serrures de fenêtres et châssis, verrous anti-effraction, poignées à clé pour la sécurité des enfants, dès 95 € hors déplacement |
| 13 | Menu principal | Accueil · Portes blindées · Coffres-forts · Fenêtres · Tarifs · Contact |
| 14 | Accueil réorienté | Nouveau titre Google « Serrurier Bruxelles LocKey : porte blindée, coffre-fort 24/7 » et nouvelle description. Accroche du haut de page sur les trois spécialités. Le grand bloc « serrurier automobile » est remplacé par un bloc porte blindée ; la voiture garde une phrase avec un lien vers sa page. Les blocs coffre-fort et protection contre le cambriolage renvoient vers les nouvelles pages |
| 15 | Adresse corrigée sur l'accueil | « Avenue de Scheut 245 - 1070 Bruxelles » remplacé par l'adresse officielle de Wemmel, identique à la page Contact |

Les trois pages reprennent la mise en page des pages de service existantes, sans images de voiture. Elles se renvoient l'une vers l'autre et vers les tarifs, le contact et la page Uccle. La page voiture reste en ligne, sans être mise en avant.

Vérifié sur le site en ligne : les trois pages répondent, sont indexables, figurent dans le plan du site et ont leurs styles. Le menu affiche les six entrées. Sur l'accueil, les nouveaux liens, le nouveau titre et l'adresse de Wemmel sont en place, et le badge partenaire est toujours là.

Effet attendu : Google a maintenant une page dédiée pour chaque spécialité, ce qu'il lui faut pour afficher Lockey sur « porte blindée bruxelles », « coffre fort bruxelles » ou « sécurité fenêtre ». Les premières positions apparaissent en général après 4 à 8 semaines. La visibilité sur la voiture va baisser progressivement, comme demandé.

### 7 octobre — Retouches de design des pages de service

Validé par le client. Texte, titres et adresses des pages inchangés (sauvegarde préalable).

| # | Intervention | Pourquoi |
|---|---|---|
| 16 | Entrée « Accueil » retirée du menu principal (le logo ramène déjà à l'accueil) | Avec six entrées, « Contact » passait à la ligne sur ordinateur. Le menu tient de nouveau sur une ligne. |
| 17 | Texte aligné à gauche sur les 3 pages de service | Le texte justifié étirait les titres avec de grands espaces. |
| 18 | Boutons « +32 477 50 44 48 » (appel direct) et « Obtenir un devis » ajoutés deux fois sur chaque page de service : sous le bandeau d'urgence et après les prix | Les pages n'avaient aucun bouton d'appel. Mêmes boutons verts que sur l'accueil. |

Vérifié sur capture d'écran et dans le code en ligne : menu sur une ligne, deux boutons d'appel et deux boutons de devis par page.

Demande faite au client : de vraies photos de ses interventions, pour remplacer les images génériques de 2018.

### 13 octobre — Vraies photos d'intervention

Le propriétaire a envoyé 14 photos et 1 vidéo de ses interventions, toutes sur des portes et des serrures. 10 photos retenues : deux doublons écartés, une photo où l'on voit la rue, une serrure de porte d'immeuble peu parlante. La vidéo n'est pas utilisée, pour ne pas alourdir la page.

Préparation : photos allégées (1 200 × 1 600 px, 100 à 380 Ko) et métadonnées supprimées. Les photos partagées n'avaient pas de localisation GPS. Noms de fichiers et descriptions utiles pour Google, par exemple `remplacement-cylindre-porte-appartement-bruxelles.jpg` décrite « Cylindre remplacé sur une porte d'appartement à Bruxelles ».

| # | Intervention | Où |
|---|---|---|
| 19 | 10 photos ajoutées à la médiathèque, avec leurs descriptions | Médiathèque WordPress |
| 20 | Les deux anciennes images de 2018 remplacées par de vraies photos (rosace de protection d'une porte blindée, cylindre usé avant remplacement) | `/porte-blindee-bruxelles/` |
| 21 | Galerie « Nos interventions récentes sur des portes blindées » : 8 photos, avec un avant/après de réparation de serrure électrique Cisa | `/porte-blindee-bruxelles/`, avant la partie blindage et prix |
| 22 | Ancienne icône du bloc porte blindée remplacée par une vraie photo de serrure multipoints | Accueil |

Pourquoi : de vraies photos rassurent les clients (elles prouvent que l'entreprise fait ces interventions) et peuvent apparaître dans Google Images.

Vérifié sur capture d'écran : photos et galerie affichées correctement. Sauvegarde préalable des pages.

### 13 octobre — État de la fiche Google et de la visibilité sur Google Maps

- Données « entreprise locale » : elles apparaissent maintenant dans le code du site (type « Serrurier », adresse de Wemmel, coordonnées, horaires 24h/24). Le Knowledge Graph est encore en « Personne ».
- Fiche Google « Serrurier Lockey » : revendiquée, catégories « Serrurier » et « Service de serrurerie d'urgence », adresse de Wemmel identique au site, 24h/24, **4,9/5 sur 57 avis**, 39 photos. Lien vers le site en `www.` (redirigé correctement vers le site).
- Google Maps ce jour : **2e sur « serrurier wemmel »**, absent du top 20 sur « serrurier bruxelles », « serrurier jette » et « porte blindée bruxelles ».
- Le bouton « Nos avis Google » du haut de page mène bien à la fiche. Le bouton Yelp mène à une ancienne fiche « Lockey Anderlecht ».

### 13 octobre — Page « Serrurier à Wemmel » et widget d'avis

| # | Intervention | Détail |
|---|---|---|
| 23 | Page « Serrurier à Wemmel » publiée | `/serrurier-wemmel/`, la commune où Lockey est installé (2e sur Google Maps pour « serrurier wemmel », 170 recherches par mois). Contenu propre à Wemmel : adresse de l'entreprise, interventions avec liens vers les 3 pages de spécialité, prix, communes voisines (Jette, Laeken, Ganshoren, Asse, Meise), questions fréquentes. Mêmes boutons d'appel et de devis, photos d'intervention et carte Google de l'entreprise. Titre Google « Serrurier Wemmel 24h/24 : dépannage, porte blindée \| LocKey » |
| 24 | Lien « Serrurier Wemmel » ajouté au menu du pied de page | Présent sur toutes les pages, à côté de « Serrurier Uccle » |
| 25 | « Wemmel 1780 » de la liste des communes de l'accueil transformé en lien vers la page | Accueil, zone Brabant flamand |
| 26 | Widget d'avis Google (Trustindex) installé par l'admin | Il reste à le relier à la fiche « Serrurier Lockey » avant de pouvoir l'afficher |

La page reprend l'adresse `/serrurier-wemmel/`, que Google connaissait déjà (ancienne page supprimée). L'ancienne redirection SEOPress `serrurier-wemmel` → accueil a été supprimée le même jour.

Vérifié sur le site en ligne : la page répond, elle est indexable, figure dans le plan du site et apparaît dans le pied de page de toutes les pages et dans la liste des communes de l'accueil. Les boutons d'appel, les photos et la carte sont en place. L'ancienne adresse `/serrurier-ixelles/` renvoie toujours vers l'accueil.

### 13 octobre — Vrais avis Google affichés sur le site

Widget Trustindex relié à la fiche « Serrurier Lockey » (4,9/5, 57 avis) par l'admin, puis placé par l'agence. Sauvegarde préalable des pages.

| # | Intervention | Où |
|---|---|---|
| 27 | Carrousel de 12 témoignages saisis à la main (dont deux textes identiques sous deux noms différents) remplacé par les vrais avis Google, mis à jour automatiquement | Accueil, section « Ce que pensent nos clients de notre entreprise ! » |
| 28 | Bloc « Ce que nos clients disent de nous sur Google » ajouté | Pages Portes blindées, Coffres-forts, Fenêtres et Wemmel, avant la partie prix |

Pourquoi : des avis vérifiables, liés à la fiche Google, inspirent plus confiance que des témoignages saisis à la main, et ils se mettent à jour à chaque nouvel avis.

Vérifié dans le code en ligne : le widget est présent sur les 5 pages, avec les avis de la fiche, et **aucune donnée structurée d'avis n'est ajoutée** (pas d'étoiles auto-déclarées, donc pas de risque de pénalité). Les avis s'affichent au premier défilement de la page, comme le reste des scripts du site.

### 14 octobre — Corrections rapides et état des lieux pour la suite

| # | Intervention | Où |
|---|---|---|
| 29 | Le lien « excellente réputation » menait à une recherche Google de 2018. Il mène maintenant à la fiche Google « Serrurier Lockey » | Accueil |
| 30 | Les 3 cartes Google du site cherchaient « lockey » ou « serrurier lockey ». Elles affichent maintenant l'adresse exacte de l'entreprise à Wemmel | Accueil, Contact, Uccle |
| 31 | Liens vers les 3 pages de spécialité ajoutés | Page Uccle |
| 32 | « nos services d'installation de portes » remplacé par « nos services de blindage de portes » (Lockey ne pose pas de portes neuves) | Accueil |

Mesures du jour :
- **Vitesse mobile** (test Lighthouse) : accueil 59/100 (affichage du contenu principal en 5,3 s), page Portes blindées 70/100 (4,9 s). Principales causes : temps de réponse du serveur (1,5 à 2,2 s) et un rechargement de page déclenché par le « mode invité » de LiteSpeed (jusqu'à 4,5 à 5,5 s perdues selon le test). Aucun décalage de mise en page.
- **Volumes de recherche autour de Wemmel**, en français et en néerlandais (recherches par mois) : slotenmaker vilvoorde 260, slotenmaker asse 110, serrurier/slotenmaker grimbergen 70/90, serrurier/slotenmaker meise 70/50, slotenmaker wemmel 70, slotenmaker brussel 390, slotenmaker 24/7 390. Côté Bruxelles : serrurier jette 480, serrurier laeken 260, serrurier ganshoren 110.
- **Smithlock** (même propriétaire) a déjà des pages Jette et Laeken bien placées (8e et 6e).
- Dépannage.be renvoie bien vers Lockey depuis sa page partenaires.
- Lien direct pour laisser un avis sur la fiche : `https://search.google.com/local/writereview?placeid=ChIJZZRckO7Bw0cR-QScIPn4tKs`

### 18 octobre — Fin des services automobiles

Demande du propriétaire : il ne veut plus être contacté pour des urgences de voiture. Sauvegarde préalable de toutes les pages.

| # | Intervention | Où |
|---|---|---|
| 33 | Page `/serrurier-voiture/` dépubliée (passée en brouillon, donc réversible). Elle renvoie une erreur 404 et a disparu du plan du site | Site |
| 34 | Tous les liens vers la page voiture retirés : phrase « Clés de voiture perdues ? » de l'accueil, lien « les grandes marques de voitures », bouton « Automobile » de la page Tarifs (remplacé par « Portes blindées ») | Accueil, Tarifs |
| 35 | Grille « Services automobile » retirée de la page Tarifs | Tarifs |
| 36 | Pavé « automobile » remplacé par « fenêtres » (avec une image de serrure) dans la grille de services | 7 pages : accueil, Tarifs, Uccle, Portes blindées, Coffres-forts, Fenêtres, Wemmel |
| 37 | Mentions de voiture retirées des textes (clés de voiture, ouverture de portière, verrouillage automobile, « propriétaires de voitures »…) | Accueil, Uccle |
| 38 | Formulaire de contact : choix « AUTOMOBILE » retiré, « DOUBLE DE CLÉ (porte, voiture) » devient « DOUBLE DE CLÉ », choix « SÉCURITÉ DES FENÊTRES » ajouté | Contact |

Vérifié sur le site en ligne : aucune page ne renvoie plus vers la page voiture, et plus aucun texte visible ne propose de service automobile. Seule reste la mention des « véhicules de service » de l'entreprise.

---

## Plan d'action (octobre à décembre 2026)

Classé par effet attendu sur les appels. Les positions sur Google Maps viennent d'abord de la fiche Google et des avis, ensuite du site.

### 1. Fiche Google et avis (effet le plus fort sur Google Maps)

| Action | Qui | Rythme | Statut |
|---|---|---|---|
| Demander un avis à chaque client satisfait, par SMS avec le lien direct | Client | Après chaque intervention, objectif 4 à 5 avis par mois | À lancer |
| Répondre à chaque avis, positif ou négatif, en citant le service rendu (« ouverture de porte blindée à Wemmel… ») | Client ou admin | Sous 48 h | À lancer |
| Publication sur la fiche : une intervention avec photo et un lien vers la page concernée | Admin | Chaque semaine | À lancer |
| Fiche : services (porte blindée, coffre-fort, fenêtres) avec description, lien du site avec suivi, nouvelles photos | Admin | Une fois | À faire |

### 2. Site : pages et contenu

| Action | Qui | Quand | Statut |
|---|---|---|---|
| Pages de commune de la périphérie nord, proches de Wemmel (là où la fiche Google peut se placer) : Vilvoorde, Asse, Grimbergen, Meise. Jette et Laeken restent à Smithlock pour ne pas faire concurrence au même propriétaire | Agence | Une toutes les deux semaines | À valider |
| Version néerlandaise des pages clés (accueil, 3 spécialités, Wemmel) : Wemmel est en Flandre et les recherches en néerlandais sont nombreuses (slotenmaker brussel 390, slotenmaker vilvoorde 260) | Agence | Novembre | À valider |
| Photos de coffres-forts et de fenêtres pour leurs pages | Client | Dès que possible | En attente |

### 3. Technique

| Action | Qui | Quand | Statut |
|---|---|---|---|
| Tester la désactivation du « mode invité » de LiteSpeed (LiteSpeed Cache → Général), puis remesurer la vitesse | Admin + agence | Octobre | À faire |
| Mettre à jour Elementor Pro (toujours en 4.3.0) | Admin | Octobre | À faire |
| Knowledge Graph SEOPress : « Personne » → « Organisation » | Admin | Octobre | À faire |
| Relancer une analyse Wordfence | Admin | Octobre | À faire |
| Demander l'indexation de `/serrurier-wemmel/` et des pages modifiées | Admin | Octobre | À faire |
| Faire disparaître `/serrurier-voiture/` de Google : redirection « 410 » dans SEOPress, et suppression temporaire dans la Search Console | Admin | Octobre | À faire |

### 4. Présence en dehors du site

| Action | Qui | Quand | Statut |
|---|---|---|---|
| Fiche Yelp : adresse d'Anderlecht → Wemmel (ou retirer le bouton Yelp du site) | Client | Octobre | À faire |
| Retirer les services et mentions automobiles de la fiche Google et des autres annuaires | Admin de la fiche | Octobre | À faire |
| Inscriptions dans les annuaires belges (Pages d'Or, Cylex, Infobel, Hotfrog, page Facebook) avec exactement le même nom, la même adresse et le même téléphone : Serrurerie LocKey, Avenue de Limburg Stirum 115, 1780 Wemmel, +32 477 50 44 48 | Agence | Novembre | À planifier |

### 5. Mesure

| Action | Quand |
|---|---|
| Nouvelle mesure DataForSEO (positions, mots-clés, domaines référents) et positions Google Maps sur « serrurier wemmel », « serrurier bruxelles », « porte blindée bruxelles », « coffre fort bruxelles » | Mi-novembre |
| Rapport client de fin de mois à partir de ce journal | Fin octobre |
