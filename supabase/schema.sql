-- Jalankan di Supabase Dashboard > SQL Editor

create extension if not exists "pgcrypto";

create table if not exists public.rsvp (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  attending boolean not null,
  message text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists rsvp_created_at_idx on public.rsvp (created_at desc);

alter table public.rsvp enable row level security;

drop policy if exists "Public can read rsvp" on public.rsvp;
drop policy if exists "Public can insert rsvp" on public.rsvp;

create policy "Public can read rsvp"
  on public.rsvp
  for select
  to anon, authenticated, service_role
  using (true);

create policy "Public can insert rsvp"
  on public.rsvp
  for insert
  to anon, authenticated, service_role
  with check (true);
