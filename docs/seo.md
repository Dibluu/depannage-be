# SEO

## Pages locales par vagues
Défini dans `lib/seo/rollout.js`. Une page hors vague active n'est pas générée (404), pour ne jamais être indexée à moitié finie. On passe à la vague suivante en augmentant `SEO_ACTIVE_WAVE` dans Vercel, 2 à 4 semaines après la précédente, une fois l'indexation vérifiée dans Search Console.

| Vague | Métier | Zones | Pages |
|---|---|---|---|
| 1 | Serrurier | Bruxelles FR + NL, Brabant wallon | 69 |
| 2 | Plombier | idem | 69 |
| 3 | Électricien | idem | 69 |
| 4 | Chauffagiste | idem | 69 |
| 5–7 | Les quatre métiers | Brabant flamand (textes par commune à écrire avant d'activer) | — |

## Liens partenaires
- Kit envoyé aux serruriers partenaires : `docs/backlinks/partner-kit.md` (badge, liens contextuels, ancres variées, rythme sur 3–4 semaines).
- Pistes de liens : `docs/backlinks/link-opportunities.csv`, `docs/backlinks/sites-annexes.md`.
- Journal SEO du site de LocKey (prestation pour le partenaire, prochaine mesure mi-novembre 2026) : `docs/backlinks/Partenaire SEO/Lockey.md`.

## Technique en place
- Données structurées (Organization, FAQ) : `lib/seo/schema.js`.
- Canonical sur les pages de réservation (2026-10-07).
- Sitemap et robots : `app/sitemap.js`, `app/robots.js`.
- Vérification Google Search Console (2026-10-02), IndexNow pour Bing.
