/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: "#050401",
        foreground: "#F1FAEE",
        primary: "#00B4D8",
        secondary: "#303036",
        accent: "#C9C699",
        destructive: "#FC5130",
        "primary-foreground": "#050401",
        "secondary-foreground": "#F1FAEE",
        "accent-foreground": "#050401",
        "destructive-foreground": "#050401",
      },
      fontFamily: {
        headers: ["Josefin Sans Variable"],
        sans: ["Merriweather Sans Variable", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
