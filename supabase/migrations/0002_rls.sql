-- Row-level security: anon/authenticated read published content only;
-- every write requires public.is_admin() (defined in 0001_schema.sql).
--
-- Admin write access is split into separate INSERT/UPDATE/DELETE policies
-- rather than a single FOR ALL policy. FOR ALL also grants SELECT, which
-- would duplicate the "_public_read" policy below it — Postgres then has to
-- OR two permissive policies together on every read instead of evaluating
-- one. The public_read policy's `is_published or is_admin()` (or `using
-- (true)` for taxonomy tables) already gives admins full SELECT access, so
-- splitting off insert/update/delete changes nothing about who can do what.
alter table public.profiles enable row level security;
alter table public.product_categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.services enable row level security;
alter table public.service_images enable row level security;
alter table public.offers enable row level security;
alter table public.gallery_categories enable row level security;
alter table public.gallery_items enable row level security;
alter table public.events enable row level security;
alter table public.event_images enable row level security;
alter table public.site_settings enable row level security;
alter table public.contact_messages enable row level security;

-- profiles ------------------------------------------------------------------
-- auth.uid() is wrapped in `select` so it's evaluated once per statement
-- (an initplan) rather than once per row.
create policy "profiles_select" on public.profiles
  for select using (id = (select auth.uid()) or public.is_admin());

create policy "profiles_update_self_or_admin" on public.profiles
  for update using (id = (select auth.uid()) or public.is_admin())
  with check (id = (select auth.uid()) or public.is_admin());

-- product_categories ---------------------------------------------------------
create policy "product_categories_public_read" on public.product_categories
  for select using (true);

create policy "product_categories_admin_insert" on public.product_categories
  for insert with check (public.is_admin());
create policy "product_categories_admin_update" on public.product_categories
  for update using (public.is_admin()) with check (public.is_admin());
create policy "product_categories_admin_delete" on public.product_categories
  for delete using (public.is_admin());

-- products --------------------------------------------------------------------
create policy "products_public_read" on public.products
  for select using (is_published or public.is_admin());

create policy "products_admin_insert" on public.products
  for insert with check (public.is_admin());
create policy "products_admin_update" on public.products
  for update using (public.is_admin()) with check (public.is_admin());
create policy "products_admin_delete" on public.products
  for delete using (public.is_admin());

-- product_images --------------------------------------------------------------
create policy "product_images_public_read" on public.product_images
  for select using (
    exists (
      select 1 from public.products p
      where p.id = product_images.product_id
        and (p.is_published or public.is_admin())
    )
  );

create policy "product_images_admin_insert" on public.product_images
  for insert with check (public.is_admin());
create policy "product_images_admin_update" on public.product_images
  for update using (public.is_admin()) with check (public.is_admin());
create policy "product_images_admin_delete" on public.product_images
  for delete using (public.is_admin());

-- services ----------------------------------------------------------------------
create policy "services_public_read" on public.services
  for select using (is_published or public.is_admin());

create policy "services_admin_insert" on public.services
  for insert with check (public.is_admin());
create policy "services_admin_update" on public.services
  for update using (public.is_admin()) with check (public.is_admin());
create policy "services_admin_delete" on public.services
  for delete using (public.is_admin());

-- service_images ------------------------------------------------------------------
create policy "service_images_public_read" on public.service_images
  for select using (
    exists (
      select 1 from public.services s
      where s.id = service_images.service_id
        and (s.is_published or public.is_admin())
    )
  );

create policy "service_images_admin_insert" on public.service_images
  for insert with check (public.is_admin());
create policy "service_images_admin_update" on public.service_images
  for update using (public.is_admin()) with check (public.is_admin());
create policy "service_images_admin_delete" on public.service_images
  for delete using (public.is_admin());

-- offers ---------------------------------------------------------------------------
-- Expiry is enforced here, not just in application code: an expired or
-- not-yet-started offer is invisible to anon/authenticated clients even if a
-- query forgets to filter on dates.
create policy "offers_public_read" on public.offers
  for select using (
    (
      is_active
      and (starts_at is null or starts_at <= now())
      and (ends_at is null or ends_at >= now())
    )
    or public.is_admin()
  );

create policy "offers_admin_insert" on public.offers
  for insert with check (public.is_admin());
create policy "offers_admin_update" on public.offers
  for update using (public.is_admin()) with check (public.is_admin());
create policy "offers_admin_delete" on public.offers
  for delete using (public.is_admin());

-- gallery_categories ------------------------------------------------------------------
create policy "gallery_categories_public_read" on public.gallery_categories
  for select using (true);

create policy "gallery_categories_admin_insert" on public.gallery_categories
  for insert with check (public.is_admin());
create policy "gallery_categories_admin_update" on public.gallery_categories
  for update using (public.is_admin()) with check (public.is_admin());
create policy "gallery_categories_admin_delete" on public.gallery_categories
  for delete using (public.is_admin());

-- gallery_items ------------------------------------------------------------------------
create policy "gallery_items_public_read" on public.gallery_items
  for select using (is_published or public.is_admin());

create policy "gallery_items_admin_insert" on public.gallery_items
  for insert with check (public.is_admin());
create policy "gallery_items_admin_update" on public.gallery_items
  for update using (public.is_admin()) with check (public.is_admin());
create policy "gallery_items_admin_delete" on public.gallery_items
  for delete using (public.is_admin());

-- events -----------------------------------------------------------------------------------
create policy "events_public_read" on public.events
  for select using (is_published or public.is_admin());

create policy "events_admin_insert" on public.events
  for insert with check (public.is_admin());
create policy "events_admin_update" on public.events
  for update using (public.is_admin()) with check (public.is_admin());
create policy "events_admin_delete" on public.events
  for delete using (public.is_admin());

-- event_images -----------------------------------------------------------------------------
create policy "event_images_public_read" on public.event_images
  for select using (
    exists (
      select 1 from public.events e
      where e.id = event_images.event_id
        and (e.is_published or public.is_admin())
    )
  );

create policy "event_images_admin_insert" on public.event_images
  for insert with check (public.is_admin());
create policy "event_images_admin_update" on public.event_images
  for update using (public.is_admin()) with check (public.is_admin());
create policy "event_images_admin_delete" on public.event_images
  for delete using (public.is_admin());

-- site_settings -----------------------------------------------------------------------------
create policy "site_settings_public_read" on public.site_settings
  for select using (true);

create policy "site_settings_admin_insert" on public.site_settings
  for insert with check (public.is_admin());
create policy "site_settings_admin_update" on public.site_settings
  for update using (public.is_admin()) with check (public.is_admin());
create policy "site_settings_admin_delete" on public.site_settings
  for delete using (public.is_admin());

-- contact_messages ---------------------------------------------------------------------------
-- Anyone can submit an inquiry; only admins can read/manage the inbox.
create policy "contact_messages_public_insert" on public.contact_messages
  for insert with check (true);

create policy "contact_messages_admin_manage" on public.contact_messages
  for select using (public.is_admin());

create policy "contact_messages_admin_update" on public.contact_messages
  for update using (public.is_admin()) with check (public.is_admin());

create policy "contact_messages_admin_delete" on public.contact_messages
  for delete using (public.is_admin());
