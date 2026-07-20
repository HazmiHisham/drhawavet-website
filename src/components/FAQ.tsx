"use client";

import { AnimatedSection, AnimatedItem, type SectionTone } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/i18n/locale-context";

export function FAQ({ tone }: { tone?: SectionTone }) {
  const { dict } = useI18n();

  return (
    <AnimatedSection id="faq" tone={tone} className="py-20 sm:py-28" stagger>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <AnimatedItem>
          <SectionHeader
            badge={dict.faq.badge}
            title={dict.faq.title}
            description={dict.faq.description}
          />
        </AnimatedItem>

        <Accordion className="space-y-3">
          {dict.faq.items.map((item, index) => (
            <AnimatedItem key={item.question}>
              <AccordionItem
                value={`item-${index}`}
                className="rounded-2xl border border-border/60 bg-white/70 px-6 shadow-sm backdrop-blur-sm transition-colors duration-300 hover:border-pink-400 dark:bg-slate-900/70 dark:hover:border-pink-400"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </AnimatedItem>
          ))}
        </Accordion>
      </div>
    </AnimatedSection>
  );
}
