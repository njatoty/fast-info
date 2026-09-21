import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().trim().min(2, "Le nom est trop court.").max(80),
  slug: z
    .string()
    .trim()
    .min(2, "Le slug est trop court.")
    .max(80)
    .regex(/^[a-z0-9-]+$/, "Minuscules, chiffres et tirets uniquement."),
  position: z.coerce.number().int().min(0).default(0),
});

export type CategoryValues = z.output<typeof categorySchema>;
export type CategoryFormInput = z.input<typeof categorySchema>;
