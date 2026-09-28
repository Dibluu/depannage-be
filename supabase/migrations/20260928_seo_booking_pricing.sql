-- 2026-09-28 — SEO pages, booking flow v2 and price grid v2.
-- Run once in the Supabase SQL editor. Safe to re-run.

-- ── bookings ────────────────────────────────────────────────
create table if not exists bookings (
  id          bigint generated always as identity primary key,
  created_at  timestamptz default now(),
  ref         text not null unique,
  status      text default 'nouveau'
);
alter table bookings
  add column if not exists lang          text,
  add column if not exists trade         text,
  add column if not exists problem       text,
  add column if not exists prestation_id text,
  add column if not exists price_min     int,
  add column if not exists price_max     int,
  add column if not exists surcharge     int default 0,
  add column if not exists travel_fee    int,
  add column if not exists urgent        boolean default false,
  add column if not exists slot_date     text,
  add column if not exists slot_time     text,
  add column if not exists name          text,
  add column if not exists phone         text,
  add column if not exists email         text,
  add column if not exists address       text,
  add column if not exists floor         text,
  add column if not exists postcode      text,
  add column if not exists commune       text,
  add column if not exists region        text,
  add column if not exists description   text,
  add column if not exists photo_url     text,
  add column if not exists source        text;

-- Bookings contain personal data: no public read. The /api/bookings route writes with
-- SUPABASE_SERVICE_ROLE_KEY (bypasses RLS). If you can't set that key, uncomment the insert policy.
alter table bookings enable row level security;
-- create policy "anon insert bookings" on bookings for insert to anon with check (true);

-- Private bucket for booking photos (uploaded by the API route with the service role key).
insert into storage.buckets (id, name, public) values ('booking-photos', 'booking-photos', false)
on conflict (id) do nothing;

-- ── price_matrix v2 ─────────────────────────────────────────
do $$ begin
  alter table price_matrix add constraint price_matrix_trade_problem_key unique (trade, problem);
exception when duplicate_object or duplicate_table then null;
end $$;

-- Old v1 labels are kept but deactivated (history), new grid inserted or updated.
update price_matrix set active = false, updated_at = now()
where (trade, problem) not in (
  ('Serrurerie', 'Ouverture de porte claquée'),
  ('Serrurerie', 'Ouverture de porte fermée à clé'),
  ('Serrurerie', 'Ouverture d’une porte blindée'),
  ('Serrurerie', 'Extraction d’une clé cassée'),
  ('Serrurerie', 'Remplacement d’un cylindre européen'),
  ('Serrurerie', 'Cylindre de sécurité certifié'),
  ('Serrurerie', 'Changement de cylindre après perte de clés'),
  ('Serrurerie', 'Déblocage d’un cylindre grippé'),
  ('Serrurerie', 'Remplacement d’une serrure encastrée'),
  ('Serrurerie', 'Pose d’une serrure multipoints'),
  ('Serrurerie', 'Mise en sécurité après effraction'),
  ('Serrurerie', 'Ouverture d’une porte de garage'),
  ('Serrurerie', 'Ouverture d’une boîte aux lettres'),
  ('Serrurerie', 'Pose d’un verrou de sûreté'),
  ('Serrurerie', 'Dépannage d’un volet roulant bloqué'),
  ('Serrurerie', 'Réglage d’une porte qui ferme mal'),
  ('Plomberie', 'Débouchage d’un WC'),
  ('Plomberie', 'Débouchage d’un évier ou lavabo'),
  ('Plomberie', 'Débouchage d’une douche ou baignoire'),
  ('Plomberie', 'Débouchage d’une colonne d’évacuation'),
  ('Plomberie', 'Recherche de fuite non destructive'),
  ('Plomberie', 'Réparation d’une fuite apparente'),
  ('Plomberie', 'Réparation d’une fuite de chasse d’eau'),
  ('Plomberie', 'Installation d’un robinet ou mitigeur'),
  ('Plomberie', 'Remplacement d’un WC complet'),
  ('Plomberie', 'Remplacement d’un chauffe-eau électrique'),
  ('Plomberie', 'Remplacement d’un groupe de sécurité'),
  ('Plomberie', 'Hydrocurage haute pression'),
  ('Plomberie', 'Inspection caméra d’une canalisation'),
  ('Plomberie', 'Dégel d’une canalisation'),
  ('Électricité', 'Recherche de panne électrique'),
  ('Électricité', 'Rétablissement du courant après disjonction'),
  ('Électricité', 'Recherche d’un court-circuit encastré'),
  ('Électricité', 'Remplacement d’un différentiel'),
  ('Électricité', 'Remplacement d’un disjoncteur'),
  ('Électricité', 'Remplacement d’une prise ou d’un interrupteur'),
  ('Électricité', 'Installation d’un point lumineux'),
  ('Électricité', 'Remplacement d’un tableau électrique'),
  ('Électricité', 'Mise en conformité avant contrôle RGIE'),
  ('Électricité', 'Schéma unifilaire et plan de position'),
  ('Électricité', 'Mise à la terre d’une installation'),
  ('Électricité', 'Raccordement d’une plaque de cuisson'),
  ('Électricité', 'Pose de détecteurs de fumée'),
  ('Électricité', 'Installation d’une borne de recharge'),
  ('Chauffage', 'Dépannage d’une chaudière en panne'),
  ('Chauffage', 'Entretien de chaudière gaz'),
  ('Chauffage', 'Entretien de chaudière mazout'),
  ('Chauffage', 'Réarmement et remise en pression'),
  ('Chauffage', 'Remplacement d’un circulateur'),
  ('Chauffage', 'Remplacement d’un vase d’expansion'),
  ('Chauffage', 'Installation d’un thermostat programmable'),
  ('Chauffage', 'Réparation d’une fuite sur radiateur'),
  ('Chauffage', 'Purge complète et remise en eau'),
  ('Chauffage', 'Désembouage d’un circuit de chauffage'),
  ('Chauffage', 'Dépannage d’une pompe à chaleur'),
  ('Chauffage', 'Remplacement d’une chaudière gaz à condensation'),
  ('Chauffage', 'Analyse de combustion et réglage')
);

insert into price_matrix (trade, problem, price_min, price_max, duration) values
  ('Serrurerie', 'Ouverture de porte claquée', 125, 165, '15–45 min'),
  ('Serrurerie', 'Ouverture de porte fermée à clé', 150, 220, '30 min–1h'),
  ('Serrurerie', 'Ouverture d’une porte blindée', 220, 420, '45 min–2h'),
  ('Serrurerie', 'Extraction d’une clé cassée', 110, 190, '20–45 min'),
  ('Serrurerie', 'Remplacement d’un cylindre européen', 140, 260, '30 min–1h'),
  ('Serrurerie', 'Cylindre de sécurité certifié', 220, 420, '45 min–1h'),
  ('Serrurerie', 'Changement de cylindre après perte de clés', 150, 290, '30 min–1h'),
  ('Serrurerie', 'Déblocage d’un cylindre grippé', 110, 180, '20–45 min'),
  ('Serrurerie', 'Remplacement d’une serrure encastrée', 180, 340, '1h–2h'),
  ('Serrurerie', 'Pose d’une serrure multipoints', 320, 680, '2h–3h'),
  ('Serrurerie', 'Mise en sécurité après effraction', 160, 340, '1h–2h'),
  ('Serrurerie', 'Ouverture d’une porte de garage', 160, 320, '30 min–1h30'),
  ('Serrurerie', 'Ouverture d’une boîte aux lettres', 80, 140, '15–30 min'),
  ('Serrurerie', 'Pose d’un verrou de sûreté', 140, 260, '45 min–1h30'),
  ('Serrurerie', 'Dépannage d’un volet roulant bloqué', 130, 250, '45 min–1h30'),
  ('Serrurerie', 'Réglage d’une porte qui ferme mal', 95, 180, '30 min–1h'),
  ('Plomberie', 'Débouchage d’un WC', 130, 200, '30 min–1h'),
  ('Plomberie', 'Débouchage d’un évier ou lavabo', 130, 200, '30 min–1h'),
  ('Plomberie', 'Débouchage d’une douche ou baignoire', 130, 210, '30 min–1h'),
  ('Plomberie', 'Débouchage d’une colonne d’évacuation', 290, 420, '1h–2h'),
  ('Plomberie', 'Recherche de fuite non destructive', 180, 350, '1h–2h'),
  ('Plomberie', 'Réparation d’une fuite apparente', 120, 250, '45 min–1h30'),
  ('Plomberie', 'Réparation d’une fuite de chasse d’eau', 140, 220, '30 min–1h'),
  ('Plomberie', 'Installation d’un robinet ou mitigeur', 140, 320, '45 min–1h30'),
  ('Plomberie', 'Remplacement d’un WC complet', 280, 550, '2h–3h'),
  ('Plomberie', 'Remplacement d’un chauffe-eau électrique', 450, 900, '2h–4h'),
  ('Plomberie', 'Remplacement d’un groupe de sécurité', 140, 260, '45 min–1h'),
  ('Plomberie', 'Hydrocurage haute pression', 290, 420, '1h–2h'),
  ('Plomberie', 'Inspection caméra d’une canalisation', 150, 250, '45 min–1h'),
  ('Plomberie', 'Dégel d’une canalisation', 150, 320, '1h–2h'),
  ('Électricité', 'Recherche de panne électrique', 110, 180, '45 min–1h30'),
  ('Électricité', 'Rétablissement du courant après disjonction', 110, 220, '45 min–1h30'),
  ('Électricité', 'Recherche d’un court-circuit encastré', 180, 380, '1h–3h'),
  ('Électricité', 'Remplacement d’un différentiel', 180, 360, '1h–2h'),
  ('Électricité', 'Remplacement d’un disjoncteur', 110, 220, '45 min–1h'),
  ('Électricité', 'Remplacement d’une prise ou d’un interrupteur', 90, 150, '30 min–1h'),
  ('Électricité', 'Installation d’un point lumineux', 120, 240, '1h–2h'),
  ('Électricité', 'Remplacement d’un tableau électrique', 450, 1200, '4h–1 jour'),
  ('Électricité', 'Mise en conformité avant contrôle RGIE', 280, 900, '3h–1 jour'),
  ('Électricité', 'Schéma unifilaire et plan de position', 180, 380, '2h–4h'),
  ('Électricité', 'Mise à la terre d’une installation', 380, 950, '4h–1 jour'),
  ('Électricité', 'Raccordement d’une plaque de cuisson', 180, 380, '1h–2h'),
  ('Électricité', 'Pose de détecteurs de fumée', 80, 160, '30 min–1h'),
  ('Électricité', 'Installation d’une borne de recharge', 1200, 2400, '1 jour'),
  ('Chauffage', 'Dépannage d’une chaudière en panne', 150, 320, '1h–2h'),
  ('Chauffage', 'Entretien de chaudière gaz', 120, 180, '1h–1h30'),
  ('Chauffage', 'Entretien de chaudière mazout', 150, 220, '1h30–2h'),
  ('Chauffage', 'Réarmement et remise en pression', 95, 170, '30 min–1h'),
  ('Chauffage', 'Remplacement d’un circulateur', 260, 480, '1h–2h'),
  ('Chauffage', 'Remplacement d’un vase d’expansion', 220, 420, '1h–2h'),
  ('Chauffage', 'Installation d’un thermostat programmable', 180, 380, '1h–2h'),
  ('Chauffage', 'Réparation d’une fuite sur radiateur', 150, 320, '45 min–1h30'),
  ('Chauffage', 'Purge complète et remise en eau', 140, 280, '1h–2h'),
  ('Chauffage', 'Désembouage d’un circuit de chauffage', 450, 850, '1 jour'),
  ('Chauffage', 'Dépannage d’une pompe à chaleur', 180, 420, '1h–3h'),
  ('Chauffage', 'Remplacement d’une chaudière gaz à condensation', 3200, 6500, '1–2 jours'),
  ('Chauffage', 'Analyse de combustion et réglage', 110, 190, '45 min–1h')
on conflict (trade, problem) do update
  set price_min = excluded.price_min, price_max = excluded.price_max,
      duration = excluded.duration, active = true, updated_at = now();

