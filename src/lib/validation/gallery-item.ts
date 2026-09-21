import { z } from "zod";

export const galleryItemSchema = z.object({
  categoryId: z.string().nullable(),
  caption: z.string().trim().max(200).optional().default(""),
  isPublished: z.boolean().default(true),
});

export type GalleryItemValues = z.output<typeof galleryItemSchema>;
export type GalleryItemFormInput = z.input<typeof galleryItemSchema>;
