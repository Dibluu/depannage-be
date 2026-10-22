# Dépannage.be
Client : interne | Statut : actif | Slug cerveau : depannage-be

## Contexte
Plateforme de réservation de dépannage à domicile (serrurier, plombier, électricien, chauffagiste) à Bruxelles et dans le Brabant, en français et en néerlandais. Promesse : le prix est annoncé avant l'intervention. Le client réserve en ligne, la demande est transmise à un artisan partenaire, qui rappelle pour fixer l'heure. L'acquisition repose sur le référencement local (pages par métier et par commune) et les liens des partenaires. Détail : `docs/contexte.md`.

## État actuel
- Fait récemment : page d'accueil retravaillée pour le SEO (H1, sections métier avec prix, FAQ), appli admin installable avec liste des demandes en direct et notifications push, images d'aperçu par page, mentions légales, IndexNow après chaque mise en production — 2026-10-14
- En cours : déploiement progressif des pages locales par vagues (`SEO_ACTIVE_WAVE`, voir `docs/seo.md`) ; liens partenaires (Lockey, Kiverrou, SmithLock)
- Bloqué par : —

## Échéances
—

## Décisions actives
- 2026-09-28 — Grille de prix alignée sur la grille publique du leader belge, modifiable par (métier, problème) dans la table `price_matrix` (Mehdi)
- 2026-09-28 — Pages locales publiées par vagues de 50 à 100 URL, 2 à 4 semaines d'observation entre deux vagues ; une page hors vague renvoie 404 (Mehdi)
- 2026-10-02 — Liens partenaires contextuels et progressifs, jamais de lien dans le pied de page de tout un site (Mehdi)
- 2026-10-04 — Récapitulatif de réservation partagé par l'e-mail, la notification push et l'appli admin, avec un lien WhatsApp (Mehdi)

## Documentation
- Contexte business : `docs/contexte.md`
- Stack : `docs/stack.md`
- SEO (vagues, partenaires, suivi) : `docs/seo.md`
- Liens partenaires : `docs/backlinks/`

## Consignes pour Claude
- Repo **public** : aucun secret, aucune donnée client, aucun chiffre d'affaires dans le code ou dans `docs/`.
- Toute nouvelle page passe par `lib/seo/routes.js` et `lib/seo/rollout.js` : ne jamais publier une page hors vague active.
- Les prix viennent de `lib/pricing.js` (et `price_matrix`) : ne jamais écrire un prix en dur dans une page.
- Textes visibles en FR et NL (`lib/i18n.js`), les deux à la fois.
- Une branche et une PR par sujet (`seo/…`, `admin/…`, `legal/…`), comme l'historique.
