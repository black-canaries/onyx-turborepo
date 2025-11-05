module.exports = function (api) {
  api.cache(true);

  let plugins = [
    [
      "module-resolver",
      {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        alias: {
          "@repo/ui/native": "@repo/ui/native",
          "@repo/ui-web": "@repo/ui/native",
        },
      },
    ],
    'react-native-worklets/plugin'
  ];

  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};
