// NativeWind v5 global styles import (must be at the top)
import "./global.css";

import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { UITestScreen } from "./components/UITestScreen";

/**
 * Main App Component
 *
 * Phase 1 POC: Showcasing @repo/ui-native components with NativeWind v5
 */
export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-950">
      <StatusBar style="dark" />
      <UITestScreen />
    </SafeAreaView>
  );
}
