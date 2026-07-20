"use client";

import { ExternalLink, MapPin } from "lucide-react";
import type { Branch } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";
import { useI18n } from "@/i18n/locale-context";
import { cn } from "@/lib/utils";

interface BranchMapProps {
  branch: Branch;
  className?: string;
}

function getMapEmbedUrl(lat: number, lng: number) {
  return `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`;
}

function getMapDirectionsUrl(lat: number, lng: number) {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

export function BranchMap({ branch, className }: BranchMapProps) {
  const { dict } = useI18n();
  const embedUrl = getMapEmbedUrl(branch.lat, branch.lng);
  const directionsUrl = getMapDirectionsUrl(branch.lat, branch.lng);

  return (
    <div
      className={cn(
        "flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-border/60 bg-white/70 shadow-sm backdrop-blur-sm dark:bg-slate-900/70",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border/50 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="inline-flex shrink-0 rounded-lg bg-pink-100 p-1.5 text-pink-500 dark:bg-pink-950 dark:text-pink-400">
            <MapPin className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              {branch.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {branch.address}
            </p>
          </div>
        </div>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "outline", size: "xs" }),
            "hidden shrink-0 rounded-full border-pink-200 sm:inline-flex dark:border-pink-800"
          )}
        >
          <ExternalLink className="size-3" />
          {dict.branches.directions}
        </a>
      </div>

      <div className="relative min-h-[200px] flex-1 bg-muted lg:min-h-0">
        <iframe
          key={branch.id}
          title={`Google Map showing ${branch.name}`}
          src={embedUrl}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      <div className="border-t border-border/50 px-4 py-2.5 sm:hidden">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "w-full rounded-full border-pink-200 dark:border-pink-800"
          )}
        >
          <ExternalLink className="size-4" />
          {dict.branches.getDirections}
        </a>
      </div>
    </div>
  );
}
