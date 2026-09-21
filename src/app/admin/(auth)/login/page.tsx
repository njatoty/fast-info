import { AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

import { LoginForm } from "@/components/admin/login-form";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Connexion administrateur",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ setup?: string; unauthorized?: string }>;
}) {
  const { setup, unauthorized } = await searchParams;

  return (
    <div className="flex min-h-svh items-center justify-center bg-secondary/30 px-4">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-8 shadow-sm">
        <p className="font-heading text-lg font-semibold tracking-tight">
          Fast<span className="text-primary">Info</span>
        </p>
        <h1 className="mt-4 text-xl font-medium">Tableau de bord administrateur</h1>

        {!isSupabaseConfigured ? (
          <div className="mt-6 flex gap-3 rounded-md border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" />
            <div>
              <p className="font-medium text-amber-700 dark:text-amber-500">
                Configuration Supabase requise
              </p>
              <p className="mt-1 text-muted-foreground">
                Renseignez <code className="text-xs">NEXT_PUBLIC_SUPABASE_URL</code> et{" "}
                <code className="text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> dans{" "}
                <code className="text-xs">.env.local</code>, appliquez les migrations SQL, puis
                promouvez votre compte en administrateur. Voir le README pour la procédure
                complète.
              </p>
            </div>
          </div>
        ) : (
          <>
            {unauthorized ? (
              <p className="mt-6 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                Ce compte n&apos;a pas les droits administrateur.
              </p>
            ) : null}
            {setup ? (
              <p className="mt-6 rounded-md border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-500">
                Veuillez vous connecter pour continuer.
              </p>
            ) : null}
            <div className="mt-6">
              <LoginForm />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
