"use client";

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
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { AnimatedSection, AnimatedItem, type SectionTone } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";

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
            badge="Our Services"
            title="Comprehensive Pet Care"
            description="From routine check-ups to emergency care, we offer a full range of veterinary services to keep your pets healthy and happy."
          />
        </AnimatedItem>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon] ?? Stethoscope;
            return (
              <AnimatedItem key={service.id}>
                <Card className="group h-full cursor-default overflow-hidden border-border/60 bg-white/70 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-pink-200 hover:shadow-xl hover:shadow-pink-500/10 dark:bg-slate-900/70 dark:hover:border-pink-800">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-pink-400 to-pink-300 p-3 text-white shadow-lg shadow-pink-400/25 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {service.description}
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
