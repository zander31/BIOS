import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#0066FF",
          600: "#0052cc",
          700: "#003d99",
          800: "#002966",
          900: "#001433",
        },
        surface: {
          0:   "#FFFFFF",
          50:  "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
        },
        ink: {
          900: "#111827",
          700: "#374151",
          500: "#6B7280",
          300: "#9CA3AF",
          100: "#E5E7EB",
        },
        status: {
          green:  "#10B981",
          yellow: "#F59E0B",
          red:    "#EF4444",
          blue:   "#3B82F6",
          gray:   "#9CA3AF",
        },
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card:       "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "card-md":  "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
        "card-lg":  "0 8px 24px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.06)",
      },
      borderRadius: {
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-8px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in":       "fade-in 0.2s ease-out",
        "slide-in-left": "slide-in-left 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
