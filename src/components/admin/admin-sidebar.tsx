"use client";

import { cn } from "cn";
import {
  FolderTree,
  HardDrive,
  Images,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  PartyPopper,
  Settings,
  Tag,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { signOutAdmin } from "@/lib/actions/auth";
import type { AdminUser } from "@/lib/supabase/guard";

const NAV_ITEMS = [
  { href: "/admin", label: "Vue d'ensemble", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Produits", icon: Package },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/offers", label: "Offres", icon: Tag },
  { href: "/admin/gallery", label: "Galerie", icon: Images },
  { href: "/admin/events", label: "Événements", icon: PartyPopper },
  { href: "/admin/categories", label: "Catégories", icon: FolderTree },
  { href: "/admin/media", label: "Médias", icon: HardDrive },
  { href: "/admin/settings", label: "Paramètres", icon: Settings },
];

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-0.5">
      {NAV_ITEMS.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
            )}
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarFooter({ user }: { user: AdminUser }) {
  return (
    <div className="border-t border-sidebar-border p-3">
      <p className="truncate px-2 text-xs text-sidebar-foreground/60">{user.email}</p>
      <form action={signOutAdmin}>
        <Button
          type="submit"
          variant="ghost"
          size="sm"
          className="mt-1 w-full justify-start gap-2 text-sidebar-foreground/70 hover:text-sidebar-foreground"
        >
          <LogOut className="size-4" />
          Déconnexion
        </Button>
      </form>
    </div>
  );
}

export function AdminSidebar({ user }: { user: AdminUser }) {
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <div className="flex h-16 items-center border-b border-sidebar-border px-5">
          <Link href="/admin" className="font-heading text-lg font-semibold tracking-tight">
            Fast<span className="text-primary">Info</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <NavLinks pathname={pathname} />
        </div>
        <SidebarFooter user={user} />
      </aside>

      <header className="flex h-14 items-center justify-between border-b border-sidebar-border bg-sidebar px-4 lg:hidden">
        <Link href="/admin" className="font-heading text-base font-semibold tracking-tight">
          Fast<span className="text-primary">Info</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Ouvrir le menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-sidebar p-0">
            <SheetTitle className="sr-only">Menu d&apos;administration</SheetTitle>
            <div className="flex h-14 items-center border-b border-sidebar-border px-5">
              <span className="font-heading text-base font-semibold tracking-tight">
                Fast<span className="text-primary">Info</span>
              </span>
            </div>
            <div className="p-3">
              <NavLinks pathname={pathname} />
            </div>
            <SidebarFooter user={user} />
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}
