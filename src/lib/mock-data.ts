import type { AuditLog, Environment, EnvironmentKey, FeatureFlag, Project } from "./types";

// Fixed reference point so mock timestamps render identical text on server and client.
const BASE = Date.parse("2026-09-12T09:00:00Z");
const minutesAgo = (minutes: number) => new Date(BASE - minutes * 60_000).toISOString();

export const ENVIRONMENT_KEYS: EnvironmentKey[] = ["development", "staging", "production"];

export const ENVIRONMENT_LABELS: Record<EnvironmentKey, string> = {
  development: "Development",
  staging: "Staging",
  production: "Production",
};

export const mockProjects: Project[] = [
  {
    id: "p1",
    name: "Marketa",
    key: "marketa",
    description: "Multi-vendor e-commerce marketplace",
    createdAt: minutesAgo(60 * 24 * 120),
    updatedAt: minutesAgo(2),
  },
  {
    id: "p2",
    name: "Eventora",
    key: "eventora",
    description: "Event discovery and ticketing platform",
    createdAt: minutesAgo(60 * 24 * 74),
    updatedAt: minutesAgo(60 * 5),
  },
  {
    id: "p3",
    name: "NexusHome",
    key: "nexushome",
    description: "Property rental marketplace",
    createdAt: minutesAgo(60 * 24 * 31),
    updatedAt: minutesAgo(60 * 24 * 2),
  },
];

function envsFor(project: Project): Environment[] {
  return ENVIRONMENT_KEYS.map((key, index) => ({
    id: `${project.id}-${key}`,
    projectId: project.id,
    name: ENVIRONMENT_LABELS[key],
    key,
    createdAt: minutesAgo(60 * 24 * (120 - index * 10)),
  }));
}

export const mockEnvironments: Environment[] = mockProjects.flatMap(envsFor);

export const mockFlags: FeatureFlag[] = [
  {
    id: "f1",
    projectId: "p1",
    name: "New Checkout",
    key: "new-checkout",
    description: "Enable the new Stripe checkout experience.",
    environment: "production",
    enabled: true,
    createdAt: minutesAgo(60 * 24 * 12),
    updatedAt: minutesAgo(2),
  },
  {
    id: "f2",
    projectId: "p1",
    name: "New Checkout",
    key: "new-checkout",
    description: "Enable the new Stripe checkout experience.",
    environment: "staging",
    enabled: true,
    createdAt: minutesAgo(60 * 24 * 12),
    updatedAt: minutesAgo(60 * 26),
  },
  {
    id: "f3",
    projectId: "p1",
    name: "Dark Mode",
    key: "dark-mode",
    description: "Dark theme for the storefront and dashboard.",
    environment: "staging",
    enabled: false,
    createdAt: minutesAgo(60 * 24 * 20),
    updatedAt: minutesAgo(45),
  },
  {
    id: "f4",
    projectId: "p1",
    name: "Express Checkout",
    key: "express-checkout",
    description: "One-tap wallet checkout for returning buyers.",
    environment: "development",
    enabled: true,
    createdAt: minutesAgo(60 * 24 * 4),
    updatedAt: minutesAgo(60 * 3),
  },
  {
    id: "f5",
    projectId: "p2",
    name: "New Navigation",
    key: "new-navbar",
    description: "Redesigned top navigation with search.",
    environment: "production",
    enabled: false,
    createdAt: minutesAgo(60 * 24 * 9),
    updatedAt: minutesAgo(60 * 30),
  },
  {
    id: "f6",
    projectId: "p2",
    name: "Seat Selection",
    key: "seat-selection",
    description: "Interactive seat map during ticket purchase.",
    environment: "staging",
    enabled: true,
    createdAt: minutesAgo(60 * 24 * 6),
    updatedAt: minutesAgo(60 * 8),
  },
  {
    id: "f7",
    projectId: "p3",
    name: "Instant Booking",
    key: "instant-booking",
    description: "Skip host approval for verified renters.",
    environment: "development",
    enabled: false,
    createdAt: minutesAgo(60 * 24 * 3),
    updatedAt: minutesAgo(60 * 20),
  },
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: "a1",
    userName: "Tawsif Islam",
    action: "flag_enabled",
    target: "New Checkout",
    environment: "production",
    projectName: "Marketa",
    createdAt: minutesAgo(2),
  },
  {
    id: "a2",
    userName: "Tawsif Islam",
    action: "flag_disabled",
    target: "Dark Mode",
    environment: "staging",
    projectName: "Marketa",
    createdAt: minutesAgo(45),
  },
  {
    id: "a3",
    userName: "Rima Ahmed",
    action: "flag_created",
    target: "Express Checkout",
    environment: "development",
    projectName: "Marketa",
    createdAt: minutesAgo(60 * 3),
  },
  {
    id: "a4",
    userName: "Rima Ahmed",
    action: "environment_updated",
    target: "Production",
    environment: "production",
    projectName: "Eventora",
    createdAt: minutesAgo(60 * 9),
  },
  {
    id: "a5",
    userName: "Tawsif Islam",
    action: "project_created",
    target: "NexusHome",
    projectName: "NexusHome",
    createdAt: minutesAgo(60 * 24 * 31),
  },
];
