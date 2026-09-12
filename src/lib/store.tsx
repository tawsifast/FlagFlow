import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";

import { ENVIRONMENT_KEYS, ENVIRONMENT_LABELS, mockAuditLogs, mockEnvironments, mockFlags, mockProjects } from "./mock-data";
import { slugify } from "./format";
import type {
  AuditAction,
  AuditLog,
  Environment,
  EnvironmentKey,
  FeatureFlag,
  Project,
  User,
} from "./types";

interface NewProjectInput {
  name: string;
  key: string;
  description: string;
}

interface NewFlagInput {
  projectId: string;
  name: string;
  key: string;
  description: string;
  environment: EnvironmentKey;
  enabled: boolean;
}

interface StoreValue {
  user: User | null;
  projects: Project[];
  environments: Environment[];
  flags: FeatureFlag[];
  auditLogs: AuditLog[];
  login: (email: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  updateProfile: (name: string, email: string) => void;
  createProject: (input: NewProjectInput) => Project;
  updateProject: (id: string, input: Partial<NewProjectInput>) => void;
  deleteProject: (id: string) => void;
  createFlag: (input: NewFlagInput) => FeatureFlag;
  toggleFlag: (id: string) => Promise<void>;
  deleteFlag: (id: string) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

const uid = () => Math.random().toString(36).slice(2, 10);
const nowIso = () => new Date().toISOString();

export function StoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: "u1",
    name: "Tawsif Islam",
    email: "tawsif@featureflag.dev",
  });
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [environments, setEnvironments] = useState<Environment[]>(mockEnvironments);
  const [flags, setFlags] = useState<FeatureFlag[]>(mockFlags);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs);

  const actorName = user?.name ?? "Tawsif Islam";

  const log = useCallback(
    (entry: {
      action: AuditAction;
      target: string;
      environment?: EnvironmentKey;
      projectName?: string;
    }) => {
      setAuditLogs((prev) => [
        { id: uid(), userName: actorName, createdAt: nowIso(), ...entry },
        ...prev,
      ]);
    },
    [actorName],
  );

  const login = useCallback((email: string) => {
    setUser({ id: "u1", name: "Tawsif Islam", email });
  }, []);

  const signup = useCallback((name: string, email: string) => {
    setUser({ id: uid(), name, email });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const updateProfile = useCallback((name: string, email: string) => {
    setUser((prev) => (prev ? { ...prev, name, email } : prev));
  }, []);

  const createProject = useCallback(
    (input: NewProjectInput) => {
      const project: Project = {
        id: uid(),
        name: input.name,
        key: input.key || slugify(input.name),
        description: input.description,
        createdAt: nowIso(),
        updatedAt: nowIso(),
      };
      setProjects((prev) => [project, ...prev]);
      setEnvironments((prev) => [
        ...prev,
        ...ENVIRONMENT_KEYS.map((key) => ({
          id: `${project.id}-${key}`,
          projectId: project.id,
          name: ENVIRONMENT_LABELS[key],
          key,
          createdAt: nowIso(),
        })),
      ]);
      log({ action: "project_created", target: project.name, projectName: project.name });
      return project;
    },
    [log],
  );

  const updateProject = useCallback((id: string, input: Partial<NewProjectInput>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...input, updatedAt: nowIso() } : p)),
    );
  }, []);

  const deleteProject = useCallback(
    (id: string) => {
      const project = projects.find((p) => p.id === id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setEnvironments((prev) => prev.filter((e) => e.projectId !== id));
      setFlags((prev) => prev.filter((f) => f.projectId !== id));
      if (project) log({ action: "project_deleted", target: project.name });
    },
    [projects, log],
  );

  const createFlag = useCallback(
    (input: NewFlagInput) => {
      const flag: FeatureFlag = {
        id: uid(),
        ...input,
        createdAt: nowIso(),
        updatedAt: nowIso(),
      };
      setFlags((prev) => [flag, ...prev]);
      log({
        action: "flag_created",
        target: flag.name,
        environment: flag.environment,
        projectName: projects.find((p) => p.id === flag.projectId)?.name ?? "",
      });
      return flag;
    },
    [log, projects],
  );

  const toggleFlag = useCallback(
    async (id: string) => {
      await new Promise((resolve) => setTimeout(resolve, 450));
      const flag = flags.find((f) => f.id === id);
      if (!flag) return;
      const next = !flag.enabled;
      setFlags((prev) =>
        prev.map((f) => (f.id === id ? { ...f, enabled: next, updatedAt: nowIso() } : f)),
      );
      log({
        action: next ? "flag_enabled" : "flag_disabled",
        target: flag.name,
        environment: flag.environment,
        projectName: projects.find((p) => p.id === flag.projectId)?.name ?? "",
      });
      toast.success(
        `${flag.name} is now ${next ? "enabled" : "disabled"} in ${ENVIRONMENT_LABELS[flag.environment]}.`,
      );
    },
    [flags, log, projects],
  );

  const deleteFlag = useCallback(
    (id: string) => {
      const flag = flags.find((f) => f.id === id);
      setFlags((prev) => prev.filter((f) => f.id !== id));
      if (flag) {
        log({ action: "flag_deleted", target: flag.name, environment: flag.environment });
        toast.success(`${flag.name} deleted.`);
      }
    },
    [flags, log],
  );

  const value = useMemo(
    () => ({
      user,
      projects,
      environments,
      flags,
      auditLogs,
      login,
      signup,
      logout,
      updateProfile,
      createProject,
      updateProject,
      deleteProject,
      createFlag,
      toggleFlag,
      deleteFlag,
    }),
    [
      user,
      projects,
      environments,
      flags,
      auditLogs,
      login,
      signup,
      logout,
      updateProfile,
      createProject,
      updateProject,
      deleteProject,
      createFlag,
      toggleFlag,
      deleteFlag,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
