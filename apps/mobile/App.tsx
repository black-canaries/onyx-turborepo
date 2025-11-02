import { StatusBar } from "expo-status-bar";
import { useMemo } from "react";
import { ScrollView, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  ButtonText,
  Text,
  VStack,
  HStack,
  Heading,
  Badge,
  BadgeText,
  Box,
  cn,
} from "@repo/ui";
import { createSupabaseBrowserClient } from "@repo/supabase";
import { createConvexReactClient } from "@repo/convex";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;

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

export default function App() {
  const supabaseClient = useMemo(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
      return null;
    }

    try {
      return createSupabaseBrowserClient({
        supabaseUrl,
        supabaseKey: supabaseAnonKey,
      });
    } catch (error) {
      console.warn("Supabase client unavailable", error);
      return null;
    }
  }, []);

  const convexClient = useMemo(() => {
    if (!convexUrl) {
      return null;
    }

    try {
      return createConvexReactClient({ deploymentUrl: convexUrl });
    } catch (error) {
      console.warn("Convex client unavailable", error);
      return null;
    }
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ padding: 24, gap: 32 }}>
        <VStack space="md">
          <Badge variant="outline" action="muted" className="w-fit">
            <BadgeText className="text-indigo-500 uppercase">Multiplatform app</BadgeText>
          </Badge>
          <Heading size="5xl" className="text-zinc-50">
            Full-stack monorepo with shared UI, backend clients, and platform targets.
          </Heading>
          <Text size="lg" className="text-zinc-400">
            Next.js for web & desktop, Expo for mobile, and Electron for desktop shell — all powered by shared
            packages that keep implementation details in sync.
          </Text>
          <HStack space="md" className="flex-wrap">
            <Button onPress={() => Linking.openURL("https://turbo.build")}>
              <ButtonText>Explore Turbo</ButtonText>
            </Button>
            <Button variant="outline" action="secondary" onPress={() => Linking.openURL("https://github.com/vercel/turborepo")}>
              <ButtonText>View reference</ButtonText>
            </Button>
          </HStack>
        </VStack>

        <Box className="bg-zinc-900 rounded-2xl p-5 gap-3 border border-zinc-800">
          <Heading size="lg" className="text-zinc-100">Workspace at a glance</Heading>
          <Text size="sm" className="text-zinc-500">
            Shared packages are consumed by every target so upgrades happen once.
          </Text>
          <VStack space="sm" className="mt-1">
            <Text size="sm" className="text-zinc-500">
              • `apps/web` — Next.js 16 web app using shared UI and backend clients.
            </Text>
            <Text size="sm" className="text-zinc-500">
              • `apps/mobile` — Expo app importing native UI primitives and helpers.
            </Text>
            <Text size="sm" className="text-zinc-500">
              • `apps/desktop` — Electron shell with Next.js renderer consuming shared modules.
            </Text>
          </VStack>
        </Box>

        <VStack space="md">
          <Heading size="xl" className="text-zinc-50">Features</Heading>
          <VStack space="md">
            {features.map((feature) => (
              <Box key={feature.title} className="bg-zinc-900 rounded-2xl p-5 gap-2 border border-zinc-800">
                <Heading size="md" className="text-zinc-100">{feature.title}</Heading>
                <Text size="sm" className="text-zinc-500">{feature.description}</Text>
              </Box>
            ))}
          </VStack>
        </VStack>

        <VStack space="md">
          <Heading size="xl" className="text-zinc-50">Backend connections</Heading>
          <Text size="sm" className="text-zinc-500">
            Drop environment variables into `.env` files to activate the shared Convex and Supabase clients.
          </Text>
          <VStack space="md">
            <StatusCard
              title="Supabase"
              description="Realtime database, auth, and storage services shared across apps."
              configured={Boolean(supabaseClient)}
              docsUrl="https://supabase.com/docs"
            />
            <StatusCard
              title="Convex"
              description="Reactive backend with automatic syncing and serverless functions."
              configured={Boolean(convexClient)}
              docsUrl="https://docs.convex.dev"
            />
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

type StatusCardProps = {
  title: string;
  description: string;
  configured: boolean;
  docsUrl: string;
};

function StatusCard({ title, description, configured, docsUrl }: StatusCardProps) {
  return (
    <Box className="bg-zinc-900 rounded-2xl p-5 gap-3 border border-zinc-800">
      <HStack className="justify-between items-center gap-3 mb-1">
        <Heading size="md" className="text-zinc-100 flex-1">{title}</Heading>
        <Badge variant="solid" action={configured ? "success" : "error"} className="px-2 py-1">
          <BadgeText className="text-xs">
            {configured ? "Connected" : "Awaiting env"}
          </BadgeText>
        </Badge>
      </HStack>
      <Text size="sm" className="text-zinc-500">{description}</Text>
      <HStack className="justify-between items-center gap-3 mt-1">
        <Text size="sm" className="text-zinc-500 flex-1">
          {configured
            ? "Clients are ready to be consumed throughout the workspace."
            : "Populate the .env file to enable the shared client helpers."}
        </Text>
        <Button variant="outline" action="secondary" onPress={() => Linking.openURL(docsUrl)}>
          <ButtonText>Docs</ButtonText>
        </Button>
      </HStack>
    </Box>
  );
}

