import React from "react";
import { ScrollView, View } from "react-native";
import {
  Text,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@repo/ui-native";

/**
 * Test screen to demonstrate @repo/ui-native components
 * This validates NativeWind v5 integration and design token parity
 */
export function UITestScreen() {
  const [count, setCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLoadingTest = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-950">
      <View className="p-6 gap-6">
        {/* Header */}
        <View className="gap-3">
          <Text variant="display2xl" weight="bold" color="brand">
            @repo/ui-native
          </Text>
          <Text variant="lg" color="secondary">
            React Native components powered by NativeWind v5
          </Text>
        </View>

        {/* Typography Card */}
        <Card>
          <CardHeader>
            <Text variant="displaySm" weight="semibold">
              Typography
            </Text>
            <Text variant="sm" color="secondary">
              Design system text variants
            </Text>
          </CardHeader>
          <CardContent className="gap-4">
            <View className="gap-2">
              <Text variant="displayLg" weight="bold" color="brand">
                Display Large
              </Text>
              <Text variant="displayMd" weight="semibold">
                Display Medium
              </Text>
              <Text variant="displaySm">Display Small</Text>
            </View>
            <View className="gap-2">
              <Text variant="xl" weight="bold">
                Extra Large Body
              </Text>
              <Text variant="lg">Large Body</Text>
              <Text variant="md">Medium Body (Default)</Text>
              <Text variant="sm" color="secondary">
                Small Body Text
              </Text>
              <Text variant="xs" color="tertiary">
                Extra Small Body
              </Text>
            </View>
          </CardContent>
        </Card>

        {/* Colors Card */}
        <Card>
          <CardHeader>
            <Text variant="displaySm" weight="semibold">
              Color System
            </Text>
          </CardHeader>
          <CardContent className="gap-2">
            <Text color="primary">Primary Text</Text>
            <Text color="secondary">Secondary Text</Text>
            <Text color="tertiary">Tertiary Text</Text>
            <Text color="disabled">Disabled Text</Text>
            <Text color="brand" weight="semibold">
              Brand Color
            </Text>
            <Text color="error">Error Color</Text>
            <Text color="warning">Warning Color</Text>
            <Text color="success">Success Color</Text>
          </CardContent>
        </Card>

        {/* Buttons Card */}
        <Card>
          <CardHeader>
            <Text variant="displaySm" weight="semibold">
              Buttons
            </Text>
            <Text variant="sm" color="secondary">
              Interactive button components with variants
            </Text>
          </CardHeader>
          <CardContent className="gap-4">
            {/* Button Variants */}
            <View className="gap-3">
              <Text variant="sm" weight="semibold">
                Variants
              </Text>
              <Button
                variant="primary"
                onPress={() => setCount(count + 1)}
              >
                <Text>Primary Button ({count})</Text>
              </Button>
              <Button variant="secondary" onPress={() => setCount(count + 1)}>
                <Text>Secondary Button</Text>
              </Button>
              <Button variant="tertiary" onPress={() => setCount(count + 1)}>
                <Text>Tertiary Button</Text>
              </Button>
              <Button variant="link" onPress={() => setCount(count + 1)}>
                <Text>Link Button</Text>
              </Button>
              <Button
                variant="destructive"
                onPress={() => setCount(Math.max(0, count - 1))}
              >
                <Text>Destructive Button</Text>
              </Button>
            </View>

            {/* Button Sizes */}
            <View className="gap-3">
              <Text variant="sm" weight="semibold">
                Sizes
              </Text>
              <Button variant="primary" size="sm" onPress={() => {}}>
                <Text>Small</Text>
              </Button>
              <Button variant="primary" size="md" onPress={() => {}}>
                <Text>Medium (Default)</Text>
              </Button>
              <Button variant="primary" size="lg" onPress={() => {}}>
                <Text>Large</Text>
              </Button>
              <Button variant="primary" size="xl" onPress={() => {}}>
                <Text>Extra Large</Text>
              </Button>
            </View>

            {/* Button States */}
            <View className="gap-3">
              <Text variant="sm" weight="semibold">
                States
              </Text>
              <Button
                variant="primary"
                isLoading={isLoading}
                onPress={handleLoadingTest}
              >
                <Text>{isLoading ? "Loading..." : "Test Loading State"}</Text>
              </Button>
              <Button variant="primary" disabled>
                <Text>Disabled Button</Text>
              </Button>
              <Button variant="secondary" disabled>
                <Text>Disabled Secondary</Text>
              </Button>
            </View>

            {/* Full Width */}
            <View className="gap-3">
              <Text variant="sm" weight="semibold">
                Full Width
              </Text>
              <Button variant="primary" fullWidth onPress={() => {}}>
                <Text>Full Width Button</Text>
              </Button>
            </View>
          </CardContent>
        </Card>

        {/* Nested Card Example */}
        <Card>
          <CardHeader>
            <Text variant="displaySm" weight="semibold">
              Card Layout
            </Text>
            <Text variant="sm" color="secondary">
              Compound card components with header, content, and footer
            </Text>
          </CardHeader>
          <CardContent>
            <Text variant="md">
              This card demonstrates the compound component pattern with CardHeader,
              CardContent, and CardFooter. All components are styled with NativeWind
              and use design tokens from @repo/tailwind-config.
            </Text>
          </CardContent>
          <CardFooter>
            <Button variant="primary" onPress={() => {}}>
              <Text>Primary Action</Text>
            </Button>
            <Button variant="secondary" onPress={() => {}}>
              <Text>Secondary</Text>
            </Button>
          </CardFooter>
        </Card>

        {/* Design Tokens Info */}
        <Card>
          <CardHeader>
            <Text variant="displaySm" weight="semibold">
              Design System
            </Text>
          </CardHeader>
          <CardContent className="gap-3">
            <View className="gap-1">
              <Text variant="sm" weight="semibold">
                Shared Tokens
              </Text>
              <Text variant="sm" color="secondary">
                Colors, spacing, typography, and shadows are shared between web and
                mobile through @repo/tailwind-config
              </Text>
            </View>
            <View className="gap-1">
              <Text variant="sm" weight="semibold">
                NativeWind v5
              </Text>
              <Text variant="sm" color="secondary">
                Tailwind CSS classes work directly in React Native with full
                IntelliSense support
              </Text>
            </View>
            <View className="gap-1">
              <Text variant="sm" weight="semibold">
                React Native Reanimated
              </Text>
              <Text variant="sm" color="secondary">
                Smooth 60fps animations (see button loading spinner)
              </Text>
            </View>
          </CardContent>
        </Card>

        {/* Success Message */}
        <View className="p-4 bg-success-50 border border-success-200 rounded-lg dark:bg-success-950 dark:border-success-800">
          <Text variant="sm" weight="semibold" color="success">
            ✓ Phase 1 POC Complete
          </Text>
          <Text variant="sm" color="success" className="mt-1">
            All components are rendering with NativeWind styles and shared design
            tokens. The monorepo integration is working correctly!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
