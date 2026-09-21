"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { ImageUploader } from "@/components/admin/image-uploader";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { offerSchema, type OfferFormInput, type OfferValues } from "@/lib/validation/offer";
import type { MediaImage, Offer } from "@/types/domain";

function toDateTimeLocal(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

interface OfferFormSheetProps {
  offer?: Offer;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: OfferValues, image: MediaImage | null) => Promise<{ success: boolean; error?: string }>;
}

export function OfferFormSheet({ offer, open, onOpenChange, onSubmit }: OfferFormSheetProps) {
  const router = useRouter();
  const [image, setImage] = useState<MediaImage | null>(offer?.image ?? null);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<OfferFormInput, unknown, OfferValues>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      title: offer?.title ?? "",
      description: offer?.description ?? "",
      originalPrice: offer?.originalPrice ?? null,
      promoPrice: offer?.promoPrice ?? null,
      startsAt: toDateTimeLocal(offer?.startsAt ?? null),
      endsAt: toDateTimeLocal(offer?.endsAt ?? null),
      isActive: offer?.isActive ?? true,
    },
  });

  async function submit(values: OfferValues) {
    const result = await onSubmit(values, image);
    if (result.success) {
      toast.success(offer ? "Offre mise à jour." : "Offre créée.");
      onOpenChange(false);
      router.refresh();
    } else {
      toast.error(result.error ?? "Une erreur est survenue.");
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) {
          reset();
          setImage(offer?.image ?? null);
        }
      }}
    >
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{offer ? "Modifier l'offre" : "Nouvelle offre"}</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit(submit)} className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 pb-4">
          <ImageUploader value={image} onChange={setImage} folder="offers" label="Visuel de l'offre" />

          <FieldGroup>
            <Field data-invalid={!!errors.title}>
              <FieldLabel htmlFor="offer-title">Titre</FieldLabel>
              <Input id="offer-title" {...register("title")} />
              <FieldError errors={[errors.title]} />
            </Field>

            <Field data-invalid={!!errors.description}>
              <FieldLabel htmlFor="offer-description">Description</FieldLabel>
              <Textarea id="offer-description" rows={3} {...register("description")} />
              <FieldError errors={[errors.description]} />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field data-invalid={!!errors.originalPrice}>
                <FieldLabel htmlFor="offer-original-price">Prix d&apos;origine (Ar)</FieldLabel>
                <Input id="offer-original-price" type="number" min={0} {...register("originalPrice")} />
                <FieldError errors={[errors.originalPrice]} />
              </Field>
              <Field data-invalid={!!errors.promoPrice}>
                <FieldLabel htmlFor="offer-promo-price">Prix promo (Ar)</FieldLabel>
                <Input id="offer-promo-price" type="number" min={0} {...register("promoPrice")} />
                <FieldError errors={[errors.promoPrice]} />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="offer-starts">Début</FieldLabel>
                <Input id="offer-starts" type="datetime-local" {...register("startsAt")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="offer-ends">Fin</FieldLabel>
                <Input id="offer-ends" type="datetime-local" {...register("endsAt")} />
              </Field>
            </div>

            <Field orientation="horizontal">
              <FieldLabel htmlFor="offer-active">Offre active</FieldLabel>
              <Controller
                control={control}
                name="isActive"
                render={({ field }) => (
                  <Switch id="offer-active" checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
            </Field>
          </FieldGroup>

          <SheetFooter className="px-0">
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
              {offer ? "Enregistrer" : "Créer l'offre"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
