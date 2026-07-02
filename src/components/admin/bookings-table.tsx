"use client";

import { Eye, Search } from "lucide-react";
import {
  BOOKING_STATUS_LABELS,
  BOOKING_STATUS_STYLES,
  type Booking,
  type BookingStatus,
} from "@/lib/bookings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BookingsTableProps {
  bookings: Booking[];
  search: string;
  statusFilter: BookingStatus | "all";
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: BookingStatus | "all") => void;
  onViewBooking: (booking: Booking) => void;
}

export function BookingsTable({
  bookings,
  search,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  onViewBooking,
}: BookingsTableProps) {
  return (
    <Card className="border-border/60 bg-white/80 shadow-sm backdrop-blur-sm dark:bg-slate-900/80">
      <CardHeader className="gap-4 space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>All Bookings</CardTitle>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search owner, pet, phone..."
              className="w-full rounded-xl pl-9 sm:w-64"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value) =>
              onStatusFilterChange(value as BookingStatus | "all")
            }
          >
            <SelectTrigger className="w-full rounded-xl sm:w-44">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Owner / Pet</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    No bookings found for the selected filters.
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{booking.ownerName}</p>
                        <p className="text-xs text-muted-foreground">
                          {booking.petName} · {booking.petType}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[160px] truncate text-sm">
                      {booking.branch.replace("drhawavet ", "")}
                    </TableCell>
                    <TableCell>{booking.service}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{booking.preferredDate}</p>
                        <p className="text-xs text-muted-foreground">
                          {booking.preferredTime}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={BOOKING_STATUS_STYLES[booking.status]}>
                        {BOOKING_STATUS_LABELS[booking.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewBooking(booking)}
                        className="rounded-lg"
                      >
                        <Eye className="size-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
