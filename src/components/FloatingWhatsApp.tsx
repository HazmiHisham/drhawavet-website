"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { WHATSAPP_LINK } from "@/lib/constants";
import { useI18n } from "@/i18n/locale-context";

export function FloatingWhatsApp() {
  const { dict } = useI18n();

  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.a11y.whatsapp}
      className="fixed bottom-24 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition-transform hover:scale-105 sm:bottom-8 sm:right-8"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="size-7" />
    </motion.a>
  );
}
