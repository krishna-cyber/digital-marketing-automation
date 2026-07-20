import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./public/email/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dropbox: ['"Dropbox Sans"', "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        "dropbox-sans": ['"Dropbox Sans"', "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        plaid: ["HelveticaNeue-Medium", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
}

export default config
