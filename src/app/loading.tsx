import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <Skeleton className="fixed inset-x-0 top-0 z-50 h-18 rounded-none" />
      <div className="mx-auto max-w-7xl space-y-8 px-4 pt-28 pb-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <Skeleton className="h-8 w-48 rounded-full" />
            <Skeleton className="h-16 w-full max-w-lg" />
            <Skeleton className="h-16 w-full max-w-md" />
            <Skeleton className="h-12 w-40 rounded-full" />
          </div>
          <Skeleton className="aspect-square max-w-lg rounded-[2rem] lg:ml-auto" />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-3xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
