import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, GitBranch, Rocket, ShieldCheck, ToggleRight } from "lucide-react";

import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FeatureFlag — Feature release control for dev teams" },
      {
        name: "description",
        content:
          "Create feature flags, toggle them per environment, and roll features out or back instantly — no redeploy required.",
      },
      { property: "og:title", content: "FeatureFlag — Feature release control for dev teams" },
      {
        property: "og:description",
        content: "Toggle features across development, staging and production without redeploying.",
      },
    ],
  }),
  component: Landing,
});

const highlights = [
  {
    icon: ToggleRight,
    title: "Instant toggles",
    body: "Flip a flag on or off and every environment picks it up in seconds.",
  },
  {
    icon: GitBranch,
    title: "Per-environment control",
    body: "Development, staging and production each keep their own flag state.",
  },
  {
    icon: ShieldCheck,
    title: "Full audit trail",
    body: "Every enable, disable and change is recorded with who did it and when.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Logo />
        <nav className="flex items-center gap-2" aria-label="Account">
          <Button asChild variant="ghost" size="sm">
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/signup">Get started</Link>
          </Button>
        </nav>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 lg:pt-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-medium text-primary">
            <Rocket className="size-3.5" aria-hidden="true" />
            release control, not a redeploy
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Ship features when you're ready, not when you deploy.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            FeatureFlag gives your team a single place to create feature flags and control whether
            each feature is on or off in development, staging and production.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/signup">
                Start for free
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/overview">View the dashboard</Link>
            </Button>
          </div>

          <pre className="mt-12 overflow-x-auto rounded-xl border border-border bg-sidebar p-5 font-mono text-sm text-sidebar-foreground shadow-sm">
            <code>{`if (featureFlag.isEnabled("new-checkout")) {
  renderNewCheckout();
}`}</code>
          </pre>
        </section>

        <section className="border-t border-border bg-card">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-3">
            {highlights.map(({ icon: Icon, title, body }) => (
              <article key={title}>
                <span className="flex size-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <h2 className="mt-4 text-base font-semibold">{title}</h2>
                <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} FeatureFlag
      </footer>
    </div>
  );
}
