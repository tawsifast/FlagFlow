import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ScrollText } from "lucide-react";

import { ActivityList } from "@/components/ActivityList";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { FilterDropdown } from "@/components/FilterDropdown";
import { actionMeta } from "@/components/ActivityList";
import { ENVIRONMENT_KEYS, ENVIRONMENT_LABELS } from "@/lib/mock-data";
import { useStore } from "@/lib/store";
import type { AuditAction } from "@/lib/types";

export const Route = createFileRoute("/audit-logs")({
  head: () => ({
    meta: [
      { title: "Audit Logs — FeatureFlag" },
      {
        name: "description",
        content: "Every flag, environment and project change with who made it and when.",
      },
      { property: "og:title", content: "Audit Logs — FeatureFlag" },
      {
        property: "og:description",
        content: "Every flag, environment and project change with who made it and when.",
      },
    ],
  }),
  component: AuditLogsPage,
});

function AuditLogsPage() {
  const { auditLogs } = useStore();
  const [action, setAction] = useState("all");
  const [environment, setEnvironment] = useState("all");
  const [userName, setUserName] = useState("all");
  const [range, setRange] = useState("all");

  const users = useMemo(
    () => Array.from(new Set(auditLogs.map((entry) => entry.userName))),
    [auditLogs],
  );

  const filtered = useMemo(() => {
    const cutoff =
      range === "24h"
        ? Date.now() - 24 * 60 * 60 * 1000
        : range === "7d"
          ? Date.now() - 7 * 24 * 60 * 60 * 1000
          : null;

    return auditLogs.filter((entry) => {
      if (action !== "all" && entry.action !== action) return false;
      if (environment !== "all" && entry.environment !== environment) return false;
      if (userName !== "all" && entry.userName !== userName) return false;
      if (cutoff && new Date(entry.createdAt).getTime() < cutoff) return false;
      return true;
    });
  }, [auditLogs, action, environment, userName, range]);

  return (
    <AppShell>
      <PageHeader
        title="Audit Logs"
        subtitle="A complete history of release control changes across your team."
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <FilterDropdown
          label="Action"
          value={action}
          onChange={setAction}
          options={[
            { value: "all", label: "All actions" },
            ...(Object.keys(actionMeta) as AuditAction[]).map((key) => ({
              value: key,
              label: actionMeta[key].label,
            })),
          ]}
        />
        <FilterDropdown
          label="Environment"
          value={environment}
          onChange={setEnvironment}
          options={[
            { value: "all", label: "All environments" },
            ...ENVIRONMENT_KEYS.map((key) => ({ value: key, label: ENVIRONMENT_LABELS[key] })),
          ]}
        />
        <FilterDropdown
          label="User"
          value={userName}
          onChange={setUserName}
          options={[
            { value: "all", label: "All users" },
            ...users.map((name) => ({ value: name, label: name })),
          ]}
        />
        <FilterDropdown
          label="Date"
          value={range}
          onChange={setRange}
          options={[
            { value: "all", label: "All time" },
            { value: "24h", label: "Last 24 hours" },
            { value: "7d", label: "Last 7 days" },
          ]}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={ScrollText}
          title="No matching activity"
          description="Adjust the filters to see more of your team's changes."
        />
      ) : (
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <ActivityList logs={filtered} />
        </div>
      )}
    </AppShell>
  );
}
