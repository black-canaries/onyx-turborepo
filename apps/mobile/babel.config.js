module.exports = function (api) {
  api.cache(true);
  return {
    // NativeWind v5 uses standard babel-preset-expo only
    // No NativeWind-specific Babel configuration needed
    presets: ["babel-preset-expo"],
  };
};
