"use client";

import { Pencil, Plus, PartyPopper, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { EmptyState } from "@/components/admin/empty-state";
import { PublishBadge } from "@/components/admin/publish-badge";
import { SmartImage } from "@/components/media/smart-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteEvent, toggleEventPublished } from "@/lib/actions/events";
import { formatDateRange } from "@/lib/utils/format";
import type { EventProject } from "@/types/domain";

export function EventsTable({ events }: { events: EventProject[] }) {
  const router = useRouter();

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button asChild className="gap-2">
          <Link href="/admin/events/new">
            <Plus className="size-4" />
            Nouvel événement
          </Link>
        </Button>
      </div>

      {events.length === 0 ? (
        <EmptyState
          icon={PartyPopper}
          title="Aucun événement"
          description="Ajoutez votre premier projet photo à mettre en avant."
        />
      ) : (
        <div className="rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-14" />
                <TableHead>Titre</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div className="size-10 overflow-hidden rounded-md">
                      <SmartImage
                        src={event.coverImage?.url}
                        alt={event.coverImage?.alt ?? event.title}
                        aspectRatio={1}
                        sizes="40px"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/events/${event.id}`} className="font-medium hover:text-primary">
                      {event.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">
                      {event.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDateRange(event.date, event.endDate)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={event.isPublished}
                        onCheckedChange={async (checked) => {
                          const result = await toggleEventPublished(event.id, checked);
                          if (result.success) router.refresh();
                          else toast.error(result.error);
                        }}
                      />
                      <PublishBadge isPublished={event.isPublished} />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon-sm" aria-label="Modifier" asChild>
                        <Link href={`/admin/events/${event.id}`}>
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
                        title="Supprimer cet événement ?"
                        description={`"${event.title}" sera définitivement supprimé.`}
                        onConfirm={async () => {
                          const result = await deleteEvent(event.id);
                          if (result.success) {
                            toast.success("Événement supprimé.");
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
