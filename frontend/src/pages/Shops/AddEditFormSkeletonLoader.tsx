import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

const AddEditFormSkeletonLoader = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* Basic information grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md sm:col-span-2" />
        <Skeleton className="h-10 w-full rounded-md sm:col-span-2" />
        <Skeleton className="h-24 w-full rounded-md sm:col-span-2" />
      </div>

      {/* Address header */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/3" />
      </div>

      {/* Address grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Toggle */}
      <div className="w-40">
        <Skeleton className="h-8 w-full rounded-full" />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <Skeleton className="h-10 w-28 rounded-md" />
        <Skeleton className="h-10 w-36 rounded-md" />
      </div>
    </div>
  );
}

export default memo(AddEditFormSkeletonLoader);