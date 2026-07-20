"use client";

import { useState } from "react";
import { MapPin, MessageCircle } from "lucide-react";
import { BRANCHES, type Branch } from "@/lib/constants";
import { AnimatedSection, AnimatedItem, type SectionTone } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { OpeningHoursCard } from "@/components/OpeningHours";
import { BranchMap } from "@/components/branch-map";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/i18n/locale-context";
import { cn } from "@/lib/utils";

function getBranchLabel(name: string) {
  return name.replace(/^drhawavet\s+/i, "");
}

export function Branches({ tone }: { tone?: SectionTone }) {
  const [selectedBranchId, setSelectedBranchId] = useState<Branch["id"]>(
    BRANCHES[0].id
  );
  const selectedBranch =
    BRANCHES.find((branch) => branch.id === selectedBranchId) ?? BRANCHES[0];
  const { dict } = useI18n();

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
            badge={dict.branches.badge}
            title={dict.branches.title}
            description={dict.branches.description}
          />
        </AnimatedItem>

        <AnimatedItem>
          <div className="grid items-stretch gap-4 lg:grid-cols-[minmax(10rem,1fr)_minmax(0,2fr)_minmax(11rem,1fr)] lg:gap-5 xl:grid-cols-[minmax(11rem,1fr)_2.2fr_minmax(12rem,1fr)]">
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2 lg:flex lg:flex-col">
              {BRANCHES.map((branch) => {
                const isSelected = branch.id === selectedBranchId;
                const showDetails = isSelected;

                return (
                  <Card
                    key={branch.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedBranchId(branch.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedBranchId(branch.id);
                      }
                    }}
                    className={cn(
                      "group cursor-pointer overflow-hidden border-border/60 bg-white/70 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:shadow-pink-500/10 dark:bg-slate-900/70",
                      isSelected &&
                        "border-pink-400 bg-pink-50/80 shadow-md shadow-pink-500/15 ring-2 ring-pink-400 dark:border-pink-400 dark:bg-pink-950/40 dark:ring-pink-400"
                    )}
                  >
                    <CardContent className="p-2 sm:p-2.5">
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <MapPin
                          className={cn(
                            "size-2.5 shrink-0 text-pink-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:size-3",
                            showDetails && "opacity-100"
                          )}
                        />
                        <h3 className="truncate text-[11px] font-semibold leading-tight text-foreground sm:text-xs">
                          {getBranchLabel(branch.name)}
                        </h3>
                      </div>

                      <div
                        className={cn(
                          "grid transition-all duration-300 ease-out",
                          showDetails
                            ? "mt-1.5 grid-rows-[1fr] opacity-100 sm:mt-2"
                            : "grid-rows-[0fr] opacity-0 group-hover:mt-1.5 group-hover:grid-rows-[1fr] group-hover:opacity-100 sm:group-hover:mt-2"
                        )}
                      >
                        <div className="overflow-hidden">
                          <p className="line-clamp-2 text-[9px] leading-relaxed text-muted-foreground sm:text-[10px]">
                            {branch.address}
                          </p>
                          <a
                            href={branch.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={cn(
                              buttonVariants({ variant: "outline", size: "xs" }),
                              "mt-1.5 h-5 w-full rounded-full border-pink-200 px-1.5 text-[9px] hover:bg-pink-50 sm:mt-2 sm:h-6 sm:px-2 sm:text-[10px] dark:border-pink-800 dark:hover:bg-pink-950/50"
                            )}
                          >
                            <MessageCircle className="size-2 sm:size-2.5" />
                            {dict.branches.contact}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <BranchMap branch={selectedBranch} />

            <OpeningHoursCard className="h-full" />
          </div>
        </AnimatedItem>
      </div>
    </AnimatedSection>
  );
}
