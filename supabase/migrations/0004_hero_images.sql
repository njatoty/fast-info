-- Configurable hero carousel images, managed from the admin settings page.
-- Stored as a plain jsonb array on the settings singleton (same pattern as
-- opening_hours/socials) rather than a join table: it's a small,
-- admin-curated list, not a per-entity relational collection.
alter table public.site_settings
  add column hero_images jsonb not null default '[]'::jsonb;
