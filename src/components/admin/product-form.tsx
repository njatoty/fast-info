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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { deleteProduct } from "@/lib/actions/products";
import { slugify } from "@/lib/utils/slug";
import {
  productSchema,
  type ProductFormInput,
  type ProductValues,
} from "@/lib/validation/product";
import type { AvailabilityStatus } from "@/types/database";
import type { MediaImage, Product, ProductCategory } from "@/types/domain";

const AVAILABILITY_LABELS: Record<AvailabilityStatus, string> = {
  in_stock: "En stock",
  out_of_stock: "Rupture de stock",
  on_order: "Sur commande",
};

interface ProductFormProps {
  product?: Product;
  categories: ProductCategory[];
  onSubmit: (values: ProductValues, images: MediaImage[]) => Promise<{ success: boolean; error?: string; id?: string }>;
}

export function ProductForm({ product, categories, onSubmit }: ProductFormProps) {
  const router = useRouter();
  const [images, setImages] = useState<MediaImage[]>(product?.images ?? []);
  const [slugTouched, setSlugTouched] = useState(!!product);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormInput, unknown, ProductValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name ?? "",
      slug: product?.slug ?? "",
      shortDescription: product?.shortDescription ?? "",
      description: product?.description ?? "",
      categoryId: product?.category?.id ?? null,
      price: product?.price ?? 0,
      promoPrice: product?.promoPrice ?? null,
      availability: product?.availability ?? "in_stock",
      isFeatured: product?.isFeatured ?? false,
      isPublished: product?.isPublished ?? true,
    },
  });

  async function submit(values: ProductValues) {
    const result = await onSubmit(values, images);
    if (result.success) {
      toast.success(product ? "Produit mis à jour." : "Produit créé.");
      router.push("/admin/products");
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
              <Field data-invalid={!!errors.name}>
                <FieldLabel htmlFor="product-name">Nom</FieldLabel>
                <Input
                  id="product-name"
                  {...register("name", {
                    onChange: (e) => {
                      if (!slugTouched) setValue("slug", slugify(e.target.value));
                    },
                  })}
                />
                <FieldError errors={[errors.name]} />
              </Field>
              <Field data-invalid={!!errors.slug}>
                <FieldLabel htmlFor="product-slug">Slug (URL)</FieldLabel>
                <Input id="product-slug" {...register("slug", { onChange: () => setSlugTouched(true) })} />
                <FieldError errors={[errors.slug]} />
              </Field>
              <Field data-invalid={!!errors.shortDescription}>
                <FieldLabel htmlFor="product-short">Description courte</FieldLabel>
                <Textarea id="product-short" rows={2} {...register("shortDescription")} />
                <FieldError errors={[errors.shortDescription]} />
              </Field>
              <Field data-invalid={!!errors.description}>
                <FieldLabel htmlFor="product-description">Description</FieldLabel>
                <Textarea id="product-description" rows={6} {...register("description")} />
                <FieldError errors={[errors.description]} />
              </Field>
            </FieldGroup>
          </div>

          <div className="rounded-lg border border-border p-5">
            <h2 className="mb-4 text-sm font-medium tracking-wide text-muted-foreground uppercase">
              Images
            </h2>
            <GalleryManager images={images} onChange={setImages} folder="products" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-lg border border-border p-5">
            <h2 className="mb-4 text-sm font-medium tracking-wide text-muted-foreground uppercase">
              Prix &amp; disponibilité
            </h2>
            <FieldGroup>
              <Field data-invalid={!!errors.price}>
                <FieldLabel htmlFor="product-price">Prix (Ar)</FieldLabel>
                <Input id="product-price" type="number" min={0} {...register("price")} />
                <FieldError errors={[errors.price]} />
              </Field>
              <Field data-invalid={!!errors.promoPrice}>
                <FieldLabel htmlFor="product-promo">Prix promotionnel (Ar)</FieldLabel>
                <Input id="product-promo" type="number" min={0} {...register("promoPrice")} />
                <FieldError errors={[errors.promoPrice]} />
              </Field>
              <Field>
                <FieldLabel htmlFor="product-availability">Disponibilité</FieldLabel>
                <Controller
                  control={control}
                  name="availability"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="product-availability" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(AVAILABILITY_LABELS).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
            </FieldGroup>
          </div>

          <div className="rounded-lg border border-border p-5">
            <h2 className="mb-4 text-sm font-medium tracking-wide text-muted-foreground uppercase">
              Organisation
            </h2>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="product-category">Catégorie</FieldLabel>
                <Controller
                  control={control}
                  name="categoryId"
                  render={({ field }) => (
                    <Select
                      value={field.value ?? "none"}
                      onValueChange={(v) => field.onChange(v === "none" ? null : v)}
                    >
                      <SelectTrigger id="product-category" className="w-full">
                        <SelectValue placeholder="Aucune catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Aucune catégorie</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
              <Field orientation="horizontal">
                <FieldLabel htmlFor="product-featured">Produit en vedette</FieldLabel>
                <Controller
                  control={control}
                  name="isFeatured"
                  render={({ field }) => (
                    <Switch id="product-featured" checked={field.value} onCheckedChange={field.onChange} />
                  )}
                />
              </Field>
              <Field orientation="horizontal">
                <FieldLabel htmlFor="product-published">Publié</FieldLabel>
                <Controller
                  control={control}
                  name="isPublished"
                  render={({ field }) => (
                    <Switch id="product-published" checked={field.value} onCheckedChange={field.onChange} />
                  )}
                />
              </Field>
            </FieldGroup>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-6">
        {product ? (
          <ConfirmDialog
            trigger={
              <Button type="button" variant="outline" className="gap-2 text-destructive hover:text-destructive">
                <Trash2 className="size-4" />
                Supprimer le produit
              </Button>
            }
            title="Supprimer ce produit ?"
            description={`"${product.name}" sera définitivement supprimé, y compris ses images.`}
            onConfirm={async () => {
              const result = await deleteProduct(product.id);
              if (result.success) {
                toast.success("Produit supprimé.");
                router.push("/admin/products");
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
          {product ? "Enregistrer les modifications" : "Créer le produit"}
        </Button>
      </div>
    </form>
  );
}
