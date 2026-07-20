"use client";

import { AlertTriangle } from "lucide-react";
import { AnimatedSection, AnimatedItem, type SectionTone } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/i18n/locale-context";

export function ImportantNotice({ tone }: { tone?: SectionTone }) {
  const { dict } = useI18n();

  return (
    <AnimatedSection tone={tone} className="py-8" stagger>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedItem>
          <div className="relative overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 p-6 shadow-lg shadow-amber-500/10 dark:border-amber-900 dark:from-amber-950/50 dark:via-orange-950/30 dark:to-amber-950/50 sm:p-8">
            <div className="absolute -right-8 -top-8 size-32 rounded-full bg-amber-200/30 blur-2xl dark:bg-amber-800/20" />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg">
                <AlertTriangle className="size-7" />
              </div>
              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">
                    {dict.notice.title}
                  </h3>
                  <Badge className="bg-amber-500 text-white hover:bg-amber-600">
                    {dict.notice.important}
                  </Badge>
                </div>
                <p className="text-amber-800 dark:text-amber-200">
                  {dict.notice.content}
                </p>
                <p className="mt-2 text-sm font-semibold text-amber-900 dark:text-amber-100">
                  {dict.notice.except}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {dict.notice.exceptions.map((item) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="border-amber-400 bg-white/80 text-amber-800 dark:border-amber-700 dark:bg-amber-950/50 dark:text-amber-200"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedItem>
      </div>
    </AnimatedSection>
  );
}
