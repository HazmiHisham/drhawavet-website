"use client";

import { FAQ_ITEMS } from "@/lib/constants";
import { AnimatedSection, type SectionTone } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ({ tone }: { tone?: SectionTone }) {
  return (
    <AnimatedSection id="faq" tone={tone} className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="FAQ"
          title="Frequently Asked Questions"
          description="Find answers to common questions about our services, appointments, and policies."
        />

        <Accordion className="space-y-3">
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`item-${index}`}
              className="rounded-2xl border border-border/60 bg-white/70 px-6 shadow-sm backdrop-blur-sm dark:bg-slate-900/70"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-muted-foreground leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </AnimatedSection>
  );
}
