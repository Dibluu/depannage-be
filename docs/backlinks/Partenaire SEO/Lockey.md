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

---

## Reste à faire

| Quand | Action | Statut |
|---|---|---|
| Octobre | Mettre à jour Elementor Pro (4.3.0 → 4.3.1) maintenant que la licence est renouvelée | À faire dans l'admin |
| Octobre | Données structurées « entreprise locale » dans SEOPress PRO (serrurier, adresse de Wemmel, téléphone, 24h/24) et passer le Knowledge Graph de « Personne » à « Organisation » | À faire dans l'admin |
| Octobre | Relancer une analyse Wordfence | À faire dans l'admin |
| Octobre | Recevoir les photos du serrurier et les intégrer aux pages de service et à l'accueil | En attente du client |
| Octobre | Vérifier l'apparition des données « entreprise locale » (module SEOPress à activer, Knowledge Graph en « Organisation ») | À vérifier |
| Mois 2 et 3 | Pages de commune réelles (Wemmel, Laeken, Jette). Une fois la page Wemmel créée, faire pointer la redirection `serrurier-wemmel` vers elle | À planifier |
| Mois 2 et 3 | Reconstruire `/depannage-serrure/` dans Elementor à partir de son ancien texte, puis retirer la redirection | À planifier |
| Mois 2 et 3 | Versions néerlandaise et anglaise | À planifier |
| Mi-novembre | Nouvelle mesure DataForSEO et comparaison avec la situation de départ, y compris sur les nouvelles spécialités | À planifier |
