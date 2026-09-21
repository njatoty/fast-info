"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FolderTree, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { EmptyState } from "@/components/admin/empty-state";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { slugify } from "@/lib/utils/slug";
import {
  categorySchema,
  type CategoryFormInput,
  type CategoryValues,
} from "@/lib/validation/category";

interface CategoryLike {
  id: string;
  name: string;
  slug: string;
  position: number;
}

interface CategoryManagerProps {
  title: string;
  description: string;
  categories: CategoryLike[];
  createAction: (values: CategoryValues) => Promise<{ success: boolean; error?: string }>;
  updateAction: (id: string, values: CategoryValues) => Promise<{ success: boolean; error?: string }>;
  deleteAction: (id: string) => Promise<{ success: boolean; error?: string }>;
}

function CategoryFormSheet({
  category,
  nextPosition,
  onSubmit,
  trigger,
}: {
  category?: CategoryLike;
  nextPosition: number;
  onSubmit: (values: CategoryValues) => Promise<{ success: boolean; error?: string }>;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [slugTouched, setSlugTouched] = useState(!!category);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormInput, unknown, CategoryValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: category ?? { name: "", slug: "", position: nextPosition },
  });

  async function submit(values: CategoryValues) {
    const result = await onSubmit(values);
    if (result.success) {
      toast.success(category ? "Catégorie mise à jour." : "Catégorie créée.");
      setOpen(false);
      reset();
      setSlugTouched(false);
    } else {
      toast.error(result.error ?? "Une erreur est survenue.");
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset(category ?? { name: "", slug: "", position: nextPosition });
      }}
    >
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{category ? "Modifier la catégorie" : "Nouvelle catégorie"}</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit(submit)} className="flex flex-1 flex-col gap-4 px-4">
          <FieldGroup>
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="cat-name">Nom</FieldLabel>
              <Input
                id="cat-name"
                {...register("name", {
                  onChange: (e) => {
                    if (!slugTouched) setValue("slug", slugify(e.target.value));
                  },
                })}
              />
              <FieldError errors={[errors.name]} />
            </Field>
            <Field data-invalid={!!errors.slug}>
              <FieldLabel htmlFor="cat-slug">Slug</FieldLabel>
              <Input
                id="cat-slug"
                {...register("slug", { onChange: () => setSlugTouched(true) })}
              />
              <FieldError errors={[errors.slug]} />
            </Field>
            <Field data-invalid={!!errors.position}>
              <FieldLabel htmlFor="cat-position">Ordre d&apos;affichage</FieldLabel>
              <Input id="cat-position" type="number" {...register("position")} />
              <FieldError errors={[errors.position]} />
            </Field>
          </FieldGroup>
          <SheetFooter className="px-0">
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
              {category ? "Enregistrer" : "Créer"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export function CategoryManager({
  title,
  description,
  categories,
  createAction,
  updateAction,
  deleteAction,
}: CategoryManagerProps) {
  const router = useRouter();
  const nextPosition = categories.length;

  return (
    <div className="rounded-lg border border-border">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div>
          <h2 className="font-medium">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <CategoryFormSheet
          nextPosition={nextPosition}
          onSubmit={async (values) => {
            const result = await createAction(values);
            router.refresh();
            return result;
          }}
          trigger={
            <Button size="sm" className="gap-2">
              <Plus className="size-4" />
              Ajouter
            </Button>
          }
        />
      </div>

      {categories.length === 0 ? (
        <div className="p-4">
          <EmptyState
            icon={FolderTree}
            title="Aucune catégorie"
            description="Créez votre première catégorie pour commencer à organiser votre catalogue."
          />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="text-muted-foreground">{category.slug}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <CategoryFormSheet
                      category={category}
                      nextPosition={nextPosition}
                      onSubmit={async (values) => {
                        const result = await updateAction(category.id, values);
                        router.refresh();
                        return result;
                      }}
                      trigger={
                        <Button variant="ghost" size="icon-sm" aria-label="Modifier">
                          <Pencil className="size-3.5" />
                        </Button>
                      }
                    />
                    <ConfirmDialog
                      trigger={
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label="Supprimer"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      }
                      title="Supprimer cette catégorie ?"
                      description={`"${category.name}" sera supprimée. Les éléments associés ne seront pas supprimés mais perdront cette catégorie.`}
                      onConfirm={async () => {
                        const result = await deleteAction(category.id);
                        if (result.success) {
                          toast.success("Catégorie supprimée.");
                          router.refresh();
                        } else {
                          toast.error(result.error ?? "Échec de la suppression.");
                        }
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
