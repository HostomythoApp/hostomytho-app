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
            "images": "./src/assets/images",
            "themes": "./src/assets/themes",
            "components": "./src/components",
            "const": "./src/const",
            "data": "./src/data",
            "hooks": "./src/hooks",
            "navigation": "./src/navigation",
            "screens": "./src/screens",
            "tailwind": "./src/utils/tailwind",
            "fonts": "./src/assets/themes/fonts",
            "services": "./src/services",
          },
        },
      ],
    ],
  };
};
