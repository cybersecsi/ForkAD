module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cPrimary: '#2d3250',
        cSecondary: '#1b2236',
        cTertiary: '#fbc62f',
        cQuaternary: '#c0961f',
        // Service status colors
        cServiceUp: '#7dfc74',
        cServiceCorrupt: '#5191ff',
        cServiceMumble: '#ff9114',
        cServiceDown: '#ff5b5b',
        cServiceCheckFailed: '#ffff00',
        cServiceOffline: '#fa83fc',
      },
      fontFamily: {
        Jost: ['Jost', 'sans-serif'],
        Bungee: ['Bungee Inline', 'sans-serif'],
        Belanosima: ['Belanosima', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
};
