"use client";

import { Package, Pencil, Plus, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { EmptyState } from "@/components/admin/empty-state";
import { PublishBadge } from "@/components/admin/publish-badge";
import { SmartImage } from "@/components/media/smart-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteProduct, toggleProductPublished } from "@/lib/actions/products";
import { formatCurrency } from "@/lib/utils/format";
import type { Product } from "@/types/domain";

export function ProductsTable({ products }: { products: Product[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <Input
          placeholder="Rechercher un produit…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Button asChild className="gap-2">
          <Link href="/admin/products/new">
            <Plus className="size-4" />
            Nouveau produit
          </Link>
        </Button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Package}
          title={products.length === 0 ? "Aucun produit" : "Aucun résultat"}
          description={
            products.length === 0
              ? "Ajoutez votre premier produit pour commencer à remplir le catalogue."
              : "Aucun produit ne correspond à votre recherche."
          }
        />
      ) : (
        <div className="rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-14" />
                <TableHead>Nom</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="size-10 overflow-hidden rounded-md">
                      <SmartImage
                        src={product.mainImage?.url}
                        alt={product.mainImage?.alt ?? product.name}
                        aspectRatio={1}
                        sizes="40px"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="flex items-center gap-1.5 font-medium hover:text-primary"
                    >
                      {product.name}
                      {product.isFeatured ? (
                        <Star className="size-3 fill-primary text-primary" />
                      ) : null}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {product.category?.name ?? "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatCurrency(product.promoPrice ?? product.price)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={product.isPublished}
                        onCheckedChange={async (checked) => {
                          const result = await toggleProductPublished(product.id, checked);
                          if (result.success) router.refresh();
                          else toast.error(result.error);
                        }}
                      />
                      <PublishBadge isPublished={product.isPublished} />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon-sm" aria-label="Modifier" asChild>
                        <Link href={`/admin/products/${product.id}`}>
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
                        title="Supprimer ce produit ?"
                        description={`"${product.name}" sera définitivement supprimé.`}
                        onConfirm={async () => {
                          const result = await deleteProduct(product.id);
                          if (result.success) {
                            toast.success("Produit supprimé.");
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
