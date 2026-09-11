import { useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Check, Copy, ToggleRight, Trash2 } from "lucide-react";

import { ActivityList } from "@/components/ActivityList";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { EmptyState } from "@/components/EmptyState";
import { EnvironmentBadge } from "@/components/EnvironmentBadge";
import { FeatureToggle } from "@/components/FeatureToggle";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { ENVIRONMENT_LABELS } from "@/lib/mock-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/flags/$flagId")({
  head: () => ({
    meta: [
      { title: "Feature flag details — FeatureFlag" },
      { name: "description", content: "Toggle this feature, review its activity and usage." },
      { property: "og:title", content: "Feature flag details — FeatureFlag" },
      {
        property: "og:description",
        content: "Toggle this feature, review its activity and usage.",
      },
    ],
  }),
  component: FlagDetailPage,
});

function FlagDetailPage() {
  const { flagId } = Route.useParams();
  const { flags, projects, auditLogs, toggleFlag, deleteFlag } = useStore();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const flag = flags.find((item) => item.id === flagId);

  if (!flag) {
    return (
      <AppShell>
        <EmptyState
          icon={ToggleRight}
          title="Feature flag not found"
          description="This flag may have been deleted."
          action={
            <Button asChild>
              <Link to="/flags">Back to feature flags</Link>
            </Button>
          }
        />
      </AppShell>
    );
  }

  const project = projects.find((item) => item.id === flag.projectId);
  const activity = auditLogs.filter((entry) => entry.target === flag.name);

  const snippet = `const feature = await fetch(
  "/api/features/${flag.key}"
);

const data = await feature.json();

if (data.enabled) {
  // ${flag.name}
}`;

  async function handleCopy() {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  function handleDelete() {
    deleteFlag(flag!.id);
    router.navigate({ to: "/flags" });
  }

  return (
    <AppShell>
      <PageHeader
        title={flag.name}
        subtitle={flag.description}
        action={
          <ConfirmationDialog
            trigger={
              <Button variant="outline" aria-label={`Delete ${flag.name}`}>
                <Trash2 className="size-4" aria-hidden="true" />
                Delete
              </Button>
            }
            title={`Delete ${flag.name}?`}
            description="Applications reading this flag will fall back to their default value."
            confirmLabel="Delete flag"
            onConfirm={handleDelete}
          />
        }
      />

      <div className="mb-8 flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            Status in {ENVIRONMENT_LABELS[flag.environment]}
          </p>
          <div className="mt-2">
            <FeatureToggle
              enabled={flag.enabled}
              onToggle={() => toggleFlag(flag.id)}
              label={flag.name}
              size="lg"
            />
          </div>
        </div>
        <EnvironmentBadge environment={flag.environment} />
      </div>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-semibold tracking-tight">Configuration</h2>
        <dl className="grid gap-4 rounded-xl border border-border bg-card p-5 shadow-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium text-muted-foreground">Feature name</dt>
            <dd className="mt-1 text-sm">{flag.name}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-muted-foreground">Feature key</dt>
            <dd className="mt-1 font-mono text-sm">{flag.key}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-muted-foreground">Project</dt>
            <dd className="mt-1 text-sm">
              {project ? (
                <Link
                  to="/projects/$projectId"
                  params={{ projectId: project.id }}
                  className="hover:text-primary"
                >
                  {project.name}
                </Link>
              ) : (
                "—"
              )}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-muted-foreground">Environment</dt>
            <dd className="mt-1 text-sm">{ENVIRONMENT_LABELS[flag.environment]}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-medium text-muted-foreground">Description</dt>
            <dd className="mt-1 text-sm">{flag.description || "No description."}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-muted-foreground">Created</dt>
            <dd className="mt-1 text-sm">{formatDate(flag.createdAt)}</dd>
          </div>
        </dl>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-semibold tracking-tight">Usage</h2>
        <div className="relative overflow-hidden rounded-xl border border-border bg-sidebar shadow-sm">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleCopy}
            className="absolute right-3 top-3"
          >
            {copied ? (
              <Check className="size-3.5" aria-hidden="true" />
            ) : (
              <Copy className="size-3.5" aria-hidden="true" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
          <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-sidebar-foreground">
            <code>{snippet}</code>
          </pre>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-base font-semibold tracking-tight">Activity</h2>
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          {activity.length === 0 ? (
            <p className="text-sm text-muted-foreground">No activity recorded yet.</p>
          ) : (
            <ActivityList logs={activity} />
          )}
        </div>
      </section>
    </AppShell>
  );
}
