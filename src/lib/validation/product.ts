import { z } from "zod";

const optionalPrice = z.preprocess(
  (val) => (val === "" || val === null || val === undefined ? null : val),
  z.coerce.number().min(0).nullable(),
);

export const productSchema = z
  .object({
    name: z.string().trim().min(2, "Le nom est trop court.").max(150),
    slug: z
      .string()
      .trim()
      .min(2, "Le slug est trop court.")
      .max(150)
      .regex(/^[a-z0-9-]+$/, "Minuscules, chiffres et tirets uniquement."),
    shortDescription: z.string().trim().max(300).optional().default(""),
    description: z.string().trim().max(4000).optional().default(""),
    categoryId: z.string().nullable(),
    price: z.coerce.number().min(0, "Le prix doit être positif."),
    promoPrice: optionalPrice,
    availability: z.enum(["in_stock", "out_of_stock", "on_order"]),
    isFeatured: z.boolean().default(false),
    isPublished: z.boolean().default(true),
  })
  .refine((data) => data.promoPrice === null || data.promoPrice < data.price, {
    message: "Le prix promotionnel doit être inférieur au prix normal.",
    path: ["promoPrice"],
  });

export type ProductValues = z.output<typeof productSchema>;
export type ProductFormInput = z.input<typeof productSchema>;
