import { Link, useRouter } from "@tanstack/react-router";
import {
  ChevronsUpDown,
  Flag,
  LayoutGrid,
  LogOut,
  ScrollText,
  Server,
  Settings,
  ToggleRight,
  User as UserIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/layout/Logo";
import { useStore } from "@/lib/store";

export const navItems = [
  { to: "/overview", label: "Overview", icon: LayoutGrid },
  { to: "/projects", label: "Projects", icon: Flag },
  { to: "/flags", label: "Feature Flags", icon: ToggleRight },
  { to: "/environments", label: "Environments", icon: Server },
  { to: "/audit-logs", label: "Audit Logs", icon: ScrollText },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { user, logout } = useStore();
  const router = useRouter();

  function handleLogout() {
    logout();
    onNavigate?.();
    router.navigate({ to: "/" });
  }

  const initials = (user?.name ?? "U")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center border-b border-sidebar-border px-5">
        <Logo dark />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Main">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            activeProps={{
              className:
                "bg-sidebar-accent text-sidebar-accent-foreground border-l-2 border-sidebar-primary",
            }}
          >
            <Icon className="size-4 shrink-0" aria-hidden="true" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-sidebar-accent">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
              {initials}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-sidebar-accent-foreground">
                {user?.name ?? "Guest"}
              </span>
              <span className="block truncate text-xs text-sidebar-foreground/60">
                {user?.email ?? "Not signed in"}
              </span>
            </span>
            <ChevronsUpDown className="size-4 shrink-0 text-sidebar-foreground/60" aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="top" className="w-56">
            <DropdownMenuItem asChild>
              <Link to="/settings" onClick={onNavigate}>
                <UserIcon className="size-4" aria-hidden="true" />
                Account settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="size-4" aria-hidden="true" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
