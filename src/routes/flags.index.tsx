import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, ToggleRight } from "lucide-react";

import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { FeatureFlagTable } from "@/components/FeatureFlagTable";
import { FilterDropdown } from "@/components/FilterDropdown";
import { SearchInput } from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { ENVIRONMENT_KEYS, ENVIRONMENT_LABELS } from "@/lib/mock-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/flags/")({
  head: () => ({
    meta: [
      { title: "Feature Flags — FeatureFlag" },
      {
        name: "description",
        content: "Search, filter and toggle every feature flag across your environments.",
      },
      { property: "og:title", content: "Feature Flags — FeatureFlag" },
      {
        property: "og:description",
        content: "Search, filter and toggle every feature flag across your environments.",
      },
    ],
  }),
  component: FlagsPage,
});

function FlagsPage() {
  const { flags, toggleFlag, deleteFlag } = useStore();
  const [query, setQuery] = useState("");
  const [environment, setEnvironment] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return flags.filter((flag) => {
      const matchesTerm =
        !term ||
        flag.name.toLowerCase().includes(term) ||
        flag.key.toLowerCase().includes(term) ||
        flag.description.toLowerCase().includes(term);
      const matchesEnv = environment === "all" || flag.environment === environment;
      const matchesStatus =
        status === "all" || (status === "enabled" ? flag.enabled : !flag.enabled);
      return matchesTerm && matchesEnv && matchesStatus;
    });
  }, [flags, query, environment, status]);

  return (
    <AppShell>
      <PageHeader
        title="Feature Flags"
        subtitle="Turn features on or off per environment — no redeploy required."
        action={
          <Button asChild>
            <Link to="/flags/new">
              <Plus className="size-4" aria-hidden="true" />
              Create Feature Flag
            </Link>
          </Button>
        }
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search flags by name or key"
          className="sm:max-w-xs sm:flex-1"
        />
        <FilterDropdown
          label="Environment"
          value={environment}
          onChange={setEnvironment}
          className="sm:w-44"
          options={[
            { value: "all", label: "All environments" },
            ...ENVIRONMENT_KEYS.map((key) => ({ value: key, label: ENVIRONMENT_LABELS[key] })),
          ]}
        />
        <FilterDropdown
          label="Status"
          value={status}
          onChange={setStatus}
          className="sm:w-36"
          options={[
            { value: "all", label: "All statuses" },
            { value: "enabled", label: "Enabled" },
            { value: "disabled", label: "Disabled" },
          ]}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={ToggleRight}
          title="No feature flags found"
          description="Try a different search or filter, or create a new feature flag."
          action={
            <Button asChild>
              <Link to="/flags/new">Create Feature Flag</Link>
            </Button>
          }
        />
      ) : (
        <FeatureFlagTable flags={filtered} onToggle={toggleFlag} onDelete={deleteFlag} />
      )}
    </AppShell>
  );
}
