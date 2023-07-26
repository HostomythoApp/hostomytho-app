module.exports = {
  content: ["./App.js", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#BC3E08",
        secondary: "#0377fc",
        tertiary: "#B36700",
        white: "#fff",
        black: "#000000",
        textPrimary: "#000000",
        whiteTransparent: 'rgb(255, 255, 255, 0.8)',
      },
      fontFamily: {
        primary: ["Pally"],
        secondary: ["Pally"],
        MarckScript: ["MarckScript"],
        SpringSnowstorm: ["SpringSnowstorm"],
        HandleeRegular: ["HandleeRegular"],
        PatrickHandRegular: ["PatrickHandRegular"],
        BubblegumSans: ["BubblegumSans"],
        IrishGrover: ["IrishGrover"],
        MochiyPopOne: ["MochiyPopOne"],
      },
    },
  },
  plugins: [],
  corePlugins: require("tailwind-rn/unsupported-core-plugins"),
};
