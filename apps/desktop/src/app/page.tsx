import Link from "next/link";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui";
import { BackendStatus } from "../components/backend-status";

const desktopTasks = [
  {
    title: "Launch dev servers",
    steps: ["pnpm install", "pnpm run dev --filter desktop"],
  },
  {
    title: "Configure backend",
    steps: ["Create apps/desktop/.env.local", "Set NEXT_PUBLIC_SUPABASE_URL/ANON_KEY", "Set NEXT_PUBLIC_CONVEX_URL"],
  },
  {
    title: "Ship UI updates",
    steps: ["Edit packages/ui", "Re-use components across web/mobile/desktop"],
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-12 px-8 py-16">
      <section className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <div className="flex flex-col gap-6">
          <Badge variant="secondary" className="w-fit">
            Electron + Next.js
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Build desktop surfaces with the same packages powering web and mobile.
          </h1>
          <p className="text-lg text-muted-foreground">
            This renderer consumes `@repo/ui` for styling plus the shared Convex and Supabase helpers. Electron wraps
            the Next.js dev server so changes apply instantly.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild>
              <Link href="https://www.electronjs.org/docs/latest" target="_blank">
                Electron docs
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="https://nextjs.org/docs" target="_blank">
                Next.js docs
              </Link>
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Workspace automation</CardTitle>
            <CardDescription>
              Turborepo pipelines coordinate builds across renderer, preload, and main processes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {desktopTasks.map((task) => (
              <div key={task.title}>
                <p className="font-medium text-foreground">{task.title}</p>
                <ul className="list-disc pl-5">
                  {task.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">Backend integrations</h2>
          <p className="text-sm text-muted-foreground">
            Shared helpers keep desktop in lock-step with web and mobile targets. Provide env vars to enable live
            connections.
          </p>
        </div>
        <BackendStatus />
      </section>
    </main>
  );
}
