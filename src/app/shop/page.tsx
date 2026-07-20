"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBag, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { BackToTop } from "@/components/BackToTop";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/lib/constants";
import { useI18n } from "@/i18n/locale-context";

export default function ShopPage() {
  const { dict } = useI18n();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-pink-50/50 via-white to-pink-50/50 pt-24 dark:from-pink-950/20 dark:via-background dark:to-pink-950/20">
        <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-pink-500 transition-colors hover:text-pink-400 dark:text-pink-400"
          >
            <ArrowLeft className="size-4" />
            {dict.shop.backHome}
          </Link>
        </div>

        <section className="mx-auto flex max-w-2xl flex-col items-center px-4 pb-24 text-center sm:px-6">
          <Badge className="mb-6 rounded-full bg-pink-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-pink-600 hover:bg-pink-100 dark:bg-pink-950 dark:text-pink-300">
            {dict.shop.comingSoon}
          </Badge>

          <div className="mb-8 flex size-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-pink-400 to-pink-300 text-white shadow-xl shadow-pink-400/30">
            <ShoppingBag className="size-11" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {dict.shop.title}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {dict.shop.description}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button
              render={<Link href="/" />}
              className="h-11 rounded-full bg-gradient-to-r from-pink-400 to-pink-300 px-8 font-semibold shadow-lg shadow-pink-400/25 hover:from-pink-500 hover:to-pink-400"
            >
              {dict.shop.exploreServices}
            </Button>
            <Button
              render={
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              variant="outline"
              className="h-11 rounded-full border-pink-200 px-8 font-semibold hover:bg-pink-50 dark:border-pink-800 dark:hover:bg-pink-950/50"
            >
              <Sparkles className="size-4" />
              {dict.shop.followUpdates}
            </Button>
          </div>

          <div className="mt-16 w-full rounded-3xl border border-pink-100 bg-white/70 p-8 shadow-sm backdrop-blur-sm dark:border-pink-900 dark:bg-slate-900/70">
            <p className="text-sm font-medium text-foreground">
              {dict.shop.expectTitle}
            </p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {dict.shop.expectItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
    </>
  );
}
