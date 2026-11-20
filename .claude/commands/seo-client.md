---
description: Revue SEO hebdomadaire autonome d'un site client via DataForSEO (mesurer, évaluer, décider, livrer, consigner)
argument-hint: <client> (ex. kiverrou)
---

Client : `$ARGUMENTS` (dossier `seo/clients/$ARGUMENTS/`). Lis d'abord `seo/clients/$ARGUMENTS/AGENT.md` et suis-le.

1. **Mesurer** : exécute `python3 scripts/seo/dataforseo_weekly.py $ARGUMENTS` une seule fois. Si un rapport du jour existe déjà dans `rapports/`, ne relance pas : réutilise-le.
2. **Lire** : le rapport du jour, la dernière analyse (`rapports/*-analyse.md`), `actions.md` et `journal.md`. Pour le détail, ouvre le snapshot JSON du jour dans `data/`.
3. **Évaluer** : pour chaque action du journal appliquée il y a 2 cycles ou plus, renseigne l'effet observé (position, local pack, ETV) dans la colonne Résultat.
4. **Décider** : choisis au maximum 5 actions à plus fort impact, selon les leviers d'AGENT.md. Vérifie les signaux faibles :
   - baisse d'au moins 3 places sur un mot-clé suivi ;
   - sortie du top 50 ;
   - nouvelle vague de domaines référents à spam score ≥ 50 ;
   - page on-page en erreur ;
   - concurrent qui entre dans le top 3.
5. **Livrer** : écris `rapports/<date>-analyse.md` avec des livrables prêts à appliquer (textes exacts). Mets à jour `actions.md`.
6. **Consigner** : mets à jour `journal.md`.
7. **Résumer** : termine par le résumé court du haut de l'analyse.
