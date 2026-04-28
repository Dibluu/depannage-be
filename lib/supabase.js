import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null

/*
  Supabase table — run this SQL in your Supabase project:

  create table bookings (
    id          bigint generated always as identity primary key,
    created_at  timestamptz default now(),
    ref         text not null,
    trade       text,
    problem     text,
    price_min   int,
    price_max   int,
    slot_date   text,
    slot_time   text,
    urgent      boolean default false,
    name        text,
    email       text,
    phone       text,
    address     text,
    floor       text,
    description text,
    photo_url   text,
    status      text default 'nouveau'
  );
*/
