module.exports = {
  content: ["./App.js", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2E8B57",
        secondary: "#5583CB",
        primaryLighter: "#2ac76f",
        white: "#fff",
        black: "#000000",
        textPrimary: "#000000",
        whiteTransparent: 'rgb(255, 255, 255, 0.8)',
      },
      fontFamily: {
        primary: ["Pally"],
        // secondary: ["PatrickHandRegular"],
        secondary: ["PatrickHandRegular"],
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
