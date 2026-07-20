"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import { AnimatedSection, AnimatedItem, type SectionTone } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/i18n/locale-context";

const VISIBLE_COUNT = 3;

export function Testimonials({ tone }: { tone?: SectionTone }) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const { dict } = useI18n();
  const items = dict.testimonials.items;
  const totalPages = Math.max(1, items.length - VISIBLE_COUNT + 1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setPage((prev) => (prev + 1) % totalPages);
    }, 6000);
    return () => clearInterval(timer);
  }, [totalPages]);

  const navigate = (dir: number) => {
    setDirection(dir);
    setPage((prev) => (prev + dir + totalPages) % totalPages);
  };

  const visible = items.slice(page, page + VISIBLE_COUNT);

  return (
    <AnimatedSection tone={tone} className="py-16 sm:py-20" stagger>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedItem>
          <SectionHeader
            badge={dict.testimonials.badge}
            title={dict.testimonials.title}
            description={dict.testimonials.description}
          />
        </AnimatedItem>

        <AnimatedItem>
          <div className="relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {visible.map((testimonial, i) => {
                  const rating = TESTIMONIALS[page + i]?.rating ?? 5;
                  return (
                    <Card
                      key={`${testimonial.author}-${page}-${i}`}
                      className="h-full border-border/60 bg-white/80 shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-md hover:shadow-pink-500/10 dark:bg-slate-900/80"
                    >
                      <CardContent className="flex h-full flex-col p-4 sm:p-5">
                        <Quote className="mb-3 size-5 text-pink-200 dark:text-pink-800" />
                        <div className="mb-2 flex gap-0.5">
                          {Array.from({ length: rating }).map((_, starIdx) => (
                            <Star
                              key={starIdx}
                              className="size-3.5 fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>
                        <blockquote className="flex-1 text-sm leading-relaxed text-foreground">
                          &ldquo;{testimonial.quote}&rdquo;
                        </blockquote>
                        <div className="mt-4 border-t border-border/60 pt-3">
                          <p className="text-sm font-semibold text-foreground">
                            {testimonial.author}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {testimonial.pet}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => navigate(-1)}
                  className="rounded-full"
                  aria-label={dict.testimonials.prev}
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setDirection(i > page ? 1 : -1);
                        setPage(i);
                      }}
                      className={`size-2 rounded-full transition-all ${
                        i === page
                          ? "w-6 bg-pink-500"
                          : "bg-pink-200 dark:bg-pink-800"
                      }`}
                      aria-label={`${dict.hero.goToSlide} ${i + 1}`}
                    />
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => navigate(1)}
                  className="rounded-full"
                  aria-label={dict.testimonials.next}
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            )}
          </div>
        </AnimatedItem>
      </div>
    </AnimatedSection>
  );
}
