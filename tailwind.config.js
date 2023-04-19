module.exports = {
  content: [
    "./App.js",
   './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#808080",
        secondary: "#0377fc",
        teriary: "#808080",
        white: "#fff",
        black: "##000000",
        textPrimary: "##000000",
      },
      fontFamily: {
        primary: ['Pally'],
        MarckScript: ['MarckScript'],
        SpringSnowstorm: ['SpringSnowstorm'],
        HandleeRegular: ['HandleeRegular'],
        PatrickHandRegular: ['PatrickHandRegular'],
      }
    },
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
