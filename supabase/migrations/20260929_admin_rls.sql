-- 2026-09-29 — Lock down price_matrix. Run AFTER deploying the version where /admin/pricing
-- writes through /api/admin/prices (service role key). Before that, the admin would stop saving.

alter table price_matrix enable row level security;

-- Public (anon) can only read the grid — the website and booking flow need it.
drop policy if exists "Public read" on price_matrix;
create policy "Public read" on price_matrix for select to anon, authenticated using (true);

-- No insert/update/delete policy: only the service role (server) can write.
-- Realtime isn't needed anymore by the admin page.
do $$ begin
  alter publication supabase_realtime drop table price_matrix;
exception when others then null;
end $$;
