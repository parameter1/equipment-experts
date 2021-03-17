const forms = require('@tailwindcss/forms');
const typography = require('@tailwindcss/typography');
const colors = require('tailwindcss/colors');

module.exports = {
  plugins: [
    forms,
    typography,
  ],
  purge: {
    content: ['./src/**/*.{vue,js}'],
    options: {
      safelist: [
        'type', // [type="text"], etc.
      ],
    },
  },
  darkMode: false,
  theme: {
    extend: {
      animation: {
        'spin-fast': 'spin 500ms linear infinite',
      },
      colors: {
        rose: colors.rose,
        orange: colors.orange,
        teal: colors.teal,
        cyan: colors.cyan,
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      cursor: ['disabled'],
      textColor: ['disabled'],
    },
  },
};
