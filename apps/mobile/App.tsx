import { StatusBar } from "expo-status-bar";
import { useMemo } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
} from "react-native";
import { Button } from "@repo/ui/native";
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.kicker}>Multiplatform app</Text>
          <Text style={styles.title}>
            Full-stack monorepo with shared UI, backend clients, and platform targets.
          </Text>
          <Text style={styles.subtitle}>
            Next.js for web & desktop, Expo for mobile, and Electron for desktop shell — all powered by shared
            packages that keep implementation details in sync.
          </Text>
          <View style={styles.actions}>
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

        <View style={styles.workspaceCard}>
          <Text style={styles.cardTitle}>Workspace at a glance</Text>
          <Text style={styles.cardDescription}>
            Shared packages are consumed by every target so upgrades happen once.
          </Text>
          <View style={styles.workspaceList}>
            <Text style={styles.workspaceItem}>
              • `apps/web` — Next.js 16 web app using shared UI and backend clients.
            </Text>
            <Text style={styles.workspaceItem}>
              • `apps/mobile` — Expo app importing native UI primitives and helpers.
            </Text>
            <Text style={styles.workspaceItem}>
              • `apps/desktop` — Electron shell with Next.js renderer consuming shared modules.
            </Text>
          </View>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature) => (
              <View key={feature.title} style={styles.featureCard}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.backendSection}>
          <Text style={styles.sectionTitle}>Backend connections</Text>
          <Text style={styles.sectionDescription}>
            Drop environment variables into `.env` files to activate the shared Convex and Supabase clients.
          </Text>
          <View style={styles.statusGrid}>
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
    <View style={[styles.statusCard, configured ? styles.cardReady : styles.cardPending]}>
      <View style={styles.statusCardHeader}>
        <Text style={styles.statusCardTitle}>{title}</Text>
        <View style={[styles.badge, configured ? styles.badgeConnected : styles.badgeAwaiting]}>
          <Text style={styles.badgeText}>{configured ? "Connected" : "Awaiting env"}</Text>
        </View>
      </View>
      <Text style={styles.statusCardDescription}>{description}</Text>
      <View style={styles.statusCardFooter}>
        <Text style={styles.statusCardFooterText}>
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#09090B",
  },
  container: {
    padding: 24,
    gap: 32,
  },
  header: {
    gap: 12,
  },
  kicker: {
    color: "#6366F1",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontSize: 12,
  },
  title: {
    color: "#FAFAFA",
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 36,
  },
  subtitle: {
    color: "#D4D4D8",
    fontSize: 16,
    lineHeight: 24,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
    marginTop: 4,
  },
  workspaceCard: {
    backgroundColor: "#18181B",
    borderRadius: 16,
    padding: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  cardTitle: {
    color: "#F4F4F5",
    fontSize: 18,
    fontWeight: "600",
  },
  cardDescription: {
    color: "#A1A1AA",
    fontSize: 14,
    lineHeight: 20,
  },
  workspaceList: {
    gap: 8,
    marginTop: 4,
  },
  workspaceItem: {
    color: "#A1A1AA",
    fontSize: 14,
    lineHeight: 20,
  },
  featuresSection: {
    gap: 16,
  },
  sectionTitle: {
    color: "#FAFAFA",
    fontSize: 20,
    fontWeight: "600",
  },
  sectionDescription: {
    color: "#A1A1AA",
    fontSize: 14,
    lineHeight: 20,
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    backgroundColor: "#18181B",
    borderRadius: 16,
    padding: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  featureTitle: {
    color: "#F4F4F5",
    fontSize: 16,
    fontWeight: "600",
  },
  featureDescription: {
    color: "#A1A1AA",
    fontSize: 14,
    lineHeight: 20,
  },
  backendSection: {
    gap: 16,
  },
  statusGrid: {
    gap: 16,
  },
  statusCard: {
    backgroundColor: "#18181B",
    borderRadius: 16,
    padding: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  cardReady: {
    borderColor: "#27272A",
  },
  cardPending: {
    borderColor: "#27272A",
  },
  statusCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 4,
  },
  statusCardTitle: {
    color: "#F4F4F5",
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeConnected: {
    backgroundColor: "#27272A",
  },
  badgeAwaiting: {
    backgroundColor: "#7F1D1D",
  },
  badgeText: {
    color: "#FAFAFA",
    fontSize: 12,
    fontWeight: "600",
  },
  statusCardDescription: {
    color: "#A1A1AA",
    fontSize: 14,
    lineHeight: 20,
  },
  statusCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginTop: 4,
  },
  statusCardFooterText: {
    color: "#A1A1AA",
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
});
