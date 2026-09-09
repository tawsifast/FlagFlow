import {
  CircleCheck,
  CircleMinus,
  FolderPlus,
  Pencil,
  Plus,
  Server,
  Trash2,
  type LucideIcon,
} from "lucide-react";

import { EnvironmentBadge } from "@/components/EnvironmentBadge";
import { timeAgo } from "@/lib/format";
import type { AuditAction, AuditLog } from "@/lib/types";

export const actionMeta: Record<AuditAction, { label: string; icon: LucideIcon; tone: string }> = {
  flag_enabled: { label: "Enabled feature flag", icon: CircleCheck, tone: "text-success" },
  flag_disabled: { label: "Disabled feature flag", icon: CircleMinus, tone: "text-muted-foreground" },
  flag_created: { label: "Created feature flag", icon: Plus, tone: "text-primary" },
  flag_updated: { label: "Updated feature flag", icon: Pencil, tone: "text-primary" },
  flag_deleted: { label: "Deleted feature flag", icon: Trash2, tone: "text-destructive" },
  environment_created: { label: "Created environment", icon: Server, tone: "text-primary" },
  environment_updated: { label: "Updated environment", icon: Server, tone: "text-primary" },
  project_created: { label: "Created project", icon: FolderPlus, tone: "text-primary" },
  project_deleted: { label: "Deleted project", icon: Trash2, tone: "text-destructive" },
};

export function ActivityList({ logs }: { logs: AuditLog[] }) {
  return (
    <ul className="divide-y divide-border">
      {logs.map((entry) => {
        const meta = actionMeta[entry.action];
        const Icon = meta.icon;
        return (
          <li key={entry.id} className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
              <Icon className={`size-4 ${meta.tone}`} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm">
                <span className="font-medium">{meta.label}</span>{" "}
                <span className="text-muted-foreground">·</span>{" "}
                <span className="font-medium">{entry.target}</span>
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span>{entry.userName}</span>
                {entry.environment && <EnvironmentBadge environment={entry.environment} />}
                {entry.projectName && <span>{entry.projectName}</span>}
                <span>· {timeAgo(entry.createdAt)}</span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
