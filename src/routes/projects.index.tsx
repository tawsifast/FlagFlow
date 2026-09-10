import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FolderPlus, Plus } from "lucide-react";

import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { ProjectCard } from "@/components/ProjectCard";
import { SearchInput } from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — FeatureFlag" },
      { name: "description", content: "Every application your team manages feature flags for." },
      { property: "og:title", content: "Projects — FeatureFlag" },
      {
        property: "og:description",
        content: "Every application your team manages feature flags for.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { projects, environments, flags } = useStore();
  const [query, setQuery] = useState("");

  const visible = projects.filter((project) =>
    `${project.name} ${project.key} ${project.description}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );

  return (
    <AppShell>
      <PageHeader
        title="Projects"
        subtitle="Each project holds its own environments and feature flags."
        action={
          <Button asChild>
            <Link to="/projects/new">
              <Plus className="size-4" aria-hidden="true" />
              New project
            </Link>
          </Button>
        }
      />

      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search projects"
        className="mb-5 max-w-sm"
      />

      {visible.length === 0 ? (
        <EmptyState
          icon={FolderPlus}
          title="No projects found"
          description="Create a project to start grouping feature flags by application."
          action={
            <Button asChild>
              <Link to="/projects/new">Create project</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              environmentCount={environments.filter((env) => env.projectId === project.id).length}
              flagCount={flags.filter((flag) => flag.projectId === project.id).length}
            />
          ))}
        </div>
      )}
    </AppShell>
  );
}
