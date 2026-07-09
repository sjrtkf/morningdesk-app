-- MorningDesk Supabase prototype table
--
-- How to use:
-- 1. Create a Supabase project.
-- 2. Open SQL Editor.
-- 3. Run this script.
-- 4. In MorningDesk Settings > PC·휴대폰 동기화:
--    - 저장 방식: 온라인 동기화
--    - Supabase URL: Project URL
--    - Supabase anon key: Project API anon public key
--    - 프로필 키: use "안전한 프로필 키 만들기" and reuse the same key on each device.
--
-- Prototype privacy note:
-- This no-login prototype uses a long unguessable profile key as the row id.
-- Do not store company secrets, passwords, API keys, or sensitive personal data.
-- For stronger privacy, add Supabase Auth later and replace these anon policies
-- with auth.uid()-based policies.

create table if not exists public.morningdesk_state (
  id text primary key,
  state jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.morningdesk_state enable row level security;

drop policy if exists "morningdesk prototype read" on public.morningdesk_state;
drop policy if exists "morningdesk prototype insert" on public.morningdesk_state;
drop policy if exists "morningdesk prototype update" on public.morningdesk_state;

create policy "morningdesk prototype read"
on public.morningdesk_state
for select
to anon
using (true);

create policy "morningdesk prototype insert"
on public.morningdesk_state
for insert
to anon
with check (id is not null and length(id) >= 20);

create policy "morningdesk prototype update"
on public.morningdesk_state
for update
to anon
using (id is not null and length(id) >= 20)
with check (id is not null and length(id) >= 20);

create index if not exists morningdesk_state_updated_at_idx
on public.morningdesk_state (updated_at desc);
