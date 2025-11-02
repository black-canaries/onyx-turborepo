import {
  Badge,
  BadgeText,
  Button,
  ButtonText,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  VStack,
  HStack,
  Heading,
  Text,
} from "@repo/ui";
import { BackendStatus } from "@/components/backend-status";

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
        <VStack className="gap-6">
          <Badge variant="outline" action="muted" className="w-fit">
            <BadgeText>Multiplatform app</BadgeText>
          </Badge>
          <Heading size="5xl" className="text-3xl sm:text-5xl">
            Full-stack monorepo with shared UI, backend clients, and platform targets.
          </Heading>
          <Text size="lg" className="text-muted-foreground">
            Next.js for web & desktop, Expo for mobile, and Electron for desktop shell — all powered by shared
            packages that keep implementation details in sync.
          </Text>
          <HStack space="md" className="flex-wrap">
            <Button onPress={() => typeof window !== "undefined" && window.open("https://turbo.build", "_blank")}>
              <ButtonText>Explore Turbo</ButtonText>
            </Button>
            <Button variant="outline" action="secondary" onPress={() => typeof window !== "undefined" && window.open("https://github.com/vercel/turborepo", "_blank")}>
              <ButtonText>View reference</ButtonText>
            </Button>
          </HStack>
        </VStack>
        <Card>
          <CardHeader>
            <CardTitle>Workspace at a glance</CardTitle>
            <CardDescription>
              Shared packages are consumed by every target so upgrades happen once.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Text size="sm" className="text-muted-foreground">• `apps/web` — Next.js 16 web app using shared UI and backend clients.</Text>
            <Text size="sm" className="text-muted-foreground">• `apps/mobile` — Expo app importing native UI primitives and helpers.</Text>
            <Text size="sm" className="text-muted-foreground">• `apps/desktop` — Electron shell with Next.js renderer consuming shared modules.</Text>
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

      <VStack space="md">
        <VStack space="sm">
          <Heading size="2xl">Backend connections</Heading>
          <Text size="sm" className="text-muted-foreground">
            Drop environment variables into `.env` files to activate the shared Convex and Supabase clients.
          </Text>
        </VStack>
        <BackendStatus />
      </VStack>
    </main>
  );
}
