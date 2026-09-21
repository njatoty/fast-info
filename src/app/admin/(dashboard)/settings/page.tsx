import type { Metadata } from "next";

import { SettingsForm } from "@/components/admin/settings-form";
import { getSiteSettings } from "@/lib/data/settings";

export const metadata: Metadata = {
  title: "Paramètres",
  robots: { index: false, follow: false },
};

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Paramètres du site</h1>
        <p className="text-sm text-muted-foreground">
          Ces informations alimentent l&apos;en-tête, le pied de page et la page de contact du site
          public.
        </p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  );
}
