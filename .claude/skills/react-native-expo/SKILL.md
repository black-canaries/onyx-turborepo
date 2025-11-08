---
name: react-native-expo
description: React Native and Expo SDK 54 development skill covering New Architecture setup, custom Metro configuration for monorepos, React Native Web, workspace package resolution, environment variables, navigation, and cross-platform development. Use when working with the mobile app, configuring Metro, resolving React instances, or implementing mobile features.
---

# React Native & Expo Development

This project uses **Expo SDK 54** with **React Native 0.81.5** and the **New Architecture** enabled.

## Mobile App

**Location:** /Users/jonathansmith/Projects/onyx-turborepo/apps/mobile

### Key Features

- **Expo SDK:** ~54.0.20
- **React Native:** 0.81.5
- **React:** 19.1.0
- **New Architecture:** Enabled (`newArchEnabled: true`)
- **React Native Web:** 0.21.2 for web compatibility
- **Port:** 8082
- **Workspace Packages:** Uses `@repo/convex`, `@repo/supabase`, `@repo/ui`

### Configuration Files

- **app.json:1** - Expo configuration
- **metro.config.js:1** - Custom Metro bundler config for monorepo
- **babel.config.js:1** - Babel configuration with module resolver

## Expo Configuration

### app.json Structure

```json
{
  "expo": {
    "name": "Mobile",
    "slug": "mobile",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.mobile"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.yourcompany.mobile"
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    },
    "plugins": [
      [
        "expo-router",
        {
          "origin": "http://localhost:8082"
        }
      ]
    ],
    "experiments": {
      "tsconfigPaths": true
    }
  }
}
```

### New Architecture

This app has the New Architecture enabled:

```json
{
  "newArchEnabled": true
}
```

**Benefits:**
- Improved performance
- Better type safety with TypeScript
- Synchronous native method calls
- Concurrent rendering support

**Note:** Ensure native modules support the New Architecture.

## Metro Configuration for Monorepo

The custom Metro config is critical for workspace packages to work correctly.

### metro.config.js

```javascript
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Get the project root
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch all files in the monorepo
config.watchFolders = [workspaceRoot];

// Let Metro know where to resolve packages
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Enable hierarchical lookup for resolving modules
config.resolver.unstable_enablePackageExports = true;
config.resolver.unstable_conditionNames = [
  'react-native',
  'require',
  'import',
];

// Resolve React to a single instance to prevent "Invalid hook call" errors
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'react' || moduleName === 'react/jsx-runtime') {
    return {
      filePath: path.resolve(projectRoot, 'node_modules', moduleName),
      type: 'sourceFile',
    };
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
```

### Key Metro Settings

**watchFolders:**
- Tells Metro to watch the entire monorepo for changes
- Required for hot reload to work with workspace packages

**nodeModulesPaths:**
- Specifies where Metro should look for node_modules
- Includes both app and workspace root

**unstable_enablePackageExports:**
- Enables package.json `exports` field resolution
- Required for workspace packages with multiple entry points

**resolveRequest (React instance resolution):**
- Forces all packages to use the same React instance
- Prevents "Invalid hook call" errors
- Critical for hooks to work across workspace packages

## Babel Configuration

### babel.config.js

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@repo/ui': '../../packages/ui/src',
            '@repo/convex': '../../packages/convex/src',
            '@repo/supabase': '../../packages/supabase/src',
          },
        },
      ],
    ],
  };
};
```

**module-resolver plugin:**
- Creates aliases for workspace packages
- Enables absolute imports
- Helps with IDE autocomplete

## Environment Variables

### Using Environment Variables

```bash
# .env.local (in apps/mobile directory)
EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_CONVEX_URL=https://...
EXPO_PUBLIC_SUPABASE_URL=https://...
```

**IMPORTANT:** Use `EXPO_PUBLIC_` prefix for client-side variables.

### Accessing Variables

```tsx
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
```

**Note:** Apps DO NOT inherit environment variables from the monorepo root. Create `.env.example` and `.env.local` in the mobile app's root directory.

## File Structure

### Expo Router Structure

```
app/
├── _layout.tsx        # Root layout
├── index.tsx          # Home screen (/)
├── (tabs)/            # Tab navigator group
│   ├── _layout.tsx    # Tab layout
│   ├── index.tsx      # First tab
│   └── settings.tsx   # Settings tab
├── [id].tsx           # Dynamic route
└── +not-found.tsx     # 404 screen
```

### Navigation with Expo Router

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="details" options={{ title: 'Details' }} />
    </Stack>
  );
}
```

```tsx
// app/index.tsx
import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function Home() {
  return (
    <View>
      <Text>Home Screen</Text>
      <Link href="/details">Go to Details</Link>
    </View>
  );
}
```

### Programmatic Navigation

```tsx
import { useRouter } from 'expo-router';

export default function Screen() {
  const router = useRouter();

  return (
    <Button onPress={() => router.push('/details')}>
      Navigate
    </Button>
  );
}
```

## Core Components

### View

```tsx
import { View } from 'react-native';

<View style={{ flex: 1, padding: 20 }}>
  {/* Content */}
</View>
```

### Text

```tsx
import { Text } from 'react-native';

<Text style={{ fontSize: 16, fontWeight: 'bold' }}>
  Hello World
</Text>
```

### TouchableOpacity (Button Alternative)

```tsx
import { TouchableOpacity, Text } from 'react-native';

<TouchableOpacity
  onPress={() => console.log('Pressed')}
  style={{ padding: 10, backgroundColor: 'blue' }}
>
  <Text style={{ color: 'white' }}>Press Me</Text>
</TouchableOpacity>
```

### ScrollView

```tsx
import { ScrollView } from 'react-native';

<ScrollView>
  {/* Scrollable content */}
</ScrollView>
```

### FlatList (for Lists)

```tsx
import { FlatList, Text } from 'react-native';

<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <Text>{item.name}</Text>}
/>
```

### Image

```tsx
import { Image } from 'react-native';

<Image
  source={{ uri: 'https://example.com/image.jpg' }}
  style={{ width: 200, height: 200 }}
/>

{/* Local image */}
<Image
  source={require('./assets/image.png')}
  style={{ width: 200, height: 200 }}
/>
```

### TextInput

```tsx
import { TextInput } from 'react-native';

<TextInput
  value={text}
  onChangeText={setText}
  placeholder="Enter text"
  style={{ borderWidth: 1, padding: 10 }}
/>
```

## Styling

### StyleSheet API

```tsx
import { View, Text, StyleSheet } from 'react-native';

export default function Screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
```

### Flexbox Layout

```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
```

**Flexbox properties:**
- `flexDirection`: 'row' | 'column' | 'row-reverse' | 'column-reverse'
- `justifyContent`: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
- `alignItems`: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'
- `flex`: number (flex grow factor)

### Platform-Specific Styles

```tsx
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
});

// Or use Platform.select
const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
      android: {
        paddingTop: 0,
      },
    }),
  },
});
```

## Using Workspace Packages

### Importing Components

```tsx
// Import from @repo/ui
import { Button, Card } from '@repo/ui';

export default function Screen() {
  return (
    <Card>
      <Button onPress={() => console.log('Pressed')}>
        Click Me
      </Button>
    </Card>
  );
}
```

**Note:** Some web-only components from `@repo/ui` may not work in React Native. Ensure components are cross-platform or create platform-specific versions.

### React Native Web

The app includes React Native Web for web compatibility:

```json
{
  "dependencies": {
    "react-native-web": "0.21.2"
  }
}
```

This allows running the same React Native code on web.

## Hooks

### React Native-Specific Hooks

```tsx
import { useColorScheme, useWindowDimensions } from 'react-native';

export default function Screen() {
  const colorScheme = useColorScheme(); // 'light' | 'dark' | null
  const { width, height } = useWindowDimensions();

  return (
    <View style={{ backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }}>
      <Text>Width: {width}, Height: {height}</Text>
    </View>
  );
}
```

## Native Modules (Expo)

### Common Expo Modules

```tsx
// Camera
import { Camera } from 'expo-camera';

// Location
import * as Location from 'expo-location';

// File System
import * as FileSystem from 'expo-file-system';

// Notifications
import * as Notifications from 'expo-notifications';

// Sharing
import * as Sharing from 'expo-sharing';
```

### Using Expo Modules

```tsx
import * as Location from 'expo-location';

async function getLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    console.log('Permission denied');
    return;
  }

  const location = await Location.getCurrentPositionAsync({});
  console.log(location);
}
```

## Development Commands

```bash
# Start Expo dev server
pnpm dev --filter=mobile

# Start on specific platform
pnpm dev --filter=mobile -- --ios
pnpm dev --filter=mobile -- --android
pnpm dev --filter=mobile -- --web

# Build for production
pnpm build --filter=mobile

# Type check
pnpm check-types --filter=mobile

# Lint
pnpm lint --filter=mobile
```

## Testing on Devices

### Expo Go App

1. Install Expo Go on your phone
2. Run `pnpm dev --filter=mobile`
3. Scan QR code with Expo Go

### Development Build

For custom native code:

```bash
# iOS
eas build --profile development --platform ios

# Android
eas build --profile development --platform android
```

## Platform Detection

```tsx
import { Platform } from 'react-native';

if (Platform.OS === 'ios') {
  // iOS-specific code
}

if (Platform.OS === 'android') {
  // Android-specific code
}

if (Platform.OS === 'web') {
  // Web-specific code
}

// Version check (Android only)
if (Platform.OS === 'android' && Platform.Version >= 30) {
  // Android 11+
}
```

## Common Patterns

### Safe Area View

```tsx
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Screen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Content */}
    </SafeAreaView>
  );
}
```

### Status Bar

```tsx
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      {/* App content */}
    </>
  );
}
```

### Loading State

```tsx
import { ActivityIndicator, View } from 'react-native';

export default function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
```

### Modal

```tsx
import { Modal, View, Text, Button } from 'react-native';
import { useState } from 'react';

export default function Screen() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button title="Open Modal" onPress={() => setVisible(true)} />

      <Modal
        visible={visible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Modal Content</Text>
          <Button title="Close" onPress={() => setVisible(false)} />
        </View>
      </Modal>
    </>
  );
}
```

## Troubleshooting

### "Invalid hook call" error

**Cause:** Multiple React instances across workspace packages

**Solution:** The Metro config includes React resolution to fix this:

```javascript
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'react' || moduleName === 'react/jsx-runtime') {
    return {
      filePath: path.resolve(projectRoot, 'node_modules', moduleName),
      type: 'sourceFile',
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};
```

If the error persists:
1. Clear Metro cache: `pnpm dev --filter=mobile -- --clear`
2. Reinstall dependencies: `pnpm install`
3. Check all packages use the same React version

### Hot reload not working

1. Ensure Metro is watching the monorepo: `watchFolders = [workspaceRoot]`
2. Restart dev server: `pnpm dev --filter=mobile`
3. Clear cache: `pnpm dev --filter=mobile -- --clear`

### Module not found errors

1. Check `babel.config.js` has correct aliases
2. Verify workspace packages are built
3. Check `metro.config.js` node module paths
4. Run `pnpm install` to refresh workspace

### Build errors

1. Clear Metro cache: `rm -rf node_modules/.cache`
2. Clear Expo cache: `expo start -c`
3. Reinstall dependencies: `rm -rf node_modules && pnpm install`

### Environment variables not available

1. Prefix with `EXPO_PUBLIC_`
2. Create `.env.local` in mobile app root (not monorepo root)
3. Restart dev server

## Best Practices

1. **Use StyleSheet.create** - Better performance than inline styles
2. **Memo expensive components** - Use React.memo for lists
3. **FlatList over ScrollView** - For large lists
4. **Platform-specific code** - Use Platform.select() for differences
5. **Safe Area handling** - Always use SafeAreaView
6. **Single React instance** - Ensure Metro config resolves React correctly
7. **Environment per app** - Don't rely on root .env files
8. **Type safety** - Use TypeScript for all components
9. **Accessibility** - Add accessibilityLabel to touchable components
10. **Test on devices** - Simulators don't catch all issues

## Cross-Platform Considerations

### UI Components

- Use platform-specific components when needed
- Test on both iOS and Android
- Consider web compatibility with React Native Web

### Navigation

- Use Expo Router for consistent navigation
- Handle deep linking appropriately
- Test navigation flow on all platforms

### Performance

- Profile with React DevTools
- Optimize re-renders with React.memo
- Use FlatList for virtualization
- Lazy load heavy screens

## Reference

- Expo docs: https://docs.expo.dev
- React Native docs: https://reactnative.dev
- Expo Router: https://docs.expo.dev/router/introduction
- Metro docs: https://metrobundler.dev
- App location: /Users/jonathansmith/Projects/onyx-turborepo/apps/mobile
- Metro config: /Users/jonathansmith/Projects/onyx-turborepo/apps/mobile/metro.config.js
