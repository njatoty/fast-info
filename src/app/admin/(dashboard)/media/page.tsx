import type { Metadata } from "next";

import { MediaLibraryGrid } from "@/components/admin/media-library-grid";
import { listMediaLibrary } from "@/lib/actions/media";

export const metadata: Metadata = {
  title: "Médiathèque",
  robots: { index: false, follow: false },
};

export default async function AdminMediaPage() {
  const files = await listMediaLibrary();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Médiathèque</h1>
        <p className="text-sm text-muted-foreground">
          Toutes les images envoyées depuis les produits, services, événements, offres et la
          galerie. Les nouveaux fichiers s&apos;ajoutent directement depuis chaque section — cette
          page sert à faire le ménage.
        </p>
      </div>
      <MediaLibraryGrid files={files} />
    </div>
  );
}
