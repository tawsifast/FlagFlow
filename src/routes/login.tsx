import { useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";

import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — FeatureFlag" },
      { name: "description", content: "Log in to your FeatureFlag workspace." },
      { property: "og:title", content: "Log in — FeatureFlag" },
      { property: "og:description", content: "Log in to your FeatureFlag workspace." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useStore();
  const router = useRouter();
  const [email, setEmail] = useState("tawsif@featureflag.dev");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next: typeof errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email address.";
    if (password.length < 6) next.password = "Password must be at least 6 characters.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    login(email);
    router.navigate({ to: "/overview" });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 flex justify-center">
          <Logo />
        </Link>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h1 className="text-xl font-semibold tracking-tight">Log in</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Welcome back. Pick up where your team left off.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                aria-invalid={Boolean(errors.email)}
                onChange={(event) => setEmail(event.target.value)}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                aria-invalid={Boolean(errors.password)}
                onChange={(event) => setPassword(event.target.value)}
              />
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>

            <Button type="submit" className="w-full">
              Log in
            </Button>
          </form>
        </div>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
