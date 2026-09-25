"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import { GalleryManager } from "@/components/admin/gallery-manager";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateSiteSettings } from "@/lib/actions/settings";
import { settingsSchema, type SettingsValues } from "@/lib/validation/settings";
import type { MediaImage, SiteSettings } from "@/types/domain";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const router = useRouter();
  const [heroImages, setHeroImages] = useState<MediaImage[]>(settings.heroImages);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      phone: settings.phone,
      whatsapp: settings.whatsapp,
      email: settings.email ?? "",
      address: settings.address,
      city: settings.city,
      heroTitle: settings.heroTitle,
      heroSubtitle: settings.heroSubtitle,
      mapUrl: settings.mapUrl ?? "",
      openingHours: settings.openingHours,
      socials: settings.socials,
    },
  });

  const hoursArray = useFieldArray({ control, name: "openingHours" });
  const socialsArray = useFieldArray({ control, name: "socials" });

  async function submit(values: SettingsValues) {
    const result = await updateSiteSettings(values, heroImages);
    if (result.success) {
      toast.success("Paramètres enregistrés.");
      router.refresh();
    } else {
      toast.error(result.error ?? "Une erreur est survenue.");
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-6 pb-16">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border p-5">
          <h2 className="mb-4 text-sm font-medium tracking-wide text-muted-foreground uppercase">
            Coordonnées
          </h2>
          <FieldGroup>
            <Field data-invalid={!!errors.phone}>
              <FieldLabel htmlFor="settings-phone">Téléphone</FieldLabel>
              <Input id="settings-phone" {...register("phone")} />
              <FieldError errors={[errors.phone]} />
            </Field>
            <Field data-invalid={!!errors.whatsapp}>
              <FieldLabel htmlFor="settings-whatsapp">WhatsApp</FieldLabel>
              <Input id="settings-whatsapp" {...register("whatsapp")} />
              <FieldError errors={[errors.whatsapp]} />
            </Field>
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="settings-email">E-mail (optionnel)</FieldLabel>
              <Input id="settings-email" type="email" {...register("email")} />
              <FieldError errors={[errors.email]} />
            </Field>
            <Field data-invalid={!!errors.address}>
              <FieldLabel htmlFor="settings-address">Adresse</FieldLabel>
              <Input id="settings-address" {...register("address")} />
              <FieldError errors={[errors.address]} />
            </Field>
            <Field data-invalid={!!errors.city}>
              <FieldLabel htmlFor="settings-city">Ville</FieldLabel>
              <Input id="settings-city" {...register("city")} />
              <FieldError errors={[errors.city]} />
            </Field>
            <Field data-invalid={!!errors.mapUrl}>
              <FieldLabel htmlFor="settings-map">Lien Google Maps (optionnel)</FieldLabel>
              <Input id="settings-map" {...register("mapUrl")} />
              <FieldError errors={[errors.mapUrl]} />
            </Field>
          </FieldGroup>
        </div>

        <div className="rounded-lg border border-border p-5">
          <h2 className="mb-4 text-sm font-medium tracking-wide text-muted-foreground uppercase">
            Page d&apos;accueil
          </h2>
          <FieldGroup>
            <Field data-invalid={!!errors.heroTitle}>
              <FieldLabel htmlFor="settings-hero-title">Titre principal</FieldLabel>
              <Textarea id="settings-hero-title" rows={2} {...register("heroTitle")} />
              <FieldError errors={[errors.heroTitle]} />
            </Field>
            <Field data-invalid={!!errors.heroSubtitle}>
              <FieldLabel htmlFor="settings-hero-subtitle">Sous-titre</FieldLabel>
              <Textarea id="settings-hero-subtitle" rows={3} {...register("heroSubtitle")} />
              <FieldError errors={[errors.heroSubtitle]} />
            </Field>
            <Field>
              <FieldLabel>Carrousel du hero</FieldLabel>
              <GalleryManager images={heroImages} onChange={setHeroImages} folder="hero" />
            </Field>
          </FieldGroup>
        </div>

        <div className="rounded-lg border border-border p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
              Horaires d&apos;ouverture
            </h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => hoursArray.append({ day: "", hours: "" })}
            >
              <Plus className="size-3.5" />
              Ajouter
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            {hoursArray.fields.map((field, index) => (
              <div key={field.id} className="flex items-end gap-2">
                <Field className="flex-1">
                  <FieldLabel htmlFor={`hours-day-${index}`}>Jour(s)</FieldLabel>
                  <Input id={`hours-day-${index}`} {...register(`openingHours.${index}.day`)} />
                </Field>
                <Field className="flex-1">
                  <FieldLabel htmlFor={`hours-value-${index}`}>Horaires</FieldLabel>
                  <Input id={`hours-value-${index}`} {...register(`openingHours.${index}.hours`)} />
                </Field>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => hoursArray.remove(index)}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
              Réseaux sociaux
            </h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => socialsArray.append({ platform: "", url: "" })}
            >
              <Plus className="size-3.5" />
              Ajouter
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            {socialsArray.fields.map((field, index) => (
              <div key={field.id} className="flex items-end gap-2">
                <Field className="w-32">
                  <FieldLabel htmlFor={`social-platform-${index}`}>Plateforme</FieldLabel>
                  <Input
                    id={`social-platform-${index}`}
                    placeholder="facebook"
                    {...register(`socials.${index}.platform`)}
                  />
                </Field>
                <Field className="flex-1">
                  <FieldLabel htmlFor={`social-url-${index}`}>URL</FieldLabel>
                  <Input id={`social-url-${index}`} {...register(`socials.${index}.url`)} />
                </Field>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => socialsArray.remove(index)}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end border-t border-border pt-6">
        <Button type="submit" disabled={isSubmitting} className="gap-2">
          {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Enregistrer les paramètres
        </Button>
      </div>
    </form>
  );
}
