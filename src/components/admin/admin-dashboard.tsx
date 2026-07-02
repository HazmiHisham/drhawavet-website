"use client";

import { useEffect, useMemo, useState } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { BookingCalendar } from "@/components/admin/booking-calendar";
import { BookingDetailDialog } from "@/components/admin/booking-detail-dialog";
import { BookingsTable } from "@/components/admin/bookings-table";
import { BranchOverview } from "@/components/admin/branch-overview";
import { DashboardStats } from "@/components/admin/dashboard-stats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getBookings,
  getBookingsByBranch,
  getBookingStats,
  updateBookingStatus,
  type Booking,
  type BookingStatus,
} from "@/lib/bookings";

export function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    const loadBookings = () => setBookings(getBookings());
    loadBookings();

    window.addEventListener("bookings-updated", loadBookings);
    window.addEventListener("storage", loadBookings);
    return () => {
      window.removeEventListener("bookings-updated", loadBookings);
      window.removeEventListener("storage", loadBookings);
    };
  }, []);

  const stats = useMemo(() => getBookingStats(bookings), [bookings]);

  const filteredBookings = useMemo(() => {
    let result = getBookingsByBranch(selectedBranch, bookings);

    if (statusFilter !== "all") {
      result = result.filter((booking) => booking.status === statusFilter);
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (booking) =>
          booking.ownerName.toLowerCase().includes(query) ||
          booking.petName.toLowerCase().includes(query) ||
          booking.phone.toLowerCase().includes(query) ||
          booking.email.toLowerCase().includes(query) ||
          booking.service.toLowerCase().includes(query)
      );
    }

    return result.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [bookings, selectedBranch, search, statusFilter]);

  const handleStatusChange = (id: string, status: BookingStatus) => {
    const updated = updateBookingStatus(id, status);
    if (updated) {
      setBookings(getBookings());
      setSelectedBooking(updated);
    }
  };

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setDetailOpen(true);
  };

  return (
    <AdminShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-muted-foreground">
            View and manage appointment requests across all DRHAWAVET branches.
          </p>
        </div>

        <DashboardStats stats={stats} />

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Bookings by Branch</h2>
          <BranchOverview
            branches={stats.byBranch}
            selectedBranch={selectedBranch}
            onSelect={setSelectedBranch}
          />
        </div>

        <Tabs defaultValue="calendar" className="space-y-4">
          <TabsList variant="line" className="w-full justify-start">
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-4">
            <BookingCalendar
              bookings={filteredBookings}
              onSelectBooking={handleViewBooking}
            />
          </TabsContent>

          <TabsContent value="list">
            <BookingsTable
              bookings={filteredBookings}
              search={search}
              statusFilter={statusFilter}
              onSearchChange={setSearch}
              onStatusFilterChange={setStatusFilter}
              onViewBooking={handleViewBooking}
            />
          </TabsContent>
        </Tabs>
      </div>

      <BookingDetailDialog
        booking={selectedBooking}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onStatusChange={handleStatusChange}
      />
    </AdminShell>
  );
}
