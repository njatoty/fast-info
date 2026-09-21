"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { GalleryManager } from "@/components/admin/gallery-manager";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { deleteEvent } from "@/lib/actions/events";
import { slugify } from "@/lib/utils/slug";
import { eventSchema, type EventFormInput, type EventValues } from "@/lib/validation/event";
import type { EventProject, MediaImage } from "@/types/domain";

interface EventFormProps {
  event?: EventProject;
  onSubmit: (
    values: EventValues,
    images: MediaImage[],
  ) => Promise<{ success: boolean; error?: string; id?: string }>;
}

export function EventForm({ event, onSubmit }: EventFormProps) {
  const router = useRouter();
  const [images, setImages] = useState<MediaImage[]>(event?.gallery ?? []);
  const [slugTouched, setSlugTouched] = useState(!!event);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EventFormInput, unknown, EventValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: event?.title ?? "",
      slug: event?.slug ?? "",
      category: event?.category ?? "",
      eventDate: event?.date ?? "",
      endDate: event?.endDate ?? null,
      location: event?.location ?? "",
      description: event?.description ?? "",
      isPublished: event?.isPublished ?? true,
    },
  });

  async function submit(values: EventValues) {
    const result = await onSubmit(values, images);
    if (result.success) {
      toast.success(event ? "Événement mis à jour." : "Événement créé.");
      router.push("/admin/events");
      router.refresh();
    } else {
      toast.error(result.error ?? "Une erreur est survenue.");
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-8 pb-16">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="rounded-lg border border-border p-5">
            <h2 className="mb-4 text-sm font-medium tracking-wide text-muted-foreground uppercase">
              Informations générales
            </h2>
            <FieldGroup>
              <Field data-invalid={!!errors.title}>
                <FieldLabel htmlFor="event-title">Titre</FieldLabel>
                <Input
                  id="event-title"
                  {...register("title", {
                    onChange: (e) => {
                      if (!slugTouched) setValue("slug", slugify(e.target.value));
                    },
                  })}
                />
                <FieldError errors={[errors.title]} />
              </Field>
              <Field data-invalid={!!errors.slug}>
                <FieldLabel htmlFor="event-slug">Slug (URL)</FieldLabel>
                <Input id="event-slug" {...register("slug", { onChange: () => setSlugTouched(true) })} />
                <FieldError errors={[errors.slug]} />
              </Field>
              <Field data-invalid={!!errors.description}>
                <FieldLabel htmlFor="event-description">Description</FieldLabel>
                <Textarea id="event-description" rows={5} {...register("description")} />
                <FieldError errors={[errors.description]} />
              </Field>
            </FieldGroup>
          </div>

          <div className="rounded-lg border border-border p-5">
            <h2 className="mb-4 text-sm font-medium tracking-wide text-muted-foreground uppercase">
              Galerie photo
            </h2>
            <GalleryManager images={images} onChange={setImages} folder="events" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-lg border border-border p-5">
            <h2 className="mb-4 text-sm font-medium tracking-wide text-muted-foreground uppercase">
              Détails
            </h2>
            <FieldGroup>
              <Field data-invalid={!!errors.category}>
                <FieldLabel htmlFor="event-category">Catégorie</FieldLabel>
                <Input id="event-category" placeholder="Mariage, Anniversaire…" {...register("category")} />
                <FieldError errors={[errors.category]} />
              </Field>
              <Field data-invalid={!!errors.location}>
                <FieldLabel htmlFor="event-location">Lieu</FieldLabel>
                <Input id="event-location" {...register("location")} />
                <FieldError errors={[errors.location]} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field data-invalid={!!errors.eventDate}>
                  <FieldLabel htmlFor="event-date">Date</FieldLabel>
                  <Input id="event-date" type="date" {...register("eventDate")} />
                  <FieldError errors={[errors.eventDate]} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="event-end-date">Date de fin</FieldLabel>
                  <Input id="event-end-date" type="date" {...register("endDate")} />
                </Field>
              </div>
              <Field orientation="horizontal">
                <FieldLabel htmlFor="event-published">Publié</FieldLabel>
                <Controller
                  control={control}
                  name="isPublished"
                  render={({ field }) => (
                    <Switch id="event-published" checked={field.value} onCheckedChange={field.onChange} />
                  )}
                />
              </Field>
            </FieldGroup>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-6">
        {event ? (
          <ConfirmDialog
            trigger={
              <Button type="button" variant="outline" className="gap-2 text-destructive hover:text-destructive">
                <Trash2 className="size-4" />
                Supprimer l&apos;événement
              </Button>
            }
            title="Supprimer cet événement ?"
            description={`"${event.title}" sera définitivement supprimé, y compris ses photos.`}
            onConfirm={async () => {
              const result = await deleteEvent(event.id);
              if (result.success) {
                toast.success("Événement supprimé.");
                router.push("/admin/events");
                router.refresh();
              } else {
                toast.error(result.error ?? "Échec de la suppression.");
              }
            }}
          />
        ) : (
          <span />
        )}
        <Button type="submit" disabled={isSubmitting} className="gap-2">
          {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {event ? "Enregistrer les modifications" : "Créer l'événement"}
        </Button>
      </div>
    </form>
  );
}
