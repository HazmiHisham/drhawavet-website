"use client";

import Image from "next/image";
import { CLIENTS } from "@/lib/constants";
import { AnimatedSection, AnimatedItem, type SectionTone } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { useI18n } from "@/i18n/locale-context";

export function OurClients({ tone }: { tone?: SectionTone }) {
  const loop = [...CLIENTS, ...CLIENTS];
  const { dict } = useI18n();

  return (
    <AnimatedSection id="clients" tone={tone} className="py-20 sm:py-28" stagger>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedItem>
          <SectionHeader
            badge={dict.clients.badge}
            title={dict.clients.title}
            description={dict.clients.description}
          />
        </AnimatedItem>
      </div>

      <AnimatedItem>
        <div className="clients-marquee relative mt-2 w-full overflow-hidden">
          <div className="clients-marquee-track flex w-max gap-4 py-2 pl-4 sm:gap-5 sm:pl-6">
            {loop.map((client, index) => (
              <figure
                key={`${client.id}-${index}`}
                className="group relative h-56 w-40 shrink-0 overflow-hidden rounded-2xl bg-pink-50 shadow-sm ring-1 ring-border/60 transition-shadow duration-300 hover:shadow-lg hover:shadow-pink-500/15 hover:ring-pink-400 sm:h-64 sm:w-48 dark:bg-pink-950/30 dark:ring-border/40 dark:hover:ring-pink-400"
              >
                <Image
                  src={client.image}
                  alt={client.alt}
                  fill
                  sizes="192px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </figure>
            ))}
          </div>
        </div>
      </AnimatedItem>
    </AnimatedSection>
  );
}
