"use client";

import { useState } from "react";
import { CalendarDays, Send } from "lucide-react";
import { toast } from "sonner";
import {
  BRANCHES,
  BOOKING_SERVICES,
  PET_TYPES,
} from "@/lib/constants";
import { AnimatedSection, type SectionTone } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { saveBooking } from "@/lib/bookings";

interface BookingFormProps {
  standalone?: boolean;
  tone?: SectionTone;
}

export function BookingForm({ standalone = false, tone }: BookingFormProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [petType, setPetType] = useState<string>("");
  const [branch, setBranch] = useState<string>("");
  const [service, setService] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    saveBooking({
      ownerName: String(formData.get("ownerName") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      petName: String(formData.get("petName") ?? ""),
      petType,
      branch,
      service,
      preferredDate: String(formData.get("date") ?? ""),
      preferredTime: String(formData.get("time") ?? ""),
      notes: String(formData.get("notes") ?? ""),
    });

    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setShowSuccess(true);
    toast.success("Appointment request submitted successfully!");
    (e.target as HTMLFormElement).reset();
    setPetType("");
    setBranch("");
    setService("");
  };

  return (
    <>
      <AnimatedSection
        id={standalone ? undefined : "booking"}
        tone={tone}
        className="py-20 sm:py-28"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Book Now"
            title="Book an Appointment"
            description="Fill in the details below and our team will contact you shortly to confirm your appointment."
          />

          <Card className="overflow-hidden border-border/60 bg-white/70 shadow-xl shadow-pink-500/5 backdrop-blur-md dark:bg-slate-900/70">
            <div className="h-1.5 bg-gradient-to-r from-pink-400 via-pink-300 to-pink-300" />
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Owner Name</Label>
                    <Input
                      id="ownerName"
                      name="ownerName"
                      placeholder="Your full name"
                      required
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+60 12-345 6789"
                      required
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    required
                    className="rounded-xl"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="petName">Pet Name</Label>
                    <Input
                      id="petName"
                      name="petName"
                      placeholder="Your pet's name"
                      required
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Pet Type</Label>
                    <Select
                      value={petType}
                      onValueChange={(v) => setPetType(v ?? "")}
                    >
                      <SelectTrigger className="w-full rounded-xl">
                        <SelectValue placeholder="Select pet type" />
                      </SelectTrigger>
                      <SelectContent>
                        {PET_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Branch</Label>
                    <Select
                      value={branch}
                      onValueChange={(v) => setBranch(v ?? "")}
                    >
                      <SelectTrigger className="w-full rounded-xl">
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {BRANCHES.map((b) => (
                          <SelectItem key={b.id} value={b.name}>
                            {b.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Service</Label>
                    <Select
                      value={service}
                      onValueChange={(v) => setService(v ?? "")}
                    >
                      <SelectTrigger className="w-full rounded-xl">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        {BOOKING_SERVICES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      required
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Preferred Time</Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      required
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Any special requests or concerns..."
                    rows={4}
                    className="rounded-xl resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading || !petType || !branch || !service}
                  className="h-12 w-full rounded-full bg-gradient-to-r from-pink-400 to-pink-300 text-base font-semibold shadow-lg shadow-pink-500/25 hover:from-pink-500 hover:to-pink-400"
                >
                  {loading ? (
                    "Submitting..."
                  ) : (
                    <>
                      <CalendarDays className="size-4" />
                      Book Appointment
                      <Send className="size-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </AnimatedSection>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="rounded-3xl sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-950">
              <CalendarDays className="size-8 text-pink-500 dark:text-pink-400" />
            </div>
            <DialogTitle className="text-center text-xl">
              Thank You!
            </DialogTitle>
            <DialogDescription className="text-center text-base leading-relaxed">
              Your appointment request has been received. Our team will contact
              you shortly.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => setShowSuccess(false)}
            className="mt-2 rounded-full bg-pink-400 hover:bg-pink-500"
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
