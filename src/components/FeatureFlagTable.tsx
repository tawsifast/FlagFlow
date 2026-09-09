import { Link } from "@tanstack/react-router";
import { MoreHorizontal, Trash2 } from "lucide-react";

import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { EnvironmentBadge } from "@/components/EnvironmentBadge";
import { FeatureFlagCard } from "@/components/FeatureFlagCard";
import { FeatureToggle } from "@/components/FeatureToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { timeAgo } from "@/lib/format";
import type { FeatureFlag } from "@/lib/types";

interface FeatureFlagTableProps {
  flags: FeatureFlag[];
  onToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => void;
}

export function FeatureFlagTable({ flags, onToggle, onDelete }: FeatureFlagTableProps) {
  return (
    <>
      <div className="grid gap-3 md:hidden">
        {flags.map((flag) => (
          <FeatureFlagCard key={flag.id} flag={flag} onToggle={() => onToggle(flag.id)} />
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-xl border border-border bg-card shadow-sm md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Name</TableHead>
              <TableHead>Key</TableHead>
              <TableHead>Environment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="w-12 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flags.map((flag) => (
              <TableRow key={flag.id}>
                <TableCell>
                  <Link
                    to="/flags/$flagId"
                    params={{ flagId: flag.id }}
                    className="font-medium hover:text-primary"
                  >
                    {flag.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <code className="font-mono text-xs text-muted-foreground">{flag.key}</code>
                </TableCell>
                <TableCell>
                  <EnvironmentBadge environment={flag.environment} />
                </TableCell>
                <TableCell>
                  <FeatureToggle
                    enabled={flag.enabled}
                    onToggle={() => onToggle(flag.id)}
                    label={flag.name}
                  />
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {timeAgo(flag.updatedAt)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label={`Actions for ${flag.name}`}>
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to="/flags/$flagId" params={{ flagId: flag.id }}>
                          View details
                        </Link>
                      </DropdownMenuItem>
                      <ConfirmationDialog
                        trigger={
                          <DropdownMenuItem
                            variant="destructive"
                            onSelect={(event) => event.preventDefault()}
                          >
                            <Trash2 className="size-4" aria-hidden="true" />
                            Delete flag
                          </DropdownMenuItem>
                        }
                        title={`Delete ${flag.name}?`}
                        description="This removes the flag from this environment. Applications reading it will fall back to their default."
                        confirmLabel="Delete flag"
                        onConfirm={() => onDelete(flag.id)}
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
