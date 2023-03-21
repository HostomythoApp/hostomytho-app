module.exports = {
  content: [
    "./App.js",
   './src/**/*.{js,jsx,ts,tsx}',
   './src/screens/ChatScreen.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
