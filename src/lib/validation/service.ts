import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().trim().min(2, "Le titre est trop court.").max(150),
  slug: z
    .string()
    .trim()
    .min(2, "Le slug est trop court.")
    .max(150)
    .regex(/^[a-z0-9-]+$/, "Minuscules, chiffres et tirets uniquement."),
  shortDescription: z.string().trim().max(300).optional().default(""),
  description: z.string().trim().max(4000).optional().default(""),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
});

export type ServiceValues = z.output<typeof serviceSchema>;
export type ServiceFormInput = z.input<typeof serviceSchema>;
