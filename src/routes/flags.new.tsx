import { useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/format";
import { ENVIRONMENT_KEYS, ENVIRONMENT_LABELS } from "@/lib/mock-data";
import { useStore } from "@/lib/store";
import type { EnvironmentKey } from "@/lib/types";

export const Route = createFileRoute("/flags/new")({
  head: () => ({
    meta: [
      { title: "Create a feature flag — FeatureFlag" },
      {
        name: "description",
        content: "Define a feature flag key, environment and initial status.",
      },
      { property: "og:title", content: "Create a feature flag — FeatureFlag" },
      {
        property: "og:description",
        content: "Define a feature flag key, environment and initial status.",
      },
    ],
  }),
  component: NewFlagPage,
});

function NewFlagPage() {
  const { projects, createFlag } = useStore();
  const router = useRouter();

  const [projectId, setProjectId] = useState(projects[0]?.id ?? "");
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [description, setDescription] = useState("");
  const [environment, setEnvironment] = useState<EnvironmentKey>("production");
  const [enabled, setEnabled] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; key?: string; projectId?: string }>({});

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const finalKey = (key || slugify(name)).trim();
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = "Feature name is required.";
    if (!/^[a-z0-9-]+$/.test(finalKey)) next.key = "Use lowercase letters, numbers and dashes.";
    if (!projectId) next.projectId = "Select a project.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const flag = createFlag({
      projectId,
      name: name.trim(),
      key: finalKey,
      description: description.trim(),
      environment,
      enabled,
    });
    toast.success(`${flag.name} created in ${ENVIRONMENT_LABELS[environment]}.`);
    router.navigate({ to: "/flags/$flagId", params: { flagId: flag.id } });
  }

  return (
    <AppShell>
      <PageHeader
        title="Create Feature Flag"
        subtitle="Ship the code disabled, then enable it here when you're ready."
      />

      <form className="max-w-xl space-y-5" onSubmit={handleSubmit} noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="project">Project</Label>
          <Select value={projectId} onValueChange={setProjectId}>
            <SelectTrigger id="project" aria-label="Project">
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.projectId && <p className="text-xs text-destructive">{errors.projectId}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="name">Feature name</Label>
          <Input
            id="name"
            value={name}
            placeholder="New Checkout"
            aria-invalid={Boolean(errors.name)}
            onChange={(event) => {
              setName(event.target.value);
              setKey(slugify(event.target.value));
            }}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="key">Feature key</Label>
          <Input
            id="key"
            value={key}
            placeholder="new-checkout"
            className="font-mono"
            aria-invalid={Boolean(errors.key)}
            onChange={(event) => setKey(slugify(event.target.value))}
          />
          <p className="text-xs text-muted-foreground">
            This is the identifier your application reads, e.g. <code>new-checkout</code>.
          </p>
          {errors.key && <p className="text-xs text-destructive">{errors.key}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            rows={3}
            placeholder="Enable the new checkout experience."
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="environment">Environment</Label>
          <Select
            value={environment}
            onValueChange={(value) => setEnvironment(value as EnvironmentKey)}
          >
            <SelectTrigger id="environment" aria-label="Environment">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ENVIRONMENT_KEYS.map((envKey) => (
                <SelectItem key={envKey} value={envKey}>
                  {ENVIRONMENT_LABELS[envKey]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
          <div>
            <p className="text-sm font-medium">Initial status</p>
            <p className="text-xs text-muted-foreground">
              {enabled ? "Enabled — live as soon as it's created." : "Disabled — safe default."}
            </p>
          </div>
          <Switch
            checked={enabled}
            onCheckedChange={setEnabled}
            aria-label="Initial status"
            className="data-[state=checked]:bg-success"
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit">Create Feature Flag</Button>
          <Button asChild type="button" variant="outline">
            <Link to="/flags">Cancel</Link>
          </Button>
        </div>
      </form>
    </AppShell>
  );
}
