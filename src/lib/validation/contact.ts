import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Veuillez indiquer votre nom.").max(120),
  email: z.string().trim().email("Adresse e-mail invalide."),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  subject: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Votre message est un peu court.").max(2000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
