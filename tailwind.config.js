/** @type {import('tailwindcss').Config} */
import { createTailwindPreset } from "glasscn-ui";

const glasscnPreset = createTailwindPreset({
  // Optional: tune base radius or color aliases here later
});

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/glasscn-ui/dist/index.js",
  ],
  presets: [glasscnPreset],
  theme: {
    extend: {},
  },
  plugins: [],
};
