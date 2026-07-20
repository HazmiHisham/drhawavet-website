"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BookingForm } from "@/components/BookingForm";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { BackToTop } from "@/components/BackToTop";
import { useI18n } from "@/i18n/locale-context";

export default function BookingPage() {
  const { dict } = useI18n();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-pink-50/50 via-white to-pink-50/50 pt-24 dark:from-pink-950/20 dark:via-background dark:to-pink-950/20">
        <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-pink-500 transition-colors hover:text-pink-400 dark:text-pink-400"
          >
            <ArrowLeft className="size-4" />
            {dict.bookingPage.backHome}
          </Link>
        </div>
        <BookingForm standalone />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
    </>
  );
}
