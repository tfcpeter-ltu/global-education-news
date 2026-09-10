-- LTU BandLab AI — production Supabase schema draft
-- Prepared 2026-09-11
-- IMPORTANT: run only after a dedicated Supabase project is created.
-- Every table in public is protected by RLS. Secret/service-role keys must never be exposed to browsers.

create extension if not exists pgcrypto;
create schema if not exists private;
revoke all on schema private from public;

-- ---------- Core student data ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  current_band numeric(2,1) check (current_band between 1 and 9),
  target_band numeric(2,1) check (target_band between 1 and 9),
  preferred_language text not null default 'zh-Hant',
  timezone text not null default 'Asia/Taipei',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.membership_plans (
  id smallint primary key check (id in (1,2,3)),
  months smallint not null unique check (months in (1,2,3)),
  monthly_price_twd integer not null default 3000 check (monthly_price_twd = 3000),
  total_price_twd integer generated always as (months * monthly_price_twd) stored,
  duration_days integer generated always as (months * 30) stored,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
insert into public.membership_plans(id, months, monthly_price_twd) values
  (1,1,3000),(2,2,3000),(3,3,3000)
on conflict (id) do update set monthly_price_twd = excluded.monthly_price_twd, is_active = true;

create table if not exists public.memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_id smallint not null references public.membership_plans(id),
  status text not null check (status in ('pending','active','expired','cancelled','refunded')),
  starts_at timestamptz,
  expires_at timestamptz,
  payment_order_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((status <> 'active') or (starts_at is not null and expires_at is not null and expires_at > starts_at))
);
create index if not exists memberships_user_status_idx on public.memberships(user_id,status,expires_at desc);

create table if not exists public.payment_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_id smallint not null references public.membership_plans(id),
  amount_twd integer not null check (amount_twd in (3000,6000,9000)),
  provider text not null default 'newebpay',
  merchant_order_no text unique,
  provider_trade_no text,
  status text not null default 'pending' check (status in ('pending','paid','failed','cancelled','refunded')),
  paid_at timestamptz,
  provider_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists payment_orders_user_idx on public.payment_orders(user_id,created_at desc);

-- ---------- 2,000 complete test-set catalogue ----------
create table if not exists public.question_sets (
  id integer primary key check (id between 1 and 2000),
  code text not null unique,
  title text not null,
  topic text not null,
  subtopic text,
  target_band numeric(2,1) not null check (target_band between 1 and 9),
  difficulty text not null check (difficulty in ('foundation','upper_intermediate','advanced')),
  test_type text not null default 'academic' check (test_type in ('academic','general_training')),
  listening_question_count integer not null default 40 check (listening_question_count=40),
  reading_question_count integer not null default 40 check (reading_question_count=40),
  writing_task_count integer not null default 2 check (writing_task_count=2),
  speaking_part_count integer not null default 3 check (speaking_part_count=3),
  qa_status text not null default 'draft' check (qa_status in ('draft','ai_checked','editor_checked','published','retired')),
  content_source text not null default 'LTU Original',
  license_status text not null default 'LTU proprietary original',
  is_published boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists question_sets_published_band_idx on public.question_sets(is_published,target_band,topic);

create table if not exists public.reading_passages (
  id uuid primary key default gen_random_uuid(),
  set_id integer not null references public.question_sets(id) on delete cascade,
  passage_number smallint not null check (passage_number between 1 and 3),
  title text not null,
  body text not null,
  word_count integer,
  vocabulary jsonb not null default '[]'::jsonb,
  grammar_points jsonb not null default '[]'::jsonb,
  unique(set_id, passage_number)
);

create table if not exists public.listening_tracks (
  id uuid primary key default gen_random_uuid(),
  set_id integer not null references public.question_sets(id) on delete cascade,
  part_number smallint not null check (part_number between 1 and 4),
  title text not null,
  transcript text not null,
  audio_path text,
  duration_seconds integer,
  accent_profile text,
  unique(set_id, part_number)
);

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  set_id integer not null references public.question_sets(id) on delete cascade,
  module text not null check (module in ('Listening','Reading','Writing','Speaking')),
  section_no smallint,
  question_number smallint not null,
  question_type text not null,
  prompt text not null,
  options jsonb not null default '[]'::jsonb,
  answer jsonb not null default '{}'::jsonb,
  explanation text,
  distractor_explanations jsonb not null default '{}'::jsonb,
  vocabulary jsonb not null default '[]'::jsonb,
  phrases jsonb not null default '[]'::jsonb,
  grammar_points jsonb not null default '[]'::jsonb,
  solving_strategy text,
  trap_types jsonb not null default '[]'::jsonb,
  weakness_tags jsonb not null default '[]'::jsonb,
  target_band numeric(2,1) check (target_band between 1 and 9),
  qa_status text not null default 'draft' check (qa_status in ('draft','ai_checked','editor_checked','published','retired')),
  metadata jsonb not null default '{}'::jsonb,
  unique(set_id,module,question_number)
);
create index if not exists questions_set_module_idx on public.questions(set_id,module,question_number);
create index if not exists questions_weakness_gin_idx on public.questions using gin(weakness_tags);

-- ---------- Attempts, AI weakness notebook and spaced review ----------
create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  set_id integer references public.question_sets(id),
  module text not null check (module in ('Listening','Reading','Writing','Speaking','Vocabulary','Grammar','Full Mock','Mini Test')),
  status text not null default 'in_progress' check (status in ('in_progress','submitted','scored','abandoned')),
  answers jsonb not null default '{}'::jsonb,
  raw_score numeric,
  max_score numeric,
  band_estimate numeric(2,1) check (band_estimate between 1 and 9),
  duration_seconds integer,
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  updated_at timestamptz not null default now()
);
create index if not exists attempts_user_date_idx on public.attempts(user_id,started_at desc);
create index if not exists attempts_user_module_idx on public.attempts(user_id,module,started_at desc);

create table if not exists public.weaknesses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module text not null,
  tag text not null,
  severity numeric(4,3) not null default 0.5 check (severity between 0 and 1),
  frequency integer not null default 1 check (frequency >= 0),
  mastery_score numeric(4,3) not null default 0 check (mastery_score between 0 and 1),
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  next_review_at timestamptz,
  evidence jsonb not null default '[]'::jsonb,
  unique(user_id,module,tag)
);
create index if not exists weaknesses_priority_idx on public.weaknesses(user_id,severity desc,last_seen_at desc);

create table if not exists public.vocab_queue (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  term text not null,
  meaning_zh text,
  collocations jsonb not null default '[]'::jsonb,
  example_sentence text,
  source_question_id uuid references public.questions(id) on delete set null,
  mastery_score numeric(4,3) not null default 0 check (mastery_score between 0 and 1),
  repetitions integer not null default 0,
  interval_days integer not null default 1,
  due_at timestamptz not null default now(),
  last_reviewed_at timestamptz,
  unique(user_id,term)
);
create index if not exists vocab_queue_due_idx on public.vocab_queue(user_id,due_at);

-- ---------- Personalized 30/60/90-day plans ----------
create table if not exists public.study_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  membership_id uuid references public.memberships(id) on delete set null,
  duration_days integer not null check (duration_days in (30,60,90)),
  current_band numeric(2,1) check (current_band between 1 and 9),
  target_band numeric(2,1) check (target_band between 1 and 9),
  starts_on date not null,
  ends_on date not null,
  status text not null default 'active' check (status in ('active','completed','paused','cancelled')),
  ai_settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_on >= starts_on)
);
create index if not exists study_plans_user_idx on public.study_plans(user_id,status,starts_on desc);

create table if not exists public.study_plan_days (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.study_plans(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  day_number integer not null check (day_number between 1 and 90),
  due_date date not null,
  task_type text not null check (task_type in ('full_mock','weakness_drill','reading','listening','writing','speaking','vocabulary','grammar','review_reset')),
  set_id integer references public.question_sets(id),
  module text,
  title text not null,
  estimated_minutes integer not null default 20,
  task_payload jsonb not null default '{}'::jsonb,
  status text not null default 'pending' check (status in ('pending','started','completed','skipped')),
  completed_at timestamptz,
  unique(plan_id,day_number,task_type,title)
);
create index if not exists study_plan_days_due_idx on public.study_plan_days(user_id,due_date,status);

-- ---------- Writing and Speaking submissions ----------
create table if not exists public.writing_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  set_id integer references public.question_sets(id),
  task_type text not null check (task_type in ('Task 1','Task 2')),
  prompt text not null,
  essay text not null,
  word_count integer not null,
  score_task numeric(2,1),
  score_coherence numeric(2,1),
  score_lexical numeric(2,1),
  score_grammar numeric(2,1),
  overall_band numeric(2,1),
  feedback jsonb not null default '{}'::jsonb,
  status text not null default 'queued' check (status in ('queued','scoring','scored','failed')),
  submitted_at timestamptz not null default now(),
  scored_at timestamptz
);
create index if not exists writing_user_idx on public.writing_submissions(user_id,submitted_at desc);

create table if not exists public.speaking_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  set_id integer references public.question_sets(id),
  part_number smallint not null check (part_number between 1 and 3),
  prompt text not null,
  audio_path text,
  transcript text,
  duration_seconds integer,
  score_fluency numeric(2,1),
  score_lexical numeric(2,1),
  score_grammar numeric(2,1),
  score_pronunciation numeric(2,1),
  overall_band numeric(2,1),
  feedback jsonb not null default '{}'::jsonb,
  status text not null default 'queued' check (status in ('queued','transcribing','scoring','scored','failed')),
  submitted_at timestamptz not null default now(),
  scored_at timestamptz
);
create index if not exists speaking_user_idx on public.speaking_submissions(user_id,submitted_at desc);

-- ---------- Private membership helper used only by RLS ----------
create or replace function private.has_active_membership()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.memberships m
    where m.user_id = (select auth.uid())
      and m.status = 'active'
      and m.starts_at <= now()
      and m.expires_at > now()
  );
$$;
revoke all on function private.has_active_membership() from public;
grant execute on function private.has_active_membership() to authenticated;

-- ---------- RLS ----------
alter table public.profiles enable row level security;
alter table public.membership_plans enable row level security;
alter table public.memberships enable row level security;
alter table public.payment_orders enable row level security;
alter table public.question_sets enable row level security;
alter table public.reading_passages enable row level security;
alter table public.listening_tracks enable row level security;
alter table public.questions enable row level security;
alter table public.attempts enable row level security;
alter table public.weaknesses enable row level security;
alter table public.vocab_queue enable row level security;
alter table public.study_plans enable row level security;
alter table public.study_plan_days enable row level security;
alter table public.writing_submissions enable row level security;
alter table public.speaking_submissions enable row level security;

create policy profiles_select_own on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy profiles_insert_own on public.profiles for insert to authenticated with check ((select auth.uid()) = id);
create policy profiles_update_own on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy membership_plans_read on public.membership_plans for select to anon, authenticated using (is_active = true);
create policy memberships_select_own on public.memberships for select to authenticated using ((select auth.uid()) = user_id);
create policy payment_orders_select_own on public.payment_orders for select to authenticated using ((select auth.uid()) = user_id);
create policy question_sets_paid_read on public.question_sets for select to authenticated using (is_published and (select private.has_active_membership()));
create policy reading_passages_paid_read on public.reading_passages for select to authenticated using ((select private.has_active_membership()));
create policy listening_tracks_paid_read on public.listening_tracks for select to authenticated using ((select private.has_active_membership()));
create policy questions_paid_read on public.questions for select to authenticated using ((select private.has_active_membership()));
create policy attempts_select_own on public.attempts for select to authenticated using ((select auth.uid()) = user_id);
create policy attempts_insert_own on public.attempts for insert to authenticated with check ((select auth.uid()) = user_id);
create policy attempts_update_own on public.attempts for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy weaknesses_select_own on public.weaknesses for select to authenticated using ((select auth.uid()) = user_id);
create policy vocab_queue_select_own on public.vocab_queue for select to authenticated using ((select auth.uid()) = user_id);
create policy study_plans_select_own on public.study_plans for select to authenticated using ((select auth.uid()) = user_id);
create policy study_plan_days_select_own on public.study_plan_days for select to authenticated using ((select auth.uid()) = user_id);
create policy study_plan_days_update_own on public.study_plan_days for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy writing_select_own on public.writing_submissions for select to authenticated using ((select auth.uid()) = user_id);
create policy writing_insert_own on public.writing_submissions for insert to authenticated with check ((select auth.uid()) = user_id);
create policy speaking_select_own on public.speaking_submissions for select to authenticated using ((select auth.uid()) = user_id);
create policy speaking_insert_own on public.speaking_submissions for insert to authenticated with check ((select auth.uid()) = user_id);

-- ---------- Least-privilege grants for Data API ----------
grant usage on schema public to anon, authenticated;
grant select on public.membership_plans to anon, authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select on public.memberships, public.payment_orders to authenticated;
grant select on public.question_sets, public.reading_passages, public.listening_tracks, public.questions to authenticated;
grant select, insert, update on public.attempts to authenticated;
grant select on public.weaknesses, public.vocab_queue, public.study_plans to authenticated;
grant select, update(status,completed_at) on public.study_plan_days to authenticated;
grant select, insert on public.writing_submissions, public.speaking_submissions to authenticated;

-- ---------- Speaking audio bucket ----------
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('speaking-audio','speaking-audio',false,26214400,array['audio/webm','audio/mp4','audio/mpeg','audio/wav'])
on conflict (id) do nothing;

create policy speaking_audio_insert_own on storage.objects
for insert to authenticated
with check (bucket_id='speaking-audio' and (storage.foldername(name))[1] = (select auth.uid())::text);

create policy speaking_audio_select_own on storage.objects
for select to authenticated
using (bucket_id='speaking-audio' and (storage.foldername(name))[1] = (select auth.uid())::text);

-- Payment activation, AI scoring, weakness updates, study-plan generation and question-bank publishing
-- must run server-side (Edge Function / trusted server) with secrets never exposed to the client.
