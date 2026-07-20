import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DRHAWAVET YOUR CAT'S CHOICE | Professional Veterinary Care in Malaysia",
  description:
    "DRHAWAVET YOUR CAT'S CHOICE — professional veterinary care, grooming, vaccination, surgery and pet wellness services. 7 branches open everyday across Malaysia.",
  keywords: [
    "veterinary clinic",
    "pet care",
    "Malaysia",
    "DRHAWAVET",
    "DRHAWAVET YOUR CAT'S CHOICE",
    "grooming",
    "vaccination",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
