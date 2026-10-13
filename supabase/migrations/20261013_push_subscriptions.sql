-- 2026-10-13 — Push notifications for the admin app (lib/push.js).
-- One row per device that enabled notifications in /admin/demandes.
create table if not exists push_subscriptions (
  endpoint    text primary key,
  p256dh      text not null,
  auth        text not null,
  user_agent  text,
  created_at  timestamptz default now()
);

-- No policy: only the service role (server) reads and writes.
alter table push_subscriptions enable row level security;
