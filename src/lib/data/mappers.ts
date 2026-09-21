import { mediaPublicUrl } from "@/lib/media/url";
import type { TableRow } from "@/types/database";
import type {
  EventProject,
  GalleryCategory,
  GalleryItem,
  MediaImage,
  Offer,
  Product,
  ProductCategory,
  Service,
} from "@/types/domain";

type ImageLike = {
  id: string;
  path: string;
  alt: string;
  width: number;
  height: number;
  blur_data_url: string | null;
  position: number;
};

export function mapImage(row: ImageLike): MediaImage {
  return {
    id: row.id,
    url: mediaPublicUrl(row.path),
    alt: row.alt,
    width: row.width,
    height: row.height,
    blurDataURL: row.blur_data_url ?? undefined,
    position: row.position,
  };
}

export function mapProductCategory(row: TableRow<"product_categories">): ProductCategory {
  return { id: row.id, name: row.name, slug: row.slug, position: row.position };
}

export function mapGalleryCategory(row: TableRow<"gallery_categories">): GalleryCategory {
  return { id: row.id, name: row.name, slug: row.slug, position: row.position };
}

export type ProductRow = TableRow<"products"> & {
  category: TableRow<"product_categories"> | null;
  images: TableRow<"product_images">[];
};

export function mapProduct(row: ProductRow): Product {
  const images = [...row.images].sort((a, b) => a.position - b.position).map(mapImage);
  const main = row.images.find((i) => i.is_main) ?? row.images[0];

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    shortDescription: row.short_description ?? "",
    description: row.description ?? "",
    category: row.category ? mapProductCategory(row.category) : null,
    price: Number(row.price),
    promoPrice: row.promo_price !== null ? Number(row.promo_price) : null,
    availability: row.availability,
    isFeatured: row.is_featured,
    isPublished: row.is_published,
    images,
    mainImage: main ? mapImage(main) : images[0],
    createdAt: row.created_at,
  };
}

export type ServiceRow = TableRow<"services"> & {
  images: TableRow<"service_images">[];
};

export function mapService(row: ServiceRow): Service {
  const gallery = [...row.images].sort((a, b) => a.position - b.position).map(mapImage);
  const cover = row.images.find((i) => i.is_cover) ?? row.images[0];

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    shortDescription: row.short_description ?? "",
    description: row.description ?? "",
    coverImage: cover ? mapImage(cover) : gallery[0],
    gallery,
    isFeatured: row.is_featured,
    isPublished: row.is_published,
  };
}

export function mapOffer(row: TableRow<"offers">): Offer {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    image:
      row.image_path && row.image_width && row.image_height
        ? mapImage({
            id: row.id,
            path: row.image_path,
            alt: row.image_alt ?? row.title,
            width: row.image_width,
            height: row.image_height,
            blur_data_url: null,
            position: 0,
          })
        : null,
    originalPrice: row.original_price !== null ? Number(row.original_price) : null,
    promoPrice: row.promo_price !== null ? Number(row.promo_price) : null,
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    isActive: row.is_active,
  };
}

export type GalleryItemRow = TableRow<"gallery_items"> & {
  category: TableRow<"gallery_categories"> | null;
};

export function mapGalleryItem(row: GalleryItemRow): GalleryItem {
  return {
    id: row.id,
    image: mapImage(row),
    category: row.category ? mapGalleryCategory(row.category) : null,
    caption: row.caption,
    position: row.position,
    isPublished: row.is_published,
  };
}

export type EventRow = TableRow<"events"> & {
  images: TableRow<"event_images">[];
};

export function mapEvent(row: EventRow): EventProject {
  const gallery = [...row.images].sort((a, b) => a.position - b.position).map(mapImage);
  const cover = row.images.find((i) => i.is_cover) ?? row.images[0];

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    date: row.event_date,
    endDate: row.end_date,
    location: row.location,
    description: row.description ?? "",
    coverImage: cover ? mapImage(cover) : gallery[0],
    gallery,
    isPublished: row.is_published,
  };
}
