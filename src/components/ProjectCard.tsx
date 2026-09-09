import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Server, ToggleRight } from "lucide-react";

import { timeAgo } from "@/lib/format";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  environmentCount: number;
  flagCount: number;
}

export function ProjectCard({ project, environmentCount, flagCount }: ProjectCardProps) {
  return (
    <Link
      to="/projects/$projectId"
      params={{ projectId: project.id }}
      className="group flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold tracking-tight">{project.name}</h3>
          <code className="mt-1 block font-mono text-xs text-muted-foreground">{project.key}</code>
        </div>
        <ArrowUpRight
          className="size-4 text-muted-foreground transition-colors group-hover:text-primary"
          aria-hidden="true"
        />
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>

      <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Server className="size-3.5" aria-hidden="true" />
          {environmentCount} environments
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ToggleRight className="size-3.5" aria-hidden="true" />
          {flagCount} flags
        </span>
        <span className="ml-auto">Updated {timeAgo(project.updatedAt)}</span>
      </div>
    </Link>
  );
}
