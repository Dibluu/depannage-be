-- ── price_matrix table ──────────────────────────────────────
create table if not exists price_matrix (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  updated_at  timestamptz default now(),
  trade       text not null,
  problem     text not null,
  price_min   integer not null,
  price_max   integer not null,
  duration    text not null,
  active      boolean default true
);

-- Enable Row Level Security (optional, recommended for production)
-- alter table price_matrix enable row level security;

-- Allow public reads (booking flow fetches prices)
-- create policy "Public read" on price_matrix for select using (true);

-- Enable realtime
alter publication supabase_realtime add table price_matrix;

-- ── Seed data ─────────────────────────────────────────────────
insert into price_matrix (trade, problem, price_min, price_max, duration) values
  ('Plomberie',   'Fuite d''eau',          89,  149, '1h–2h'),
  ('Plomberie',   'Débouchage',            69,   99, '45min–1h30'),
  ('Plomberie',   'Chauffe-eau',          129,  249, '2h–4h'),
  ('Plomberie',   'Robinetterie',          79,  129, '1h–2h'),
  ('Plomberie',   'WC / Chasse d''eau',    69,  109, '45min–1h30'),
  ('Plomberie',   'Urgence',              149,  249, '1h–3h'),
  ('Électricité', 'Panne générale',        79,  129, '1h–2h'),
  ('Électricité', 'Prise / Interrupteur',  69,   99, '45min–1h'),
  ('Électricité', 'Tableau électrique',   119,  199, '2h–3h'),
  ('Électricité', 'Éclairage',             89,  139, '1h–2h'),
  ('Électricité', 'Mise aux normes',      149,  299, '3h–5h'),
  ('Électricité', 'Urgence électrique',   149,  229, '1h–3h'),
  ('Serrurerie',  'Porte bloquée',         89,  169, '30min–1h30'),
  ('Serrurerie',  'Remplacement serrure',  99,  179, '1h–2h'),
  ('Serrurerie',  'Ouverture de porte',    79,  149, '30min–1h'),
  ('Serrurerie',  'Blindage de porte',    199,  399, '3h–5h'),
  ('Chauffage',   'Chaudière en panne',    99,  199, '1h30–3h'),
  ('Chauffage',   'Radiateur froid',       79,  129, '1h–2h'),
  ('Chauffage',   'Fuite chaudière',      119,  199, '1h30–3h'),
  ('Chauffage',   'Entretien annuel',      89,  139, '1h–2h');
