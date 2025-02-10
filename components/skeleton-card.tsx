import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton
          key={index}
          className="h-[350px] w-[225px] rounded-md"
        ></Skeleton>
      ))}
    </>
  );
}
