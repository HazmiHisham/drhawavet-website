"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { LocaleProvider } from "@/i18n/locale-context";

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem>
      <LocaleProvider>{children}</LocaleProvider>
    </NextThemesProvider>
  );
}
