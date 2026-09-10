import { createFileRoute, Link } from "@tanstack/react-router";
import { Flag, Plus, Server, ToggleRight } from "lucide-react";

import { ActivityList } from "@/components/ActivityList";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { FeatureFlagCard } from "@/components/FeatureFlagCard";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/overview")({
  head: () => ({
    meta: [
      { title: "Overview — FeatureFlag" },
      {
        name: "description",
        content: "See flag activity across every project and environment at a glance.",
      },
      { property: "og:title", content: "Overview — FeatureFlag" },
      {
        property: "og:description",
        content: "See flag activity across every project and environment at a glance.",
      },
    ],
  }),
  component: OverviewPage,
});

function OverviewPage() {
  const { projects, environments, flags, auditLogs, toggleFlag } = useStore();
  const enabledCount = flags.filter((flag) => flag.enabled).length;
  const recentFlags = [...flags]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 4);

  return (
    <AppShell>
      <PageHeader
        title="Overview"
        subtitle="Feature release activity across your workspace."
        action={
          <Button asChild>
            <Link to="/flags/new">
              <Plus className="size-4" aria-hidden="true" />
              New flag
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Projects" value={projects.length} icon={Flag} />
        <StatCard label="Environments" value={environments.length} icon={Server} />
        <StatCard label="Feature flags" value={flags.length} icon={ToggleRight} accent />
        <StatCard
          label="Enabled right now"
          value={enabledCount}
          icon={ToggleRight}
          hint={`${flags.length - enabledCount} currently disabled`}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight">Recently changed flags</h2>
            <Link to="/flags" className="text-sm font-medium text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {recentFlags.map((flag) => (
              <FeatureFlagCard key={flag.id} flag={flag} onToggle={() => toggleFlag(flag.id)} />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight">Recent activity</h2>
            <Link to="/audit-logs" className="text-sm font-medium text-primary hover:underline">
              All logs
            </Link>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <ActivityList logs={auditLogs.slice(0, 6)} />
          </div>
        </section>
      </div>
    </AppShell>
  );
}
