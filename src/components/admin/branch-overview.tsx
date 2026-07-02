"use client";

import { Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BranchOverviewProps {
  branches: Array<{
    id: string;
    name: string;
    count: number;
    pending: number;
  }>;
  selectedBranch: string;
  onSelect: (branchId: string) => void;
}

export function BranchOverview({
  branches,
  selectedBranch,
  onSelect,
}: BranchOverviewProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <button
        type="button"
        onClick={() => onSelect("all")}
        className="text-left"
      >
        <Card
          className={cn(
            "transition-all hover:-translate-y-0.5 hover:shadow-md",
            selectedBranch === "all"
              ? "border-pink-300 bg-pink-50/80 shadow-md dark:border-pink-800 dark:bg-pink-950/40"
              : "border-border/60 bg-white/80 dark:bg-slate-900/80"
          )}
        >
          <CardContent className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <Building2 className="size-4 text-pink-500" />
              <p className="text-sm font-semibold">All Branches</p>
            </div>
            <p className="text-2xl font-bold">
              {branches.reduce((sum, branch) => sum + branch.count, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Total bookings</p>
          </CardContent>
        </Card>
      </button>

      {branches.map((branch) => (
        <button
          key={branch.id}
          type="button"
          onClick={() => onSelect(branch.id)}
          className="text-left"
        >
          <Card
            className={cn(
              "transition-all hover:-translate-y-0.5 hover:shadow-md",
              selectedBranch === branch.id
                ? "border-pink-300 bg-pink-50/80 shadow-md dark:border-pink-800 dark:bg-pink-950/40"
                : "border-border/60 bg-white/80 dark:bg-slate-900/80"
            )}
          >
            <CardContent className="p-4">
              <p className="truncate text-sm font-semibold">{branch.name}</p>
              <p className="mt-2 text-2xl font-bold">{branch.count}</p>
              <p className="text-xs text-muted-foreground">
                {branch.pending} pending
              </p>
            </CardContent>
          </Card>
        </button>
      ))}
    </div>
  );
}
