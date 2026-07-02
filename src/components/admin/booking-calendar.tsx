"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Clock, MapPin, PawPrint } from "lucide-react";
import {
  BOOKING_STATUS_LABELS,
  BOOKING_STATUS_STYLES,
  groupBookingsByDate,
  toDateKey,
  type Booking,
} from "@/lib/bookings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BookingCalendarProps {
  bookings: Booking[];
  onSelectBooking: (booking: Booking) => void;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function buildCalendarDays(month: Date) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);
  const startOffset = firstDay.getDay();
  const totalDays = lastDay.getDate();
  const totalCells = Math.ceil((startOffset + totalDays) / 7) * 7;

  const days: Array<{ date: Date; inMonth: boolean }> = [];

  for (let i = 0; i < totalCells; i++) {
    const dayNumber = i - startOffset + 1;
    const date = new Date(year, monthIndex, dayNumber);
    days.push({
      date,
      inMonth: dayNumber >= 1 && dayNumber <= totalDays,
    });
  }

  return days;
}

export function BookingCalendar({
  bookings,
  onSelectBooking,
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(() =>
    toDateKey(new Date())
  );

  const bookingsByDate = useMemo(
    () => groupBookingsByDate(bookings),
    [bookings]
  );

  const calendarDays = useMemo(
    () => buildCalendarDays(currentMonth),
    [currentMonth]
  );

  const monthLabel = currentMonth.toLocaleDateString("en-MY", {
    month: "long",
    year: "numeric",
  });

  const selectedBookings = selectedDate
    ? (bookingsByDate[selectedDate] ?? []).sort((a, b) =>
        a.preferredTime.localeCompare(b.preferredTime)
      )
    : [];

  const selectedDateLabel = selectedDate
    ? new Date(`${selectedDate}T00:00:00`).toLocaleDateString("en-MY", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Select a date";

  const goToMonth = (offset: number) => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1)
    );
  };

  return (
    <Card className="border-border/60 bg-white/80 shadow-sm backdrop-blur-sm dark:bg-slate-900/80">
      <CardHeader className="gap-4 space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>Booking Calendar</CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToMonth(-1)}
            className="rounded-lg"
            aria-label="Previous month"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span className="min-w-[160px] text-center text-sm font-semibold">
            {monthLabel}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToMonth(1)}
            className="rounded-lg"
            aria-label="Next month"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="mb-2 grid grid-cols-7 gap-1">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="py-2 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map(({ date, inMonth }, index) => {
              const dateKey = toDateKey(date);
              const dayBookings = bookingsByDate[dateKey] ?? [];
              const isSelected = selectedDate === dateKey;
              const isToday = dateKey === toDateKey(new Date());

              return (
                <button
                  key={`${dateKey}-${index}`}
                  type="button"
                  onClick={() => setSelectedDate(dateKey)}
                  className={cn(
                    "min-h-[88px] rounded-xl border p-2 text-left transition-all",
                    inMonth
                      ? "border-border/60 bg-background hover:border-pink-200 hover:bg-pink-50/60 dark:hover:border-pink-800 dark:hover:bg-pink-950/20"
                      : "border-transparent bg-muted/20 text-muted-foreground/50",
                    isSelected &&
                      "border-pink-300 bg-pink-50 ring-2 ring-pink-200 dark:border-pink-700 dark:bg-pink-950/40 dark:ring-pink-900",
                    isToday && !isSelected && "border-pink-200 dark:border-pink-800"
                  )}
                >
                  <div className="flex items-start justify-between gap-1">
                    <span
                      className={cn(
                        "inline-flex size-7 items-center justify-center rounded-full text-sm font-medium",
                        isToday && "bg-pink-400 text-white"
                      )}
                    >
                      {date.getDate()}
                    </span>
                    {dayBookings.length > 0 && (
                      <span className="rounded-full bg-pink-400 px-1.5 py-0.5 text-[10px] font-bold text-white">
                        {dayBookings.length}
                      </span>
                    )}
                  </div>

                  <div className="mt-2 space-y-1">
                    {dayBookings.slice(0, 2).map((booking) => (
                      <div
                        key={booking.id}
                        className="truncate rounded-md bg-pink-100 px-1.5 py-0.5 text-[10px] font-medium text-pink-700 dark:bg-pink-950 dark:text-pink-300"
                      >
                        {booking.preferredTime} · {booking.petName}
                      </div>
                    ))}
                    {dayBookings.length > 2 && (
                      <p className="text-[10px] text-muted-foreground">
                        +{dayBookings.length - 2} more
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
          <h3 className="font-semibold text-foreground">{selectedDateLabel}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {selectedBookings.length} booking
            {selectedBookings.length === 1 ? "" : "s"} scheduled
          </p>

          <div className="mt-4 space-y-3">
            {selectedBookings.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border/60 bg-background/60 p-6 text-center text-sm text-muted-foreground">
                No bookings on this date.
              </div>
            ) : (
              selectedBookings.map((booking) => (
                <button
                  key={booking.id}
                  type="button"
                  onClick={() => onSelectBooking(booking)}
                  className="w-full rounded-xl border border-border/60 bg-background p-4 text-left transition-all hover:border-pink-200 hover:bg-pink-50/60 dark:hover:border-pink-800 dark:hover:bg-pink-950/20"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-foreground">
                        {booking.ownerName}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        <PawPrint className="size-3.5" />
                        {booking.petName} · {booking.service}
                      </p>
                    </div>
                    <Badge className={BOOKING_STATUS_STYLES[booking.status]}>
                      {BOOKING_STATUS_LABELS[booking.status]}
                    </Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {booking.preferredTime}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3.5" />
                      {booking.branch.replace("drhawavet ", "")}
                    </span>
                  </div>
                  <p className="mt-3 text-xs font-medium text-pink-500">
                    Click to view full details
                  </p>
                </button>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
