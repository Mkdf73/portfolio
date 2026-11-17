import type { Config } from "tailwindcss";

// Palette claire inspirée de la référence : fond off-white, texte bleu nuit, accent indigo.
// Les noms (ink, paper...) sont conservés : ink = surfaces, paper = couleur du texte.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./sections/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { 950: "#F8F8F4", 900: "#FFFFFF", 800: "#EFEDFA", 700: "#E4E0F6" },
        paper: "#14172B",
        mute: "#5C6075",
        indigo: { DEFAULT: "#5B45E0", soft: "#4A36C4" },
        amber: { DEFAULT: "#9A5B16", soft: "#7A470F" },
      },
      fontFamily: {
        sans: ['"DM Sans Variable"', "system-ui", "sans-serif"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      maxWidth: { page: "72rem" },
    },
  },
  plugins: [],
};
export default config;
