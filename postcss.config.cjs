// postcss.config.cjs
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // ✅ required for Tailwind v4
    autoprefixer: {},
  },
};
