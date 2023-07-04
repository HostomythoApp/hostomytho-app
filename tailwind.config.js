module.exports = {
  content: ["./App.js", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#B36700",
        secondary: "#0377fc",
        teriary: "#B36700",
        white: "#fff",
        black: "#000000",
        textPrimary: "##000000",
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
