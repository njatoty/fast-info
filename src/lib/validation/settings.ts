import { z } from "zod";

const emptyOrUrl = z.string().trim().refine((v) => v === "" || z.string().url().safeParse(v).success, {
  message: "URL invalide.",
});

const emptyOrEmail = z.string().trim().refine((v) => v === "" || z.string().email().safeParse(v).success, {
  message: "E-mail invalide.",
});

export const settingsSchema = z.object({
  phone: z.string().trim().min(4, "Numéro requis."),
  whatsapp: z.string().trim().min(4, "Numéro requis."),
  email: emptyOrEmail,
  address: z.string().trim().min(2, "Adresse requise."),
  city: z.string().trim().min(2, "Ville requise."),
  heroTitle: z.string().trim().min(2, "Titre requis."),
  heroSubtitle: z.string().trim().min(2, "Sous-titre requis."),
  mapUrl: emptyOrUrl,
  openingHours: z.array(
    z.object({
      day: z.string().trim().min(1, "Requis"),
      hours: z.string().trim().min(1, "Requis"),
    }),
  ),
  socials: z.array(
    z.object({
      platform: z.string().trim().min(1, "Requis"),
      url: z.string().trim().min(1, "Requis"),
    }),
  ),
});

export type SettingsValues = z.output<typeof settingsSchema>;
