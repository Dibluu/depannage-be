# Stack

## Application
- **Next.js 14** (App Router), JavaScript, Tailwind CSS, `lucide-react`.
- Routes FR dans `app/(fr)/`, NL dans `app/(nl)/nl/` ; vocabulaire des métiers dans `lib/trades.js`, textes dans `lib/i18n.js`.
- Pages générées : métier → région → commune (`app/(fr)/[trade]/[region]/[commune]`), pages de prix, annuaire, partenaires, réservation, mentions légales. Images d'aperçu générées par page (`opengraph-image.js`, `lib/seo/og/`).
- `middleware.js` : protection de l'espace admin.

## Données — Supabase
- Tables : `bookings` (demandes, statut `nouveau` par défaut), `price_matrix` (prix modifiables, lecture publique), `push_subscriptions` (notifications de l'appli admin).
- Schéma : `supabase/schema.sql` et `supabase/migrations/`.
- La clé service role ne sert que côté serveur (`/api/bookings`, routes admin).

## Services
- **Vercel** : hébergement, une mise en production par fusion sur `main` (https://depannage-be.vercel.app, domaine www.dépannage.be).
- **Resend** : e-mail de notification de chaque réservation.
- **Web Push** (`web-push`) : notifications de l'appli admin installable (`public/sw-admin.js`, `public/app-admin.webmanifest`).
- **IndexNow** : `.github/workflows/indexnow.yml` + `scripts/indexnow.mjs`, après chaque déploiement de production réussi.
- **DataForSEO** : scripts de recherche locale seulement, jamais exposé au site.
- **Cerveau** : `.github/workflows/cerveau.yml` envoie commits et déploiements au cerveau de Mehdi.

## Variables d'environnement
Liste et rôle dans `.env.local.example`. Valeurs dans Vercel, jamais dans le repo. `SEO_ACTIVE_WAVE` règle la vague de pages locales publiée (voir `docs/seo.md`).
