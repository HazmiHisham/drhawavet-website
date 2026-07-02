"use client";

import {
  Calendar,
  Clock,
  Mail,
  MapPin,
  PawPrint,
  Phone,
  Stethoscope,
  User,
} from "lucide-react";
import {
  BOOKING_STATUS_LABELS,
  BOOKING_STATUS_STYLES,
  type Booking,
  type BookingStatus,
} from "@/lib/bookings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BookingDetailDialogProps {
  booking: Booking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange: (id: string, status: BookingStatus) => void;
}

export function BookingDetailDialog({
  booking,
  open,
  onOpenChange,
  onStatusChange,
}: BookingDetailDialogProps) {
  if (!booking) return null;

  const details = [
    { icon: User, label: "Owner", value: booking.ownerName },
    { icon: Phone, label: "Phone", value: booking.phone },
    { icon: Mail, label: "Email", value: booking.email },
    { icon: PawPrint, label: "Pet", value: `${booking.petName} (${booking.petType})` },
    { icon: MapPin, label: "Branch", value: booking.branch },
    { icon: Stethoscope, label: "Service", value: booking.service },
    {
      icon: Calendar,
      label: "Preferred Date",
      value: new Date(booking.preferredDate).toLocaleDateString("en-MY", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    },
    { icon: Clock, label: "Preferred Time", value: booking.preferredTime },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <DialogTitle className="text-xl">Booking Details</DialogTitle>
              <DialogDescription>Reference ID: {booking.id}</DialogDescription>
            </div>
            <Badge className={BOOKING_STATUS_STYLES[booking.status]}>
              {BOOKING_STATUS_LABELS[booking.status]}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-3">
          {details.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-start gap-3 rounded-2xl border border-border/60 bg-muted/30 p-4"
            >
              <Icon className="mt-0.5 size-4 shrink-0 text-pink-500" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {label}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
              </div>
            </div>
          ))}

          {booking.notes && (
            <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Notes
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                {booking.notes}
              </p>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            Submitted on{" "}
            {new Date(booking.createdAt).toLocaleString("en-MY", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          {(["pending", "confirmed", "completed", "cancelled"] as BookingStatus[]).map(
            (status) => (
              <Button
                key={status}
                variant={booking.status === status ? "default" : "outline"}
                onClick={() => onStatusChange(booking.id, status)}
                className="rounded-xl capitalize"
              >
                {BOOKING_STATUS_LABELS[status]}
              </Button>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
