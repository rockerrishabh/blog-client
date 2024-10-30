import type { Config } from "tailwindcss";
import TailwindCSSForms from "@tailwindcss/forms";

export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [TailwindCSSForms],
} satisfies Config;
