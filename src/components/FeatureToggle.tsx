import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface FeatureToggleProps {
  enabled: boolean;
  onToggle: () => Promise<void>;
  label: string;
  size?: "sm" | "lg";
  className?: string;
}

export function FeatureToggle({
  enabled,
  onToggle,
  label,
  size = "sm",
  className,
}: FeatureToggleProps) {
  const [pending, setPending] = useState(false);

  async function handleChange() {
    if (pending) return;
    setPending(true);
    try {
      await onToggle();
    } finally {
      setPending(false);
    }
  }

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Switch
        checked={enabled}
        disabled={pending}
        onCheckedChange={handleChange}
        aria-label={`${enabled ? "Disable" : "Enable"} ${label}`}
        className={cn(
          "data-[state=checked]:bg-success",
          size === "lg" && "h-7 w-12 [&_span]:size-6 [&_span]:data-[state=checked]:translate-x-5",
        )}
      />
      <span
        className={cn(
          "flex items-center gap-1.5 font-medium tabular-nums",
          size === "lg" ? "text-base" : "text-sm",
          enabled ? "text-success" : "text-muted-foreground",
        )}
      >
        {pending && <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />}
        {pending ? "Saving" : enabled ? "Enabled" : "Disabled"}
      </span>
    </div>
  );
}
