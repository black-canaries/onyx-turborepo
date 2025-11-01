import { StatusBar } from "expo-status-bar";
import { useMemo } from "react";
import {
  ScrollView,
  Text,
  View,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, cn } from "@repo/ui/native";
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
        <View className="gap-3">
          <Text className="text-indigo-500 font-semibold uppercase tracking-wider text-xs">
            Multiplatform app
          </Text>
          <Text className="text-zinc-50 text-[28px] font-bold leading-[36px]">
            Full-stack monorepo with shared UI, backend clients, and platform targets.
          </Text>
          <Text className="text-zinc-400 text-base leading-6">
            Next.js for web & desktop, Expo for mobile, and Electron for desktop shell — all powered by shared
            packages that keep implementation details in sync.
          </Text>
          <View className="flex-row gap-3 flex-wrap mt-1">
            <Button
              label="Explore Turbo"
              variant="primary"
              onPress={() => Linking.openURL("https://turbo.build")}
            />
            <Button
              label="View reference"
              variant="ghost"
              onPress={() => Linking.openURL("https://github.com/vercel/turborepo")}
            />
          </View>
        </View>

        <View className="bg-zinc-900 rounded-2xl p-5 gap-3 border border-zinc-800">
          <Text className="text-zinc-100 text-lg font-semibold">Workspace at a glance</Text>
          <Text className="text-zinc-500 text-sm leading-5">
            Shared packages are consumed by every target so upgrades happen once.
          </Text>
          <View className="gap-2 mt-1">
            <Text className="text-zinc-500 text-sm leading-5">
              • `apps/web` — Next.js 16 web app using shared UI and backend clients.
            </Text>
            <Text className="text-zinc-500 text-sm leading-5">
              • `apps/mobile` — Expo app importing native UI primitives and helpers.
            </Text>
            <Text className="text-zinc-500 text-sm leading-5">
              • `apps/desktop` — Electron shell with Next.js renderer consuming shared modules.
            </Text>
          </View>
        </View>

        <View className="gap-4">
          <Text className="text-zinc-50 text-xl font-semibold">Features</Text>
          <View className="gap-4">
            {features.map((feature) => (
              <View key={feature.title} className="bg-zinc-900 rounded-2xl p-5 gap-2 border border-zinc-800">
                <Text className="text-zinc-100 text-base font-semibold">{feature.title}</Text>
                <Text className="text-zinc-500 text-sm leading-5">{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="gap-4">
          <Text className="text-zinc-50 text-xl font-semibold">Backend connections</Text>
          <Text className="text-zinc-500 text-sm leading-5">
            Drop environment variables into `.env` files to activate the shared Convex and Supabase clients.
          </Text>
          <View className="gap-4">
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
          </View>
        </View>
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
    <View className="bg-zinc-900 rounded-2xl p-5 gap-3 border border-zinc-800">
      <View className="flex-row justify-between items-center gap-3 mb-1">
        <Text className="text-zinc-100 text-base font-semibold flex-1">{title}</Text>
        <View className={cn("px-2 py-1 rounded-md", configured ? "bg-zinc-800" : "bg-red-950")}>
          <Text className="text-zinc-50 text-xs font-semibold">
            {configured ? "Connected" : "Awaiting env"}
          </Text>
        </View>
      </View>
      <Text className="text-zinc-500 text-sm leading-5">{description}</Text>
      <View className="flex-row justify-between items-center gap-3 mt-1">
        <Text className="text-zinc-500 text-sm leading-5 flex-1">
          {configured
            ? "Clients are ready to be consumed throughout the workspace."
            : "Populate the .env file to enable the shared client helpers."}
        </Text>
        <Button
          label="Docs"
          variant="ghost"
          onPress={() => Linking.openURL(docsUrl)}
        />
      </View>
    </View>
  );
}

