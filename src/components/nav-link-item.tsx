"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type NavLink = {
  label: string;
  href: string;
  comingSoon?: boolean;
};

interface NavLinkItemProps {
  link: NavLink;
  onNavigate?: () => void;
  onScrollTo?: (href: string) => void;
  className?: string;
}

export function NavLinkItem({
  link,
  onNavigate,
  onScrollTo,
  className,
}: NavLinkItemProps) {
  const label = (
    <span className="inline-flex items-center gap-1.5">
      {link.label}
      {link.comingSoon && (
        <Badge
          variant="outline"
          className="rounded-full border-pink-200 bg-pink-50 px-1.5 py-0 text-[10px] font-semibold uppercase tracking-wide text-pink-500 dark:border-pink-800 dark:bg-pink-950/50 dark:text-pink-300"
        >
          Soon
        </Badge>
      )}
    </span>
  );

  if (link.href.startsWith("/")) {
    return (
      <Link
        href={link.href}
        onClick={onNavigate}
        className={className}
      >
        {label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onScrollTo?.(link.href)}
      className={className}
    >
      {label}
    </button>
  );
}

export function navLinkClassName(compact = false) {
  return cn(
    "font-medium text-foreground/80 transition-colors hover:bg-pink-50 hover:text-pink-500 dark:hover:bg-pink-950/50 dark:hover:text-pink-300",
    compact
      ? "rounded-xl px-4 py-3 text-left text-base"
      : "rounded-lg px-3 py-2 text-sm"
  );
}
