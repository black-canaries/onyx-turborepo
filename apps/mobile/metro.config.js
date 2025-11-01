const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];
// Enable hierarchical lookup for pnpm workspace compatibility
config.resolver.disableHierarchicalLookup = false;

// Force React and React Native to resolve from mobile app's node_modules
// This prevents "Invalid hook call" errors from multiple React instances
const mobileReactPath = path.resolve(projectRoot, "node_modules/react");
const mobileReactNativePath = path.resolve(projectRoot, "node_modules/react-native");

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  react: mobileReactPath,
  "react-native": mobileReactNativePath,
};

// Custom resolveRequest to ensure React is resolved from mobile app first
const defaultResolver = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, realModuleName, platform, moduleName) => {
  // Force React and React Native to always resolve from mobile app
  if (realModuleName === "react" || realModuleName === "react-native") {
    const fs = require("fs");
    const resolvedPath = realModuleName === "react" ? mobileReactPath : mobileReactNativePath;
    if (fs.existsSync(resolvedPath)) {
      return {
        type: "sourceFile",
        filePath: path.join(resolvedPath, "index.js"),
      };
    }
  }

  // Use default resolution for other modules
  if (defaultResolver) {
    return defaultResolver(context, realModuleName, platform, moduleName);
  }
  return context.resolveRequest(context, realModuleName, platform, moduleName);
};

module.exports = withNativeWind(config);
