"use client";

import { HardDrive, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { EmptyState } from "@/components/admin/empty-state";
import { SmartImage } from "@/components/media/smart-image";
import { Button } from "@/components/ui/button";
import { deleteMediaFile, type MediaLibraryFile } from "@/lib/actions/media";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Ko";
  const units = ["o", "Ko", "Mo", "Go"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** i).toFixed(1)} ${units[i]}`;
}

export function MediaLibraryGrid({ files }: { files: MediaLibraryFile[] }) {
  const router = useRouter();

  if (files.length === 0) {
    return (
      <EmptyState
        icon={HardDrive}
        title="Aucun fichier"
        description="Les images ajoutées depuis les produits, services, événements, offres et la galerie apparaîtront ici."
      />
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
      {files.map((file) => (
        <div key={file.path} className="group relative overflow-hidden rounded-md border border-border">
          <SmartImage src={file.url} alt={file.path} aspectRatio={1} />
          <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/70 via-transparent to-transparent p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex justify-end">
              <ConfirmDialog
                trigger={
                  <Button size="icon-sm" variant="destructive" aria-label="Supprimer">
                    <Trash2 className="size-3.5" />
                  </Button>
                }
                title="Supprimer ce fichier ?"
                description="S'il est encore utilisé par un produit, un service ou un événement, l'image y apparaîtra cassée."
                onConfirm={async () => {
                  const result = await deleteMediaFile(file.path);
                  if (result.success) {
                    toast.success("Fichier supprimé.");
                    router.refresh();
                  } else {
                    toast.error(result.error);
                  }
                }}
              />
            </div>
            <p className="truncate text-[10px] text-white">{formatBytes(file.size)}</p>
          </div>
          <span className="absolute top-1.5 left-1.5 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white">
            {file.folder}
          </span>
        </div>
      ))}
    </div>
  );
}
