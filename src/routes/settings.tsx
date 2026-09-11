import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
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
import { slugify } from "@/lib/format";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — FeatureFlag" },
      { name: "description", content: "Manage your profile and project settings." },
      { property: "og:title", content: "Settings — FeatureFlag" },
      { property: "og:description", content: "Manage your profile and project settings." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user, projects, updateProfile, updateProject, deleteProject } = useStore();

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [projectId, setProjectId] = useState(projects[0]?.id ?? "");

  const selected = projects.find((project) => project.id === projectId);
  const [projectName, setProjectName] = useState(selected?.name ?? "");
  const [projectKey, setProjectKey] = useState(selected?.key ?? "");

  function handleSelectProject(id: string) {
    setProjectId(id);
    const project = projects.find((item) => item.id === id);
    setProjectName(project?.name ?? "");
    setProjectKey(project?.key ?? "");
  }

  function handleProfileSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2 || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Enter a valid name and email address.");
      return;
    }
    updateProfile(name.trim(), email.trim());
    toast.success("Profile updated.");
  }

  function handleProjectSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!selected) return;
    if (projectName.trim().length < 2 || !/^[a-z0-9-]+$/.test(projectKey)) {
      toast.error("Enter a valid project name and key.");
      return;
    }
    updateProject(selected.id, { name: projectName.trim(), key: projectKey });
    toast.success("Project settings saved.");
  }

  function handleDelete() {
    if (!selected) return;
    const deletedName = selected.name;
    deleteProject(selected.id);
    const remaining = projects.filter((project) => project.id !== selected.id);
    handleSelectProject(remaining[0]?.id ?? "");
    toast.success(`${deletedName} deleted.`);
  }

  return (
    <AppShell>
      <PageHeader title="Settings" subtitle="Manage your account and project configuration." />

      <div className="max-w-xl space-y-8">
        <section>
          <h2 className="mb-3 text-base font-semibold tracking-tight">Profile</h2>
          <form
            className="space-y-4 rounded-xl border border-border bg-card p-5 shadow-sm"
            onSubmit={handleProfileSubmit}
            noValidate
          >
            <div className="space-y-1.5">
              <Label htmlFor="profile-name">Name</Label>
              <Input
                id="profile-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="profile-email">Email</Label>
              <Input
                id="profile-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <Button type="submit">Save profile</Button>
          </form>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold tracking-tight">Project settings</h2>
          {selected ? (
            <form
              className="space-y-4 rounded-xl border border-border bg-card p-5 shadow-sm"
              onSubmit={handleProjectSubmit}
              noValidate
            >
              <div className="space-y-1.5">
                <Label htmlFor="settings-project">Project</Label>
                <Select value={projectId} onValueChange={handleSelectProject}>
                  <SelectTrigger id="settings-project" aria-label="Project">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="settings-project-name">Project name</Label>
                <Input
                  id="settings-project-name"
                  value={projectName}
                  onChange={(event) => setProjectName(event.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="settings-project-key">Project key</Label>
                <Input
                  id="settings-project-key"
                  className="font-mono"
                  value={projectKey}
                  onChange={(event) => setProjectKey(slugify(event.target.value))}
                />
              </div>
              <Button type="submit">Save project</Button>
            </form>
          ) : (
            <p className="rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground shadow-sm">
              No projects yet.
            </p>
          )}
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold tracking-tight text-destructive">
            Danger zone
          </h2>
          <div className="flex flex-col gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium">Delete project</p>
              <p className="text-xs text-muted-foreground">
                Permanently removes {selected?.name ?? "this project"}, its environments and flags.
              </p>
            </div>
            <ConfirmationDialog
              trigger={
                <Button variant="destructive" disabled={!selected}>
                  Delete project
                </Button>
              }
              title={`Delete ${selected?.name ?? "project"}?`}
              description="This cannot be undone. All environments and feature flags will be removed."
              confirmLabel="Delete project"
              onConfirm={handleDelete}
            />
          </div>
        </section>
      </div>
    </AppShell>
  );
}
