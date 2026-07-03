"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  stagger?: boolean;
  tone?: SectionTone;
}

export type SectionTone = "colored" | "white";

export const sectionToneClasses: Record<SectionTone, string> = {
  colored:
    "bg-gradient-to-b from-pink-100 via-pink-50 to-pink-100 dark:from-pink-950/80 dark:via-pink-900/55 dark:to-pink-950/70",
  white: "bg-white dark:bg-slate-950",
};

export function AnimatedSection({
  children,
  className,
  id,
  stagger = false,
  tone,
}: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      className={cn(tone && sectionToneClasses[tone], className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger ? staggerContainer : fadeUpVariants}
    >
      {children}
    </motion.section>
  );
}

export function AnimatedItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={cn(className)} variants={fadeUpVariants}>
      {children}
    </motion.div>
  );
}

export function AnimatedScale({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
