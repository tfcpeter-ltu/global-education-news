
create table public.guidance_teachers (
 user_id uuid primary key references auth.users(id) on delete cascade,
 email text not null, name text not null check(length(name) between 1 and 100),
 school text not null check(length(school) between 1 and 150),
 subjects text not null check(length(subjects) between 1 and 200),
 status text not null default 'pending' check(status in ('pending','approved','rejected')),
 created_at timestamptz not null default now(), reviewed_at timestamptz, reviewed_by uuid references auth.users(id)
);
alter table public.guidance_teachers enable row level security;
grant select,update on public.guidance_teachers to authenticated;
revoke all on public.guidance_teachers from anon;
create policy "Teachers read own application" on public.guidance_teachers for select to authenticated using(user_id=(select auth.uid()) or (lower(coalesce((select auth.jwt()->>'email'),'')) = any(array['blythacademy.taiwan@gmail.com','tfcpeter@gmail.com','editor.jsti.ltu@gmail.com'])));
create policy "Admins review teachers" on public.guidance_teachers for update to authenticated using(lower(coalesce((select auth.jwt()->>'email'),'')) = any(array['blythacademy.taiwan@gmail.com','tfcpeter@gmail.com','editor.jsti.ltu@gmail.com'])) with check(lower(coalesce((select auth.jwt()->>'email'),'')) = any(array['blythacademy.taiwan@gmail.com','tfcpeter@gmail.com','editor.jsti.ltu@gmail.com']));
create schema if not exists guidance_private;
revoke all on schema guidance_private from public,anon,authenticated;
create function guidance_private.register_teacher() returns trigger language plpgsql security definer set search_path='' as $$
begin
 if new.raw_user_meta_data->>'requested_role'='guidance_teacher' then
 insert into public.guidance_teachers(user_id,email,name,school,subjects)
 values(new.id,new.email,left(trim(coalesce(new.raw_user_meta_data->>'name','')),100),left(trim(coalesce(new.raw_user_meta_data->>'school','')),150),left(trim(coalesce(new.raw_user_meta_data->>'subjects','')),200));
 end if;
 return new;
end;
$$;
revoke all on function guidance_private.register_teacher() from public,anon,authenticated;
create trigger guidance_teacher_signup after insert on auth.users for each row execute function guidance_private.register_teacher();
create policy "Approved teachers read" on public.guidance_students for select to authenticated using(exists(select 1 from public.guidance_teachers t where t.user_id=(select auth.uid()) and t.status='approved'));
create policy "Approved teachers add students" on public.guidance_students for insert to authenticated with check(exists(select 1 from public.guidance_teachers t where t.user_id=(select auth.uid()) and t.status='approved'));create policy "Approved teachers update students" on public.guidance_students for update to authenticated using(exists(select 1 from public.guidance_teachers t where t.user_id=(select auth.uid()) and t.status='approved')) with check(exists(select 1 from public.guidance_teachers t where t.user_id=(select auth.uid()) and t.status='approved'));
create policy "Approved teachers read" on public.guidance_consultations for select to authenticated using(exists(select 1 from public.guidance_teachers t where t.user_id=(select auth.uid()) and t.status='approved'));
create policy "Approved teachers read" on public.guidance_metadata for select to authenticated using(exists(select 1 from public.guidance_teachers t where t.user_id=(select auth.uid()) and t.status='approved'));
grant insert on public.guidance_teachers to authenticated; create policy "Teachers submit own pending application" on public.guidance_teachers for insert to authenticated with check(user_id=(select auth.uid()) and email=(select auth.jwt()->>'email') and status='pending' and reviewed_at is null and reviewed_by is null);