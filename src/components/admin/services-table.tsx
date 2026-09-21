"use client";

import { Pencil, Plus, Star, Trash2, Wrench } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { EmptyState } from "@/components/admin/empty-state";
import { PublishBadge } from "@/components/admin/publish-badge";
import { SmartImage } from "@/components/media/smart-image";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteService, toggleServicePublished } from "@/lib/actions/services";
import type { Service } from "@/types/domain";

export function ServicesTable({ services }: { services: Service[] }) {
  const router = useRouter();

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button asChild className="gap-2">
          <Link href="/admin/services/new">
            <Plus className="size-4" />
            Nouveau service
          </Link>
        </Button>
      </div>

      {services.length === 0 ? (
        <EmptyState
          icon={Wrench}
          title="Aucun service"
          description="Ajoutez votre premier service pour le présenter sur le site."
        />
      ) : (
        <div className="rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-14" />
                <TableHead>Titre</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div className="size-10 overflow-hidden rounded-md">
                      <SmartImage
                        src={service.coverImage?.url}
                        alt={service.coverImage?.alt ?? service.title}
                        aspectRatio={1}
                        sizes="40px"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/admin/services/${service.id}`}
                      className="flex items-center gap-1.5 font-medium hover:text-primary"
                    >
                      {service.title}
                      {service.isFeatured ? (
                        <Star className="size-3 fill-primary text-primary" />
                      ) : null}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={service.isPublished}
                        onCheckedChange={async (checked) => {
                          const result = await toggleServicePublished(service.id, checked);
                          if (result.success) router.refresh();
                          else toast.error(result.error);
                        }}
                      />
                      <PublishBadge isPublished={service.isPublished} />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon-sm" aria-label="Modifier" asChild>
                        <Link href={`/admin/services/${service.id}`}>
                          <Pencil className="size-3.5" />
                        </Link>
                      </Button>
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
                        title="Supprimer ce service ?"
                        description={`"${service.title}" sera définitivement supprimé.`}
                        onConfirm={async () => {
                          const result = await deleteService(service.id);
                          if (result.success) {
                            toast.success("Service supprimé.");
                            router.refresh();
                          } else {
                            toast.error(result.error);
                          }
                        }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
