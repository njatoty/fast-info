"use client";

import { ImagePlus, Images, Loader2, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { EmptyState } from "@/components/admin/empty-state";
import { SmartImage } from "@/components/media/smart-image";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { createGalleryItems, deleteGalleryItem, updateGalleryItem } from "@/lib/actions/gallery";
import { createSupabaseMediaProvider } from "@/lib/media/supabase-provider";
import { pathFromPublicUrl } from "@/lib/media/url";
import { type GalleryItemValues } from "@/lib/validation/gallery-item";
import type { GalleryCategory, GalleryItem } from "@/types/domain";

function EditItemSheet({
  item,
  categories,
  open,
  onOpenChange,
}: {
  item: GalleryItem | null;
  categories: GalleryCategory[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const { register, handleSubmit, control, reset, formState } = useForm<GalleryItemValues>({
    values: {
      categoryId: item?.category?.id ?? null,
      caption: item?.caption ?? "",
      isPublished: item?.isPublished ?? true,
    },
  });

  async function submit(values: GalleryItemValues) {
    if (!item) return;
    const result = await updateGalleryItem(item.id, values);
    if (result.success) {
      toast.success("Photo mise à jour.");
      onOpenChange(false);
      router.refresh();
    } else {
      toast.error(result.error);
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) reset();
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Modifier la photo</SheetTitle>
        </SheetHeader>
        {item ? (
          <form onSubmit={handleSubmit(submit)} className="flex flex-1 flex-col gap-4 px-4">
            <SmartImage
              src={item.image.url}
              alt={item.image.alt}
              aspectRatio={item.image.width / item.image.height}
              wrapperClassName="rounded-md"
            />
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="gallery-caption">Légende (optionnel)</FieldLabel>
                <Input id="gallery-caption" {...register("caption")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="gallery-category">Catégorie</FieldLabel>
                <Controller
                  control={control}
                  name="categoryId"
                  render={({ field }) => (
                    <Select
                      value={field.value ?? "none"}
                      onValueChange={(v) => field.onChange(v === "none" ? null : v)}
                    >
                      <SelectTrigger id="gallery-category" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Aucune catégorie</SelectItem>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
              <Field orientation="horizontal">
                <FieldLabel htmlFor="gallery-published">Publiée</FieldLabel>
                <Controller
                  control={control}
                  name="isPublished"
                  render={({ field }) => (
                    <Switch
                      id="gallery-published"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </Field>
            </FieldGroup>
            <SheetFooter className="px-0">
              <Button type="submit" disabled={formState.isSubmitting}>
                {formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
                Enregistrer
              </Button>
            </SheetFooter>
          </form>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

export function GalleryAdminGrid({
  items,
  categories,
}: {
  items: GalleryItem[];
  categories: GalleryCategory[];
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadCategory, setUploadCategory] = useState<string>("none");
  const [uploading, setUploading] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  async function handleFiles(files: FileList) {
    setUploading(true);
    try {
      const provider = createSupabaseMediaProvider();
      const uploads = await Promise.all(Array.from(files).map((file) => provider.upload(file, "gallery")));
      const images = uploads.map((uploaded) => ({
        id: uploaded.path,
        url: uploaded.publicUrl,
        alt: "",
        width: uploaded.width,
        height: uploaded.height,
        position: 0,
      }));
      const result = await createGalleryItems(images, uploadCategory === "none" ? null : uploadCategory);
      if (result.success) {
        toast.success(`${files.length} photo(s) ajoutée(s).`);
        router.refresh();
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("Échec de l'envoi des photos.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-4">
        <div className="flex items-center gap-3">
          <Select value={uploadCategory} onValueChange={setUploadCategory}>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Aucune catégorie</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">Catégorie appliquée aux prochains ajouts.</p>
        </div>
        <Button onClick={() => inputRef.current?.click()} disabled={uploading} className="gap-2">
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}
          Ajouter des photos
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) void handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={Images}
          title="Aucune photo"
          description="Ajoutez vos premières photos pour remplir la galerie publique."
        />
      ) : (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {items.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-md border border-border">
              <SmartImage
                src={item.image.url}
                alt={item.image.alt}
                aspectRatio={item.image.width / item.image.height}
              />
              <div className="absolute inset-0 flex items-start justify-end gap-1 bg-black/0 p-1.5 opacity-0 transition-opacity group-hover:bg-black/20 group-hover:opacity-100">
                <Button
                  size="icon-sm"
                  variant="secondary"
                  aria-label="Modifier"
                  onClick={() => {
                    setEditingItem(item);
                    setSheetOpen(true);
                  }}
                >
                  <Pencil className="size-3.5" />
                </Button>
                <ConfirmDialog
                  trigger={
                    <Button size="icon-sm" variant="destructive" aria-label="Supprimer">
                      <Trash2 className="size-3.5" />
                    </Button>
                  }
                  title="Supprimer cette photo ?"
                  description="Cette photo sera définitivement supprimée de la galerie."
                  onConfirm={async () => {
                    const result = await deleteGalleryItem(item.id, pathFromPublicUrl(item.image.url));
                    if (result.success) {
                      toast.success("Photo supprimée.");
                      router.refresh();
                    } else {
                      toast.error(result.error);
                    }
                  }}
                />
              </div>
              {item.category ? (
                <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white">
                  {item.category.name}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      )}

      <EditItemSheet item={editingItem} categories={categories} open={sheetOpen} onOpenChange={setSheetOpen} />
    </div>
  );
}
