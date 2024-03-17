import type { Config } from 'tailwindcss'
const {nextui} = require("@nextui-org/react");
const config: Config = {
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
        'graph-blue': "#009BDE",
        'graph-pink': "#EE8CA5",
        'graph-orange': "#F96D01",
        'graph-purple': "#5B37D4",
        'graph-dark-blue': "#005FBF",
        'graph-green': "#8FB140",

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

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [nextui()],
}

export default config