"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Stethoscope,
  Syringe,
  HeartPulse,
  Scissors,
  Cat,
  Dog,
  ClipboardCheck,
  Siren,
  Pill,
  Apple,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { AnimatedSection, AnimatedItem, type SectionTone } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/locale-context";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Stethoscope,
  Syringe,
  HeartPulse,
  Scissors,
  Cat,
  Dog,
  ClipboardCheck,
  Siren,
  Pill,
  Apple,
};

export function Services({ tone }: { tone?: SectionTone }) {
  const { dict } = useI18n();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [activePage, setActivePage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const updateControls = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < maxScroll - 8);

    const pageWidth = el.clientWidth;
    const pages = Math.max(1, Math.ceil(el.scrollWidth / pageWidth));
    setPageCount(pages);
    setActivePage(
      Math.min(pages - 1, Math.round(el.scrollLeft / Math.max(pageWidth, 1)))
    );
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    updateControls();
    el.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls);
    return () => {
      el.removeEventListener("scroll", updateControls);
      window.removeEventListener("resize", updateControls);
    };
  }, [updateControls]);

  const scrollByPage = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const goToPage = (page: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: page * el.clientWidth, behavior: "smooth" });
  };

  return (
    <AnimatedSection
      id="services"
      tone={tone}
      className="py-20 sm:py-28"
      stagger
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedItem>
          <SectionHeader
            badge={dict.services.badge}
            title={dict.services.title}
            description={dict.services.description}
          />
        </AnimatedItem>

        <AnimatedItem>
          <div className="relative">
            <div
              ref={scrollerRef}
              className="services-carousel flex items-stretch gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 [&::-webkit-scrollbar]:hidden"
            >
              {SERVICES.map((service) => {
                const Icon = iconMap[service.icon] ?? Stethoscope;
                const copy =
                  dict.services.items[
                    service.id as keyof typeof dict.services.items
                  ];
                return (
                  <Card
                    key={service.id}
                    className="group flex h-52 w-56 shrink-0 snap-start cursor-default flex-col border-border/60 bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/15 sm:h-56 sm:w-60 dark:bg-slate-900/80"
                  >
                    <CardContent className="flex h-full flex-col p-5 sm:p-6">
                      <div className="mb-3 inline-flex w-fit rounded-2xl bg-gradient-to-br from-pink-400 to-pink-300 p-3 text-white shadow-lg shadow-pink-400/25 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="mb-2 line-clamp-2 min-h-10 text-sm font-semibold text-foreground">
                        {copy?.title ?? service.title}
                      </h3>
                      <p className="line-clamp-3 flex-1 text-xs leading-relaxed text-muted-foreground">
                        {copy?.description ?? service.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => scrollByPage(-1)}
                disabled={!canPrev}
                aria-label={dict.services.prev}
                className="rounded-full disabled:opacity-40"
              >
                <ChevronLeft className="size-5" />
              </Button>

              <div className="flex items-center gap-2">
                {Array.from({ length: pageCount }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`${dict.hero.goToSlide} ${i + 1}`}
                    onClick={() => goToPage(i)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      i === activePage
                        ? "w-6 bg-pink-400"
                        : "w-2 bg-pink-200 hover:bg-pink-300 dark:bg-pink-800 dark:hover:bg-pink-700"
                    )}
                  />
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => scrollByPage(1)}
                disabled={!canNext}
                aria-label={dict.services.next}
                className="rounded-full disabled:opacity-40"
              >
                <ChevronRight className="size-5" />
              </Button>
            </div>
          </div>
        </AnimatedItem>
      </div>
    </AnimatedSection>
  );
}
