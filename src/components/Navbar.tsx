"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { NavLinkItem, navLinkClassName } from "@/components/nav-link-item";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    if (href.startsWith("#")) {
      if (window.location.pathname !== "/") {
        window.location.href = `/${href}`;
        return;
      }
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-white/90 shadow-sm backdrop-blur-md dark:bg-slate-950/90"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="DRHAWAVET Clinic"
            width={48}
            height={48}
            className="rounded-full shadow-md"
            priority
          />
          <div className="hidden sm:block">
            <p className="text-sm font-bold leading-none text-foreground">
              DRHAWAVET
            </p>
            <p className="text-xs text-muted-foreground">Clinic</p>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLinkItem
              key={link.href}
              link={link}
              onScrollTo={scrollTo}
              className={navLinkClassName()}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle dark mode"
              className="rounded-full"
            >
              {theme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </Button>
          )}

          <Link
            href="/booking"
            className="hidden h-9 items-center justify-center rounded-full bg-gradient-to-r from-pink-400 to-pink-300 px-5 text-sm font-semibold text-white shadow-lg shadow-pink-500/25 transition-all hover:from-pink-500 hover:to-pink-400 sm:inline-flex"
          >
            Book Appointment
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="size-5" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-80">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <div className="mt-8 flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <NavLinkItem
                    key={link.href}
                    link={link}
                    onNavigate={() => setOpen(false)}
                    onScrollTo={scrollTo}
                    className={navLinkClassName(true)}
                  />
                ))}
                <Link
                  href="/booking"
                  onClick={() => setOpen(false)}
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-400 to-pink-300 px-4 py-3 text-sm font-semibold text-white shadow-lg"
                >
                  Book Appointment
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
