const defaultTheme = require('tailwindcss/defaultTheme');
const typography = require('@tailwindcss/typography');

module.exports = {
  plugins: [
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
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'base-blue-main': '#008cba',
        'base-blue-hover': '#006687',
        'base-blue-active': '#004b63',
        'base-blue-border': '#0079a1',
        'base-blue-border-hover': '#004b63',
        'base-blue-border-active': '#001921',
        'base-gray-9': '#c0c0c0', // Fieldset borders
        'base-gray-8': '#ddd', // facet list group item border color
        'base-gray-7': '#222', // content type facet color
        'base-gray-6': '#24282c', // left ribbon nav bg color
        'base-gray-5': '#323a45', // left ribbon nav item bg color
        'base-gray-4': '#656d70', // left ribbon nav item hover bg color
        'base-gray-3': '#838383', // content list item text color
        'base-gray-2': '#999', // result and filter header color
        'base-gray-1': '#e8e8e8', // result list bg color
      },
      animation: {
        'spin-fast': 'spin 500ms linear infinite',
      },
      borderWidth: {
        6: '6px',
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
  prefix: 'tw-',
};
