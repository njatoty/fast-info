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
import { deleteService } from "@/lib/actions/services";
import { slugify } from "@/lib/utils/slug";
import {
  serviceSchema,
  type ServiceFormInput,
  type ServiceValues,
} from "@/lib/validation/service";
import type { MediaImage, Service } from "@/types/domain";

interface ServiceFormProps {
  service?: Service;
  onSubmit: (
    values: ServiceValues,
    images: MediaImage[],
  ) => Promise<{ success: boolean; error?: string; id?: string }>;
}

export function ServiceForm({ service, onSubmit }: ServiceFormProps) {
  const router = useRouter();
  const [images, setImages] = useState<MediaImage[]>(service?.gallery ?? []);
  const [slugTouched, setSlugTouched] = useState(!!service);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ServiceFormInput, unknown, ServiceValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: service?.title ?? "",
      slug: service?.slug ?? "",
      shortDescription: service?.shortDescription ?? "",
      description: service?.description ?? "",
      isFeatured: service?.isFeatured ?? false,
      isPublished: service?.isPublished ?? true,
    },
  });

  async function submit(values: ServiceValues) {
    const result = await onSubmit(values, images);
    if (result.success) {
      toast.success(service ? "Service mis à jour." : "Service créé.");
      router.push("/admin/services");
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
                <FieldLabel htmlFor="service-title">Titre</FieldLabel>
                <Input
                  id="service-title"
                  {...register("title", {
                    onChange: (e) => {
                      if (!slugTouched) setValue("slug", slugify(e.target.value));
                    },
                  })}
                />
                <FieldError errors={[errors.title]} />
              </Field>
              <Field data-invalid={!!errors.slug}>
                <FieldLabel htmlFor="service-slug">Slug (URL)</FieldLabel>
                <Input id="service-slug" {...register("slug", { onChange: () => setSlugTouched(true) })} />
                <FieldError errors={[errors.slug]} />
              </Field>
              <Field data-invalid={!!errors.shortDescription}>
                <FieldLabel htmlFor="service-short">Description courte</FieldLabel>
                <Textarea id="service-short" rows={2} {...register("shortDescription")} />
                <FieldError errors={[errors.shortDescription]} />
              </Field>
              <Field data-invalid={!!errors.description}>
                <FieldLabel htmlFor="service-description">Description</FieldLabel>
                <Textarea id="service-description" rows={6} {...register("description")} />
                <FieldError errors={[errors.description]} />
              </Field>
            </FieldGroup>
          </div>

          <div className="rounded-lg border border-border p-5">
            <h2 className="mb-4 text-sm font-medium tracking-wide text-muted-foreground uppercase">
              Images
            </h2>
            <GalleryManager images={images} onChange={setImages} folder="services" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-lg border border-border p-5">
            <h2 className="mb-4 text-sm font-medium tracking-wide text-muted-foreground uppercase">
              Organisation
            </h2>
            <FieldGroup>
              <Field orientation="horizontal">
                <FieldLabel htmlFor="service-featured">Service en vedette</FieldLabel>
                <Controller
                  control={control}
                  name="isFeatured"
                  render={({ field }) => (
                    <Switch id="service-featured" checked={field.value} onCheckedChange={field.onChange} />
                  )}
                />
              </Field>
              <Field orientation="horizontal">
                <FieldLabel htmlFor="service-published">Publié</FieldLabel>
                <Controller
                  control={control}
                  name="isPublished"
                  render={({ field }) => (
                    <Switch id="service-published" checked={field.value} onCheckedChange={field.onChange} />
                  )}
                />
              </Field>
            </FieldGroup>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-6">
        {service ? (
          <ConfirmDialog
            trigger={
              <Button type="button" variant="outline" className="gap-2 text-destructive hover:text-destructive">
                <Trash2 className="size-4" />
                Supprimer le service
              </Button>
            }
            title="Supprimer ce service ?"
            description={`"${service.title}" sera définitivement supprimé, y compris ses images.`}
            onConfirm={async () => {
              const result = await deleteService(service.id);
              if (result.success) {
                toast.success("Service supprimé.");
                router.push("/admin/services");
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
          {service ? "Enregistrer les modifications" : "Créer le service"}
        </Button>
      </div>
    </form>
  );
}
