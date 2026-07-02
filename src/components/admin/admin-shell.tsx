"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Menu,
  PawPrint,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { isAdminAuthenticated, logoutAdmin } from "@/lib/admin-auth";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Public Site", href: "/", icon: PawPrint },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.replace("/admin/login");
      return;
    }
    setReady(true);
  }, [router]);

  const handleLogout = () => {
    logoutAdmin();
    router.replace("/admin/login");
  };

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-pink-50/40 dark:bg-background">
        <div className="size-8 animate-spin rounded-full border-2 border-pink-300 border-t-transparent" />
      </div>
    );
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="border-b border-border/60 p-6">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="DRHAWAVET"
            width={44}
            height={44}
            className="rounded-full"
          />
          <div>
            <p className="font-bold text-foreground">DRHAWAVET</p>
            <p className="text-xs text-muted-foreground">Admin Dashboard</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
              pathname === href
                ? "bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-300"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-border/60 p-4">
        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full justify-start rounded-xl"
        >
          <LogOut className="size-4" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-pink-50/30 dark:bg-background">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-border/60 bg-white/80 backdrop-blur-md dark:bg-slate-950/80 lg:block">
          {sidebar}
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border/60 bg-white/90 px-4 py-4 backdrop-blur-md dark:bg-slate-950/90 sm:px-6">
            <div className="flex items-center gap-3">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger
                  render={
                    <Button variant="ghost" size="icon" className="lg:hidden">
                      <Menu className="size-5" />
                    </Button>
                  }
                />
                <SheetContent side="left" className="w-72 p-0">
                  <SheetTitle className="sr-only">Admin menu</SheetTitle>
                  {sidebar}
                </SheetContent>
              </Sheet>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Booking Dashboard
                </p>
                <p className="text-xs text-muted-foreground">
                  Manage appointments by branch
                </p>
              </div>
            </div>
            <div className="hidden items-center gap-2 rounded-full bg-pink-100 px-3 py-1.5 text-xs font-medium text-pink-600 dark:bg-pink-950 dark:text-pink-300 sm:flex">
              <CalendarDays className="size-3.5" />
              Prototype Admin View
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
