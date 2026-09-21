"use client";

import { ImagePlus, Loader2, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { SmartImage } from "@/components/media/smart-image";
import { Button } from "@/components/ui/button";
import { createSupabaseMediaProvider } from "@/lib/media/supabase-provider";
import type { MediaImage } from "@/types/domain";

interface ImageUploaderProps {
  value: MediaImage | null;
  onChange: (value: MediaImage | null) => void;
  folder: string;
  label?: string;
}

export function ImageUploader({ value, onChange, folder, label = "Image" }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const provider = createSupabaseMediaProvider();
      const previousPath = value ? new URL(value.url).pathname.split("/media/")[1] : null;
      const uploaded = await provider.upload(file, folder);

      onChange({
        id: uploaded.path,
        url: uploaded.publicUrl,
        alt: label,
        width: uploaded.width,
        height: uploaded.height,
        position: 0,
      });

      if (previousPath) {
        await provider.remove(previousPath).catch(() => {});
      }
    } catch {
      toast.error("Échec de l'envoi de l'image. Merci de réessayer.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <p className="mb-2 text-sm font-medium">{label}</p>
      <div className="flex items-start gap-4">
        <div className="relative size-32 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
          {value ? (
            <SmartImage src={value.url} alt={value.alt} aspectRatio={1} />
          ) : (
            <div className="flex size-full items-center justify-center text-muted-foreground/40">
              <ImagePlus className="size-6" strokeWidth={1.25} />
            </div>
          )}
          {uploading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-background/70">
              <Loader2 className="size-5 animate-spin text-muted-foreground" />
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
          >
            {value ? "Remplacer" : "Choisir une image"}
          </Button>
          {value ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => onChange(null)}
            >
              <X className="size-4" />
              Retirer
            </Button>
          ) : null}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
