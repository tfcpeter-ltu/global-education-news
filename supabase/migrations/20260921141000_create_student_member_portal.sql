create table public.student_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  preferred_name text not null default '',
  grade_level text not null default '',
  curriculum text not null default '',
  target_intake text not null default '',
  is_minor boolean not null default false,
  guardian_consent_confirmed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.navigator_states (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  imported_local_data_at timestamptz,
  updated_at timestamptz not null default now(),
  constraint navigator_state_is_object check (jsonb_typeof(state) = 'object')
);

create table public.communication_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  weekly_news boolean not null default false,
  peter_articles boolean not null default false,
  peter_events boolean not null default false,
  application_deadlines boolean not null default false,
  privacy_notice_version text not null default '2026-09-21',
  updated_at timestamptz not null default now()
);

create table public.consent_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  consent_type text not null check (consent_type in ('privacy','guardian','weekly_news','peter_articles','peter_events','application_deadlines')),
  granted boolean not null,
  notice_version text not null,
  created_at timestamptz not null default now()
);

alter table public.student_profiles enable row level security;
alter table public.navigator_states enable row level security;
alter table public.communication_preferences enable row level security;
alter table public.consent_events enable row level security;

grant select, insert, update on public.student_profiles to authenticated;
grant select, insert, update on public.navigator_states to authenticated;
grant select, insert, update on public.communication_preferences to authenticated;
grant select, insert on public.consent_events to authenticated;
grant usage, select on sequence public.consent_events_id_seq to authenticated;

create policy "students_select_own_profile" on public.student_profiles for select to authenticated using ((select auth.uid()) = user_id);
create policy "students_insert_own_profile" on public.student_profiles for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "students_update_own_profile" on public.student_profiles for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "students_select_own_state" on public.navigator_states for select to authenticated using ((select auth.uid()) = user_id);
create policy "students_insert_own_state" on public.navigator_states for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "students_update_own_state" on public.navigator_states for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "students_select_own_preferences" on public.communication_preferences for select to authenticated using ((select auth.uid()) = user_id);
create policy "students_insert_own_preferences" on public.communication_preferences for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "students_update_own_preferences" on public.communication_preferences for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "students_select_own_consents" on public.consent_events for select to authenticated using ((select auth.uid()) = user_id);
create policy "students_insert_own_consents" on public.consent_events for insert to authenticated with check ((select auth.uid()) = user_id);

create index consent_events_user_created_idx on public.consent_events (user_id, created_at desc);
