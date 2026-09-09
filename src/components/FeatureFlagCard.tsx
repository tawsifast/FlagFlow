import { Link } from "@tanstack/react-router";

import { EnvironmentBadge } from "@/components/EnvironmentBadge";
import { FeatureToggle } from "@/components/FeatureToggle";
import { timeAgo } from "@/lib/format";
import type { FeatureFlag } from "@/lib/types";

interface FeatureFlagCardProps {
  flag: FeatureFlag;
  onToggle: () => Promise<void>;
}

export function FeatureFlagCard({ flag, onToggle }: FeatureFlagCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <Link
            to="/flags/$flagId"
            params={{ flagId: flag.id }}
            className="text-sm font-semibold hover:text-primary"
          >
            {flag.name}
          </Link>
          <code className="mt-0.5 block truncate font-mono text-xs text-muted-foreground">
            {flag.key}
          </code>
        </div>
        <EnvironmentBadge environment={flag.environment} />
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{flag.description}</p>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3">
        <FeatureToggle enabled={flag.enabled} onToggle={onToggle} label={flag.name} />
        <span className="text-xs text-muted-foreground">{timeAgo(flag.updatedAt)}</span>
      </div>
    </div>
  );
}
