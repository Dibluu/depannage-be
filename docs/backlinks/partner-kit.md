# Kit de liens partenaires — Lockey, Kiverrou et SmithLock

À transmettre aux deux serruriers. Objectif : des liens **contextuels**, depuis les pages de leur site qui parlent déjà de la même commune, vers la page équivalente de Dépannage.be. C'est le modèle qui a donné 1 700 domaines référents à TrustUp (badge « Membre de TrustUp » + liens vers les pages métier).

Règles :
- 1 badge sur la page d'accueil + 4 à 6 liens dans le texte, pas plus au départ.
- Liens posés sur 3–4 semaines, pas tous le même jour.
- Ancres variées : ~50 % marque (« Dépannage.be »), ~25 % URL, ~25 % descriptives. Jamais la même ancre « serrurier + ville » partout.
- Pas de lien dans le pied de page sur toutes les pages (lien « sitewide ») : c'est le schéma que Google repère le plus facilement.
- En retour, chaque partenaire apparaît sur https://www.dépannage.be/partenaires et sur les pages de ses communes.

Adresse du site à utiliser dans les liens : `https://www.xn--dpannage-b1a.be` (forme technique de www.dépannage.be, identique pour les navigateurs).

---

## 1. Badge (page d'accueil des deux partenaires)

À coller dans la section « À propos » ou près des coordonnées, pas dans le pied de page global.

```html
<a href="https://www.xn--dpannage-b1a.be/partenaires" title="Artisan partenaire Dépannage.be — prix annoncés à l'avance">
  <img src="https://www.xn--dpannage-b1a.be/badges/partenaire-depannage.svg" width="220" height="64"
       alt="Partenaire vérifié Dépannage.be — prix annoncés à l'avance" loading="lazy">
</a>
```

Version néerlandaise (pages `slotenmaker-…` de Kiverrou) :

```html
<a href="https://www.xn--dpannage-b1a.be/nl/partners" title="Partner van Dépannage.be">
  <img src="https://www.xn--dpannage-b1a.be/badges/partner-depannage-nl.svg" width="220" height="64"
       alt="Gecontroleerde partner Dépannage.be — prijs vooraf gekend" loading="lazy">
</a>
```

---

## 2. Serrurerie LocKey — serrurerielockey.be

Lockey n'a que 9 pages (pas de pages Jette, Ganshoren, etc. : celles-ci sont chez Smithlock, voir section 2 bis). Trois liens suffisent. Elementor : phrases à coller dans l'éditeur, pas de modification par l'API.

| Page de leur site | Phrase à ajouter (le lien est entre crochets) | Cible sur Dépannage.be |
|---|---|---|
| `/` (section à propos) | Badge « Partenaire vérifié Dépannage.be » (section 1) | `/partenaires` |
| `/prix-serrurerie/` | « Nos tarifs sont aussi publiés, prestation par prestation, sur la [grille de prix de Dépannage.be]. » | `/prix/serrurier` |
| `/serrurier-uccle/` | « Prix affiché avant le déplacement : [réservez un serrurier à Uccle en ligne]. » | `/serrurier/bruxelles/uccle` |

Kiverrou vise aussi Uccle : ancre descriptive ici, ancre de marque chez Kiverrou. `/serrurier-uccle/` est reliée au menu du pied de page depuis le 2 octobre 2026. Badge et lien `/prix-serrurerie/` posés le 2 octobre 2026.

À corriger en même temps sur leur site (voir l'étude de la fiche) : adresse de Wemmel dans le pied de page, bouton « avis » vers la bonne fiche Google.

---

## 2 bis. SmithLock — smithlock.be

Pages Gutenberg : les phrases peuvent être ajoutées par l'API après validation.

| Page de leur site | Phrase à ajouter (le lien est entre crochets) | Cible sur Dépannage.be |
|---|---|---|
| `/` (à propos) | Badge « Partenaire vérifié Dépannage.be » (section 1) | `/partenaires` |
| `/serrurier-jette/` | « Vous préférez réserver en ligne ? [Réservez un serrurier à Jette] avec le prix affiché avant le déplacement. » | `/serrurier/bruxelles/jette` |
| `/serrurier-ganshoren/` | « Nous intervenons aussi via [Dépannage.be] pour les demandes réservées en ligne à Ganshoren. » | `/serrurier/bruxelles/ganshoren` |
| `/serrurier-koekelberg/` | « Prix et réservation en ligne : [www.dépannage.be/serrurier/bruxelles/koekelberg]. » | `/serrurier/bruxelles/koekelberg` |
| `/serrurier-molenbeek/` | « Consultez le [prix d'un serrurier à Molenbeek] avant notre passage. » | `/serrurier/bruxelles/molenbeek-saint-jean` |
| `/serrurier-berchem-sainte-agathe/` | « Réservation en ligne possible via [Dépannage.be]. » | `/serrurier/bruxelles/berchem-sainte-agathe` |

Exemple complet (Jette) :

```html
<p>Vous préférez réserver en ligne ?
  <a href="https://www.xn--dpannage-b1a.be/serrurier/bruxelles/jette">Réservez un serrurier à Jette</a>
  avec le prix affiché avant le déplacement.</p>
```

---

## 3. Serrurier Kiverrou — kiverrou.be

| Page de leur site | Phrase à ajouter | Cible sur Dépannage.be |
|---|---|---|
| `/tarif-serrurier-bruxelles/` | « Ces tarifs sont également publiés sur [Dépannage.be], avec la majoration de nuit et de week-end. » | `/prix/serrurier` |
| `/serrurier-ixelles/` | « [Réservez en ligne à Ixelles] et voyez le prix avant de confirmer. » | `/serrurier/bruxelles/ixelles` |
| `/serrurier-uccle/` | « Réservation en ligne pour Uccle via [Dépannage.be]. » | `/serrurier/bruxelles/uccle` |
| `/serrurier-wavre/` | « Prix d'une ouverture de porte à Wavre : [dépannage.be/serrurier/brabant-wallon/wavre]. » | `/serrurier/brabant-wallon/wavre` |
| `/serrurier-waterloo/` | « Pour une réservation en ligne à Waterloo, passez par [Dépannage.be]. » | `/serrurier/brabant-wallon/waterloo` |
| `/slotenmaker-brussel/` | « U kunt ook [online reserveren via Dépannage.be], met de prijs vooraf gekend. » | `/nl/slotenmaker/brussel` |

⚠️ À signaler à Kiverrou : des dizaines de liens externes pointent vers des adresses `kiverrou.be/?test=70-533.html`, `?test=NSE4.html`… (pages de « dumps » d'examens). C'est typique d'un site WordPress piraté ou utilisé pour du spam. Leur webmaster doit vérifier les fichiers du site et les utilisateurs WordPress avant qu'on y place nos liens.

---

## 4. Ordre de pose conseillé

| Semaine | Lockey | Kiverrou | SmithLock |
|---|---|---|---|
| 1 | Badge + `/prix-serrurerie/` | Badge + `/tarif-serrurier-bruxelles/` | Badge |
| 2 | `/serrurier-uccle/` | Ixelles, Uccle | Jette, Ganshoren |
| 3 | — | Wavre, Waterloo | Koekelberg, Molenbeek |
| 4 | — | `/slotenmaker-brussel/` | Berchem-Sainte-Agathe |

Contrôle : 4 à 6 semaines après, vérifier dans Search Console (Liens) que les pages sont bien vues, et relancer une mesure DataForSEO des domaines référents.
