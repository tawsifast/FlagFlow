import { Flag } from "lucide-react";

import { cn } from "@/lib/utils";

export function Logo({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
        <Flag className="size-4" aria-hidden="true" />
      </span>
      <span
        className={cn(
          "text-[15px] font-semibold tracking-tight",
          dark ? "text-sidebar-foreground" : "text-foreground",
        )}
      >
        Feature<span className="text-primary">Flag</span>
      </span>
    </span>
  );
}
