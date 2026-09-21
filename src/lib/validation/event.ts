import { z } from "zod";

const optionalDate = z.preprocess(
  (val) => (val === "" || val === null || val === undefined ? null : val),
  z.string().nullable(),
);

export const eventSchema = z.object({
  title: z.string().trim().min(2, "Le titre est trop court.").max(150),
  slug: z
    .string()
    .trim()
    .min(2, "Le slug est trop court.")
    .max(150)
    .regex(/^[a-z0-9-]+$/, "Minuscules, chiffres et tirets uniquement."),
  category: z.string().trim().min(2, "La catégorie est requise.").max(80),
  eventDate: z.string().min(1, "La date est requise."),
  endDate: optionalDate,
  location: z.string().trim().min(2, "Le lieu est requis.").max(200),
  description: z.string().trim().max(4000).optional().default(""),
  isPublished: z.boolean().default(true),
});

export type EventValues = z.output<typeof eventSchema>;
export type EventFormInput = z.input<typeof eventSchema>;
