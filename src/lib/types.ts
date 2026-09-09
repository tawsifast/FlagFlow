export type EnvironmentKey = "development" | "staging" | "production";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Project {
  id: string;
  name: string;
  key: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Environment {
  id: string;
  projectId: string;
  name: string;
  key: EnvironmentKey;
  createdAt: string;
}

export interface FeatureFlag {
  id: string;
  projectId: string;
  name: string;
  key: string;
  description: string;
  environment: EnvironmentKey;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export type AuditAction =
  | "flag_enabled"
  | "flag_disabled"
  | "flag_created"
  | "flag_updated"
  | "flag_deleted"
  | "environment_created"
  | "environment_updated"
  | "project_created"
  | "project_deleted";

export interface AuditLog {
  id: string;
  userName: string;
  action: AuditAction;
  target: string;
  environment?: EnvironmentKey;
  projectName?: string;
  createdAt: string;
}
