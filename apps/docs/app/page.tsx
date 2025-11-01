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

const guides = [
  {
    title: "Consuming shared UI",
    description: "Use @repo/ui components instead of per-app design systems for consistent styling.",
    link: "https://ui.shadcn.com/docs",
  },
  {
    title: "Backend client helpers",
    description: "Import Convex and Supabase utilities directly from the workspace packages.",
    link: "https://github.com/get-convex/convex-js",
  },
  {
    title: "Workspace configuration",
    description: "TypeScript, ESLint, and Tailwind configs are owned in packages/typescript-config and @repo/ui.",
    link: "https://turbo.build/repo/docs",
  },
];

export default function DocsHome() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-16">
      <section className="space-y-6">
        <Badge variant="secondary" className="w-fit">
          Template handbook
        </Badge>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
          Learn how each workspace package plugs into web, mobile, and desktop targets.
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          This Next.js site doubles as a living checklist. Explore the guides below to understand how UI, backend
          clients, and tooling flow across the monorepo.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="https://github.com/vercel/turborepo" target="_blank">
              View repo reference
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="https://turbo.build/" target="_blank">
              Turborepo docs
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <Card key={guide.title}>
            <CardHeader>
              <CardTitle className="text-base">{guide.title}</CardTitle>
              <CardDescription>{guide.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost">
                <a href={guide.link} target="_blank" rel="noreferrer">
                  Read more
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-3 rounded-2xl border bg-card/40 p-6">
        <h2 className="text-2xl font-semibold">Share knowledge with your team</h2>
        <p className="text-sm text-muted-foreground">
          Document your own practices here: release notes, environment variables, and command snippets. Everyone using
          the template will land on this page first.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="secondary">
            <Link href="/">Back to docs homepage</Link>
          </Button>
          <Button asChild variant="ghost">
            <a
              href="https://turbo.build/repo/docs/core-concepts/pipelines"
              target="_blank"
              rel="noreferrer"
            >
              Pipelines overview
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}
