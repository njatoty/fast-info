import { demoImage, type DemoPhotoKey } from "@/lib/demo/images";
import type {
  EventProject,
  GalleryCategory,
  GalleryItem,
  MediaImage,
  Offer,
  Product,
  ProductCategory,
  Service,
  SiteSettings,
} from "@/types/domain";

let imgSeq = 0;
function img(key: DemoPhotoKey, width: number, height: number, alt: string, position = 0): MediaImage {
  imgSeq += 1;
  return { id: `img-${imgSeq}`, url: demoImage(key, width, height), alt, width, height, position };
}

// ---------------------------------------------------------------------------
// Product catalogue
// ---------------------------------------------------------------------------
export const demoProductCategories: ProductCategory[] = [
  { id: "cat-telephones", name: "Téléphones", slug: "telephones", position: 0 },
  { id: "cat-accessoires", name: "Accessoires téléphone", slug: "accessoires-telephone", position: 1 },
  { id: "cat-ecrans", name: "Écrans & réparation", slug: "ecrans-reparation", position: 2 },
  { id: "cat-stockage", name: "Stockage & câbles", slug: "stockage-cables", position: 3 },
  { id: "cat-audio", name: "Audio", slug: "audio", position: 4 },
  { id: "cat-informatique", name: "Informatique", slug: "informatique", position: 5 },
];

const cat = (slug: string) => demoProductCategories.find((c) => c.slug === slug)!;

type ProductDraft = Omit<Product, "mainImage">;

const productDrafts = [
  {
    id: "prod-galaxy-a15",
    name: "Smartphone Galaxy A15",
    slug: "smartphone-galaxy-a15",
    shortDescription: "Un smartphone fiable et performant pour un usage quotidien.",
    description:
      "Écran 6,5\" fluide, grande autonomie et triple capteur photo : le Galaxy A15 accompagne votre quotidien sans compromis. Livré neuf, sous garantie FastInfo.",
    category: cat("telephones"),
    price: 780000,
    promoPrice: 720000,
    availability: "in_stock",
    isFeatured: true,
    isPublished: true,
    images: [
      img("smartphoneFlat", 1200, 1200, "Smartphone Galaxy A15 vu de face", 0),
      img("smartphoneHand", 1200, 1500, "Smartphone Galaxy A15 tenu en main", 1),
    ],
    createdAt: "2026-01-15T09:00:00.000Z",
  },
  {
    id: "prod-iphone-12",
    name: "iPhone 12 reconditionné",
    slug: "iphone-12-reconditionne",
    shortDescription: "iPhone 12 reconditionné, testé et garanti 6 mois.",
    description:
      "Un iPhone 12 entièrement reconditionné par nos soins : batterie vérifiée, écran sans rayure et fonctionnement testé point par point. Le meilleur rapport qualité-prix pour entrer dans l'écosystème Apple.",
    category: cat("telephones"),
    price: 1650000,
    promoPrice: null,
    availability: "in_stock",
    isFeatured: true,
    isPublished: true,
    images: [
      img("phoneOnDesk", 1400, 1050, "iPhone 12 posé sur un bureau", 0),
      img("smartphoneAngle", 1200, 1500, "iPhone 12 vue de trois quarts", 1),
    ],
    createdAt: "2026-01-10T09:00:00.000Z",
  },
  {
    id: "prod-redmi-note-13",
    name: "Redmi Note 13",
    slug: "redmi-note-13",
    shortDescription: "Puissance et grand écran AMOLED à prix accessible.",
    description:
      "Le Redmi Note 13 combine un écran AMOLED 120Hz, une charge rapide et un appareil photo 108 Mpx. Disponible sur commande, livraison sous 3 à 5 jours.",
    category: cat("telephones"),
    price: 590000,
    promoPrice: null,
    availability: "on_order",
    isFeatured: false,
    isPublished: true,
    images: [img("smartphoneHand", 1200, 1500, "Redmi Note 13 tenu en main", 0)],
    createdAt: "2026-02-01T09:00:00.000Z",
  },
  {
    id: "prod-coque",
    name: "Coque de protection premium",
    slug: "coque-protection-premium",
    shortDescription: "Protection renforcée aux angles, toucher soft-touch.",
    description:
      "Une coque fine mais résistante, conçue pour absorber les chocs sans alourdir votre téléphone. Disponible pour la plupart des modèles récents.",
    category: cat("accessoires-telephone"),
    price: 35000,
    promoPrice: null,
    availability: "in_stock",
    isFeatured: false,
    isPublished: true,
    images: [img("accessoriesFlatlay", 1200, 1200, "Coques de protection pour smartphone", 0)],
    createdAt: "2026-01-20T09:00:00.000Z",
  },
  {
    id: "prod-chargeur-33w",
    name: "Chargeur rapide 33W",
    slug: "chargeur-rapide-33w",
    shortDescription: "Charge jusqu'à 2x plus vite que le chargeur standard.",
    description:
      "Compatible avec la majorité des smartphones Android, ce chargeur 33W recharge votre téléphone en un temps record sans compromettre la durée de vie de la batterie.",
    category: cat("accessoires-telephone"),
    price: 45000,
    promoPrice: 39000,
    availability: "in_stock",
    isFeatured: true,
    isPublished: true,
    images: [img("chargerCable", 1400, 1050, "Chargeur rapide 33W et câble", 0)],
    createdAt: "2026-02-05T09:00:00.000Z",
  },
  {
    id: "prod-cable-usbc-lightning",
    name: "Câble USB-C vers Lightning",
    slug: "cable-usbc-lightning",
    shortDescription: "Câble tressé renforcé, 1,2 mètre.",
    description:
      "Un câble résistant à la torsion, idéal pour un usage quotidien intensif. Compatible avec la charge rapide sur iPhone.",
    category: cat("stockage-cables"),
    price: 25000,
    promoPrice: null,
    availability: "in_stock",
    isFeatured: false,
    isPublished: true,
    images: [img("cableCoiled", 1200, 1200, "Câble USB-C vers Lightning enroulé", 0)],
    createdAt: "2026-01-25T09:00:00.000Z",
  },
  {
    id: "prod-adaptateur-multiport",
    name: "Adaptateur multiport USB-C",
    slug: "adaptateur-multiport-usbc",
    shortDescription: "HDMI, USB-A et lecteur de carte en un seul boîtier.",
    description:
      "Transformez votre ordinateur portable en poste de travail complet : sortie HDMI 4K, deux ports USB-A et un lecteur de carte SD/microSD.",
    category: cat("stockage-cables"),
    price: 65000,
    promoPrice: null,
    availability: "in_stock",
    isFeatured: false,
    isPublished: true,
    images: [img("usbAdapter", 1200, 1200, "Adaptateur multiport USB-C", 0)],
    createdAt: "2026-02-10T09:00:00.000Z",
  },
  {
    id: "prod-cle-usb-64go",
    name: "Clé USB 64 Go",
    slug: "cle-usb-64go",
    shortDescription: "Transfert rapide, format compact.",
    description:
      "Idéale pour vos documents, photos et sauvegardes : 64 Go de stockage dans un format de poche, compatible USB 3.0.",
    category: cat("stockage-cables"),
    price: 32000,
    promoPrice: 28000,
    availability: "in_stock",
    isFeatured: true,
    isPublished: true,
    images: [img("usbDrive", 1200, 1200, "Clé USB 64 Go", 0)],
    createdAt: "2026-01-28T09:00:00.000Z",
  },
  {
    id: "prod-ecran-remplacement",
    name: "Écran de remplacement iPhone / Samsung",
    slug: "ecran-remplacement",
    shortDescription: "Écran neuf posé par nos techniciens, garanti 3 mois.",
    description:
      "Vous avez cassé votre écran ? Nous le remplaçons avec une dalle neuve et une pose soignée en atelier. Modèles courants disponibles sur commande.",
    category: cat("ecrans-reparation"),
    price: 180000,
    promoPrice: null,
    availability: "on_order",
    isFeatured: false,
    isPublished: true,
    images: [img("phoneScreenRepair", 1400, 1050, "Réparation d'écran de smartphone", 0)],
    createdAt: "2026-02-12T09:00:00.000Z",
  },
  {
    id: "prod-casque-sans-fil",
    name: "Casque audio sans fil",
    slug: "casque-audio-sans-fil",
    shortDescription: "Réduction de bruit et 30h d'autonomie.",
    description:
      "Un confort d'écoute premium avec réduction de bruit active, une autonomie de 30 heures et un pliage compact pour vos déplacements.",
    category: cat("audio"),
    price: 220000,
    promoPrice: 189000,
    availability: "in_stock",
    isFeatured: true,
    isPublished: true,
    images: [
      img("headphonesOne", 1200, 1500, "Casque audio sans fil", 0),
      img("headphonesTwo", 1400, 1050, "Casque audio sans fil posé sur une table", 1),
    ],
    createdAt: "2026-01-18T09:00:00.000Z",
  },
  {
    id: "prod-ecouteurs-bluetooth",
    name: "Écouteurs Bluetooth intra-auriculaires",
    slug: "ecouteurs-bluetooth",
    shortDescription: "Légers, étanches, avec boîtier de charge.",
    description:
      "Des écouteurs sans fil compacts, résistants à la transpiration et à la pluie légère, livrés avec un boîtier de charge offrant jusqu'à 20h d'autonomie totale.",
    category: cat("audio"),
    price: 95000,
    promoPrice: null,
    availability: "in_stock",
    isFeatured: false,
    isPublished: true,
    images: [img("earbudsOne", 1200, 1200, "Écouteurs Bluetooth et boîtier de charge", 0)],
    createdAt: "2026-02-02T09:00:00.000Z",
  },
  {
    id: "prod-casque-filaire",
    name: "Casque filaire studio",
    slug: "casque-filaire-studio",
    shortDescription: "Son fidèle pour la production audio et le montage.",
    description:
      "Un casque circum-aural filaire pensé pour le monitoring audio : restitution neutre et confort longue durée.",
    category: cat("audio"),
    price: 75000,
    promoPrice: null,
    availability: "out_of_stock",
    isFeatured: false,
    isPublished: true,
    images: [img("headphonesThree", 1200, 1500, "Casque filaire de studio", 0)],
    createdAt: "2026-01-05T09:00:00.000Z",
  },
  {
    id: "prod-probook-15",
    name: "Ordinateur portable ProBook 15\"",
    slug: "ordinateur-probook-15",
    shortDescription: "Bureautique et multitâche sans ralentissement.",
    description:
      "Un ordinateur portable 15 pouces taillé pour la bureautique exigeante et le multitâche : démarrage rapide, clavier confortable et autonomie pour toute la journée.",
    category: cat("informatique"),
    price: 3200000,
    promoPrice: null,
    availability: "in_stock",
    isFeatured: true,
    isPublished: true,
    images: [
      img("macbookDesk", 1400, 1050, "Ordinateur portable ouvert sur un bureau", 0),
      img("laptopTech", 1200, 1500, "Ordinateur portable en usage", 1),
    ],
    createdAt: "2026-01-08T09:00:00.000Z",
  },
  {
    id: "prod-kit-clavier-souris",
    name: "Kit clavier & souris sans fil",
    slug: "kit-clavier-souris",
    shortDescription: "Poste de travail complet, sans fil, prêt à l'emploi.",
    description:
      "Un clavier et une souris sans fil assortis pour équiper rapidement un poste de travail à la maison ou au bureau.",
    category: cat("informatique"),
    price: 120000,
    promoPrice: null,
    availability: "in_stock",
    isFeatured: false,
    isPublished: true,
    images: [img("computerAccessories", 1400, 1050, "Kit clavier et souris sans fil", 0)],
    createdAt: "2026-02-08T09:00:00.000Z",
  },
] satisfies ProductDraft[];

export const demoProducts: Product[] = productDrafts.map((p) => ({ ...p, mainImage: p.images[0] }));

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------
export const demoServices: Service[] = [
  {
    id: "svc-impression",
    title: "Photocopie & Impression",
    slug: "photocopie-impression",
    shortDescription: "Copies et impressions rapides, en noir & blanc ou en couleur.",
    description:
      "Documents administratifs, dossiers scolaires, supports de présentation : nous imprimons et photocopions rapidement, dans tous les formats courants, avec des finitions soignées sur demande.",
    coverImage: img("printerDevice", 1600, 1067, "Impression de documents en cours", 0),
    gallery: [
      img("printerDevice", 1600, 1067, "Impression de documents en cours", 0),
      img("businessDocuments", 1400, 1050, "Documents imprimés et classés", 1),
    ],
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "svc-saisie",
    title: "Saisie & frappe de documents",
    slug: "saisie-frappe-documents",
    shortDescription: "Mise en forme et saisie rapide de vos documents.",
    description:
      "Rapports, mémoires, CV, courriers administratifs : notre équipe saisit et met en page vos documents avec rigueur et dans les délais annoncés.",
    coverImage: img("typingKeyboard", 1600, 1067, "Saisie de documents sur ordinateur", 0),
    gallery: [
      img("typingKeyboard", 1600, 1067, "Saisie de documents sur ordinateur", 0),
      img("officeWorker", 1200, 1500, "Poste de travail dédié à la saisie", 1),
    ],
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "svc-prise-de-photos",
    title: "Prise de photos",
    slug: "prise-de-photos",
    shortDescription: "Portraits, photos d'identité et prises de vue produit.",
    description:
      "Besoin d'une photo d'identité, d'un portrait professionnel ou de visuels pour vos produits ? Notre studio s'adapte à votre besoin, avec livraison rapide des fichiers.",
    coverImage: img("cameraGear", 1600, 1067, "Matériel de prise de vue photographique", 0),
    gallery: [
      img("cameraGear", 1600, 1067, "Matériel de prise de vue photographique", 0),
      img("cameraNature", 1200, 1500, "Séance photo en extérieur", 1),
    ],
    isFeatured: false,
    isPublished: true,
  },
  {
    id: "svc-evenementiel",
    title: "Photographie d'événements",
    slug: "photographie-evenements",
    shortDescription: "Anniversaires, séminaires, lancements — capturés avec soin.",
    description:
      "De l'anniversaire en famille au séminaire d'entreprise, nous couvrons vos événements avec un regard photographique moderne et une livraison soignée de la galerie complète.",
    coverImage: img("eventPhotography", 1600, 1067, "Photographe en action lors d'un événement", 0),
    gallery: [
      img("eventPhotography", 1600, 1067, "Photographe en action lors d'un événement", 0),
      img("eventParty", 1200, 1500, "Ambiance d'un événement festif", 1),
      img("eventCrowd", 1600, 1067, "Public lors d'un événement", 2),
    ],
    isFeatured: true,
    isPublished: true,
  },
  {
    id: "svc-mariages",
    title: "Mariages & cérémonies",
    slug: "mariages-ceremonies",
    shortDescription: "Le plus beau jour, raconté en images.",
    description:
      "Préparatifs, cérémonie, réception : nous suivons chaque moment fort de votre mariage pour vous livrer une galerie complète et intemporelle.",
    coverImage: img("weddingOne", 1200, 1500, "Cérémonie de mariage", 0),
    gallery: [
      img("weddingOne", 1200, 1500, "Cérémonie de mariage", 0),
      img("weddingRings", 1200, 1200, "Alliances de mariage", 1),
      img("weddingCouple", 1400, 1050, "Couple de mariés", 2),
    ],
    isFeatured: true,
    isPublished: true,
  },
];

// ---------------------------------------------------------------------------
// Offers
// ---------------------------------------------------------------------------
const now = Date.now();
const daysFromNow = (n: number) => new Date(now + n * 24 * 60 * 60 * 1000).toISOString();

export const demoOffers: Offer[] = [
  {
    id: "offer-rentree",
    title: "Pack rentrée high-tech",
    description: "Accessoires essentiels à prix réduit pour bien démarrer l'année.",
    image: img("accessoriesFlatlay", 1600, 1067, "Pack d'accessoires high-tech en promotion", 0),
    originalPrice: 250000,
    promoPrice: 199000,
    startsAt: daysFromNow(-30),
    endsAt: daysFromNow(30),
    isActive: true,
  },
  {
    id: "offer-casques",
    title: "-15% sur tous les casques audio",
    description: "Une sélection de casques et écouteurs à prix réduit, pour une durée limitée.",
    image: img("headphonesOne", 1600, 1067, "Casque audio en promotion", 0),
    originalPrice: 220000,
    promoPrice: 187000,
    startsAt: daysFromNow(-5),
    endsAt: daysFromNow(14),
    isActive: true,
  },
  {
    id: "offer-fete-meres-expiree",
    title: "Offre spéciale fête des mères",
    description: "Réduction exceptionnelle sur une sélection de smartphones.",
    image: img("smartphoneFlat", 1600, 1067, "Smartphone en promotion", 0),
    originalPrice: 850000,
    promoPrice: 750000,
    startsAt: daysFromNow(-60),
    endsAt: daysFromNow(-30),
    isActive: true,
  },
  {
    id: "offer-photo-a-venir",
    title: "Séance photo événement offerte",
    description: "Une heure de couverture photo offerte pour tout forfait mariage réservé ce mois-ci.",
    image: img("eventPhotography", 1600, 1067, "Séance photo événementielle offerte"),
    originalPrice: null,
    promoPrice: null,
    startsAt: daysFromNow(10),
    endsAt: daysFromNow(40),
    isActive: true,
  },
];

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------
export const demoGalleryCategories: GalleryCategory[] = [
  { id: "gcat-mariages", name: "Mariages", slug: "mariages", position: 0 },
  { id: "gcat-anniversaires", name: "Anniversaires", slug: "anniversaires", position: 1 },
  { id: "gcat-entreprise", name: "Événements d'entreprise", slug: "evenements-entreprise", position: 2 },
  { id: "gcat-portraits", name: "Portraits", slug: "portraits", position: 3 },
];

const gcat = (slug: string) => demoGalleryCategories.find((c) => c.slug === slug)!;

interface GalleryFixture {
  key: DemoPhotoKey;
  w: number;
  h: number;
  category: string;
  caption?: string;
}

const galleryFixtures: GalleryFixture[] = [
  { key: "weddingOne", w: 1200, h: 1500, category: "mariages", caption: "Cérémonie sous la lumière du soir" },
  { key: "weddingRings", w: 1200, h: 1200, category: "mariages" },
  { key: "weddingCouple", w: 1400, h: 1050, category: "mariages" },
  { key: "weddingThree", w: 1200, h: 1600, category: "mariages" },
  { key: "weddingFour", w: 1600, h: 1067, category: "mariages" },
  { key: "eventPhotography", w: 1200, h: 1500, category: "mariages" },
  { key: "portraitOne", w: 1200, h: 1500, category: "mariages" },
  { key: "eventEight", w: 1400, h: 1050, category: "mariages" },

  { key: "eventBirthday", w: 1200, h: 1500, category: "anniversaires", caption: "Souffler les bougies" },
  { key: "eventTwo", w: 1400, h: 1050, category: "anniversaires" },
  { key: "eventThree", w: 1200, h: 1200, category: "anniversaires" },
  { key: "eventFour", w: 1200, h: 1600, category: "anniversaires" },
  { key: "eventFive", w: 1600, h: 1067, category: "anniversaires" },
  { key: "eventSix", w: 1200, h: 1500, category: "anniversaires" },
  { key: "eventSeven", w: 1400, h: 1050, category: "anniversaires" },

  { key: "meetingRoom", w: 1400, h: 1050, category: "evenements-entreprise", caption: "Séminaire annuel" },
  { key: "businessOffice", w: 1200, h: 1500, category: "evenements-entreprise" },
  { key: "eventCrowd", w: 1600, h: 1067, category: "evenements-entreprise" },
  { key: "eventConcert", w: 1400, h: 1050, category: "evenements-entreprise" },
  { key: "eventNine", w: 1200, h: 1200, category: "evenements-entreprise" },
  { key: "eventTen", w: 1200, h: 1600, category: "evenements-entreprise" },
  { key: "eventEleven", w: 1600, h: 1067, category: "evenements-entreprise" },

  { key: "portraitOne", w: 1200, h: 1500, category: "portraits", caption: "Portrait en lumière naturelle" },
  { key: "portraitTwo", w: 1200, h: 1500, category: "portraits" },
  { key: "eventTwelve", w: 1200, h: 1600, category: "portraits" },
  { key: "eventThirteen", w: 1200, h: 1200, category: "portraits" },
  { key: "eventFourteen", w: 1200, h: 1500, category: "portraits" },
  { key: "eventFifteen", w: 1400, h: 1050, category: "portraits" },
];

export const demoGalleryItems: GalleryItem[] = galleryFixtures.map((f, index) => ({
  id: `gallery-${index}`,
  image: img(f.key, f.w, f.h, f.caption ?? `Photo ${gcat(f.category).name.toLowerCase()}`, index),
  category: gcat(f.category),
  caption: f.caption ?? null,
  position: index,
  isPublished: true,
}));

// ---------------------------------------------------------------------------
// Events / projects
// ---------------------------------------------------------------------------
export const demoEvents: EventProject[] = [
  {
    id: "event-mariage-tana",
    title: "Mariage — Antananarivo",
    slug: "mariage-antananarivo-mars-2026",
    category: "Mariage",
    date: "2026-03-14",
    endDate: null,
    location: "Antananarivo",
    description:
      "Une cérémonie intime suivie d'une réception en soirée, couverte en intégralité par notre équipe : préparatifs, échange des vœux et premiers instants de fête.",
    coverImage: img("weddingCouple", 1600, 1067, "Mariage à Antananarivo", 0),
    gallery: [
      img("weddingOne", 1200, 1500, "Cérémonie de mariage à Antananarivo", 0),
      img("weddingRings", 1200, 1200, "Alliances échangées", 1),
      img("weddingThree", 1200, 1600, "Portrait des mariés", 2),
      img("weddingFour", 1600, 1067, "Réception de mariage", 3),
      img("eventPhotography", 1200, 1500, "Instant capturé pendant la réception", 4),
    ],
    isPublished: true,
  },
  {
    id: "event-anniversaire-ambohipo",
    title: "Anniversaire 30 ans — Ambohipo",
    slug: "anniversaire-30-ans-ambohipo",
    category: "Anniversaire",
    date: "2026-05-02",
    endDate: null,
    location: "Ambohipo, Antananarivo",
    description: "Une fête familiale chaleureuse célébrant un 30ème anniversaire, en petit comité.",
    coverImage: img("eventBirthday", 1600, 1067, "Fête d'anniversaire à Ambohipo", 0),
    gallery: [
      img("eventTwo", 1400, 1050, "Ambiance de la fête d'anniversaire", 0),
      img("eventThree", 1200, 1200, "Décoration de la fête", 1),
      img("eventFour", 1200, 1600, "Moment convivial entre proches", 2),
      img("eventFive", 1600, 1067, "Groupe réuni pour l'occasion", 3),
    ],
    isPublished: true,
  },
  {
    id: "event-seminaire-techcorp",
    title: "Séminaire entreprise TechCorp",
    slug: "seminaire-entreprise-techcorp",
    category: "Événement d'entreprise",
    date: "2026-06-18",
    endDate: "2026-06-19",
    location: "Ivato, Antananarivo",
    description:
      "Deux journées de conférences et d'ateliers pour les équipes de TechCorp, avec couverture photo des interventions et des temps d'échange.",
    coverImage: img("meetingRoom", 1600, 1067, "Séminaire d'entreprise à Ivato", 0),
    gallery: [
      img("businessOffice", 1200, 1500, "Intervention lors du séminaire", 0),
      img("eventCrowd", 1600, 1067, "Public assistant au séminaire", 1),
      img("eventConcert", 1400, 1050, "Moment de networking", 2),
      img("eventNine", 1200, 1200, "Espace d'accueil du séminaire", 3),
    ],
    isPublished: true,
  },
  {
    id: "event-mariage-antsirabe",
    title: "Mariage — Antsirabe",
    slug: "mariage-antsirabe-novembre-2025",
    category: "Mariage",
    date: "2025-11-08",
    endDate: null,
    location: "Antsirabe",
    description: "Un mariage traditionnel célébré à Antsirabe, entre cérémonie religieuse et réception festive.",
    coverImage: img("weddingThree", 1200, 1600, "Mariage à Antsirabe", 0),
    gallery: [
      img("weddingFour", 1600, 1067, "Réception du mariage à Antsirabe", 0),
      img("weddingOne", 1200, 1500, "Cérémonie religieuse", 1),
      img("weddingRings", 1200, 1200, "Détail des alliances", 2),
      img("portraitOne", 1200, 1500, "Portrait des mariés", 3),
    ],
    isPublished: true,
  },
  {
    id: "event-bapteme-famille",
    title: "Baptême & fête de famille",
    slug: "bapteme-fete-de-famille",
    category: "Anniversaire",
    date: "2026-01-25",
    endDate: null,
    location: "Antananarivo",
    description: "Une célébration familiale mêlant cérémonie de baptême et repas de fête.",
    coverImage: img("eventSix", 1200, 1500, "Fête familiale de baptême", 0),
    gallery: [
      img("eventSeven", 1400, 1050, "Cérémonie de baptême", 0),
      img("eventEight", 1400, 1050, "Repas de fête en famille", 1),
      img("eventTen", 1200, 1600, "Moment partagé en famille", 2),
      img("eventEleven", 1600, 1067, "Ambiance de la célébration", 3),
    ],
    isPublished: true,
  },
];

// ---------------------------------------------------------------------------
// Site settings
// ---------------------------------------------------------------------------
export const demoSiteSettings: SiteSettings = {
  phone: "+261 34 12 345 67",
  whatsapp: "+261 34 12 345 67",
  email: "contact@fastinfo.mg",
  address: "Lot II M 45, Analakely",
  city: "Antananarivo, Madagascar",
  openingHours: [
    { day: "Lundi – Vendredi", hours: "08h00 – 18h00" },
    { day: "Samedi", hours: "08h30 – 16h00" },
    { day: "Dimanche", hours: "Fermé" },
  ],
  socials: [
    { platform: "facebook", url: "https://facebook.com/fastinfo.mg" },
    { platform: "instagram", url: "https://instagram.com/fastinfo.mg" },
    { platform: "tiktok", url: "https://tiktok.com/@fastinfo.mg" },
  ],
  heroTitle: "La technologie, les services et la créativité, réunis.",
  heroSubtitle:
    "Téléphones, accessoires, impression et photographie d'événements : tout ce dont vous avez besoin, au même endroit à Antananarivo.",
  mapUrl: "https://maps.google.com/?q=Analakely+Antananarivo",
};
