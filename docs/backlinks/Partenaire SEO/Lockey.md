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

---

## Reste à faire

| Quand | Action | Statut |
|---|---|---|
| Octobre, sem. 1 | Analyse de sécurité ponctuelle (Wordfence, version gratuite). Vérifier au passage l'ancienne redirection SEOPress `h/6791837.html` → `/disallow/`, qui ressemble à une trace de spam | À faire |
| Octobre, sem. 2 à 4 | Lien depuis `/serrurier-uccle/` vers Dépannage.be | Possible maintenant que la page est reliée au menu |
| Mois 2 et 3 | Pages de commune réelles (Wemmel, Laeken, Jette) : Lockey est déjà 8e sur « serrurier wemmel » avec sa seule page d'accueil | À planifier |
| Mois 2 et 3 | Reconstruire `/depannage-serrure/` dans Elementor à partir de son ancien texte, puis retirer la redirection | À planifier |
| Mois 2 et 3 | Versions néerlandaise et anglaise | À planifier |
| Mi-novembre | Nouvelle mesure DataForSEO et comparaison avec la situation de départ | À planifier |
