import Link from "next/link";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui-web";
import { BackendStatus } from "./components/backend-status";

const features = [
  {
    title: "Shared UI with shadcn/ui",
    description:
      "Import ready-to-use components from @repo/ui to keep design tokens centralised across platforms.",
  },
  {
    title: "Backend helpers",
    description:
      "Bootstrap Convex and Supabase clients from shared wrappers so every app uses the same conventions.",
  },
  {
    title: "Typed workspaces",
    description:
      "A single TypeScript and ESLint configuration ensures consistent tooling between web, mobile, and desktop.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col gap-12 px-6 py-16">
      <section className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <div className="flex flex-col gap-6">
          <Badge variant="secondary" className="w-fit">
            Multiplatform app
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Full-stack monorepo with shared UI, backend clients, and platform targets.
          </h1>
          <p className="text-lg text-muted-foreground">
            Next.js for web & desktop, Expo for mobile, and Electron for desktop shell — all powered by shared
            packages that keep implementation details in sync.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild>
              <Link href="https://turbo.build" target="_blank">
                Explore Turbo
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="https://github.com/vercel/turborepo" target="_blank">
                View reference
              </Link>
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Workspace at a glance</CardTitle>
            <CardDescription>
              Shared packages are consumed by every target so upgrades happen once.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• `apps/web` — Next.js 16 web app using shared UI and backend clients.</p>
            <p>• `apps/mobile` — Expo app importing native UI primitives and helpers.</p>
            <p>• `apps/desktop` — Electron shell with Next.js renderer consuming shared modules.</p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <CardTitle className="text-base">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">Backend connections</h2>
          <p className="text-sm text-muted-foreground">
            Drop environment variables into `.env` files to activate the shared Convex and Supabase clients.
          </p>
        </div>
        <BackendStatus />
      </section>
    </main>
  );
}
