"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO_SLIDES } from "@/lib/constants";
import { useI18n } from "@/i18n/locale-context";
import { cn } from "@/lib/utils";

const SLIDE_INTERVAL_MS = 6000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = HERO_SLIDES[index];
  const { dict } = useI18n();
  const slideCopy = dict.hero.slides[slide.id as keyof typeof dict.hero.slides];

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, index]);

  const goTo = (next: number) => {
    setIndex((next + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const scrollToBooking = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.querySelector("#branches")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative h-[100svh] min-h-[560px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label={dict.hero.ariaLabel}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={slide.image}
            alt={slideCopy?.imageAlt ?? slide.imageAlt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-[35%_center] sm:object-center"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/55 to-slate-950/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/35" />

      <div className="relative z-10 flex h-full items-end pb-24 pt-28 sm:items-center sm:pb-0 sm:pt-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${slide.id}-${dict.brand.tagline}`}
              className="max-w-2xl"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                <span className="block">{dict.brand.name}</span>
                <span className="mt-2 block bg-gradient-to-r from-pink-200 to-pink-100 bg-clip-text text-transparent">
                  {dict.brand.tagline}
                </span>
              </h1>
              <span className="sr-only">{dict.brand.trademark}</span>

              <p className="mt-5 text-xl font-medium tracking-tight text-white/95 sm:text-2xl">
                {slideCopy?.headline ?? slide.headline}
              </p>

              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
                {slideCopy?.description ?? slide.description}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  onClick={scrollToBooking}
                  size="lg"
                  className="h-12 rounded-full bg-gradient-to-r from-pink-400 to-pink-300 px-8 text-base font-semibold text-white shadow-xl shadow-pink-500/30 hover:from-pink-500 hover:to-pink-400"
                >
                  {dict.hero.bookAppointment}
                  <ArrowRight className="ml-1 size-4" />
                </Button>
                <Button
                  onClick={scrollToContact}
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-full border-white/40 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
                >
                  <Phone className="size-4" />
                  {dict.hero.contactUs}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 pb-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2" role="tablist" aria-label="Hero slides">
            {HERO_SLIDES.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`${dict.hero.goToSlide} ${i + 1}`}
                onClick={() => goTo(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index
                    ? "w-10 bg-pink-300"
                    : "w-5 bg-white/40 hover:bg-white/70"
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={dict.hero.prevSlide}
              onClick={() => goTo(index - 1)}
              className="flex size-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label={dict.hero.nextSlide}
              onClick={() => goTo(index + 1)}
              className="flex size-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <motion.div
          key={index}
          className="h-0.5 origin-left bg-pink-300/90"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: paused ? 0 : 1 }}
          transition={{
            duration: paused ? 0.2 : SLIDE_INTERVAL_MS / 1000,
            ease: "linear",
          }}
        />
      </div>
    </section>
  );
}
