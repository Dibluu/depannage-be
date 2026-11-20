# Agents SEO clients (DataForSEO)

Une revue hebdomadaire autonome par site client : relevé DataForSEO, puis analyse et plan d'action rédigés par Claude.

| Client | Dossier | Planification |
|---|---|---|
| Serrurier Kiverrou (kiverrou.be) | `kiverrou/` | chaque lundi vers 6h40 (Bruxelles), tâche planifiée Claude Code |

## Fonctionnement
1. `python3 scripts/seo/dataforseo_weekly.py <client>` : relevé DataForSEO (vue d'ensemble Labs fr+nl, mots-clés positionnés, SERP live géolocalisées, écarts concurrents, backlinks, audit on-page). Il écrit `data/<date>.json` et `rapports/<date>.md`. Coût ≈ 0,4-0,6 $ par run, plafonné par `budget_usd`.
2. `/seo-client <client>` (commande Claude Code) : lit le relevé et l'historique, puis écrit `rapports/<date>-analyse.md` et met à jour `actions.md` et `journal.md`.
3. La tâche planifiée pousse une branche et ouvre une PR. **Merge chaque semaine** : le snapshot de la semaine sert de point de comparaison à la suivante.

## Ajouter un client
Copie `kiverrou/`, puis adapte :
- `config.json` : domaine, mots-clés suivis et leur ville (nom DataForSEO, ex. « Uccle »), concurrents ;
- `AGENT.md` : mission, contexte, règles.

Vide ensuite `rapports/`, `data/` et le journal. Teste avec `--dry` pour voir le coût estimé avant le premier run.

## Identifiants
`DATAFORSEO_LOGIN` / `DATAFORSEO_PASSWORD`. En session cloud Claude, le proxy les injecte : rien à faire. En local, exporte-les avant de lancer le script.
