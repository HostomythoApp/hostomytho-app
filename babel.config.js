module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".json",
            ".svg",
            ".png",
            ".jpg"
          ],
          alias: {
            "@screens": "./src/screens",
            "components": "./src/components",
            "const": "./src/const",
          },
        },
      ],
    ],
  };
};
