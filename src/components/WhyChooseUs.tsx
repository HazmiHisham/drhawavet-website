"use client";

import {
  Award,
  Building2,
  Heart,
  BadgeDollarSign,
  MapPin,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { WHY_CHOOSE_US } from "@/lib/constants";
import { AnimatedSection, AnimatedItem, type SectionTone } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/i18n/locale-context";

const iconMap: Record<string, LucideIcon> = {
  Award,
  Building2,
  Heart,
  BadgeDollarSign,
  MapPin,
  Clock,
};

export function WhyChooseUs({ tone }: { tone?: SectionTone }) {
  const { dict } = useI18n();

  return (
    <AnimatedSection tone={tone} className="py-20 sm:py-28" stagger>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedItem>
          <SectionHeader
            badge={dict.whyUs.badge}
            title={dict.whyUs.title}
            description={dict.whyUs.description}
          />
        </AnimatedItem>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map((item, index) => {
            const Icon = iconMap[item.icon] ?? Heart;
            const copy = dict.whyUs.items[index];
            return (
              <AnimatedItem key={item.icon}>
                <Card className="group h-full border-border/60 bg-white/60 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/10 dark:bg-slate-900/60">
                  <CardContent className="flex gap-4 p-6">
                    <div className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500/10 to-pink-300/10 text-pink-500 transition-colors group-hover:from-pink-400 group-hover:to-pink-300 group-hover:text-white dark:text-pink-400">
                      <Icon className="size-6" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">
                        {copy?.title ?? item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {copy?.description ?? item.description}
                      </p>
                    </div>
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
