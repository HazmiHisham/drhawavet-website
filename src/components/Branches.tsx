"use client";

import { MapPin, MessageCircle, Clock } from "lucide-react";
import { BRANCHES } from "@/lib/constants";
import { AnimatedSection, AnimatedItem, type SectionTone } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { OpeningHoursCard } from "@/components/OpeningHours";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Branches({ tone }: { tone?: SectionTone }) {
  return (
    <AnimatedSection
      id="branches"
      tone={tone}
      className="py-16 sm:py-20"
      stagger
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedItem>
          <SectionHeader
            badge="Locations"
            title="Our Branches"
            description="Seven convenient locations across the Klang Valley. Find the branch nearest to you."
          />
        </AnimatedItem>

        <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 lg:col-span-2">
            {BRANCHES.map((branch) => (
              <AnimatedItem key={branch.id}>
                <Card className="group overflow-hidden border-border/60 bg-white/70 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-pink-200 hover:shadow-md hover:shadow-pink-500/10 dark:bg-slate-900/70 dark:hover:border-pink-800">
                  <CardContent className="p-3.5 sm:p-4">
                    <div className="mb-2 flex items-start gap-2.5">
                      <div className="inline-flex shrink-0 rounded-lg bg-pink-100 p-1.5 text-pink-500 dark:bg-pink-950 dark:text-pink-400">
                        <MapPin className="size-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xs font-semibold leading-snug text-foreground sm:text-sm">
                          {branch.name}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
                          {branch.address}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 border-t border-border/50 pt-2.5">
                      <span className="inline-flex items-center gap-1 text-[10px] text-pink-500 dark:text-pink-400 sm:text-xs">
                        <Clock className="size-3" />
                        Open Daily
                      </span>
                      <a
                        href={branch.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          buttonVariants({ variant: "outline", size: "xs" }),
                          "h-7 rounded-full border-pink-200 px-2.5 text-[11px] hover:bg-pink-50 dark:border-pink-800 dark:hover:bg-pink-950/50"
                        )}
                      >
                        <MessageCircle className="size-3" />
                        Contact
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedItem>
            ))}
          </div>

          <AnimatedItem className="lg:sticky lg:top-24">
            <OpeningHoursCard />
          </AnimatedItem>
        </div>
      </div>
    </AnimatedSection>
  );
}
