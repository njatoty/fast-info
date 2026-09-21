import { z } from "zod";

const optionalPrice = z.preprocess(
  (val) => (val === "" || val === null || val === undefined ? null : val),
  z.coerce.number().min(0).nullable(),
);

const optionalDateTime = z.preprocess(
  (val) => (val === "" || val === null || val === undefined ? null : val),
  z.string().nullable(),
);

export const offerSchema = z
  .object({
    title: z.string().trim().min(2, "Le titre est trop court.").max(150),
    description: z.string().trim().max(2000).optional().default(""),
    originalPrice: optionalPrice,
    promoPrice: optionalPrice,
    startsAt: optionalDateTime,
    endsAt: optionalDateTime,
    isActive: z.boolean().default(true),
  })
  .refine(
    (data) => data.originalPrice === null || data.promoPrice === null || data.promoPrice < data.originalPrice,
    { message: "Le prix promotionnel doit être inférieur au prix d'origine.", path: ["promoPrice"] },
  );

export type OfferValues = z.output<typeof offerSchema>;
export type OfferFormInput = z.input<typeof offerSchema>;
