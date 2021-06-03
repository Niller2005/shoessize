const production = !process.env.ROLLUP_WATCH;

module.exports = {
  purge: {
    mode: 'all',
    content: ['./public/index.html', './src/**/*.svelte'],
    enabled: production, // disable purge in dev
    options: {
      safelist: [/data-theme$/],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
};
