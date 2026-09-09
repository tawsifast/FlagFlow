import { cn } from "@/lib/utils";

export function StatusBadge({ enabled, className }: { enabled: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        enabled
          ? "border-success/30 bg-success/10 text-success"
          : "border-border bg-muted text-muted-foreground",
        className,
      )}
    >
      <span
        className={cn("size-1.5 rounded-full", enabled ? "bg-success" : "bg-muted-foreground/60")}
        aria-hidden="true"
      />
      {enabled ? "Enabled" : "Disabled"}
    </span>
  );
}
