"use client";

import {
  CalendarCheck,
  Clock3,
  MapPin,
  PawPrint,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardStatsProps {
  stats: {
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    today: number;
  };
}

const statCards = [
  { key: "total", label: "Total Bookings", icon: PawPrint, color: "text-pink-500" },
  { key: "pending", label: "Pending", icon: Clock3, color: "text-amber-500" },
  { key: "confirmed", label: "Confirmed", icon: CalendarCheck, color: "text-sky-500" },
  { key: "today", label: "Today", icon: TrendingUp, color: "text-emerald-500" },
] as const;

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statCards.map(({ key, label, icon: Icon, color }) => (
        <Card
          key={key}
          className="border-border/60 bg-white/80 shadow-sm backdrop-blur-sm dark:bg-slate-900/80"
        >
          <CardContent className="flex items-center gap-4 p-5">
            <div className={`rounded-2xl bg-pink-50 p-3 dark:bg-pink-950/50 ${color}`}>
              <Icon className="size-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="text-2xl font-bold text-foreground">
                {stats[key]}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="border-border/60 bg-white/80 shadow-sm backdrop-blur-sm dark:bg-slate-900/80 sm:col-span-2 xl:col-span-4">
        <CardContent className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <MapPin className="size-4 text-pink-500" />
            <p className="font-semibold text-foreground">Completed Bookings</p>
          </div>
          <p className="text-3xl font-bold text-foreground">{stats.completed}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Successfully completed appointments across all branches
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
