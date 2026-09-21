/**
 * Regenerates supabase/seed.sql from src/lib/demo/fixtures.ts.
 * Run after editing fixtures: pnpm seed:generate > supabase/seed.sql
 */
import {
  demoEvents,
  demoGalleryCategories,
  demoGalleryItems,
  demoOffers,
  demoProductCategories,
  demoProducts,
  demoServices,
  demoSiteSettings,
} from "../src/lib/demo/fixtures";

function sqlStr(value: string | null | undefined): string {
  if (value === null || value === undefined) return "null";
  return `'${value.replace(/'/g, "''")}'`;
}

function sqlNum(value: number | null | undefined): string {
  if (value === null || value === undefined) return "null";
  return String(value);
}

function sqlBool(value: boolean): string {
  return value ? "true" : "false";
}

function sqlJson(value: unknown): string {
  return `'${JSON.stringify(value).replace(/'/g, "''")}'::jsonb`;
}

const lines: string[] = [];
lines.push("-- Generated from src/lib/demo/fixtures.ts via `pnpm seed:generate` — realistic");
lines.push("-- seed content so a fresh Supabase project isn't empty. Images point at the same");
lines.push("-- Unsplash URLs used in demo mode; re-upload real photos via the admin media");
lines.push("-- tools whenever convenient.");
lines.push("begin;");
lines.push("");

lines.push("-- product_categories");
for (const c of demoProductCategories) {
  lines.push(
    `insert into public.product_categories (id, name, slug, position) values (gen_random_uuid(), ${sqlStr(c.name)}, ${sqlStr(c.slug)}, ${sqlNum(c.position)});`,
  );
}
lines.push("");

lines.push("-- products");
for (const p of demoProducts) {
  lines.push(
    `with prod as (
  insert into public.products (id, category_id, name, slug, short_description, description, price, promo_price, availability, is_featured, is_published, position, created_at)
  values (
    gen_random_uuid(),
    (select id from public.product_categories where slug = ${sqlStr(p.category?.slug ?? null)}),
    ${sqlStr(p.name)}, ${sqlStr(p.slug)}, ${sqlStr(p.shortDescription)}, ${sqlStr(p.description)},
    ${sqlNum(p.price)}, ${sqlNum(p.promoPrice)}, ${sqlStr(p.availability)}::availability_status,
    ${sqlBool(p.isFeatured)}, ${sqlBool(p.isPublished)}, 0, ${sqlStr(p.createdAt)}
  )
  returning id
)`,
  );
  const imageInserts = p.images
    .map(
      (img, i) =>
        `  select id, ${sqlStr(img.url)}, ${sqlStr(img.alt)}, ${sqlNum(img.width)}, ${sqlNum(img.height)}, ${sqlBool(i === 0)}, ${sqlNum(i)} from prod`,
    )
    .join("\n  union all\n");
  lines.push(
    `insert into public.product_images (product_id, path, alt, width, height, is_main, position)\n${imageInserts};`,
  );
}
lines.push("");

lines.push("-- services");
for (const s of demoServices) {
  lines.push(
    `with svc as (
  insert into public.services (id, title, slug, short_description, description, is_featured, is_published, position)
  values (gen_random_uuid(), ${sqlStr(s.title)}, ${sqlStr(s.slug)}, ${sqlStr(s.shortDescription)}, ${sqlStr(s.description)}, ${sqlBool(s.isFeatured)}, ${sqlBool(s.isPublished)}, 0)
  returning id
)`,
  );
  const imageInserts = s.gallery
    .map(
      (img, i) =>
        `  select id, ${sqlStr(img.url)}, ${sqlStr(img.alt)}, ${sqlNum(img.width)}, ${sqlNum(img.height)}, ${sqlBool(i === 0)}, ${sqlNum(i)} from svc`,
    )
    .join("\n  union all\n");
  lines.push(
    `insert into public.service_images (service_id, path, alt, width, height, is_cover, position)\n${imageInserts};`,
  );
}
lines.push("");

lines.push("-- offers");
for (const o of demoOffers) {
  lines.push(
    `insert into public.offers (id, title, description, image_path, image_alt, image_width, image_height, original_price, promo_price, starts_at, ends_at, is_active, position)
values (gen_random_uuid(), ${sqlStr(o.title)}, ${sqlStr(o.description)}, ${sqlStr(o.image?.url)}, ${sqlStr(o.image?.alt)}, ${sqlNum(o.image?.width)}, ${sqlNum(o.image?.height)}, ${sqlNum(o.originalPrice)}, ${sqlNum(o.promoPrice)}, ${sqlStr(o.startsAt)}, ${sqlStr(o.endsAt)}, ${sqlBool(o.isActive)}, 0);`,
  );
}
lines.push("");

lines.push("-- gallery_categories");
for (const c of demoGalleryCategories) {
  lines.push(
    `insert into public.gallery_categories (id, name, slug, position) values (gen_random_uuid(), ${sqlStr(c.name)}, ${sqlStr(c.slug)}, ${sqlNum(c.position)});`,
  );
}
lines.push("");

lines.push("-- gallery_items");
for (const item of demoGalleryItems) {
  lines.push(
    `insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = ${sqlStr(item.category?.slug ?? null)}), ${sqlStr(item.image.url)}, ${sqlStr(item.image.alt)}, ${sqlStr(item.caption)}, ${sqlNum(item.image.width)}, ${sqlNum(item.image.height)}, true, ${sqlNum(item.position)});`,
  );
}
lines.push("");

lines.push("-- events");
for (const e of demoEvents) {
  lines.push(
    `with evt as (
  insert into public.events (id, title, slug, category, event_date, end_date, location, description, is_published, position)
  values (gen_random_uuid(), ${sqlStr(e.title)}, ${sqlStr(e.slug)}, ${sqlStr(e.category)}, ${sqlStr(e.date)}, ${sqlStr(e.endDate)}, ${sqlStr(e.location)}, ${sqlStr(e.description)}, ${sqlBool(e.isPublished)}, 0)
  returning id
)`,
  );
  const imageInserts = e.gallery
    .map(
      (img, i) =>
        `  select id, ${sqlStr(img.url)}, ${sqlStr(img.alt)}, ${sqlNum(img.width)}, ${sqlNum(img.height)}, ${sqlBool(i === 0)}, ${sqlNum(i)} from evt`,
    )
    .join("\n  union all\n");
  lines.push(
    `insert into public.event_images (event_id, path, alt, width, height, is_cover, position)\n${imageInserts};`,
  );
}
lines.push("");

lines.push("-- site_settings");
lines.push(
  `insert into public.site_settings (id, phone, whatsapp, email, address, city, opening_hours, socials, hero_title, hero_subtitle, map_url)
values (1, ${sqlStr(demoSiteSettings.phone)}, ${sqlStr(demoSiteSettings.whatsapp)}, ${sqlStr(demoSiteSettings.email)}, ${sqlStr(demoSiteSettings.address)}, ${sqlStr(demoSiteSettings.city)}, ${sqlJson(demoSiteSettings.openingHours)}, ${sqlJson(demoSiteSettings.socials)}, ${sqlStr(demoSiteSettings.heroTitle)}, ${sqlStr(demoSiteSettings.heroSubtitle)}, ${sqlStr(demoSiteSettings.mapUrl)})
on conflict (id) do update set
  phone = excluded.phone, whatsapp = excluded.whatsapp, email = excluded.email,
  address = excluded.address, city = excluded.city, opening_hours = excluded.opening_hours,
  socials = excluded.socials, hero_title = excluded.hero_title, hero_subtitle = excluded.hero_subtitle,
  map_url = excluded.map_url;`,
);
lines.push("");
lines.push("commit;");

console.log(lines.join("\n"));
