import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  GitBranch,
  MonitorSmartphone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  ToggleRight,
  Zap,
} from "lucide-react";

import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

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

const steps = [
  {
    icon: Sparkles,
    step: "01",
    title: "Create a flag",
    body: "Give your feature a name and key, then pick which environments it is visible in.",
  },
  {
    icon: GitBranch,
    step: "02",
    title: "Wire it into your code",
    body: "Add a one-line check around the feature. No redeploy needed to change its state.",
  },
  {
    icon: ToggleRight,
    step: "03",
    title: "Toggle and ship",
    body: "Turn the flag on in development, test in staging, then incrementally enable production.",
  },
];

const capabilities = [
  {
    icon: Target,
    title: "Targeted rollouts",
    body: "Drive a rollout by a percentage or by a user segment, not just an on/off switch.",
  },
  {
    icon: Zap,
    title: "Instant propagation",
    body: "Changes flow to every connected environment in seconds, so decisions land fast.",
  },
  {
    icon: MonitorSmartphone,
    title: "SDKs for every stack",
    body: "Lightweight clients for JavaScript, React, mobile and server-side runtimes.",
  },
  {
    icon: Rocket,
    title: "Kill switch in an emergency",
    body: "Disable a feature under load without a deploy, then roll back flag state safely.",
  },
  {
    icon: ShieldCheck,
    title: "Permissioned access",
    body: "Granular roles decide who can change flags in production and who can only read.",
  },
  {
    icon: ToggleRight,
    title: "Comments on changes",
    body: "Attach a note to every toggle so the whole team knows the why behind a change.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$0",
    cadence: "forever",
    tagline: "For small teams getting started with feature flags.",
    cta: "Start for free",
    href: "/signup",
    features: [
      "3 projects",
      "50 feature flags",
      "3 environments",
      "Audit trail",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$49",
    cadence: "per month",
    tagline: "For growing teams shipping more features, faster.",
    cta: "Start 14-day trial",
    href: "/signup",
    highlighted: true,
    features: [
      "Unlimited flags & projects",
      "Targeted & percentage rollouts",
      "SDKs for every stack",
      "12 months of audit history",
      "Reviewer workflows",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Let's talk",
    cadence: "custom",
    tagline: "For large organisations with strict compliance needs.",
    cta: "Contact sales",
    href: "/signup",
    features: [
      "Everything in Pro",
      "SSO & SCIM",
      "Custom roles & RBAC",
      "Private cloud / on-prem",
      "99.99% SLA",
      "Dedicated account team",
    ],
  },
];

const faqs = [
  {
    question: "How do feature flags work here?",
    answer:
      "Each flag stores a per-environment state. Your app asks FeatureFlag whether a flag is enabled for its environment, and you flip that state in the dashboard — no deploy involved.",
  },
  {
    question: "Do flags slow my app down?",
    answer:
      "No. The SDK caches flag state locally and falls back to a safe default if the network is unavailable, so page loads never block on the flag service.",
  },
  {
    question: "Can I toggle production safely?",
    answer:
      "Yes. Production changes require the right role and every toggle is written to the audit trail with who changed it and when.",
  },
  {
    question: "What happens when I remove a flag?",
    answer:
      "Delete the flag once the feature is fully shipped)Skip. Deleted flags stop receiving updates and the audit trail keeps the history for you.",
  },
  {
    question: "Is there a free tier?",
    answer:
      "Starter is free forever and covers up to 3 projects and 50 flags. Upgrade to Pro whenever you need unlimited scale.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Logo />
        <nav className="flex items-center gap-2" aria-label="Account">
          <ThemeToggle />
          <Button asChild variant="outline" size="sm">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/signup">Get started</Link>
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
            Ship features when you&apos;re ready, not when you deploy.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            FeatureFlag gives your team a single place to create feature flags and control whether
            each feature is on or off in development, staging and production.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/signup">
                Start for free
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/login">View the dashboard</Link>
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

        <section className="mx-auto max-w-6xl px-4 pb-8 pt-14 sm:px-6">
          <p className="font-mono text-xs font-medium uppercase tracking-wide text-muted-foreground">
            How it works
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {steps.map(({ icon: Icon, step, title, body }) => (
              <article key={step}>
                <span className="flex size-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div className="mt-4 flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{step}</span>
                  <h2 className="text-base font-semibold">{title}</h2>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Powerful under the hood
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              More than just on and off.
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              When a simple switch is not enough, FeatureFlag grows with you.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="rounded-xl border border-border bg-card p-5 shadow-sm"
              >
                <span className="flex size-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Pricing
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Start free. Scale when you need to.
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Simple plans that grow with your team. No credit card required to start.
              </p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {plans.map(
                ({ name, price, cadence, tagline, cta, href, highlighted, features }) => (
                  <article
                    key={name}
                    className={`relative flex flex-col rounded-xl border bg-background p-6 shadow-sm ${
                      highlighted ? "border-primary/60 ring-1 ring-primary/30" : "border-border"
                    }`}
                  >
                    {highlighted && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                        Most popular
                      </span>
                    )}
                    <h3 className="text-base font-semibold">{name}</h3>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-3xl font-semibold tracking-tight">{price}</span>
                      <span className="text-sm text-muted-foreground">{cadence}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{tagline}</p>
                    <Button asChild className="mt-6 w-full">
                      <Link href={href}>{cta}</Link>
                    </Button>
                    <ul className="mt-6 space-y-2.5">
                      {features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs font-medium uppercase tracking-wide text-muted-foreground">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Questions, answered.</h2>
          </div>
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-border rounded-xl border border-border bg-card">
            {faqs.map(({ question, answer }) => (
              <details key={question} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
                  {question}
                  <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 pb-16 pt-14 text-center sm:px-6">
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight">
              Ready to ship features on your terms?
            </h2>
            <p className="max-w-xl text-base text-muted-foreground">
              Create your first feature flag in under a minute. No deploy required.
            </p>
            <Button asChild size="lg" className="mt-4">
              <Link href="/signup">
                Start for free
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              FeatureFlag gives development teams a single place to release features with full
              control and a complete audit trail.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Product</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/signup" className="hover:text-foreground">Start for free</Link></li>
              <li><Link href="/login" className="hover:text-foreground">Log in</Link></li>
              <li><Link href="/dashboard" className="hover:text-foreground">View the dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/signup" className="hover:text-foreground">Documentation</Link></li>
              <li><Link href="/signup" className="hover:text-foreground">Getting started</Link></li>
              <li><Link href="/signup" className="hover:text-foreground">Pricing</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p>© {new Date().getFullYear()} FeatureFlag. All rights reserved.</p>
            <p className="text-xs">Made for teams who ship on their own schedule.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
