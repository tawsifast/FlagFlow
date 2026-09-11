import { createFileRoute } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { EnvironmentBadge } from "@/components/EnvironmentBadge";
import { formatDate } from "@/lib/format";
import { ENVIRONMENT_KEYS, ENVIRONMENT_LABELS } from "@/lib/mock-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/environments")({
  head: () => ({
    meta: [
      { title: "Environments — FeatureFlag" },
      {
        name: "description",
        content: "Development, staging and production environments across your projects.",
      },
      { property: "og:title", content: "Environments — FeatureFlag" },
      {
        property: "og:description",
        content: "Development, staging and production environments across your projects.",
      },
    ],
  }),
  component: EnvironmentsPage,
});

function EnvironmentsPage() {
  const { projects, environments, flags } = useStore();

  return (
    <AppShell>
      <PageHeader
        title="Environments"
        subtitle="Each project ships with development, staging and production."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {ENVIRONMENT_KEYS.map((key) => {
          const envFlags = flags.filter((flag) => flag.environment === key);
          return (
            <div key={key} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <EnvironmentBadge environment={key} />
              <p className="mt-3 text-2xl font-semibold tabular-nums">{envFlags.length}</p>
              <p className="text-xs text-muted-foreground">
                feature flags · {envFlags.filter((flag) => flag.enabled).length} enabled
              </p>
              {key === "production" && (
                <p className="mt-3 flex items-start gap-2 rounded-lg border border-warning/30 bg-warning/10 p-2.5 text-xs text-warning-foreground">
                  <TriangleAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                  Changes here affect real users immediately.
                </p>
              )}
            </div>
          );
        })}
      </div>

      <section className="space-y-6">
        {projects.map((project) => (
          <div key={project.id}>
            <h2 className="mb-3 text-base font-semibold tracking-tight">{project.name}</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {environments
                .filter((env) => env.projectId === project.id)
                .map((env) => (
                  <div
                    key={env.id}
                    className="rounded-xl border border-border bg-card p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium">{ENVIRONMENT_LABELS[env.key]}</p>
                      <EnvironmentBadge environment={env.key} />
                    </div>
                    <code className="mt-1 block font-mono text-xs text-muted-foreground">
                      {env.key}
                    </code>
                    <p className="mt-3 text-xs text-muted-foreground tabular-nums">
                      {
                        flags.filter(
                          (flag) =>
                            flag.projectId === project.id && flag.environment === env.key,
                        ).length
                      }{" "}
                      flags · created {formatDate(env.createdAt)}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </section>
    </AppShell>
  );
}
