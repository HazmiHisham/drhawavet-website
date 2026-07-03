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
            description="Seven convenient locations across the Klang Valley. Select a branch to view it on the map."
          />
        </AnimatedItem>

        <AnimatedItem>
          <div className="grid items-stretch gap-4 lg:grid-cols-[minmax(10rem,1fr)_minmax(0,2fr)_minmax(11rem,1fr)] lg:gap-5 xl:grid-cols-[minmax(11rem,1fr)_2.2fr_minmax(12rem,1fr)]">
            <div className="flex flex-col gap-1.5">
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
                      "group cursor-pointer overflow-hidden border-border/60 bg-white/70 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-pink-200 hover:shadow-md hover:shadow-pink-500/10 dark:bg-slate-900/70 dark:hover:border-pink-800",
                      isSelected &&
                        "border-pink-400 bg-pink-50/80 shadow-md shadow-pink-500/15 ring-2 ring-pink-300/60 dark:border-pink-600 dark:bg-pink-950/40 dark:ring-pink-700/50"
                    )}
                  >
                    <CardContent className="p-2.5">
                      <div className="flex items-center gap-1.5">
                        <MapPin
                          className={cn(
                            "size-3 shrink-0 text-pink-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                            showDetails && "opacity-100"
                          )}
                        />
                        <h3 className="truncate text-xs font-semibold text-foreground">
                          {getBranchLabel(branch.name)}
                        </h3>
                      </div>

                      <div
                        className={cn(
                          "grid transition-all duration-300 ease-out",
                          showDetails
                            ? "mt-2 grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0 group-hover:mt-2 group-hover:grid-rows-[1fr] group-hover:opacity-100"
                        )}
                      >
                        <div className="overflow-hidden">
                          <p className="text-[10px] leading-relaxed text-muted-foreground">
                            {branch.address}
                          </p>
                          <a
                            href={branch.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={cn(
                              buttonVariants({ variant: "outline", size: "xs" }),
                              "mt-2 h-6 w-full rounded-full border-pink-200 px-2 text-[10px] hover:bg-pink-50 dark:border-pink-800 dark:hover:bg-pink-950/50"
                            )}
                          >
                            <MessageCircle className="size-2.5" />
                            Contact
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
