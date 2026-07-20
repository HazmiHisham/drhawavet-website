"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { InstagramIcon, TikTokIcon, FacebookIcon } from "@/components/social-icons";
import {
  BRANCHES,
  NAV_LINKS,
  SOCIAL_LINKS,
  WHATSAPP_LINK,
} from "@/lib/constants";
import { useI18n } from "@/i18n/locale-context";

export function Footer() {
  const { dict } = useI18n();

  const navLabels: Record<string, string> = {
    "#about": dict.nav.about,
    "#clients": dict.nav.clients,
    "#services": dict.nav.services,
    "#booking": dict.nav.booking,
    "#branches": dict.nav.branches,
    "/shop": dict.nav.shop,
    "#faq": dict.nav.faq,
  };

  const socialItems = [
    {
      label: "Instagram",
      href: SOCIAL_LINKS.instagram,
      icon: InstagramIcon,
    },
    {
      label: "TikTok",
      href: SOCIAL_LINKS.tiktok,
      icon: TikTokIcon,
    },
    {
      label: "Facebook",
      href: SOCIAL_LINKS.facebook,
      icon: FacebookIcon,
    },
    {
      label: "WhatsApp",
      href: WHATSAPP_LINK,
      icon: MessageCircle,
    },
  ] as const;

  return (
    <footer className="border-t border-border/60 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-6 flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="DRHAWAVET Clinic"
                width={52}
                height={52}
                className="rounded-full"
              />
              <div>
                <p className="font-bold text-white">{dict.brand.name}</p>
                <p className="text-xs text-pink-300">{dict.brand.tagline}</p>
              </div>
            </Link>
            <p className="mb-3 text-sm font-medium text-pink-200/90">
              {dict.brand.trademark}
            </p>
            <p className="text-sm leading-relaxed text-slate-400">
              {dict.footer.blurb}
            </p>
            <div className="mt-6 flex gap-3">
              {socialItems.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-colors hover:bg-pink-400 hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">
              {dict.footer.quickLinks}
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("/") ? (
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 text-sm transition-colors hover:text-pink-400"
                    >
                      {navLabels[link.href] ?? link.label}
                      {"comingSoon" in link && link.comingSoon && (
                        <span className="rounded-full bg-pink-950 px-2 py-0.5 text-[10px] font-semibold uppercase text-pink-300">
                          {dict.nav.soon}
                        </span>
                      )}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm transition-colors hover:text-pink-400"
                    >
                      {navLabels[link.href] ?? link.label}
                    </a>
                  )}
                </li>
              ))}
              <li>
                <Link
                  href="/booking"
                  className="text-sm transition-colors hover:text-pink-400"
                >
                  {dict.nav.bookAppointment}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">
              {dict.footer.services}
            </h4>
            <ul className="space-y-3">
              {dict.footer.footerServices.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-sm transition-colors hover:text-pink-400"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">
              {dict.footer.branches}
            </h4>
            <ul className="space-y-2">
              {BRANCHES.slice(0, 4).map((branch) => (
                <li key={branch.id} className="text-sm text-slate-400">
                  {branch.name}
                </li>
              ))}
              <li className="text-sm text-pink-400">
                +{BRANCHES.length - 4} {dict.footer.moreLocations}
              </li>
            </ul>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-pink-400 hover:text-pink-300"
            >
              <Phone className="size-4" />
              {dict.footer.contactUs}
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {dict.brand.trademark}.{" "}
            {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
