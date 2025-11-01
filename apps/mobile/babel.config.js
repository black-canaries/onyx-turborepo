module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
          alias: {
            "@repo/ui/native": "@repo/ui/native",
            "@repo/ui": "@repo/ui/native",
          },
        },
      ],
    ],
  };
};
