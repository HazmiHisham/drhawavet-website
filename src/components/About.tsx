"use client";

import {
  UserCheck,
  Microscope,
  Wallet,
  Smile,
  Home,
  type LucideIcon,
} from "lucide-react";
import { ABOUT_FEATURES } from "@/lib/constants";
import { AnimatedSection, AnimatedItem, type SectionTone } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/i18n/locale-context";

const iconMap: Record<string, LucideIcon> = {
  UserCheck,
  Microscope,
  Wallet,
  Smile,
  Home,
};

export function About({ tone }: { tone?: SectionTone }) {
  const { dict } = useI18n();

  return (
    <AnimatedSection
      id="about"
      tone={tone}
      className="py-20 sm:py-28"
      stagger
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedItem>
          <SectionHeader
            badge={dict.about.badge}
            title={dict.about.title}
            description={dict.about.description}
          />
        </AnimatedItem>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {ABOUT_FEATURES.map((feature, index) => {
            const Icon = iconMap[feature.icon] ?? UserCheck;
            const copy = dict.about.features[index];
            return (
              <AnimatedItem key={feature.icon}>
                <Card className="group h-full border-border/60 bg-white/60 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/10 dark:bg-slate-900/60">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex rounded-2xl bg-pink-100 p-3 text-pink-500 transition-colors group-hover:bg-pink-400 group-hover:text-white dark:bg-pink-950 dark:text-pink-400">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="mb-2 font-semibold text-foreground">
                      {copy?.title ?? feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {copy?.description ?? feature.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedItem>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
