import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        dropdown: "fadeIn 0.2s ease-out forwards",
      },
      backgroundImage: {
        "svg-background": "url('/wave.svg')",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(95%)" },
          "100%": { opacity: "1", transform: "scale(100%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
