import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

export function Card({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "rounded-xl border border-black/5 bg-white shadow-sm overflow-hidden",
        className
      )}
      {...props}
    />
  );
}
