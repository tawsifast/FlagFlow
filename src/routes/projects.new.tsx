import { useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/format";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/projects/new")({
  head: () => ({
    meta: [
      { title: "Create a project — FeatureFlag" },
      { name: "description", content: "Add a new application and its default environments." },
      { property: "og:title", content: "Create a project — FeatureFlag" },
      {
        property: "og:description",
        content: "Add a new application and its default environments.",
      },
    ],
  }),
  component: NewProjectPage,
});

function NewProjectPage() {
  const { createProject } = useStore();
  const router = useRouter();
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ name?: string; key?: string }>({});

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const finalKey = (key || slugify(name)).trim();
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = "Project name is required.";
    if (!/^[a-z0-9-]+$/.test(finalKey)) next.key = "Use lowercase letters, numbers and dashes.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const project = createProject({ name: name.trim(), key: finalKey, description });
    toast.success(`${project.name} created with 3 environments.`);
    router.navigate({ to: "/projects/$projectId", params: { projectId: project.id } });
  }

  return (
    <AppShell>
      <PageHeader title="Create a project" subtitle="Development, staging and production environments are added automatically." />

      <form className="max-w-xl space-y-5" onSubmit={handleSubmit} noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="name">Project name</Label>
          <Input
            id="name"
            value={name}
            placeholder="Marketa"
            aria-invalid={Boolean(errors.name)}
            onChange={(event) => {
              setName(event.target.value);
              setKey(slugify(event.target.value));
            }}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="key">Project key</Label>
          <Input
            id="key"
            value={key}
            placeholder="marketa"
            className="font-mono"
            aria-invalid={Boolean(errors.key)}
            onChange={(event) => setKey(slugify(event.target.value))}
          />
          <p className="text-xs text-muted-foreground">Used in the SDK to scope flag lookups.</p>
          {errors.key && <p className="text-xs text-destructive">{errors.key}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            rows={3}
            placeholder="What does this application do?"
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit">Create project</Button>
          <Button asChild type="button" variant="outline">
            <Link to="/projects">Cancel</Link>
          </Button>
        </div>
      </form>
    </AppShell>
  );
}
