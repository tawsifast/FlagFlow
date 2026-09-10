import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Plus, ToggleRight, Trash2 } from "lucide-react";

import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { EmptyState } from "@/components/EmptyState";
import { EnvironmentBadge } from "@/components/EnvironmentBadge";
import { FeatureFlagTable } from "@/components/FeatureFlagTable";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/projects/$projectId")({
  head: () => ({
    meta: [
      { title: "Project details — FeatureFlag" },
      { name: "description", content: "Environments and feature flags for this project." },
      { property: "og:title", content: "Project details — FeatureFlag" },
      { property: "og:description", content: "Environments and feature flags for this project." },
    ],
  }),
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { projectId } = Route.useParams();
  const { projects, environments, flags, toggleFlag, deleteFlag, deleteProject } = useStore();
  const router = useRouter();

  const project = projects.find((item) => item.id === projectId);
  if (!project) {
    return (
      <AppShell>
        <EmptyState
          icon={ToggleRight}
          title="Project not found"
          description="This project may have been deleted."
          action={
            <Button asChild>
              <Link to="/projects">Back to projects</Link>
            </Button>
          }
        />
      </AppShell>
    );
  }

  const projectEnvironments = environments.filter((env) => env.projectId === project.id);
  const projectFlags = flags.filter((flag) => flag.projectId === project.id);

  function handleDeleteProject() {
    deleteProject(project!.id);
    router.navigate({ to: "/projects" });
  }

  return (
    <AppShell>
      <PageHeader
        title={project.name}
        subtitle={project.description}
        action={
          <>
            <Button asChild>
              <Link to="/flags/new">
                <Plus className="size-4" aria-hidden="true" />
                New flag
              </Link>
            </Button>
            <ConfirmationDialog
              trigger={
                <Button variant="outline" aria-label={`Delete ${project.name}`}>
                  <Trash2 className="size-4" aria-hidden="true" />
                  Delete
                </Button>
              }
              title={`Delete ${project.name}?`}
              description="All environments and feature flags in this project will be removed."
              confirmLabel="Delete project"
              onConfirm={handleDeleteProject}
            />
          </>
        }
      />

      <dl className="mb-8 grid gap-4 rounded-xl border border-border bg-card p-5 shadow-sm sm:grid-cols-3">
        <div>
          <dt className="text-xs font-medium text-muted-foreground">Project key</dt>
          <dd className="mt-1 font-mono text-sm">{project.key}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-muted-foreground">Created</dt>
          <dd className="mt-1 text-sm">{formatDate(project.createdAt)}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-muted-foreground">Flags</dt>
          <dd className="mt-1 text-sm tabular-nums">{projectFlags.length}</dd>
        </div>
      </dl>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-semibold tracking-tight">Environments</h2>
        <div className="flex flex-wrap gap-3">
          {projectEnvironments.map((env) => (
            <div
              key={env.id}
              className="rounded-xl border border-border bg-card px-4 py-3 shadow-sm"
            >
              <EnvironmentBadge environment={env.key} />
              <p className="mt-2 text-xs text-muted-foreground tabular-nums">
                {projectFlags.filter((flag) => flag.environment === env.key).length} flags
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-base font-semibold tracking-tight">Feature flags</h2>
        {projectFlags.length === 0 ? (
          <EmptyState
            icon={ToggleRight}
            title="No flags yet"
            description="Create your first feature flag to start controlling this project's releases."
            action={
              <Button asChild>
                <Link to="/flags/new">Create feature flag</Link>
              </Button>
            }
          />
        ) : (
          <FeatureFlagTable flags={projectFlags} onToggle={toggleFlag} onDelete={deleteFlag} />
        )}
      </section>
    </AppShell>
  );
}
