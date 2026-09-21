-- FastInfo core schema: catalogue, services, offers, gallery, events, settings.
create extension if not exists "pgcrypto";

create type public.availability_status as enum ('in_stock', 'out_of_stock', 'on_order');
create type public.user_role as enum ('admin', 'viewer');

-- ---------------------------------------------------------------------------
-- profiles (mirrors auth.users; role drives admin access everywhere else)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.user_role not null default 'viewer',
  full_name text,
  created_at timestamptz not null default now()
);

-- auth.uid() is wrapped in a `select` so Postgres evaluates it once per
-- statement (an initplan) instead of once per row it checks.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

-- New auth.users rows always start as an unprivileged viewer; promoting to
-- admin is a deliberate manual step (see supabase/README section below).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role, full_name)
  values (new.id, 'viewer', new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Row-level security only blocks writes; this trigger stops an authenticated
-- viewer from granting themselves admin through a legitimate self-update.
create or replace function public.prevent_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role and not public.is_admin() then
    raise exception 'Only admins can change roles';
  end if;
  return new;
end;
$$;

create trigger trg_prevent_role_escalation
before update on public.profiles
for each row execute function public.prevent_role_escalation();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- These three are trigger functions only, never meant to be called directly.
-- Postgres fires triggers based on table-level DML privileges, not
-- function-level EXECUTE, so revoking direct callability here doesn't affect
-- the triggers themselves — it just closes them off as public RPC endpoints
-- (Supabase grants EXECUTE on new public functions to anon/authenticated by
-- default). is_admin() is deliberately left callable: RLS policies invoke it
-- directly, and it only exposes a boolean about the caller's own role.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.prevent_role_escalation() from public, anon, authenticated;
revoke execute on function public.set_updated_at() from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- product catalogue
-- ---------------------------------------------------------------------------
create table public.product_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  position int not null default 0,
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.product_categories (id) on delete set null,
  name text not null,
  slug text not null unique,
  short_description text,
  description text,
  price numeric(12, 2) not null,
  promo_price numeric(12, 2),
  availability public.availability_status not null default 'in_stock',
  is_featured boolean not null default false,
  is_published boolean not null default true,
  position int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint products_promo_price_check check (promo_price is null or promo_price < price)
);

create trigger trg_products_updated_at
before update on public.products
for each row execute function public.set_updated_at();

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  path text not null,
  alt text not null default '',
  width int not null,
  height int not null,
  blur_data_url text,
  is_main boolean not null default false,
  position int not null default 0,
  created_at timestamptz not null default now()
);

create index products_category_id_idx on public.products (category_id);
create index products_published_featured_idx on public.products (is_published, is_featured);
create index product_images_product_id_position_idx on public.product_images (product_id, position);

-- ---------------------------------------------------------------------------
-- services
-- ---------------------------------------------------------------------------
create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  short_description text,
  description text,
  is_featured boolean not null default false,
  is_published boolean not null default true,
  position int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_services_updated_at
before update on public.services
for each row execute function public.set_updated_at();

create table public.service_images (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services (id) on delete cascade,
  path text not null,
  alt text not null default '',
  width int not null,
  height int not null,
  blur_data_url text,
  is_cover boolean not null default false,
  position int not null default 0,
  created_at timestamptz not null default now()
);

create index services_published_idx on public.services (is_published);
create index service_images_service_id_position_idx on public.service_images (service_id, position);

-- ---------------------------------------------------------------------------
-- offers / promotions
-- ---------------------------------------------------------------------------
create table public.offers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_path text,
  image_alt text,
  image_width int,
  image_height int,
  original_price numeric(12, 2),
  promo_price numeric(12, 2),
  starts_at timestamptz,
  ends_at timestamptz,
  is_active boolean not null default true,
  position int not null default 0,
  created_at timestamptz not null default now()
);

create index offers_active_window_idx on public.offers (is_active, starts_at, ends_at);

-- ---------------------------------------------------------------------------
-- photography gallery
-- ---------------------------------------------------------------------------
create table public.gallery_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  position int not null default 0
);

create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.gallery_categories (id) on delete set null,
  path text not null,
  alt text not null default '',
  caption text,
  width int not null,
  height int not null,
  blur_data_url text,
  is_published boolean not null default true,
  position int not null default 0,
  created_at timestamptz not null default now()
);

create index gallery_items_category_position_idx on public.gallery_items (category_id, position);
create index gallery_items_published_idx on public.gallery_items (is_published);

-- ---------------------------------------------------------------------------
-- events / photography projects
-- ---------------------------------------------------------------------------
create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null,
  event_date date not null,
  end_date date,
  location text not null,
  description text,
  is_published boolean not null default true,
  position int not null default 0,
  created_at timestamptz not null default now()
);

create table public.event_images (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  path text not null,
  alt text not null default '',
  width int not null,
  height int not null,
  blur_data_url text,
  is_cover boolean not null default false,
  position int not null default 0,
  created_at timestamptz not null default now()
);

create index events_published_date_idx on public.events (is_published, event_date desc);
create index event_images_event_id_position_idx on public.event_images (event_id, position);

-- ---------------------------------------------------------------------------
-- site settings (single row) + contact inquiries
-- ---------------------------------------------------------------------------
create table public.site_settings (
  id smallint primary key default 1,
  phone text not null default '',
  whatsapp text not null default '',
  email text,
  address text not null default '',
  city text not null default '',
  opening_hours jsonb not null default '[]'::jsonb,
  socials jsonb not null default '[]'::jsonb,
  hero_title text not null default '',
  hero_subtitle text not null default '',
  map_url text,
  updated_at timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);

create trigger trg_site_settings_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index contact_messages_created_at_idx on public.contact_messages (created_at desc);
