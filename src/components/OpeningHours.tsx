"use client";

import { Clock, Coffee, UserCheck } from "lucide-react";
import { OPENING_HOURS } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/i18n/locale-context";
import { cn } from "@/lib/utils";

interface OpeningHoursCardProps {
  className?: string;
}

export function OpeningHoursCard({ className }: OpeningHoursCardProps) {
  const { dict } = useI18n();

  return (
    <Card
      className={cn(
        "h-full overflow-hidden border-pink-100 bg-gradient-to-br from-pink-50 via-white to-pink-50 shadow-lg shadow-pink-400/5 dark:border-pink-900 dark:from-pink-950/30 dark:via-slate-900 dark:to-pink-950/20",
        className
      )}
    >
      <CardContent className="flex h-full flex-col p-6 sm:p-7">
        <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-pink-300 text-white shadow-md shadow-pink-400/30">
          <Clock className="size-7" />
        </div>

        <h3 className="text-xl font-bold text-foreground sm:text-2xl">
          {dict.openingHours.title}
        </h3>
        <p className="mt-2 text-2xl font-bold text-pink-500 dark:text-pink-400">
          {OPENING_HOURS.hours}
        </p>

        <div className="mt-6 space-y-3">
          <div className="flex items-start gap-3 rounded-xl border border-pink-100 bg-white/80 p-4 dark:border-pink-900 dark:bg-slate-900/80">
            <UserCheck className="mt-0.5 size-4 shrink-0 text-pink-500" />
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                {dict.openingHours.lastRegistration}
              </p>
              <p className="text-sm font-semibold text-foreground">
                {OPENING_HOURS.lastRegistration}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-pink-100 bg-white/80 p-4 dark:border-pink-900 dark:bg-slate-900/80">
            <Coffee className="mt-0.5 size-4 shrink-0 text-pink-400" />
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                {dict.openingHours.breakTime}
              </p>
              <p className="text-sm font-semibold text-foreground">
                {OPENING_HOURS.breakTime}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
