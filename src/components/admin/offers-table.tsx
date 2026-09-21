"use client";

import { Pencil, Plus, Tag, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { EmptyState } from "@/components/admin/empty-state";
import { OfferFormSheet } from "@/components/admin/offer-form-sheet";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createOffer, deleteOffer, toggleOfferActive, updateOffer } from "@/lib/actions/offers";
import { formatCurrency, formatDateRange, isOfferActive } from "@/lib/utils/format";
import type { Offer } from "@/types/domain";

export function OffersTable({ offers }: { offers: Offer[] }) {
  const router = useRouter();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | undefined>(undefined);

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button
          className="gap-2"
          onClick={() => {
            setEditingOffer(undefined);
            setSheetOpen(true);
          }}
        >
          <Plus className="size-4" />
          Nouvelle offre
        </Button>
      </div>

      {offers.length === 0 ? (
        <EmptyState
          icon={Tag}
          title="Aucune offre"
          description="Créez votre première promotion pour la mettre en avant sur le site."
        />
      ) : (
        <div className="rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Offre</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Période</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offers.map((offer) => {
                const currentlyLive = isOfferActive({
                  is_active: offer.isActive,
                  starts_at: offer.startsAt,
                  ends_at: offer.endsAt,
                });
                return (
                  <TableRow key={offer.id}>
                    <TableCell className="font-medium">{offer.title}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {offer.promoPrice ? formatCurrency(offer.promoPrice) : "—"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {offer.startsAt ? formatDateRange(offer.startsAt, offer.endsAt) : "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={offer.isActive}
                          onCheckedChange={async (checked) => {
                            const result = await toggleOfferActive(offer.id, checked);
                            if (result.success) router.refresh();
                            else toast.error(result.error);
                          }}
                        />
                        <span className="text-xs text-muted-foreground">
                          {currentlyLive ? "En ligne" : "Inactive"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label="Modifier"
                          onClick={() => {
                            setEditingOffer(offer);
                            setSheetOpen(true);
                          }}
                        >
                          <Pencil className="size-3.5" />
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
                          title="Supprimer cette offre ?"
                          description={`"${offer.title}" sera définitivement supprimée.`}
                          onConfirm={async () => {
                            const result = await deleteOffer(offer.id);
                            if (result.success) {
                              toast.success("Offre supprimée.");
                              router.refresh();
                            } else {
                              toast.error(result.error);
                            }
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <OfferFormSheet
        key={editingOffer?.id ?? "new"}
        offer={editingOffer}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onSubmit={(values, image) =>
          editingOffer ? updateOffer(editingOffer.id, values, image) : createOffer(values, image)
        }
      />
    </div>
  );
}
