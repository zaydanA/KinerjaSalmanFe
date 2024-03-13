/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        graph01: "#009BDE",
        graph02: "#EE8CA5",
        'clr-table-border': "#eeeeee",
        'clr-blackground-table-header': "#fbfbfb",
        'clr-blackground-table-body': "#ffffff",
        'clr-kinerja-gold': "#957c54",
        "clr-kinerja-gold-hover": "#87704b",
        "clr-kinerja-gold-hover-border": "#b29f7a",
      },

      boxShadow: {
        input: '0 0 0 0.5px #878787',
        'input-hover': '0 0 0 1px #957c54',
        'input-focus': '0 0 0 1.5px #957c54',
        'input-error': '0 0 0 1px #f15e6c',
        'input-focus-error': '0 0 0 1.5px #f15e6c',
      },
    },
  },
  plugins: [nextui()],
}