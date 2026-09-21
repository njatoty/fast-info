"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, ImagePlus, Loader2, Star, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { SmartImage } from "@/components/media/smart-image";
import { createSupabaseMediaProvider } from "@/lib/media/supabase-provider";
import type { MediaImage } from "@/types/domain";

function SortableThumb({
  image,
  isMain,
  onRemove,
}: {
  image: MediaImage;
  isMain: boolean;
  onRemove: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: image.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative overflow-hidden rounded-md border border-border"
    >
      <SmartImage src={image.url} alt={image.alt} aspectRatio={1} />
      {isMain ? (
        <span className="absolute top-1.5 left-1.5 flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
          <Star className="size-2.5" fill="currentColor" />
          Principale
        </span>
      ) : null}
      <button
        type="button"
        onClick={() => onRemove(image.id)}
        aria-label="Retirer l'image"
        className="absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100"
      >
        <X className="size-3.5" />
      </button>
      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label="Réorganiser"
        className="absolute bottom-1.5 right-1.5 flex size-6 cursor-grab items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing"
      >
        <GripVertical className="size-3.5" />
      </button>
    </div>
  );
}

export function GalleryManager({
  images,
  onChange,
  folder,
}: {
  images: MediaImage[];
  onChange: (images: MediaImage[]) => void;
  folder: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = images.findIndex((i) => i.id === active.id);
    const newIndex = images.findIndex((i) => i.id === over.id);
    onChange(arrayMove(images, oldIndex, newIndex).map((img, i) => ({ ...img, position: i })));
  }

  function handleRemove(id: string) {
    onChange(images.filter((i) => i.id !== id).map((img, i) => ({ ...img, position: i })));
    const provider = createSupabaseMediaProvider();
    provider.remove(id).catch(() => {});
  }

  async function handleFiles(files: FileList) {
    setUploading(true);
    try {
      const provider = createSupabaseMediaProvider();
      const uploads = await Promise.all(Array.from(files).map((file) => provider.upload(file, folder)));
      const newImages: MediaImage[] = uploads.map((uploaded, i) => ({
        id: uploaded.path,
        url: uploaded.publicUrl,
        alt: "",
        width: uploaded.width,
        height: uploaded.height,
        position: images.length + i,
      }));
      onChange([...images, ...newImages]);
    } catch {
      toast.error("Échec de l'envoi d'une ou plusieurs images.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={images.map((i) => i.id)} strategy={rectSortingStrategy}>
            {images.map((image, index) => (
              <SortableThumb key={image.id} image={image} isMain={index === 0} onRemove={handleRemove} />
            ))}
          </SortableContext>
        </DndContext>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex aspect-square items-center justify-center rounded-md border border-dashed border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        >
          {uploading ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <ImagePlus className="size-5" />
          )}
        </button>
      </div>

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

      {images.length > 0 ? (
        <p className="mt-2 text-xs text-muted-foreground">
          La première image est utilisée comme image principale. Glissez pour réorganiser.
        </p>
      ) : null}
    </div>
  );
}
