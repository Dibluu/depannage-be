# Contexte

## Le service
Dépannage.be met en relation des particuliers qui ont une urgence ou un petit chantier à domicile avec des artisans partenaires, pour quatre métiers : serrurerie, plomberie, électricité, chauffage.

- **Zones** : Bruxelles (FR et NL), Brabant wallon ; Brabant flamand prévu (vagues 5 à 7).
- **Promesse** : le prix est annoncé avant l'intervention. Fourchettes TTC (TVA 6 % pour un logement de plus de 10 ans) incluant déplacement, main-d'œuvre et petites fournitures. Frais de déplacement, supplément urgence et frais d'annulation par métier dans `lib/pricing.js`.
- **Parcours client** : choix du métier et du problème → créneau (matin, après-midi, soir ou dès que possible) → adresse et coordonnées, photo facultative → récapitulatif avec prix annoncé. L'artisan rappelle pour confirmer l'heure.
- **Côté Dépannage.be** : chaque demande arrive par e-mail (Resend), par notification push et dans l'appli admin (`/admin/demandes`), avec un lien WhatsApp vers le client.

## Artisans partenaires
Liste et zones dans `lib/partners.js`, page publique `/partenaires`. Serruriers aujourd'hui : Serrurerie LocKey (Wemmel, nord-ouest de Bruxelles), Kiverrou, SmithLock. Les partenaires posent des liens vers Dépannage.be et apparaissent en retour sur les pages de leurs communes (voir `docs/seo.md`).

## Acquisition
Référencement naturel local avant tout : pages par métier, par région et par commune, pages de prix, annuaire des serruriers. Suivi des positions et de l'indexation dans Google Search Console ; Bing est notifié par IndexNow à chaque mise en production.

## Historique
- 2026-04-28 — Première landing page, passage à Next.js, parcours de réservation en 6 étapes, gestion des prix (`/admin/pricing`)
- 2026-05-07 — Landing « partenaires » (agence Google Ads pour artisans) servie sur `/home`
- 2026-09-28 — Pages SEO locales, parcours de réservation v2, grille de prix v2
- 2026-10 — Partenariats serruriers, mentions légales, appli admin avec notifications, SEO de la page d'accueil

## Interlocuteurs
- Mehdi Haik — fondateur, exploitant.
- Coordonnées des artisans : dans le cerveau, pas dans ce repo public.
