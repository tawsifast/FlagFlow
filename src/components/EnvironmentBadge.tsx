import { ENVIRONMENT_LABELS } from "@/lib/mock-data";
import type { EnvironmentKey } from "@/lib/types";
import { cn } from "@/lib/utils";

const styles: Record<EnvironmentKey, string> = {
  development: "border-sky-200 bg-sky-50 text-sky-700",
  staging: "border-amber-200 bg-amber-50 text-amber-700",
  production: "border-primary/25 bg-primary/10 text-primary",
};

export function EnvironmentBadge({
  environment,
  className,
}: {
  environment: EnvironmentKey;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-xs font-medium",
        styles[environment],
        className,
      )}
    >
      {ENVIRONMENT_LABELS[environment]}
    </span>
  );
}
