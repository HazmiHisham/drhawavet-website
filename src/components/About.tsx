"use client";

import {
  UserCheck,
  Microscope,
  Wallet,
  Smile,
  Home,
  type LucideIcon,
} from "lucide-react";
import { ABOUT_FEATURES, STATS } from "@/lib/constants";
import { AnimatedSection, AnimatedItem, type SectionTone } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";

const iconMap: Record<string, LucideIcon> = {
  UserCheck,
  Microscope,
  Wallet,
  Smile,
  Home,
};

export function About({ tone }: { tone?: SectionTone }) {
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
            badge="About Us"
            title="About DRHAWAVET"
            description="We are a trusted veterinary clinic network dedicated to providing exceptional care for your beloved pets across Malaysia."
          />
        </AnimatedItem>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {ABOUT_FEATURES.map((feature) => {
            const Icon = iconMap[feature.icon] ?? UserCheck;
            return (
              <AnimatedItem key={feature.title}>
                <Card className="group h-full border-border/60 bg-white/60 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-200 hover:shadow-lg hover:shadow-pink-500/10 dark:bg-slate-900/60 dark:hover:border-pink-800">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex rounded-2xl bg-pink-100 p-3 text-pink-500 transition-colors group-hover:bg-pink-400 group-hover:text-white dark:bg-pink-950 dark:text-pink-400">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="mb-2 font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedItem>
            );
          })}
        </div>

        <AnimatedItem>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-pink-100 bg-gradient-to-br from-pink-50 to-pink-100 p-8 text-center shadow-sm dark:border-pink-900 dark:from-pink-950/50 dark:to-pink-950/30"
              >
                <p className="text-4xl font-bold text-pink-500 dark:text-pink-400">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </AnimatedItem>
      </div>
    </AnimatedSection>
  );
}
