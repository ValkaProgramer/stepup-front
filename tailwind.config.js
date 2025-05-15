module.exports = {
  darkMode: "class:",
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mionta: ["Mionta", "sans-serif"],
      },
      colors: {
        test: '#ff0000',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
