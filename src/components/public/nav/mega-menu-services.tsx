"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { NavigationMenu } from "radix-ui";

import { SmartImage } from "@/components/media/smart-image";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { getServiceIcon } from "@/lib/icons";
import type { Service } from "@/types/domain";

export function MegaMenuServices({
  services,
  featuredService,
  dict,
}: {
  services: Service[];
  featuredService: Service | null;
  dict: Dictionary;
}) {
  const copy = dict.nav.megaMenu.services;

  return (
    <div className="grid w-[640px] grid-cols-[1fr_1.15fr]">
      <div className="p-6">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {copy.listLabel}
        </p>
        <ul className="mt-3 flex flex-col gap-0.5">
          {services.map((service) => {
            const Icon = getServiceIcon(service.slug);
            return (
              <li key={service.id}>
                <NavigationMenu.Link asChild>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex items-center gap-3 rounded-md px-2.5 py-2 text-sm text-foreground/90 transition-colors hover:bg-accent"
                  >
                    <Icon className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                    {service.title}
                  </Link>
                </NavigationMenu.Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-3 border-t border-border pt-3">
          <NavigationMenu.Link asChild>
            <Link
              href="/services"
              className="group flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-primary"
            >
              {copy.viewAll}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </NavigationMenu.Link>
        </div>
      </div>

      {featuredService ? (
        <div className="border-l border-border bg-muted/30 p-6">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {copy.featuredLabel}
          </p>
          <NavigationMenu.Link asChild>
            <Link href={`/services/${featuredService.slug}`} className="group mt-3 block">
              <SmartImage
                src={featuredService.coverImage?.url}
                alt={featuredService.coverImage?.alt ?? featuredService.title}
                blurDataURL={featuredService.coverImage?.blurDataURL}
                aspectRatio={4 / 3}
                sizes="240px"
                wrapperClassName="rounded-xl"
                className="transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <p className="mt-3 font-heading text-base font-medium">{featuredService.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{featuredService.shortDescription}</p>
            </Link>
          </NavigationMenu.Link>
        </div>
      ) : null}
    </div>
  );
}
