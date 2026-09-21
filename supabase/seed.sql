-- Generated from src/lib/demo/fixtures.ts via `pnpm seed:generate` — realistic
-- seed content so a fresh Supabase project isn't empty. Images point at the same
-- Unsplash URLs used in demo mode; re-upload real photos via the admin media
-- tools whenever convenient.
begin;

-- product_categories
insert into public.product_categories (id, name, slug, position) values (gen_random_uuid(), 'Téléphones', 'telephones', 0);
insert into public.product_categories (id, name, slug, position) values (gen_random_uuid(), 'Accessoires téléphone', 'accessoires-telephone', 1);
insert into public.product_categories (id, name, slug, position) values (gen_random_uuid(), 'Écrans & réparation', 'ecrans-reparation', 2);
insert into public.product_categories (id, name, slug, position) values (gen_random_uuid(), 'Stockage & câbles', 'stockage-cables', 3);
insert into public.product_categories (id, name, slug, position) values (gen_random_uuid(), 'Audio', 'audio', 4);
insert into public.product_categories (id, name, slug, position) values (gen_random_uuid(), 'Informatique', 'informatique', 5);

-- products
with prod as (
  insert into public.products (id, category_id, name, slug, short_description, description, price, promo_price, availability, is_featured, is_published, position, created_at)
  values (
    gen_random_uuid(),
    (select id from public.product_categories where slug = 'telephones'),
    'Smartphone Galaxy A15', 'smartphone-galaxy-a15', 'Un smartphone fiable et performant pour un usage quotidien.', 'Écran 6,5" fluide, grande autonomie et triple capteur photo : le Galaxy A15 accompagne votre quotidien sans compromis. Livré neuf, sous garantie FastInfo.',
    780000, 720000, 'in_stock'::availability_status,
    true, true, 0, '2026-01-15T09:00:00.000Z'
  )
  returning id
)
insert into public.product_images (product_id, path, alt, width, height, is_main, position)
  select id, 'https://images.unsplash.com/photo-1573148195900-7845dcb9b127?auto=format&fit=crop&w=1200&h=1200&q=80', 'Smartphone Galaxy A15 vu de face', 1200, 1200, true, 0 from prod
  union all
  select id, 'https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?auto=format&fit=crop&w=1200&h=1500&q=80', 'Smartphone Galaxy A15 tenu en main', 1200, 1500, false, 1 from prod;
with prod as (
  insert into public.products (id, category_id, name, slug, short_description, description, price, promo_price, availability, is_featured, is_published, position, created_at)
  values (
    gen_random_uuid(),
    (select id from public.product_categories where slug = 'telephones'),
    'iPhone 12 reconditionné', 'iphone-12-reconditionne', 'iPhone 12 reconditionné, testé et garanti 6 mois.', 'Un iPhone 12 entièrement reconditionné par nos soins : batterie vérifiée, écran sans rayure et fonctionnement testé point par point. Le meilleur rapport qualité-prix pour entrer dans l''écosystème Apple.',
    1650000, null, 'in_stock'::availability_status,
    true, true, 0, '2026-01-10T09:00:00.000Z'
  )
  returning id
)
insert into public.product_images (product_id, path, alt, width, height, is_main, position)
  select id, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1400&h=1050&q=80', 'iPhone 12 posé sur un bureau', 1400, 1050, true, 0 from prod
  union all
  select id, 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=1200&h=1500&q=80', 'iPhone 12 vue de trois quarts', 1200, 1500, false, 1 from prod;
with prod as (
  insert into public.products (id, category_id, name, slug, short_description, description, price, promo_price, availability, is_featured, is_published, position, created_at)
  values (
    gen_random_uuid(),
    (select id from public.product_categories where slug = 'telephones'),
    'Redmi Note 13', 'redmi-note-13', 'Puissance et grand écran AMOLED à prix accessible.', 'Le Redmi Note 13 combine un écran AMOLED 120Hz, une charge rapide et un appareil photo 108 Mpx. Disponible sur commande, livraison sous 3 à 5 jours.',
    590000, null, 'on_order'::availability_status,
    false, true, 0, '2026-02-01T09:00:00.000Z'
  )
  returning id
)
insert into public.product_images (product_id, path, alt, width, height, is_main, position)
  select id, 'https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?auto=format&fit=crop&w=1200&h=1500&q=80', 'Redmi Note 13 tenu en main', 1200, 1500, true, 0 from prod;
with prod as (
  insert into public.products (id, category_id, name, slug, short_description, description, price, promo_price, availability, is_featured, is_published, position, created_at)
  values (
    gen_random_uuid(),
    (select id from public.product_categories where slug = 'accessoires-telephone'),
    'Coque de protection premium', 'coque-protection-premium', 'Protection renforcée aux angles, toucher soft-touch.', 'Une coque fine mais résistante, conçue pour absorber les chocs sans alourdir votre téléphone. Disponible pour la plupart des modèles récents.',
    35000, null, 'in_stock'::availability_status,
    false, true, 0, '2026-01-20T09:00:00.000Z'
  )
  returning id
)
insert into public.product_images (product_id, path, alt, width, height, is_main, position)
  select id, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&h=1200&q=80', 'Coques de protection pour smartphone', 1200, 1200, true, 0 from prod;
with prod as (
  insert into public.products (id, category_id, name, slug, short_description, description, price, promo_price, availability, is_featured, is_published, position, created_at)
  values (
    gen_random_uuid(),
    (select id from public.product_categories where slug = 'accessoires-telephone'),
    'Chargeur rapide 33W', 'chargeur-rapide-33w', 'Charge jusqu''à 2x plus vite que le chargeur standard.', 'Compatible avec la majorité des smartphones Android, ce chargeur 33W recharge votre téléphone en un temps record sans compromettre la durée de vie de la batterie.',
    45000, 39000, 'in_stock'::availability_status,
    true, true, 0, '2026-02-05T09:00:00.000Z'
  )
  returning id
)
insert into public.product_images (product_id, path, alt, width, height, is_main, position)
  select id, 'https://images.unsplash.com/photo-1601524909162-ae8725290836?auto=format&fit=crop&w=1400&h=1050&q=80', 'Chargeur rapide 33W et câble', 1400, 1050, true, 0 from prod;
with prod as (
  insert into public.products (id, category_id, name, slug, short_description, description, price, promo_price, availability, is_featured, is_published, position, created_at)
  values (
    gen_random_uuid(),
    (select id from public.product_categories where slug = 'stockage-cables'),
    'Câble USB-C vers Lightning', 'cable-usbc-lightning', 'Câble tressé renforcé, 1,2 mètre.', 'Un câble résistant à la torsion, idéal pour un usage quotidien intensif. Compatible avec la charge rapide sur iPhone.',
    25000, null, 'in_stock'::availability_status,
    false, true, 0, '2026-01-25T09:00:00.000Z'
  )
  returning id
)
insert into public.product_images (product_id, path, alt, width, height, is_main, position)
  select id, 'https://images.unsplash.com/photo-1585079542156-2755d9c8a094?auto=format&fit=crop&w=1200&h=1200&q=80', 'Câble USB-C vers Lightning enroulé', 1200, 1200, true, 0 from prod;
with prod as (
  insert into public.products (id, category_id, name, slug, short_description, description, price, promo_price, availability, is_featured, is_published, position, created_at)
  values (
    gen_random_uuid(),
    (select id from public.product_categories where slug = 'stockage-cables'),
    'Adaptateur multiport USB-C', 'adaptateur-multiport-usbc', 'HDMI, USB-A et lecteur de carte en un seul boîtier.', 'Transformez votre ordinateur portable en poste de travail complet : sortie HDMI 4K, deux ports USB-A et un lecteur de carte SD/microSD.',
    65000, null, 'in_stock'::availability_status,
    false, true, 0, '2026-02-10T09:00:00.000Z'
  )
  returning id
)
insert into public.product_images (product_id, path, alt, width, height, is_main, position)
  select id, 'https://images.unsplash.com/photo-1546027658-7aa750153465?auto=format&fit=crop&w=1200&h=1200&q=80', 'Adaptateur multiport USB-C', 1200, 1200, true, 0 from prod;
with prod as (
  insert into public.products (id, category_id, name, slug, short_description, description, price, promo_price, availability, is_featured, is_published, position, created_at)
  values (
    gen_random_uuid(),
    (select id from public.product_categories where slug = 'stockage-cables'),
    'Clé USB 64 Go', 'cle-usb-64go', 'Transfert rapide, format compact.', 'Idéale pour vos documents, photos et sauvegardes : 64 Go de stockage dans un format de poche, compatible USB 3.0.',
    32000, 28000, 'in_stock'::availability_status,
    true, true, 0, '2026-01-28T09:00:00.000Z'
  )
  returning id
)
insert into public.product_images (product_id, path, alt, width, height, is_main, position)
  select id, 'https://images.unsplash.com/photo-1512686096451-a15c19314d59?auto=format&fit=crop&w=1200&h=1200&q=80', 'Clé USB 64 Go', 1200, 1200, true, 0 from prod;
with prod as (
  insert into public.products (id, category_id, name, slug, short_description, description, price, promo_price, availability, is_featured, is_published, position, created_at)
  values (
    gen_random_uuid(),
    (select id from public.product_categories where slug = 'ecrans-reparation'),
    'Écran de remplacement iPhone / Samsung', 'ecran-remplacement', 'Écran neuf posé par nos techniciens, garanti 3 mois.', 'Vous avez cassé votre écran ? Nous le remplaçons avec une dalle neuve et une pose soignée en atelier. Modèles courants disponibles sur commande.',
    180000, null, 'on_order'::availability_status,
    false, true, 0, '2026-02-12T09:00:00.000Z'
  )
  returning id
)
insert into public.product_images (product_id, path, alt, width, height, is_main, position)
  select id, 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=1400&h=1050&q=80', 'Réparation d''écran de smartphone', 1400, 1050, true, 0 from prod;
with prod as (
  insert into public.products (id, category_id, name, slug, short_description, description, price, promo_price, availability, is_featured, is_published, position, created_at)
  values (
    gen_random_uuid(),
    (select id from public.product_categories where slug = 'audio'),
    'Casque audio sans fil', 'casque-audio-sans-fil', 'Réduction de bruit et 30h d''autonomie.', 'Un confort d''écoute premium avec réduction de bruit active, une autonomie de 30 heures et un pliage compact pour vos déplacements.',
    220000, 189000, 'in_stock'::availability_status,
    true, true, 0, '2026-01-18T09:00:00.000Z'
  )
  returning id
)
insert into public.product_images (product_id, path, alt, width, height, is_main, position)
  select id, 'https://images.unsplash.com/photo-1585298723682-7115561c51b7?auto=format&fit=crop&w=1200&h=1500&q=80', 'Casque audio sans fil', 1200, 1500, true, 0 from prod
  union all
  select id, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&h=1050&q=80', 'Casque audio sans fil posé sur une table', 1400, 1050, false, 1 from prod;
with prod as (
  insert into public.products (id, category_id, name, slug, short_description, description, price, promo_price, availability, is_featured, is_published, position, created_at)
  values (
    gen_random_uuid(),
    (select id from public.product_categories where slug = 'audio'),
    'Écouteurs Bluetooth intra-auriculaires', 'ecouteurs-bluetooth', 'Légers, étanches, avec boîtier de charge.', 'Des écouteurs sans fil compacts, résistants à la transpiration et à la pluie légère, livrés avec un boîtier de charge offrant jusqu''à 20h d''autonomie totale.',
    95000, null, 'in_stock'::availability_status,
    false, true, 0, '2026-02-02T09:00:00.000Z'
  )
  returning id
)
insert into public.product_images (product_id, path, alt, width, height, is_main, position)
  select id, 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=1200&h=1200&q=80', 'Écouteurs Bluetooth et boîtier de charge', 1200, 1200, true, 0 from prod;
with prod as (
  insert into public.products (id, category_id, name, slug, short_description, description, price, promo_price, availability, is_featured, is_published, position, created_at)
  values (
    gen_random_uuid(),
    (select id from public.product_categories where slug = 'audio'),
    'Casque filaire studio', 'casque-filaire-studio', 'Son fidèle pour la production audio et le montage.', 'Un casque circum-aural filaire pensé pour le monitoring audio : restitution neutre et confort longue durée.',
    75000, null, 'out_of_stock'::availability_status,
    false, true, 0, '2026-01-05T09:00:00.000Z'
  )
  returning id
)
insert into public.product_images (product_id, path, alt, width, height, is_main, position)
  select id, 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&h=1500&q=80', 'Casque filaire de studio', 1200, 1500, true, 0 from prod;
with prod as (
  insert into public.products (id, category_id, name, slug, short_description, description, price, promo_price, availability, is_featured, is_published, position, created_at)
  values (
    gen_random_uuid(),
    (select id from public.product_categories where slug = 'informatique'),
    'Ordinateur portable ProBook 15"', 'ordinateur-probook-15', 'Bureautique et multitâche sans ralentissement.', 'Un ordinateur portable 15 pouces taillé pour la bureautique exigeante et le multitâche : démarrage rapide, clavier confortable et autonomie pour toute la journée.',
    3200000, null, 'in_stock'::availability_status,
    true, true, 0, '2026-01-08T09:00:00.000Z'
  )
  returning id
)
insert into public.product_images (product_id, path, alt, width, height, is_main, position)
  select id, 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&h=1050&q=80', 'Ordinateur portable ouvert sur un bureau', 1400, 1050, true, 0 from prod
  union all
  select id, 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&h=1500&q=80', 'Ordinateur portable en usage', 1200, 1500, false, 1 from prod;
with prod as (
  insert into public.products (id, category_id, name, slug, short_description, description, price, promo_price, availability, is_featured, is_published, position, created_at)
  values (
    gen_random_uuid(),
    (select id from public.product_categories where slug = 'informatique'),
    'Kit clavier & souris sans fil', 'kit-clavier-souris', 'Poste de travail complet, sans fil, prêt à l''emploi.', 'Un clavier et une souris sans fil assortis pour équiper rapidement un poste de travail à la maison ou au bureau.',
    120000, null, 'in_stock'::availability_status,
    false, true, 0, '2026-02-08T09:00:00.000Z'
  )
  returning id
)
insert into public.product_images (product_id, path, alt, width, height, is_main, position)
  select id, 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&h=1050&q=80', 'Kit clavier et souris sans fil', 1400, 1050, true, 0 from prod;

-- services
with svc as (
  insert into public.services (id, title, slug, short_description, description, is_featured, is_published, position)
  values (gen_random_uuid(), 'Photocopie & Impression', 'photocopie-impression', 'Copies et impressions rapides, en noir & blanc ou en couleur.', 'Documents administratifs, dossiers scolaires, supports de présentation : nous imprimons et photocopions rapidement, dans tous les formats courants, avec des finitions soignées sur demande.', true, true, 0)
  returning id
)
insert into public.service_images (service_id, path, alt, width, height, is_cover, position)
  select id, 'https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?auto=format&fit=crop&w=1600&h=1067&q=80', 'Impression de documents en cours', 1600, 1067, true, 0 from svc
  union all
  select id, 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&h=1050&q=80', 'Documents imprimés et classés', 1400, 1050, false, 1 from svc;
with svc as (
  insert into public.services (id, title, slug, short_description, description, is_featured, is_published, position)
  values (gen_random_uuid(), 'Saisie & frappe de documents', 'saisie-frappe-documents', 'Mise en forme et saisie rapide de vos documents.', 'Rapports, mémoires, CV, courriers administratifs : notre équipe saisit et met en page vos documents avec rigueur et dans les délais annoncés.', true, true, 0)
  returning id
)
insert into public.service_images (service_id, path, alt, width, height, is_cover, position)
  select id, 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&h=1067&q=80', 'Saisie de documents sur ordinateur', 1600, 1067, true, 0 from svc
  union all
  select id, 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&h=1500&q=80', 'Poste de travail dédié à la saisie', 1200, 1500, false, 1 from svc;
with svc as (
  insert into public.services (id, title, slug, short_description, description, is_featured, is_published, position)
  values (gen_random_uuid(), 'Prise de photos', 'prise-de-photos', 'Portraits, photos d''identité et prises de vue produit.', 'Besoin d''une photo d''identité, d''un portrait professionnel ou de visuels pour vos produits ? Notre studio s''adapte à votre besoin, avec livraison rapide des fichiers.', false, true, 0)
  returning id
)
insert into public.service_images (service_id, path, alt, width, height, is_cover, position)
  select id, 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1600&h=1067&q=80', 'Matériel de prise de vue photographique', 1600, 1067, true, 0 from svc
  union all
  select id, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&h=1500&q=80', 'Séance photo en extérieur', 1200, 1500, false, 1 from svc;
with svc as (
  insert into public.services (id, title, slug, short_description, description, is_featured, is_published, position)
  values (gen_random_uuid(), 'Photographie d''événements', 'photographie-evenements', 'Anniversaires, séminaires, lancements — capturés avec soin.', 'De l''anniversaire en famille au séminaire d''entreprise, nous couvrons vos événements avec un regard photographique moderne et une livraison soignée de la galerie complète.', true, true, 0)
  returning id
)
insert into public.service_images (service_id, path, alt, width, height, is_cover, position)
  select id, 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1600&h=1067&q=80', 'Photographe en action lors d''un événement', 1600, 1067, true, 0 from svc
  union all
  select id, 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&h=1500&q=80', 'Ambiance d''un événement festif', 1200, 1500, false, 1 from svc
  union all
  select id, 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&h=1067&q=80', 'Public lors d''un événement', 1600, 1067, false, 2 from svc;
with svc as (
  insert into public.services (id, title, slug, short_description, description, is_featured, is_published, position)
  values (gen_random_uuid(), 'Mariages & cérémonies', 'mariages-ceremonies', 'Le plus beau jour, raconté en images.', 'Préparatifs, cérémonie, réception : nous suivons chaque moment fort de votre mariage pour vous livrer une galerie complète et intemporelle.', true, true, 0)
  returning id
)
insert into public.service_images (service_id, path, alt, width, height, is_cover, position)
  select id, 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&h=1500&q=80', 'Cérémonie de mariage', 1200, 1500, true, 0 from svc
  union all
  select id, 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&h=1200&q=80', 'Alliances de mariage', 1200, 1200, false, 1 from svc
  union all
  select id, 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1400&h=1050&q=80', 'Couple de mariés', 1400, 1050, false, 2 from svc;

-- offers
insert into public.offers (id, title, description, image_path, image_alt, image_width, image_height, original_price, promo_price, starts_at, ends_at, is_active, position)
values (gen_random_uuid(), 'Pack rentrée high-tech', 'Accessoires essentiels à prix réduit pour bien démarrer l''année.', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1600&h=1067&q=80', 'Pack d''accessoires high-tech en promotion', 1600, 1067, 250000, 199000, '2026-08-22T17:34:45.124Z', '2026-10-21T17:34:45.124Z', true, 0);
insert into public.offers (id, title, description, image_path, image_alt, image_width, image_height, original_price, promo_price, starts_at, ends_at, is_active, position)
values (gen_random_uuid(), '-15% sur tous les casques audio', 'Une sélection de casques et écouteurs à prix réduit, pour une durée limitée.', 'https://images.unsplash.com/photo-1585298723682-7115561c51b7?auto=format&fit=crop&w=1600&h=1067&q=80', 'Casque audio en promotion', 1600, 1067, 220000, 187000, '2026-09-16T17:34:45.124Z', '2026-10-05T17:34:45.124Z', true, 0);
insert into public.offers (id, title, description, image_path, image_alt, image_width, image_height, original_price, promo_price, starts_at, ends_at, is_active, position)
values (gen_random_uuid(), 'Offre spéciale fête des mères', 'Réduction exceptionnelle sur une sélection de smartphones.', 'https://images.unsplash.com/photo-1573148195900-7845dcb9b127?auto=format&fit=crop&w=1600&h=1067&q=80', 'Smartphone en promotion', 1600, 1067, 850000, 750000, '2026-07-23T17:34:45.124Z', '2026-08-22T17:34:45.124Z', true, 0);
insert into public.offers (id, title, description, image_path, image_alt, image_width, image_height, original_price, promo_price, starts_at, ends_at, is_active, position)
values (gen_random_uuid(), 'Séance photo événement offerte', 'Une heure de couverture photo offerte pour tout forfait mariage réservé ce mois-ci.', 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1600&h=1067&q=80', 'Séance photo événementielle offerte', 1600, 1067, null, null, '2026-10-01T17:34:45.124Z', '2026-10-31T17:34:45.124Z', true, 0);

-- gallery_categories
insert into public.gallery_categories (id, name, slug, position) values (gen_random_uuid(), 'Mariages', 'mariages', 0);
insert into public.gallery_categories (id, name, slug, position) values (gen_random_uuid(), 'Anniversaires', 'anniversaires', 1);
insert into public.gallery_categories (id, name, slug, position) values (gen_random_uuid(), 'Événements d''entreprise', 'evenements-entreprise', 2);
insert into public.gallery_categories (id, name, slug, position) values (gen_random_uuid(), 'Portraits', 'portraits', 3);

-- gallery_items
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'mariages'), 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&h=1500&q=80', 'Cérémonie sous la lumière du soir', 'Cérémonie sous la lumière du soir', 1200, 1500, true, 0);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'mariages'), 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&h=1200&q=80', 'Photo mariages', null, 1200, 1200, true, 1);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'mariages'), 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1400&h=1050&q=80', 'Photo mariages', null, 1400, 1050, true, 2);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'mariages'), 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&h=1600&q=80', 'Photo mariages', null, 1200, 1600, true, 3);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'mariages'), 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1600&h=1067&q=80', 'Photo mariages', null, 1600, 1067, true, 4);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'mariages'), 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&h=1500&q=80', 'Photo mariages', null, 1200, 1500, true, 5);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'mariages'), 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&h=1500&q=80', 'Photo mariages', null, 1200, 1500, true, 6);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'mariages'), 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1400&h=1050&q=80', 'Photo mariages', null, 1400, 1050, true, 7);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'anniversaires'), 'https://images.unsplash.com/photo-1496843916299-590492c751f4?auto=format&fit=crop&w=1200&h=1500&q=80', 'Souffler les bougies', 'Souffler les bougies', 1200, 1500, true, 8);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'anniversaires'), 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1400&h=1050&q=80', 'Photo anniversaires', null, 1400, 1050, true, 9);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'anniversaires'), 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&h=1200&q=80', 'Photo anniversaires', null, 1200, 1200, true, 10);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'anniversaires'), 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&h=1600&q=80', 'Photo anniversaires', null, 1200, 1600, true, 11);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'anniversaires'), 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?auto=format&fit=crop&w=1600&h=1067&q=80', 'Photo anniversaires', null, 1600, 1067, true, 12);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'anniversaires'), 'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?auto=format&fit=crop&w=1200&h=1500&q=80', 'Photo anniversaires', null, 1200, 1500, true, 13);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'anniversaires'), 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&h=1050&q=80', 'Photo anniversaires', null, 1400, 1050, true, 14);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'evenements-entreprise'), 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&h=1050&q=80', 'Séminaire annuel', 'Séminaire annuel', 1400, 1050, true, 15);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'evenements-entreprise'), 'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=1200&h=1500&q=80', 'Photo événements d''entreprise', null, 1200, 1500, true, 16);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'evenements-entreprise'), 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&h=1067&q=80', 'Photo événements d''entreprise', null, 1600, 1067, true, 17);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'evenements-entreprise'), 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&h=1050&q=80', 'Photo événements d''entreprise', null, 1400, 1050, true, 18);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'evenements-entreprise'), 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&h=1200&q=80', 'Photo événements d''entreprise', null, 1200, 1200, true, 19);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'evenements-entreprise'), 'https://images.unsplash.com/photo-1487956382158-bb926046304a?auto=format&fit=crop&w=1200&h=1600&q=80', 'Photo événements d''entreprise', null, 1200, 1600, true, 20);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'evenements-entreprise'), 'https://images.unsplash.com/photo-1550005809-91ad75fb315f?auto=format&fit=crop&w=1600&h=1067&q=80', 'Photo événements d''entreprise', null, 1600, 1067, true, 21);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'portraits'), 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&h=1500&q=80', 'Portrait en lumière naturelle', 'Portrait en lumière naturelle', 1200, 1500, true, 22);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'portraits'), 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?auto=format&fit=crop&w=1200&h=1500&q=80', 'Photo portraits', null, 1200, 1500, true, 23);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'portraits'), 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&h=1600&q=80', 'Photo portraits', null, 1200, 1600, true, 24);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'portraits'), 'https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=1200&h=1200&q=80', 'Photo portraits', null, 1200, 1200, true, 25);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'portraits'), 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&h=1500&q=80', 'Photo portraits', null, 1200, 1500, true, 26);
insert into public.gallery_items (id, category_id, path, alt, caption, width, height, is_published, position)
values (gen_random_uuid(), (select id from public.gallery_categories where slug = 'portraits'), 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&h=1050&q=80', 'Photo portraits', null, 1400, 1050, true, 27);

-- events
with evt as (
  insert into public.events (id, title, slug, category, event_date, end_date, location, description, is_published, position)
  values (gen_random_uuid(), 'Mariage — Antananarivo', 'mariage-antananarivo-mars-2026', 'Mariage', '2026-03-14', null, 'Antananarivo', 'Une cérémonie intime suivie d''une réception en soirée, couverte en intégralité par notre équipe : préparatifs, échange des vœux et premiers instants de fête.', true, 0)
  returning id
)
insert into public.event_images (event_id, path, alt, width, height, is_cover, position)
  select id, 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&h=1500&q=80', 'Cérémonie de mariage à Antananarivo', 1200, 1500, true, 0 from evt
  union all
  select id, 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&h=1200&q=80', 'Alliances échangées', 1200, 1200, false, 1 from evt
  union all
  select id, 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&h=1600&q=80', 'Portrait des mariés', 1200, 1600, false, 2 from evt
  union all
  select id, 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1600&h=1067&q=80', 'Réception de mariage', 1600, 1067, false, 3 from evt
  union all
  select id, 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&h=1500&q=80', 'Instant capturé pendant la réception', 1200, 1500, false, 4 from evt;
with evt as (
  insert into public.events (id, title, slug, category, event_date, end_date, location, description, is_published, position)
  values (gen_random_uuid(), 'Anniversaire 30 ans — Ambohipo', 'anniversaire-30-ans-ambohipo', 'Anniversaire', '2026-05-02', null, 'Ambohipo, Antananarivo', 'Une fête familiale chaleureuse célébrant un 30ème anniversaire, en petit comité.', true, 0)
  returning id
)
insert into public.event_images (event_id, path, alt, width, height, is_cover, position)
  select id, 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1400&h=1050&q=80', 'Ambiance de la fête d''anniversaire', 1400, 1050, true, 0 from evt
  union all
  select id, 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&h=1200&q=80', 'Décoration de la fête', 1200, 1200, false, 1 from evt
  union all
  select id, 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&h=1600&q=80', 'Moment convivial entre proches', 1200, 1600, false, 2 from evt
  union all
  select id, 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?auto=format&fit=crop&w=1600&h=1067&q=80', 'Groupe réuni pour l''occasion', 1600, 1067, false, 3 from evt;
with evt as (
  insert into public.events (id, title, slug, category, event_date, end_date, location, description, is_published, position)
  values (gen_random_uuid(), 'Séminaire entreprise TechCorp', 'seminaire-entreprise-techcorp', 'Événement d''entreprise', '2026-06-18', '2026-06-19', 'Ivato, Antananarivo', 'Deux journées de conférences et d''ateliers pour les équipes de TechCorp, avec couverture photo des interventions et des temps d''échange.', true, 0)
  returning id
)
insert into public.event_images (event_id, path, alt, width, height, is_cover, position)
  select id, 'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=1200&h=1500&q=80', 'Intervention lors du séminaire', 1200, 1500, true, 0 from evt
  union all
  select id, 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&h=1067&q=80', 'Public assistant au séminaire', 1600, 1067, false, 1 from evt
  union all
  select id, 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&h=1050&q=80', 'Moment de networking', 1400, 1050, false, 2 from evt
  union all
  select id, 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&h=1200&q=80', 'Espace d''accueil du séminaire', 1200, 1200, false, 3 from evt;
with evt as (
  insert into public.events (id, title, slug, category, event_date, end_date, location, description, is_published, position)
  values (gen_random_uuid(), 'Mariage — Antsirabe', 'mariage-antsirabe-novembre-2025', 'Mariage', '2025-11-08', null, 'Antsirabe', 'Un mariage traditionnel célébré à Antsirabe, entre cérémonie religieuse et réception festive.', true, 0)
  returning id
)
insert into public.event_images (event_id, path, alt, width, height, is_cover, position)
  select id, 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1600&h=1067&q=80', 'Réception du mariage à Antsirabe', 1600, 1067, true, 0 from evt
  union all
  select id, 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&h=1500&q=80', 'Cérémonie religieuse', 1200, 1500, false, 1 from evt
  union all
  select id, 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&h=1200&q=80', 'Détail des alliances', 1200, 1200, false, 2 from evt
  union all
  select id, 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&h=1500&q=80', 'Portrait des mariés', 1200, 1500, false, 3 from evt;
with evt as (
  insert into public.events (id, title, slug, category, event_date, end_date, location, description, is_published, position)
  values (gen_random_uuid(), 'Baptême & fête de famille', 'bapteme-fete-de-famille', 'Anniversaire', '2026-01-25', null, 'Antananarivo', 'Une célébration familiale mêlant cérémonie de baptême et repas de fête.', true, 0)
  returning id
)
insert into public.event_images (event_id, path, alt, width, height, is_cover, position)
  select id, 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&h=1050&q=80', 'Cérémonie de baptême', 1400, 1050, true, 0 from evt
  union all
  select id, 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1400&h=1050&q=80', 'Repas de fête en famille', 1400, 1050, false, 1 from evt
  union all
  select id, 'https://images.unsplash.com/photo-1487956382158-bb926046304a?auto=format&fit=crop&w=1200&h=1600&q=80', 'Moment partagé en famille', 1200, 1600, false, 2 from evt
  union all
  select id, 'https://images.unsplash.com/photo-1550005809-91ad75fb315f?auto=format&fit=crop&w=1600&h=1067&q=80', 'Ambiance de la célébration', 1600, 1067, false, 3 from evt;

-- site_settings
insert into public.site_settings (id, phone, whatsapp, email, address, city, opening_hours, socials, hero_title, hero_subtitle, map_url)
values (1, '+261 34 12 345 67', '+261 34 12 345 67', 'contact@fastinfo.mg', 'Lot II M 45, Analakely', 'Antananarivo, Madagascar', '[{"day":"Lundi – Vendredi","hours":"08h00 – 18h00"},{"day":"Samedi","hours":"08h30 – 16h00"},{"day":"Dimanche","hours":"Fermé"}]'::jsonb, '[{"platform":"facebook","url":"https://facebook.com/fastinfo.mg"},{"platform":"instagram","url":"https://instagram.com/fastinfo.mg"},{"platform":"tiktok","url":"https://tiktok.com/@fastinfo.mg"}]'::jsonb, 'La technologie, les services et la créativité, réunis.', 'Téléphones, accessoires, impression et photographie d''événements : tout ce dont vous avez besoin, au même endroit à Antananarivo.', 'https://maps.google.com/?q=Analakely+Antananarivo')
on conflict (id) do update set
  phone = excluded.phone, whatsapp = excluded.whatsapp, email = excluded.email,
  address = excluded.address, city = excluded.city, opening_hours = excluded.opening_hours,
  socials = excluded.socials, hero_title = excluded.hero_title, hero_subtitle = excluded.hero_subtitle,
  map_url = excluded.map_url;

commit;
