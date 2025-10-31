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
          <Text style={styles.kicker}>Expo target</Text>
          <Text style={styles.title}>Shared monorepo utilities on mobile.</Text>
          <Text style={styles.subtitle}>
            UI primitives come from <Text style={styles.highlight}>@repo/ui/native</Text> while backend helpers are
            consumed via <Text style={styles.highlight}>@repo/supabase</Text> and <Text style={styles.highlight}>@repo/convex</Text>.
          </Text>
          <View style={styles.actions}>
            <Button
              label="Open Turbo docs"
              variant="primary"
              onPress={() => Linking.openURL("https://turbo.build")}
            />
            <Button
              label="Expo guide"
              variant="ghost"
              onPress={() => Linking.openURL("https://docs.expo.dev/guides/monorepos/")}
            />
          </View>
        </View>

        <View style={styles.statusGrid}>
          <StatusCard
            title="Supabase"
            description="Shared auth and database client helpers configured via EXPO_PUBLIC env vars."
            configured={Boolean(supabaseClient)}
            docsUrl="https://supabase.com/docs"
          />
          <StatusCard
            title="Convex"
            description="Reactive data backend. Provide EXPO_PUBLIC_CONVEX_URL to enable realtime sync."
            configured={Boolean(convexClient)}
            docsUrl="https://docs.convex.dev"
          />
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
    <View style={[styles.card, configured ? styles.cardReady : styles.cardPending]}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
      <Button
        label={configured ? "Ready" : "Configure"}
        variant={configured ? "secondary" : "ghost"}
        onPress={() => Linking.openURL(docsUrl)}
      />
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
    gap: 24,
  },
  header: {
    gap: 12,
  },
  kicker: {
    color: "#6366F1",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  title: {
    color: "#FAFAFA",
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    color: "#D4D4D8",
    fontSize: 16,
    lineHeight: 22,
  },
  highlight: {
    color: "#C4B5FD",
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  statusGrid: {
    gap: 16,
  },
  card: {
    backgroundColor: "#18181B",
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },
  cardReady: {
    borderWidth: 1,
    borderColor: "#4ADE80",
  },
  cardPending: {
    borderWidth: 1,
    borderColor: "#FBBF24",
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
});
