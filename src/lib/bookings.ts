import { BRANCHES } from "@/lib/constants";

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Booking {
  id: string;
  ownerName: string;
  phone: string;
  email: string;
  petName: string;
  petType: string;
  branch: string;
  branchId: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  status: BookingStatus;
  createdAt: string;
}

export type BookingInput = Omit<
  Booking,
  "id" | "branchId" | "status" | "createdAt"
>;

const STORAGE_KEY = "drhawavet-bookings";

function getBranchId(branchName: string) {
  return BRANCHES.find((branch) => branch.name === branchName)?.id ?? "unknown";
}

function createId() {
  return `bk_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: "bk_001",
    ownerName: "Siti Aminah",
    phone: "+60 12-345 6789",
    email: "siti@email.com",
    petName: "Mochi",
    petType: "Cat",
    branch: "drhawavet Nilai",
    branchId: "nilai",
    service: "Consultation",
    preferredDate: "2026-07-05",
    preferredTime: "11:00",
    notes: "First visit, cat seems lethargic.",
    status: "pending",
    createdAt: "2026-07-02T08:30:00.000Z",
  },
  {
    id: "bk_002",
    ownerName: "Raj Kumar",
    phone: "+60 16-778 9900",
    email: "raj@email.com",
    petName: "Buddy",
    petType: "Dog",
    branch: "drhawavet Bangi",
    branchId: "bangi",
    service: "Vaccination",
    preferredDate: "2026-07-04",
    preferredTime: "14:30",
    notes: "Annual booster due.",
    status: "confirmed",
    createdAt: "2026-07-01T10:15:00.000Z",
  },
  {
    id: "bk_003",
    ownerName: "Lim Wei Jie",
    phone: "+60 11-223 4455",
    email: "limwj@email.com",
    petName: "Luna",
    petType: "Cat",
    branch: "drhawavet Shah Alam",
    branchId: "shah-alam",
    service: "Grooming",
    preferredDate: "2026-07-06",
    preferredTime: "10:30",
    notes: "Long fur, needs full grooming.",
    status: "pending",
    createdAt: "2026-07-02T06:45:00.000Z",
  },
  {
    id: "bk_004",
    ownerName: "Nurul Huda",
    phone: "+60 13-556 7788",
    email: "nurul@email.com",
    petName: "Max",
    petType: "Dog",
    branch: "drhawavet Puchong",
    branchId: "puchong",
    service: "Health Check",
    preferredDate: "2026-07-03",
    preferredTime: "15:00",
    notes: "",
    status: "completed",
    createdAt: "2026-06-30T09:00:00.000Z",
  },
  {
    id: "bk_005",
    ownerName: "Daniel Tan",
    phone: "+60 17-889 0011",
    email: "daniel@email.com",
    petName: "Coco",
    petType: "Dog",
    branch: "drhawavet Ampang",
    branchId: "ampang",
    service: "Surgery",
    preferredDate: "2026-07-08",
    preferredTime: "09:30",
    notes: "Follow-up after lump removal consultation.",
    status: "confirmed",
    createdAt: "2026-07-01T14:20:00.000Z",
  },
  {
    id: "bk_006",
    ownerName: "Farah Izzati",
    phone: "+60 19-334 5566",
    email: "farah@email.com",
    petName: "Snowball",
    petType: "Cat",
    branch: "drhawavet Sri Rampai",
    branchId: "sri-rampai",
    service: "Neuter",
    preferredDate: "2026-07-10",
    preferredTime: "11:30",
    notes: "Pre-surgery fasting confirmed.",
    status: "pending",
    createdAt: "2026-07-02T11:10:00.000Z",
  },
  {
    id: "bk_007",
    ownerName: "Jason Lee",
    phone: "+60 12-990 1122",
    email: "jason@email.com",
    petName: "Rocky",
    petType: "Dog",
    branch: "drhawavet Kota Damansara",
    branchId: "kota-damansara",
    service: "Consultation",
    preferredDate: "2026-07-03",
    preferredTime: "16:00",
    notes: "Skin allergy, scratching a lot.",
    status: "pending",
    createdAt: "2026-07-02T07:00:00.000Z",
  },
  {
    id: "bk_008",
    ownerName: "Aisha Rahman",
    phone: "+60 18-445 6677",
    email: "aisha@email.com",
    petName: "Pipi",
    petType: "Others",
    branch: "drhawavet Nilai",
    branchId: "nilai",
    service: "Vaccination",
    preferredDate: "2026-07-04",
    preferredTime: "13:00",
    notes: "Rabbit vaccination.",
    status: "cancelled",
    createdAt: "2026-06-29T16:30:00.000Z",
  },
];

export function getBookings(): Booking[] {
  if (typeof window === "undefined") {
    return MOCK_BOOKINGS;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_BOOKINGS));
    return MOCK_BOOKINGS;
  }

  try {
    return JSON.parse(stored) as Booking[];
  } catch {
    return MOCK_BOOKINGS;
  }
}

export function saveBooking(input: BookingInput): Booking {
  const booking: Booking = {
    ...input,
    id: createId(),
    branchId: getBranchId(input.branch),
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  const bookings = getBookings();
  const updated = [booking, ...bookings];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event("bookings-updated"));
  return booking;
}

export function updateBookingStatus(id: string, status: BookingStatus): Booking | null {
  const bookings = getBookings();
  const index = bookings.findIndex((booking) => booking.id === id);
  if (index === -1) return null;

  bookings[index] = { ...bookings[index], status };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  window.dispatchEvent(new Event("bookings-updated"));
  return bookings[index];
}

export function getBookingsByBranch(branchId: string | "all", bookings: Booking[]) {
  if (branchId === "all") return bookings;
  return bookings.filter((booking) => booking.branchId === branchId);
}

export function getBookingStats(bookings: Booking[]) {
  const today = new Date().toISOString().slice(0, 10);

  return {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
    today: bookings.filter((b) => b.preferredDate === today).length,
    byBranch: BRANCHES.map((branch) => ({
      id: branch.id,
      name: branch.name,
      count: bookings.filter((b) => b.branchId === branch.id).length,
      pending: bookings.filter(
        (b) => b.branchId === branch.id && b.status === "pending"
      ).length,
    })),
  };
}

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const BOOKING_STATUS_STYLES: Record<BookingStatus, string> = {
  pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  confirmed:
    "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  completed:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  cancelled:
    "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

export function groupBookingsByDate(bookings: Booking[]) {
  return bookings.reduce<Record<string, Booking[]>>((acc, booking) => {
    if (!acc[booking.preferredDate]) {
      acc[booking.preferredDate] = [];
    }
    acc[booking.preferredDate].push(booking);
    return acc;
  }, {});
}

export function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
