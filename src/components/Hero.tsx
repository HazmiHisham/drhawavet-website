"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToBooking = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.querySelector("#branches")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen overflow-hidden pt-18">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-pink-950/30" />
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbcfe8' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-pink-200/40 blur-3xl dark:bg-pink-900/20" />
      <div className="absolute -left-32 bottom-20 h-80 w-80 rounded-full bg-pink-200/40 blur-3xl dark:bg-pink-900/20" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-stretch gap-12 px-4 pb-20 pt-28 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:pt-32">
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-pink-500 shadow-sm backdrop-blur-sm dark:border-pink-800 dark:bg-pink-950/50 dark:text-pink-300">
            <span className="size-2 rounded-full bg-pink-500 animate-pulse" />
            Trusted Veterinary Care in Malaysia
          </span>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Caring for Your Pets{" "}
            <span className="bg-gradient-to-r from-pink-500 to-pink-400 bg-clip-text text-transparent">
              Like Family
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0 mx-auto">
            Professional veterinary care, grooming, vaccination, surgery and pet
            wellness services.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <Button
              onClick={scrollToBooking}
              size="lg"
              className="h-12 rounded-full bg-gradient-to-r from-pink-400 to-pink-300 px-8 text-base font-semibold shadow-xl shadow-pink-500/30 hover:from-pink-500 hover:to-pink-400"
            >
              Book Appointment
              <ArrowRight className="ml-1 size-4" />
            </Button>
            <Button
              onClick={scrollToContact}
              variant="outline"
              size="lg"
              className="h-12 rounded-full border-pink-200 px-8 text-base font-semibold hover:bg-pink-50 dark:border-pink-800 dark:hover:bg-pink-950/50"
            >
              <Phone className="size-4" />
              Contact Us
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 lg:justify-start">
            {[
              { value: "7", label: "Branches" },
              { value: "10AM–6PM", label: "Open Daily" },
              { value: "1000+", label: "Happy Pets" },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="text-2xl font-bold text-pink-500 dark:text-pink-400">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-md sm:max-w-lg lg:mx-0 lg:max-w-xl lg:flex-1"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative w-full">
            <div className="absolute inset-4 rounded-[2rem] bg-gradient-to-br from-pink-400/20 to-pink-300/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/40 p-3 shadow-2xl shadow-pink-500/10 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
              <div className="relative aspect-square w-full overflow-hidden rounded-[1.5rem]">
                <Image
                  src="/images/petimage.png"
                  alt="Happy veterinarian with dog and cat"
                  fill
                  sizes="(max-width: 1024px) 100vw, 512px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <motion.div
              className="absolute -bottom-4 -left-4 rounded-2xl border border-white/60 bg-white/90 px-5 py-4 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-slate-900/90"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-sm font-semibold text-foreground">
                Compassionate Care
              </p>
              <p className="text-xs text-muted-foreground">
                Experienced vets & modern facilities
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
